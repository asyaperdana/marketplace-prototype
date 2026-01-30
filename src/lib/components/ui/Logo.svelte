<script lang="ts">
	interface Props {
		variant?: "loop" | "prism" | "monogram";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		color?: "default" | "white" | "monochrome";
		class?: string;
	}

	let {
		variant = "loop",
		size = "md",
		color = "default",
		class: className = ""
	}: Props = $props();

	const sizes = {
		xs: "w-6 h-6", // 24px
		sm: "w-8 h-8", // 32px
		md: "w-10 h-10", // 40px
		lg: "w-16 h-16", // 64px
		xl: "w-24 h-24" // 96px
	};

	const colors = {
		default: "text-primary",
		white: "text-white",
		monochrome: "text-current"
	};
</script>

<div
	class="{sizes[size]} {colors[
		color
	]} {className} relative inline-flex items-center justify-center"
>
	<svg
		viewBox="0 0 100 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="w-full h-full drop-shadow-lg"
	>
		<defs>
			<linearGradient
				id="grad-primary"
				x1="0"
				y1="0"
				x2="100"
				y2="100"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stop-color="#34D399" />
				<stop offset="100%" stop-color="#06B6D4" />
			</linearGradient>
			<linearGradient
				id="grad-accent"
				x1="100"
				y1="0"
				x2="0"
				y2="100"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stop-color="#F59E0B" />
				<stop offset="100%" stop-color="#FBBF24" />
			</linearGradient>
			<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur stdDeviation="3" result="blur" />
				<feComposite in="SourceGraphic" in2="blur" operator="over" />
			</filter>
		</defs>

		{#if variant === "loop"}
			<!-- Concept 1: Digital Loop -->
			<path
				d="M50 15C30.67 15 15 30.67 15 50s15.67 35 35 35 35-15.67 35-35S69.33 15 50 15zm0 10c13.81 0 25 11.19 25 25S63.81 75 50 75 25 63.81 25 50s11.19-25 25-25z"
				fill="url(#grad-primary)"
				fill-opacity="0.2"
			/>
			<path
				d="M50 20c-16.54 0-30 13.46-30 30s13.46 30 30 30 30-13.46 30-30-13.46-30-30-30zm0 52c-12.15 0-22-9.85-22-22s9.85-22 22-22 22 9.85 22 22-9.85 22-22 22z"
				stroke="url(#grad-primary)"
				stroke-width="8"
				stroke-linecap="round"
			/>
			<!-- Infinity Mark inside -->
			<path
				d="M38 50c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6zm24 0c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"
				fill="white"
			/>
			<path
				d="M50 50l-6 6m6-6l6-6m-6 6l-6-6m6 6l6 6"
				stroke="white"
				stroke-width="4"
				stroke-linecap="round"
				class="opacity-0"
			/>
		{:else if variant === "prism"}
			<!-- Concept 2: Prism Bag -->
			<path
				d="M30 35 L50 20 L70 35 L70 75 C70 80.52 65.52 85 60 85 L40 85 C34.48 85 30 80.52 30 75 Z"
				fill="url(#grad-primary)"
			/>
			<!-- Facets -->
			<path
				d="M50 20 L50 50 M30 35 L50 50 L70 35 M30 75 L50 50 L70 75"
				stroke="rgba(255,255,255,0.4)"
				stroke-width="2"
			/>
			<!-- Handle -->
			<path
				d="M40 35 V25 A10 10 0 0 1 60 25 V35"
				stroke="url(#grad-accent)"
				stroke-width="6"
				stroke-linecap="round"
			/>
		{:else if variant === "monogram"}
			<!-- Concept 3: GS Monogram Shield -->
			<path
				d="M50 10 L85 25 V50 C85 75 50 90 50 90 C50 90 15 75 15 50 V25 L50 10 Z"
				fill="url(#grad-primary)"
			/>
			<!-- Abstract G and S -->
			<path
				d="M60 40 H45 V50 H55 V60 H40 M60 40 V35 H40 V65 H60"
				stroke="white"
				stroke-width="6"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
			/>
		{/if}
	</svg>
</div>
