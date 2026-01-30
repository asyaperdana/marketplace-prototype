// =============================================
// Okis Garage Sale - API Service
// =============================================

import { config } from "$lib/config";
import type { ApiResponse } from "$lib/types";

class ApiService {
	private baseUrl: string;
	private timeout: number;

	constructor() {
		this.baseUrl = config.api.baseUrl;
		this.timeout = config.api.timeout;
	}

	private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
				headers: {
					"Content-Type": "application/json",
					...options.headers
				}
			});

			clearTimeout(timeoutId);

			const data = await response.json();

			if (!response.ok) {
				return {
					success: false,
					error: data.message || `HTTP error ${response.status}`
				};
			}

			return {
				success: true,
				data
			};
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error) {
				if (error.name === "AbortError") {
					return { success: false, error: "Request timeout" };
				}
				return { success: false, error: error.message };
			}

			return { success: false, error: "Unknown error occurred" };
		}
	}

	// GET request
	async get<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { method: "GET" });
	}

	// POST request
	async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(body)
		});
	}

	// PUT request
	async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(body)
		});
	}

	// PATCH request
	async patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "PATCH",
			body: JSON.stringify(body)
		});
	}

	// DELETE request
	async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}
}

export const api = new ApiService();
export default api;
