<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve, cn } from "$lib/utils";
	import { signUp, authLoading, authError } from "$lib/stores/auth";
	import Icon from "$lib/components/ui/Icon.svelte";

	let name = $state("");
	let email = $state("");
	let password = $state("");
	let confirmPassword = $state("");
	let isLoading = $state(false);
	let formError = $state<string | null>(null);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		formError = null;

		if (!name || !email || !password || !confirmPassword) {
			formError = "Semua kolom wajib diisi";
			return;
		}

		if (password !== confirmPassword) {
			formError = "Password tidak sama";
			return;
		}

		if (password.length < 6) {
			formError = "Password minimal 6 karakter";
			return;
		}

		isLoading = true;
		const result = await signUp(email, password, name);
		isLoading = false;

		if (result.success) {
			goto(resolve("/dashboard"));
		}
	}
</script>

<svelte:head>
	<title>Daftar Akun | Okis Garage Sale</title>
</svelte:head>

<div class="glass p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
	<div class="text-center mb-8">
		<h1 class="text-3xl font-black text-white mb-2">Gabung Komunitas! 🚀</h1>
		<p class="text-slate-400">Buat akun untuk mulai jual beli barang preloved.</p>
	</div>

	{#if $authError || formError}
		<div
			class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
		>
			<Icon name="alert-circle" size={18} class="mt-0.5 shrink-0" />
			<span>{$authError || formError}</span>
		</div>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-4">
		<div class="space-y-2">
			<label for="name" class="text-sm font-medium text-slate-300 ml-1">Nama Lengkap</label>
			<div class="relative group">
				<div
					class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors"
				>
					<Icon name="user" size={18} />
				</div>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					placeholder="Jhon Doe"
					class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-lighter/50 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden transition-all"
				/>
			</div>
		</div>

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

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="space-y-2">
				<label for="password" class="text-sm font-medium text-slate-300 ml-1"
					>Password</label
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
					>Konfirmasi</label
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
		</div>

		<div class="pt-2">
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
						<span>Membuat Akun...</span>
					{:else}
						<span>Daftar Sekarang</span>
						<Icon name="rocket" size={18} />
					{/if}
				</span>
			</button>
		</div>
	</form>

	<div class="mt-8 pt-8 border-t border-white/5 text-center">
		<p class="text-slate-400">
			Sudah punya akun?
			<a
				href={resolve("/login")}
				class="text-primary font-bold hover:text-primary-light transition-colors ml-1"
				>Masuk disini</a
			>
		</p>
	</div>
</div>
