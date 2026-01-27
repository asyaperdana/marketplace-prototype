<script lang="ts">
    import { onMount } from "svelte";

    interface ActivityItem {
        id: number;
        user: string;
        action: string;
        product: string;
        time: string;
        icon: string;
    }

    const activities: ActivityItem[] = [
        {
            id: 1,
            user: "Budi S.",
            action: "membeli",
            product: "iPhone 13 Pro",
            time: "2 menit lalu",
            icon: "📱",
        },
        {
            id: 2,
            user: "Sarah W.",
            action: "menjual",
            product: "Tas Coach Original",
            time: "5 menit lalu",
            icon: "👜",
        },
        {
            id: 3,
            user: "Anisa P.",
            action: "membeli",
            product: "Nike Air Jordan 1",
            time: "8 menit lalu",
            icon: "👟",
        },
        {
            id: 4,
            user: "Rizky M.",
            action: "menjual",
            product: "MacBook Air M1",
            time: "12 menit lalu",
            icon: "💻",
        },
        {
            id: 5,
            user: "Dewi L.",
            action: "membeli",
            product: "Dress Zara Floral",
            time: "15 menit lalu",
            icon: "👗",
        },
        {
            id: 6,
            user: "Andi K.",
            action: "menjual",
            product: "PlayStation 5",
            time: "18 menit lalu",
            icon: "🎮",
        },
    ];

    const trustBadges = [
        { icon: "🔒", label: "SSL Secured", desc: "256-bit Encryption" },
        { icon: "✅", label: "Verified Sellers", desc: "100% Terverifikasi" },
        { icon: "💯", label: "Money Back", desc: "Jaminan 100%" },
        { icon: "🛡️", label: "Buyer Protection", desc: "Perlindungan Penuh" },
    ];

    const partnerLogos = [
        "JNE",
        "J&T",
        "SiCepat",
        "AnterAja",
        "Gosend",
        "GrabExpress",
        "DANA",
        "OVO",
        "GoPay",
        "ShopeePay",
    ];

    let currentActivity = $state(0);
    let transactionCount = $state(85247);
    let activeUsers = $state(1523);
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

        // Rotate activity feed every 4 seconds
        const activityInterval = setInterval(() => {
            currentActivity = (currentActivity + 1) % activities.length;
        }, 4000);

        // Simulate live transaction counter
        const counterInterval = setInterval(() => {
            transactionCount += Math.floor(Math.random() * 3);
            activeUsers += Math.floor(Math.random() * 5) - 2;
            if (activeUsers < 1400) activeUsers = 1450;
        }, 5000);

        return () => {
            observer.disconnect();
            clearInterval(activityInterval);
            clearInterval(counterInterval);
        };
    });
</script>

<section
    id="social-proof"
    class="py-12 relative overflow-hidden bg-dark-deep border-y border-white/5"
    bind:this={sectionRef}
>
    <!-- Background Decoration -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise opacity-20"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <!-- Live Activity Feed -->
        <div
            class="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12"
            class:opacity-0={!isVisible}
            class:translate-y-6={!isVisible}
            style="transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
            <!-- Live Activity Ticker -->
            <div
                class="flex items-center gap-4 glass px-6 py-4 rounded-2xl border border-white/10 min-w-[320px]"
            >
                <div class="relative">
                    <div
                        class="absolute inset-0 bg-primary/30 rounded-full animate-ping"
                    ></div>
                    <div
                        class="w-3 h-3 bg-primary rounded-full relative z-10"
                    ></div>
                </div>
                <div class="flex items-center gap-3 text-sm">
                    <span class="text-2xl"
                        >{activities[currentActivity].icon}</span
                    >
                    <div class="activity-text">
                        <span class="font-bold text-white"
                            >{activities[currentActivity].user}</span
                        >
                        <span class="text-slate-400">
                            {activities[currentActivity].action}
                        </span>
                        <span class="font-semibold text-primary-light"
                            >{activities[currentActivity].product}</span
                        >
                    </div>
                </div>
                <span class="text-xs text-slate-500 ml-auto whitespace-nowrap"
                    >{activities[currentActivity].time}</span
                >
            </div>

            <!-- Real-time Stats -->
            <div class="flex items-center gap-8">
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-xl"
                    >
                        ⚡
                    </div>
                    <div>
                        <div
                            class="text-2xl font-black text-white tabular-nums"
                        >
                            {transactionCount.toLocaleString()}
                        </div>
                        <div
                            class="text-xs text-slate-400 font-medium uppercase tracking-wider"
                        >
                            Transaksi Hari Ini
                        </div>
                    </div>
                </div>
                <div class="h-10 w-px bg-white/10 hidden sm:block"></div>
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-xl"
                    >
                        👥
                    </div>
                    <div>
                        <div
                            class="text-2xl font-black text-white tabular-nums"
                        >
                            {activeUsers.toLocaleString()}
                        </div>
                        <div
                            class="text-xs text-slate-400 font-medium uppercase tracking-wider"
                        >
                            <span class="inline-flex items-center gap-1">
                                <span
                                    class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                                ></span>
                                Online Sekarang
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Trust Badges -->
        <div
            class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            class:opacity-0={!isVisible}
            class:translate-y-6={!isVisible}
            style="transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.1s"
        >
            {#each trustBadges as badge, index}
                <div
                    class="glass rounded-2xl p-6 text-center border border-white/5 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-1"
                    style="transition-delay: {index * 0.05}s"
                >
                    <div
                        class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-500"
                    >
                        {badge.icon}
                    </div>
                    <div class="font-bold text-white text-sm mb-1">
                        {badge.label}
                    </div>
                    <div class="text-xs text-slate-400">{badge.desc}</div>
                </div>
            {/each}
        </div>

        <!-- Partner Logos Carousel -->
        <div
            class="relative overflow-hidden"
            class:opacity-0={!isVisible}
            class:translate-y-6={!isVisible}
            style="transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.2s"
        >
            <div
                class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-deep to-transparent z-10"
            ></div>
            <div
                class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-deep to-transparent z-10"
            ></div>

            <div class="flex animate-marquee">
                {#each [...partnerLogos, ...partnerLogos] as logo}
                    <div
                        class="flex-shrink-0 mx-6 px-6 py-3 glass-light rounded-xl border border-white/5 text-slate-400 font-bold text-sm hover:text-white hover:border-primary/30 transition-all"
                    >
                        {logo}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .activity-text {
        animation: fadeInUp 0.5s ease;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .animate-marquee {
        animation: marquee 30s linear infinite;
    }

    .animate-marquee:hover {
        animation-play-state: paused;
    }
</style>
