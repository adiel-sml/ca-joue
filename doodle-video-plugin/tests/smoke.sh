#!/bin/sh
# Test de fumée du plugin : un film complet construit et vérifié de bout en bout, en vertical puis en 16:9.
#   sh tests/smoke.sh [dossier de travail]     (réseau requis pour les voix Microsoft et Whisper)
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
SK="$ROOT/plugin/skills/video-lancement"
WORK=${1:-$(mktemp -d)}
eval "$(sh "$SK/scripts/setup.sh" | grep -E '^(KIT|LIB)=')"
export LIB PATH="${DOODLE_HOME:-$HOME/.doodle-video}/bin:$PATH"
[ -f "$LIB/.venv/bin/python" ] || sh "$SK/scripts/setup.sh" deps
P="$WORK/histoire"; rm -rf "$P"; mkdir -p "$P"; cp -r "$KIT/." "$P/"; rm -rf "$P/example" "$P/example-histoire" "$P/templates"
cp "$KIT/example-histoire/"* "$P/"
cd "$P"
echo "== vertical"; TTS=1 NAME=histoire sh build.sh > build.log 2>&1 || { tail -20 build.log; exit 1; }
"$LIB/.venv/bin/python" tools/check.py histoire.mp4
"$LIB/.venv/bin/python" tools/storyboard.py 6 >/dev/null && echo "storyboard ok"
echo "== 16:9"; SIZE=1920x1080 NAME=histoire-16x9 sh build.sh voice > build169.log 2>&1 || { tail -20 build169.log; exit 1; }
"$LIB/.venv/bin/python" tools/check.py histoire-16x9.mp4
echo "test de fumée réussi : $P"
