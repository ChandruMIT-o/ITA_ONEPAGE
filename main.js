const buttons = document.querySelectorAll(".menu-button");
const hoverBg = document.querySelector(".hover-bg");
const selectedBg = document.querySelector(".selected-bg");
const container = document.querySelector(".global-container");
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

container.addEventListener("scroll", onScroll);

window.addEventListener("DOMContentLoaded", () => {
	const homeButton = document.querySelector(
		'.menu-button[data-target="#section-1"]'
	);
	updateSelectedButton(homeButton);
	onScroll();
});

container.addEventListener("wheel", (event) => {
	event.preventDefault();

	const sections = Array.from(container.children);
	const scrollOffset = container.scrollTop;
	const viewportHeight = container.clientHeight;
	const direction = event.deltaY > 0 ? 1 : -1;

	const currentIndex = Math.round(scrollOffset / viewportHeight);
	let nextIndex = Math.min(
		Math.max(currentIndex + direction, 0),
		sections.length - 1
	);

	container.scrollTo({
		top: viewportHeight * nextIndex,
		behavior: "smooth",
	});
});
