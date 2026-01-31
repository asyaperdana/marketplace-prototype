#!/bin/bash
# scripts/clean-artifacts.sh
# ==============================================================================
# SAFE ARTIFACT CLEANUP
# Purpose: Removes common build artifacts and untracks them from git if needed.
# Usage: ./scripts/clean-artifacts.sh
# ==============================================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🧹 Starting Safe Artifact Cleanup...${NC}"

# List of directories/files to remove
ARTIFACTS=(
  "node_modules"
  ".svelte-kit"
  "build"
  "dist"
  ".output"
  ".vercel"
  ".netlify"
  "coverage"
  ".turbo"
  "*.tsbuildinfo"
)

# 1. Untrack Files (Git)
# If files were accidentally committed, we must tell git to stop tracking them
# without deleting them from disk immediately (we delete them in step 2).
echo "--- Step 1: Untracking forbidden files from Git ---"
# We try to remove cached files matching our ignore patterns
# usage of ‘git rm -r --cached .’ is too aggressive, we target specific folders
# or rely on the fact that if they are in .gitignore, git rm --cached <file> works.
# For safety, we iterate known artifact folders.

for item in "${ARTIFACTS[@]}"; do
    if git ls-files --error-unmatch "$item" > /dev/null 2>&1; then
        echo "   Untracking: $item"
        git rm -r --cached "$item" || true
    fi
done

# 2. Delete from Disk
echo "--- Step 2: Removing artifacts from disk ---"
for item in "${ARTIFACTS[@]}"; do
    if [ -e "$item" ]; then
        echo "   Removing: $item"
        rm -rf "$item"
    fi
done

echo -e "${GREEN}✅ Cleanup Complete. Workspace is clean.${NC}"
echo "   Run 'npm install' to re-install dependencies."
