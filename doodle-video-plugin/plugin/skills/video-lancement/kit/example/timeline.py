"""Minutage du film à partir de la voix : python tools/timeline.py voix_dir  →  timeline.js (window.TL)

Tempo fixe 120 BPM (temps = 0,5 s, mesure = 2 s). Chaque section commence sur une barre de mesure ;
sa longueur en mesures entières dépend de la durée réelle des lignes de voix (words.json de tools/align.py).
Les lignes 2 et 7 sont coupées en deux à leur première phrase (« Sors ton téléphone. » / « Et celui qui perd ? »).
"""
import sys, json, math, os

B, BAR = 0.5, 2.0
vdir = sys.argv[1] if len(sys.argv) > 1 else 'voice'
W = json.load(open(os.path.join(vdir, 'words.json'), encoding='utf-8'))
up_bar = lambda t: math.ceil(t / BAR - 1e-6) * BAR
up_beat = lambda t: math.ceil(t / B - 1e-6) * B
q16 = lambda t: round(t / (B / 4)) * (B / 4)

lines = []          # {id, file, src0, src1, t0, words:[{w,t0,t1}]}  (t absolus dans le film)


def place(id_, t0, i0=0, i1=None, name=None):
    ws = W[id_][i0:i1]
    s0 = ws[0]['t0']
    L = {'id': name or id_, 'file': id_, 'src0': round(s0, 3), 'src1': round(ws[-1]['t1'], 3),
         't0': round(t0, 3), 'words': [{'w': w['w'], 't0': round(t0 + w['t0'] - s0, 3), 't1': round(t0 + w['t1'] - s0, 3)} for w in ws]}
    L['t1'] = L['words'][-1]['t1']
    lines.append(L)
    return L


def split_at(id_, end_char):
    return next(i for i, w in enumerate(W[id_]) if w['w'].endswith(end_char)) + 1


def word(L, prefix):
    return next(w for w in L['words'] if w['w'].lower().startswith(prefix.lower()))


S = {}
# 1. Accroche
l1 = place('l1', 0.30)
k2 = split_at('l2', '.')
d2a = W['l2'][k2 - 1]['t1'] - W['l2'][0]['t0']
land = max(4.0, up_bar(l1['t1'] + 0.4 + d2a + 0.12))
S['hook'] = {'t0': 0.0, 't1': land, 'silence': up_beat(l1['t1'] + 0.05)}
l2a = place('l2', land - 0.12 - d2a, 0, k2, 'l2a')
S['hook']['silence'] = min(S['hook']['silence'], math.floor((l2a['t0'] - 0.05) / B) * B)
# 2. Révélation, 23 jeux
l2b = place('l2', land + 0.5, k2, None, 'l2b')
vt = word(l2b, '23')
S['reveal'] = {'t0': land, 'land': land, 'rain0': land + 0.25, 'n23': q16(vt['t0']), 't1': up_bar(l2b['t1'] + 0.5)}
# 3–6. Les quatre manches : une mesure de carte (la voix y dit la catégorie), puis le jeu
t = S['reveal']['t1']
for key, lid, minplay in [('r1', 'l3', 1), ('r2', 'l4', 2), ('r3', 'l5', 1), ('r4', 'l6', 2)]:
    L = place(lid, t + 0.5)
    play = max(minplay * BAR, up_bar(L['t1'] + 0.5 - (t + BAR)))
    S[key] = {'t0': t, 'card1': t + BAR, 't1': t + BAR + play, 'line': L['id']}
    t = S[key]['t1']
# 7. Le gage : question, silence, réponse et tampon
k7 = split_at('l7', '?')
l7a = place('l7', t + 0.25, 0, k7, 'l7a')
sil0 = up_beat(l7a['t1'] + 0.1)
d7b = W['l7'][-1]['t1'] - W['l7'][k7]['t0']
g_rel = next(w for w in W['l7'][k7:] if w['w'].startswith('gage'))['t0'] - W['l7'][k7]['t0']
stamp = up_beat(sil0 + 0.9 + g_rel)          # près d'une seconde de vrai silence avant « Il fait un gage »
l7b = place('l7', stamp - g_rel, k7, None, 'l7b')
S['gage'] = {'t0': t, 'silence': sil0, 'stamp': stamp, 't1': up_bar(max(l7b['t1'] + 0.5, stamp + 1.0))}
t = S['gage']['t1']
# 8. Sans réseau
l8 = place('l8', t + 0.25)
S['offline'] = {'t0': t, 't1': max(t + 2 * BAR, up_bar(l8['t1'] + 0.3))}
t = S['offline']['t1']
# 9. Final : photo de groupe, puis l'écran de fin tenu au moins 4 s
l9 = place('l9', t + 0.5)
snap = up_beat(l9['t1'] + 0.35)
S['final'] = {'t0': t, 'snap': snap, 't1': up_bar(snap + 4.4)}
dur = S['final']['t1']

# Partition : ce que tools/music.py joue, section par section (modes : sparse, brass, funk, quiz, quizFast, dream,
# sweet, tension, pop, popBig, light, end ; tr = transposition en demi-tons).
H, G, F = S['hook'], S['gage'], S['final']
spans = [[0, H['silence'], 'sparse', 0], [S['reveal']['t0'], S['r1']['t0'], 'brass', 0]]
for key, mode in [('r1', 'funk'), ('r2', 'quiz'), ('r3', 'dream'), ('r4', 'sweet')]:
    R = S[key]
    if key == 'r2': spans += [[R['card1'], R['card1'] + BAR, 'quiz', 0], [R['card1'] + BAR, R['t1'] - BAR / 4, 'quizFast', 0]]
    else: spans.append([R['card1'], R['t1'], mode, 0])
spans += [[G['t0'], G['silence'], 'tension', 0], [G['stamp'] - (G['stamp'] % BAR), G['t1'], 'pop', 0],
          [S['offline']['t0'], S['offline']['t1'], 'light', 0], [F['t0'], F['snap'], 'popBig', 2], [F['snap'], F['t1'], 'end', 2]]
SCORE = {'spans': spans, 'jingles': [S[k]['t0'] for k in ('r1', 'r2', 'r3', 'r4')], 'crashes': [S['reveal']['t0'], F['snap']],
         'fanfares': [[F['snap'], 2]], 'rolls': [[G['silence'] - BAR / 2, G['silence']]],
         'silences': [[H['silence'], H['t1']], [G['silence'], G['stamp'] - 0.005]],
         'ambience': [['room', 0, H['silence']], ['crickets', S['r3']['card1'], S['r3']['t1']], ['cheer', F['snap'] - 1.2, F['snap'] + 0.6]]}

TL = {'B': B, 'BAR': BAR, 'dur': dur, 'S': S, 'lines': lines, 'score': SCORE}
open('timeline.js', 'w', encoding='utf-8').write('window.TL = ' + json.dumps(TL, ensure_ascii=False, indent=1) + ';\n')
json.dump(TL, open('timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in S.items(): print(f"{k:8s} {v['t0']:6.2f} → {v['t1']:6.2f}")
print('durée', dur)
