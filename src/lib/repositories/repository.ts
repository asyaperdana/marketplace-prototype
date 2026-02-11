// =============================================
// Okis Garage Sale - Repository Interfaces
// =============================================
// Generic repository abstraction layer.
// Swap implementations here when reconnecting to an external database.
//
// [SUPABASE-RECONNECT] To restore Supabase, create SupabaseProductRepository
// and SupabaseAuthRepository that implement these interfaces, then update
// provider.ts to use the new implementations.

import type {
	Product,
	ProductFilters,
	PaginatedResponse
} from "$lib/types";

// ----- Result Types -----

/** Standard result type for all repository operations */
export interface RepoResult<T> {
	success: boolean;
	data?: T;
	error?: string;
}

// ----- Generic Base Repository -----

/** Generic CRUD repository interface */
export interface IRepository<T> {
	findAll(): Promise<T[]>;
	findById(id: string): Promise<T | null>;
	create(item: Omit<T, "id">): Promise<RepoResult<T>>;
	update(id: string, item: Partial<T>): Promise<RepoResult<T>>;
	delete(id: string): Promise<RepoResult<void>>;
}

// ----- Product Repository -----

export interface IProductRepository extends IRepository<Product> {
	/** Get paginated products with optional filters */
	findPaginated(
		filters?: ProductFilters,
		page?: number,
		limit?: number
	): Promise<PaginatedResponse<Product>>;

	/** Search products by query string */
	search(query: string, limit?: number): Promise<Product[]>;

	/** Get products listed by a specific seller */
	findBySeller(sellerId: string): Promise<Product[]>;
}

// ----- Auth Repository -----

export interface AuthUser {
	id: string;
	email: string;
	name: string;
	avatarUrl?: string;
}

export interface AuthSession {
	user: AuthUser;
	token: string;
}

export interface IAuthRepository {
	/** Register a new user */
	signUp(
		email: string,
		password: string,
		name: string
	): Promise<RepoResult<{ user: AuthUser; session: AuthSession | null }>>;

	/** Sign in with email and password */
	signIn(
		email: string,
		password: string
	): Promise<RepoResult<{ user: AuthUser; session: AuthSession }>>;

	/** Sign out the current user */
	signOut(): Promise<RepoResult<void>>;

	/** Send a password reset request */
	resetPassword(email: string): Promise<RepoResult<void>>;

	/** Update user password (requires active session) */
	updatePassword(newPassword: string): Promise<RepoResult<void>>;

	/** Get the currently authenticated user, if any */
	getCurrentUser(): AuthUser | null;

	/** Subscribe to auth state changes. Returns unsubscribe function. */
	onAuthStateChange(
		callback: (user: AuthUser | null) => void
	): () => void;
}
