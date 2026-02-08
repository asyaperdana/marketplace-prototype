<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	interface Transaction {
		id: number;
		user: string;
		initials: string;
		action: "beli" | "jual";
		product: string;
		productIcon: IconName;
		price: string;
		time: string;
		location: string;
	}

	interface LiveStat {
		label: string;
		value: number;
		suffix: string;
		icon: IconName;
		color: string;
	}

	interface TrustLogo {
		name: string;
		icon: IconName;
	}

	const recentTransactions: Transaction[] = [
		{
			id: 1,
			user: "Sarah W.",
			initials: "SW",
			action: "beli",
			product: "iPhone 13 Pro",
			productIcon: "phone",
			price: "Rp 9.5jt",
			time: "Baru saja",
			location: "Jakarta"
		},
		{
			id: 2,
			user: "Budi S.",
			initials: "BS",
			action: "jual",
			product: "MacBook Air M1",
			productIcon: "laptop",
			price: "Rp 8.5jt",
			time: "2 menit lalu",
			location: "Bandung"
		},
		{
			id: 3,
			user: "Anisa P.",
			initials: "AP",
			action: "beli",
			product: "Nike Air Jordan",
			productIcon: "shoe",
			price: "Rp 1.2jt",
			time: "5 menit lalu",
			location: "Surabaya"
		},
		{
			id: 4,
			user: "Rizky M.",
			initials: "RM",
			action: "jual",
			product: "PS5 + 3 Games",
			productIcon: "gamepad",
			price: "Rp 6.5jt",
			time: "8 menit lalu",
			location: "Yogyakarta"
		},
		{
			id: 5,
			user: "Dewi L.",
			initials: "DL",
			action: "beli",
			product: "Coach Tote Bag",
			productIcon: "bag",
			price: "Rp 1.8jt",
			time: "12 menit lalu",
			location: "Medan"
		}
	];

	const liveStats: LiveStat[] = [
		{
			label: "Transaksi Hari Ini",
			value: 8524,
			suffix: "+",
			icon: "bolt",
			color: "from-primary to-cyan-400"
		},
		{
			label: "Sedang Online",
			value: 1847,
			suffix: "",
			icon: "users",
			color: "from-emerald-400 to-green-500"
		},
		{
			label: "Produk Terjual/Jam",
			value: 342,
			suffix: "",
			icon: "cart",
			color: "from-secondary to-emerald-400"
		},
		{
			label: "Rating Hari Ini",
			value: 4.9,
			suffix: "★",
			icon: "star",
			color: "from-amber-400 to-orange-500"
		}
	];

	const trustLogos: TrustLogo[] = [
		{ name: "QRIS", icon: "qr" },
		{ name: "DANA", icon: "wallet" },
		{ name: "OVO", icon: "wallet" },
		{ name: "GoPay", icon: "wallet" },
		{ name: "JNE", icon: "package" },
		{ name: "J&T", icon: "truck" },
		{ name: "SiCepat", icon: "bolt" },
		{ name: "SSL", icon: "lock" }
	];

	let currentTransaction = $state(0);
	let animatedStats = $state(liveStats.map((s) => s.value)); // Direct values
	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 } // Lower threshold
		);

		if (sectionRef) observer.observe(sectionRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<section id="social-proof" class="relative py-16 lg:py-20 overflow-hidden" bind:this={sectionRef}>
	<!-- Background -->
	<div class="absolute inset-0 bg-dark-deep"></div>
	<!-- Heavy effects removed -->

	<div class="container mx-auto px-6 relative z-10">
		<!-- Header -->
		<div
			class="text-center mb-12"
			class:opacity-0={!isVisible}
			class:translate-y-4={!isVisible}
			style="transition: opacity 0.5s ease-out, transform 0.5s ease-out"
		>
			<div
				class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6"
			>
				<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
				<span class="text-xs sm:text-sm text-emerald-400 font-bold">LIVE SEKARANG</span>
			</div>
			<h2 class="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">
				Ribuan Transaksi <span class="gradient-text">Setiap Hari</span>
			</h2>
			<p class="text-lg text-slate-400 max-w-2xl mx-auto">
				Bergabung dengan komunitas jual-beli terbesar. Lihat aktivitas real-time di platform
				kami.
			</p>
		</div>

		<div
			class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
			class:opacity-0={!isVisible}
			class:translate-y-4={!isVisible}
			style="transition: opacity 0.5s ease-out, transform 0.5s ease-out; transition-delay: 0.1s"
		>
			{#each liveStats as stat, i (stat.label)}
				<div class="stat-card group p-4 sm:p-6">
					<div class="stat-icon bg-linear-to-br {stat.color}">
						<Icon name={stat.icon} size={20} ariaLabel={stat.label} />
					</div>
					<div class="mt-3 sm:mt-4">
						<div class="flex items-baseline gap-1">
							<span
								class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tabular-nums"
							>
								{animatedStats[i].toLocaleString()}
							</span>
							{#if stat.suffix}
								<span
									class="text-xl font-bold text-{stat.color
										.split(' ')[0]
										.replace('from-', '')}">{stat.suffix}</span
								>
							{/if}
						</div>
						<p class="text-sm text-slate-400 mt-1 font-medium">
							{stat.label}
						</p>
					</div>

					<!-- Live indicator for first two -->
					{#if i < 2}
						<div class="absolute top-4 right-4 flex items-center gap-1.5">
							<span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
							></span>
							<span class="text-[10px] text-emerald-400 font-bold uppercase"
								>Live</span
							>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div
			class="grid lg:grid-cols-5 gap-6"
			class:opacity-0={!isVisible}
			class:translate-y-4={!isVisible}
			style="transition: opacity 0.5s ease-out, transform 0.5s ease-out; transition-delay: 0.2s"
		>
			<!-- Live Transaction Feed - 3 cols -->
			<div class="lg:col-span-3 transaction-feed">
				<div class="flex items-center justify-between mb-6">
					<div class="flex items-center gap-3">
						<div
							class="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center"
						>
							<Icon name="bell" size={18} ariaLabel="Notifikasi" />
						</div>
						<div>
							<h3 class="font-bold text-white">Aktivitas Terkini</h3>
							<p class="text-xs text-slate-400">Transaksi dalam 24 jam terakhir</p>
						</div>
					</div>
					<div
						class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
					>
						<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
						<span class="text-xs text-emerald-400 font-bold">LIVE</span>
					</div>
				</div>

				<div class="space-y-3">
					{#each recentTransactions as tx, i (tx.id)}
						<div class="transaction-item" class:active={i === currentTransaction}>
							<div class="flex items-center gap-4">
								<div
									class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold tracking-widest text-white shrink-0"
								>
									{tx.initials}
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 flex-wrap">
										<span class="font-bold text-white">{tx.user}</span>
										<span class="text-slate-400">
											{tx.action === "beli" ? "membeli" : "menjual"}
										</span>
										<span class="text-primary-light">
											<Icon
												name={tx.productIcon}
												size={18}
												ariaLabel={tx.product}
											/>
										</span>
										<span class="font-semibold text-white truncate"
											>{tx.product}</span
										>
									</div>
									<div class="flex items-center gap-3 mt-1 text-sm">
										<span class="font-bold text-primary-light">{tx.price}</span>
										<span class="text-slate-500">•</span>
										<span class="text-slate-500">{tx.location}</span>
										<span class="text-slate-500">•</span>
										<span class="text-slate-500">{tx.time}</span>
									</div>
								</div>
								{#if tx.action === "beli"}
									<div
										class="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold shrink-0"
									>
										SOLD ✓
									</div>
								{:else}
									<div
										class="px-3 py-1.5 rounded-lg bg-primary/10 text-primary-light text-xs font-bold shrink-0"
									>
										LISTED
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Trust Badges - 2 cols -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Security Card -->
				<div class="trust-card">
					<div class="flex items-center gap-3 mb-4">
						<div
							class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"
						>
							<Icon name="shield" size={18} ariaLabel="Keamanan" />
						</div>
						<div>
							<h3 class="font-bold text-white">100% Aman</h3>
							<p class="text-xs text-slate-400">Transaksi terlindungi</p>
						</div>
					</div>
					<div class="grid grid-cols-4 gap-3">
						{#each trustLogos as logo (logo.name)}
							<div class="trust-logo">
								<Icon name={logo.icon} size={18} ariaLabel={logo.name} />
								<span class="text-[10px] text-slate-400 font-medium"
									>{logo.name}</span
								>
							</div>
						{/each}
					</div>
				</div>

				<!-- Guarantee Card -->
				<div class="guarantee-card">
					<div
						class="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl"
					></div>
					<div class="relative z-10">
						<div class="flex items-center gap-4 mb-4">
							<div
								class="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center"
							>
								<Icon name="check" size={28} ariaLabel="Garansi" />
							</div>
							<div>
								<h3 class="text-xl font-black text-white">Garansi</h3>
								<p class="text-lg font-bold gradient-text">Uang Kembali</p>
							</div>
						</div>
						<p class="text-slate-300 text-sm leading-relaxed">
							Barang tidak sesuai? Tidak masalah! Kami jamin refund 100% dalam 7 hari.
						</p>
						<div
							class="flex items-center gap-2 mt-4 text-primary-light font-bold text-sm"
						>
							<span>Pelajari lebih lanjut</span>
							<span>→</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.stat-card {
		position: relative;
		padding: 1.5rem;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1.5rem;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		overflow: hidden;
	}

	.stat-card::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1));
		opacity: 0;
		transition: opacity 0.4s;
	}

	.stat-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.stat-card:hover::before {
		opacity: 1;
	}

	.stat-icon {
		width: 3rem;
		height: 3rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 30px -10px rgba(14, 165, 233, 0.3);
	}

	.transaction-feed {
		padding: 1.5rem;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1.5rem;
	}

	.transaction-item {
		padding: 1rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid transparent;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.transaction-item.active {
		background: rgba(14, 165, 233, 0.05);
		border-color: rgba(14, 165, 233, 0.2);
		box-shadow: 0 0 30px -10px rgba(14, 165, 233, 0.3);
	}

	.trust-card {
		padding: 1.5rem;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1.5rem;
	}

	.trust-logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 0.75rem;
		transition: all 0.3s;
	}

	.trust-logo:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(14, 165, 233, 0.3);
		transform: translateY(-2px);
	}

	.guarantee-card {
		position: relative;
		padding: 1.5rem;
		background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
		border: 1px solid rgba(14, 165, 233, 0.2);
		border-radius: 1.5rem;
		overflow: hidden;
	}
</style>
