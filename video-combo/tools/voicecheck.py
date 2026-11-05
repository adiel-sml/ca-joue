"""Contrôle de la voix en français : python tools/voicecheck.py lines.json voice/ [--model small]

Transcrit chaque ligne avec Whisper (faster-whisper) et la compare au texte : minuscules, sans ponctuation ni accents,
nombres en chiffres ou en lettres équivalents (0 à 100), « 1er », élisions. prononciation.json (facultatif, à côté de
lines.json) déclare les homophones et noms propres que Whisper écrit autrement : {"ça joue": ["s ajout", "sa joue"]}. Une ligne passe si 85 % de ses mots sont
retrouvés dans l'ordre. Code de sortie : 0 tout passe, 1 des lignes diffèrent, 2 contrôle impossible (modèle, réseau).
"""
import sys, os, json, re, difflib, unicodedata, argparse
ap = argparse.ArgumentParser(); ap.add_argument('lines'); ap.add_argument('vdir'); ap.add_argument('--model', default='small'); ap.add_argument('--seuil', type=float, default=0.85)
a = ap.parse_args()
U = 'zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize'.split()
D = {20: 'vingt', 30: 'trente', 40: 'quarante', 50: 'cinquante', 60: 'soixante', 80: 'quatre-vingt'}
def fr(n):
    if n < 17: return U[n]
    if n < 20: return 'dix-' + U[n - 10]
    if n == 100: return 'cent'
    t, u = divmod(n, 10)
    if t in (7, 9): return D[60 if t == 7 else 80] + ('-et-' if n == 71 else '-') + fr(10 + u)
    base = D[t * 10]
    return base + ('s' if n == 80 else '') if u == 0 else base + ('-et-un' if u == 1 and t != 8 else '-' + U[u])
NUM = {fr(n).replace('-', ' '): str(n) for n in range(101)}
def norm(s):
    s = s.lower().replace('’', "'").replace('œ', 'oe')
    s = re.sub(r"\b([a-z])'", r'\1 ', s)
    s = ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9 ]+', ' ', s.replace('-', ' '))
    for k in sorted(NUM, key=len, reverse=True): s = re.sub(r'\b' + k + r'\b', NUM[k], s)
    s = re.sub(r'\b(\d+)(er|e|eme)\b', r'\1', s)
    return s.split()
try:
    from faster_whisper import WhisperModel
    m = WhisperModel(a.model, device='cpu', compute_type='int8')
except Exception as e:
    print('contrôle impossible :', str(e)[:200]); sys.exit(2)
EQ = {}
pj = os.path.join(os.path.dirname(os.path.abspath(a.lines)), 'prononciation.json')
if os.path.exists(pj):
    for canon, variants in json.load(open(pj, encoding='utf-8')).items():
        for v in variants: EQ[' '.join(norm(v))] = ' '.join(norm(canon))
def canon(words):
    s = ' ' + ' '.join(words) + ' '
    for v in sorted(EQ, key=len, reverse=True): s = s.replace(' ' + v + ' ', ' ' + EQ[v] + ' ')
    return s.split()
bad = 0
for L in json.load(open(a.lines, encoding='utf-8')):
    p = os.path.join(a.vdir, L['id'] + '.wav')
    if not os.path.exists(p): continue
    segs, _ = m.transcribe(p, language='fr', beam_size=5, vad_filter=False)
    heard = ' '.join(s.text for s in segs).strip()
    x, y = canon(norm(L['text'])), canon(norm(heard))
    r = difflib.SequenceMatcher(None, x, y).ratio()
    ok = r >= a.seuil; bad += not ok
    print(f"{'OK  ' if ok else 'DIFF'} {L['id']:5s} {r:.2f} | {L['text']} → {heard}")
sys.exit(1 if bad else 0)
