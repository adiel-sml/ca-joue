"""Découpe l'enregistrement de l'utilisateur en lignes : python tools/split_voice.py enregistrement.(m4a|wav|…) lines.json voice/

1. Décodage en WAV mono 48 kHz (ffmpeg), puis repérage des passages parlés (énergie, trames de 10 ms).
2. Les passages séparés par moins de 0,45 s sont réunis (virgules, respirations).
3. Chaque ligne du texte est lue par la voix de synthèse ; chaque groupe de passages consécutifs (1 à 3) est comparé
   à chaque ligne par DTW sur MFCC. Une programmation dynamique attribue les lignes dans l'ordre à des groupes
   croissants, en sautant les reprises et les bruits ; à qualité égale, la dernière prise l'emporte.
4. Écrit voice/<id>.wav pour chaque ligne (avec 0,25 s de marge) et voice/split.json (ce qui a été gardé).
"""
import sys, os, json, subprocess, tempfile
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from align import mfcc, dtw_path, trim, SR as ASR

src, lines_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(out, exist_ok=True)
lines = json.load(open(lines_path, encoding='utf-8'))
SR = 48000
with tempfile.TemporaryDirectory() as td:
    wav = os.path.join(td, 'in.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-ac', '1', '-ar', str(SR), wav], check=True)
    a, _ = sf.read(wav, dtype='float64')
a = a - a.mean()
hop = SR // 100
fr = np.sqrt(np.convolve(a ** 2, np.ones(hop * 2) / (hop * 2), mode='same')[::hop] + 1e-12)
db = 20 * np.log10(fr + 1e-9)
noise, peak = np.percentile(db, 10), np.percentile(db, 99)
thr = noise + max(10, (peak - noise) * 0.3)
speech = db > thr
segs, i = [], 0
while i < len(speech):
    if speech[i]:
        j = i
        while j < len(speech) and speech[j]: j += 1
        segs.append([i, j]); i = j
    else: i += 1
merged = []
for s in segs:
    if merged and s[0] - merged[-1][1] < 45: merged[-1][1] = s[1]
    else: merged.append(s)
merged = [s for s in merged if s[1] - s[0] >= 15]          # moins de 0,15 s : bruit
print(len(merged), 'passages parlés :', ', '.join(f'{s[0]/100:.2f}-{s[1]/100:.2f}' for s in merged))

lib = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar'))
from kokoro_onnx import Kokoro
k = Kokoro(os.path.join(lib, 'core/tts/kokoro-v1.0.onnx'), os.path.join(lib, 'core/tts/voices-v1.0.bin'))
def to16(x, sr): g = np.gcd(sr, ASR); return resample_poly(x, ASR // g, sr // g).astype('float32')
refs = []
for L in lines:
    s, sr = k.create(L['text'], voice=(L.get('voice', 'ff_siwis') if not L.get('voice', '').endswith('Neural') else 'ff_siwis'), speed=1.0, lang=L.get('lang', 'fr-fr'))
    s = to16(s, sr); i0, i1 = trim(s); refs.append(mfcc(s[i0:i1]))
a16 = to16(a, SR)
def group_cost(li, g0, g1):
    s0, s1 = merged[g0][0] * hop, merged[g1][1] * hop
    X = mfcc(a16[int(s0 * ASR / SR): int(s1 * ASR / SR)])
    ratio = len(X) / len(refs[li])
    if ratio < 0.55 or ratio > 2.6: return 9.0
    return dtw_path(refs[li], X)[1]
M, NL = len(merged), len(lines)
cost = {}
for li in range(NL):
    for g0 in range(M):
        for g1 in range(g0, min(M, g0 + 3)):
            cost[li, g0, g1] = group_cost(li, g0, g1)
# DP : best[li][g] = coût minimal pour placer les lignes 0..li en finissant au passage g
INF = 1e9
best = np.full((NL, M), INF); back = {}
for li in range(NL):
    for g1 in range(M):
        for g0 in range(max(0, g1 - 2), g1 + 1):
            c = cost[li, g0, g1] - 0.002 * g0             # à coût égal, la prise la plus tardive
            prev = 0 if li == 0 else (best[li - 1][:g0].min() if g0 > 0 else INF)
            if prev >= INF: continue
            if c + prev < best[li][g1]:
                best[li][g1] = c + prev
                back[li, g1] = (g0, int(np.argmin(best[li - 1][:g0])) if li > 0 else None)
g1 = int(np.argmin(best[NL - 1])); picks = []
for li in range(NL - 1, -1, -1):
    g0, pg = back[li, g1]; picks.append((li, g0, g1)); g1 = pg
picks.reverse()
report = []
for li, g0, g1 in picks:
    L = lines[li]
    s0 = max(0, merged[g0][0] * hop - int(0.25 * SR)); s1 = min(len(a), merged[g1][1] * hop + int(0.25 * SR))
    sf.write(os.path.join(out, L['id'] + '.wav'), a[s0:s1].astype(np.float32), SR, subtype='PCM_16')
    c = cost[li, g0, g1]
    report.append({'id': L['id'], 'from': round(s0 / SR, 2), 'to': round(s1 / SR, 2), 'cost': round(float(c), 3), 'parts': g1 - g0 + 1})
    print(f"{L['id']}  {s0/SR:6.2f}-{s1/SR:6.2f}  coût {c:.3f}  {'!' if c > 0.42 else ''} {L['text']}")
skipped = [i for i in range(M) if not any(g0 <= i <= g1 for _, g0, g1 in picks)]
print('passages écartés (reprises ou bruits) :', ', '.join(f'{merged[i][0]/100:.2f}-{merged[i][1]/100:.2f}' for i in skipped) or 'aucun')
json.dump({'picks': report, 'skipped': [[merged[i][0] / 100, merged[i][1] / 100] for i in skipped]}, open(os.path.join(out, 'split.json'), 'w'), indent=1)
