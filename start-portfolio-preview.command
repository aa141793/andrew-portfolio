#!/bin/zsh
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8080}"

echo "Starting Andrew portfolio preview on http://localhost:${PORT}/"
echo "Project: ${PROJECT_DIR}"
echo

cd "$PROJECT_DIR"
python3 -m http.server "$PORT"
