/**
 * Svelte action for a 3D Tilt effect on an element.
 */
export function tilt(node: HTMLElement, settings = { max: 15, perspective: 1000, scale: 1.05 }) {
	let width = 0;
	let height = 0;
	let left = 0;
	let top = 0;

	function updateDimensions() {
		const rect = node.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		left = rect.left;
		top = rect.top;
	}

	function handleMouseMove(e: MouseEvent) {
		const x = e.clientX - left;
		const y = e.clientY - top;

		const xVal = (y - height / 2) / (height / 2);
		const yVal = (x - width / 2) / (width / 2);

		const xRotation = -xVal * settings.max;
		const yRotation = yVal * settings.max;

		node.style.transform = `
            perspective(${settings.perspective}px) 
            rotateX(${xRotation}deg) 
            rotateY(${yRotation}deg) 
            scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})
        `;
	}

	function handleMouseEnter() {
		updateDimensions();
		node.style.transition = "transform 0.1s ease-out";
	}

	function handleMouseLeave() {
		node.style.transition = "transform 0.5s ease-out";
		node.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
	}

	node.addEventListener("mouseenter", handleMouseEnter);
	node.addEventListener("mousemove", handleMouseMove);
	node.addEventListener("mouseleave", handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener("mouseenter", handleMouseEnter);
			node.removeEventListener("mousemove", handleMouseMove);
			node.removeEventListener("mouseleave", handleMouseLeave);
		}
	};
}
