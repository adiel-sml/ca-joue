"""Minutage du film à partir de la voix : python tools/timeline.py voix_dir  →  timeline.js (window.TL) et timeline.json

Tempo fixe 120 BPM (temps = 0,5 s, mesure = 2 s). Chaque section commence sur une barre de mesure ; sa longueur en
mesures entières dépend de la durée réelle de sa ligne de voix (words.json de tools/align.py).
Structure : accroche, révélation (23 jeux), six jeux, la partie couple, le gage, le final.
"""
import sys, json, math, os

B, BAR = 0.5, 2.0
vdir = sys.argv[1] if len(sys.argv) > 1 else 'voice'
W = json.load(open(os.path.join(vdir, 'words.json'), encoding='utf-8'))
up_bar = lambda t: math.ceil(t / BAR - 1e-6) * BAR
up_beat = lambda t: math.ceil(t / B - 1e-6) * B
q16 = lambda t: round(t / (B / 4)) * (B / 4)
lines = []

def place(id_, t0, i0=0, i1=None, name=None):
    ws = W[id_][i0:i1]; s0 = ws[0]['t0']
    L = {'id': name or id_, 'file': id_, 'src0': round(s0, 3), 'src1': round(ws[-1]['t1'], 3), 't0': round(t0, 3),
         'words': [{'w': w['w'], 't0': round(t0 + w['t0'] - s0, 3), 't1': round(t0 + w['t1'] - s0, 3)} for w in ws]}
    L['t1'] = L['words'][-1]['t1']; lines.append(L); return L
def split_at(id_, end_char): return next(i for i, w in enumerate(W[id_]) if w['w'].endswith(end_char)) + 1
def word(L, prefix): return next(w for w in L['words'] if w['w'].lower().startswith(prefix.lower()))

S = {}
# 1. Accroche, puis « Sors ton téléphone » dans le silence
l1 = place('l1', 0.30)
k2 = split_at('l2', '.')
d2a = W['l2'][k2 - 1]['t1'] - W['l2'][0]['t0']
land = max(4.0, up_bar(l1['t1'] + 0.4 + d2a + 0.12))
l2a = place('l2', land - 0.12 - d2a, 0, k2, 'l2a')
S['hook'] = {'t0': 0.0, 't1': land, 'silence': min(up_beat(l1['t1'] + 0.05), math.floor((l2a['t0'] - 0.05) / B) * B)}
# 2. Révélation : 23 jeux
l2b = place('l2', land + 0.5, k2, None, 'l2b')
S['reveal'] = {'t0': land, 'rain0': land + 0.25, 'n23': q16(word(l2b, '23')['t0']), 't1': up_bar(l2b['t1'] + 0.5)}
# 3. Six jeux, puis la partie couple : une section par ligne
t = S['reveal']['t1']
for key, lid, minbars in [('mime', 'l3', 1), ('bomb', 'l4', 2), ('uc', 'l5', 1), ('lg', 'l6', 1), ('wyr', 'l7', 1), ('av', 'l8', 1), ('couple', 'l9', 2)]:
    L = place(lid, t + 0.25)
    S[key] = {'t0': t, 't1': t + max(minbars * BAR, up_bar(L['t1'] + 0.45 - t)), 'line': lid}
    t = S[key]['t1']
# 4. Le gage : la question, un vrai silence, puis « Tu fais un gage » et le tampon
k10 = split_at('l10', '?')
l10a = place('l10', t + 0.25, 0, k10, 'l10a')
sil0 = up_beat(l10a['t1'] + 0.1)
g_rel = next(w for w in W['l10'][k10:] if w['w'].startswith('gage'))['t0'] - W['l10'][k10]['t0']
stamp = up_beat(sil0 + 0.9 + g_rel)
l10b = place('l10', stamp - g_rel, k10, None, 'l10b')
S['gage'] = {'t0': t, 'silence': sil0, 'stamp': stamp, 't1': up_bar(max(l10b['t1'] + 0.5, stamp + 1.0))}
t = S['gage']['t1']
# 5. Final : photo de groupe, puis l'écran de fin tenu au moins 4 s
l11 = place('l11', t + 0.5)
snap = up_beat(l11['t1'] + 0.35)
S['final'] = {'t0': t, 'snap': snap, 't1': up_bar(snap + 4.4)}
dur = S['final']['t1']

# Partition (jouée par tools/music.py) : toujours rythmée, sauf les deux silences voulus
H, G, F = S['hook'], S['gage'], S['final']
spans = [[0, H['silence'], 'sparse', 0], [S['reveal']['t0'], S['mime']['t0'], 'brass', 0],
         [S['mime']['t0'], S['mime']['t1'], 'funk', 0],
         [S['bomb']['t0'], S['bomb']['t0'] + BAR, 'quiz', 0], [S['bomb']['t0'] + BAR, S['bomb']['t1'] - BAR / 4, 'quizFast', 0],
         [S['uc']['t0'], S['uc']['t1'], 'pop', 0], [S['lg']['t0'], S['lg']['t1'], 'dream', 0],
         [S['wyr']['t0'], S['wyr']['t1'], 'brass', 0], [S['av']['t0'], S['av']['t1'], 'funk', 0],
         [S['couple']['t0'], S['couple']['t1'], 'sweet', 0],
         [G['t0'], G['silence'], 'tension', 0], [G['stamp'] - (G['stamp'] % BAR), G['t1'], 'pop', 0],
         [F['t0'], F['snap'], 'popBig', 2], [F['snap'], F['t1'], 'end', 2]]
SCORE = {'spans': spans, 'jingles': [S['mime']['t0'], S['couple']['t0']],
         'crashes': [S['reveal']['t0'], S['bomb']['t0'], S['uc']['t0'], S['lg']['t0'], S['wyr']['t0'], S['av']['t0'], F['snap']],
         'fanfares': [[F['snap'], 2]], 'rolls': [[G['silence'] - BAR / 2, G['silence']]],
         'silences': [[H['silence'], H['t1']], [G['silence'], G['stamp'] - 0.005]],
         'ambience': [['room', 0, H['silence']], ['crickets', S['lg']['t0'], S['lg']['t1']], ['cheer', F['snap'] - 1.2, F['snap'] + 0.6]]}
TL = {'B': B, 'BAR': BAR, 'dur': dur, 'S': S, 'lines': lines, 'score': SCORE}
open('timeline.js', 'w', encoding='utf-8').write('window.TL = ' + json.dumps(TL, ensure_ascii=False, indent=1) + ';\n')
json.dump(TL, open('timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in S.items(): print(f"{k:8s} {v['t0']:6.2f} → {v['t1']:6.2f}")
print('durée', dur)
