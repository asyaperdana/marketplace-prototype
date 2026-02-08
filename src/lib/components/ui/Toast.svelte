<script lang="ts">
	import { toasts } from "$lib/stores";
	import { fly, fade } from "svelte/transition";
	import Icon from "./Icon.svelte";

	import type { IconName } from "$lib/types/icons";

	const iconMap: Record<string, IconName> = {
		success: "check",
		error: "x",
		warning: "alert",
		info: "bulb"
	};

	const colorMap = {
		success: "from-emerald-500/90 to-emerald-600/90 border-emerald-400/30",
		error: "from-rose-500/90 to-rose-600/90 border-rose-400/30",
		warning: "from-amber-500/90 to-amber-600/90 border-amber-400/30",
		info: "from-sky-500/90 to-sky-600/90 border-sky-400/30"
	} as const;
</script>

{#if $toasts.length > 0}
	<div class="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
		{#each $toasts as toast (toast.id)}
			<div
				in:fly={{ x: 100, duration: 300 }}
				out:fade={{ duration: 200 }}
				class="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl bg-linear-to-r {colorMap[
					toast.type
				]} backdrop-blur-xl border shadow-xl shadow-black/20 max-w-sm"
			>
				<div
					class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
				>
					<Icon name={iconMap[toast.type]} size={16} ariaLabel={toast.type} />
				</div>
				<p class="text-white font-medium text-sm flex-1">{toast.message}</p>
				<button
					onclick={() => toasts.remove(toast.id)}
					class="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
				>
					<Icon name="x" size={12} ariaLabel="Close" />
				</button>
			</div>
		{/each}
	</div>
{/if}
