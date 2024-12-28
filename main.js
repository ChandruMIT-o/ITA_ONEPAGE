document.addEventListener("DOMContentLoaded", () => {
	const section1 = document.querySelector("#section-1");
	const splinePreview = document.querySelector("#spline-preview"); // Independent image
	let splineViewer = document.querySelector("spline-viewer");

	// Function to clean up spline-viewer
	const cleanupSplineViewer = () => {
		if (splineViewer) {
			// If there's a cleanup function or method in the viewer, call it here
			if (splineViewer.cleanup) {
				splineViewer.cleanup(); // Custom cleanup method if available
			}

			// You can also attempt to stop animations or WebGL processes
			if (splineViewer.stop) {
				splineViewer.stop(); // Assuming there's a stop method
			}

			// Remove the viewer element from the DOM
			splineViewer.remove();
			splineViewer = null; // Clear reference
		}
	};

	// Intersection Observer setup
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					// Clean up and remove spline-viewer if section-1 is not visible
					cleanupSplineViewer();
				} else {
					// Re-add spline-viewer if section-1 becomes visible again
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

container.addEventListener("wheel", (event) => {
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
});

const cursorDot = document.createElement("div");
const cursorCircle = document.createElement("div");

cursorDot.id = "cursor-dot";
cursorCircle.id = "cursor-circle";

document.body.appendChild(cursorDot);
document.body.appendChild(cursorCircle);

const cursorDotStyle = cursorDot.style;
const cursorCircleStyle = cursorCircle.style;

let mouseX = 0,
	mouseY = 0,
	circleX = 0,
	circleY = 0;

// Update cursor position
document.addEventListener("mousemove", (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	cursorDotStyle.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

// Animate circle to follow dot
const followCursor = () => {
	const speed = 1;
	circleX += (mouseX - circleX) * speed;
	circleY += (mouseY - circleY) * speed;

	cursorCircleStyle.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;

	requestAnimationFrame(followCursor);
};
followCursor();

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
	setTimeout(function () {
		runNetworkAnim();
	});

	var resizeTimeout;
	window.onresize = function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(runNetworkAnim, 500);
	};

	// convert hex to rgb
	function convertHex(hex, opacity) {
		hex = hex.replace("#", "");
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);

		result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
		return result;
	}

	var currentGlobalID = -1;

	function runNetworkAnim() {
		var currentScopeID = ++currentGlobalID;
		var canvas = document.querySelector("#network");
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		// Only run if canvas is over x px
		//if (canvas.width > 100) {
		var ctx = canvas.getContext("2d");

		var MAIN_COLOR = "#151BFF",
			MAIN_COLOR_RGB = convertHex(MAIN_COLOR, 0.5);
		(SEC_COLOR = "darkblue"),
			(BORDER_COLOR = "#aaee00"),
			(LINE_ALPHA = 100),
			(NUM_BALLS = 80), // higher is less
			(BALL_RAD = 6), //3
			(BALL_RAD_MIN = 2),
			(SPEED = 0.1),
			(GLOB_ALPHA = 0.5),
			(MOUSE_RAD = 100),
			(CONN_DIST = 100);
		FPS = 160;

		var TAU = 2 * Math.PI;

		times = [];
		function loop() {
			if (currentGlobalID === currentScopeID) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				update();
				draw();
				requestId = requestAnimationFrame(loop);
			}
		}

		function stopAnimation(e) {
			cancelAnimationFrame(requestId);
		}

		function Ball(startX, startY, startVelX, startVelY) {
			this.x = startX || Math.random() * canvas.width;
			this.y = startY || Math.random() * canvas.height;
			this.vel = {
				x: startVelX || Math.random() * SPEED * 2 - SPEED,
				y: startVelY || Math.random() * SPEED * 2 - SPEED,
			};
			this.update = function (canvas) {
				if (this.x > canvas.width + 50 || this.x < -50) {
					this.vel.x = -this.vel.x;
				}
				if (this.y > canvas.height + 50 || this.y < -50) {
					this.vel.y = -this.vel.y;
				}
				this.x += this.vel.x;
				this.y += this.vel.y;
			};
			this.draw = function (ctx, can) {
				ctx.beginPath();
				var distM = distMouse(this);
				if (distM > MOUSE_RAD) {
					ctx.fillStyle = MAIN_COLOR;
					ctx.globalAlpha = GLOB_ALPHA;
					ctx.arc(
						(0.5 + this.x) | 0,
						(0.5 + this.y) | 0,
						BALL_RAD_MIN,
						0,
						TAU,
						false
					);
				} else {
					ctx.fillStyle = SEC_COLOR;
					ctx.strokeStyle = BORDER_COLOR;
					ctx.globalAlpha = 1;
					var BALL_RAD_DYN =
						distM > CONN_DIST
							? BALL_RAD_MIN
							: BALL_RAD * (1 - distM / CONN_DIST);
					ctx.arc(
						(0.5 + this.x) | 0,
						(0.5 + this.y) | 0,
						BALL_RAD_DYN,
						0,
						TAU,
						false
					);
					ctx.stroke();
				}

				ctx.fill();
			};
		}

		var balls = [];
		for (
			var i = 0;
			i < (canvas.width * canvas.height) / (NUM_BALLS * NUM_BALLS);
			i++
		) {
			balls.push(
				new Ball(
					Math.random() * canvas.width,
					Math.random() * canvas.height
				)
			);
		}

		var lastTime = Date.now();
		function update() {
			var diff = Date.now() - lastTime;
			for (var frame = 0; frame * 16.6667 < diff; frame++) {
				for (var index = 0; index < balls.length; index++) {
					balls[index].update(canvas);
				}
			}
			lastTime = Date.now();
		}
		var mouseX = -1e9,
			mouseY = -1e9;
		document.addEventListener("mousemove", function (event) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		});

		function distMouse(ball) {
			return Math.hypot(ball.x - mouseX, ball.y - mouseY);
		}

		function draw() {
			for (var index = 0; index < balls.length; index++) {
				var ball = balls[index];
				ctx.beginPath();
				for (
					var index2 = balls.length - 1;
					index2 > index;
					index2 += -1
				) {
					var ball2 = balls[index2];
					var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
					if (dist < CONN_DIST) {
						var distM = distMouse(ball2);
						var line_alp = 1 - dist / CONN_DIST;
						if (distM > MOUSE_RAD) {
							ctx.strokeStyle = MAIN_COLOR;
							ctx.globalAlpha = ctx.globalAlpha =
								1 - (dist > CONN_DIST ? 0.8 : dist / CONN_DIST);
						} else {
							//ctx.fillStyle = 'rgba(255,0,0,1)';

							ctx.strokeStyle = SEC_COLOR;
							ctx.globalAlpha = 1;
						}
						ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
						ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
					}
				}
				ctx.stroke();
				ball.draw(ctx, canvas);
			}
		}

		// Start
		loop();
		//}
		var runNetworkAnimObj = new Object();
		runNetworkAnimObj.stopAnimation = stopAnimation;
		return runNetworkAnimObj;
	}
	Multi = new runNetworkAnim();
});
