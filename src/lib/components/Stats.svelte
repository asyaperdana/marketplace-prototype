<script lang="ts">
    import { onMount } from "svelte";

    interface Stat {
        value: number;
        suffix: string;
        label: string;
        icon: string;
    }

    const stats: Stat[] = [
        { value: 50000, suffix: "+", label: "Pengguna Aktif", icon: "👥" },
        { value: 120000, suffix: "+", label: "Produk Terdaftar", icon: "📦" },
        { value: 85000, suffix: "+", label: "Transaksi Sukses", icon: "✅" },
        { value: 4.9, suffix: "", label: "Rating Pengguna", icon: "⭐" },
    ];

    let displayValues = $state<number[]>(stats.map(() => 0));
    let isVisible = $state(false);
    let sectionRef: HTMLElement;

    function formatNumber(num: number): string {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
        }
        if (Number.isInteger(num)) {
            return num.toLocaleString();
        }
        return num.toFixed(1);
    }

    function animateValue(index: number, target: number, duration: number) {
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            displayValues[index] =
                startValue + (target - startValue) * easeOutQuart;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        isVisible = true;
                        // Start counting animation with staggered delays
                        stats.forEach((stat, index) => {
                            setTimeout(() => {
                                animateValue(index, stat.value, 2000);
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.3 },
        );

        if (sectionRef) {
            observer.observe(sectionRef);
        }

        return () => observer.disconnect();
    });
</script>

<section
    id="stats"
    class="py-24 relative overflow-hidden bg-dark-deep"
    bind:this={sectionRef}
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise opacity-30"></div>
        <div
            class="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2"
        ></div>
        <div
            class="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2"
        ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {#each stats as stat, index}
                <div
                    class="glass rounded-3xl p-8 text-center border border-white/5 hover:border-primary/30 transition-all duration-700 group hover:shadow-2xl hover:shadow-primary/10"
                    class:opacity-0={!isVisible}
                    class:translate-y-10={!isVisible}
                    style="transition-delay: {index * 0.15}s"
                >
                    <div
                        class="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-500 filter drop-shadow-2xl"
                    >
                        {stat.icon}
                    </div>
                    <div
                        class="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight"
                    >
                        {formatNumber(displayValues[index])}{stat.suffix}
                    </div>
                    <div
                        class="text-slate-300 font-bold uppercase tracking-widest text-xs lg:text-sm"
                    >
                        {stat.label}
                    </div>

                    <!-- Decorative line -->
                    <div
                        class="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"
                    ></div>
                </div>
            {/each}
        </div>
    </div>
</section>
