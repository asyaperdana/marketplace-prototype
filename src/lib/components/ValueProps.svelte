<script lang="ts">
    import { onMount } from "svelte";

    interface ValueProp {
        icon: string;
        title: string;
        description: string;
        color: string;
    }

    const valueProps: ValueProp[] = [
        {
            icon: "🔒",
            title: "Transaksi Aman",
            description:
                "Pembayaran dijamin aman dengan sistem escrow dan verifikasi seller yang ketat.",
            color: "var(--color-primary)",
        },
        {
            icon: "💰",
            title: "Harga Terjangkau",
            description:
                "Temukan barang berkualitas dengan harga hingga 70% lebih murah dari harga baru.",
            color: "var(--color-secondary)",
        },
        {
            icon: "🚀",
            title: "Proses Cepat",
            description:
                "Upload produk dalam 5 menit, proses checkout instan, pengiriman same-day.",
            color: "var(--color-accent)",
        },
        {
            icon: "🌱",
            title: "Ramah Lingkungan",
            description:
                "Berkontribusi pada sustainability dengan mengurangi limbah fashion dan elektronik.",
            color: "var(--color-primary-light)",
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
            { threshold: 0.2 },
        );

        if (sectionRef) {
            observer.observe(sectionRef);
        }

        return () => observer.disconnect();
    });
</script>

<section
    id="value-props"
    class="py-20 relative overflow-hidden bg-dark-deep"
    bind:this={sectionRef}
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise opacity-30"></div>
        <div
            class="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
                Kenapa Harus <span class="gradient-text">Okis GS</span>?
            </h2>
            <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                Kami membangun ekosistem jual-beli barang preloved yang aman,
                nyaman, dan transparan bagi semua orang.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each valueProps as prop, index}
                <div
                    class="glass rounded-[2rem] p-10 border border-white/5 hover:border-primary/40 relative overflow-hidden group transition-all duration-700 hover:-translate-y-3"
                    class:opacity-0={!isVisible}
                    class:translate-y-10={!isVisible}
                    style="transition-delay: {index * 0.15}s"
                >
                    <!-- Background Glow -->
                    <div
                        class="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"
                    ></div>

                    <div
                        class="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-primary/30"
                    >
                        <span>{prop.icon}</span>
                    </div>

                    <h3
                        class="text-2xl font-black text-white mb-4 group-hover:text-primary-light transition-colors"
                    >
                        {prop.title}
                    </h3>
                    <p
                        class="text-slate-300 leading-relaxed text-base group-hover:text-white transition-colors duration-500"
                    >
                        {prop.description}
                    </p>

                    <!-- Bottom Indicator -->
                    <div
                        class="mt-8 flex items-center gap-2 text-primary-light font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500"
                    >
                        Selengkapnya
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                d="M9 5l7 7-7 7"
                            /></svg
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
