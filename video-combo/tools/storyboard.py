"""Storyboard à valider AVANT le rendu complet : python tools/storyboard.py [nombre d'images, défaut 9]  →  storyboard.jpg

Une image par réplique (au milieu de sa durée) et au début de chaque scène, réduite au nombre demandé, rendue avec le
vrai code du film ; sous chaque image : son temps, sa scène et la réplique. Envoie storyboard.jpg à l'utilisateur et
attends son accord avant `sh build.sh`.
"""
import sys, os, json, subprocess
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(ROOT)
LIB = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar'))
n = int(sys.argv[1]) if len(sys.argv) > 1 else 9
TL = json.load(open('timeline.json', encoding='utf-8'))
size = TL.get('size', '1080x1920'); W, H = map(int, size.split('x'))
cands = [(v['t0'] + 0.35, k, '') for k, v in TL['S'].items()]
for L in TL['lines']:
    sc = next((k for k, v in TL['S'].items() if v['t0'] <= L['t0'] < v['t1']), '')
    cands.append(((L['t0'] + L['t1']) / 2, sc, ' '.join(w['w'] for w in L['words'])))
if TL.get('mode') == 'motion':                 # motion : une image par mesure et demie, rien n'est sauté
    step_ = TL['BAR'] * 0.75; cands = [(round(0.3 + i * step_, 2), next((k for k, v in TL['S'].items() if v['t0'] <= 0.3 + i * step_ < v['t1']), ''), '') for i in range(int((TL['dur'] - 0.3) / step_) + 1)]
cands.sort()
if len(cands) > n:
    step = (len(cands) - 1) / (n - 1); cands = [cands[round(i * step)] for i in range(n)]
ts = [round(t, 2) for t, _, _ in cands]
if os.path.exists('cast.json'):   # même distribution que build.sh
    open('cast.js', 'w', encoding='utf-8').write('window.CAST_DATA = ' + open('cast.json', encoding='utf-8').read() + ';\n')
os.makedirs('stills', exist_ok=True)
subprocess.run(['node', 'core/render/still.mjs', ROOT, *map(str, ts), '--size', size, '--out', os.path.join(ROOT, 'stills'), '--prefix', 'sb_'], cwd=LIB, check=True, capture_output=True)
def _font(size):
    for f in ('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
              '/System/Library/Fonts/Supplemental/Arial.ttf', '/Library/Fonts/Arial.ttf', 'C:/Windows/Fonts/arial.ttf'):
        if os.path.exists(f): return ImageFont.truetype(f, size)
    return ImageFont.load_default(size=size)      # repli : certains accents peuvent manquer
font = _font(22)
cols = 3 if H > W else 3; tw = 330; th = int(tw * H / W); cap = 92
rows = (len(ts) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (tw + 16) + 16, rows * (th + cap + 16) + 16), 'white')
d = ImageDraw.Draw(sheet)
def wrap(s, width=34):
    out, cur = [], ''
    for w in s.split():
        if len(cur) + len(w) + 1 > width: out.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    return out + ([cur] if cur else [])
for i, (t, sc, line) in enumerate(cands):
    x, y = 16 + (i % cols) * (tw + 16), 16 + (i // cols) * (th + cap + 16)
    im = Image.open(os.path.join('stills', f'sb_{ts[i]}.jpg')).convert('RGB').resize((tw, th))
    sheet.paste(im, (x, y)); d.rectangle((x, y, x + tw - 1, y + th - 1), outline='#1B1B1B', width=2)
    d.text((x, y + th + 6), f'{i + 1}. {t:.1f} s  {sc}', fill='#1B1B1B', font=font)
    for k, l in enumerate(wrap(line)[:2]): d.text((x, y + th + 32 + k * 26), l, fill='#555555', font=font)
sheet.save('storyboard.jpg', quality=88)
print('storyboard.jpg :', len(ts), 'images', ts)
