document.addEventListener("DOMContentLoaded", () => {
	const section1 = document.querySelector("#section-1");
	const splinePreview = document.querySelector("#spline-preview"); // Independent image
	let splineViewer = document.querySelector("spline-viewer");

	// Function to clean up `spline-viewer` resources
	const cleanupSplineViewer = () => {
		if (splineViewer) {
			// Remove WebGL context and event listeners
			if (splineViewer.dispose) {
				splineViewer.dispose(); // Custom method for cleanup if provided by Spline
				console.log("Spline viewer disposed.");
			} else {
				// Manually clean up if dispose is not available
				const glContexts = splineViewer.querySelectorAll("canvas");
				glContexts.forEach((canvas) => {
					const gl =
						canvas.getContext("webgl") ||
						canvas.getContext("webgl2");
					if (gl) {
						gl.getExtension("WEBGL_lose_context")?.loseContext();
					}
				});
			}

			// Remove the viewer element from the DOM
			splineViewer.remove();
			splineViewer = null;
			console.log("Spline viewer removed.");
		}
	};

	// Intersection Observer setup
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					// Clean up and remove `spline-viewer` if `section-1` is not visible
					cleanupSplineViewer();
				} else {
					// Re-add `spline-viewer` if `section-1` becomes visible again
					if (!splineViewer) {
						splineViewer = document.createElement("spline-viewer");
						splineViewer.setAttribute("class", "spline3d");
						splineViewer.setAttribute(
							"loading-anim-type",
							"spinner-big-light"
						);
						splineViewer.setAttribute(
							"url",
							"https://prod.spline.design/P0kTHFhAGqG9ISip/scene.splinecode"
						);
						section1.appendChild(splineViewer);
						console.log("Spline viewer reloaded.");
					}
				}
			});
		},
		{ threshold: 0.1 } // Trigger when at least 10% of section-1 is visible
	);

	// Observe section-1
	if (section1) observer.observe(section1);
});

const buttons = document.querySelectorAll(".menu-button");
const hoverBg = document.querySelector(".hover-bg");
const selectedBg = document.querySelector(".selected-bg");
const sections = document.querySelectorAll("section");
let selectedButton = null;

function updateSelectedButton(button) {
	if (selectedButton) {
		selectedButton.classList.remove("selected-button");
	}
	selectedButton = button;
	button.classList.add("selected-button");

	const { top, left, width, height } = button.getBoundingClientRect();
	const parentTop = selectedBg.offsetParent.getBoundingClientRect().top;
	const parentLeft = selectedBg.offsetParent.getBoundingClientRect().left;

	selectedBg.style.top = `${top - parentTop}px`;
	selectedBg.style.left = `${left - parentLeft}px`;
	selectedBg.style.width = `${width}px`;
	selectedBg.style.height = `${height}px`;
}

buttons.forEach((button) => {
	const targetId = button.getAttribute("data-target");
	const targetElement = document.querySelector(targetId);

	button.addEventListener("click", () => {
		updateSelectedButton(button);
		targetElement.scrollIntoView({ behavior: "smooth" });
	});

	button.addEventListener("mouseenter", () => {
		const { top, left, width, height } = button.getBoundingClientRect();
		const parentTop = hoverBg.offsetParent.getBoundingClientRect().top;
		const parentLeft = hoverBg.offsetParent.getBoundingClientRect().left;

		hoverBg.style.top = `${top - parentTop}px`;
		hoverBg.style.left = `${left - parentLeft}px`;
		hoverBg.style.width = `${width}px`;
		hoverBg.style.height = `${height}px`;
	});

	button.addEventListener("mouseleave", () => {
		hoverBg.style.width = "5px";
		hoverBg.style.height = "5px";
	});
});

const container = document.querySelector(".global-container");

function onScroll() {
	const viewportHeight = container.clientHeight;
	const scrollOffset = container.scrollTop;

	let activeSectionIndex = 0;

	sections.forEach((section, index) => {
		const sectionTop = section.offsetTop;
		const sectionBottom = sectionTop + section.offsetHeight;

		if (
			scrollOffset + viewportHeight / 2 >= sectionTop &&
			scrollOffset + viewportHeight / 2 < sectionBottom
		) {
			activeSectionIndex = index;
		}
	});

	const activeButton = buttons[activeSectionIndex];
	updateSelectedButton(activeButton);

	// Change styles dynamically
	const isSection1 = activeSectionIndex === 0;
	document.documentElement.style.setProperty(
		"--menu-bg",
		isSection1 ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.5)"
	);
	document.documentElement.style.setProperty(
		"--menu-text",
		isSection1 ? "rgba(255, 255, 255, 1)" : "rgba(25, 0, 255, 1)"
	);
	document.documentElement.style.setProperty(
		"--selected-bg",
		isSection1 ? "rgba(255, 255, 255, 1)" : "rgba(25, 0, 255, 1)"
	);
	document.documentElement.style.setProperty(
		"--selected-text",
		isSection1 ? "rgba(25, 0, 255, 1)" : "rgba(255, 255, 255, 1)"
	);
	document.documentElement.style.setProperty(
		"--hover-bg",
		isSection1 ? "rgba(255, 255, 255, 0.8)" : "rgba(25, 0, 255, 1)"
	);
	document.documentElement.style.setProperty(
		"--hover-blur",
		isSection1 ? "blur(70px)" : "blur(50px)"
	);
}

container.addEventListener("scroll", onScroll, { passive: true });

window.addEventListener("DOMContentLoaded", () => {
	const homeButton = document.querySelector(
		'.menu-button[data-target="#section-1"]'
	);
	updateSelectedButton(homeButton);
	onScroll();
});

let isScrolling = false; // Flag to track if a scroll animation is ongoing
const MIN_DELTA_THRESHOLD = 50; // Adjust threshold to ignore minor gestures

container.addEventListener(
	"wheel",
	(event) => {
		// Ignore small touchpad swipes
		if (Math.abs(event.deltaY) < MIN_DELTA_THRESHOLD) {
			return;
		}

		// Prevent handling new events during scrolling
		if (isScrolling) {
			event.preventDefault();
			return;
		}

		const scrollOffset = container.scrollTop;
		const viewportHeight = container.clientHeight;
		const direction = event.deltaY > 0 ? 1 : -1;

		let currentSectionIndex = 0;

		// Find the current section in view
		sections.forEach((section, index) => {
			const sectionTop = section.offsetTop;
			const sectionBottom = sectionTop + section.offsetHeight;

			if (scrollOffset >= sectionTop && scrollOffset < sectionBottom) {
				currentSectionIndex = index;
			}
		});

		const currentSection = sections[currentSectionIndex];
		const currentSectionTop = currentSection.offsetTop;
		const currentSectionBottom =
			currentSectionTop + currentSection.offsetHeight;

		// Check if the user has reached the edge of the current section
		const isScrolledToEndOfSection =
			(direction > 0 &&
				scrollOffset + viewportHeight >= currentSectionBottom - 1) ||
			(direction < 0 && scrollOffset <= currentSectionTop + 1);

		// If not at the end, don't transition
		if (!isScrolledToEndOfSection) {
			return;
		}

		// Prevent default scrolling behavior
		event.preventDefault();

		// Calculate the next section index
		const nextIndex = Math.min(
			Math.max(currentSectionIndex + direction, 0),
			sections.length - 1
		);

		// Smooth scroll to the next section
		isScrolling = true; // Set scrolling flag
		container.scrollTo({
			top: sections[nextIndex].offsetTop,
			behavior: "smooth",
		});

		// Wait for the scroll to finish
		setTimeout(() => {
			isScrolling = false; // Reset scrolling flag
		}, 600); // Adjust timeout duration to match smooth scrolling time
	},
	{ passive: false }
);

// Handle scrolling behavior
let scrollingTimeout;

const handleScroll = () => {
	document.body.classList.add("scrolling");

	// Reset to circle after a delay when scrolling stops
	clearTimeout(scrollingTimeout);
	scrollingTimeout = setTimeout(() => {
		document.body.classList.remove("scrolling");
	}, 100); // Adjust delay as needed
};

document.addEventListener("scroll", handleScroll);

// jQuery(document).ready(function ($) {
// 	// Run network animation after a short delay
// 	setTimeout(runNetworkAnim);

// 	// Handle window resize with a debounce function
// 	let resizeTimeout;
// 	window.onresize = () => {
// 		clearTimeout(resizeTimeout);
// 		resizeTimeout = setTimeout(runNetworkAnim, 500);
// 	};

// 	// Convert hex color to RGBA
// 	const convertHex = (hex, opacity) => {
// 		const r = parseInt(hex.substring(1, 3), 16);
// 		const g = parseInt(hex.substring(3, 5), 16);
// 		x;
// 		const b = parseInt(hex.substring(5, 7), 16);
// 		return rgba(`${r},${g},${b},${opacity / 100}`);
// 	};

// 	// Network animation function
// 	function runNetworkAnim() {
// 		let currentScopeID = ++runNetworkAnim.currentGlobalID || 0;
// 		const canvas = document.querySelector("#network");
// 		if (!canvas) return;

// 		const ctx = canvas.getContext("2d");
// 		canvas.width = canvas.clientWidth;
// 		canvas.height = canvas.clientHeight;

// 		// Configuration
// 		const CONFIG = {
// 			mainColor: "#151BFF",
// 			secondaryColor: "darkblue",
// 			borderColor: "darkblue",
// 			lineAlpha: 90,
// 			numBalls: 120,
// 			ballRadius: 6,
// 			ballRadiusMin: 2,
// 			speed: 0.1,
// 			globalAlpha: 0.5,
// 			mouseRadius: 50,
// 			connectionDistance: 100,
// 			fps: 12,
// 		};
// 		const TAU = 2 * Math.PI;

// 		// Ball class
// 		class Ball {
// 			constructor(x, y, velX, velY) {
// 				this.x = x ?? Math.random() * canvas.width;
// 				this.y = y ?? Math.random() * canvas.height;
// 				this.vel = {
// 					x: velX ?? Math.random() * CONFIG.speed * 2 - CONFIG.speed,
// 					y: velY ?? Math.random() * CONFIG.speed * 2 - CONFIG.speed,
// 				};
// 			}

// 			update() {
// 				if (this.x > canvas.width + 50 || this.x < -50)
// 					this.vel.x = -this.vel.x;
// 				if (this.y > canvas.height + 50 || this.y < -50)
// 					this.vel.y = -this.vel.y;
// 				this.x += this.vel.x;
// 				this.y += this.vel.y;
// 			}

// 			draw() {
// 				ctx.beginPath();
// 				const distM = Ball.distMouse(this);
// 				const dynamicRadius =
// 					distM > CONFIG.connectionDistance
// 						? CONFIG.ballRadiusMin
// 						: CONFIG.ballRadius *
// 						  (1 - distM / CONFIG.connectionDistance);

// 				ctx.fillStyle =
// 					distM > CONFIG.mouseRadius
// 						? CONFIG.mainColor
// 						: CONFIG.secondaryColor;
// 				ctx.strokeStyle = CONFIG.borderColor;
// 				ctx.globalAlpha =
// 					distM > CONFIG.mouseRadius ? CONFIG.globalAlpha : 1;

// 				ctx.arc(this.x, this.y, dynamicRadius, 0, TAU);
// 				ctx.fill();
// 				if (distM <= CONFIG.mouseRadius) ctx.stroke();
// 			}

// 			static distMouse(ball) {
// 				return Math.hypot(ball.x - mouseX, ball.y - mouseY);
// 			}
// 		}

// 		// Generate balls
// 		const balls = Array.from(
// 			{ length: (canvas.width * canvas.height) / CONFIG.numBalls ** 2 },
// 			() => new Ball()
// 		);

// 		// Update function
// 		let lastTime = Date.now();
// 		const update = () => {
// 			const now = Date.now();
// 			const delta = now - lastTime;
// 			for (let frame = 0; frame * 16.667 < delta; frame++) {
// 				balls.forEach((ball) => ball.update());
// 			}
// 			lastTime = now;
// 		};

// 		// Draw function
// 		const draw = () => {
// 			ctx.clearRect(0, 0, canvas.width, canvas.height);

// 			balls.forEach((ball, index) => {
// 				for (let j = index + 1; j < balls.length; j++) {
// 					const other = balls[j];
// 					const dist = Math.hypot(ball.x - other.x, ball.y - other.y);

// 					if (dist < CONFIG.connectionDistance) {
// 						const distM = Ball.distMouse(other);
// 						ctx.beginPath();
// 						ctx.moveTo(ball.x, ball.y);
// 						ctx.lineTo(other.x, other.y);

// 						if (distM > CONFIG.mouseRadius) {
// 							ctx.strokeStyle = CONFIG.mainColor;
// 							ctx.globalAlpha =
// 								1 - dist / CONFIG.connectionDistance;
// 						} else {
// 							ctx.strokeStyle = CONFIG.secondaryColor;
// 							ctx.globalAlpha =
// 								1 - dist / CONFIG.connectionDistance + 0.3;
// 						}

// 						ctx.stroke();
// 					}
// 				}
// 				ball.draw();
// 			});
// 		};

// 		// Mouse tracking
// 		let mouseX = -Infinity,
// 			mouseY = -Infinity;
// 		document.addEventListener("mousemove", (e) => {
// 			mouseX = e.clientX;
// 			mouseY = e.clientY;
// 		});

// 		// Animation loop
// 		(function loop() {
// 			if (currentScopeID === runNetworkAnim.currentGlobalID) {
// 				update();
// 				draw();
// 				requestAnimationFrame(loop);
// 			}
// 		})();
// 	}

// 	// Track current animation ID
// 	runNetworkAnim.currentGlobalID = -1;
// });
const menuBar = document.querySelector(".menu-bar");
let currentHoveredButton = null;
let animating = false; // Flag to indicate that a transition is in progress

// Update the selected background position/size relative to menuBar
function updateSelectedButton(button) {
	if (!button) return;

	// Update the selected state if needed
	if (selectedButton && selectedButton !== button) {
		selectedButton.classList.remove("selected-button");
	}
	selectedButton = button;
	selectedButton.classList.add("selected-button");

	const buttonRect = selectedButton.getBoundingClientRect();
	const containerRect = menuBar.getBoundingClientRect();
	selectedBg.style.top = `${buttonRect.top - containerRect.top}px`;
	selectedBg.style.left = `${buttonRect.left - containerRect.left}px`;
	selectedBg.style.width = `${buttonRect.width}px`;
	selectedBg.style.height = `${buttonRect.height}px`;
}

// Update the hover background position/size relative to menuBar
function updateHoverBg(button) {
	if (!button) return;
	const buttonRect = button.getBoundingClientRect();
	const containerRect = menuBar.getBoundingClientRect();
	hoverBg.style.top = `${buttonRect.top - containerRect.top}px`;
	hoverBg.style.left = `${buttonRect.left - containerRect.left}px`;
	hoverBg.style.width = `${buttonRect.width}px`;
	hoverBg.style.height = `${buttonRect.height}px`;
}

// Continuously update backgrounds while the menu container is transitioning.
function continuousUpdate() {
	if (!animating) return; // Stop if we're no longer animating
	if (selectedButton) updateSelectedButton(selectedButton);
	if (currentHoveredButton) updateHoverBg(currentHoveredButton);
	requestAnimationFrame(continuousUpdate);
}

buttons.forEach((button) => {
	const targetId = button.getAttribute("data-target");
	const targetElement = document.querySelector(targetId);

	button.addEventListener("click", (e) => {
		if (window.innerWidth <= 768) {
			// If clicking the already selected button on mobile, toggle expansion.
			if (button.classList.contains("selected-button")) {
				menuBar.classList.toggle("expanded");

				// Start continuously updating while the container is animating.
				animating = true;
				continuousUpdate();

				e.stopPropagation(); // Prevent accidental scrolling on toggle.
				return;
			} else {
				// When clicking a different button, collapse the menu.
				menuBar.classList.remove("expanded");
			}
		}
		updateSelectedButton(button);
		targetElement.scrollIntoView({ behavior: "smooth" });
	});

	button.addEventListener("mouseenter", () => {
		if (window.innerWidth > 768 || menuBar.classList.contains("expanded")) {
			currentHoveredButton = button;
			updateHoverBg(button);
		}
	});

	button.addEventListener("mouseleave", () => {
		currentHoveredButton = null;
		// Optionally, shrink the hover background when leaving.
		hoverBg.style.width = "5px";
		hoverBg.style.height = "5px";
	});
});

// Use ResizeObserver to update backgrounds when menuBar changes size.
if ("ResizeObserver" in window) {
	const resizeObserver = new ResizeObserver(() => {
		if (selectedButton) updateSelectedButton(selectedButton);
		if (currentHoveredButton) updateHoverBg(currentHoveredButton);
	});
	resizeObserver.observe(menuBar);
}

// When the menu container's max-height transition ends, stop the animation loop.
menuBar.addEventListener("transitionend", (e) => {
	if (e.propertyName === "max-height") {
		animating = false; // Stop the continuous update loop.
		requestAnimationFrame(() => {
			if (selectedButton) updateSelectedButton(selectedButton);
			if (currentHoveredButton) updateHoverBg(currentHoveredButton);
		});
	}
});

// Collapse the mobile menu if the user clicks outside of it.
document.addEventListener("click", (event) => {
	if (window.innerWidth <= 768 && !menuBar.contains(event.target)) {
		menuBar.classList.remove("expanded");
		if (selectedButton) updateSelectedButton(selectedButton);
	}
});

// Also update backgrounds on window resize.
window.addEventListener("resize", () => {
	if (selectedButton) updateSelectedButton(selectedButton);
	if (currentHoveredButton) updateHoverBg(currentHoveredButton);
});
