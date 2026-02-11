// =============================================
// Okis Garage Sale - Mock User Data
// =============================================
// Demo users for local development and testing.
// [SUPABASE-RECONNECT] This file is only used by MockAuthRepository.

export interface MockUserRecord {
	id: string;
	email: string;
	password: string;
	name: string;
	avatarUrl?: string;
	location?: string;
}

export const mockUsers: MockUserRecord[] = [
	{
		id: "user_001",
		email: "demo@okisgs.com",
		password: "demo1234",
		name: "Demo User",
		location: "Jakarta Selatan"
	},
	{
		id: "user_002",
		email: "seller@okisgs.com",
		password: "seller1234",
		name: "Toko Preloved",
		location: "Bandung"
	},
	{
		id: "user_003",
		email: "buyer@okisgs.com",
		password: "buyer1234",
		name: "Pembeli Setia",
		location: "Surabaya"
	}
];
