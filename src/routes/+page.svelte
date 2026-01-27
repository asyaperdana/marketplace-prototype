<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import SocialProof from "$lib/components/SocialProof.svelte";
    import Stats from "$lib/components/Stats.svelte";
    import ValueProps from "$lib/components/ValueProps.svelte";
    import HowItWorks from "$lib/components/HowItWorks.svelte";
    import Categories from "$lib/components/Categories.svelte";
    import FeaturedProducts from "$lib/components/FeaturedProducts.svelte";
    import TrustSecurity from "$lib/components/TrustSecurity.svelte";
    import FeatureComparison from "$lib/components/FeatureComparison.svelte";
    import Testimonials from "$lib/components/Testimonials.svelte";
    import FAQ from "$lib/components/FAQ.svelte";
    import Newsletter from "$lib/components/Newsletter.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ScrollProgress from "$lib/components/ScrollProgress.svelte";
    import MobileBottomNav from "$lib/components/MobileBottomNav.svelte";
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
    <meta
        property="og:title"
        content="Okis Garage Sale - Marketplace Preloved #1 di Indonesia"
    />
    <meta
        property="og:description"
        content="Platform jual-beli barang preloved terpercaya dengan sistem escrow aman dan garansi uang kembali."
    />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
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
    <Categories />
    <FeaturedProducts />
    <TrustSecurity />
    <FeatureComparison />
    <Testimonials />
    <FAQ />
    <Newsletter />
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
