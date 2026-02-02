/**
 * Svelte action for a Magnetic effect on an element.
 * The element will subtly follow the mouse cursor within a specified strength and radius.
 */
export function magnetic(node: HTMLElement, settings = { strength: 0.3, radius: 100 }) {
	let width = 0;
	let height = 0;
	let centerX = 0;
	let centerY = 0;

	function updateDimensions() {
		const rect = node.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		centerX = rect.left + width / 2;
		centerY = rect.top + height / 2;
	}

	function handleMouseMove(e: MouseEvent) {
		const distanceX = e.clientX - centerX;
		const distanceY = e.clientY - centerY;
		const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

		if (distance < settings.radius) {
			const x = distanceX * settings.strength;
			const y = distanceY * settings.strength;
			node.style.transform = `translate(${x}px, ${y}px)`;
			node.style.transition = 'transform 0.1s ease-out';
		} else {
			handleMouseLeave();
		}
	}

	function handleMouseEnter() {
		updateDimensions();
	}

	function handleMouseLeave() {
		node.style.transform = 'translate(0px, 0px)';
		node.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
	}

	window.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);
	window.addEventListener('resize', updateDimensions);
	window.addEventListener('scroll', updateDimensions);

	return {
		destroy() {
			window.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('resize', updateDimensions);
			window.removeEventListener('scroll', updateDimensions);
		}
	};
}
