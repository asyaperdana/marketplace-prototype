<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$lib/utils";
	import Logo from "../ui/Logo.svelte";
	import {
		isAuthenticated,
		authStore,
		signOut,
		demoSignOut,
		isDemoMode
	} from "$lib/services/auth";
	import { goto } from "$app/navigation";
	import { toasts } from "$lib/stores";

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	let isUserMenuOpen = $state(false);

	const user = $derived($authStore.user);

	const navLinks = [
		{ href: "#hero", label: "Home" },
		{ href: "#stats", label: "Statistik" },
		{ href: "#how-it-works", label: "Cara Kerja" },
		{ href: "#categories", label: "Kategori" },
		{ href: "#products", label: "Produk" },
		{ href: "#testimonials", label: "Testimoni" }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest(".user-menu-container")) {
				isUserMenuOpen = false;
			}
		};

		window.addEventListener("scroll", handleScroll);
		document.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.removeEventListener("click", handleClickOutside);
		};
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	function toggleUserMenu() {
		isUserMenuOpen = !isUserMenuOpen;
	}

	async function handleSignOut() {
		try {
			if (isDemoMode()) {
				demoSignOut();
			} else {
				await signOut();
			}
			isUserMenuOpen = false;
			toasts.add({ type: "success", message: "Berhasil keluar!" });
			goto("/");
		} catch {
			toasts.add({ type: "error", message: "Gagal keluar. Coba lagi." });
		}
	}
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {isScrolled
		? 'py-3 bg-dark-deep/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
		: 'py-4'}"
>
	<div class="container mx-auto px-6 flex items-center justify-between">
		<!-- Logo -->
		<a href={resolve("#hero")} class="flex items-center gap-2 group" onclick={closeMobileMenu}>
			<Logo size="sm" class="group-hover:rotate-12 transition-transform duration-300" />
			<span class="text-2xl font-black tracking-tighter text-white"
				>OKIS <span class="text-primary-light">GS</span></span
			>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden lg:flex items-center gap-10">
			{#each navLinks as link (link.label)}
				<a
					href={resolve(link.href)}
					class="text-sm font-semibold text-slate-300 hover:text-white transition-all relative group uppercase tracking-wider"
				>
					{link.label}
					<span
						class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			{/each}
		</div>

		<!-- Auth Section -->
		<div class="hidden lg:flex items-center gap-4">
			{#if $isAuthenticated}
				<!-- User Menu -->
				<div class="user-menu-container relative">
					<button
						class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all"
						onclick={toggleUserMenu}
					>
						<div
							class="w-8 h-8 rounded-lg bg-linear-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm"
						>
							{user?.user_metadata?.name?.[0] || user?.email?.[0] || "U"}
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4 h-4 text-slate-400 transition-transform"
							class:rotate-180={isUserMenuOpen}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m19.5 8.25-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>

					<!-- Dropdown -->
					{#if isUserMenuOpen}
						<div
							class="absolute right-0 top-full mt-2 w-56 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2"
						>
							<div class="px-4 py-3 border-b border-white/10">
								<p class="text-sm font-medium text-white truncate">
									{user?.user_metadata?.name || "User"}
								</p>
								<p class="text-xs text-slate-400 truncate">{user?.email}</p>
							</div>
							<a
								href="/dashboard"
								class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
								onclick={() => (isUserMenuOpen = false)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>
								Dashboard
							</a>
							<a
								href="/products"
								class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
								onclick={() => (isUserMenuOpen = false)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>
								Produk
							</a>
							<div class="h-px bg-white/10 my-1"></div>
							<button
								onclick={handleSignOut}
								class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
									/>
								</svg>
								Keluar
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<!-- Login/Register Buttons -->
				<a
					href="/login"
					class="text-sm font-semibold text-slate-300 hover:text-white transition-all px-4 py-2"
				>
					Masuk
				</a>
				<a
					href="/register"
					class="btn btn-primary px-6 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/40"
				>
					Daftar
				</a>
			{/if}
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="lg:hidden w-10 h-10 flex items-center justify-center text-white glass-light rounded-xl border border-white/10"
			onclick={toggleMobileMenu}
			aria-label="Toggle menu"
		>
			<div class="w-6 h-5 relative flex flex-col justify-between">
				<span
					class="w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left"
					class:rotate-45={isMobileMenuOpen}
					class:translate-x-1={isMobileMenuOpen}
				></span>
				<span
					class="w-full h-0.5 bg-white rounded-full transition-all duration-300"
					class:opacity-0={isMobileMenuOpen}
				></span>
				<span
					class="w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-left"
					class:-rotate-45={isMobileMenuOpen}
					class:translate-x-1={isMobileMenuOpen}
				></span>
			</div>
		</button>
	</div>

	<!-- Mobile Menu -->
	<div
		class="lg:hidden fixed inset-x-0 top-[80px] p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
		class:opacity-100={isMobileMenuOpen}
		class:translate-y-0={isMobileMenuOpen}
		class:pointer-events-auto={isMobileMenuOpen}
		class:opacity-0={!isMobileMenuOpen}
		class:-translate-y-10={!isMobileMenuOpen}
	>
		<div
			class="bg-dark/95 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 shadow-2xl flex flex-col gap-4"
		>
			{#each navLinks as link (link.label)}
				<a
					href={resolve(link.href)}
					class="px-6 py-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold text-lg"
					onclick={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
			<div class="h-px bg-white/10 my-2"></div>
			{#if $isAuthenticated}
				<a
					href="/dashboard"
					class="px-6 py-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold text-lg"
					onclick={closeMobileMenu}
				>
					Dashboard
				</a>
				<button
					onclick={handleSignOut}
					class="btn btn-primary w-full py-5 text-xl bg-red-500 hover:bg-red-600"
				>
					Keluar
				</button>
			{:else}
				<a
					href="/login"
					class="px-6 py-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold text-lg text-center"
					onclick={closeMobileMenu}
				>
					Masuk
				</a>
				<a
					href="/register"
					class="btn btn-primary w-full py-5 text-xl"
					onclick={closeMobileMenu}
				>
					Daftar Sekarang
				</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-in-from-top-2 {
		from {
			transform: translateY(-8px);
		}
		to {
			transform: translateY(0);
		}
	}

	.animate-in {
		animation:
			fade-in 0.15s ease-out,
			slide-in-from-top-2 0.15s ease-out;
	}
</style>
