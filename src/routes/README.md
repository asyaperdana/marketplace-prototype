# 🛣️ src/routes - Application Routes

This directory contains all SvelteKit routes following file-based routing conventions.

## 📁 Directory Structure

```
routes/
├── (app)/               # Authenticated app routes (route group)
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout flow
│   ├── dashboard/       # User dashboard
│   │   ├── orders/      # Order history
│   │   └── settings/    # User settings
│   └── products/
│       └── [slug]/      # Product detail page
│
├── (auth)/              # Authentication routes (route group)
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── forgot-password/ # Password recovery
│   └── reset-password/  # Password reset
│
├── api/                 # API endpoints
│   ├── auth/            # Auth endpoints
│   ├── products/        # Product endpoints
│   ├── cart/            # Cart endpoints
│   ├── orders/          # Order endpoints
│   ├── users/           # User endpoints
│   └── webhooks/        # External webhooks
│
├── +layout.svelte       # Root layout
├── +page.svelte         # Homepage
└── +error.svelte        # Error page (create as needed)
```

## 🏗️ Route Groups

### `(app)/`
Protected routes requiring authentication:
- Uses shared layout with navigation & footer
- Middleware checks for valid session
- Common UI elements for authenticated users

### `(auth)/`
Public authentication routes:
- Minimal layout (no navigation)
- Redirects authenticated users to dashboard
- Shared auth form styling

## 📡 API Routes

All API routes are in the `/api` directory and export handlers:

```typescript
// src/routes/api/products/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  // Handle GET request
};

export const POST: RequestHandler = async ({ request }) => {
  // Handle POST request
};
```

### API Naming Conventions
- `+server.ts` - API endpoint handlers
- `[id]/+server.ts` - Dynamic parameter endpoints
- Use RESTful conventions (GET, POST, PUT, DELETE)

## 📄 Route Files

| File | Purpose |
|------|---------|
| `+page.svelte` | Page component |
| `+page.ts` | Universal load function |
| `+page.server.ts` | Server-only load function |
| `+layout.svelte` | Layout component |
| `+layout.ts` | Layout load function |
| `+layout.server.ts` | Server-only layout load |
| `+server.ts` | API endpoint |
| `+error.svelte` | Error boundary |

## 🔐 Route Protection

Protected routes should use `+layout.server.ts`:

```typescript
// src/routes/(app)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return { user: locals.user };
};
```

## 🔗 Dynamic Routes

Use brackets for dynamic parameters:
- `[slug]` - Required parameter
- `[[slug]]` - Optional parameter
- `[...rest]` - Rest parameter (catch-all)

Example:
```
products/[slug]/+page.svelte  → /products/vintage-chair
users/[id]/orders/+page.svelte → /users/123/orders
```

## 📝 Best Practices

1. **Keep routes thin** - Move business logic to `$lib/services`
2. **Use load functions** - For data fetching, not in components
3. **Handle errors** - Use `+error.svelte` for error boundaries
4. **Type everything** - Use generated types from `./$types`
5. **Validate input** - Use schemas in API routes
