<script lang="ts">
	import { Button, Input } from "$lib/components/ui";
	import { resetPassword, isDemoMode } from "$lib/services/auth";
	import { toasts } from "$lib/stores";

	let email = $state("");
	let loading = $state(false);
	let error = $state("");
	let success = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = "";
		loading = true;

		try {
			if (isDemoMode()) {
				// Demo mode - just show success
				success = true;
				toasts.add({ type: "success", message: "Email reset dikirim! (Demo Mode)" });
			} else {
				await resetPassword(email);
				success = true;
				toasts.add({ type: "success", message: "Email reset password telah dikirim!" });
			}
		} catch (err) {
			error = err instanceof Error ? err.message : "Gagal mengirim email reset. Coba lagi.";
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Lupa Password - Okis Garage Sale</title>
	<meta name="description" content="Reset password akun Okis Garage Sale" />
</svelte:head>

<div class="forgot-container">
	<div class="forgot-card">
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
							d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
						/>
					</svg>
				</div>
				<h1>Cek Email Kamu</h1>
				<p>Kami telah mengirim link reset password ke <strong>{email}</strong></p>
				<p class="hint">
					Tidak menerima email? Cek folder spam atau <button
						type="button"
						class="retry-btn"
						onclick={() => (success = false)}>coba lagi</button
					>
				</p>
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
							d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
						/>
					</svg>
				</div>
				<h1>Lupa Password?</h1>
				<p>Masukkan email kamu dan kami akan kirimkan link untuk reset password</p>
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

			<form onsubmit={handleSubmit} class="forgot-form">
				<Input
					type="email"
					name="email"
					label="Email"
					placeholder="nama@email.com"
					bind:value={email}
					required
					disabled={loading}
				/>

				<Button type="submit" variant="primary" fullWidth {loading}>
					{loading ? "Mengirim..." : "Kirim Link Reset"}
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
	.forgot-container {
		width: 100%;
		max-width: 420px;
	}

	.forgot-card {
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
		line-height: 1.5;
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

	.forgot-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
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
		margin-bottom: 0.5rem;
	}

	.success-state p strong {
		color: #f8fafc;
	}

	.success-state .hint {
		font-size: 0.875rem;
		color: #64748b;
	}

	.retry-btn {
		background: none;
		border: none;
		color: #14b8a6;
		cursor: pointer;
		font-size: inherit;
		padding: 0;
		text-decoration: underline;
	}

	.retry-btn:hover {
		color: #2dd4bf;
	}

	/* Input styling overrides for dark theme */
	:global(.forgot-form .w-full label) {
		color: #e2e8f0 !important;
	}

	:global(.forgot-form input) {
		background: rgba(15, 23, 42, 0.5) !important;
		border-color: rgba(148, 163, 184, 0.2) !important;
		color: #f8fafc !important;
	}

	:global(.forgot-form input::placeholder) {
		color: #64748b !important;
	}

	:global(.forgot-form input:focus) {
		border-color: #14b8a6 !important;
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1) !important;
	}
</style>
