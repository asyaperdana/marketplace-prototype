<script lang="ts">
    import { onMount } from "svelte";

    let progress = $state(0);

    onMount(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            progress = Math.min((scrollTop / docHeight) * 100, 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<div
    class="fixed top-0 left-0 right-0 h-1 z-[100] bg-dark-deep/50 backdrop-blur-sm"
>
    <div
        class="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x shadow-lg shadow-primary/50"
        style="width: {progress}%"
    ></div>
</div>

<style>
    @keyframes gradient-x {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    .animate-gradient-x {
        animation: gradient-x 3s ease infinite;
    }
</style>
