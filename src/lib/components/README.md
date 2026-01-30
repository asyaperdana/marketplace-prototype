# 🧩 src/lib/components - Component Library

This directory contains all reusable Svelte components organized by purpose.

## 📁 Directory Structure

```
components/
├── ui/            # Base UI components
├── layout/        # Layout components
├── features/      # Feature-specific components
│   ├── auth/      # Authentication
│   ├── products/  # Products
│   ├── cart/      # Shopping cart
│   ├── checkout/  # Checkout flow
│   └── dashboard/ # Dashboard
├── forms/         # Form components
└── common/        # Common/shared components
```

## 📂 Component Categories

### `ui/` - Base UI Components

Atomic, reusable UI primitives:

- `Button.svelte` - Button variants
- `Input.svelte` - Input fields
- `Card.svelte` - Card container
- `Modal.svelte` - Modal dialog
- `Badge.svelte` - Status badges
- `Avatar.svelte` - User avatars
- `Spinner.svelte` - Loading spinner
- `Toast.svelte` - Notifications

### `layout/` - Layout Components

Page structure components:

- `Header.svelte` - Page header
- `Footer.svelte` - Page footer
- `Sidebar.svelte` - Sidebar navigation
- `Container.svelte` - Content container
- `Grid.svelte` - Grid layout

### `features/` - Feature Components

Domain-specific components:

#### `auth/`

- `LoginForm.svelte`
- `RegisterForm.svelte`
- `ForgotPasswordForm.svelte`

#### `products/`

- `ProductCard.svelte`
- `ProductGrid.svelte`
- `ProductFilters.svelte`
- `ProductSearch.svelte`

#### `cart/`

- `CartItem.svelte`
- `CartSummary.svelte`
- `CartDrawer.svelte`

#### `checkout/`

- `CheckoutForm.svelte`
- `PaymentForm.svelte`
- `OrderSummary.svelte`

#### `dashboard/`

- `StatsCard.svelte`
- `OrderTable.svelte`
- `UserProfile.svelte`

### `forms/` - Form Components

Form-specific components:

- `FormField.svelte`
- `Select.svelte`
- `Checkbox.svelte`
- `RadioGroup.svelte`
- `FileUpload.svelte`

### `common/` - Common Components

Shared utility components:

- `ErrorBoundary.svelte`
- `LoadingState.svelte`
- `EmptyState.svelte`
- `Pagination.svelte`

## 📝 Component Guidelines

### File Structure

```svelte
<script lang="ts">
	// 1. Imports
	import { createEventDispatcher } from "svelte";

	// 2. Props
	export let variant: "primary" | "secondary" = "primary";
	export let disabled = false;

	// 3. Local state
	let isLoading = false;

	// 4. Computed values
	$: classes = `btn btn-${variant}`;

	// 5. Event handlers
	const dispatch = createEventDispatcher();
	function handleClick() {
		dispatch("click");
	}
</script>

<!-- Template -->
<button class={classes} {disabled} on:click={handleClick}>
	<slot />
</button>

<style>
	/* Scoped styles */
</style>
```

### Naming Conventions

- **Files**: PascalCase (`ProductCard.svelte`)
- **Props**: camelCase (`isLoading`)
- **Events**: kebab-case (`on:add-to-cart`)
- **CSS classes**: BEM or utility-first

### Export Pattern

Create `index.ts` barrel files:

```typescript
// components/ui/index.ts
export { default as Button } from "./Button.svelte";
export { default as Card } from "./Card.svelte";
export { default as Input } from "./Input.svelte";
```

## 🔧 Usage

```svelte
<script>
	import { Button, Card } from "$lib/components/ui";
	import { ProductCard } from "$lib/components/features/products";
</script>

<Card>
	<ProductCard {product} />
	<Button variant="primary">Add to Cart</Button>
</Card>
```
