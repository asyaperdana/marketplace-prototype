<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	type UserType = "seller" | "buyer";

	interface Step {
		number: number;
		icon: IconName;
		title: string;
		description: string;
	}

	const sellerSteps: Step[] = [
		{
			number: 1,
			icon: "camera",
			title: "Upload Foto Produk",
			description: "Foto barang dari berbagai angle dengan pencahayaan yang baik."
		},
		{
			number: 2,
			icon: "note",
			title: "Isi Detail Produk",
			description: "Tambahkan deskripsi, kondisi, harga, dan kategori produk."
		},
		{
			number: 3,
			icon: "megaphone",
			title: "Publish & Promosi",
			description: "Produk akan tampil di feed dan bisa dipromosikan."
		},
		{
			number: 4,
			icon: "wallet",
			title: "Terima Pembayaran",
			description: "Dana masuk ke saldo setelah pembeli konfirmasi terima."
		}
	];

	const buyerSteps: Step[] = [
		{
			number: 1,
			icon: "search",
			title: "Cari Barang Impian",
			description: "Browse atau search produk sesuai kategori yang kamu mau."
		},
		{
			number: 2,
			icon: "chat",
			title: "Chat dengan Seller",
			description: "Tanya detail, negosiasi harga, dan pastikan kondisi barang."
		},
		{
			number: 3,
			icon: "card",
			title: "Checkout & Bayar",
			description: "Pilih metode pembayaran yang paling nyaman untukmu."
		},
		{
			number: 4,
			icon: "package",
			title: "Terima Barang",
			description: "Tunggu pengiriman dan konfirmasi jika barang sudah sampai."
		}
	];

	let activeTab = $state<UserType>("seller");
	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	$effect(() => {
		if (activeTab) {
			isVisible = false;
			setTimeout(() => (isVisible = true), 100);
		}
	});

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

	function setActiveTab(tab: UserType) {
		activeTab = tab;
	}

	const steps = $derived(activeTab === "seller" ? sellerSteps : buyerSteps);
</script>

<section
	id="how-it-works"
	class="py-20 relative overflow-hidden bg-dark-deep"
	bind:this={sectionRef}
>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div
			class="text-center mb-16 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<h2 class="text-4xl lg:text-6xl font-black text-white tracking-tighter">
				Bagaimana <span class="gradient-text">Okis GS</span> Bekerja?
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Langkah-langkah mudah untuk mulai berjualan atau berbelanja barang berkualitas.
			</p>
		</div>

		<!-- Professional Tab Toggle -->
		<div
			class="flex justify-center mb-20"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
			style="transition-delay: 0.1s"
		>
			<div class="inline-flex glass-light p-2 rounded-4xl border border-white/10 relative">
				<button
					class="relative z-10 px-10 py-4 rounded-3xl flex items-center gap-3 font-bold text-lg transition-all duration-500 {activeTab ===
					'seller'
						? 'text-white'
						: 'text-slate-400 hover:text-white'}"
					onclick={() => setActiveTab("seller")}
				>
					<Icon name="store" size={20} ariaLabel="Seller" /> Untuk Seller
				</button>
				<button
					class="relative z-10 px-10 py-4 rounded-3xl flex items-center gap-3 font-bold text-lg transition-all duration-500 {activeTab ===
					'buyer'
						? 'text-white'
						: 'text-slate-400 hover:text-white'}"
					onclick={() => setActiveTab("buyer")}
				>
					<Icon name="cart" size={20} ariaLabel="Buyer" /> Untuk Buyer
				</button>

				<!-- Background slider -->
				<div
					class="absolute top-2 bottom-2 rounded-3xl bg-linear-to-r from-primary to-secondary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl shadow-primary/30"
					style="left: {activeTab === 'seller'
						? '0.5rem'
						: 'calc(50% + 0.1rem)'}; width: calc(50% - 0.6rem)"
				></div>
			</div>
		</div>

		<!-- Steps Visualization -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
			{#each steps as step, index (step.title)}
				<div
					class="glass rounded-[2.5rem] p-10 text-center border border-white/5 hover:border-primary/40 relative group transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10"
					class:opacity-0={!isVisible}
					class:translate-y-10={!isVisible}
					style="transition-delay: {index * 0.15}s"
				>
					<!-- Step Number Indicator -->
					<div
						class="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center font-black text-white text-lg shadow-xl shadow-primary/40 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"
					>
						{step.number}
					</div>

					<div
						class="text-6xl mb-8 transform group-hover:scale-125 transition-all duration-500 filter drop-shadow-2xl"
					>
						<Icon name={step.icon} size={36} ariaLabel={step.title} />
					</div>

					<h3
						class="text-2xl font-black text-white mb-4 group-hover:text-primary-light transition-colors"
					>
						{step.title}
					</h3>
					<p
						class="text-slate-300 text-base leading-relaxed group-hover:text-white transition-colors duration-500"
					>
						{step.description}
					</p>

					{#if index < steps.length - 1}
						<div
							class="hidden lg:block absolute top-1/2 -right-6 w-12 text-primary/20 transform -translate-y-1/2 group-hover:scale-x-125 group-hover:text-primary/50 transition-all duration-500 z-0"
						>
							<svg
								class="w-10 h-10"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="M13 7l5 5-5 5M6 7l5 5-5 5"
								/></svg
							>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Premium CTA -->
		<div
			class="mt-24 text-center"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition-delay: 0.6s"
		>
			{#if activeTab === "seller"}
				<a href="#newsletter" class="btn btn-primary px-12 py-5 text-xl group">
					<Icon
						name="rocket"
						size={20}
						ariaLabel="Mulai jualan"
						className="group-hover:rotate-12 transition-transform"
					/>
					Mulai Jualan Sekarang
					<svg
						class="w-6 h-6 group-hover:translate-x-1 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/></svg
					>
				</a>
			{:else}
				<a href={resolve("/products")} class="btn btn-primary px-12 py-5 text-xl group">
					<Icon
						name="target"
						size={20}
						ariaLabel="Jelajahi produk"
						className="group-hover:scale-125 transition-transform"
					/>
					Jelajahi Produk Pilihan
					<svg
						class="w-6 h-6 group-hover:translate-x-1 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/></svg
					>
				</a>
			{/if}
		</div>
	</div>
</section>
