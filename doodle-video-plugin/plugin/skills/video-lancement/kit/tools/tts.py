"""Voix de synthèse pour chaque ligne : python tools/tts.py lines.json voice/

Ligne : {"id", "text", "voice": "fr-FR-HenriNeural", "rate": "+6%", "pitch": "+0Hz"}.
Voix Microsoft (edge-tts, en ligne, passe par HTTPS_PROXY s'il est défini). Voix françaises courantes :
fr-FR-HenriNeural, fr-FR-RemyMultilingualNeural (homme), fr-FR-DeniseNeural, fr-FR-VivienneMultilingualNeural (femme),
fr-BE-GerardNeural, fr-CA-AntoineNeural, fr-CH-ArianeNeural. Sans réseau : Kokoro hors ligne, voix ff_siwis (femme).
Écrit voice/<id>.wav (24 kHz, silences de bord coupés) et voice/dur.json.
"""
import sys, os, json, asyncio, subprocess, tempfile
import numpy as np, soundfile as sf
lines, out = json.load(open(sys.argv[1], encoding='utf-8')), sys.argv[2]
os.makedirs(out, exist_ok=True)
SR = 24000

def trim(a):
    nz = np.where(np.abs(a) > np.abs(a).max() * 0.02)[0]
    return a[max(0, nz[0] - int(.03 * SR)): nz[-1] + int(.1 * SR)] if len(nz) else a

async def edge(L, path):
    """Voix Microsoft ; renvoie aussi le temps de chaque mot (début, fin) donné par le service."""
    import edge_tts
    c = edge_tts.Communicate(L['text'], L.get('voice', 'fr-FR-HenriNeural'), rate=L.get('rate', '+0%'), pitch=L.get('pitch', '+0Hz'),
                             boundary='WordBoundary', proxy=os.environ.get('HTTPS_PROXY') or None)
    words = []
    with open(path, 'wb') as f:
        async for ch in c.stream():
            if ch['type'] == 'audio': f.write(ch['data'])
            elif ch['type'] == 'WordBoundary': words.append((ch['text'], ch['offset'] / 1e7, (ch['offset'] + ch['duration']) / 1e7))
    return words

dur, WT = {}, {}
CAST = json.load(open('cast.json', encoding='utf-8')).get('persos', {}) if os.path.exists('cast.json') else {}
for L in lines:                                          # voix du personnage (cast.json) si la ligne n'en donne pas
    if 'voice' not in L and L.get('who') in CAST and CAST[L['who']].get('voix'): L['voice'] = CAST[L['who']]['voix']
for L in lines:
    v = L.get('voice', 'fr-FR-HenriNeural')
    with tempfile.TemporaryDirectory() as td:
        if v.endswith('Neural'):
            mp3 = os.path.join(td, 'a.mp3'); words = asyncio.run(edge(L, mp3))
            wav = os.path.join(td, 'a.wav'); subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp3, '-ac', '1', '-ar', str(SR), wav], check=True)
            a, _ = sf.read(wav)
        else:
            from kokoro_onnx import Kokoro
            lib = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar'))
            k = Kokoro(os.path.join(lib, 'core/tts/kokoro-v1.0.onnx'), os.path.join(lib, 'core/tts/voices-v1.0.bin'))
            a, _ = k.create(L['text'], voice=v, speed=L.get('speed', 1.0), lang=L.get('lang', 'fr-fr'))
    a = np.asarray(a, dtype=np.float64)
    nz = np.where(np.abs(a) > np.abs(a).max() * 0.02)[0]; cut = max(0, nz[0] - int(.03 * SR)) if len(nz) else 0
    a = trim(a)
    if v.endswith('Neural'): WT[L['id']] = [[w, round(max(0, t0 - cut / SR), 3), round(max(0.05, t1 - cut / SR), 3)] for w, t0, t1 in words]
    sf.write(os.path.join(out, L['id'] + '.wav'), a, SR, subtype='PCM_16'); dur[L['id']] = round(len(a) / SR, 3)
    print(L['id'], dur[L['id']], v, L['text'])
json.dump(dur, open(os.path.join(out, 'dur.json'), 'w'), indent=1)
if WT: json.dump(WT, open(os.path.join(out, 'tts_words.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)   # temps exacts, utilisés par align.py
