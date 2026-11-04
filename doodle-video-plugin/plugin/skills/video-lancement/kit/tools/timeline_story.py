"""Minutage d'une histoire ou d'une explication : python tools/timeline_story.py voix_dir  →  timeline.js et timeline.json

Lit story.json :
  {"bpm": 110, "end_hold": 3.0,
   "scenes": [{"id": "salon", "lines": ["l1", "l2"], "mode": "sparse", "min_bars": 2, "pause": 0.0, "gap": 0.35}, …]}
Les répliques s'enchaînent sans temps mort (gap 0,12 s par défaut) ; chaque scène coupe sur le temps qui suit sa dernière
réplique ; la musique garde sa grille de mesures et change d'ambiance à la mesure la plus proche. pause : secondes de silence (musique coupée) au début de la scène.
modes de musique : sparse, brass, funk, quiz, quizFast, dream, sweet, tension, pop, popBig, light, end.
"""
import sys, json, math, os
vdir = sys.argv[1] if len(sys.argv) > 1 else 'voice'
ST = json.load(open('story.json', encoding='utf-8'))
W = json.load(open(os.path.join(vdir, 'words.json'), encoding='utf-8'))
B = 60 / ST.get('bpm', 120); BAR = 4 * B
up_bar = lambda t: math.ceil(t / BAR - 1e-6) * BAR
up_beat = lambda t: math.ceil(t / B - 1e-6) * B
near_bar = lambda t: round(t / BAR) * BAR
lines, S, spans, crashes, silences = [], {}, [], [], []
t = 0.0
for i, sc in enumerate(ST['scenes']):
    t0 = t; cur = t0 + sc.get('pause', 0.0) + sc.get('lead', 0.15)
    for lid in sc['lines']:
        ws = W[lid]; s0 = ws[0]['t0']
        L = {'id': lid, 'file': lid, 'src0': s0, 'src1': ws[-1]['t1'], 't0': round(cur, 3),
             'words': [{'w': w['w'], 't0': round(cur + w['t0'] - s0, 3), 't1': round(cur + w['t1'] - s0, 3)} for w in ws]}
        L['t1'] = L['words'][-1]['t1']; lines.append(L); cur = L['t1'] + sc.get('gap', ST.get('gap', 0.12))
    # la scène coupe sur le temps qui suit la dernière réplique : pas de mesure entière d'attente
    t1 = max(t0 + sc.get('min_beats', 4) * B, up_beat(cur + sc.get('tail', 0.05)))
    if i == len(ST['scenes']) - 1: t1 = up_beat(cur + ST.get('end_hold', 1.4))
    S[sc['id']] = {'t0': t0, 't1': t1, 'lines': sc['lines']}
    spans.append([near_bar(t0), near_bar(t1) if i < len(ST['scenes']) - 1 else t1, sc.get('mode', 'pop'), sc.get('tr', 0)])
    if i: crashes.append(t0)
    if sc.get('pause'): silences.append([t0, t0 + sc['pause']])
    t = t1
TL = {'B': B, 'BAR': BAR, 'dur': t, 'S': S, 'lines': lines, 'size': os.environ.get('SIZE', ST.get('size', '1080x1920')),
      'score': {'track': ST.get('track'), 'spans': [] if ST.get('track') else spans, 'crashes': crashes, 'silences': silences, 'jingles': [], 'fanfares': [], 'rolls': [], 'ambience': ST.get('ambience', [])}}
open('timeline.js', 'w', encoding='utf-8').write('window.TL = ' + json.dumps(TL, ensure_ascii=False, indent=1) + ';\n')
json.dump(TL, open('timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in S.items(): print(f"{k:10s} {v['t0']:6.2f} → {v['t1']:6.2f}")
print('durée', t)
