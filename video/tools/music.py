"""Partition, bruitages, voix et mixage du film : python tools/music.py voix_dir [out/mix.wav]

Lit timeline.json (sections, lignes de voix placées) et events.json (événements de l'image, exportés par
core/render/events.mjs). Tempo 120 BPM, I–V–vi–IV en do, une saveur par section, un ton plus haut au final.
Deux vrais silences : avant la chute du téléphone et avant « Il fait un gage ».
"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
os.chdir(ROOT)
TL = json.load(open('timeline.json', encoding='utf-8'))
os.environ['FILM_DUR'] = str(TL['dur'])
sys.path.insert(0, HERE)
import synth_lib as S
from synth_lib import *
import soundfile as sf
from scipy.signal import resample_poly

VDIR = sys.argv[1] if len(sys.argv) > 1 else 'voice'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'out/mix.wav'
EVJ = json.load(open('events.json'))
EVS = EVJ['ev'] if isinstance(EVJ, dict) and 'ev' in EVJ else EVJ
SEC = TL['S']; DURF = TL['dur']
BEAT = TL['B']; BAR = TL['BAR']

# Bus voix + bruitages clés (sert à baisser la musique), bus bruitages
VL = np.zeros(S.N); VR = np.zeros(S.N)
FL = np.zeros(S.N); FR = np.zeros(S.N)
def _put(LL, RR, sig, t0, gain, pan):
    i = int(t0 * SR)
    if i >= S.N or i < 0: return
    sig = sig[: S.N - i] * gain
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    LL[i:i + len(sig)] += sig * l * 1.414; RR[i:i + len(sig)] += sig * r * 1.414
addv = lambda sig, t0, gain=1.0, pan=0.0: _put(VL, VR, sig, t0, gain, pan)
addf = lambda sig, t0, gain=1.0, pan=0.0: _put(FL, FR, sig, t0, gain, pan)

# ---------------- Instruments en plus de synth_lib ----------------
def square_lead(m, dur=0.2, vib=0.004):
    n = int(dur * SR); t = np.arange(n) / SR
    f = mtof(m) * (1 + vib * np.sin(2 * np.pi * 6 * t)); ph = np.cumsum(f) / SR
    s = lp(np.sign(np.sin(2 * np.pi * ph)) * 0.5 + 0.5 * np.sin(2 * np.pi * ph), 3500)
    return s * np.minimum(1, t / 0.005) * np.clip((dur - t) / 0.03, 0, 1) * 0.45
def brass_stab(ms, dur=0.16):
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for m in ms:
        for d in (-0.08, 0.08):
            ph = np.cumsum(np.full(n, mtof(m) * (1 + d / 100))) / SR; s += 2 * (ph % 1) - 1
    s /= len(ms) * 2
    k = np.exp(-t * 25); out = lp(s, 4000) * k + lp(s, 900) * (1 - k)
    return out * np.minimum(1, t / 0.004) * np.clip((dur - t) / 0.04, 0, 1) * 0.8
def slap(m, dur=0.2):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m); ph = 2 * np.pi * f * t
    s = np.sin(ph) + 0.5 * np.sin(2 * ph) * np.exp(-t * 30) + 0.3 * (2 * ((f * t) % 1) - 1) * np.exp(-t * 20)
    return lp(s, 1600) * np.minimum(1, t / 0.003) * np.exp(-t * 7) * 0.7
def arp(m, dur=0.1):
    n = int(dur * SR); t = np.arange(n) / SR
    return lp(np.sign(np.sin(2 * np.pi * mtof(m) * t)), 5000) * np.exp(-t * 28) * 0.3
def woodblock(f=1100):
    n = int(0.12 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 1.6 * t)) * np.exp(-t * 55) * 0.8
def cowbell():
    n = int(0.25 * SR); t = np.arange(n) / SR
    s = np.sign(np.sin(2 * np.pi * 560 * t)) + np.sign(np.sin(2 * np.pi * 845 * t))
    return bp(s, 500, 3000) * np.exp(-t * 14) * 0.3
def crash(dur=1.4):
    n = int(dur * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 3500) * np.exp(-t * 2.8) * 0.35
def ding():
    return bell(96, 1.2) * 0.6 + np.concatenate([np.zeros(int(0.09 * SR)), bell(100, 1.2) * 0.6])[: int(1.2 * SR)]
def howl(dur=1.3):
    n = int(dur * SR); t = np.arange(n) / SR; p = t / dur
    f = 420 + 260 * np.sin(np.pi * np.clip(p * 1.3, 0, 1)) * (1 + 0.02 * np.sin(2 * np.pi * 5 * t))
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = sum(np.sin(ph * h) / h ** 1.2 for h in range(1, 7))
    return lp(s, 2200) * np.minimum(1, t / 0.15) * np.clip((dur - t) / 0.4, 0, 1) * 0.35
def explosion():
    n = int(1.2 * SR); t = np.arange(n) / SR
    body = lp(rng.standard_normal(n), 700) * np.exp(-t * 4) * 1.2
    crack = hp(rng.standard_normal(n), 1500) * np.exp(-t * 18) * 0.6
    sub = np.sin(2 * np.pi * np.cumsum(55 + 60 * np.exp(-t * 12)) / SR) * np.exp(-t * 5)
    return np.tanh((body + crack + sub) * 1.3) * 0.8
def nosignal():
    out = np.zeros(int(0.7 * SR))
    for k, f in enumerate([880, 660, 440]):
        n = int(0.16 * SR); t = np.arange(n) / SR
        s = lp(np.sign(np.sin(2 * np.pi * f * t)), 3000) * np.exp(-t * 10) * 0.25
        i = int(k * 0.17 * SR); out[i:i + n] += s
    return out
def cheer(dur=1.6):
    n = int(dur * SR); t = np.arange(n) / SR
    s = bp(rng.standard_normal(n), 400, 2600) * (np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 0.7) * 0.5
    for k in range(18):
        c = clap() * rng.uniform(0.2, 0.5); i = int(rng.uniform(0, dur - 0.3) * SR); s[i:i + len(c)] += c[: n - i]
    return s
def roomtone(dur):
    n = int(dur * SR); x = np.cumsum(rng.standard_normal(n)); x -= lp(x, 20)
    return lp(x / (np.abs(x).max() + 1e-9), 400) * 0.05
def crickets(dur):
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for k in range(int(dur * 3)):
        t0 = rng.uniform(0, dur - 0.3); f = rng.uniform(4200, 5200); i = int(t0 * SR); m = int(0.18 * SR)
        tt = np.arange(m) / SR; c = np.sin(2 * np.pi * f * tt) * (np.sin(2 * np.pi * 30 * tt) > 0) * np.exp(-tt * 12)
        s[i:i + m] += c[: n - i] * 0.06
    return s

# ---------------- Harmonie ----------------
CH = [('C', 36, [60, 64, 67, 72]), ('G', 43, [59, 62, 67, 71]), ('Am', 45, [60, 64, 69, 72]), ('F', 41, [60, 65, 69, 72])]
MEL = [[72, 0, 74, 76, 0, 79, 76, 0], [74, 0, 71, 74, 0, 79, 74, 71], [72, 0, 76, 81, 79, 76, 72, 0], [77, 76, 74, 72, 74, 0, 69, 0]]
def chord(bar, tr=0):
    n, b, ms = CH[int(bar) % 4]; return b + tr, [m + tr for m in ms]

def drums(t0, g=1.0, hats=8, four=False, snare_on=True):
    for k in ((0, 1, 2, 3) if four else (0, 2)): add(kick(), t0 + k * BEAT, 0.8 * g)
    if not four: add(kick(0.7), t0 + 2.5 * BEAT, 0.45 * g)
    if snare_on:
        for k in (1, 3): add(snare(), t0 + k * BEAT, 0.42 * g); add(clap(), t0 + k * BEAT, 0.3 * g, 0.15)
    step = 4 / hats
    for k in range(hats): add(hat(k == hats - 1), t0 + k * step * BEAT, 0.5 * g, -0.3)
def jingle(t0):
    add(crash(1.6), t0, 0.7); add(kick(), t0, 0.9)
    for k, m in enumerate([72, 76, 79, 84]): add(brass_stab([m, m - 5], 0.14), t0 + k * BEAT / 2, 0.5)
    add(brass_stab([72, 76, 79, 84], 0.7), t0 + 2 * BEAT, 0.6)
    roll(t0 + 3 * BEAT, t0 + 4 * BEAT)

def bar_mode(t, mode, tr=0):
    bar = round(t / BAR); bass_m, ch = chord(bar, tr)
    if mode == 'sparse':
        for k in (0, 2): add(slap(bass_m, 0.3), t + k * BEAT, 0.35)
        for k in (1, 3): add(clap(), t + k * BEAT, 0.18, 0.2)
        for k, m in enumerate(ch): add(pluck(m + 12, 0.3), t + k * BEAT, 0.12, -0.3 + 0.2 * k)
    elif mode in ('brass', 'popBig', 'pop'):
        drums(t, 1.0 if mode != 'pop' else 0.8, 8, four=mode != 'pop')
        for k in (0, 1.5, 2, 3.5): add(slap(bass_m + (12 if k % 1 else 0), 0.2), t + k * BEAT, 0.55)
        for k in (0, 2.5): add(brass_stab(ch, 0.16), t + k * BEAT, 0.42 if mode != 'pop' else 0.3)
        mel = MEL[bar % 4]
        for k, m in enumerate(mel):
            if m: add(square_lead(m + tr, 0.2), t + k * BEAT / 2, 0.26 if mode == 'popBig' else 0.18, 0.15)
    elif mode == 'funk':
        drums(t, 0.85, 16)
        for k, o in enumerate([0, 0, 12, 0, 10, 0, 12, 7]): add(slap(bass_m + o, 0.16), t + k * BEAT / 2, 0.5)
        for k in (0.5, 2.5): add(cowbell(), t + k * BEAT, 0.5, 0.4)
        for k in (1, 3): add(brass_stab(ch[1:], 0.1), t + (k + 0.5) * BEAT, 0.3)
    elif mode in ('quiz', 'quizFast'):
        drums(t, 0.8, 8)
        step = BEAT / (4 if mode == 'quizFast' else 2)
        seq = ch + ch[::-1]
        for k in range(int(BAR / step)): add(arp(seq[k % len(seq)] + 12, step * 0.9), t + k * step, 0.35, 0.3 * (-1) ** k)
        for k in range(4): add(slap(bass_m, 0.2), t + k * BEAT, 0.5)
    elif mode == 'dream':
        add(pad([m - 12 for m in ch] + [ch[0]], BAR), t, 0.35)
        for k in range(8): add(bell(ch[k % 4] + 12, 1.0), t + k * BEAT / 2, 0.12, 0.3 * np.sin(k))
        for k in (0, 2): add(kick(0.6), t + k * BEAT, 0.4)
        add(slap(bass_m, 0.6), t, 0.35)
    elif mode == 'sweet':
        add(pad(ch, BAR), t, 0.28)
        mel = MEL[bar % 4]
        for k, m in enumerate(mel):
            if m: add(bell(m + 12, 0.9), t + k * BEAT / 2, 0.16)
        for k in range(4): add(pizz(bass_m + 12, 0.2), t + k * BEAT, 0.4)
        for k in (1, 3): add(snap(), t + k * BEAT, 0.4, 0.2)
    elif mode == 'tension':
        for k in range(4): add(kick(), t + k * BEAT, 0.6)
        add(pad([ch[0] - 12, ch[0] - 5], BAR), t, 0.25)
    elif mode == 'light':
        drums(t, 0.6, 8, snare_on=False)
        for k, m in enumerate(ch + ch): add(pluck(m + 12, 0.3), t + k * BEAT / 2, 0.15, -0.3 + 0.1 * k)
        add(slap(bass_m, 0.4), t, 0.4); add(slap(bass_m, 0.4), t + 2 * BEAT, 0.35)
    elif mode == 'end':
        add(pad([m + tr for m in (48, 55, 64, 67, 72)], BAR), t, 0.3)
        for k in range(4): add(bell([72, 76, 79, 84][k] + tr, 1.4), t + k * BEAT, 0.12)

# ---------------- Arrangement : lu dans timeline.json (TL["score"]) ----------------
SC = TL['score']
for t0, t1, mode, tr in SC['spans']:
    t = t0
    while t < t1 - 1e-6: bar_mode(t, mode, tr); t += BAR
for t in SC.get('jingles', []): jingle(t)
for t in SC.get('crashes', []): add(crash(2.0), t, 0.8)
for t, tr in SC.get('fanfares', []):
    for k, m in enumerate([72, 76, 79, 84]): add(brass_stab([m + tr, m + 4 + tr], 0.16), t + k * BEAT / 3, 0.5)
    add(brass_stab([m + tr for m in (72, 76, 79, 84)], 1.4), t + BEAT * 4 / 3, 0.55)
for t0, t1 in SC.get('rolls', []): roll(t0, t1)

# silences : la musique et l'ambiance s'arrêtent net
def mute(t0, t1, fade=0.04):
    i0, i1 = int(t0 * SR), int(t1 * SR); f = int(fade * SR)
    for B_ in (S.L, S.R):
        B_[i0:i0 + f] *= np.linspace(1, 0, f)[: len(B_[i0:i0 + f])]; B_[i0 + f:i1] = 0
for t0, t1 in SC.get('silences', []): mute(t0, t1)

# ---------------- Ambiances ----------------
AMB = {'room': lambda d: roomtone(d) * 0.8, 'crickets': crickets, 'cheer': lambda d: cheer(d) * 0.5}
for kind, t0, t1 in SC.get('ambience', []): add(AMB[kind](t1 - t0), t0, 1.0)

# ---------------- Bruitages depuis les événements de l'image ----------------
for e in EVS:
    t, s, f = e['t'], e.get('s') or e.get('type'), e.get('f', 1.0)
    if s == 'pop': addf(pop(f), t, 0.5, 0.2)
    elif s == 'pip': addf(pop(f), t, 0.35, rng.uniform(-.5, .5)); addf(pluck(int(round(69 + 12 * np.log2(f / 440)))), t, 0.12)
    elif s == 'stamp': addv(stamp(True), t, 0.55)
    elif s == 'crash': add(crash(1.8), t, 0.8)
    elif s == 'boom': addv(stamp(True), t, 0.75); addf(plop(), t + 0.02, 0.5); addf(boing(180, 420), t + 0.06, 0.25)
    elif s == 'boom2': addv(explosion(), t, 0.8)
    elif s == 'whoosh': addf(whoosh(0.5), t - 0.1, 0.45)
    elif s == 'swish': addf(whoosh(0.25), t - 0.05, 0.3, rng.uniform(-.4, .4))
    elif s == 'pass': addf(whoosh(0.16), t, 0.25, rng.uniform(-.5, .5)); addf(woodblock(900 * f), t, 0.2)
    elif s == 'tick': addf(woodblock(1800), t, 0.08, 0.3)
    elif s == 'ding': addf(ding(), t, 0.4)
    elif s == 'squeak': addf(boing(900 * f, 1300 * f, 0.12), t, 0.12, -0.2)
    elif s == 'howl': addf(howl(), t, 0.9, 0.3)
    elif s == 'shift': addf(woodblock(500 * f), t, 0.12, 0.3 * (f - 1) * 10)
    elif s == 'heart': addf(pop(f), t, 0.35, rng.uniform(-.5, .5)); addf(bell(int(round(69 + 12 * np.log2(f / 440))) + 12, 0.6), t, 0.06)
    elif s == 'nosignal': addf(nosignal(), t, 0.7)
    elif s == 'shutter': addv(shutter(), t, 0.8)
    elif s == 'land': addf(plop(), t, 0.5); addf(boing(220, 520), t + 0.02, 0.25)
    elif s == 'hop': addf(pop(f * 0.5), t, 0.12, rng.uniform(-.5, .5))
    elif s == 'gasp': pass                                 # le silence reste au silence
    elif s == 'jingle': pass                               # joué par l'arrangement

# ---------------- Voix ----------------
def load_voice(name):
    a, sr = sf.read(os.path.join(VDIR, name + '.wav'), dtype='float64', always_2d=True); a = a.mean(1)
    if sr != SR: g = np.gcd(sr, SR); a = resample_poly(a, SR // g, sr // g)
    a = hp(a, 80)
    return a
VOX = np.zeros(S.N)
files = {}
for L in TL['lines']:
    a = files.setdefault(L['file'], load_voice(L['file']))
    s0, s1 = max(0, L['src0'] - 0.07), L['src1'] + 0.16
    nxt = [x['src0'] for x in TL['lines'] if x['file'] == L['file'] and x['src0'] > L['src0']]
    if nxt: s1 = min(s1, min(nxt) - 0.03)
    seg_ = a[int(s0 * SR): int(s1 * SR)].copy()
    k = int(0.01 * SR); seg_[:k] *= np.linspace(0, 1, k); seg_[-k * 3:] *= np.linspace(1, 0, k * 3)
    i = int((L['t0'] - (L['src0'] - s0)) * SR)
    VOX[i:i + len(seg_)] += seg_[: S.N - i]
# compression douce puis niveau RMS de la voix
env_ = np.sqrt(np.maximum(lp(VOX ** 2, 30), 0) + 1e-12)
gr = np.minimum(1, (np.percentile(env_[env_ > 1e-4], 90) * 0.6 / (env_ + 1e-9)) ** 0.5)
VOX = VOX * gr
VOX = VOX / (np.sqrt(np.mean(VOX[np.abs(VOX) > 1e-4] ** 2)) + 1e-9) * 0.16
VL += VOX; VR += VOX

# ---------------- Mixage ----------------
def rms(x): return np.sqrt(np.mean(x[np.abs(x) > 1e-5] ** 2)) if np.any(np.abs(x) > 1e-5) else 1
music = np.stack([S.L, S.R]); music = music / (rms(music) + 1e-9) * 0.16 * 10 ** (-9 / 20)
vb = np.stack([VL, VR]); fb = np.stack([FL, FR])
duck_env = lp(np.abs(VOX) + 0.3 * np.abs(fb).mean(0), 12)
duck = 1 - 0.55 * np.clip(duck_env / (np.percentile(duck_env, 95) + 1e-9), 0, 1)
mix = music * duck + vb + fb * 0.9
n = int(DURF * SR); mix = mix[:, :n]
fo = int(1.2 * SR); mix[:, -fo:] *= np.linspace(1, 0, fo)
mix = mix / (np.abs(mix).max() + 1e-9) * 0.9
os.makedirs(os.path.dirname(OUT) or '.', exist_ok=True)
# niveau : -14 LUFS mesurés par ffmpeg (ebur128), puis limiteur à anticipation 5 ms, plafond -2 dBFS
import subprocess, re, tempfile
from scipy.ndimage import minimum_filter1d, uniform_filter1d
def lufs(x):
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        sf.write(tmp.name, x.T.astype(np.float32), SR)
        r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', tmp.name, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r)[-1])
def limit(x, ceil_db=-4.0):
    c = 10 ** (ceil_db / 20); pk = np.abs(x).max(0) + 1e-9
    g = np.minimum(1, c / pk); w = int(0.005 * SR)
    g = uniform_filter1d(minimum_filter1d(g, 2 * w + 1), 2 * w + 1)
    return x * g
for _ in range(3):
    mix = mix * 10 ** ((-14.0 - lufs(mix)) / 20)
    mix = limit(mix)
print(f'niveau {lufs(mix):.1f} LUFS, crête {20 * np.log10(np.abs(mix).max()):.1f} dBFS')
sf.write(OUT, mix.T.astype(np.float32), SR, subtype='PCM_16')
print('écrit', OUT, f'{n / SR:.2f} s', 'événements', len(EVS))
