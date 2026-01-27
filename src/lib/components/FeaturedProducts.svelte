<script lang="ts">
    import { onMount } from "svelte";

    interface Product {
        id: number;
        image: string;
        title: string;
        price: number;
        originalPrice: number;
        condition: "Baru" | "Seperti Baru" | "Bekas";
        seller: string;
        location: string;
        rating: number;
    }

    const products: Product[] = [
        {
            id: 1,
            image: "👗",
            title: "Zara Floral Dress Original",
            price: 250000,
            originalPrice: 899000,
            condition: "Seperti Baru",
            seller: "FashionTrust",
            location: "Jakarta",
            rating: 4.9,
        },
        {
            id: 2,
            image: "📱",
            title: "iPhone 13 Pro 256GB",
            price: 9500000,
            originalPrice: 16999000,
            condition: "Bekas",
            seller: "GadgetKing",
            location: "Bandung",
            rating: 4.8,
        },
        {
            id: 3,
            image: "👟",
            title: "Nike Air Jordan 1 Low",
            price: 1200000,
            originalPrice: 2499000,
            condition: "Seperti Baru",
            seller: "SneakerHead",
            location: "Surabaya",
            rating: 5.0,
        },
        {
            id: 4,
            image: "💻",
            title: "MacBook Air M1 2020",
            price: 8500000,
            originalPrice: 14999000,
            condition: "Bekas",
            seller: "TechMaster",
            location: "Jakarta",
            rating: 4.7,
        },
        {
            id: 5,
            image: "👜",
            title: "Coach Tote Bag Authentic",
            price: 1800000,
            originalPrice: 4500000,
            condition: "Seperti Baru",
            seller: "LuxBags",
            location: "Medan",
            rating: 4.9,
        },
        {
            id: 6,
            image: "🎮",
            title: "PlayStation 5 + 2 Game",
            price: 6500000,
            originalPrice: 9999000,
            condition: "Bekas",
            seller: "GameZone",
            location: "Yogyakarta",
            rating: 4.8,
        },
        {
            id: 7,
            image: "📚",
            title: "Koleksi Novel Tere Liye",
            price: 350000,
            originalPrice: 750000,
            condition: "Seperti Baru",
            seller: "BookLover",
            location: "Semarang",
            rating: 4.6,
        },
        {
            id: 8,
            image: "⌚",
            title: "Apple Watch Series 7",
            price: 3200000,
            originalPrice: 5999000,
            condition: "Bekas",
            seller: "WatchStore",
            location: "Bali",
            rating: 4.9,
        },
    ];

    let isVisible = $state(false);
    let sectionRef: HTMLElement;

    function formatPrice(price: number): string {
        return new Intl.NumberFormat("id-ID").format(price);
    }

    function getDiscount(price: number, originalPrice: number): number {
        return Math.round((1 - price / originalPrice) * 100);
    }

    function getConditionColor(condition: string): string {
        switch (condition) {
            case "Baru":
                return "#10B981";
            case "Seperti Baru":
                return "#7C3AED";
            default:
                return "#F97316";
        }
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible = true;
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef) {
            observer.observe(sectionRef);
        }

        return () => observer.disconnect();
    });
</script>

<section
    id="products"
    class="py-16 relative overflow-hidden bg-dark-deep"
    bind:this={sectionRef}
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise opacity-30 pointer-events-none"></div>
        <div
            class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2"
        ></div>
        <div
            class="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div
            class="text-center mb-12 space-y-3"
            class:opacity-0={!isVisible}
            class:translate-y-10={!isVisible}
            class:transition-all={true}
            class:duration-1000={true}
        >
            <h2
                class="text-3xl lg:text-5xl font-black text-white tracking-tighter"
            >
                Produk <span class="gradient-text">Unggulan</span>
            </h2>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto">
                Koleksi barang preloved pilihan dengan kualitas terjamin dan
                harga yang tak tertandingi.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each products as product, index}
                <div
                    class="glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-700 hover:-translate-y-3 group hover:shadow-2xl hover:shadow-primary/10 relative"
                    class:opacity-0={!isVisible}
                    class:translate-y-10={!isVisible}
                    style="transition-delay: {index * 0.1}s"
                >
                    <!-- Discount Badge -->
                    <div class="absolute top-6 left-6 z-20">
                        <div
                            class="bg-gradient-to-br from-rose-500 to-pink-600 text-white text-sm font-black px-4 py-2 rounded-xl shadow-lg shadow-rose-500/30"
                        >
                            -{getDiscount(
                                product.price,
                                product.originalPrice,
                            )}%
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Add to wishlist"
                        class="absolute top-6 right-6 z-20 w-12 h-12 rounded-xl glass-light border border-white/10 flex items-center justify-center text-white hover:bg-rose-500 hover:border-rose-500 hover:scale-110 active:scale-95 transition-all duration-300 group/wish"
                    >
                        <svg
                            class="w-6 h-6 group-hover/wish:fill-current"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2.5"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>

                    <!-- Product Image Area -->
                    <div
                        class="relative h-64 bg-white/5 flex items-center justify-center overflow-hidden"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none"
                        ></div>
                        <span
                            class="text-7xl drop-shadow-2xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-700"
                        >
                            {product.image}
                        </span>

                        <!-- Condition Badge -->
                        <div class="absolute bottom-4 left-6">
                            <span
                                class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-xl"
                                style="background: {getConditionColor(
                                    product.condition,
                                )}"
                            >
                                {product.condition}
                            </span>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="p-8">
                        <h3
                            class="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-light transition-colors"
                        >
                            {product.title}
                        </h3>

                        <div class="mb-6 flex flex-col gap-1">
                            <span
                                class="text-3xl font-black text-white tracking-tight"
                            >
                                Rp {formatPrice(product.price)}
                            </span>
                            <span
                                class="text-sm text-slate-400 line-through decoration-rose-500/50 decoration-2"
                            >
                                Rp {formatPrice(product.originalPrice)}
                            </span>
                        </div>

                        <div
                            class="flex items-center justify-between pt-6 border-t border-white/5 gap-4"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xl shadow-lg"
                                >
                                    👤
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-sm font-bold text-white truncate max-w-[100px]"
                                        >{product.seller}</span
                                    >
                                    <div
                                        class="flex items-center text-xs text-slate-400 gap-1"
                                    >
                                        <svg
                                            class="w-3 h-3 text-secondary"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            ><path
                                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                            /></svg
                                        >
                                        <span class="font-bold"
                                            >{product.rating}</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >
                                <svg
                                    class="w-4 h-4 text-primary-light"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    ><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2.5"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    /><path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2.5"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    /></svg
                                >
                                {product.location}
                            </div>
                        </div>

                        <!-- Buy Button Hover -->
                        <button
                            class="mt-8 w-full btn btn-primary py-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl shadow-primary/20"
                        >
                            🛒 Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            {/each}
        </div>

        <div
            class="mt-20 text-center"
            class:opacity-0={!isVisible}
            class:translate-y-10={!isVisible}
            style="transition-delay: 0.8s"
        >
            <a
                href="#newsletter"
                class="btn btn-secondary px-12 py-5 text-xl font-bold group"
            >
                Jelajahi Semua Produk
                <svg
                    class="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </a>
        </div>
    </div>
</section>

<style>
    /* Gradient text is already defined in app.css, but we can refine it if needed */
    .gradient-text {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
</style>
