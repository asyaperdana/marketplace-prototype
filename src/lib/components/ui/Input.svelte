<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		type?: "text" | "email" | "password" | "number" | "tel" | "search" | "url";
		name?: string;
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		error?: string;
		label?: string;
		hint?: string;
		class?: string;
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		type = "text",
		name = "",
		placeholder = "",
		value = $bindable(""),
		disabled = false,
		required = false,
		error = "",
		label = "",
		hint = "",
		class: className = "",
		oninput,
		onchange
	}: Props = $props();

	const inputId = `input-${name || crypto.randomUUID()}`;
</script>

<div class="w-full">
	{#if label}
		<label for={inputId} class="block text-sm font-medium text-slate-700 mb-1.5">
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}

	<input
		id={inputId}
		{type}
		{name}
		{placeholder}
		{disabled}
		{required}
		bind:value
		{oninput}
		{onchange}
		class={cn(
			"w-full px-4 py-2.5 rounded-xl border transition-all duration-200",
			"text-slate-900 placeholder:text-slate-400",
			"focus:outline-none focus:ring-2 focus:ring-offset-0",
			error
				? "border-red-300 focus:border-red-500 focus:ring-red-200"
				: "border-slate-200 focus:border-teal-500 focus:ring-teal-200",
			disabled && "bg-slate-50 cursor-not-allowed",
			className
		)}
	/>

	{#if error}
		<p class="mt-1.5 text-sm text-red-500">{error}</p>
	{:else if hint}
		<p class="mt-1.5 text-sm text-slate-500">{hint}</p>
	{/if}
</div>
