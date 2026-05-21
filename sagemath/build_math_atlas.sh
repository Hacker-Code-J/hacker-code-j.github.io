#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SAGE_HOME="${SAGE_HOME:-/tmp/sage-home}"

mkdir -p "$SAGE_HOME"
HOME="$SAGE_HOME" DOT_SAGE="$SAGE_HOME/.sage" sage -python "$ROOT/sagemath/generate_math_atlas.py"
