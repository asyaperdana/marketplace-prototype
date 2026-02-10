<script lang="ts">
	import { resolve, cn } from "$lib/utils";
	import { resetPassword, authLoading, authError } from "$lib/stores/auth";
	import Icon from "$lib/components/ui/Icon.svelte";

	let email = $state("");
	let isLoading = $state(false);
	let successMessage = $state<string | null>(null);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email) return;

		isLoading = true;
		successMessage = null;

		const result = await resetPassword(email);
		isLoading = false;

		if (result.success) {
			successMessage = "Silahkan cek email kamu untuk instruksi reset password.";
			email = "";
		}
	}
</script>

<svelte:head>
	<title>Lupa Password | Okis Garage Sale</title>
</svelte:head>

<div class="glass p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
	<div class="text-center mb-8">
		<h1 class="text-3xl font-black text-white mb-2">Lupa Password? 🔒</h1>
		<p class="text-slate-400">Masukkan email kamu untuk reset password.</p>
	</div>

	{#if $authError}
		<div
			class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
		>
			<Icon name="alert-circle" size={18} class="mt-0.5 shrink-0" />
			<span>{$authError}</span>
		</div>
	{/if}

	{#if successMessage}
		<div
			class="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-3"
		>
			<Icon name="check-circle" size={18} class="mt-0.5 shrink-0" />
			<span>{successMessage}</span>
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
					<span>Kirim Reset Link</span>
					<Icon name="arrow-right" size={18} />
				{/if}
			</span>
		</button>
	</form>

	<div class="mt-8 pt-8 border-t border-white/5 text-center">
		<a
			href={resolve("/login")}
			class="text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2"
		>
			<Icon name="arrow-left" size={16} />
			<span>Kembali ke Login</span>
		</a>
	</div>
</div>
