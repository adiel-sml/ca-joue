#!/bin/sh
# Prépare les outils du skill video-lancement, puis imprime KIT=<kit> et LIB=<bibliothèque>.
#   sh setup.sh        bibliothèque Lemo-Opuscar (rendu image par image, voix, mixage) clonée si absente, ffmpeg 7+ vérifié
#   sh setup.sh deps   installe en plus les paquets de la bibliothèque (Node, navigateur, Python, voix) : quelques minutes la 1re fois
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
LIB=${LEMO_OPUSCAR_HOME:-$HOME/lemo-opuscar}
DH=${DOODLE_HOME:-$HOME/.doodle-video}
if [ ! -f "$LIB/core/render/video.mjs" ]; then
  command -v git >/dev/null || { echo "✗ git est nécessaire"; exit 1; }
  echo "↓ bibliothèque de rendu dans $LIB"
  git clone --quiet --depth 1 --filter=blob:none --sparse --branch main https://github.com/lemomo-ai/lemo-opuscar.git "$LIB"
  git -C "$LIB" sparse-checkout set --no-cone '/*' '!/styles/*/demo/' '!/styleboard/' '!/docs/frames/' '!/styles/*/poster.jpg'
  git -C "$LIB" config lemo.managed true
fi
[ "$1" = deps ] && (cd "$LIB" && sh plugin/skills/lemo-opuscar/scripts/setup.sh deps voice)
# mux.sh demande ffmpeg 7+ ; sinon on en installe un privé (paquet imageio-ffmpeg) dans $DH/bin
v=$(ffmpeg -version 2>/dev/null | sed -n '1s/^ffmpeg version n\{0,1\}\([0-9][0-9]*\)\..*/\1/p')
if { [ -z "$v" ] || [ "$v" -lt 7 ]; } && [ ! -x "$DH/bin/ffmpeg" ]; then
  echo "↓ ffmpeg récent dans $DH/bin"
  python3 -m venv "$DH/venv" && "$DH/venv/bin/pip" -q install imageio-ffmpeg
  mkdir -p "$DH/bin" && ln -sf "$("$DH/venv/bin/python" -c 'import imageio_ffmpeg as i; print(i.get_ffmpeg_exe())')" "$DH/bin/ffmpeg"
fi
[ -f "$LIB/.venv/bin/python" ] || echo "! paquets pas encore installés : sh $0 deps"
echo "KIT=$HERE/kit"
echo "LIB=$LIB"
