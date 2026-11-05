"""Prépare la publication : python tools/post.py <film.mp4> [post.json]  →  dossier publication/

post.json (écrit par Claude avec l'utilisateur) :
  {"cover_t": 1.2,
   "tiktok":    {"text": "…", "hashtags": ["#…"]},
   "instagram": {"text": "…", "hashtags": ["#…"]},
   "youtube":   {"title": "… (100 caractères max)", "text": "…", "hashtags": ["#Shorts", "…"]}}

Produit :
- tiktok.mp4, reels.mp4, shorts.mp4 : la même vidéo verticale ; instagram-4x5.mp4 : recadrage pour le fil Instagram ;
  la vidéo verticale, vérifiée (1080×1920, H.264, AAC 48 kHz, lecture rapide
  « faststart »), avec les limites de durée de chaque réseau ;
- couverture-9x16.jpg (image à cover_t) et couverture-4x5.jpg (recadrage 1080×1350 pour la grille Instagram) ;
- zones-sures.jpg : trois images du film avec, en rouge, les zones couvertes par l'interface de TikTok, Reels et Shorts ;
  rien d'important (visage, texte, sous-titre) ne doit tomber dedans ;
- POST.md : les textes à copier, par réseau, avec le nombre de caractères.
"""
import sys, os, json, subprocess
from PIL import Image, ImageDraw

film = sys.argv[1]
post = json.load(open(sys.argv[2], encoding='utf-8')) if len(sys.argv) > 2 and os.path.exists(sys.argv[2]) else {}
out = os.path.join(os.path.dirname(os.path.abspath(film)), 'publication'); os.makedirs(out, exist_ok=True)
probe = lambda *a: subprocess.run(['ffprobe', '-v', 'error', *a, film], capture_output=True, text=True).stdout.strip()
dur = float(probe('-show_entries', 'format=duration', '-of', 'csv=p=0'))
w, h = map(int, probe('-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x').split('x')[:2])
problems = []
if w > h:      # version horizontale : une vidéo YouTube classique, pas de Shorts ni de Reels
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', film, '-c', 'copy', '-movflags', '+faststart', os.path.join(out, 'youtube-16x9.mp4')], check=True)
elif (w, h) != (1080, 1920): problems.append(f'format {w}×{h} au lieu de 1080×1920')
# durées (novembre 2026) : TikTok jusqu'à 10 min, Reels et Shorts jusqu'à 3 min ; au-delà de 90 s, les Reels sont moins poussés
LIM = {'tiktok': 600, 'reels': 180, 'shorts': 180}
for name, lim in (LIM.items() if h > w else []):
    dst = os.path.join(out, name + '.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', film, '-c', 'copy', '-movflags', '+faststart', dst], check=True)
    if dur > lim: problems.append(f'{name} : {dur:.0f} s, au-delà de la limite de {lim} s')
# fil Instagram 4:5 : la bande y 190 à 1540 du vertical (même cadrage que le rendu en 1080×1350)
if (w, h) == (1080, 1920):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', film, '-vf', 'crop=1080:1350:0:190', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium',
                    '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', os.path.join(out, 'instagram-4x5.mp4')], check=True)
if dur > 90: problems.append(f'Reels : {dur:.0f} s ; sous 90 s, la vidéo est davantage mise en avant')

def frame(t, path):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{t:.2f}', '-i', film, '-frames:v', '1', '-q:v', '2', path], check=True)
    return Image.open(path).convert('RGB')
ct = post.get('cover_t', min(1.2, dur / 2))
cover = os.path.join(out, 'couverture-9x16.jpg' if h > w else 'miniature-16x9.jpg')
if post.get('cover_title'):      # couverture dessinée : l'image à cover_t, sans sous-titre, avec le titre en grand
    import urllib.parse
    lib = os.environ.get('LIB', os.path.expanduser('~/.doodle-video/lemo-opuscar')); proj = os.path.dirname(os.path.abspath(film))
    q = urllib.parse.urlencode({'cover': ct, 'title': post['cover_title']})
    subprocess.run(['node', 'core/render/still.mjs', proj, '0', '--size', f'{w}x{h}', '--q', q, '--out', out, '--prefix', 'cov_'], cwd=lib, check=True, capture_output=True)
    Image.open(os.path.join(out, 'cov_0.jpg')).convert('RGB').save(cover, quality=92); os.remove(os.path.join(out, 'cov_0.jpg'))
    cov = Image.open(cover)
else:
    cov = frame(ct, cover)
if h > w:
    y0 = 190
    cov.crop((0, y0, 1080, y0 + 1350)).save(os.path.join(out, 'couverture-4x5.jpg'), quality=92)
else:
    cov.resize((1280, 720)).save(os.path.join(out, 'miniature-16x9.jpg'), quality=92)   # taille de miniature YouTube

# zones couvertes par l'interface (approximatives, en pixels sur 1080×1920)
ZONES = {
  'TikTok': [(0, 0, 1080, 150), (0, 1560, 1080, 1920), (950, 880, 1080, 1560)],
  'Reels':  [(0, 0, 1080, 210), (0, 1500, 1080, 1920), (950, 1060, 1080, 1500)],
  'Shorts': [(0, 0, 1080, 150), (0, 1520, 1080, 1920), (940, 920, 1080, 1520)],
}
ts = [dur * k for k in (0.12, 0.45, 0.8)]
tiles = []
for i, (name, zs) in enumerate(ZONES.items() if h > w else []):
    im = frame(ts[i], os.path.join(out, f'.z{i}.jpg')); ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for z in zs: d.rectangle(z, fill=(255, 40, 40, 90), outline=(255, 40, 40, 255), width=6)
    d.text((30, 160), name, fill=(255, 255, 255, 255))
    tiles.append(Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB').resize((360, 640)))
    os.remove(os.path.join(out, f'.z{i}.jpg'))
if tiles:
    sheet = Image.new('RGB', (360 * 3 + 40, 640), 'white')
    for i, t_ in enumerate(tiles): sheet.paste(t_, (i * 380, 0))
    sheet.save(os.path.join(out, 'zones-sures.jpg'), quality=90)

def block(name, p, limit, title=None):
    if not p: return ''
    txt = (p.get('text', '') + ('\n\n' + ' '.join(p.get('hashtags', [])) if p.get('hashtags') else '')).strip()
    s = f'## {name}\n\n'
    if title: s += f'**Titre** ({len(title)}/100) : {title}\n\n'
    s += f'```\n{txt}\n```\n\n{len(txt)}/{limit} caractères\n\n'
    return s
md = f'# Publication\n\nDurée : {dur:.1f} s · format {w}×{h}\n\n'
md += ('**À corriger :**\n' + '\n'.join(f'- {p}' for p in problems) + '\n\n') if problems else 'Contrôles : conformes à TikTok, Reels et Shorts.\n\n'
md += 'Vérifie `zones-sures.jpg` : rien d\'important sous les zones rouges.\n\n'
md += block('TikTok', post.get('tiktok'), 4000) + block('Instagram (Reels)', post.get('instagram'), 2200)
yt = post.get('youtube'); md += block('YouTube (Shorts)', yt, 5000, yt.get('title') if yt else None)
open(os.path.join(out, 'POST.md'), 'w', encoding='utf-8').write(md)
print(md)
