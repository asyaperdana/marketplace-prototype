# 📦 src/lib - Library & Shared Code

This directory contains all reusable, shared code for the marketplace application.

## 📁 Directory Structure

```
lib/
├── assets/          # Static assets (images, icons, fonts)
├── components/      # Svelte components
├── config/          # Configuration files
├── constants/       # App-wide constants
├── hooks/           # Custom Svelte hooks
├── schemas/         # Validation schemas (Zod, etc.)
├── services/        # API services & external integrations
├── stores/          # Svelte stores (state management)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Main export barrel file
```

## 📂 Subdirectories

### `components/`
Svelte components organized by purpose:
- **`ui/`** - Base UI components (Button, Input, Card, Modal, etc.)
- **`layout/`** - Layout components (Header, Footer, Sidebar, Navigation)
- **`features/`** - Feature-specific components organized by domain:
  - `auth/` - Authentication components
  - `products/` - Product-related components
  - `cart/` - Shopping cart components
  - `checkout/` - Checkout flow components
  - `dashboard/` - Dashboard components

### `stores/`
Svelte stores for state management:
- Global app state
- User session state
- Cart state
- UI state (modals, toasts, etc.)

### `utils/`
Pure utility functions:
- Formatters (currency, date, etc.)
- Validators
- Helpers

### `types/`
TypeScript type definitions:
- API response types
- Component prop types
- Store types
- Entity types (User, Product, Order, etc.)

### `config/`
Configuration files:
- API endpoints
- Feature flags
- Environment-specific config

### `services/`
External service integrations:
- API client
- Authentication service
- Payment service
- Analytics service

### `schemas/`
Validation schemas (using Zod or similar):
- Form validation schemas
- API request/response schemas

### `hooks/`
Custom Svelte hooks:
- useDebounce
- useLocalStorage
- useMediaQuery
- etc.

### `constants/`
App-wide constants:
- Route paths
- Error messages
- Default values

## 🔧 Usage

Import from the main barrel file:
```typescript
import { Button, Card, formatCurrency, userStore } from '$lib';
```

Or import from specific modules:
```typescript
import { Button } from '$lib/components/ui';
import { formatCurrency } from '$lib/utils';
import { userStore } from '$lib/stores';
```

## 📝 Naming Conventions

- **Components**: PascalCase (`ProductCard.svelte`)
- **Stores**: camelCase with `Store` suffix (`userStore.ts`)
- **Utils**: camelCase (`formatCurrency.ts`)
- **Types**: PascalCase (`Product.ts` or in `index.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)
