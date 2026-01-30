# 🔧 .github - GitHub Configuration

This directory contains GitHub-specific configuration files.

## 📁 Directory Structure

```
.github/
├── workflows/              # GitHub Actions workflows
├── ISSUE_TEMPLATE/         # Issue templates
├── PULL_REQUEST_TEMPLATE/  # PR templates
└── README.md               # This file
```

## 📂 Subdirectories

### `workflows/`

GitHub Actions CI/CD workflows:

- `ci.yml` - Continuous Integration (lint, test, build)
- `deploy.yml` - Deployment workflow
- `release.yml` - Release automation

### `ISSUE_TEMPLATE/`

Issue templates for consistent bug reports and feature requests:

- `bug_report.md` - Bug report template
- `feature_request.md` - Feature request template
- `config.yml` - Issue template chooser config

### `PULL_REQUEST_TEMPLATE/`

PR templates for consistent contributions:

- `pull_request_template.md` - Default PR template

## 📄 Quick Setup

### CI Workflow (`workflows/ci.yml`)

```yaml
name: CI

on:
    push:
        branches: [main, develop]
    pull_request:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: "20"
                  cache: "npm"
            - run: npm ci
            - run: npm run lint
            - run: npm run check
            - run: npm run test:unit
            - run: npm run build
```

### Deploy Workflow (`workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: "20"
                  cache: "npm"
            - run: npm ci
            - run: npm run build
            - uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./build
```

### Bug Report Template (`ISSUE_TEMPLATE/bug_report.md`)

```markdown
---
name: Bug Report
about: Report a bug to help us improve
title: "[BUG] "
labels: bug
assignees: ""
---

## Describe the Bug

A clear description of what the bug is.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What you expected to happen.

## Screenshots

If applicable, add screenshots.

## Environment

- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 1.0.0]
```

### Feature Request Template (`ISSUE_TEMPLATE/feature_request.md`)

```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: "[FEATURE] "
labels: enhancement
assignees: ""
---

## Problem Statement

A clear description of the problem.

## Proposed Solution

How you think this should work.

## Alternatives Considered

Other solutions you've considered.

## Additional Context

Any other context or screenshots.
```

### PR Template (`PULL_REQUEST_TEMPLATE/pull_request_template.md`)

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] I have tested my changes
- [ ] I have updated the documentation
- [ ] My code follows the project style
- [ ] I have added tests (if applicable)

## Related Issues

Closes #(issue number)
```

## 🔗 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Creating Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
