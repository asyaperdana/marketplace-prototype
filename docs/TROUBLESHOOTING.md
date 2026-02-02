# Troubleshooting Guide - Repo Firewall

## ❌ Commit Rejected

**Error:** `❌ BLOCKING VIOLATIONS DETECTED`

**Reason:** You are trying to commit a file that matches a forbidden pattern (e.g., inside `dist/` or `node_modules/`).

**Fix:**

1.  **Unstage the file:**
    ```bash
    git restore --staged <file>
    ```
    OR (if file should be deleted from git)
    ```bash
    git rm --cached <file>
    ```
2.  **Verify:**
    ```bash
    ./scripts/maintenance/scan-violations.sh --staged
    ```

## ❌ "Permission Denied" on Scripts

**Reason:** Scripts lost executable permission.

**Fix:**

```bash
chmod +x scripts/*.sh
```

## ❌ CI Failed on "Firewall Check"

**Reason:** You managed to push a forbidden file (bypassing local hooks).

**Fix:**

1.  Pull latest changes.
2.  Run strict cleaning:
    ```bash
    ./scripts/maintenance/clean-artifacts.sh
    ```
3.  Commit the removal and push.

## ⚠️ Large File Warning

**Reason:** You added a file larger than 5MB.

**Policy:** Large binary assets should be stored in LFS or external storage (S3/CDN), not the repo.
