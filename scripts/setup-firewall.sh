#!/bin/bash
# scripts/setup-firewall.sh
# ==============================================================================
# REPO FIREWALL INITIALIZER
# Purpose: One-command setup for fresh clones.
# usage: ./scripts/setup-firewall.sh
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🛡️  Initializing Repo Firewall System...${NC}"

# 1. Install Dependencies
echo "--- Step 1: Installing Dependencies (Clean Install) ---"
if [ -f "package-lock.json" ]; then
    npm ci
else
    echo "Warning: No package-lock.json found. Running npm install."
    npm install
fi

# 2. Setup Husky Hooks
echo "--- Step 2: Configuring Git Hooks ---"
npx husky || true

# Force update pre-commit if needed
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# REPO FIREWALL HOOK
# Blocks commits containing forbidden artifacts.
./scripts/maintenance/scan-violations.sh --staged
EOF

chmod +x .husky/pre-commit
echo "   ✅ Pre-commit hook installed."

# 3. Verify Environment
echo "--- Step 3: Verifying Environment ---"
if ./scripts/maintenance/scan-violations.sh; then
    echo -e "${GREEN}✅ Setup Complete! Your repository is protected.${NC}"
else
    echo "⚠️  Setup finished, but violations were found. Please fix them."
    exit 1
fi
