<script lang="ts">
	import { onMount } from "svelte";
	import { SvelteSet } from "svelte/reactivity";

	interface FAQItem {
		id: number;
		question: string;
		answer: string;
	}

	const faqItems: FAQItem[] = [
		{
			id: 1,
			question: "Bagaimana cara mulai jualan di Okis Garage Sale?",
			answer: "Caranya sangat mudah! Daftar akun gratis, lengkapi profil seller, lalu mulai upload foto produk. Dalam 5 menit, produkmu sudah bisa dilihat oleh ribuan calon pembeli."
		},
		{
			id: 2,
			question: "Apakah ada biaya untuk menjual di Okis GS?",
			answer: "Daftar dan upload produk GRATIS! Kami hanya mengambil biaya admin 5% dari setiap transaksi sukses. Tidak ada biaya bulanan atau biaya tersembunyi lainnya."
		},
		{
			id: 3,
			question: "Bagaimana sistem pembayaran di Okis GS?",
			answer: "Kami menggunakan sistem escrow untuk keamanan. Uang pembeli akan ditahan sampai barang diterima dan dikonfirmasi. Dana akan masuk ke saldo seller dalam 1x24 jam setelah konfirmasi."
		},
		{
			id: 4,
			question: "Apa yang harus dilakukan jika barang tidak sesuai?",
			answer: "Jangan khawatir! Kami memiliki Buyer Protection. Jika barang tidak sesuai deskripsi, kamu bisa ajukan komplain dalam 2x24 jam. Tim kami akan membantu mediasi dan proses refund jika diperlukan."
		},
		{
			id: 5,
			question: "Metode pengiriman apa saja yang tersedia?",
			answer: "Kami bekerjasama dengan berbagai ekspedisi seperti JNE, J&T, SiCepat, AnterAja, dan Gosend/GrabExpress. Buyer bisa pilih sesuai kebutuhan dan budget."
		},
		{
			id: 6,
			question: "Apakah bisa negosiasi harga dengan seller?",
			answer: "Tentu bisa! Gunakan fitur chat untuk berkomunikasi langsung dengan seller. Banyak seller yang terbuka untuk negosiasi harga, terutama jika kamu membeli lebih dari satu item."
		}
	];

	let openItems = new SvelteSet<number>();
	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	function toggleItem(id: number) {
		if (openItems.has(id)) {
			openItems.delete(id);
		} else {
			openItems.add(id);
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
</script>

<section id="faq" class="py-20 relative overflow-hidden bg-dark-deep" bind:this={sectionRef}>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-4xl">
		<div
			class="text-center mb-16 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<h2 class="text-4xl lg:text-6xl font-black text-white tracking-tighter">
				Pertanyaan <span class="gradient-text">Umum</span>
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang Okis Garage
				Sale.
			</p>
		</div>

		<div class="space-y-4">
			{#each faqItems as item, index (item.id)}
				<div
					class="glass rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/5 {openItems.has(
						item.id
					)
						? 'border-primary/30'
						: ''} {!isVisible ? 'opacity-0 translate-y-10' : ''}"
					style="transition-delay: {index * 0.05}s"
				>
					<button
						class="w-full flex items-center justify-between gap-6 p-8 text-left group"
						onclick={() => toggleItem(item.id)}
					>
						<span
							class="text-xl font-bold text-white transition-colors group-hover:text-primary-light"
							>{item.question}</span
						>
						<div
							class="flex-shrink-0 w-10 h-10 rounded-xl glass-light flex items-center justify-center transition-all duration-500 {openItems.has(
								item.id
							)
								? 'rotate-45 bg-primary/40 text-white shadow-lg shadow-primary/30'
								: 'text-slate-400'}"
						>
							<svg
								class="w-6 h-6 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="M12 4v16m8-8H4"
								/>
							</svg>
						</div>
					</button>
					<div
						class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style="max-height: {openItems.has(item.id)
							? '400px'
							: '0px'}; opacity: {openItems.has(item.id) ? '1' : '0'}"
					>
						<div
							class="px-8 pb-8 text-slate-300 leading-relaxed text-lg border-t border-white/5 pt-6"
						>
							<p class="bg-white/5 p-6 rounded-2xl border border-white/5">
								{item.answer}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div
			class="mt-20 text-center"
			class:opacity-0={!isVisible}
			class:translate-y-4={!isVisible}
			style="transition-delay: 0.3s"
		>
			<p class="text-slate-400 mb-8 text-lg font-medium">Masih punya pertanyaan lain?</p>
			<a
				href="#newsletter"
				class="btn btn-secondary px-10 py-5 text-xl font-bold hover:border-primary/50 group"
			>
				<svg
					class="w-6 h-6 text-primary-light group-hover:scale-125 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
				Hubungi Support Center
			</a>
		</div>
	</div>
</section>
