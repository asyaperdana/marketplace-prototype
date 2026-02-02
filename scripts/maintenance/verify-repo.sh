#!/bin/sh
# scripts/verify-repo.sh

echo "🛡️  Repo Hygiene: Verifying repository state..."

# 1. Check for tracked forbidden files
# We query git index for files that should match ignored patterns or specific forbidden paths
FORBIDDEN_FILES=$(git ls-files .svelte-kit build dist .output .vercel .turbo .next .vite node_modules)

if [ -n "$FORBIDDEN_FILES" ]; then
  echo "❌ CRITICAL: Forbidden artifacts tracked in repository:"
  echo "$FORBIDDEN_FILES"
  echo ""
  echo "Run 'npm run repo:clean' to fix this."
  exit 1
fi

# 2. Check for .env files (security risk)
ENV_FILES=$(git ls-files .env .env.local .env.test .env.production | grep -v "\.env\.example")

if [ -n "$ENV_FILES" ]; then
  echo "❌ CRITICAL: Environment files tracked in repository:"
  echo "$ENV_FILES"
  echo ""
  echo "Remove them immediately: git rm --cached <file>"
  exit 1
fi

echo "✅ Repo Hygiene: Clean and compliant."
exit 0
