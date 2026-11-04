"""Temps de chaque mot d'une ligne de voix, sans reconnaissance vocale.

    python tools/align.py lines.json voix_dir [--out voix_dir/words.json]

Pour chaque ligne, chaque mot est lu seul par la voix de synthèse (Kokoro), les mots sont mis bout à bout
(on connaît donc leurs frontières), puis ce montage est aligné sur l'enregistrement de la ligne
(<id>.wav dans voix_dir) par DTW sur des MFCC. Les frontières sont reportées sur l'enregistrement.
Sortie : {id: [{"w": mot affiché, "t0": s, "t1": s}, ...]} en secondes depuis le début du fichier de la ligne.
"""
import sys, os, json, re, argparse
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from scipy.fft import dct

SR = 16000
HOP, WIN = 160, 400


def load(path):
    a, sr = sf.read(path, dtype='float32', always_2d=True)
    a = a.mean(1)
    if sr != SR:
        g = np.gcd(sr, SR)
        a = resample_poly(a, SR // g, sr // g).astype('float32')
    return a


def mel_fb(n_fft=512, n_mels=40, fmin=60, fmax=7600):
    hz2mel = lambda f: 2595 * np.log10(1 + f / 700)
    mel2hz = lambda m: 700 * (10 ** (m / 2595) - 1)
    pts = mel2hz(np.linspace(hz2mel(fmin), hz2mel(fmax), n_mels + 2))
    bins = np.floor((n_fft + 1) * pts / SR).astype(int)
    fb = np.zeros((n_mels, n_fft // 2 + 1))
    for i in range(n_mels):
        a, b, c = bins[i], bins[i + 1], bins[i + 2]
        for k in range(a, b): fb[i, k] = (k - a) / max(1, b - a)
        for k in range(b, c): fb[i, k] = (c - k) / max(1, c - b)
    return fb


FB = mel_fb()


def mfcc(a):
    a = np.append(a[0], a[1:] - 0.97 * a[:-1])
    n = 1 + max(0, (len(a) - WIN) // HOP)
    idx = np.arange(WIN)[None, :] + HOP * np.arange(n)[:, None]
    fr = a[idx] * np.hamming(WIN)
    spec = np.abs(np.fft.rfft(fr, 512)) ** 2
    m = np.log(spec @ FB.T + 1e-8)
    c = dct(m, type=2, axis=1, norm='ortho')[:, 1:14]
    d = np.gradient(c, axis=0)
    f = np.hstack([c, d])
    return (f - f.mean(0)) / (f.std(0) + 1e-6)


def dtw_path(X, Y):
    """Chemin DTW entre X (N×d) et Y (M×d), extrémités ancrées."""
    Xn = X / (np.linalg.norm(X, axis=1, keepdims=True) + 1e-9)
    Yn = Y / (np.linalg.norm(Y, axis=1, keepdims=True) + 1e-9)
    C = 1 - Xn @ Yn.T
    N, M = C.shape
    D = np.full((N + 1, M + 1), np.inf); D[0, 0] = 0
    for i in range(1, N + 1):
        row, prev, ci = D[i], D[i - 1], C[i - 1]
        diag = np.minimum(prev[:-1], prev[1:])          # min(D[i-1,j-1], D[i-1,j])
        for j in range(1, M + 1):
            row[j] = ci[j - 1] + min(diag[j - 1], row[j - 1])
    i, j, path = N, M, []
    while i > 0 and j > 0:
        path.append((i - 1, j - 1))
        k = np.argmin([D[i - 1, j - 1], D[i - 1, j], D[i, j - 1]])
        if k == 0: i, j = i - 1, j - 1
        elif k == 1: i -= 1
        else: j -= 1
    return path[::-1], D[N, M] / (N + M)


def trim(a, thr=0.02):
    nz = np.where(np.abs(a) > np.abs(a).max() * thr)[0]
    return (nz[0], nz[-1] + 1) if len(nz) else (0, len(a))


def words_of(text):
    """Mots affichés (ponctuation haute collée au mot par une espace fine insécable) et mots à lire seuls."""
    shown = []
    for w in text.split():
        if re.fullmatch(r'[:;?!]+', w) and shown: shown[-1] += '\u00a0' + w
        else: shown.append(w)
    spoken = [re.sub(r"[^\w'’-]", '', w) for w in shown]
    return shown, spoken


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('lines'); ap.add_argument('vdir'); ap.add_argument('--out')
    a = ap.parse_args()
    lines = json.load(open(a.lines, encoding='utf-8'))
    lib = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar'))
    from kokoro_onnx import Kokoro
    k = Kokoro(os.path.join(lib, 'core/tts/kokoro-v1.0.onnx'), os.path.join(lib, 'core/tts/voices-v1.0.bin'))
    out = {}
    # voix Microsoft : les temps de mots donnés par le service sont exacts, on les prend tels quels
    tw = os.path.join(a.vdir, 'tts_words.json')
    TW = json.load(open(tw, encoding='utf-8')) if os.path.exists(tw) else {}
    for L in lines:
        if L['id'] in TW:
            shown, spoken = words_of(L['text'])
            for said, digits in L.get('show', {}).items():
                shown = [re.sub('(?i)^' + re.escape(said), digits, w) for w in shown]
            ws = TW[L['id']]
            if len(ws) == len(shown):
                out[L['id']] = [{'w': w, 't0': x[1], 't1': x[2]} for w, x in zip(shown, ws)]
                print(L['id'], 'temps du service', ' '.join(f"{x['w']}@{x['t0']:.2f}" for x in out[L['id']])); continue
            print(L['id'], f'temps du service ignorés ({len(ws)} mots contre {len(shown)}), alignement DTW')

        shown, spoken = words_of(L['text'])
        for said, digits in L.get('show', {}).items():          # dit en lettres, écrit en chiffres
            shown = [re.sub('(?i)^' + re.escape(said), digits, w) for w in shown]
        ref, bounds = [], [0]
        for w in spoken:
            s, sr = k.create(w, voice=(L.get('voice', 'ff_siwis') if not L.get('voice', '').endswith('Neural') else 'ff_siwis'), speed=1.0, lang=L.get('lang', 'fr-fr'))
            g = np.gcd(sr, SR); s = resample_poly(s, SR // g, sr // g).astype('float32')
            i0, i1 = trim(s); s = s[i0:i1]
            ref.append(s); bounds.append(bounds[-1] + len(s))
        ref = np.concatenate(ref)
        tgt = load(os.path.join(a.vdir, L['id'] + '.wav'))
        t0, t1 = trim(tgt)
        X, Y = mfcc(ref), mfcc(tgt[t0:t1])
        path, cost = dtw_path(X, Y)
        p = np.array(path)
        def map_frame(fx):
            m = p[p[:, 0] == min(fx, len(X) - 1), 1]
            return m.mean() if len(m) else fx * len(Y) / len(X)
        bt = [(t0 + map_frame(b // HOP) * HOP) / SR for b in bounds]
        bt[0], bt[-1] = t0 / SR, t1 / SR
        # fin de mot : dernière trame audible avant le mot suivant (la pause n'appartient pas au mot)
        rms = np.sqrt(np.convolve(tgt ** 2, np.ones(320) / 320, mode='same'))
        thr = rms.max() * 0.06
        ws = []
        for i, w in enumerate(shown):
            a0, a1 = int(bt[i] * SR), int(bt[i + 1] * SR)
            loud = np.where(rms[a0:a1] > thr)[0]
            e = (a0 + loud[-1] + 160) / SR if len(loud) else bt[i + 1]
            ws.append({'w': w, 't0': round(bt[i], 3), 't1': round(max(bt[i] + 0.08, min(e, bt[i + 1])), 3)})
        out[L['id']] = ws
        print(L['id'], f'cost {cost:.3f}', ' '.join(f"{x['w']}@{x['t0']:.2f}" for x in out[L['id']]))
    json.dump(out, open(a.out or os.path.join(a.vdir, 'words.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
