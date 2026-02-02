/**
 * Svelte Action to handle intersection observer for reveal animations
 */
export function reveal(node: HTMLElement, options: { threshold?: number; once?: boolean } = {}) {
	const { threshold = 0.1, once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.dispatchEvent(new CustomEvent("reveal"));
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.dispatchEvent(new CustomEvent("hide"));
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
