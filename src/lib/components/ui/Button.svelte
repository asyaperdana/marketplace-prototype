<script lang="ts">
    import { cn } from "$lib/utils";

    type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
    type Size = "sm" | "md" | "lg";

    interface Props {
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
        loading?: boolean;
        fullWidth?: boolean;
        type?: "button" | "submit" | "reset";
        class?: string;
        onclick?: (event: MouseEvent) => void;
        children?: import("svelte").Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        fullWidth = false,
        type = "button",
        class: className = "",
        onclick,
        children,
    }: Props = $props();

    const baseStyles =
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<Variant, string> = {
        primary:
            "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 focus:ring-teal-500 shadow-lg hover:shadow-xl",
        secondary:
            "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
        outline:
            "border-2 border-teal-500 text-teal-600 hover:bg-teal-50 focus:ring-teal-500",
        ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg hover:shadow-xl",
    };

    const sizes: Record<Size, string> = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2.5 text-base gap-2",
        lg: "px-6 py-3 text-lg gap-2.5",
    };
</script>

<button
    {type}
    {disabled}
    class={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
    )}
    {onclick}
>
    {#if loading}
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
        </svg>
    {/if}
    {#if children}
        {@render children()}
    {/if}
</button>
