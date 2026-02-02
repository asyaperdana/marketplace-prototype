#!/bin/sh
# scripts/check-staged-files.sh

FORBIDDEN_PATTERNS="\.svelte-kit/|build/|dist/|\.output/|\.vercel/|\.turbo/|\.next/|\.vite/|\.env(\..+)?$|node_modules/"

# Check if any staged file matches forbidden patterns
# We exclude .env.example explicitly from the check if the regex catches it, 
# but the regex `\.env(\..+)?$` will catch .env.example. We should refine it or filter.

# Refined regex: .env (exact) or .env.* (but allow .env.example)
# Actually, git grep/diff is easier.

echo "🔒 Governance: Checking staged files..."

STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

# forbidden_regex matches:
# ^.svelte-kit/
# ^build/
# ^dist/
# ^.output/
# ^.vercel/
# ^.turbo/
# ^.next/
# ^.vite/
# ^.env$ (but not .env.example, handled by grep -v)
# ^.env\..+ (but not .env.example, handled by grep -v)
# ^node_modules/

VIOLATIONS=$(echo "$STAGED_FILES" | grep -E "^(\.svelte-kit/|build/|dist/|\.output/|\.vercel/|\.turbo/|\.next/|\.vite/|\.env|node_modules/)" | grep -v "\.env\.example")

if [ -n "$VIOLATIONS" ]; then
  echo "❌ BLOCKED: Attempting to commit forbidden artifacts:"
  echo "$VIOLATIONS"
  echo ""
  echo "These files are strictly forbidden by repo policy."
  echo "Please unstage them (git reset HEAD <file>) and update .gitignore."
  exit 1
fi

echo "✅ Governance: Staged files clean."
exit 0
