# Repository Governance Policy

> **Status:** ENFORCED
> **Strictness:** BLOCKING

This repository is protected by a multi-layered **Repo Firewall System**.

## 1. Core Principle: Source-Only

The repository must contain **source code only**. All generated artifacts, dependencies, and build outputs are strictly forbidden.

### 🚫 Strictly Forbidden

- `node_modules/`
- `dist/`, `build/`
- `.svelte-kit/`
- `.env` (Secrets)
- Coverage reports

### ✅ Allowed

- Source code (`src/`)
- Configuration files (`package.json`, `tsconfig.json`)
- Documentation
- Maintainer scripts

## 2. Enforcement Mechanisms

| Layer      | Mechanism         | Action                                  |
| :--------- | :---------------- | :-------------------------------------- |
| **Local**  | `.gitignore`      | Prevents file tracking                  |
| **Commit** | `pre-commit` hook | **BLOCKS** commits with forbidden files |
| **Remote** | GitHub Actions    | **FAILS** PRs containing violations     |

## 3. How to Fix Violations

### If your commit is blocked:

1. **Read the error:** The terminal will list specific forbidden files.
2. **Unstage files:** `git rm --cached <file>`
3. **Clean workspace:** `./scripts/maintenance/clean-artifacts.sh`

### If CI fails:

1. Run local audit: `./scripts/maintenance/scan-violations.sh`
2. Fix the issues and push again.

## 4. Setup for New Developers

Run the setup script to initialize the protection system:

```bash
./scripts/setup-firewall.sh
```
