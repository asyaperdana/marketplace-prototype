<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve, cn } from "$lib/utils";
	import { updatePassword } from "$lib/stores/auth";
	import Icon from "$lib/components/ui/Icon.svelte";

	let password = $state("");
	let confirmPassword = $state("");
	let isLoading = $state(false);
	let message = $state<string | null>(null);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (password !== confirmPassword) {
			message = "Password tidak sama";
			return;
		}

		isLoading = true;
		const result = await updatePassword(password);

		if (result.success) {
			message = "Password berhasil diubah!";
			setTimeout(() => goto(resolve("/dashboard")), 2000);
		} else {
			message = result.error ?? "Terjadi kesalahan";
		}

		isLoading = false;
	}
</script>

<svelte:head>
	<title>Reset Password | Okis Garage Sale</title>
</svelte:head>

<div class="glass p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
	<div class="text-center mb-8">
		<h1 class="text-3xl font-black text-white mb-2">Password Baru 🔑</h1>
		<p class="text-slate-400">Masukkan password baru untuk akun kamu.</p>
	</div>

	{#if message}
		<div
			class="mb-6 p-4 rounded-xl {message.includes('berhasil')
				? 'bg-green-500/10 border-green-500/20 text-green-400'
				: 'bg-red-500/10 border-red-500/20 text-red-400'} text-sm flex items-start gap-3"
		>
			<Icon
				name={message.includes("berhasil") ? "check-circle" : "alert-circle"}
				size={18}
				className="mt-0.5 shrink-0"
			/>
			<span>{message}</span>
		</div>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-4">
		<div class="space-y-2">
			<label for="password" class="text-sm font-medium text-slate-300 ml-1"
				>Password Baru</label
			>
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

		<div class="space-y-2">
			<label for="confirmPassword" class="text-sm font-medium text-slate-300 ml-1"
				>Konfirmasi Password</label
			>
			<div class="relative group">
				<div
					class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors"
				>
					<Icon name="check-circle" size={18} />
				</div>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					required
					placeholder="••••••••"
					class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-lighter/50 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden transition-all"
				/>
			</div>
		</div>

		<button
			type="submit"
			disabled={isLoading}
			class={cn(
				"w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 relative overflow-hidden group",
				isLoading
					? "bg-slate-700 cursor-not-allowed opacity-70"
					: "bg-linear-to-r from-primary to-secondary hover:scale-[1.02] hover:shadow-primary/40"
			)}
		>
			<span class="relative z-10 flex items-center justify-center gap-2">
				{#if isLoading}
					<div
						class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
					></div>
					<span>Menyimpan...</span>
				{:else}
					<span>Simpan Password</span>
					<Icon name="check" size={18} />
				{/if}
			</span>
		</button>
	</form>
</div>
