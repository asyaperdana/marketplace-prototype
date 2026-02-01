<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui";
	import { Navbar, Footer } from "$lib/components/layout";
	import {
		authStore,
		isAuthenticated,
		signOut,
		demoSignOut,
		isDemoMode
	} from "$lib/services/auth";
	import { toasts } from "$lib/stores";

	// Redirect if not authenticated
	$effect(() => {
		if (!$isAuthenticated && $authStore.initialized) {
			goto("/login");
		}
	});

	const user = $derived($authStore.user);

	async function handleSignOut() {
		try {
			if (isDemoMode()) {
				demoSignOut();
			} else {
				await signOut();
			}
			toasts.add({ type: "success", message: "Berhasil keluar!" });
			goto("/");
		} catch (err) {
			toasts.add({ type: "error", message: "Gagal keluar. Coba lagi." });
		}
	}
</script>

<svelte:head>
	<title>Dashboard - Okis Garage Sale</title>
	<meta name="description" content="Dashboard pengguna Okis Garage Sale" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />

<main class="dashboard">
	<div class="container">
		<!-- Welcome Section -->
		<section class="welcome-section">
			<div class="welcome-card">
				<div class="avatar">
					{#if user?.user_metadata?.avatar_url}
						<img src={user.user_metadata.avatar_url} alt="Avatar" />
					{:else}
						<span>{user?.user_metadata?.name?.[0] || user?.email?.[0] || "U"}</span>
					{/if}
				</div>
				<div class="welcome-text">
					<h1>Selamat datang, {user?.user_metadata?.name || "User"}! 👋</h1>
					<p>{user?.email}</p>
					{#if isDemoMode()}
						<span class="demo-badge">Demo Mode</span>
					{/if}
				</div>
				<Button variant="outline" onclick={handleSignOut}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						width="18"
						height="18"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
						/>
					</svg>
					Keluar
				</Button>
			</div>
		</section>

		<!-- Quick Stats -->
		<section class="stats-grid">
			<div class="stat-card">
				<div class="stat-icon purchases">
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
							d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">0</span>
					<span class="stat-label">Pembelian</span>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon listings">
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
							d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 6h.008v.008H6V6Z"
						/>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">0</span>
					<span class="stat-label">Listing Aktif</span>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon wishlist">
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
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">0</span>
					<span class="stat-label">Wishlist</span>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon messages">
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
							d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
						/>
					</svg>
				</div>
				<div class="stat-content">
					<span class="stat-value">0</span>
					<span class="stat-label">Pesan</span>
				</div>
			</div>
		</section>

		<!-- Quick Actions -->
		<section class="actions-section">
			<h2>Aksi Cepat</h2>
			<div class="actions-grid">
				<a href="/products" class="action-card">
					<div class="action-icon browse">
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
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</div>
					<span>Jelajahi Produk</span>
				</a>

				<a href="/sell" class="action-card">
					<div class="action-icon sell">
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</div>
					<span>Jual Barang</span>
				</a>

				<a href="/dashboard/orders" class="action-card">
					<div class="action-icon orders">
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
								d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
							/>
						</svg>
					</div>
					<span>Pesanan Saya</span>
				</a>

				<a href="/dashboard/settings" class="action-card">
					<div class="action-icon settings">
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
								d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					</div>
					<span>Pengaturan</span>
				</a>
			</div>
		</section>

		<!-- Empty State for Recent Activity -->
		<section class="activity-section">
			<h2>Aktivitas Terbaru</h2>
			<div class="empty-state">
				<div class="empty-icon">
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
							d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</div>
				<h3>Belum Ada Aktivitas</h3>
				<p>Mulai jelajahi produk atau jual barang preloved kamu!</p>
				<Button variant="primary" onclick={() => goto("/products")}>Jelajahi Produk</Button>
			</div>
		</section>
	</div>
</main>

<Footer />

<style>
	.dashboard {
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		padding: 6rem 1rem 4rem;
		font-family: "Inter", system-ui, sans-serif;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Welcome Section */
	.welcome-section {
		margin-bottom: 2rem;
	}

	.welcome-card {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1.5rem;
		padding: 2rem;
	}

	.avatar {
		width: 4rem;
		height: 4rem;
		border-radius: 1rem;
		background: linear-gradient(135deg, #14b8a6, #10b981);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		object-fit: cover;
	}

	.welcome-text {
		flex: 1;
	}

	.welcome-text h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 0.25rem;
	}

	.welcome-text p {
		color: #94a3b8;
		font-size: 0.95rem;
	}

	.demo-badge {
		display: inline-block;
		margin-top: 0.5rem;
		padding: 0.25rem 0.75rem;
		background: rgba(251, 191, 36, 0.2);
		border: 1px solid rgba(251, 191, 36, 0.3);
		border-radius: 9999px;
		color: #fbbf24;
		font-size: 0.75rem;
		font-weight: 500;
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.stat-icon {
		width: 3rem;
		height: 3rem;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stat-icon svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.stat-icon.purchases {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.stat-icon.listings {
		background: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	.stat-icon.wishlist {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.stat-icon.messages {
		background: rgba(168, 85, 247, 0.2);
		color: #a855f7;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f8fafc;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #94a3b8;
	}

	/* Actions Section */
	.actions-section {
		margin-bottom: 2rem;
	}

	.actions-section h2,
	.activity-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #f8fafc;
		margin-bottom: 1rem;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.action-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
		text-decoration: none;
		transition: all 0.2s;
	}

	.action-card:hover {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(20, 184, 166, 0.3);
		transform: translateY(-2px);
	}

	.action-icon {
		width: 3rem;
		height: 3rem;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-icon svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.action-icon.browse {
		background: rgba(20, 184, 166, 0.2);
		color: #14b8a6;
	}

	.action-icon.sell {
		background: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	.action-icon.orders {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.action-icon.settings {
		background: rgba(148, 163, 184, 0.2);
		color: #94a3b8;
	}

	.action-card span {
		font-size: 0.875rem;
		font-weight: 500;
		color: #e2e8f0;
	}

	/* Activity Section */
	.activity-section {
		margin-bottom: 2rem;
	}

	.empty-state {
		text-align: center;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		padding: 3rem 2rem;
	}

	.empty-icon {
		width: 4rem;
		height: 4rem;
		margin: 0 auto 1rem;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-icon svg {
		width: 2rem;
		height: 2rem;
		color: #64748b;
	}

	.empty-state h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #f8fafc;
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: #94a3b8;
		margin-bottom: 1.5rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.welcome-card {
			flex-direction: column;
			text-align: center;
		}

		.welcome-text h1 {
			font-size: 1.25rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.actions-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
