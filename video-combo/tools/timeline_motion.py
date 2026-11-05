"""Minutage d'un film de motion (l'interface de l'appli qui bouge) : python tools/timeline_motion.py [voix_dir]  →  timeline.js, timeline.json

Lit motion.json :
  {"bpm": 120, "track": {"file": "musique.mp3", "beat0": 0.0, "gain": -2},     (facultatif : musique de l'utilisateur, sinon partition)
   "sections": [{"id": "accroche", "beats": 8, "mode": "pop", "lines": ["l1"], "stop": 0, "crash": true}, …]}
Chaque section dure un nombre de temps (la grille de la musique) ; si elle a des répliques (voix off facultative, voix_dir/words.json),
elle s'allonge jusqu'au temps qui suit la dernière. "stop" : secondes de quasi-silence au début de la section (l'arrêt avant l'impact).
Modes de partition : sparse, brass, funk, quiz, quizFast, dream, sweet, tension, pop, popBig, light, end.
Règle du rythme : rien de neuf pendant plus de deux mesures = temps mort (check.py le mesure sur les événements du film).
"""
import sys, json, math, os
vdir = sys.argv[1] if len(sys.argv) > 1 else 'voice'
M = json.load(open('motion.json', encoding='utf-8'))
wpath = os.path.join(vdir, 'words.json')
W = json.load(open(wpath, encoding='utf-8')) if os.path.exists(wpath) else {}
B = 60 / M.get('bpm', 120); BAR = 4 * B
up_beat = lambda t: math.ceil(t / B - 1e-6) * B
lines, S, order, spans, crashes, silences = [], {}, [], [], [], []
t = 0.0
for i, sc in enumerate(M['sections']):
    t0 = t; cur = t0 + sc.get('stop', 0.0) + sc.get('lead', 0.1)
    for lid in sc.get('lines', []):
        if lid not in W: sys.exit(f'réplique {lid} sans voix : lance tools/tts.py ou tools/align.py avant')
        ws = W[lid]; s0 = ws[0]['t0']
        L = {'id': lid, 'file': lid, 'src0': s0, 'src1': ws[-1]['t1'], 't0': round(cur, 3),
             'words': [{'w': w['w'], 't0': round(cur + w['t0'] - s0, 3), 't1': round(cur + w['t1'] - s0, 3)} for w in ws]}
        L['t1'] = L['words'][-1]['t1']; lines.append(L); cur = L['t1'] + sc.get('gap', 0.12)
    t1 = max(t0 + sc.get('beats', 8) * B, up_beat(cur + 0.05) if sc.get('lines') else 0)
    S[sc['id']] = {'t0': round(t0, 4), 't1': round(t1, 4), 'label': sc.get('label', sc['id']), 'lines': sc.get('lines', [])}
    order.append(sc['id'])
    spans.append([t0, t1, sc.get('mode', 'pop'), 0])
    if i and sc.get('crash', True): crashes.append(t0)
    if sc.get('stop'): silences.append([t0, t0 + sc['stop']])
    t = t1
TL = {'mode': 'motion', 'B': B, 'BAR': BAR, 'beat0': 0, 'bpm': M.get('bpm', 120), 'dur': round(t, 4), 'S': S, 'order': order, 'lines': lines,
      'novoice': not lines, 'size': os.environ.get('SIZE', M.get('size', '1080x1920')),
      'score': {'track': M.get('track'), 'spans': [] if M.get('track') else spans, 'crashes': crashes, 'silences': silences,
                'jingles': [], 'fanfares': [], 'rolls': [], 'ambience': M.get('ambience', [])}}
open('timeline.js', 'w', encoding='utf-8').write('window.TL = ' + json.dumps(TL, ensure_ascii=False, indent=1) + ';\n')
json.dump(TL, open('timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k in order: print(f"{k:12s} {S[k]['t0']:6.2f} → {S[k]['t1']:6.2f}")
print(f"durée {t:.2f} s, {M.get('bpm', 120)} BPM" + ('' if lines else ', sans voix'))
