<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import Stats from "$lib/components/Stats.svelte";
    import ValueProps from "$lib/components/ValueProps.svelte";
    import HowItWorks from "$lib/components/HowItWorks.svelte";
    import Categories from "$lib/components/Categories.svelte";
    import FeaturedProducts from "$lib/components/FeaturedProducts.svelte";
    import Testimonials from "$lib/components/Testimonials.svelte";
    import FAQ from "$lib/components/FAQ.svelte";
    import Newsletter from "$lib/components/Newsletter.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>Okis Garage Sale - Marketplace Preloved #1 di Indonesia</title>
    <meta
        name="description"
        content="Platform jual-beli barang preloved terpercaya. Temukan fashion, elektronik, dan berbagai barang second berkualitas dengan harga terbaik."
    />
    <meta
        name="keywords"
        content="garage sale, preloved, second hand, marketplace, jual beli bekas"
    />
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

<Navbar />
<main>
    <Hero />
    <Stats />
    <ValueProps />
    <HowItWorks />
    <Categories />
    <FeaturedProducts />
    <Testimonials />
    <FAQ />
    <Newsletter />
</main>
<Footer />

<style>
    :global(html) {
        scroll-behavior: smooth;
    }
</style>
