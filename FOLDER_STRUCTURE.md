# 📁 Project Folder Structure

> **Okis Garage Sale** - SvelteKit Marketplace

This document provides a comprehensive overview of the project's folder structure following SvelteKit best practices and enterprise-level organization.

## 🗂️ Root Directory

```
marketplace-prototype/
├── 📂 .github/              # GitHub configuration
├── 📂 docs/                 # Project documentation
├── 📂 src/                  # Source code
├── 📂 static/               # Static assets
├── 📂 tests/                # Test files
├── 📄 .gitignore            # Git ignore rules
├── 📄 .npmrc                # npm configuration
├── 📄 CONTRIBUTING.md       # Contribution guidelines
├── 📄 LICENSE               # Project license
├── 📄 package.json          # Dependencies & scripts
├── 📄 README.md             # Project overview
├── 📄 svelte.config.js      # SvelteKit configuration
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 vite.config.ts        # Vite configuration
```

## 📂 src/ - Source Code

```
src/
├── 📂 lib/                  # Shared library code
│   ├── 📂 assets/           # Static assets (imported in code)
│   │   ├── 📂 fonts/        # Custom fonts
│   │   ├── 📂 icons/        # SVG icons
│   │   └── 📂 images/       # Images
│   │
│   ├── 📂 components/       # Svelte components
│   │   ├── 📂 ui/           # Base UI (Button, Input, Card)
│   │   ├── 📂 layout/       # Layout (Header, Footer, Sidebar)
│   │   ├── 📂 forms/        # Form components
│   │   ├── 📂 common/       # Common utilities
│   │   └── 📂 features/     # Feature-specific
│   │       ├── 📂 auth/     # Authentication
│   │       ├── 📂 products/ # Products
│   │       ├── 📂 cart/     # Shopping cart
│   │       ├── 📂 checkout/ # Checkout flow
│   │       └── 📂 dashboard/# User dashboard
│   │
│   ├── 📂 config/           # Configuration files
│   ├── 📂 constants/        # App constants
│   ├── 📂 hooks/            # Custom Svelte hooks
│   ├── 📂 schemas/          # Validation schemas (Zod)
│   ├── 📂 services/         # API & external services
│   ├── 📂 stores/           # Svelte stores
│   ├── 📂 types/            # TypeScript types
│   ├── 📂 utils/            # Utility functions
│   └── 📄 index.ts          # Main barrel export
│
├── 📂 routes/               # SvelteKit routes
│   ├── 📂 (app)/            # Authenticated routes
│   │   ├── 📂 cart/         # Shopping cart
│   │   ├── 📂 checkout/     # Checkout flow
│   │   ├── 📂 dashboard/    # User dashboard
│   │   │   ├── 📂 orders/   # Order history
│   │   │   └── 📂 settings/ # User settings
│   │   └── 📂 products/     # Product pages
│   │       └── 📂 [slug]/   # Dynamic product page
│   │
│   ├── 📂 (auth)/           # Auth routes (separate layout)
│   │   ├── 📂 login/        # Login page
│   │   ├── 📂 register/     # Registration
│   │   ├── 📂 forgot-password/
│   │   └── 📂 reset-password/
│   │
│   ├── 📂 api/              # API endpoints
│   │   ├── 📂 auth/         # Auth endpoints
│   │   ├── 📂 products/     # Product endpoints
│   │   ├── 📂 cart/         # Cart endpoints
│   │   ├── 📂 orders/       # Order endpoints
│   │   ├── 📂 users/        # User endpoints
│   │   └── 📂 webhooks/     # External webhooks
│   │
│   ├── 📄 +layout.svelte    # Root layout
│   └── 📄 +page.svelte      # Homepage
│
├── 📂 styles/               # Global styles
├── 📄 app.css               # Global CSS
├── 📄 app.d.ts              # App type declarations
└── 📄 app.html              # HTML template
```

## 📂 tests/ - Testing

```
tests/
├── 📂 unit/                 # Unit tests
│   ├── 📂 components/       # Component tests
│   ├── 📂 stores/           # Store tests
│   └── 📂 utils/            # Utility tests
│
├── 📂 integration/          # Integration tests
│   ├── 📂 auth/             # Auth flow tests
│   ├── 📂 products/         # Product tests
│   └── 📂 cart/             # Cart tests
│
├── 📂 e2e/                  # End-to-end tests
│   ├── 📂 flows/            # User flow tests
│   └── 📂 pages/            # Page tests
│
├── 📂 __fixtures__/         # Test data
└── 📂 __mocks__/            # Mock modules
```

## 📂 docs/ - Documentation

```
docs/
├── 📂 api/                  # API documentation
├── 📂 architecture/         # System design docs
├── 📂 components/           # Component docs
├── 📂 guides/               # Developer guides
└── 📄 README.md             # Docs overview
```

## 📂 .github/ - GitHub Configuration

```
.github/
├── 📂 workflows/            # GitHub Actions
│   ├── 📄 ci.yml            # CI pipeline
│   └── 📄 deploy.yml        # Deployment
│
├── 📂 ISSUE_TEMPLATE/       # Issue templates
│   ├── 📄 bug_report.md
│   └── 📄 feature_request.md
│
├── 📂 PULL_REQUEST_TEMPLATE/
│   └── 📄 pull_request_template.md
│
└── 📄 README.md             # GitHub config docs
```

## 📂 static/ - Static Assets

```
static/
├── 📂 fonts/                # Web fonts
├── 📂 icons/                # Favicon, app icons
├── 📂 images/               # Public images
│   ├── 📂 avatars/          # User avatars
│   ├── 📂 banners/          # Banner images
│   └── 📂 products/         # Product images
├── 📄 favicon.png           # Favicon
└── 📄 robots.txt            # SEO robots file
```

---

## 🔧 Key Conventions

### Import Aliases
```typescript
// Use $lib alias for imports
import { Button } from '$lib/components/ui';
import { formatCurrency } from '$lib/utils';
import { userStore } from '$lib/stores';
```

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.svelte` |
| Stores | camelCase + Store | `userStore.ts` |
| Utils | camelCase | `formatCurrency.ts` |
| Types | PascalCase | `Product.ts` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS.ts` |
| Routes | lowercase-kebab | `forgot-password/` |

### Barrel Exports
Create `index.ts` files for clean imports:
```typescript
// src/lib/components/ui/index.ts
export { default as Button } from './Button.svelte';
export { default as Card } from './Card.svelte';
```

---

## 📚 Further Reading

- **[src/lib/README.md](./src/lib/README.md)** - Library structure
- **[src/routes/README.md](./src/routes/README.md)** - Routing guide
- **[tests/README.md](./tests/README.md)** - Testing guide
- **[docs/README.md](./docs/README.md)** - Documentation guide
- **[.github/README.md](./.github/README.md)** - GitHub config
