<script lang="ts">
	import "../app.css";
	import { Navbar, Footer, MobileBottomNav, ScrollProgress } from "$lib/components/layout";
	import { Hero, SocialProof, Stats, ValueProps, HowItWorks } from "$lib/components/landing";

	// Lazy load below-the-fold components
	const CategoriesPromise = import("$lib/components/landing/Categories.svelte");
	const FeaturedProductsPromise = import("$lib/components/landing/FeaturedProducts.svelte");
	const TrustSecurityPromise = import("$lib/components/landing/TrustSecurity.svelte");
	const FeatureComparisonPromise = import("$lib/components/landing/FeatureComparison.svelte");
	const TestimonialsPromise = import("$lib/components/landing/Testimonials.svelte");
	const FAQPromise = import("$lib/components/landing/FAQ.svelte");
	const NewsletterPromise = import("$lib/components/landing/Newsletter.svelte");
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
	<Stats />
	<ValueProps />
	<HowItWorks />

	{#await CategoriesPromise then { default: Categories }}
		<Categories />
	{/await}

	{#await FeaturedProductsPromise then { default: FeaturedProducts }}
		<FeaturedProducts />
	{/await}

	{#await TrustSecurityPromise then { default: TrustSecurity }}
		<TrustSecurity />
	{/await}

	{#await FeatureComparisonPromise then { default: FeatureComparison }}
		<FeatureComparison />
	{/await}

	{#await TestimonialsPromise then { default: Testimonials }}
		<Testimonials />
	{/await}

	{#await FAQPromise then { default: FAQ }}
		<FAQ />
	{/await}

	{#await NewsletterPromise then { default: Newsletter }}
		<Newsletter />
	{/await}
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
