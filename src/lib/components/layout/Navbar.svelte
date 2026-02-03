<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$lib/utils";
	import Logo from "../ui/Logo.svelte";

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/#stats", label: "Statistik" },
		{ href: "/#how-it-works", label: "Cara Kerja" },
		{ href: "/#categories", label: "Kategori" },
		{ href: "/products", label: "Produk" },
		{ href: "/#testimonials", label: "Testimoni" }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
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

		<!-- CTA Button -->
		<div class="hidden lg:block">
			<a
				href={resolve("#newsletter")}
				class="btn btn-primary px-8 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/40"
			>
				Mulai Jualan
			</a>
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
			<a
				href={resolve("#newsletter")}
				class="btn btn-primary w-full py-5 text-xl"
				onclick={closeMobileMenu}
			>
				Mulai Jualan Sekarang
			</a>
		</div>
	</div>
</nav>
