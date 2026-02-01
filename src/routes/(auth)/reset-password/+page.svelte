<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button, Input } from "$lib/components/ui";
	import { updatePassword, isDemoMode } from "$lib/services/auth";
	import { toasts } from "$lib/stores";

	let password = $state("");
	let confirmPassword = $state("");
	let loading = $state(false);
	let error = $state("");
	let success = $state(false);

	// Password strength calculation
	const passwordStrength = $derived(() => {
		if (!password) return { score: 0, label: "", color: "" };
		let score = 0;
		if (password.length >= 8) score++;
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
		if (/\d/.test(password)) score++;
		if (/[^a-zA-Z0-9]/.test(password)) score++;

		const levels = [
			{ label: "Sangat Lemah", color: "#ef4444" },
			{ label: "Lemah", color: "#f97316" },
			{ label: "Cukup", color: "#eab308" },
			{ label: "Kuat", color: "#22c55e" },
			{ label: "Sangat Kuat", color: "#14b8a6" }
		];

		return { score, ...levels[score] };
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = "";

		if (password !== confirmPassword) {
			error = "Password tidak cocok";
			return;
		}

		if (password.length < 8) {
			error = "Password minimal 8 karakter";
			return;
		}

		loading = true;

		try {
			if (isDemoMode()) {
				success = true;
				toasts.add({ type: "success", message: "Password berhasil diubah! (Demo Mode)" });
			} else {
				await updatePassword(password);
				success = true;
				toasts.add({ type: "success", message: "Password berhasil diubah!" });
			}
		} catch (err) {
			error = err instanceof Error ? err.message : "Gagal mengubah password. Coba lagi.";
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Reset Password - Okis Garage Sale</title>
	<meta name="description" content="Buat password baru untuk akun Okis Garage Sale" />
</svelte:head>

<div class="reset-container">
	<div class="reset-card">
		{#if success}
			<!-- Success State -->
			<div class="success-state">
				<div class="success-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</div>
				<h1>Password Diubah!</h1>
				<p>
					Password kamu telah berhasil diubah. Sekarang kamu bisa masuk dengan password
					baru.
				</p>
				<Button variant="primary" onclick={() => goto("/login")}>Masuk Sekarang</Button>
			</div>
		{:else}
			<!-- Form State -->
			<div class="card-header">
				<div class="header-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
						/>
					</svg>
				</div>
				<h1>Buat Password Baru</h1>
				<p>Masukkan password baru untuk akun kamu</p>
			</div>

			<!-- Error Message -->
			{#if error}
				<div class="error-message">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="reset-form">
				<div class="password-field">
					<Input
						type="password"
						name="password"
						label="Password Baru"
						placeholder="Minimal 8 karakter"
						bind:value={password}
						required
						disabled={loading}
					/>
					{#if password}
						<div class="password-strength">
							<div class="strength-bar">
								<div
									class="strength-fill"
									style="width: {(passwordStrength().score / 4) *
										100}%; background-color: {passwordStrength().color}"
								></div>
							</div>
							<span style="color: {passwordStrength().color}"
								>{passwordStrength().label}</span
							>
						</div>
					{/if}
				</div>

				<Input
					type="password"
					name="confirmPassword"
					label="Konfirmasi Password"
					placeholder="Ulangi password baru"
					bind:value={confirmPassword}
					required
					disabled={loading}
					error={confirmPassword && password !== confirmPassword
						? "Password tidak cocok"
						: ""}
				/>

				<Button type="submit" variant="primary" fullWidth {loading}>
					{loading ? "Memproses..." : "Simpan Password"}
				</Button>
			</form>

			<a href="/login" class="back-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
					/>
				</svg>
				Kembali ke Login
			</a>
		{/if}
	</div>
</div>

<style>
	.reset-container {
		width: 100%;
		max-width: 420px;
	}

	.reset-card {
		background: rgba(30, 41, 59, 0.8);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1.5rem;
		padding: 2.5rem;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.05) inset;
	}

	.card-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.header-icon {
		width: 4rem;
		height: 4rem;
		margin: 0 auto 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(16, 185, 129, 0.2));
		border-radius: 1rem;
	}

	.header-icon svg {
		width: 2rem;
		height: 2rem;
		color: #14b8a6;
	}

	.card-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 0.5rem;
	}

	.card-header p {
		color: #94a3b8;
		font-size: 0.95rem;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 0.75rem;
		padding: 0.875rem 1rem;
		margin-bottom: 1.5rem;
		color: #fca5a5;
		font-size: 0.875rem;
	}

	.error-message svg {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.reset-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.password-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.password-strength {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.75rem;
	}

	.strength-bar {
		flex: 1;
		height: 4px;
		background: rgba(148, 163, 184, 0.2);
		border-radius: 2px;
		overflow: hidden;
	}

	.strength-fill {
		height: 100%;
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	.back-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1.5rem;
		color: #94a3b8;
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #14b8a6;
	}

	.back-link svg {
		width: 1rem;
		height: 1rem;
	}

	/* Success State */
	.success-state {
		text-align: center;
	}

	.success-icon {
		width: 5rem;
		height: 5rem;
		margin: 0 auto 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
		border-radius: 1.25rem;
	}

	.success-icon svg {
		width: 2.5rem;
		height: 2.5rem;
		color: #22c55e;
	}

	.success-state h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 0.75rem;
	}

	.success-state p {
		color: #94a3b8;
		font-size: 0.95rem;
		line-height: 1.5;
		margin-bottom: 1.5rem;
	}

	/* Input styling overrides for dark theme */
	:global(.reset-form .w-full label) {
		color: #e2e8f0 !important;
	}

	:global(.reset-form input) {
		background: rgba(15, 23, 42, 0.5) !important;
		border-color: rgba(148, 163, 184, 0.2) !important;
		color: #f8fafc !important;
	}

	:global(.reset-form input::placeholder) {
		color: #64748b !important;
	}

	:global(.reset-form input:focus) {
		border-color: #14b8a6 !important;
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1) !important;
	}
</style>
