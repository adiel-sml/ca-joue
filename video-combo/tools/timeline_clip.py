"""Minutage d'un clip à partir de la chanson : python tools/timeline_clip.py  →  timeline.js et timeline.json

Lit song.json et lines.json (écrits par tools/lyrics_align.py), voice/words.json (temps absolus des mots dans la chanson)
et clip.json (titre, artiste, éventuellement "debut"/"fin" en secondes pour ne garder qu'un extrait).
Tempo et premier temps : tools/beat.py sur la chanson (calculés ici). Sections : intro, une par strophe (refrains
marqués), fin ; chaque section commence sur le temps qui précède son premier mot. La musique du film est la chanson.
"""
import os, json, math, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
song = json.load(open('song.json', encoding='utf-8'))
lines = json.load(open('lines.json', encoding='utf-8'))
W = json.load(open('voice/words.json', encoding='utf-8'))
clip = json.load(open('clip.json', encoding='utf-8')) if os.path.exists('clip.json') else {}
bt = json.loads(subprocess.run([sys.executable, os.path.join(HERE, 'beat.py'), song['song']], capture_output=True, text=True, check=True).stdout)
B = 60 / bt['bpm']; B0 = bt['beat0'] % B; BAR = 4 * B
start, end = clip.get('debut', 0.0), clip.get('fin', song['duration'])
beat_before = lambda t: B0 + math.floor((t - B0) / B + 1e-6) * B
TLL = []
for L in lines:
    ws = [w for w in W[L['id']] if start <= w['t0'] < end]
    if not ws: continue
    ws = [{'w': w['w'], 't0': round(w['t0'] - start, 3), 't1': round(min(w['t1'], end) - start, 3)} for w in ws]
    TLL.append({'id': L['id'], 'file': L['id'], 'stanza': L['stanza'], 'label': L['label'], 'chorus': L['chorus'],
                't0': ws[0]['t0'], 't1': ws[-1]['t1'], 'src0': ws[0]['t0'], 'src1': ws[-1]['t1'], 'words': ws})
dur = round(end - start, 3)
S, order = {}, []
first = TLL[0]['t0'] if TLL else dur
S['intro'] = {'t0': 0.0, 't1': max(0.0, beat_before(first - 0.25 + start) - start), 'label': 'intro'}
order.append('intro')
for st in sorted({L['stanza'] for L in TLL}):
    ls = [L for L in TLL if L['stanza'] == st]
    t0 = max(S[order[-1]]['t0'] + B, beat_before(ls[0]['t0'] - 0.25 + start) - start)
    S[order[-1]]['t1'] = t0
    key = f's{st + 1}'
    S[key] = {'t0': t0, 't1': None, 'label': ls[0]['label'], 'chorus': ls[0]['chorus'], 'lines': [L['id'] for L in ls]}
    order.append(key)
last = TLL[-1]['t1'] if TLL else 0
out0 = min(dur, beat_before(last + 1.0 + start) - start + B)
S[order[-1]]['t1'] = out0
S['outro'] = {'t0': out0, 't1': dur, 'label': 'outro'}
order.append('outro')
if S['intro']['t1'] <= 0: del S['intro']; order.remove('intro')
TL = {'mode': 'clip', 'B': B, 'BAR': BAR, 'beat0': round((B0 - start) % B, 4), 'bpm': bt['bpm'], 'dur': dur, 'S': S, 'order': order,
      'lines': TLL, 'clip': clip, 'novoice': True, 'end_hold_max': 1e9, 'size': os.environ.get('SIZE', '1080x1920'),
      'score': {'track': {'file': song['song'], 'beat0': start, 'gain': 0}, 'spans': [], 'silences': [], 'ambience': [], 'crashes': []}}
open('timeline.js', 'w', encoding='utf-8').write('window.TL = ' + json.dumps(TL, ensure_ascii=False, indent=1) + ';\n')
json.dump(TL, open('timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f"tempo {bt['bpm']} BPM, premier temps {B0:.3f} s, durée {dur:.1f} s")
for k in order: print(f"{k:6s} {S[k]['t0']:6.2f} → {S[k]['t1']:6.2f}  {S[k].get('label', '')}{' (refrain)' if S[k].get('chorus') else ''}")
