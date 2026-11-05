"""Couleurs du projet : python tools/palette.py <dossier du dépôt>  →  palette.json et palette.js

Lit les couleurs écrites dans le code du projet (CSS, SCSS, Tailwind, JS/TS, HTML, JSON de thème), les regroupe, garde les
plus utilisées : des accents (saturés), un fond clair, une encre foncée. Les violets sont écartés (règle de style de
l'utilisateur) et signalés. Dans le film : SETS.projet, SETS.projet2, SETS.projet3 (plateaux aux couleurs du projet),
K.brand, K.brand2, K.brand3, et les vêtements de la foule.
"""
import os, re, sys, json, colorsys
from collections import Counter

root = sys.argv[1] if len(sys.argv) > 1 else '.'
SKIP = {'node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', 'vendor', '.venv', '__pycache__', 'publication'}
EXT = {'.css', '.scss', '.sass', '.less', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.html', '.json', '.dart', '.kt', '.swift', '.xml'}
HEX = re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')
RGB = re.compile(r'rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})')
cnt = Counter()
for d, ds, fs in os.walk(root):
    ds[:] = [x for x in ds if x not in SKIP and not x.startswith('.')]
    for f in fs:
        if os.path.splitext(f)[1].lower() not in EXT or f.endswith(('.min.js', '.map', 'lock.json')) or f == 'package-lock.json': continue
        p = os.path.join(d, f)
        if os.path.getsize(p) > 600_000: continue
        try: s = open(p, encoding='utf-8', errors='ignore').read()
        except OSError: continue
        for m in HEX.finditer(s):
            h = m.group(1)
            if len(h) == 3: h = ''.join(c * 2 for c in h)
            cnt[tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))] += 1
        for m in RGB.finditer(s): cnt[tuple(min(255, int(x)) for x in m.groups())] += 1
if not cnt: sys.exit('aucune couleur trouvée dans ' + root)

# regroupe les couleurs proches (même teinte à l'œil)
groups = []
for c, n in cnt.most_common():
    for g in groups:
        if sum((a - b) ** 2 for a, b in zip(c, g['c'])) ** 0.5 < 28: g['n'] += n; break
    else: groups.append({'c': c, 'n': n})
hexs = lambda c: '#%02X%02X%02X' % c
def hls(c): h, l, s = colorsys.rgb_to_hls(*(x / 255 for x in c)); return h * 360, l, s
acc, purple, light, dark = [], [], [], []
for g in sorted(groups, key=lambda g: -g['n']):
    h, l, s = hls(g['c'])
    if s > 0.35 and 0.25 < l < 0.8:
        (purple if 255 <= h <= 320 else acc).append(g)
    elif l > 0.9: light.append(g)
    elif l < 0.2: dark.append(g)
# accents : les plus utilisés, de teintes différentes
picked = []
for g in acc:
    if all(min(abs(hls(g['c'])[0] - hls(p['c'])[0]), 360 - abs(hls(g['c'])[0] - hls(p['c'])[0])) > 22 for p in picked): picked.append(g)
    if len(picked) == 5: break
P = {'accents': [hexs(g['c']) for g in picked], 'fond': hexs(light[0]['c']) if light else '#FFF6E5', 'encre': hexs(dark[0]['c']) if dark else '#1B1B1B',
     'ecartes': [hexs(g['c']) for g in purple[:3]], 'source': os.path.abspath(root)}
# polices du produit : paquets @fontsource importés (fichiers copiés dans fonts/, licence OFL le plus souvent), rôle d'après
# les variables CSS (--f-display, --font-heading… pour les titres ; --f-body, --font-sans… pour le texte)
import shutil
fam = {}
for d, ds, fs in os.walk(root):
    ds[:] = [x for x in ds if x not in SKIP and not x.startswith('.')]
    for f in fs:
        if os.path.splitext(f)[1].lower() not in {'.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.vue', '.svelte'}: continue
        try: s_ = open(os.path.join(d, f), encoding='utf-8', errors='ignore').read()
        except OSError: continue
        for m in re.finditer(r'@fontsource(?:-variable)?/([a-z0-9-]+)(?:/(?:latin-)?(\d{3}))?', s_): fam.setdefault(m.group(1), set()).add(m.group(2) or '400')
        for m in re.finditer(r'--[\w-]*(display|heading|title|body|sans|text)[\w-]*\s*:\s*["\']?([^"\',;]+)', s_, re.I):
            P_role = 'titre' if m.group(1).lower() in ('display', 'heading', 'title') else 'texte'
            fam.setdefault('__' + P_role, set()).add(m.group(2).strip())
css, names = [], {}
for pkg, ws in fam.items():
    if pkg.startswith('__'): continue
    src = os.path.join(root, 'node_modules', '@fontsource', pkg, 'files')
    if not os.path.isdir(src): continue
    name = ' '.join(w.capitalize() for w in pkg.split('-')); names[pkg] = name
    os.makedirs('fonts', exist_ok=True)
    for w in sorted(ws):
        f = f'{pkg}-latin-{w}-normal.woff2'
        if os.path.exists(os.path.join(src, f)):
            shutil.copy(os.path.join(src, f), os.path.join('fonts', f))
            css.append(f"@font-face {{ font-family: '{name}'; font-weight: {w}; font-display: block; src: url({f}) format('woff2'); }}")
if css:
    open('fonts/projet.css', 'w', encoding='utf-8').write('\n'.join(css) + '\n')
    pick = lambda role: next((n for v in fam.get('__' + role, []) for n in names.values() if n.lower() == v.lower()), None)
    P['polices'] = {'titre': pick('titre') or list(names.values())[0], 'texte': pick('texte') or list(names.values())[-1]}
    P['font'] = P['polices']['texte']
json.dump(P, open('palette.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open('palette.js', 'w', encoding='utf-8').write('window.PALETTE = ' + json.dumps(P, ensure_ascii=False) + ';\n')
print('accents :', ' '.join(P['accents']) or 'aucun', '| fond', P['fond'], '| encre', P['encre'])
if P['ecartes']: print('violets écartés (règle de style) :', ' '.join(P['ecartes']))
if P.get('polices'): print('polices du produit :', P['polices']['titre'], '(titres),', P['polices']['texte'], '(texte) → fonts/projet.css')
