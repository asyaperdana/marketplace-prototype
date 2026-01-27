<script lang="ts">
    import { onMount } from "svelte";

    interface Category {
        icon: string;
        name: string;
        count: string;
        class: string;
        delay: number;
    }

    const categories: Category[] = [
        {
            icon: "👗",
            name: "Fashion Wanita",
            count: "25K+ produk",
            class: "md:col-span-2 md:row-span-2",
            delay: 0,
        },
        {
            icon: "📱",
            name: "Elektronik",
            count: "15K+ produk",
            class: "md:col-span-2",
            delay: 0.1,
        },
        {
            icon: "👔",
            name: "Fashion Pria",
            count: "18K+ produk",
            class: "",
            delay: 0.2,
        },
        {
            icon: "🏠",
            name: "Peralatan Rumah",
            count: "12K+ produk",
            class: "",
            delay: 0.3,
        },
        {
            icon: "🎮",
            name: "Games & Toys",
            count: "7K+ produk",
            class: "md:col-span-2",
            delay: 0.4,
        },
        {
            icon: "📚",
            name: "Buku & Hobi",
            count: "10K+ produk",
            class: "",
            delay: 0.5,
        },
        {
            icon: "👶",
            name: "Perlengkapan Bayi",
            count: "8K+ produk",
            class: "",
            delay: 0.6,
        },
        {
            icon: "💄",
            name: "Kecantikan",
            count: "9K+ produk",
            class: "md:col-span-2",
            delay: 0.7,
        },
    ];

    let isVisible = $state(false);
    let sectionRef: HTMLElement;

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
    id="categories"
    class="py-20 relative overflow-hidden bg-dark-deep"
    bind:this={sectionRef}
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise opacity-30 pointer-events-none"></div>
        <div
            class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
        ></div>
        <div
            class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div
            class="text-center mb-20 space-y-4"
            class:opacity-0={!isVisible}
            class:translate-y-10={!isVisible}
            class:transition-all={true}
            class:duration-1000={true}
        >
            <h2
                class="text-4xl lg:text-6xl font-black text-white tracking-tighter"
            >
                Jelajahi <span class="gradient-text">Kategori</span>
            </h2>
            <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                Temukan barang impianmu dari berbagai kategori yang dikurasi
                khusus untuk memenuhi gaya hidupmu.
            </p>
        </div>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[220px]"
        >
            {#each categories as category, i}
                <button
                    class="group relative overflow-hidden rounded-[2rem] glass hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 text-left p-10 flex flex-col justify-end {category.class}"
                    class:opacity-0={!isVisible}
                    class:translate-y-10={!isVisible}
                    style="transition-delay: {category.delay}s"
                >
                    <!-- Hover Background Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                    ></div>
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30"
                    ></div>

                    <div
                        class="relative z-10 transition-transform duration-500 group-hover:-translate-y-2"
                    >
                        <span
                            class="text-5xl mb-6 block filter drop-shadow-2xl transform group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 origin-left"
                            >{category.icon}</span
                        >
                        <h3
                            class="text-2xl font-black text-white mb-2 group-hover:text-primary-light transition-colors"
                        >
                            {category.name}
                        </h3>
                        <p
                            class="text-base text-slate-300 font-bold tracking-wide uppercase text-xs group-hover:text-white transition-colors"
                        >
                            {category.count}
                        </p>
                    </div>

                    <!-- Decorative Arrow -->
                    <div
                        class="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
                    >
                        <div
                            class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 rotate-12 group-hover:rotate-0 transition-transform duration-500"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                    d="M13 7l5 5-5 5"
                                />
                            </svg>
                        </div>
                    </div>
                </button>
            {/each}
        </div>

        <div
            class="mt-20 text-center"
            class:opacity-0={!isVisible}
            class:translate-y-10={!isVisible}
            style="transition-delay: 0.8s"
        >
            <a
                href="#products"
                class="btn btn-secondary px-10 py-4 text-lg font-bold hover:scale-105 active:scale-95 group"
            >
                <span>Lihat Semua Koleksi</span>
                <svg
                    class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </a>
        </div>
    </div>
</section>
