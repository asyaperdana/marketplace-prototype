<script lang="ts">
	import Logo from "$lib/components/ui/Logo.svelte";
	import { Navbar, Footer } from "$lib/components/layout";

	const concepts = [
		{
			id: "loop",
			name: "The Digital Loop",
			desc: "Connectivity & Circular Economy. Soft, infinite, community-focused.",
			bg: "bg-dark"
		},
		{
			id: "prism",
			name: "The Prism Bag",
			desc: "Commerce Evolved. Premium, sharp, valuable.",
			bg: "bg-dark-deep"
		},
		{
			id: "monogram",
			name: "GS Monogram",
			desc: "Authority & Trust. Established, secure, bold.",
			bg: "bg-slate-900"
		}
	] as const;
</script>

<div class="min-h-screen bg-black text-white p-10 pt-32">
	<Navbar />

	<div class="container mx-auto max-w-6xl">
		<h1 class="text-5xl font-black mb-4 gradient-text text-center">Brand Identity Concepts</h1>
		<p class="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
			Comparing 3 distinct visual directions for the Okis GS rebrand.
		</p>

		<div class="grid md:grid-cols-3 gap-8">
			{#each concepts as concept (concept.id)}
				<div
					class="rounded-3xl border border-white/10 overflow-hidden bg-white/5 hover:border-primary/50 transition-all duration-500 group"
				>
					<!-- Visual Preview Area -->
					<div
						class="aspect-square flex flex-col items-center justify-center gap-8 relative overflow-hidden bg-linear-to-b from-white/5 to-transparent p-10"
					>
						<!-- Background Glow -->
						<div
							class="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
						></div>

						<!-- Large Logo -->
						<Logo variant={concept.id} size="xl" />

						<!-- Size Ladder -->
						<div class="flex items-center gap-4 opacity-50">
							<Logo variant={concept.id} size="lg" />
							<Logo variant={concept.id} size="md" />
							<Logo variant={concept.id} size="sm" />
						</div>
					</div>

					<!-- Description -->
					<div class="p-8 border-t border-white/5">
						<h3 class="text-2xl font-bold mb-2">{concept.name}</h3>
						<p class="text-slate-400 text-sm leading-relaxed">{concept.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<Footer />
</div>
