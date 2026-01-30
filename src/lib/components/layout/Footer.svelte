<script lang="ts">
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		company: [
			{ label: "Tentang Kami", href: "#" },
			{ label: "Karir", href: "#" },
			{ label: "Blog", href: "#" },
			{ label: "Press", href: "#" }
		],
		support: [
			{ label: "Pusat Bantuan", href: "#" },
			{ label: "Keamanan", href: "#" },
			{ label: "Panduan Seller", href: "#" },
			{ label: "Panduan Buyer", href: "#" }
		],
		legal: [
			{ label: "Syarat & Ketentuan", href: "#" },
			{ label: "Kebijakan Privasi", href: "#" },
			{ label: "Kebijakan Cookie", href: "#" }
		]
	};

	const socialLinks = [
		{ icon: "📘", label: "Facebook", href: "#" },
		{ icon: "📸", label: "Instagram", href: "#" },
		{ icon: "🐦", label: "Twitter", href: "#" },
		{ icon: "📺", label: "YouTube", href: "#" }
	];
</script>

<footer class="bg-dark-deep pt-20 pb-12 border-t border-white/5 relative overflow-hidden">
	<!-- Premium Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none"
		></div>
		<div
			class="absolute -bottom-48 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
			<!-- Brand & Mission -->
			<div class="lg:col-span-4 max-w-sm">
				<a href="#hero" class="flex items-center gap-3 mb-8 group">
					<div
						class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300"
					>
						🛍️
					</div>
					<span class="text-3xl font-black tracking-tighter text-white">
						OKIS <span class="text-primary-light">GS</span>
					</span>
				</a>
				<p class="text-slate-300 text-lg leading-relaxed mb-8 font-medium">
					Platform marketplace preloved nomor satu di Indonesia. Kami mendukung gaya hidup
					berkelanjutan dengan cara yang stylish dan menguntungkan.
				</p>
				<div class="flex gap-4">
					{#each socialLinks as social}
						<a
							href={social.href}
							class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30"
							aria-label={social.label}
						>
							<span class="text-xl">{social.icon}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation Links -->
			<div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
				<div class="flex flex-col gap-8">
					<h4 class="text-white text-lg font-black uppercase tracking-widest text-xs">
						Perusahaan
					</h4>
					<ul class="flex flex-col gap-4">
						{#each footerLinks.company as link}
							<li>
								<a
									href={link.href}
									class="text-slate-400 hover:text-primary-light text-base font-bold transition-all hover:translate-x-1 inline-block"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex flex-col gap-8">
					<h4 class="text-white text-lg font-black uppercase tracking-widest text-xs">
						Bantuan
					</h4>
					<ul class="flex flex-col gap-4">
						{#each footerLinks.support as link}
							<li>
								<a
									href={link.href}
									class="text-slate-400 hover:text-primary-light text-base font-bold transition-all hover:translate-x-1 inline-block"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex flex-col gap-8 col-span-2 md:col-span-1">
					<h4 class="text-white text-lg font-black uppercase tracking-widest text-xs">
						Legal
					</h4>
					<ul class="flex flex-col gap-4">
						{#each footerLinks.legal as link}
							<li>
								<a
									href={link.href}
									class="text-slate-400 hover:text-primary-light text-base font-bold transition-all hover:translate-x-1 inline-block"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<div
			class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
		>
			<div class="flex flex-col items-center md:items-start gap-2">
				<p class="text-slate-400 font-bold text-sm">
					© {currentYear} Okis Garage Sale. Seluruh hak cipta dilindungi.
				</p>
				<p class="text-xs text-slate-500 font-medium">
					Digitalizing Indonesia's preloved market since 2024.
				</p>
			</div>

			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2 text-slate-400 font-bold text-sm">
					Made with <span class="text-rose-500 animate-pulse text-lg">❤</span> in Indonesia
				</div>
				<div class="h-6 w-px bg-white/10 hidden md:block"></div>
				<div class="flex gap-4">
					<div
						class="w-8 h-5 bg-white/5 rounded border border-white/10 opacity-50 flex items-center justify-center text-[10px] font-bold text-white"
					>
						VISA
					</div>
					<div
						class="w-8 h-5 bg-white/5 rounded border border-white/10 opacity-50 flex items-center justify-center text-[10px] font-bold text-white"
					>
						MC
					</div>
					<div
						class="w-8 h-5 bg-white/5 rounded border border-white/10 opacity-50 flex items-center justify-center text-[10px] font-bold text-white"
					>
						QRIS
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
