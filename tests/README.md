# 🧪 tests - Testing Suite

This directory contains all tests for the marketplace application.

## 📁 Directory Structure

```
tests/
├── unit/                 # Unit tests
│   ├── components/       # Component tests
│   ├── stores/           # Store tests
│   └── utils/            # Utility function tests
│
├── integration/          # Integration tests
│   ├── auth/             # Authentication flows
│   ├── products/         # Product operations
│   └── cart/             # Cart operations
│
├── e2e/                  # End-to-end tests
│   ├── flows/            # User flow tests
│   └── pages/            # Page tests
│
├── __fixtures__/         # Test fixtures & sample data
└── __mocks__/            # Mock modules & services
```

## 🔬 Test Types

### Unit Tests (`unit/`)
- Test individual functions, components, and stores in isolation
- Fast execution, no external dependencies
- High coverage target (80%+)

```typescript
// tests/unit/utils/formatCurrency.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '$lib/utils';

describe('formatCurrency', () => {
  it('formats IDR correctly', () => {
    expect(formatCurrency(50000)).toBe('Rp50.000');
  });
});
```

### Integration Tests (`integration/`)
- Test multiple components/modules working together
- May include API calls (mocked or real)
- Test business logic flows

```typescript
// tests/integration/cart/addToCart.test.ts
import { describe, it, expect } from 'vitest';
import { cartStore } from '$lib/stores';
import { addToCart } from '$lib/services/cart';

describe('Add to Cart Flow', () => {
  it('adds product and updates store', async () => {
    await addToCart({ productId: '1', quantity: 2 });
    expect(get(cartStore).items).toHaveLength(1);
  });
});
```

### E2E Tests (`e2e/`)
- Test complete user journeys
- Uses Playwright for browser automation
- Tests real user scenarios

```typescript
// tests/e2e/flows/checkout.test.ts
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  // ... continue flow
});
```

## 📦 Fixtures & Mocks

### `__fixtures__/`
Sample data for tests:
```typescript
// tests/__fixtures__/products.ts
export const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 100000,
  // ...
};
```

### `__mocks__/`
Mock implementations:
```typescript
// tests/__mocks__/api.ts
export const mockApi = {
  get: vi.fn(),
  post: vi.fn(),
};
```

## 🛠️ Test Configuration

### Vitest (Unit & Integration)
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    environment: 'jsdom',
    globals: true,
  },
});
```

### Playwright (E2E)
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run preview',
    port: 4173,
  },
});
```

## 🏃 Running Tests

```bash
# Run all unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit:watch

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test
```

## 📝 Naming Conventions

- Test files: `*.test.ts` or `*.spec.ts`
- Describe blocks: Feature or function name
- It blocks: Should describe expected behavior

## ✅ Best Practices

1. **Arrange-Act-Assert** - Structure tests clearly
2. **One assertion per test** - When possible
3. **Descriptive names** - Tests as documentation
4. **Mock external dependencies** - For unit tests
5. **Use data-testid** - For E2E element selection
6. **Clean up** - Reset state between tests
