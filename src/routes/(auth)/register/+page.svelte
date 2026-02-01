<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button, Input } from "$lib/components/ui";
	import {
		signUp,
		signInWithGoogle,
		demoSignIn,
		isDemoMode,
		isAuthenticated
	} from "$lib/services/auth";
	import { toasts } from "$lib/stores";

	let name = $state("");
	let email = $state("");
	let password = $state("");
	let confirmPassword = $state("");
	let agreeTerms = $state(false);
	let loading = $state(false);
	let error = $state("");

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

	// Redirect if already authenticated
	$effect(() => {
		if ($isAuthenticated) {
			goto("/dashboard");
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = "";

		// Validation
		if (password !== confirmPassword) {
			error = "Password tidak cocok";
			return;
		}

		if (password.length < 8) {
			error = "Password minimal 8 karakter";
			return;
		}

		if (!agreeTerms) {
			error = "Kamu harus menyetujui syarat dan ketentuan";
			return;
		}

		loading = true;

		try {
			if (isDemoMode()) {
				demoSignIn();
				toasts.add({ type: "success", message: "Akun demo berhasil dibuat!" });
				goto("/dashboard");
			} else {
				await signUp(email, password, name);
				toasts.add({
					type: "success",
					message: "Akun berhasil dibuat! Silakan cek email untuk verifikasi."
				});
				goto("/login");
			}
		} catch (err) {
			error = err instanceof Error ? err.message : "Pendaftaran gagal. Silakan coba lagi.";
		} finally {
			loading = false;
		}
	}

	async function handleGoogleSignIn() {
		try {
			if (isDemoMode()) {
				demoSignIn();
				toasts.add({ type: "success", message: "Welcome! (Demo Mode)" });
				goto("/dashboard");
			} else {
				await signInWithGoogle();
			}
		} catch (err) {
			error = err instanceof Error ? err.message : "Google sign in failed.";
		}
	}
</script>

<svelte:head>
	<title>Daftar - Okis Garage Sale</title>
	<meta
		name="description"
		content="Buat akun Okis Garage Sale dan mulai jual-beli barang preloved"
	/>
</svelte:head>

<div class="register-container">
	<div class="register-card">
		<!-- Header -->
		<div class="card-header">
			<h1>Buat Akun Baru</h1>
			<p>Bergabung dan mulai jual-beli barang preloved</p>
		</div>

		<!-- Demo Mode Banner -->
		{#if isDemoMode()}
			<div class="demo-banner">
				<span class="demo-icon">🎮</span>
				<div>
					<strong>Demo Mode</strong>
					<p>Akun demo akan dibuat tanpa verifikasi email.</p>
				</div>
			</div>
		{/if}

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

		<!-- Register Form -->
		<form onsubmit={handleSubmit} class="register-form">
			<Input
				type="text"
				name="name"
				label="Nama Lengkap"
				placeholder="John Doe"
				bind:value={name}
				required
				disabled={loading}
			/>

			<Input
				type="email"
				name="email"
				label="Email"
				placeholder="nama@email.com"
				bind:value={email}
				required
				disabled={loading}
			/>

			<div class="password-field">
				<Input
					type="password"
					name="password"
					label="Password"
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
				placeholder="Ulangi password"
				bind:value={confirmPassword}
				required
				disabled={loading}
				error={confirmPassword && password !== confirmPassword
					? "Password tidak cocok"
					: ""}
			/>

			<label class="terms-checkbox">
				<input type="checkbox" bind:checked={agreeTerms} />
				<span>
					Saya setuju dengan <a href="/terms" target="_blank">Syarat & Ketentuan</a> dan
					<a href="/privacy" target="_blank">Kebijakan Privasi</a>
				</span>
			</label>

			<Button type="submit" variant="primary" fullWidth {loading}>
				{loading ? "Memproses..." : "Daftar Sekarang"}
			</Button>
		</form>

		<!-- Divider -->
		<div class="divider">
			<span>atau</span>
		</div>

		<!-- Social Login -->
		<div class="social-buttons">
			<button type="button" class="social-btn google" onclick={handleGoogleSignIn}>
				<svg viewBox="0 0 24 24" width="20" height="20">
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				<span>Daftar dengan Google</span>
			</button>
		</div>

		<!-- Login Link -->
		<p class="login-link">
			Sudah punya akun? <a href="/login">Masuk di sini</a>
		</p>
	</div>
</div>

<style>
	.register-container {
		width: 100%;
		max-width: 420px;
	}

	.register-card {
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

	.demo-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.3);
		border-radius: 0.75rem;
		padding: 0.875rem 1rem;
		margin-bottom: 1.5rem;
	}

	.demo-icon {
		font-size: 1.5rem;
	}

	.demo-banner strong {
		color: #fbbf24;
		font-size: 0.875rem;
		display: block;
	}

	.demo-banner p {
		color: #94a3b8;
		font-size: 0.75rem;
		margin: 0;
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

	.register-form {
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

	.terms-checkbox {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		color: #94a3b8;
		font-size: 0.875rem;
		cursor: pointer;
		line-height: 1.4;
	}

	.terms-checkbox input {
		width: 1.125rem;
		height: 1.125rem;
		accent-color: #14b8a6;
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	.terms-checkbox a {
		color: #14b8a6;
		text-decoration: none;
	}

	.terms-checkbox a:hover {
		text-decoration: underline;
	}

	.divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.divider::before,
	.divider::after {
		content: "";
		flex: 1;
		height: 1px;
		background: rgba(148, 163, 184, 0.2);
	}

	.divider span {
		color: #64748b;
		font-size: 0.875rem;
	}

	.social-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.875rem 1.5rem;
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		color: #f8fafc;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.social-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(148, 163, 184, 0.3);
	}

	.social-btn.google:hover {
		border-color: rgba(66, 133, 244, 0.5);
	}

	.login-link {
		text-align: center;
		margin-top: 1.5rem;
		color: #94a3b8;
		font-size: 0.95rem;
	}

	.login-link a {
		color: #14b8a6;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.login-link a:hover {
		color: #2dd4bf;
	}

	/* Input styling overrides for dark theme */
	:global(.register-form .w-full label) {
		color: #e2e8f0 !important;
	}

	:global(.register-form input[type="text"]),
	:global(.register-form input[type="email"]),
	:global(.register-form input[type="password"]) {
		background: rgba(15, 23, 42, 0.5) !important;
		border-color: rgba(148, 163, 184, 0.2) !important;
		color: #f8fafc !important;
	}

	:global(.register-form input::placeholder) {
		color: #64748b !important;
	}

	:global(.register-form input:focus) {
		border-color: #14b8a6 !important;
		box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1) !important;
	}
</style>
