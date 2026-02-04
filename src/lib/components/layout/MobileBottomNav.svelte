<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	interface NavItem {
		icon: IconName;
		label: string;
		href: string;
	}

	const navItems: NavItem[] = [
		{ icon: "home", label: "Home", href: "#hero" },
		{ icon: "grid", label: "Kategori", href: "#categories" },
		{ icon: "search", label: "Cari", href: "#products" },
		{ icon: "heart", label: "Favorit", href: "#" },
		{ icon: "user", label: "Akun", href: "#" }
	];

	let isVisible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			// Show when scrolled past hero section
			isVisible = currentScrollY > 500;
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<!-- Mobile Bottom Navigation -->
<nav
	class="lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
	class:translate-y-full={!isVisible}
	class:translate-y-0={isVisible}
>
	<!-- Background Blur -->
	<div class="absolute inset-0 bg-dark-deep/90 backdrop-blur-xl border-t border-white/10"></div>

	<div class="relative z-10 flex items-center justify-around px-2 py-3 safe-area-pb">
		{#each navItems as item, index (item.label)}
			{#if index === 2}
				<!-- Center CTA Button -->
				<a
					href={resolve("#newsletter")}
					class="relative -top-4 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-primary/40 hover:scale-110 active:scale-95 transition-transform duration-300 border-4 border-dark-deep"
				>
					<Icon name="plus" size={22} ariaLabel="Tambah" />
				</a>
			{:else}
				<a
					href={resolve(item.href)}
					class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/5 active:scale-95 group"
				>
					<Icon
						name={item.icon}
						size={18}
						ariaLabel={item.label}
						class="text-slate-200 group-hover:scale-110 transition-transform"
					/>
					<span
						class="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider"
						>{item.label}</span
					>
				</a>
			{/if}
		{/each}
	</div>
</nav>

<!-- Floating CTA for Desktop (shows only when scrolled) -->
<!--
<div
    class="hidden lg:block fixed bottom-8 right-8 z-50 transition-all duration-500"
    class:opacity-0={!isVisible}
    class:translate-y-10={!isVisible}
    class:pointer-events-none={!isVisible}
>
    <a
        href="#newsletter"
        class="btn btn-primary px-8 py-4 shadow-2xl shadow-primary/40 hover:shadow-primary/60 group"
    >
        <Icon
            name="bag"
            size={18}
            ariaLabel="Mulai jualan"
            className="group-hover:rotate-12 transition-transform"
        />
        Mulai Jualan
        <svg
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
        </svg>
    </a>
</div>
-->
<style>
	.safe-area-pb {
		padding-bottom: env(safe-area-inset-bottom, 0.5rem);
	}
</style>
