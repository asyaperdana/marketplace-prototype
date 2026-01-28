<script lang="ts">
    import { cn } from "$lib/utils";

    interface Props {
        variant?: "default" | "glass" | "bordered" | "elevated";
        padding?: "none" | "sm" | "md" | "lg";
        hover?: boolean;
        class?: string;
        children?: import("svelte").Snippet;
    }

    let {
        variant = "default",
        padding = "md",
        hover = false,
        class: className = "",
        children,
    }: Props = $props();

    const variants = {
        default: "bg-white",
        glass: "bg-white/70 backdrop-blur-md",
        bordered: "bg-white border border-slate-200",
        elevated: "bg-white shadow-lg",
    };

    const paddings = {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-8",
    };
</script>

<div
    class={cn(
        "rounded-2xl transition-all duration-200",
        variants[variant],
        paddings[padding],
        hover && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        className,
    )}
>
    {#if children}
        {@render children()}
    {/if}
</div>
