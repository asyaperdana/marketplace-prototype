<script lang="ts">
    import { onMount } from "svelte";

    let isLoaded = $state(false);

    onMount(() => {
        setTimeout(() => {
            isLoaded = true;
        }, 100);
    });
</script>

<section
    id="hero"
    class="hero bg-dark-deep min-h-screen flex items-center relative overflow-hidden pt-20"
>
    <!-- Sophisticated Background -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise"></div>
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="hero-content" class:loaded={isLoaded}>
                <!-- Premium Badge -->
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/10 text-primary-light text-sm font-semibold mb-8 backdrop-blur-md"
                >
                    <span
                        class="flex h-2 w-2 rounded-full bg-primary animate-pulse"
                    ></span>
                    Marketplace Preloved #1 di Indonesia
                </div>

                <!-- Main Heading -->
                <h1
                    class="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight"
                >
                    Upgrade Gaya,<br />
                    <span class="gradient-text">Hemat</span> Budget Anda
                </h1>

                <!-- Subtitle -->
                <p
                    class="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl"
                >
                    Temukan koleksi barang branded original dengan harga miring.
                    Jual barang preloved tak terpakai dan raup keuntungan
                    tambahan setiap hari.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-4 mb-12">
                    <a
                        href="#newsletter"
                        class="btn btn-primary text-lg px-8 py-4"
                    >
                        <span>🏪</span>
                        Mulai Jualan
                    </a>
                    <a
                        href="#products"
                        class="btn btn-secondary text-lg px-8 py-4 bg-white/5 border-white/10 hover:bg-white/10"
                    >
                        <span>🔍</span>
                        Jelajahi Produk
                    </a>
                </div>

                <!-- Trust Stats -->
                <div
                    class="flex flex-wrap gap-8 items-center border-t border-white/10 pt-8 mt-4"
                >
                    <div class="flex flex-col">
                        <span class="text-2xl font-bold text-white">50K+</span>
                        <span class="text-sm text-slate-400"
                            >Pengguna Aktif</span
                        >
                    </div>
                    <div class="h-8 w-px bg-white/10"></div>
                    <div class="flex flex-col">
                        <span class="text-2xl font-bold text-white">120K+</span>
                        <span class="text-sm text-slate-400"
                            >Produk Terjual</span
                        >
                    </div>
                    <div class="h-8 w-px bg-white/10"></div>
                    <div class="flex flex-col">
                        <span class="text-2xl font-bold text-white">4.9/5</span>
                        <span class="text-sm text-slate-400"
                            >Rating Kepuasan</span
                        >
                    </div>
                </div>
            </div>

            <!-- Hero Visual Decoration -->
            <div
                class="relative hidden lg:block hero-visual"
                class:loaded={isLoaded}
            >
                <div
                    class="glass rounded-[2rem] p-8 relative overflow-hidden aspect-[4/5] flex items-center justify-center border border-white/10 shadow-2xl"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-30"
                    ></div>
                    <div class="text-[12rem] drop-shadow-2xl animate-float">
                        📦
                    </div>

                    <!-- Floating Indicator Cards -->
                    <div
                        class="absolute top-10 -left-10 glass p-5 rounded-2xl shadow-xl animate-float-slow"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-xl"
                            >
                                👗
                            </div>
                            <div>
                                <div class="text-sm font-bold text-white">
                                    Flash Sale
                                </div>
                                <div class="text-xs text-primary-light">
                                    Hingga 70% Off
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="absolute bottom-20 -right-10 glass p-5 rounded-2xl shadow-xl animate-float-medium"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl"
                            >
                                📱
                            </div>
                            <div>
                                <div class="text-sm font-bold text-white">
                                    Gadget Second
                                </div>
                                <div class="text-xs text-primary-light">
                                    Bergaransi
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Mouse -->
    <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 hidden md:block"
    >
        <div
            class="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
            <div class="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
    </div>
</section>

<style>
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-content.loaded {
        opacity: 1;
        transform: translateY(0);
    }

    .hero-visual {
        opacity: 0;
        transform: scale(0.9);
        transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
    }

    .hero-visual.loaded {
        opacity: 1;
        transform: scale(1);
    }

    .gradient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.15;
    }

    .orb-1 {
        width: 600px;
        height: 600px;
        background: var(--color-primary);
        top: -10%;
        right: -10%;
        animation: float-slow 15s ease-in-out infinite;
    }

    .orb-2 {
        width: 400px;
        height: 400px;
        background: var(--color-secondary);
        bottom: -5%;
        left: -5%;
        animation: float-slow 12s ease-in-out infinite reverse;
    }

    .orb-3 {
        width: 300px;
        height: 300px;
        background: var(--color-accent);
        top: 20%;
        left: 20%;
        animation: float-slow 18s ease-in-out infinite;
    }

    @keyframes float-slow {
        0%,
        100% {
            transform: translate(0, 0);
        }
        33% {
            transform: translate(30px, -50px);
        }
        66% {
            transform: translate(-20px, 20px);
        }
    }

    .animate-float-slow {
        animation: float 8s ease-in-out infinite;
    }
    .animate-float-medium {
        animation: float 6s ease-in-out infinite 1s;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
</style>
