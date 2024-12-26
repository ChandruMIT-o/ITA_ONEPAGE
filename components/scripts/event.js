const carousal = document.querySelector(".winners-carousal");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

let isAnimating = false;

function rotateLeft() {
	if (isAnimating) return;
	isAnimating = true;

	const firstCard = carousal.firstElementChild;
	const secondCard = firstCard.nextElementSibling;

	firstCard.classList.remove("winner-card-large");
	secondCard.classList.add("winner-card-large");

	carousal.style.transition = "transform 0.5s ease-in-out";
	carousal.style.transform = "translateX(-275px)";

	setTimeout(() => {
		carousal.style.transition = "none";
		carousal.style.transform = "translateX(0)";
		carousal.appendChild(firstCard);
		isAnimating = false;
	}, 500);
}

function rotateRight() {
	if (isAnimating) return;
	isAnimating = true;

	const lastCard = carousal.lastElementChild;
	carousal.insertBefore(lastCard, carousal.firstElementChild);
	carousal.style.transition = "none";
	carousal.style.transform = "translateX(-275px)";

	setTimeout(() => {
		carousal.style.transition = "transform 0.5s ease-in-out";
		carousal.style.transform = "translateX(0)";
	});

	setTimeout(() => {
		updateLargeCard();
		isAnimating = false;
	}, 0);
}

function updateLargeCard() {
	const allCards = carousal.children;
	Array.from(allCards).forEach((card) =>
		card.classList.remove("winner-card-large")
	);

	allCards[0].classList.add("winner-card-large");
}

leftBtn.addEventListener("click", rotateLeft);
rightBtn.addEventListener("click", rotateRight);

updateLargeCard();

let isClicked_t = false;
let isClicked_nt = false;

document.getElementById("tech").addEventListener("click", () => {
	isClicked_t = true;
	isClicked_nt = false;
	const techElement = document.getElementById("tech");
	const nTechElement = document.getElementById("n-tech");

	techElement.classList.add("active");
	nTechElement.classList.remove("active");
});

document.getElementById("n-tech").addEventListener("click", () => {
	isClicked_nt = true;
	isClicked_t = false; // Reset tech's state
	const techElement = document.getElementById("tech");
	const nTechElement = document.getElementById("n-tech");

	nTechElement.classList.add("active");
	techElement.classList.remove("active");
});

// Hover behavior for #tech
document.getElementById("tech").addEventListener("mouseover", () => {
	const nTechElement = document.getElementById("n-tech");

	if (isClicked_nt) {
		nTechElement.classList.remove("active");
	}
});

document.getElementById("tech").addEventListener("mouseout", () => {
	const nTechElement = document.getElementById("n-tech");

	if (isClicked_nt) {
		nTechElement.classList.add("active");
	}
});

document.getElementById("n-tech").addEventListener("mouseover", () => {
	const techElement = document.getElementById("tech");

	if (isClicked_t) {
		techElement.classList.remove("active");
	}
});

document.getElementById("n-tech").addEventListener("mouseout", () => {
	const techElement = document.getElementById("tech");

	if (isClicked_t) {
		techElement.classList.add("active");
	}
});

// Default to Technical state
document.addEventListener("DOMContentLoaded", () => {
	const techElement = document.getElementById("tech");
	techElement.classList.add("active");
	isClicked_t = true;
});
