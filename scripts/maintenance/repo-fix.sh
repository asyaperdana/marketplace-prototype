#!/bin/sh
# scripts/repo-fix.sh
# Auto-fix repository hygiene violations

set -e

echo "🔧 Repo Fix: Starting auto-repair..."
echo ""

# 1. Untrack any forbidden files that are currently tracked
FORBIDDEN_PATTERNS=".svelte-kit build dist .output .vercel .turbo .next .vite node_modules"
TRACKED_VIOLATIONS=""

for pattern in $FORBIDDEN_PATTERNS; do
  FILES=$(git ls-files "$pattern" 2>/dev/null || true)
  if [ -n "$FILES" ]; then
    TRACKED_VIOLATIONS="$TRACKED_VIOLATIONS$FILES
"
  fi
done

if [ -n "$TRACKED_VIOLATIONS" ]; then
  echo "📋 Found tracked violations:"
  echo "$TRACKED_VIOLATIONS"
  echo ""
  echo "🗑️  Untracking forbidden files..."
  echo "$TRACKED_VIOLATIONS" | xargs -r git rm -r --cached --ignore-unmatch
  echo "✅ Files untracked from index."
else
  echo "✅ No tracked violations found."
fi

echo ""

# 2. Untrack .env files (except .env.example)
ENV_VIOLATIONS=$(git ls-files .env .env.local .env.production .env.development 2>/dev/null | grep -v "\.env\.example" || true)

if [ -n "$ENV_VIOLATIONS" ]; then
  echo "🔐 Found tracked environment files:"
  echo "$ENV_VIOLATIONS"
  echo "$ENV_VIOLATIONS" | xargs -r git rm --cached --ignore-unmatch
  echo "✅ Environment files untracked."
else
  echo "✅ No tracked environment files."
fi

echo ""

# 3. Clean generated artifacts from filesystem
echo "🧹 Cleaning generated artifacts..."
./scripts/clean-repo.sh

echo ""
echo "✅ Repo Fix: Complete. Run 'git status' to review changes."
