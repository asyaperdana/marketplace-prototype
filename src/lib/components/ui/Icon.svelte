<script lang="ts">
	import type { IconName } from "$lib/types/icons";

	export let name: IconName;
	export let size = 24;
	export let className = "";
	export let strokeWidth = 1.8;
	export let ariaLabel: string | undefined = undefined;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	class={className}
	aria-hidden={ariaLabel ? undefined : true}
	role={ariaLabel ? "img" : "presentation"}
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#if ariaLabel}
		<title>{ariaLabel}</title>
	{/if}

	{#if name === "search"}
		<circle cx="11" cy="11" r="6.5" />
		<line x1="16.5" y1="16.5" x2="21" y2="21" />
	{:else if name === "cash"}
		<rect x="3" y="7" width="18" height="10" rx="2" />
		<circle cx="12" cy="12" r="2.5" />
		<line x1="6.5" y1="9.5" x2="6.5" y2="14.5" />
		<line x1="17.5" y1="9.5" x2="17.5" y2="14.5" />
	{:else if name === "diamond"}
		<polygon points="12 3 20 10 12 21 4 10" />
		<line x1="4" y1="10" x2="20" y2="10" />
	{:else if name === "grid"}
		<rect x="3" y="3" width="7" height="7" rx="1.5" />
		<rect x="14" y="3" width="7" height="7" rx="1.5" />
		<rect x="3" y="14" width="7" height="7" rx="1.5" />
		<rect x="14" y="14" width="7" height="7" rx="1.5" />
	{:else if name === "tag"}
		<path d="M3 12V6a2 2 0 0 1 2-2h6l8 8-6 6-8-8z" />
		<circle cx="7" cy="7" r="1.5" />
	{:else if name === "bulb"}
		<path d="M9 18h6" />
		<path d="M10 22h4" />
		<path d="M12 2a7 7 0 0 0-4 12c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a7 7 0 0 0-4-12z" />
	{:else if name === "refresh"}
		<path d="M3 12a9 9 0 0 1 15-6" />
		<polyline points="17 3 18 9 12 9" />
		<path d="M21 12a9 9 0 0 1-15 6" />
		<polyline points="7 21 6 15 12 15" />
	{:else if name === "user"}
		<circle cx="12" cy="8" r="4" />
		<path d="M4 21a8 8 0 0 1 16 0" />
	{:else if name === "pin"}
		<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
		<circle cx="12" cy="10" r="2.5" />
	{:else if name === "chat"}
		<path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
	{:else if name === "note"}
		<path d="M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
		<path d="M14 3v5h5" />
		<line x1="8" y1="13" x2="16" y2="13" />
		<line x1="8" y1="17" x2="14" y2="17" />
	{:else if name === "cart"}
		<circle cx="9" cy="20" r="1.5" />
		<circle cx="17" cy="20" r="1.5" />
		<path d="M3 4h2l2.5 11h10.5l2-7H7" />
	{:else if name === "heart"}
		<path d="M12 21s-7-4.6-9-8.5C1.5 9 3.5 6 6.7 6c2 0 3.5 1.1 5.3 3 1.8-1.9 3.3-3 5.3-3 3.2 0 5.2 3 3.7 6.5C19 16.4 12 21 12 21z" />
	{:else if name === "image"}
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<circle cx="8" cy="10" r="2" />
		<path d="M21 16l-5-5-4 4-2-2-5 5" />
	{:else if name === "lock"}
		<rect x="5" y="11" width="14" height="10" rx="2" />
		<path d="M8 11V8a4 4 0 0 1 8 0v3" />
	{:else if name === "check"}
		<polyline points="4 12 9 17 20 6" />
	{:else if name === "shield"}
		<path d="M12 3l7 3v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" />
	{:else if name === "wallet"}
		<rect x="3" y="7" width="18" height="12" rx="2" />
		<path d="M16 7V5a2 2 0 0 0-2-2H5" />
		<circle cx="16.5" cy="13" r="1.5" />
	{:else if name === "qr"}
		<rect x="3" y="3" width="6" height="6" rx="1" />
		<rect x="15" y="3" width="6" height="6" rx="1" />
		<rect x="3" y="15" width="6" height="6" rx="1" />
		<path d="M15 15h2v2h-2zM19 15h2v6h-6v-2h4z" />
	{:else if name === "bank"}
		<path d="M3 10h18" />
		<path d="M5 10V20" />
		<path d="M9 10V20" />
		<path d="M15 10V20" />
		<path d="M19 10V20" />
		<path d="M3 20h18" />
		<path d="M12 4l9 4H3z" />
	{:else if name === "card"}
		<rect x="3" y="6" width="18" height="12" rx="2" />
		<line x1="3" y1="10" x2="21" y2="10" />
		<line x1="7" y1="15" x2="12" y2="15" />
	{:else if name === "truck"}
		<rect x="2" y="7" width="11" height="8" rx="2" />
		<path d="M13 9h4l3 3v3h-7z" />
		<circle cx="7" cy="17" r="1.5" />
		<circle cx="17" cy="17" r="1.5" />
	{:else if name === "package"}
		<rect x="3" y="7" width="18" height="13" rx="2" />
		<path d="M3 7l9 6 9-6" />
		<path d="M12 13v7" />
	{:else if name === "bag"}
		<path d="M6 7h12l-1 13H7z" />
		<path d="M9 7V5a3 3 0 0 1 6 0v2" />
	{:else if name === "store"}
		<path d="M3 9h18l-1 12H4z" />
		<path d="M5 9l2-5h10l2 5" />
		<path d="M9 21V13h6v8" />
	{:else if name === "building"}
		<rect x="5" y="3" width="14" height="18" rx="2" />
		<rect x="8" y="7" width="2" height="2" />
		<rect x="12" y="7" width="2" height="2" />
		<rect x="8" y="11" width="2" height="2" />
		<rect x="12" y="11" width="2" height="2" />
		<rect x="10.5" y="15" width="3" height="6" />
	{:else if name === "rocket"}
		<path d="M14 2c3 1 5 3 6 6-2 4-6 8-10 10l-4 1 1-4c2-4 6-8 10-10z" />
		<circle cx="13" cy="8" r="2" />
		<path d="M7 17l-3 3" />
		<path d="M17 17l3 3" />
	{:else if name === "target"}
		<circle cx="12" cy="12" r="8" />
		<circle cx="12" cy="12" r="3" />
		<line x1="12" y1="2" x2="12" y2="6" />
	{:else if name === "camera"}
		<rect x="3" y="7" width="18" height="12" rx="2" />
		<circle cx="12" cy="13" r="3.5" />
		<path d="M8 7l2-2h4l2 2" />
	{:else if name === "megaphone"}
		<path d="M3 11v2l12 4V7z" />
		<path d="M15 7v10" />
		<path d="M7 15l2 4" />
	{:else if name === "leaf"}
		<path d="M6 20c8-2 12-8 12-16-8 0-14 4-16 12 2 2 4 4 4 4z" />
		<path d="M10 14l4-4" />
	{:else if name === "phone"}
		<rect x="7" y="3" width="10" height="18" rx="2" />
		<circle cx="12" cy="17" r="0.8" />
	{:else if name === "shirt"}
		<path d="M6 5l3-2h6l3 2 3 3-3 3v8H6v-8L3 8z" />
	{:else if name === "home"}
		<path d="M3 11l9-7 9 7" />
		<path d="M5 10v10h14V10" />
	{:else if name === "gamepad"}
		<rect x="4" y="9" width="16" height="8" rx="4" />
		<line x1="8" y1="13" x2="12" y2="13" />
		<line x1="10" y1="11" x2="10" y2="15" />
		<circle cx="16.5" cy="12" r="1" />
		<circle cx="18.5" cy="14" r="1" />
	{:else if name === "book"}
		<path d="M4 5h8a3 3 0 0 1 3 3v12H7a3 3 0 0 0-3 3z" />
		<path d="M20 5h-8a3 3 0 0 0-3 3v12h8a3 3 0 0 1 3 3z" />
	{:else if name === "baby"}
		<circle cx="12" cy="12" r="5.5" />
		<path d="M9 11h.01M15 11h.01" />
		<path d="M9 14c1.5 1.5 4.5 1.5 6 0" />
	{:else if name === "sparkles"}
		<path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5z" />
		<path d="M5 14l.8 1.8L8 16.5l-1.8.7L5 19l-.7-1.8L2.5 16.5l1.8-.7z" />
	{:else if name === "flame"}
		<path d="M12 3c2 3 4 4 4 7a4 4 0 1 1-8 0c0-2 1-3.5 2-5 1-1.5 2-2 2-2z" />
	{:else if name === "laptop"}
		<rect x="4" y="5" width="16" height="10" rx="2" />
		<path d="M2 19h20" />
		<path d="M6 19l2-3h8l2 3" />
	{:else if name === "shoe"}
		<path d="M4 15c4 0 6-3 8-3 2 0 3 2 7 2v4H4z" />
		<path d="M4 15l1-4 3 2 4-1" />
	{:else if name === "bolt"}
		<path d="M13 2L3 14h7l-1 8 10-12h-7z" />
	{:else if name === "star"}
		<polygon points="12 2.5 14.9 9 22 9 16.2 13.3 18.5 20.5 12 16.5 5.5 20.5 7.8 13.3 2 9 9.1 9" />
	{:else if name === "users"}
		<circle cx="9" cy="9" r="3" />
		<circle cx="17" cy="11" r="3" />
		<path d="M3 21a6 6 0 0 1 12 0" />
		<path d="M12 21a5 5 0 0 1 10 0" />
	{:else if name === "bell"}
		<path d="M6 17h12l-1-2v-5a5 5 0 0 0-10 0v5z" />
		<path d="M9 17a3 3 0 0 0 6 0" />
	{:else if name === "plus"}
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	{:else if name === "car"}
		<rect x="3" y="11" width="18" height="6" rx="2" />
		<path d="M6 11l2-4h8l2 4" />
		<circle cx="7.5" cy="18" r="1.5" />
		<circle cx="16.5" cy="18" r="1.5" />
	{:else if name === "instagram"}
		<rect x="3" y="3" width="18" height="18" rx="5" />
		<circle cx="12" cy="12" r="4" />
		<circle cx="17" cy="7" r="1" />
	{:else if name === "facebook"}
		<path d="M14 3h-2a4 4 0 0 0-4 4v3H6v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	{:else if name === "twitter"}
		<path d="M23 4.5a10 10 0 0 1-2.8.8 4.8 4.8 0 0 0 2.1-2.7 9.6 9.6 0 0 1-3 1.2 4.8 4.8 0 0 0-8.2 4.4A13.6 13.6 0 0 1 3 3.9a4.8 4.8 0 0 0 1.5 6.4 4.6 4.6 0 0 1-2.2-.6v.1a4.8 4.8 0 0 0 3.9 4.7 4.8 4.8 0 0 1-2.2.1 4.8 4.8 0 0 0 4.5 3.3A9.7 9.7 0 0 1 2 19.5 13.7 13.7 0 0 0 9.5 22c9 0 13.9-7.5 13.9-13.9 0-.2 0-.4 0-.6A9.8 9.8 0 0 0 23 4.5z" />
	{:else if name === "youtube"}
		<rect x="3" y="6" width="18" height="12" rx="3" />
		<polygon points="10 9 16 12 10 15" />
	{/if}
</svg>
