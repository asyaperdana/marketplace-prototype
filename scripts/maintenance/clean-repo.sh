#!/bin/sh
# scripts/clean-repo.sh

echo "🧹 Repo Hygiene: Cleaning generated artifacts..."

# Remove known artifacts
rm -rf .svelte-kit build dist .output .vercel .turbo .next .vite node_modules/.vite

# Remove generated assets
rm -rf static/assets/generated/*

# Remove logs
rm -f *.log

echo "✨ Cleaning complete."
