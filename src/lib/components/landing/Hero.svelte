<script lang="ts">
	import { onMount } from "svelte";
	import { FLOATING_PRODUCTS } from "$lib/constants/landing";
	import { resolve } from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";

	let isLoaded = $state(false);
	let activeUsers = $state(1847); // Static value for performance

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 100);
		// Live user simulation removed for performance
	});
</script>

<section id="hero" class="hero-section relative min-h-dvh lg:min-h-[110vh] overflow-hidden">
	<!-- Premium Animated Background -->
	<div class="absolute inset-0 bg-dark-deep">
		<div class="bg-noise"></div>
		<div class="mesh-gradient"></div>

		<!-- Hero Brand Visual -->
		<img
			src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=70&w=1200"
			srcset="
				https://images.unsplash.com/photo-1483985988355-763728e1935b?q=70&w=600 600w,
				https://images.unsplash.com/photo-1483985988355-763728e1935b?q=70&w=1200 1200w,
				https://images.unsplash.com/photo-1483985988355-763728e1935b?q=70&w=1600 1600w
			"
			sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw"
			alt="Premium Fashion Marketplace"
			loading="eager"
			decoding="async"
			fetchpriority="high"
			class="absolute bottom-0 right-0 w-[60%] lg:w-[45%] h-auto opacity-20 lg:opacity-30 pointer-events-none object-contain object-bottom-right"
		/>

		<!-- Animated Gradient Orbs -->
		<div class="orb orb-primary"></div>
		<div class="orb orb-secondary"></div>
		<div class="orb orb-accent"></div>

		<!-- Grid Pattern -->
		<div class="grid-pattern"></div>
	</div>

	<!-- Main Content -->
	<div class="container mx-auto px-4 sm:px-6 relative z-10 h-full">
		<div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-24 lg:py-32">
			<!-- Left Content - 8 columns (Wider for impact) -->
			<div class="lg:col-span-8 space-y-10 relative z-20" class:animate-reveal={isLoaded}>
				<!-- Live Badge - Refined -->
				<div
					class="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-light border border-white/10"
				>
					<span
						class="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"
					></span>
					<span class="text-slate-300 text-xs font-medium tracking-wide uppercase"
						>{activeUsers.toLocaleString()} shoppers live</span
					>
				</div>

				<!-- Main Headline -->
				<div class="space-y-6">
					<h1
						class="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter"
					>
						Authentic
						<span class="block gradient-text">Luxury</span>
						<span
							class="block text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-400 mt-2 tracking-normal"
							>for everyone.</span
						>
					</h1>
					<p
						class="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl font-light"
					>
						Experience the thrill of the hunt. The #1 curated marketplace for premium
						preloved fashion and tech.
						<span class="text-white font-medium">Verified authentic.</span>
					</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-5 pt-6 w-full sm:w-auto">
					<a
						href={resolve("#newsletter")}
						class="btn-hero-primary group w-full sm:w-auto"
					>
						<span class="relative z-10 flex items-center justify-center gap-3">
							<Icon
								name="sparkles"
								size={22}
								className="text-white/90"
								ariaLabel="Highlight"
							/>
							<span class="font-bold text-lg tracking-wide">Start Selling</span>
						</span>
					</a>
					<a
						href={resolve("/products")}
						class="btn-hero-secondary group w-full sm:w-auto"
					>
						<span class="flex items-center justify-center gap-3">
							<span class="font-semibold tracking-wide">Explore Collection</span>
							<span>→</span>
						</span>
					</a>
				</div>

				<!-- Trust Markers (Simplified) -->
				<div
					class="pt-8 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
				>
					<div class="text-sm font-semibold tracking-widest uppercase text-slate-500">
						Trusted by
					</div>
					<div class="h-4 w-px bg-white/20"></div>
					<div class="font-bold text-slate-400">VOGUE</div>
					<div class="font-bold text-slate-400">HYPEBEAST</div>
					<div class="font-bold text-slate-400">HIGHSNOBIETY</div>
				</div>
			</div>

			<!-- Right Visual - 4 columns (Floating abstract composition) -->
			<div
				class="lg:col-span-4 relative mt-12 lg:mt-0 hidden lg:block"
				class:animate-in-visual={isLoaded}
			>
				<div class="relative w-full aspect-3/4 perspective-1000">
					<!-- Phone Mockup rotated -->
					<div
						class="absolute inset-0 z-10 transform rotate-y-12 rotate-z-6 hover:rotate-y-0 hover:rotate-z-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
						style="transform-style: preserve-3d;"
					>
						<div class="phone-mockup h-full w-full shadow-neon">
							<!-- Simplified app UI for aesthetic -->
							<div class="flex flex-col h-full bg-dark-deep">
								<div
									class="flex-1 bg-[url('https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=70&w=500')] bg-cover bg-center relative"
								>
									<div
										class="absolute inset-0 bg-linear-to-t from-dark-deep via-transparent to-transparent"
									></div>
									<div class="absolute bottom-6 left-6 right-6">
										<div class="glass-card p-4 rounded-2xl">
											<div class="text-xs text-slate-300 mb-1">
												Trending Now
											</div>
											<div class="font-bold text-white text-lg">
												Streetwear Collection '25
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Floating Elements Parallax -->
					{#each FLOATING_PRODUCTS as product, i (product.label)}
						<div
							class="absolute z-20 glass-card p-3 rounded-2xl flex items-center gap-3 shadow-lg animate-float"
							style="
								top: {20 + i * 25}%;
								right: {-20 + (i % 2) * 60}%;
								animation-delay: {i * 1.5}s;
								transform: translateZ(50px);
                                will-change: transform;
							"
						>
							<span
								class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light"
							>
								<Icon name={product.icon} size={20} ariaLabel={product.label} />
							</span>
							<div>
								<div class="text-xs font-bold text-white whitespace-nowrap">
									{product.label}
								</div>
								<div class="text-[10px] font-bold gradient-text-color">
									{product.price}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
	>
		<span class="text-xs text-slate-400 uppercase tracking-widest">Scroll</span>
		<div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
			<div class="w-1.5 h-3 bg-white/60 rounded-full animate-bounce"></div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		display: flex;
		align-items: center;
	}

	/* Simplified animations */
	.animate-reveal {
		animation: slideUp 0.5s ease-out forwards;
	}

	.animate-in-visual {
		animation: fadeIn 0.6s ease-out 0.2s forwards;
		opacity: 0;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Phone Mockup - Simplified */
	.phone-mockup {
		background: rgba(30, 41, 59, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 2.5rem;
		box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	.perspective-1000 {
		perspective: 1000px;
	}

	/* Simple Hero Buttons */
	.btn-hero-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem 2.5rem;
		background: var(--gradient-primary);
		color: white;
		border-radius: 1.25rem;
		box-shadow: 0 10px 25px rgba(14, 165, 233, 0.25);
		transition:
			transform 0.2s ease-out,
			box-shadow 0.2s ease-out;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.btn-hero-primary:hover {
		box-shadow: 0 15px 35px rgba(14, 165, 233, 0.35);
		transform: translateY(-2px);
	}

	.btn-hero-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem 2.5rem;
		background: rgba(30, 41, 59, 0.8);
		color: white;
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition:
			transform 0.2s ease-out,
			background 0.2s ease-out;
	}

	.btn-hero-secondary:hover {
		background: rgba(255, 255, 255, 0.08);
		transform: translateY(-2px);
	}
</style>
