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

// function loadScript(src) {
// 	const script = document.createElement("script");
// 	script.src = src;
// 	script.defer = true;
// 	document.body.appendChild(script);
// }

// const observer = new IntersectionObserver(
// 	(entries) => {
// 		entries.forEach((entry) => {
// 			if (entry.isIntersecting) {
// 				const sectionId = entry.target.id;

// 				switch (sectionId) {
// 					case "section-2":
// 						loadScript("components/scripts/about-us.js");
// 						break;
// 					case "section-3":
// 						loadScript("components/scripts/office_bearers.js");
// 						break;
// 					case "section-4":
// 						loadScript("components/scripts/activities.js");
// 						break;
// 					case "section-5":
// 						loadScript("components/scripts/event.js");
// 						break;
// 					case "section-6":
// 						loadScript("components/scripts/gallery.js");
// 						break;
// 					case "section-7":
// 						loadScript("components/scripts/contact.js");
// 						break;
// 					default:
// 						break;
// 				}

// 				observer.unobserve(entry.target);
// 			}
// 		});
// 	},
// 	{ threshold: 0.1 }
// ); // Trigger when 10% of a section is visible

// Observe all sections
// document
// 	.querySelectorAll("section")
// 	.forEach((section) => observer.observe(section));

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

// const cursorDot = document.createElement("div");
// const cursorCircle = document.createElement("div");

// cursorDot.id = "cursor-dot";
// cursorCircle.id = "cursor-circle";

// document.body.appendChild(cursorDot);
// document.body.appendChild(cursorCircle);

// const cursorDotStyle = cursorDot.style;
// const cursorCircleStyle = cursorCircle.style;

// let mouseX = 0,
// 	mouseY = 0,
// 	circleX = 0,
// 	circleY = 0;

// // Update cursor position
// document.addEventListener("mousemove", (e) => {
// 	mouseX = e.clientX;
// 	mouseY = e.clientY;

// 	cursorDotStyle.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
// });

// // Animate circle to follow dot
// const followCursor = () => {
// 	const speed = 1;
// 	circleX += (mouseX - circleX) * speed;
// 	circleY += (mouseY - circleY) * speed;

// 	cursorCircleStyle.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;

// 	requestAnimationFrame(followCursor);
// };
// followCursor();

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

jQuery(document).ready(function ($) {
	// Run network animation after a short delay
	setTimeout(runNetworkAnim);

	// Handle window resize with a debounce function
	let resizeTimeout;
	window.onresize = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(runNetworkAnim, 500);
	};

	// Convert hex color to RGBA
	const convertHex = (hex, opacity) => {
		const r = parseInt(hex.substring(1, 3), 16);
		const g = parseInt(hex.substring(3, 5), 16);
		const b = parseInt(hex.substring(5, 7), 16);
		return `rgba(${r},${g},${b},${opacity / 100})`;
	};

	// Network animation function
	function runNetworkAnim() {
		let currentScopeID = ++runNetworkAnim.currentGlobalID || 0;
		const canvas = document.querySelector("#network");
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		// Configuration
		const CONFIG = {
			mainColor: "#151BFF",
			secondaryColor: "darkblue",
			borderColor: "darkblue",
			lineAlpha: 100,
			numBalls: 100,
			ballRadius: 6,
			ballRadiusMin: 2,
			speed: 0.1,
			globalAlpha: 0.5,
			mouseRadius: 50,
			connectionDistance: 100,
			fps: 12,
		};
		const TAU = 2 * Math.PI;

		// Ball class
		class Ball {
			constructor(x, y, velX, velY) {
				this.x = x ?? Math.random() * canvas.width;
				this.y = y ?? Math.random() * canvas.height;
				this.vel = {
					x: velX ?? Math.random() * CONFIG.speed * 2 - CONFIG.speed,
					y: velY ?? Math.random() * CONFIG.speed * 2 - CONFIG.speed,
				};
			}

			update() {
				if (this.x > canvas.width + 50 || this.x < -50)
					this.vel.x = -this.vel.x;
				if (this.y > canvas.height + 50 || this.y < -50)
					this.vel.y = -this.vel.y;
				this.x += this.vel.x;
				this.y += this.vel.y;
			}

			draw() {
				ctx.beginPath();
				const distM = Ball.distMouse(this);
				const dynamicRadius =
					distM > CONFIG.connectionDistance
						? CONFIG.ballRadiusMin
						: CONFIG.ballRadius *
						  (1 - distM / CONFIG.connectionDistance);

				ctx.fillStyle =
					distM > CONFIG.mouseRadius
						? CONFIG.mainColor
						: CONFIG.secondaryColor;
				ctx.strokeStyle = CONFIG.borderColor;
				ctx.globalAlpha =
					distM > CONFIG.mouseRadius ? CONFIG.globalAlpha : 1;

				ctx.arc(this.x, this.y, dynamicRadius, 0, TAU);
				ctx.fill();
				if (distM <= CONFIG.mouseRadius) ctx.stroke();
			}

			static distMouse(ball) {
				return Math.hypot(ball.x - mouseX, ball.y - mouseY);
			}
		}

		// Generate balls
		const balls = Array.from(
			{ length: (canvas.width * canvas.height) / CONFIG.numBalls ** 2 },
			() => new Ball()
		);

		// Update function
		let lastTime = Date.now();
		const update = () => {
			const now = Date.now();
			const delta = now - lastTime;
			for (let frame = 0; frame * 16.667 < delta; frame++) {
				balls.forEach((ball) => ball.update());
			}
			lastTime = now;
		};

		// Draw function
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			balls.forEach((ball, index) => {
				for (let j = index + 1; j < balls.length; j++) {
					const other = balls[j];
					const dist = Math.hypot(ball.x - other.x, ball.y - other.y);

					if (dist < CONFIG.connectionDistance) {
						const distM = Ball.distMouse(other);
						ctx.beginPath();
						ctx.moveTo(ball.x, ball.y);
						ctx.lineTo(other.x, other.y);

						if (distM > CONFIG.mouseRadius) {
							ctx.strokeStyle = CONFIG.mainColor;
							ctx.globalAlpha =
								1 - dist / CONFIG.connectionDistance;
						} else {
							ctx.strokeStyle = CONFIG.secondaryColor;
							ctx.globalAlpha =
								1 - dist / CONFIG.connectionDistance + 0.3;
						}

						ctx.stroke();
					}
				}
				ball.draw();
			});
		};

		// Mouse tracking
		let mouseX = -Infinity,
			mouseY = -Infinity;
		document.addEventListener("mousemove", (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		// Animation loop
		(function loop() {
			if (currentScopeID === runNetworkAnim.currentGlobalID) {
				update();
				draw();
				requestAnimationFrame(loop);
			}
		})();
	}

	// Track current animation ID
	runNetworkAnim.currentGlobalID = -1;
});
