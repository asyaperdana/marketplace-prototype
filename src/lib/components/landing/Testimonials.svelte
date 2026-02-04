<script lang="ts">
	import { onMount } from "svelte";

	interface Testimonial {
		id: number;
		name: string;
		role: string;
		avatar: string;
		quote: string;
		rating: number;
	}

	const testimonials: Testimonial[] = [
		{
			id: 1,
			name: "Sarah Wijaya",
			role: "Seller Fashion",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
			quote: "Udah setahun jualan di Okis GS, omzet bulanan bisa tembus 15 juta! Prosesnya gampang banget dan buyer-nya banyak.",
			rating: 5
		},
		{
			id: 2,
			name: "Rizky Pratama",
			role: "Buyer Elektronik",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
			quote: "Beli iPhone bekas di sini jauh lebih worth it. Kondisi sesuai deskripsi dan ada garansi dari seller. Recommended!",
			rating: 5
		},
		{
			id: 3,
			name: "Anisa Putri",
			role: "Seller & Buyer",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
			quote: "Platform favorit buat declutter lemari! Sekarang bisa dapat income tambahan dari barang-barang yang udah ga kepake.",
			rating: 5
		},
		{
			id: 4,
			name: "Budi Santoso",
			role: "Seller Buku",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
			quote: "Koleksi buku lama saya akhirnya ketemu pemilik baru. Senang bisa berbagi dengan sesama pecinta buku.",
			rating: 5
		},
		{
			id: 5,
			name: "Dewi Lestari",
			role: "Buyer Fashion",
			avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
			quote: "Dapat branded bag authentic dengan harga 70% lebih murah! Seller-nya ramah dan packingnya rapi.",
			rating: 5
		}
	];

	let currentIndex = $state(0);
	let isVisible = $state(false);
	let sectionRef: HTMLElement;
	let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

	function nextSlide() {
		currentIndex = (currentIndex + 1) % testimonials.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}

	function startAutoPlay() {
		if (autoPlayInterval) return;
		autoPlayInterval = setInterval(nextSlide, 5000);
	}

	function stopAutoPlay() {
		if (!autoPlayInterval) return;
		clearInterval(autoPlayInterval);
		autoPlayInterval = null;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						startAutoPlay();
					} else {
						stopAutoPlay();
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => {
			observer.disconnect();
			stopAutoPlay();
		};
	});
</script>

<section
	id="testimonials"
	class="py-20 relative overflow-hidden bg-dark-deep"
	bind:this={sectionRef}
>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"
		></div>
		<div
			class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-5xl">
		<div
			class="text-center mb-20 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<h2 class="text-3xl lg:text-5xl font-black text-white tracking-tighter">
				Apa Kata <span class="gradient-text">Mereka</span>?
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Ribuan pengguna telah membuktikan kemudahan bertransaksi di platform kami.
			</p>
		</div>

		<div
			class="relative px-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
			style="transition-delay: 0.2s"
		>
			<div class="relative overflow-hidden rounded-[3rem] p-1">
				<div
					class="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
					style="transform: translateX(-{currentIndex * 100}%)"
				>
					{#each testimonials as testimonial (testimonial.id)}
						<div class="w-full shrink-0 px-2 sm:px-4">
							<div
								class="glass rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center border border-white/5 relative group transition-all duration-500"
							>
								<div
									class="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-primary/30 transform rotate-12 group-hover:rotate-0 transition-transform duration-500"
								>
									"
								</div>

								<blockquote
									class="text-xl sm:text-2xl md:text-3xl text-slate-100 leading-relaxed mb-6 sm:mb-10 font-medium italic tracking-tight"
								>
									"{testimonial.quote}"
								</blockquote>

								<div class="flex justify-center gap-2 mb-10">
									{#each Array(testimonial.rating) as _, i (i)}
										<span
											class="text-yellow-400 text-2xl drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
											>⭐</span
										>
									{/each}
								</div>

								<div class="flex flex-col items-center gap-4">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										loading="lazy"
										decoding="async"
										class="w-20 h-20 rounded-full object-cover border-2 border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500"
									/>
									<div class="text-center">
										<h4 class="text-2xl font-black text-white mb-1">
											{testimonial.name}
										</h4>
										<span
											class="text-primary-light font-bold text-sm tracking-widest uppercase"
											>{testimonial.role}</span
										>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Enhanced Navigation Arrows -->
			<button
				class="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl glass-light border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-500 group shadow-xl z-20"
				onclick={prevSlide}
				aria-label="Previous testimonial"
			>
				<svg
					class="w-8 h-8 group-hover:-translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				class="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl glass-light border border-white/10 hidden md:flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-500 group shadow-xl z-20"
				onclick={nextSlide}
				aria-label="Next testimonial"
			>
				<svg
					class="w-8 h-8 group-hover:translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>

		<!-- Dots Navigation -->
		<div
			class="flex justify-center gap-4 mt-12"
			class:opacity-0={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
			style="transition-delay: 0.4s"
		>
			{#each testimonials as _, index (testimonials[index].id)}
				<button
					class="h-3 rounded-full transition-all duration-500 {currentIndex === index
						? 'w-12 bg-linear-to-r from-primary to-secondary shadow-lg shadow-primary/40'
						: 'w-3 bg-white/20 hover:bg-white/40'}"
					onclick={() => goToSlide(index)}
					aria-label="Go to testimonial {index + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>
