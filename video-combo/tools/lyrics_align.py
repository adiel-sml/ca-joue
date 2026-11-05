"""Cale les paroles d'une chanson sur l'enregistrement : python tools/lyrics_align.py chanson.mp3 paroles.txt [--lang fr] [--model small]

paroles.txt : une ligne par vers, une ligne vide entre deux strophes ; une strophe peut commencer par [Couplet 1],
[Refrain], [Pont]… (sinon les strophes répétées sont reconnues comme refrain).
1. Whisper transcrit la chanson mot par mot (les paroles servent d'indice pour le vocabulaire).
2. Les mots entendus sont alignés sur les mots écrits (programmation dynamique, ressemblance des mots) ;
   chaque mot écrit retrouvé prend le temps entendu, les autres sont placés entre leurs voisins.
3. Écrit lines.json (un vers par ligne, avec sa strophe) et voice/words.json (temps absolus dans la chanson),
   plus lyrics_report.txt : la part de mots retrouvés par vers. Un vers sous 50 % est à vérifier à l'oreille.
"""
import sys, os, json, re, argparse, difflib, unicodedata, subprocess, tempfile
ap = argparse.ArgumentParser(); ap.add_argument('song'); ap.add_argument('lyrics'); ap.add_argument('--lang', default='fr'); ap.add_argument('--model', default='small')
a = ap.parse_args()

def norm(w):
    w = w.lower().replace('’', "'")
    w = ''.join(c for c in unicodedata.normalize('NFD', w) if unicodedata.category(c) != 'Mn')
    return re.sub(r"[^a-z0-9']", '', w)

# --- paroles : strophes et vers
stanzas, cur, label = [], [], None
for raw in open(a.lyrics, encoding='utf-8').read().splitlines() + ['']:
    l = raw.strip()
    m = re.fullmatch(r'\[(.+?)\]', l)
    if m: label = m.group(1); continue
    if not l:
        if cur: stanzas.append({'label': label, 'lines': cur}); cur, label = [], None
        continue
    cur.append(l)
seen = {}
for i, st in enumerate(stanzas):
    key = ' '.join(st['lines']).lower()
    if not st['label']: st['label'] = 'Refrain' if key in seen else f'Strophe {i + 1}'
    lab = st['label'].lower()
    if ('refrain' in lab or 'chorus' in lab or 'hook' in lab) and not lab.startswith(('pré', 'pre')) or key in seen: st['chorus'] = True
    seen.setdefault(key, i)
lines, words = [], []
for si, st in enumerate(stanzas):
    for v in st['lines']:
        lid = f'v{len(lines) + 1}'
        shown = [w for w in v.replace(' ?', ' ?').replace(' !', ' !').replace(' :', ' :').split(' ') if w]
        lines.append({'id': lid, 'text': v, 'stanza': si, 'label': st['label'], 'chorus': bool(st.get('chorus'))})
        words += [(lid, w, norm(w)) for w in shown]

# --- transcription mot par mot
with tempfile.TemporaryDirectory() as td:
    wav = os.path.join(td, 's.wav'); subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', a.song, '-ac', '1', '-ar', '16000', wav], check=True)
    from faster_whisper import WhisperModel
    m = WhisperModel(a.model, device='cpu', compute_type='int8')
    prompt = ' '.join(l['text'] for l in lines)[:600]
    segs, info = m.transcribe(wav, language=a.lang, word_timestamps=True, initial_prompt=prompt, vad_filter=True, beam_size=5)
    heard = [(norm(w.word), w.start, w.end) for s in segs for w in (s.words or []) if norm(w.word)]
    dur = info.duration
print(len(heard), 'mots entendus,', len(words), 'mots écrits')

# --- alignement (Needleman-Wunsch avec ressemblance des mots)
sim = lambda x, y: 1.0 if x == y else difflib.SequenceMatcher(None, x, y).ratio()
N, M = len(words), len(heard)
GAP = -0.45
import numpy as np
S = np.zeros((N + 1, M + 1)); S[1:, 0] = GAP * np.arange(1, N + 1); S[0, 1:] = GAP * np.arange(1, M + 1)
for i in range(1, N + 1):
    wi = words[i - 1][2]
    for j in range(1, M + 1):
        s = sim(wi, heard[j - 1][0]); s = s * 2 - 1 if s >= 0.5 else -1.0
        S[i, j] = max(S[i - 1, j - 1] + s, S[i - 1, j] + GAP, S[i, j - 1] + GAP)
times = [None] * N; i, j = N, M
while i > 0 and j > 0:
    s = sim(words[i - 1][2], heard[j - 1][0]); sc = s * 2 - 1 if s >= 0.5 else -1.0
    if abs(S[i, j] - (S[i - 1, j - 1] + sc)) < 1e-9:
        if s >= 0.5: times[i - 1] = (heard[j - 1][1], heard[j - 1][2])
        i, j = i - 1, j - 1
    elif abs(S[i, j] - (S[i - 1, j] + GAP)) < 1e-9: i -= 1
    else: j -= 1
found = [t is not None for t in times]
# Whisper rattache souvent le silence qui précède un vers à son premier mot : un mot anormalement long commence trop tôt
for q, t in enumerate(times):
    if t is None: continue
    n_ = len(words[q][2]); longest = max(0.45, 0.11 * n_ + 0.2)
    if t[1] - t[0] > longest: times[q] = (t[1] - min(longest, 0.07 * n_ + 0.18), t[1])
# mots non retrouvés : placés entre leurs voisins retrouvés
k = 0
while k < N:
    if times[k] is None:
        e = k
        while e < N and times[e] is None: e += 1
        t0 = times[k - 1][1] if k > 0 else (times[e][0] - 0.4 * (e - k) if e < N else 0)
        t1 = times[e][0] if e < N else min(dur, t0 + 0.4 * (e - k))
        step = max(0.08, (t1 - t0) / (e - k + 1))
        for q in range(k, e): times[q] = (t0 + step * (q - k + 0.5), t0 + step * (q - k + 1.3))
        k = e
    else: k += 1
W, rep = {}, []
for (lid, w, _), (t0, t1), f in zip(words, times, found):
    W.setdefault(lid, []).append({'w': w, 't0': round(t0, 3), 't1': round(max(t1, t0 + 0.08), 3), 'heard': f})
for L in lines:
    ws = W[L['id']]; p = sum(x['heard'] for x in ws) / len(ws)
    L['found'] = round(p, 2)
    rep.append(f"{'OK  ' if p >= 0.5 else 'À VÉRIFIER'} {L['id']:4s} {p:4.0%}  {ws[0]['t0']:6.2f} s  {L['text']}")
os.makedirs('voice', exist_ok=True)
json.dump(W, open('voice/words.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open('lines.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump({'song': a.song, 'duration': round(dur, 3), 'stanzas': [{'label': s['label'], 'chorus': bool(s.get('chorus'))} for s in stanzas]}, open('song.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open('lyrics_report.txt', 'w', encoding='utf-8').write('\n'.join(rep) + '\n')
print('\n'.join(rep)); print(f'mots retrouvés : {sum(found)}/{N}')
