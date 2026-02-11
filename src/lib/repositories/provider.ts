// =============================================
// Okis Garage Sale - Repository Provider (DI)
// =============================================
// Central place to swap repository implementations.
//
// [SUPABASE-RECONNECT] To restore Supabase:
// 1. Create SupabaseProductRepository and SupabaseAuthRepository
// 2. Import them here
// 3. Replace the MockXxxRepository instances below
//
// Example:
//   import { SupabaseProductRepository } from "./supabase-product.repository";
//   export const productRepository: IProductRepository = new SupabaseProductRepository();

import type { IProductRepository, IAuthRepository } from "./repository";
import { MockProductRepository } from "./mock-product.repository";
import { MockAuthRepository } from "./mock-auth.repository";

// ----- Active Implementations -----
// Swap these lines to switch between mock and real data sources.

export const productRepository: IProductRepository = new MockProductRepository();
export const authRepository: IAuthRepository = new MockAuthRepository();
