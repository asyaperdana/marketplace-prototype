#!/bin/bash
# scripts/scan-violations.sh
# ==============================================================================
# REPO FIREWALL DETECTOR
# Purpose: Scans for forbidden artifacts, secrets, and huge files.
# Usage:
#   ./scripts/scan-violations.sh [--staged]
# ==============================================================================

set -e

# Configuration
MAX_FILE_SIZE_KB=5000 # 5MB warning
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Forbidden Regex Patterns (Bash ERE)
# These match file paths that should NEVER be tracked.
FORBIDDEN_PATTERNS=(
  "^node_modules/"
  "^\.svelte-kit/"
  "^build/"
  "^dist/"
  "^package/"
  "^\.output/"
  "^\.vercel/"
  "^\.netlify/"
  "^\.turbo/"
  "^\.next/"
  "^\.nuxt/"
  "^\.vite/"
  "coverage/"
  "\.tsbuildinfo$"
  "\.DS_Store$"
  "\.env(\..+)?$" # Block .env, .env.local, .env.dev, etc.
  "\.log$"
  "\.pid$"
  "\.swp$"
  "\.swo$"
)

# Allowed exceptions for .env patterns
ALLOWED_ENV_PATTERNS=(
    "\.env\.example$"
    "\.env\.test$"
)

echo -e "${BLUE}🛡️  Repo Firewall: Scanning for violations...${NC}"

# Mode Selection
if [ "$1" == "--staged" ]; then
    echo -e "${BLUE}   Mode: Staged Files Only (Pre-commit)${NC}"
    # Git diff --cached returns relative paths
    FILES=$(git diff --name-only --cached)
else
    echo -e "${BLUE}   Mode: Full Repository Scan (CI/Audit)${NC}"
    FILES=$(git ls-files)
fi

# If no files to check
if [ -z "$FILES" ]; then
    echo -e "${GREEN}✅ No files to scan.${NC}"
    exit 0
fi

VIOLATIONS=()
WARNINGS=()

# Scaning Loop
for file in $FILES; do
    # 1. Check strict forbidden patterns
    for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
        if [[ "$file" =~ $pattern ]]; then
            # Check exceptions (like .env.example)
            IS_ALLOWED=false
            for allowed in "${ALLOWED_ENV_PATTERNS[@]}"; do
                if [[ "$file" =~ $allowed ]]; then
                     IS_ALLOWED=true
                     break
                fi
            done
            
            if [ "$IS_ALLOWED" = false ]; then
                VIOLATIONS+=("Forbidden Pattern '$pattern': $file")
            fi
        fi
    done

    # 2. Check File Size (if file exists locally)
    if [ -f "$file" ]; then
        SIZE=$(du -k "$file" | cut -f1)
        if [ "$SIZE" -gt "$MAX_FILE_SIZE_KB" ]; then
             WARNINGS+=("Large File (>5MB): $file ($SIZE KB)")
        fi
    fi
done

# Report Logic
echo "--------------------------------------------------"

if [ ${#VIOLATIONS[@]} -ne 0 ]; then
    echo -e "${RED}❌ BLOCKING VIOLATIONS DETECTED:${NC}"
    for v in "${VIOLATIONS[@]}"; do
        echo -e "   - $v"
    done
    echo ""
    echo -e "${YELLOW}💡 REMEDIATION:${NC}"
    echo "   1. Unstage/Remove the file: git rm --cached <file>"
    echo "   2. Add to .gitignore if it's a generated file."
    echo "   3. Remove secrets/env files immediately."
    exit 1
fi

if [ ${#WARNINGS[@]} -ne 0 ]; then
    echo -e "${YELLOW}⚠️  WARNINGS (Action Recommended):${NC}"
    for w in "${WARNINGS[@]}"; do
        echo -e "   - $w"
    done
    echo ""
fi

echo -e "${GREEN}✅ Firewall Check Passed: Repository is clean.${NC}"
exit 0
