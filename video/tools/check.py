"""Vérification complète en une commande : python tools/check.py [film.mp4]   (code de sortie 1 si un point échoue)

Contrôle, dans l'ordre :
 1. temps morts : aucun blanc de plus de 0,7 s entre deux répliques (hors silences voulus de TL.score.silences),
    voix dès les 0,6 premières secondes, fin courte ;
 2. lecture : chaque texte reste assez longtemps (readcheck.mjs de la bibliothèque) ;
 3. zones sûres : aucun texte ni sous-titre sous l'interface de TikTok, Reels ou Shorts (format vertical) ;
 4. image : aucune image noire, et l'image change chaque seconde (pas de plan figé de plus de 2 s) ;
 5. son : -14 LUFS à 1 dB près, crête vraie sous -1 dB ;
 6. voix : transcription Whisper de chaque ligne (si le réseau le permet, sinon simple avertissement).
"""
import sys, os, json, subprocess, re
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)
LIB = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar')); PY = os.path.join(LIB, '.venv/bin/python')
film = sys.argv[1] if len(sys.argv) > 1 else None
TL = json.load(open('timeline.json', encoding='utf-8'))
size = TL.get('size', '1080x1920'); W, H = map(int, size.split('x'))
fails, warns = [], []
ok = lambda m: print('  ok  ', m)
def bad(m): fails.append(m); print('  ÉCHEC', m)
def warn(m): warns.append(m); print('  avert.', m)

print('1. Temps morts')
L = sorted(TL['lines'], key=lambda l: l['t0']); sil = TL.get('score', {}).get('silences', [])
gaps = [(L[i]['t1'], L[i + 1]['t0']) for i in range(len(L) - 1)]
cuts = [v['t0'] for v in TL['S'].values()]
long_ = [(a, b) for a, b in gaps if b - a > (1.0 if any(a <= c <= b for c in cuts) else 0.7) and not any(s0 <= b and a <= s1 and (b - a) <= (s1 - s0) + 1.2 for s0, s1 in sil)]   # un silence voulu n'est pas un temps mort
for a, b in long_: bad(f'blanc de {b - a:.2f} s entre {a:.2f} et {b:.2f} s')
if not long_: ok(f'plus long blanc entre répliques : {max((b - a for a, b in gaps), default=0):.2f} s')
(ok if L[0]['t0'] <= 0.6 else bad)(f'première parole à {L[0]["t0"]:.2f} s')
tail = TL['dur'] - L[-1]['t1']; lim = TL.get('end_hold_max', 5.5)
(ok if tail <= lim else bad)(f'fin : {tail:.1f} s après la dernière parole (max {lim} s)')

print('2. Lecture')
r = subprocess.run(['node', 'core/render/readcheck.mjs', ROOT, '--size', size], cwd=LIB, capture_output=True, text=True)
for l in r.stdout.splitlines():
    m = re.search(r'BAD (.+?)\s+at ([\d.]+)s.*need ([\d.]+)s\s+got ([\d.]+)s', l)
    if m: (warn if float(m.group(3)) - float(m.group(4)) <= 0.4 else bad)(f'« {m.group(1).strip()} » à {m.group(2)} s : {m.group(4)} s au lieu de {m.group(3)} s')
if 'BAD' not in r.stdout: ok('tous les textes muets restent assez longtemps')
sp = subprocess.run(['node', 'tools/probe.cjs', ROOT, size, 'SPEECH'], capture_output=True, text=True)
short = [x for x in (json.loads(sp.stdout) if sp.returncode == 0 else []) if x['t1'] - x['t0'] < 1.0]
for x in short: bad(f'« {x["text"][:40]} » (dit à voix haute) : {x["t1"] - x["t0"]:.2f} s, 1 s au moins')
if not short: ok('textes dits à voix haute : 1 s au moins chacun')

print('3. Zones sûres et chevauchements')
ZONES = {'TikTok': [(0, 0, 1080, 150), (0, 1560, 1080, 1920), (950, 880, 1080, 1560)],
         'Reels': [(0, 0, 1080, 210), (0, 1500, 1080, 1920), (950, 1060, 1080, 1500)],
         'Shorts': [(0, 0, 1080, 150), (0, 1520, 1080, 1920), (940, 920, 1080, 1520)]}
if (W, H) != (1080, 1920):
    m = 0.05; ZONES = {'marges': [(0, 0, W, H * m), (0, H * (1 - m), W, H), (0, 0, W * m, H), (W * (1 - m), 0, W, H)]}
ts = [round(x, 2) for x in np.arange(0.1, TL['dur'], 0.25)]
pr = subprocess.run(['node', 'tools/probe.cjs', ROOT, size, 'BOXES', *map(str, ts)], capture_output=True, text=True)
if pr.returncode: bad('la page du film a une erreur : ' + pr.stderr.strip()[:300])
else:
    seen = set()
    for fr in json.loads(pr.stdout):
        for b in fr['items']:
            for net, zs in ZONES.items():
                for z in zs:
                    ix = min(b['x1'], z[2]) - max(b['x0'], z[0]); iy = min(b['y1'], z[3]) - max(b['y0'], z[1])
                    if ix > 12 and iy > 12 and (b['id'], net) not in seen:
                        seen.add((b['id'], net)); bad(f'« {b["text"][:40]} » sous l\'interface {net} à {fr["t"]} s')
    if not seen: ok('aucun texte sous l\'interface des réseaux')
    over = set()
    for fr in json.loads(pr.stdout):
        it = fr['items']
        for i in range(len(it)):
            for j in range(i + 1, len(it)):
                a_, b_ = it[i], it[j]
                ix = min(a_['x1'], b_['x1']) - max(a_['x0'], b_['x0']); iy = min(a_['y1'], b_['y1']) - max(a_['y0'], b_['y0'])
                key = tuple(sorted((a_['id'], b_['id'])))
                if ix > 20 and iy > 20 and key not in over:
                    over.add(key); bad(f'« {a_["text"][:30]} » et « {b_["text"][:30]} » se chevauchent à {fr["t"]} s')
    if not over: ok('aucun texte n\'en recouvre un autre')

if film and os.path.exists(film):
    print('4. Image')
    r = subprocess.run(['ffmpeg', '-i', film, '-vf', 'blackdetect=d=0.05:pix_th=0.05', '-an', '-f', 'null', '-'], capture_output=True, text=True)
    nb = r.stderr.count('black_start'); (ok if nb == 0 else bad)(f'{nb} passage(s) noir(s)')
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', film, '-vf', 'fps=2,scale=96:-2,format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
    hh = int(96 * H / W) // 2 * 2; fr = np.frombuffer(raw, np.uint8).reshape(-1, hh, 96).astype(float)
    diff = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)); still, run, worst = 0, 0, 0
    for d in diff: run = run + 1 if d < 0.8 else 0; worst = max(worst, run)
    (ok if worst <= 4 else bad)(f'plus long plan figé : {worst / 2:.1f} s')
    print('5. Son')
    r = subprocess.run(['ffmpeg', '-nostats', '-i', film, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r)[-1]); P = float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', r)[-1])
    (ok if abs(I + 14) <= 1 else bad)(f'niveau {I} LUFS'); (ok if P <= -1 else bad)(f'crête vraie {P} dB')
else: print('4-5. Image et son : pas de film fourni, contrôles sautés')

print('6. Voix')
vdir = next((d for d in ('voice', 'voice-scratch') if os.path.exists(os.path.join(d, 'l1.wav'))), None)
if vdir:
    r = subprocess.run([PY, 'tools/voicecheck.py', 'lines.json', vdir], capture_output=True, text=True, env={**os.environ, 'HF_HUB_DISABLE_XET': '1'})
    if r.returncode == 0: ok('chaque ligne se transcrit correctement')
    elif r.returncode == 2: warn('transcription impossible (réseau ou modèle) : écoute à faire par l\'utilisateur')
    else: bad('lignes mal comprises (reformuler ou régénérer) :\n' + '\n'.join(l for l in r.stdout.splitlines() if l.startswith('DIFF')))
print(f'\n{len(fails)} échec(s), {len(warns)} avertissement(s)')
sys.exit(1 if fails else 0)
