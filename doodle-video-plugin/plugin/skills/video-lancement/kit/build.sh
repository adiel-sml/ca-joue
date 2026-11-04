#!/bin/sh
# Construit le film de lancement de bout en bout (projet créé par le skill video-lancement).
# Usage : sh build.sh [voice-dir]   (défaut : voice/, sinon voice-scratch/)
#         REC=enregistrement.m4a sh build.sh   (découpe d'abord l'enregistrement en lignes)
#         TTS=1 sh build.sh                    (voix de synthèse : Microsoft en ligne, sinon Kokoro hors ligne)
# Prérequis : la bibliothèque Lemo-Opuscar (LIB) avec ses outils installés (setup.sh deps voice), Python 3.11+.
set -e
LIB=${LIB:-$HOME/lemo-opuscar}
HERE=$(cd "$(dirname "$0")" && pwd)
export LIB
PY="$LIB/.venv/bin/python"
VDIR=${1:-voice}; [ -f "$HERE/$VDIR/l1.wav" ] || VDIR=voice-scratch
# ffmpeg 7+ requis par mux.sh : on prend celui du dossier .bin s'il existe
FF=${DOODLE_HOME:-$HOME/.doodle-video}/bin; [ -x "$FF/ffmpeg" ] && PATH="$FF:$PATH" && export PATH
OUT=${OUT:-$HERE/out}; mkdir -p "$OUT"
NAME=${NAME:-$(basename "$HERE")}
cd "$HERE"
# REC=<fichier audio> : découpe d'abord l'enregistrement de la voix off en lignes dans voice/
# TTS=1 : génère la voix de synthèse (tools/tts.py, voix choisie dans lines.json) dans voice/
if [ -n "$TTS" ]; then "$PY" tools/tts.py lines.json voice; VDIR=voice; fi
if [ -n "$REC" ]; then "$PY" tools/split_voice.py "$REC" lines.json voice; VDIR=voice; fi
"$PY" tools/align.py lines.json "$VDIR"
TLPY=tools/timeline.py; [ -f story.json ] && TLPY=tools/timeline_story.py
"$PY" "$TLPY" "$VDIR"
cd "$LIB"
node core/render/events.mjs "$HERE" --size 1080x1920
node core/render/video.mjs "$HERE" --size 1080x1920 --fps 24 --workers ${WORKERS:-3} --out "$OUT/video.mp4"
cd "$HERE"
"$PY" tools/music.py "$VDIR" "$OUT/mix.wav"
"$PY" tools/subs.py "$OUT/cues.json"
"$PY" "$LIB/core/render/srt.py" "$OUT/cues.json" "$HERE/$NAME.srt"
sh "$LIB/core/render/mux.sh" "$OUT/video.mp4" "$OUT/mix.wav" "$HERE/$NAME.mp4" 24 0
ffmpeg -y -loglevel error -ss "${POSTER_T:-39.5}" -i "$HERE/$NAME.mp4" -frames:v 1 -q:v 2 "$HERE/poster.jpg"
echo "film : $HERE/$NAME.mp4"
