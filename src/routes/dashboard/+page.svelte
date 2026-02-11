<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$lib/utils";
	import { authUser, isLoggedIn, authLoading } from "$lib/stores/auth";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	interface Stat {
		label: string;
		value: string;
		icon: IconName;
		color: string;
		bg: string;
	}

	onMount(() => {
		// Simple client-side protection
		// In a real app, use hooks.server.ts for better protection
		if (!$authLoading && !$isLoggedIn) {
			goto(resolve("/login"));
		}
	});

	$effect(() => {
		if (!$authLoading && !$isLoggedIn) {
			goto(resolve("/login"));
		}
	});

	const stats: Stat[] = [
		{
			label: "Total Penjualan",
			value: "Rp 0",
			icon: "wallet",
			color: "text-emerald-400",
			bg: "bg-emerald-400/10"
		},
		{
			label: "Barang Aktif",
			value: "0",
			icon: "box",
			color: "text-blue-400",
			bg: "bg-blue-400/10"
		},
		{
			label: "Rating Toko",
			value: "0.0",
			icon: "star",
			color: "text-yellow-400",
			bg: "bg-yellow-400/10"
		}
	];
</script>

<svelte:head>
	<title>Dashboard | Okis Garage Sale</title>
</svelte:head>

<div class="min-h-screen bg-dark-deep pt-24 pb-12 px-6">
	<div class="container mx-auto max-w-5xl">
		<!-- Welcome Header -->
		<div
			class="glass p-8 rounded-3xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6"
		>
			<div class="flex items-center gap-4">
				<div class="w-16 h-16 rounded-full bg-linear-to-br from-primary to-secondary p-0.5">
					<div
						class="w-full h-full rounded-full bg-dark-deep flex items-center justify-center overflow-hidden"
					>
						{#if $authUser?.avatarUrl}
							<img
								src={$authUser.avatarUrl}
								alt="Profile"
								class="w-full h-full object-cover"
							/>
						{:else}
							<Icon name="user" size={32} className="text-slate-400" />
						{/if}
					</div>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white">
						Halo, {$authUser?.name || $authUser?.email || "User"}! 👋
					</h1>
					<p class="text-slate-400">Selamat datang di dashboard kamu.</p>
				</div>
			</div>

			<div class="flex gap-3">
				<button
					class="btn btn-secondary border border-white/10 text-white hover:bg-white/5"
				>
					<Icon name="settings" size={18} className="mr-2" />
					Setting
				</button>
				<button class="btn btn-primary shadow-lg shadow-primary/20">
					<Icon name="plus" size={18} className="mr-2" />
					Jual Barang
				</button>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			{#each stats as stat (stat.label)}
				<div
					class="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
				>
					<div class="flex items-start justify-between mb-4">
						<div class="p-3 rounded-xl {stat.bg} {stat.color}">
							<Icon name={stat.icon} size={24} />
						</div>
						<span
							class="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-slate-400"
							>Bulan Ini</span
						>
					</div>
					<h3 class="text-3xl font-black text-white mb-1">{stat.value}</h3>
					<p class="text-slate-400 text-sm">{stat.label}</p>
				</div>
			{/each}
		</div>

		<!-- Empty State (Placeholder) -->
		<div
			class="glass p-12 rounded-3xl border border-white/5 text-center flex flex-col items-center"
		>
			<div
				class="w-20 h-20 rounded-full bg-dark-lighter flex items-center justify-center mb-6"
			>
				<Icon name="box" size={32} className="text-slate-600" />
			</div>
			<h2 class="text-xl font-bold text-white mb-2">Belum ada aktivitas</h2>
			<p class="text-slate-400 max-w-md mb-8">
				Kamu belum memiliki barang yang dijual atau transaksi apapun. Yuk mulai jual barang
				preloved kamu sekarang!
			</p>
			<button
				class="btn btn-primary px-8 py-3 shadow-lg shadow-primary/20 hover:shadow-primary/40"
			>
				Mulai Jual Barang
			</button>
		</div>
	</div>
</div>
