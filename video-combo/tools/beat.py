"""Tempo d'une musique fournie par l'utilisateur : python tools/beat.py musique.mp3  →  {"bpm": …, "beat0": …}

Enveloppe des attaques (énergie spectrale montante), autocorrélation entre 80 et 160 BPM, puis phase du premier temps.
Mets le résultat dans story.json : "bpm": <bpm>, "track": {"file": "musique.mp3", "beat0": <beat0>, "gain": -2}
(la musique est alors calée pour que son premier temps tombe à 0 s du film ; les coupes suivent sa grille).
À n'utiliser qu'avec une musique dont l'utilisateur a les droits.
"""
import sys, json, subprocess, tempfile, os
import numpy as np, soundfile as sf
src = sys.argv[1]; SR = 22050
with tempfile.TemporaryDirectory() as td:
    w = os.path.join(td, 'a.wav'); subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-ac', '1', '-ar', str(SR), '-t', '90', w], check=True)
    a, _ = sf.read(w)
hop, win = 512, 2048
n = 1 + (len(a) - win) // hop
spec = np.abs(np.fft.rfft(np.stack([a[i * hop:i * hop + win] * np.hanning(win) for i in range(n)]), axis=1))
flux = np.maximum(0, np.diff(np.log1p(spec), axis=0)).sum(1); flux = (flux - flux.mean()) / (flux.std() + 1e-9)
fps = SR / hop
lags = np.arange(int(fps * 60 / 160), int(fps * 60 / 80) + 1)
ac = np.array([np.dot(flux[:-l], flux[l:]) / (len(flux) - l) for l in lags])
lag = lags[np.argmax(ac)]
# affinage : période continue et phase, par un peigne sur l'enveloppe des attaques
def comb(per, ph):
    idx = np.round(ph + np.arange(0, (len(flux) - ph) / per) * per).astype(int); idx = idx[idx < len(flux)]
    return flux[idx].mean()
best = max(((comb(per, ph), per, ph) for per in np.arange(lag - 1.5, lag + 1.5, 0.02) for ph in np.arange(0, per, 0.5)), key=lambda x: x[0])
_, per, ph = best
bpm = 60 * fps / per
beat0 = (ph * hop + win) / SR % (per * hop / SR)     # attaque détectée à la fin de la fenêtre d analyse
print(json.dumps({'bpm': round(float(bpm), 2), 'beat0': round(float(beat0), 3)}))
