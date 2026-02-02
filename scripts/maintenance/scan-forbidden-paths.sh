#!/bin/bash
# scripts/scan-forbidden-paths.sh
# Purpose: Scans for forbidden files/directories (artifacts) in the repository.
# Usage:
#   ./scripts/scan-forbidden-paths.sh [--staged]
#
#   --staged: Only checks files that are currently staged for commit.
#             (Used by pre-commit hook)
#   (default): Checks all tracked files in the repository.
#             (Used by CI)

set -e

FORBIDDEN_PATTERNS=(
  "^node_modules/"
  "^.svelte-kit/"
  "^build/"
  "^dist/"
  "^package/"
  "^.output/"
  "^.vercel/"
  "^.netlify/"
  "^.turbo/"
  "\.env$"
  "\.DS_Store$"
)

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "🔍 Scanning for forbidden build artifacts..."

VIOLATIONS=()

if [ "$1" == "--staged" ]; then
    # Get list of staged files
    FILES=$(git diff --name-only --cached)
else
    # Get list of all tracked files
    FILES=$(git ls-files)
fi

# If no files to check, exit success
if [ -z "$FILES" ]; then
    echo -e "${GREEN}✅ No files to check.${NC}"
    exit 0
fi

# Check each file against forbidden patterns
for file in $FILES; do
    for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
        if [[ "$file" =~ $pattern ]]; then
            VIOLATIONS+=("$file")
            break
        fi
    done
done

if [ ${#VIOLATIONS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Forbidden files detected:${NC}"
    for file in "${VIOLATIONS[@]}"; do
        echo -e "   - $file"
    done
    echo ""
    echo -e "${RED}FAILURE: Your commit/PR contains generated artifacts or forbidden files.${NC}"
    echo "Please remove them from git (git rm --cached <file>) and update your .gitignore."
    exit 1
else
    echo -e "${GREEN}✅ No forbidden paths found.${NC}"
    exit 0
fi
