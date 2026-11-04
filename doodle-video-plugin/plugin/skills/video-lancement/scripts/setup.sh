#!/bin/sh
# Prépare les outils des skills doodle-video, puis imprime KIT=<kit> et LIB=<bibliothèque>.
#   sh setup.sh        bibliothèque de rendu Lemo-Opuscar à une version figée (clonée si absente), ffmpeg 7+ vérifié
#   sh setup.sh deps   installe en plus ses paquets (Node, navigateur, Python, voix) : quelques minutes la 1re fois
# La bibliothèque vit dans ~/.doodle-video/lemo-opuscar, à la version LEMO_REV : une mise à jour extérieure ne la change pas.
set -e
HERE=$(cd "$(dirname "$0")/.." && pwd)
DH=${DOODLE_HOME:-$HOME/.doodle-video}
LIB=${DOODLE_LIB:-$DH/lemo-opuscar}
LEMO_REV=bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00          # version testée avec ce plugin
mkdir -p "$DH"
if [ ! -f "$LIB/core/render/video.mjs" ]; then
  command -v git >/dev/null || { echo "✗ git est nécessaire"; exit 1; }
  echo "↓ bibliothèque de rendu (version figée) dans $LIB"
  git init -q "$LIB" && git -C "$LIB" remote add origin https://github.com/lemomo-ai/lemo-opuscar.git
  git -C "$LIB" config core.sparseCheckout true
  git -C "$LIB" sparse-checkout set --no-cone '/*' '!/styles/' '!/styleboard/' '!/docs/'
  git -C "$LIB" fetch -q --depth 1 --filter=blob:none origin "$LEMO_REV" && git -C "$LIB" checkout -q FETCH_HEAD
fi
have=$(git -C "$LIB" rev-parse HEAD 2>/dev/null || echo ?)
[ "$have" = "$LEMO_REV" ] || echo "! la bibliothèque est à $have au lieu de $LEMO_REV (testée) ; supprime $LIB pour la reprendre"
[ "$1" = deps ] && (cd "$LIB" && LEMO_OPUSCAR_HOME="$LIB" sh plugin/skills/lemo-opuscar/scripts/setup.sh deps voice)
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
