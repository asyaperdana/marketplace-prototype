<script lang="ts">
	import { Navbar, Footer, MobileBottomNav, ScrollProgress } from "$lib/components/layout";
	import LazySection from "$lib/components/ui/LazySection.svelte";
	import {
		Hero,
		SocialProof,
		Stats,
		ValueProps,
		HowItWorks,
		Categories,
		FeaturedProducts,
		TrustSecurity,
		FeatureComparison,
		Testimonials,
		FAQ,
		Newsletter
	} from "$lib/components/landing";
</script>

<svelte:head>
	<title>Okis Garage Sale - Marketplace Preloved #1 di Indonesia</title>
	<meta
		name="description"
		content="Platform jual-beli barang preloved terpercaya. Temukan fashion, elektronik, dan berbagai barang second berkualitas dengan harga terbaik. Sistem escrow aman, garansi uang kembali."
	/>
	<meta
		name="keywords"
		content="garage sale, preloved, second hand, marketplace, jual beli bekas, barang bekas, thrift"
	/>
	<meta property="og:title" content="Okis Garage Sale - Marketplace Preloved #1 di Indonesia" />
	<meta
		property="og:description"
		content="Platform jual-beli barang preloved terpercaya dengan sistem escrow aman dan garansi uang kembali."
	/>
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ScrollProgress />
<Navbar />
<main>
	<Hero />
	<SocialProof />

	<LazySection id="stats">
		<Stats />
	</LazySection>

	<LazySection>
		<ValueProps />
	</LazySection>

	<LazySection id="how-it-works">
		<HowItWorks />
	</LazySection>

	<LazySection id="categories">
		<Categories />
	</LazySection>

	<LazySection>
		<FeaturedProducts />
	</LazySection>

	<LazySection>
		<TrustSecurity />
	</LazySection>

	<LazySection>
		<FeatureComparison />
	</LazySection>

	<LazySection id="testimonials">
		<Testimonials />
	</LazySection>

	<LazySection>
		<FAQ />
	</LazySection>

	<LazySection id="newsletter">
		<Newsletter />
	</LazySection>
</main>
<Footer />
<MobileBottomNav />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(main) {
		padding-bottom: 5rem;
	}

	@media (min-width: 1024px) {
		:global(main) {
			padding-bottom: 0;
		}
	}
</style>
