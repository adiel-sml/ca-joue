#!/bin/sh
# Construit le film « Ça Joue » de bout en bout.
# Usage : sh build.sh [voice-dir]   (défaut : voice/, sinon voice-scratch/)
#         REC=enregistrement.m4a sh build.sh   (découpe d'abord l'enregistrement en lignes)
# Prérequis : la bibliothèque Lemo-Opuscar (LIB) avec ses outils installés (setup.sh deps voice), Python 3.11+.
set -e
LIB=${LIB:-$HOME/lemo-opuscar}
HERE=$(cd "$(dirname "$0")" && pwd)
export LIB
PY="$LIB/.venv/bin/python"
VDIR=${1:-voice}; [ -f "$HERE/$VDIR/l1.wav" ] || VDIR=voice-scratch
# ffmpeg 7+ requis par mux.sh : on prend celui du dossier .bin s'il existe
[ -x "$HERE/.bin/ffmpeg" ] && PATH="$HERE/.bin:$PATH" && export PATH
OUT=${OUT:-$HERE/out}; mkdir -p "$OUT"
cd "$HERE"
# REC=<fichier audio> : découpe d'abord l'enregistrement de la voix off en lignes dans voice/
if [ -n "$REC" ]; then "$PY" tools/split_voice.py "$REC" lines.json voice; VDIR=voice; fi
"$PY" tools/align.py lines.json "$VDIR"
"$PY" tools/timeline.py "$VDIR"
cd "$LIB"
node core/render/events.mjs "$HERE" --size 1080x1920
node core/render/video.mjs "$HERE" --size 1080x1920 --fps 24 --workers ${WORKERS:-3} --out "$OUT/video.mp4"
cd "$HERE"
"$PY" tools/music.py "$VDIR" "$OUT/mix.wav"
"$PY" tools/subs.py "$OUT/cues.json"
"$PY" "$LIB/core/render/srt.py" "$OUT/cues.json" "$HERE/ca-joue-lancement.srt"
sh "$LIB/core/render/mux.sh" "$OUT/video.mp4" "$OUT/mix.wav" "$HERE/ca-joue-lancement.mp4" 24 0
ffmpeg -y -loglevel error -ss "${POSTER_T:-39.5}" -i "$HERE/ca-joue-lancement.mp4" -frames:v 1 -q:v 2 "$HERE/poster.jpg"
echo "film : $HERE/ca-joue-lancement.mp4"
