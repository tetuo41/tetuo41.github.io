#!/usr/bin/env bash
# Quality gate — Phase 4 of docs/WORKFLOW.md. Fails on first red step.
# Usage: bash scripts/quality-gate.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Astro 7 requires Node >=22.22.0. If the active node is too old, pick the
# newest nvm-installed v22 without touching the user's default alias.
node_major_ok="$(node -p 'process.versions.node.split(".").slice(0,2).join(".") >= "22.22" ? 1 : 0' 2>/dev/null || echo 0)"
if [ "$node_major_ok" != "1" ]; then
  newest_nvm_v22="$(ls -d "$HOME"/.nvm/versions/node/v22.* 2>/dev/null | sort -V | tail -1 || true)"
  if [ -n "$newest_nvm_v22" ] && [ "$("$newest_nvm_v22/bin/node" -p 'process.versions.node.split(".").slice(0,2).join(".") >= "22.22" ? 1 : 0')" = "1" ]; then
    export PATH="$newest_nvm_v22/bin:$PATH"
    printf 'note: using Node %s from nvm (active node was too old for Astro 7)\n' "$("$newest_nvm_v22/bin/node" -v)"
  else
    echo "error: Node >=22.22.0 required (Astro 7); no suitable nvm install found" >&2
    exit 1
  fi
fi

step() { printf '\n=== %s ===\n' "$1"; }

step "Typecheck (astro check)"
pnpm exec astro check

step "Build (astro build)"
pnpm run build

step "Security scan (pnpm audit --prod)"
pnpm audit --prod

printf '\nquality gate: PASS\n'
