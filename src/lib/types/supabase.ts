// =============================================
// Okis Garage Sale - Supabase Database Types
// =============================================
// These types mirror your Supabase database schema.
// After creating tables in Supabase, you can auto-generate
// these types with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					email: string;
					name: string;
					avatar_url: string | null;
					phone: string | null;
					location: string | null;
					bio: string | null;
					rating: number;
					total_sales: number;
					total_purchases: number;
					verified: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					email: string;
					name: string;
					avatar_url?: string | null;
					phone?: string | null;
					location?: string | null;
					bio?: string | null;
					rating?: number;
					total_sales?: number;
					total_purchases?: number;
					verified?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					name?: string;
					avatar_url?: string | null;
					phone?: string | null;
					location?: string | null;
					bio?: string | null;
					rating?: number;
					total_sales?: number;
					total_purchases?: number;
					verified?: boolean;
					updated_at?: string;
				};
			};
			products: {
				Row: {
					id: string;
					title: string;
					description: string;
					price: number;
					original_price: number | null;
					images: string[];
					category: string;
					subcategory: string | null;
					condition: "new" | "like_new" | "good" | "fair" | "poor";
					status: "available" | "sold" | "reserved" | "inactive";
					seller_id: string;
					location: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					title: string;
					description: string;
					price: number;
					original_price?: number | null;
					images?: string[];
					category: string;
					subcategory?: string | null;
					condition: "new" | "like_new" | "good" | "fair" | "poor";
					status?: "available" | "sold" | "reserved" | "inactive";
					seller_id: string;
					location: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					title?: string;
					description?: string;
					price?: number;
					original_price?: number | null;
					images?: string[];
					category?: string;
					subcategory?: string | null;
					condition?: "new" | "like_new" | "good" | "fair" | "poor";
					status?: "available" | "sold" | "reserved" | "inactive";
					location?: string;
					updated_at?: string;
				};
			};
			categories: {
				Row: {
					id: string;
					name: string;
					slug: string;
					icon: string;
					description: string | null;
					parent_id: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					icon: string;
					description?: string | null;
					parent_id?: string | null;
					created_at?: string;
				};
				Update: {
					name?: string;
					slug?: string;
					icon?: string;
					description?: string | null;
					parent_id?: string | null;
				};
			};
			favorites: {
				Row: {
					id: string;
					user_id: string;
					product_id: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					product_id: string;
					created_at?: string;
				};
				Update: {
					user_id?: string;
					product_id?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			product_condition: "new" | "like_new" | "good" | "fair" | "poor";
			product_status: "available" | "sold" | "reserved" | "inactive";
		};
	};
}
