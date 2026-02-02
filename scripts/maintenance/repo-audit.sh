#!/bin/sh
# scripts/repo-audit.sh
# Comprehensive repository hygiene audit

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║            📊 REPOSITORY GOVERNANCE AUDIT REPORT               ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Classification definitions
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 DIRECTORY CLASSIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  [SOURCE]     src/, static/, docs/, tests/, .github/"
echo "  [CONFIG]     *.json, *.js, *.ts (root level)"
echo "  [GENERATED]  .svelte-kit/, build/, dist/, .output/"
echo "  [RUNTIME]    node_modules/, .cache/, .turbo/"
echo "  [TEMP]       *.log, vite.config.*.timestamp-*"
echo ""

# Forbidden paths check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚫 FORBIDDEN PATH SCAN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

FORBIDDEN_PATTERNS=".svelte-kit build dist .output .vercel .turbo .next .vite node_modules"
VIOLATIONS_FOUND=0

for pattern in $FORBIDDEN_PATTERNS; do
  FILES=$(git ls-files "$pattern" 2>/dev/null || true)
  if [ -n "$FILES" ]; then
    echo "  ❌ VIOLATION: $pattern/"
    echo "$FILES" | head -5 | sed 's/^/      ↳ /'
    COUNT=$(echo "$FILES" | wc -l)
    if [ "$COUNT" -gt 5 ]; then
      echo "      ... and $((COUNT - 5)) more files"
    fi
    VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + COUNT))
  else
    echo "  ✅ Clean: $pattern/"
  fi
done

echo ""

# Environment file check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 ENVIRONMENT FILE SCAN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ENV_FILES=$(git ls-files .env .env.local .env.production .env.development 2>/dev/null | grep -v "\.env\.example" || true)

if [ -n "$ENV_FILES" ]; then
  echo "  ❌ CRITICAL: Environment files tracked!"
  echo "$ENV_FILES" | sed 's/^/      ↳ /'
  VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + $(echo "$ENV_FILES" | wc -l)))
else
  echo "  ✅ No environment files tracked."
fi

echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📈 AUDIT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$VIOLATIONS_FOUND" -gt 0 ]; then
  echo "  ⚠️  Total Violations: $VIOLATIONS_FOUND"
  echo ""
  echo "  Remediation:"
  echo "    Run: npm run repo:fix"
  echo ""
  exit 1
else
  echo "  ✅ Repository is CLEAN and COMPLIANT."
  echo "  ✅ Source-Only Policy: ENFORCED"
  echo ""
  exit 0
fi
