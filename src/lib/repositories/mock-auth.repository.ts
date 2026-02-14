// =============================================
// Okis Garage Sale - Mock Auth Repository
// =============================================
// In-memory implementation of IAuthRepository for local development.
// Supports sign-up, sign-in, sign-out, and password reset with demo users.
// [SUPABASE-RECONNECT] Replace with SupabaseAuthRepository that
// delegates to supabase.auth.signUp(...), supabase.auth.signInWithPassword(...), etc.

import type { IAuthRepository, AuthUser, AuthSession, RepoResult } from "./repository";
import { mockUsers, type MockUserRecord } from "$lib/data/mock-users";
import { delay } from "$lib/utils";

export class MockAuthRepository implements IAuthRepository {
	private users: Map<string, MockUserRecord>;
	private currentSession: AuthSession | null = null;
	private listeners: Set<(user: AuthUser | null) => void> = new Set();

	constructor() {
		this.users = new Map(mockUsers.map((u) => [u.email, u]));
	}

	// ----- Helpers -----

	private toAuthUser(record: MockUserRecord): AuthUser {
		return {
			id: record.id,
			email: record.email,
			name: record.name,
			avatarUrl: record.avatarUrl
		};
	}

	private generateToken(): string {
		return `mock_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
	}

	private notifyListeners(): void {
		const user = this.currentSession?.user ?? null;
		for (const cb of this.listeners) {
			cb(user);
		}
	}

	// ----- IAuthRepository -----

	async signUp(
		email: string,
		password: string,
		name: string
	): Promise<RepoResult<{ user: AuthUser; session: AuthSession | null }>> {
		await delay();
		if (this.users.has(email)) {
			return { success: false, error: "Email sudah terdaftar" };
		}
		// ... existing logic ...
		const newUser: MockUserRecord = {
			id: `user_${Date.now()}`,
			email,
			password,
			name
		};

		this.users.set(email, newUser);
		const authUser = this.toAuthUser(newUser);

		// Auto-login
		const session: AuthSession = {
			user: authUser,
			token: this.generateToken()
		};

		this.currentSession = session;
		this.notifyListeners();

		return { success: true, data: { user: authUser, session } };
	}

	async signIn(
		email: string,
		password: string
	): Promise<RepoResult<{ user: AuthUser; session: AuthSession }>> {
		await delay();
		const record = this.users.get(email);

		if (!record || record.password !== password) {
			return { success: false, error: "Email atau password salah" };
		}

		const authUser = this.toAuthUser(record);
		const session: AuthSession = {
			user: authUser,
			token: this.generateToken()
		};

		this.currentSession = session;
		this.notifyListeners();

		return { success: true, data: { user: authUser, session } };
	}

	async signOut(): Promise<RepoResult<void>> {
		await delay(300); // Shorter delay for logout
		this.currentSession = null;
		this.notifyListeners();
		return { success: true };
	}

	async resetPassword(email: string): Promise<RepoResult<void>> {
		await delay();
		const record = this.users.get(email);
		if (!record) {
			// In mock, we still return success to avoid leaking user existence
			return { success: true };
		}
		console.info(`[MockAuth] Password reset requested for ${email}`);
		return { success: true };
	}

	async updatePassword(newPassword: string): Promise<RepoResult<void>> {
		await delay();
		if (!this.currentSession) {
			return { success: false, error: "Sesi tidak valid. Silahkan login kembali." };
		}

		const record = this.users.get(this.currentSession.user.email);
		if (!record) {
			return { success: false, error: "User tidak ditemukan" };
		}

		record.password = newPassword;
		return { success: true };
	}

	getCurrentUser(): AuthUser | null {
		return this.currentSession?.user ?? null;
	}

	onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
		this.listeners.add(callback);

		// Fire immediately with current state
		callback(this.getCurrentUser());

		return () => {
			this.listeners.delete(callback);
		};
	}
}
