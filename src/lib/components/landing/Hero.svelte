<script lang="ts">
    import { onMount } from "svelte";

    let isLoaded = $state(false);
    let activeUsers = $state(1847);

    const floatingProducts = [
        {
            emoji: "👗",
            label: "Dress Zara",
            price: "Rp 250K",
            discount: "-72%",
            position: "top-16 -left-8",
        },
        {
            emoji: "📱",
            label: "iPhone 13",
            price: "Rp 9.5jt",
            discount: "-44%",
            position: "top-8 -right-4",
        },
        {
            emoji: "👟",
            label: "Air Jordan",
            price: "Rp 1.2jt",
            discount: "-52%",
            position: "bottom-32 -left-12",
        },
        {
            emoji: "💻",
            label: "MacBook",
            price: "Rp 8.5jt",
            discount: "-43%",
            position: "bottom-16 -right-8",
        },
    ];

    onMount(() => {
        setTimeout(() => {
            isLoaded = true;
        }, 100);

        // Simulate live users
        const interval = setInterval(() => {
            activeUsers += Math.floor(Math.random() * 5) - 2;
            if (activeUsers < 1800) activeUsers = 1820;
        }, 3000);

        return () => clearInterval(interval);
    });
</script>

<section
    id="hero"
    class="hero-section relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden"
>
    <!-- Premium Animated Background -->
    <div class="absolute inset-0 bg-dark-deep">
        <div class="bg-noise"></div>
        <div class="mesh-gradient"></div>

        <!-- Animated Gradient Orbs -->
        <div class="orb orb-primary"></div>
        <div class="orb orb-secondary"></div>
        <div class="orb orb-accent"></div>

        <!-- Grid Pattern -->
        <div class="grid-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 relative z-10 h-full">
        <div
            class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[100vh] py-24 lg:py-32"
        >
            <!-- Left Content - 7 columns -->
            <div class="lg:col-span-7 space-y-8" class:animate-in={isLoaded}>
                <!-- Live Badge -->
                <div
                    class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10"
                >
                    <div class="relative flex items-center gap-2">
                        <span
                            class="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"
                        ></span>
                        <span class="text-emerald-400 font-bold text-sm"
                            >{activeUsers.toLocaleString()}</span
                        >
                    </div>
                    <div class="w-px h-4 bg-white/20"></div>
                    <span class="text-slate-300 text-sm font-medium"
                        >user sedang berbelanja</span
                    >
                </div>

                <!-- Main Headline -->
                <div class="space-y-4">
                    <h1
                        class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                    >
                        Preloved
                        <span class="block gradient-text">Premium</span>
                        <span class="block text-white/90">Harga Hemat</span>
                    </h1>
                </div>

                <!-- Subtitle -->
                <p
                    class="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl"
                >
                    Marketplace barang branded bekas terpercaya di Indonesia.
                    <span class="text-white font-semibold"
                        >Jual lebih cepat</span
                    >,
                    <span class="text-white font-semibold"
                        >beli lebih murah</span
                    >.
                </p>

                <!-- CTA Section -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#newsletter" class="btn-hero-primary group">
                        <span
                            class="relative z-10 flex items-center justify-center gap-3"
                        >
                            <span
                                class="text-2xl group-hover:scale-110 transition-transform"
                                >🚀</span
                            >
                            <span class="font-bold text-lg"
                                >Mulai Jualan Gratis</span
                            >
                        </span>
                    </a>
                    <a href="#products" class="btn-hero-secondary group">
                        <span class="flex items-center justify-center gap-3">
                            <span class="text-xl">🔍</span>
                            <span class="font-semibold"
                                >Jelajahi 120K+ Produk</span
                            >
                        </span>
                    </a>
                </div>

                <!-- Trust Metrics -->
                <div
                    class="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
                >
                    <div class="space-y-1">
                        <div class="text-3xl lg:text-4xl font-black text-white">
                            50K<span class="text-primary">+</span>
                        </div>
                        <div class="text-sm text-slate-400 font-medium">
                            Seller Aktif
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="text-3xl lg:text-4xl font-black text-white">
                            Rp2M<span class="text-secondary">+</span>
                        </div>
                        <div class="text-sm text-slate-400 font-medium">
                            Transaksi/Bulan
                        </div>
                    </div>
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <span
                                class="text-3xl lg:text-4xl font-black text-white"
                                >4.9</span
                            >
                            <span class="text-yellow-400 text-2xl">★</span>
                        </div>
                        <div class="text-sm text-slate-400 font-medium">
                            Rating Platform
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Visual - 5 columns -->
            <div
                class="lg:col-span-5 relative"
                class:animate-in-visual={isLoaded}
            >
                <!-- Phone Mockup Container -->
                <div class="relative mx-auto max-w-[380px] lg:max-w-[420px]">
                    <!-- Phone Frame -->
                    <div class="phone-mockup">
                        <!-- Status Bar -->
                        <div
                            class="flex items-center justify-between px-6 py-3 text-xs text-white/80"
                        >
                            <span class="font-medium">9:41</span>
                            <div class="flex items-center gap-1">
                                <span>📶</span>
                                <span>🔋</span>
                            </div>
                        </div>

                        <!-- App Header -->
                        <div class="px-5 py-4 border-b border-white/10">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                                    >
                                        🛍️
                                    </div>
                                    <span class="font-bold text-white text-lg"
                                        >Okis GS</span
                                    >
                                </div>
                                <div class="flex items-center gap-2">
                                    <div
                                        class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
                                    >
                                        🔔
                                    </div>
                                    <div
                                        class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
                                    >
                                        🛒
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Search Bar -->
                        <div class="px-5 py-4">
                            <div
                                class="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                            >
                                <span class="text-slate-400">🔍</span>
                                <span class="text-slate-500 text-sm"
                                    >Cari barang preloved...</span
                                >
                            </div>
                        </div>

                        <!-- Category Pills -->
                        <div class="px-5 pb-4 flex gap-2 overflow-hidden">
                            <span
                                class="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold whitespace-nowrap"
                                >🔥 Flash Sale</span
                            >
                            <span
                                class="px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium whitespace-nowrap"
                                >👗 Fashion</span
                            >
                            <span
                                class="px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-medium whitespace-nowrap"
                                >📱 Gadget</span
                            >
                        </div>

                        <!-- Product Grid Preview -->
                        <div class="px-5 pb-6 grid grid-cols-2 gap-3">
                            <div class="product-card-mini">
                                <div
                                    class="aspect-square rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-4xl mb-2"
                                >
                                    👗
                                </div>
                                <div
                                    class="text-xs text-white font-medium truncate"
                                >
                                    Dress Zara Original
                                </div>
                                <div
                                    class="text-sm font-bold text-primary-light"
                                >
                                    Rp 250.000
                                </div>
                                <div
                                    class="text-[10px] text-slate-500 line-through"
                                >
                                    Rp 899.000
                                </div>
                            </div>
                            <div class="product-card-mini">
                                <div
                                    class="aspect-square rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-4xl mb-2"
                                >
                                    📱
                                </div>
                                <div
                                    class="text-xs text-white font-medium truncate"
                                >
                                    iPhone 13 Pro
                                </div>
                                <div
                                    class="text-sm font-bold text-primary-light"
                                >
                                    Rp 9.500.000
                                </div>
                                <div
                                    class="text-[10px] text-slate-500 line-through"
                                >
                                    Rp 16.999.000
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Nav -->
                        <div
                            class="flex items-center justify-around py-4 border-t border-white/10 mt-auto"
                        >
                            <div
                                class="flex flex-col items-center gap-1 text-primary"
                            >
                                <span class="text-lg">🏠</span>
                                <span class="text-[10px] font-bold">Home</span>
                            </div>
                            <div
                                class="flex flex-col items-center gap-1 text-slate-500"
                            >
                                <span class="text-lg">📂</span>
                                <span class="text-[10px]">Kategori</span>
                            </div>
                            <div
                                class="flex flex-col items-center gap-1 text-slate-500"
                            >
                                <span class="text-lg">➕</span>
                                <span class="text-[10px]">Jual</span>
                            </div>
                            <div
                                class="flex flex-col items-center gap-1 text-slate-500"
                            >
                                <span class="text-lg">💬</span>
                                <span class="text-[10px]">Chat</span>
                            </div>
                            <div
                                class="flex flex-col items-center gap-1 text-slate-500"
                            >
                                <span class="text-lg">👤</span>
                                <span class="text-[10px]">Akun</span>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Product Cards -->
                    {#each floatingProducts as product, i}
                        <div
                            class="floating-card absolute {product.position}"
                            style="animation-delay: {i * 0.2}s"
                        >
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">{product.emoji}</span>
                                <div>
                                    <div class="text-xs font-bold text-white">
                                        {product.label}
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="text-xs font-bold text-primary-light"
                                            >{product.price}</span
                                        >
                                        <span
                                            class="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold"
                                            >{product.discount}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}

                    <!-- Live Notification -->
                    <div
                        class="live-notification absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                        <div class="flex items-center gap-2 text-sm">
                            <span
                                class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                            ></span>
                            <span class="text-slate-300"
                                >Baru saja: <span
                                    class="text-white font-semibold">Sarah</span
                                >
                                membeli
                                <span class="text-primary-light">iPhone 13</span
                                ></span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
    >
        <span class="text-xs text-slate-400 uppercase tracking-widest"
            >Scroll</span
        >
        <div
            class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
            <div
                class="w-1.5 h-3 bg-white/60 rounded-full animate-bounce"
            ></div>
        </div>
    </div>
</section>

<style>
    .hero-section {
        display: flex;
        align-items: center;
    }

    /* Animations */
    .animate-in {
        animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-in-visual {
        animation: scaleIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        opacity: 0;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    /* Mesh Gradient */
    .mesh-gradient {
        position: absolute;
        inset: 0;
        background: radial-gradient(
                ellipse 80% 50% at 20% 40%,
                rgba(14, 165, 233, 0.15),
                transparent
            ),
            radial-gradient(
                ellipse 60% 50% at 80% 20%,
                rgba(16, 185, 129, 0.12),
                transparent
            ),
            radial-gradient(
                ellipse 50% 40% at 40% 80%,
                rgba(6, 182, 212, 0.1),
                transparent
            );
        animation: meshMove 20s ease-in-out infinite;
    }

    @keyframes meshMove {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }

    /* Gradient Orbs */
    .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.2;
    }

    .orb-primary {
        width: 600px;
        height: 600px;
        background: var(--color-primary);
        top: -15%;
        right: -10%;
        animation: orbFloat 15s ease-in-out infinite;
    }

    .orb-secondary {
        width: 500px;
        height: 500px;
        background: var(--color-secondary);
        bottom: -10%;
        left: -10%;
        animation: orbFloat 18s ease-in-out infinite reverse;
    }

    .orb-accent {
        width: 300px;
        height: 300px;
        background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
        );
        top: 40%;
        left: 30%;
        animation: orbFloat 12s ease-in-out infinite 2s;
    }

    @keyframes orbFloat {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -40px) scale(1.05);
        }
        66% {
            transform: translate(-20px, 30px) scale(0.95);
        }
    }

    /* Grid Pattern */
    .grid-pattern {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.02) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.02) 1px,
                transparent 1px
            );
        background-size: 60px 60px;
        mask-image: radial-gradient(
            ellipse 60% 60% at 50% 50%,
            black,
            transparent
        );
    }

    /* Primary CTA Button */
    .btn-hero-primary {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1.25rem 2.5rem;
        border-radius: 1rem;
        background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
        );
        color: white;
        font-weight: 700;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 40px -10px rgba(14, 165, 233, 0.5);
    }

    .btn-hero-primary::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            var(--color-secondary),
            var(--color-primary)
        );
        opacity: 0;
        transition: opacity 0.4s;
    }

    .btn-hero-primary:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 50px -10px rgba(14, 165, 233, 0.6);
    }

    .btn-hero-primary:hover::before {
        opacity: 1;
    }

    /* Secondary CTA Button */
    .btn-hero-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1.25rem 2rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        transition: all 0.3s;
    }

    .btn-hero-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }

    /* Phone Mockup */
    .phone-mockup {
        background: linear-gradient(
            145deg,
            rgba(30, 41, 59, 0.9),
            rgba(15, 23, 42, 0.95)
        );
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 2.5rem;
        box-shadow:
            0 50px 100px -20px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 0 80px -20px rgba(14, 165, 233, 0.3);
        overflow: hidden;
        backdrop-filter: blur(20px);
    }

    .product-card-mini {
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
    }

    /* Floating Cards */
    .floating-card {
        padding: 0.75rem 1rem;
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
        animation: float 6s ease-in-out infinite;
        z-index: 20;
    }

    .floating-card:nth-child(2) {
        animation-delay: 0.5s;
    }
    .floating-card:nth-child(3) {
        animation-delay: 1s;
    }
    .floating-card:nth-child(4) {
        animation-delay: 1.5s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-12px);
        }
    }

    /* Live Notification */
    .live-notification {
        padding: 0.75rem 1.25rem;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 9999px;
        box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.3);
        animation:
            slideInUp 0.5s ease-out 1.5s forwards,
            pulse 3s ease-in-out 2s infinite;
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }

    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.3);
        }
        50% {
            box-shadow: 0 10px 40px -5px rgba(16, 185, 129, 0.5);
        }
    }
</style>
