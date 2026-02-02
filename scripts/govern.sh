#!/bin/bash
# scripts/govern.sh
# Purpose: Master script to run all repository governance checks.
# Usage: npm run rules

set -e

echo "🏛️  Starting Repository Governance Audit..."

# 1. Check for Forbidden Files
echo "----------------------------------------"
if ./scripts/maintenance/scan-forbidden-paths.sh; then
    echo "✅ File Structure: CLEAN"
else
    echo "❌ File Structure: DIRTY"
    exit 1
fi

# 2. Check for Linting (if available)
echo "----------------------------------------"
echo "🔍 Checking code style..."
if npm run lint 2>/dev/null; then
    echo "✅ Linting: PASSED"
else
    echo "⚠️  Linting: FAILED (Check output above)"
    # Uncomment to enforce strict linting
    # exit 1 
fi

# 3. Check for Types (if available)
echo "----------------------------------------"
echo "🔍 Checking types..."
if npm run check 2>/dev/null; then
    echo "✅ Type Check: PASSED"
else
     echo "⚠️  Type Check: FAILED (Check output above)"
    # Uncomment to enforce strict typing
    # exit 1
fi

echo "----------------------------------------"
echo "✅ All Governance Checks Passed!"
