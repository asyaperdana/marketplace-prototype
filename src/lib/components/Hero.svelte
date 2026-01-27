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
    class="hero bg-dark-deep min-h-screen flex items-center relative overflow-hidden pt-12"
>
    <!-- Sophisticated Animated Mesh Background -->
    <div class="absolute inset-0 z-0">
        <div class="bg-noise"></div>
        <!-- Animated Mesh Gradient -->
        <div class="mesh-gradient"></div>
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="gradient-orb orb-4"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="hero-content" class:loaded={isLoaded}>
                <!-- Premium Badge -->
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/10 text-primary-light text-xs font-semibold mb-6 backdrop-blur-md"
                >
                    <span
                        class="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
                    ></span>
                    Marketplace Preloved #1 di Indonesia
                </div>

                <!-- Main Heading -->
                <h1
                    class="text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
                >
                    Upgrade Gaya,<br />
                    <span class="gradient-text">Hemat</span> Budget Anda
                </h1>

                <!-- Subtitle -->
                <p class="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                    Temukan koleksi barang branded original dengan harga miring.
                    Jual barang preloved tak terpakai dan raup keuntungan
                    tambahan setiap hari.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-3 mb-10">
                    <a
                        href="#newsletter"
                        class="btn btn-primary text-base px-6 py-3 group"
                    >
                        <span class="group-hover:rotate-12 transition-transform"
                            >🏪</span
                        >
                        Mulai Jualan
                    </a>
                    <a
                        href="#products"
                        class="btn btn-secondary text-base px-6 py-3 bg-white/5 border-white/10 hover:bg-white/10"
                    >
                        <span>🔍</span>
                        Jelajahi Produk
                    </a>
                </div>

                <!-- Trust Stats -->
                <div
                    class="flex flex-wrap gap-6 items-center border-t border-white/10 pt-6 mt-2"
                >
                    <div class="flex flex-col">
                        <span class="text-xl font-bold text-white">50K+</span>
                        <span class="text-xs text-slate-400"
                            >Pengguna Aktif</span
                        >
                    </div>
                    <div class="h-6 w-px bg-white/10"></div>
                    <div class="flex flex-col">
                        <span class="text-xl font-bold text-white">120K+</span>
                        <span class="text-xs text-slate-400"
                            >Produk Terjual</span
                        >
                    </div>
                    <div class="h-6 w-px bg-white/10"></div>
                    <div class="flex flex-col">
                        <span class="text-xl font-bold text-white">4.9/5</span>
                        <span class="text-xs text-slate-400"
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
                <!-- Removed overflow-hidden so floating icons are not clipped -->
                <div
                    class="glass rounded-[2rem] p-8 relative aspect-[4/5] flex items-center justify-center border border-white/10 shadow-2xl"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-30 rounded-[2rem] overflow-hidden"
                    ></div>
                    <div class="text-[10rem] drop-shadow-2xl animate-float">
                        📦
                    </div>

                    <!-- Floating Indicator Cards -->
                    <div
                        class="absolute top-10 -left-10 glass p-4 rounded-2xl shadow-xl animate-float-slow z-20"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-lg"
                            >
                                👗
                            </div>
                            <div>
                                <div class="text-sm font-bold text-white">
                                    Flash Sale
                                </div>
                                <div class="text-[10px] text-primary-light">
                                    Hingga 70% Off
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="absolute bottom-20 -right-10 glass p-4 rounded-2xl shadow-xl animate-float-medium z-20"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-lg"
                            >
                                📱
                            </div>
                            <div>
                                <div class="text-sm font-bold text-white">
                                    Gadget Second
                                </div>
                                <div class="text-[10px] text-primary-light">
                                    Bergaransi
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- New Floating Card - Top Right -->
                    <div
                        class="absolute -top-6 -right-6 glass p-3 rounded-xl shadow-xl animate-float-fast z-20"
                    >
                        <div class="flex items-center gap-2">
                            <div
                                class="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center text-sm"
                            >
                                ⭐
                            </div>
                            <div class="text-xs font-bold text-white">4.9★</div>
                        </div>
                    </div>

                    <!-- New Floating Card - Bottom Left -->
                    <div
                        class="absolute bottom-6 -left-6 glass p-3 rounded-xl shadow-xl animate-float-reverse z-20"
                    >
                        <div
                            class="flex items-center gap-2 text-emerald-400 text-xs font-bold"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>Verified Seller</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Mouse -->
    <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 hidden md:block"
    >
        <div
            class="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
            <div class="w-1 h-1.5 bg-white rounded-full animate-bounce"></div>
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

    /* Animated Mesh Gradient Background */
    .mesh-gradient {
        position: absolute;
        inset: 0;
        background: radial-gradient(
                at 40% 20%,
                rgba(14, 165, 233, 0.15) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 80% 0%,
                rgba(16, 185, 129, 0.1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 0% 50%,
                rgba(14, 165, 233, 0.1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 80% 50%,
                rgba(16, 185, 129, 0.08) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 0% 100%,
                rgba(14, 165, 233, 0.12) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 80% 100%,
                rgba(16, 185, 129, 0.1) 0px,
                transparent 50%
            );
        animation: mesh-move 20s ease-in-out infinite;
    }

    @keyframes mesh-move {
        0%,
        100% {
            background-position:
                0% 0%,
                100% 0%,
                0% 50%,
                100% 50%,
                0% 100%,
                100% 100%;
        }
        25% {
            background-position:
                20% 10%,
                80% 10%,
                10% 60%,
                90% 40%,
                10% 90%,
                90% 90%;
        }
        50% {
            background-position:
                40% 20%,
                60% 20%,
                20% 40%,
                80% 60%,
                20% 80%,
                80% 80%;
        }
        75% {
            background-position:
                20% 10%,
                80% 10%,
                10% 60%,
                90% 40%,
                10% 90%,
                90% 90%;
        }
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

    .orb-4 {
        width: 250px;
        height: 250px;
        background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
        );
        bottom: 30%;
        right: 20%;
        animation: float-slow 14s ease-in-out infinite 2s;
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
    .animate-float-fast {
        animation: float 4s ease-in-out infinite 0.5s;
    }
    .animate-float-reverse {
        animation: float-reverse 5s ease-in-out infinite 0.3s;
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

    @keyframes float-reverse {
        0%,
        100% {
            transform: translateY(0px) rotate(-2deg);
        }
        50% {
            transform: translateY(-15px) rotate(2deg);
        }
    }
</style>
