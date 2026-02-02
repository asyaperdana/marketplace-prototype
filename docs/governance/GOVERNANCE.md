# Repository Governance & Engineering Standards

## 🚫 Source-Only Policy

This repository adheres to a strict **Source-Only** policy.
**Definition**: The repository must ONLY contain source code, configuration, and manual assets. It must NEVER contain generated artifacts, build outputs, or runtime files.

### Forbidden Directories

The following directories are strictly forbidden in the repository:

- `/.svelte-kit/`
- `/build/`
- `/dist/`
- `/node_modules/`
- `/.output/`
- `/.vercel/`
- `/.turbo/`

### Forbidden Files

- `.env` (excluding `.env.example`)
- `*.log`
- Generated assets in `static/assets/generated/`

---

## 🛡️ Protection System

We have implemented a multi-layer protection system to prevent hygiene regression.

### 1. Hardened .gitignore

A comprehensive `.gitignore` blocks all known artifact paths.

### 2. Pre-commit Hook

A husky pre-commit hook runs `scripts/check-staged-files.sh`.
**Behavior**: If you attempt to commit a forbidden file (e.g. by force-adding), the commit will be BLOCKED.

### 3. Pre-push Hook

A husky pre-push hook runs `scripts/verify-repo.sh`.
**Behavior**: Checks the entire repository index for forbidden files before allowing a push.

---

## 🛠️ Automation & Recovery

If you accidentally pollute the repo or need to clean up:

- **Clean Everything**:

    ```bash
    npm run repo:clean
    ```

    _Removes all generated files, build artifacts, and caches._

- **Verify State**:
    ```bash
    npm run repo:check
    ```
    _Scans the repository for any forbidden tracked files._

## 📝 Commit Standards

- **Never** use `-f` / `--force` to add ignored files.
- **Always** run `npm run check` before committing complex changes.
