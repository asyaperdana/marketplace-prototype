<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	interface ProtectionFeature {
		icon: IconName;
		title: string;
		description: string;
	}

	interface PaymentMethod {
		name: string;
		icon: IconName;
	}

	const protectionFeatures: ProtectionFeature[] = [
		{
			icon: "lock",
			title: "Sistem Escrow",
			description: "Dana pembeli aman hingga barang diterima. Tidak ada risiko penipuan."
		},
		{
			icon: "check",
			title: "Verifikasi Seller",
			description: "Setiap seller melewati proses verifikasi identitas ketat."
		},
		{
			icon: "cash",
			title: "Garansi Uang Kembali",
			description: "Refund 100% jika barang tidak sesuai deskripsi."
		},
		{
			icon: "shield",
			title: "Buyer Protection",
			description: "Perlindungan penuh untuk setiap transaksi di platform."
		},
		{
			icon: "chat",
			title: "Support 24/7",
			description: "Tim customer service siap membantu kapan saja."
		},
		{
			icon: "note",
			title: "Dispute Resolution",
			description: "Mediasi profesional untuk menyelesaikan masalah."
		}
	];

	const paymentMethods: PaymentMethod[] = [
		{ name: "QRIS", icon: "qr" },
		{ name: "Virtual Account", icon: "bank" },
		{ name: "Credit Card", icon: "card" },
		{ name: "DANA", icon: "wallet" },
		{ name: "OVO", icon: "wallet" },
		{ name: "GoPay", icon: "wallet" },
		{ name: "ShopeePay", icon: "wallet" },
		{ name: "Transfer Bank", icon: "bank" }
	];

	const shippingPartners = [
		"JNE",
		"J&T Express",
		"SiCepat",
		"AnterAja",
		"Ninja Xpress",
		"Gosend",
		"GrabExpress",
		"Pos Indonesia"
	];

	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.15 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
</script>

<section
	id="trust-security"
	class="py-24 relative overflow-hidden bg-dark-deep"
	bind:this={sectionRef}
>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] translate-y-1/2 pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Header -->
		<div
			class="text-center mb-20 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1)"
		>
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/10 text-primary-light text-xs font-bold mb-4 tracking-widest uppercase"
			>
				<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
				100% Aman & Terpercaya
			</div>
			<h2 class="text-4xl lg:text-6xl font-black text-white tracking-tighter">
				Keamanan <span class="gradient-text">Terjamin</span>
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Kami melindungi setiap transaksi dengan sistem keamanan berlapis dan jaminan uang
				kembali.
			</p>
		</div>

		<!-- Escrow Diagram -->
		<div
			class="mb-20 glass rounded-[3rem] p-10 lg:p-16 border border-white/10"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.1s"
		>
			<h3 class="text-2xl font-black text-white text-center mb-12">
				Bagaimana Sistem Escrow Bekerja
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
				<div class="flex flex-col items-center text-center group">
					<div
						class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/20"
					>
						<Icon name="cart" size={28} ariaLabel="Checkout" />
					</div>
					<span class="font-bold text-white mb-1">1. Checkout</span>
					<span class="text-xs text-slate-400">Buyer bayar produk</span>
				</div>
				<div class="hidden md:flex items-center justify-center text-primary/50">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/></svg
					>
				</div>
				<div class="flex flex-col items-center text-center group">
					<div
						class="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/30 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-secondary/20"
					>
						<Icon name="lock" size={28} ariaLabel="Dana ditahan" />
					</div>
					<span class="font-bold text-white mb-1">2. Dana Ditahan</span>
					<span class="text-xs text-slate-400">Okis GS simpan aman</span>
				</div>
				<div class="hidden md:flex items-center justify-center text-primary/50">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/></svg
					>
				</div>
				<div class="flex flex-col items-center text-center group">
					<div
						class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/20"
					>
						<Icon name="wallet" size={28} ariaLabel="Dana diteruskan" />
					</div>
					<span class="font-bold text-white mb-1">3. Dana Diteruskan</span>
					<span class="text-xs text-slate-400">Setelah buyer konfirmasi</span>
				</div>
			</div>
		</div>

		<!-- Protection Features Grid -->
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.2s"
		>
			{#each protectionFeatures as feature, index (feature.title)}
				<div
					class="glass rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
					style="transition-delay: {index * 0.05}s"
				>
					<div
						class="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
					>
						<Icon name={feature.icon} size={32} ariaLabel={feature.title} />
					</div>
					<h4
						class="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors"
					>
						{feature.title}
					</h4>
					<p class="text-slate-400 leading-relaxed">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>

		<!-- Payment & Shipping -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Payment Methods -->
			<div
				class="glass rounded-2xl p-8 border border-white/5"
				class:opacity-0={!isVisible}
				class:translate-y-10={!isVisible}
				style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.3s"
			>
				<h4 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
					<Icon name="card" size={20} ariaLabel="Metode pembayaran" />
					<span>Metode Pembayaran</span>
				</h4>
				<div class="grid grid-cols-4 gap-3">
					{#each paymentMethods as method (method.name)}
						<div
							class="glass-light rounded-xl p-3 text-center hover:border-primary/30 border border-transparent transition-all group"
						>
							<div
								class="w-10 h-10 mx-auto mb-1 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform"
							>
								<Icon name={method.icon} size={18} ariaLabel={method.name} />
							</div>
							<div class="text-xs text-slate-400 font-medium">
								{method.name}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Shipping Partners -->
			<div
				class="glass rounded-2xl p-8 border border-white/5"
				class:opacity-0={!isVisible}
				class:translate-y-10={!isVisible}
				style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.4s"
			>
				<h4 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
					<Icon name="truck" size={20} ariaLabel="Partner pengiriman" />
					<span>Partner Pengiriman</span>
				</h4>
				<div class="flex flex-wrap gap-3">
					{#each shippingPartners as partner (partner)}
						<div
							class="px-4 py-2 glass-light rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-primary/30 border border-transparent transition-all"
						>
							{partner}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
