<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve, cn } from "$lib/utils";
	import { signIn, authLoading, authError } from "$lib/stores/auth";
	import Icon from "$lib/components/ui/Icon.svelte";

	let email = $state("");
	let password = $state("");
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || !password) return;

		isLoading = true;
		const result = await signIn(email, password);
		isLoading = false;

		if (result.success) {
			goto(resolve("/dashboard"));
		}
	}
</script>

<svelte:head>
	<title>Masuk | Okis Garage Sale</title>
</svelte:head>

<div class="glass p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
	<div class="text-center mb-8">
		<h1 class="text-3xl font-black text-white mb-2">Selamat Datang Kembali! 👋</h1>
		<p class="text-slate-400">Masuk untuk mulai berjualan atau belanja.</p>
	</div>

	{#if $authError}
		<div
			class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
		>
			<Icon name="alert-circle" size={18} class="mt-0.5 shrink-0" />
			<span>{$authError}</span>
		</div>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-5">
		<div class="space-y-2">
			<label for="email" class="text-sm font-medium text-slate-300 ml-1">Email</label>
			<div class="relative group">
				<div
					class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors"
				>
					<Icon name="mail" size={18} />
				</div>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					placeholder="nama@email.com"
					class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-lighter/50 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden transition-all"
				/>
			</div>
		</div>

		<div class="space-y-2">
			<div class="flex items-center justify-between ml-1">
				<label for="password" class="text-sm font-medium text-slate-300">Password</label>
				<a
					href={resolve("/forgot-password")}
					class="text-xs text-primary hover:text-primary-light transition-colors"
					>Lupa Password?</a
				>
			</div>
			<div class="relative group">
				<div
					class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors"
				>
					<Icon name="lock" size={18} />
				</div>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					placeholder="••••••••"
					class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-lighter/50 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden transition-all"
				/>
			</div>
		</div>

		<button
			type="submit"
			disabled={isLoading || $authLoading}
			class={cn(
				"w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 relative overflow-hidden group",
				isLoading || $authLoading
					? "bg-slate-700 cursor-not-allowed opacity-70"
					: "bg-linear-to-r from-primary to-secondary hover:scale-[1.02] hover:shadow-primary/40"
			)}
		>
			<span class="relative z-10 flex items-center justify-center gap-2">
				{#if isLoading || $authLoading}
					<div
						class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
					></div>
					<span>Memproses...</span>
				{:else}
					<span>Masuk Sekarang</span>
					<Icon name="arrow-right" size={18} />
				{/if}
			</span>
		</button>
	</form>

	<div class="mt-8 pt-8 border-t border-white/5 text-center">
		<p class="text-slate-400">
			Belum punya akun?
			<a
				href={resolve("/register")}
				class="text-primary font-bold hover:text-primary-light transition-colors ml-1"
				>Daftar disini</a
			>
		</p>
	</div>
</div>
