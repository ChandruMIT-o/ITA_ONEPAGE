// Data structure for events with posters and winners
const eventsData = {
	tech: [
		{
			id: 1,
			title: "Squid Games",
			description:
				"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
			poster: "samhita/tech/1.png", // Event poster image
			winners: ["Rameez Akther"], // Array of winner names
			runners: ["Surya KS"], // Array of runner names
		},
		{
			id: 2,
			title: "Web Development",
			description:
				"Competition for building responsive and innovative web applications.",
			poster: "samhita/tech/2.png",
			winners: ["Web Dev Winner"],
			runners: ["Web Dev Runner"],
		},
		{
			id: 3,
			title: "Web Development",
			description:
				"Competition for building responsive and innovative web applications.",
			poster: "samhita/tech/2.png",
			winners: ["Web Dev Winner"],
			runners: ["Web Dev Runner"],
		},
		{
			id: 4,
			title: "Web Development",
			description:
				"Competition for building responsive and innovative web applications.",
			poster: "samhita/tech/2.png",
			winners: ["Web Dev Winner"],
			runners: ["Web Dev Runner"],
		},
		{
			id: 5,
			title: "Web Development",
			description:
				"Competition for building responsive and innovative web applications.",
			poster: "samhita/tech/2.png",
			winners: ["Web Dev Winner"],
			runners: ["Web Dev Runner"],
		},
		// Add more technical events as needed
	],
	nontech: [
		{
			id: 1,
			title: "Dance Competition",
			description:
				"Showcase your dancing skills in various styles and genres.",
			poster: "samhita/nontech/1-poster.jpg",
			winners: ["Dance Champion"],
			runners: ["First Runner Up", "Second Runner Up"],
		},
		// Add more non-technical events as needed
	],
};
// DOM elements
const carousal = document.querySelector(".winners-carousal");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const eventTitle = document.querySelector(".event-title");
const eventDescription = document.querySelector(".event-description");
const winnerTagsContainer = document.querySelector(".winner-runner-tags");

let currentCategory = "tech";
let currentEventIndex = 0;
let isAnimating = false;

// Initialize the carousel with current category
function initCarousel() {
	const currentEvents = eventsData[currentCategory];

	// Clear existing cards
	carousal.innerHTML = "";

	// Create 5 cards (like in original) with the current event as first
	// We'll duplicate events if needed to maintain 5 cards
	for (let i = 0; i < 5; i++) {
		const eventIndex = (currentEventIndex + i) % currentEvents.length;
		const event = currentEvents[eventIndex];
		const card = document.createElement("div");
		card.className = `winner-card ${i === 0 ? "winner-card-large" : ""}`;
		card.style.backgroundImage = `url(${event.poster})`;
		card.style.backgroundSize = "cover";
		card.style.backgroundPosition = "center";
		carousal.appendChild(card);
	}

	// Update event info for current event
	updateEventInfo();
}

function updateEventInfo() {
	const currentEvents = eventsData[currentCategory];
	const currentEvent = currentEvents[currentEventIndex];

	eventTitle.textContent = currentEvent.title;
	eventDescription.textContent = currentEvent.description;

	// Update winner and runner tags
	winnerTagsContainer.innerHTML = "";

	// Add winner tags
	currentEvent.winners.forEach((winner) => {
		const winnerTag = document.createElement("div");
		winnerTag.className = "winner-tag";
		winnerTag.innerHTML = `
      <div class="winner-trophe-bubble">
        <img src="assets/gold-trophy.svg" alt="Trophy" />
      </div>
      <div class="winner-name">${winner}</div>
    `;
		winnerTagsContainer.appendChild(winnerTag);
	});

	// Add runner tags
	currentEvent.runners.forEach((runner) => {
		const runnerTag = document.createElement("div");
		runnerTag.className = "runner-tag";
		runnerTag.innerHTML = `
      <div class="runner-trophe-bubble">
        <img src="assets/silver-trophy.svg" alt="Trophy" />
      </div>
      <div class="runner-name">${runner}</div>
    `;
		winnerTagsContainer.appendChild(runnerTag);
	});
}

// Original carousel rotation functions (unchanged)
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

		// Update current event index when rotating
		const currentEvents = eventsData[currentCategory];
		currentEventIndex = (currentEventIndex + 1) % currentEvents.length;
		updateEventInfo();

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

		// Update current event index when rotating
		const currentEvents = eventsData[currentCategory];
		currentEventIndex =
			(currentEventIndex - 1 + currentEvents.length) %
			currentEvents.length;
		updateEventInfo();

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

// Category switching functionality
function switchCategory(category) {
	currentCategory = category;
	currentEventIndex = 0;
	initCarousel();

	// Update active states (unchanged from original)
	const techElement = document.getElementById("tech");
	const nTechElement = document.getElementById("n-tech");

	if (category === "tech") {
		techElement.classList.add("active");
		nTechElement.classList.remove("active");
		isClicked_t = true;
		isClicked_nt = false;
	} else {
		nTechElement.classList.add("active");
		techElement.classList.remove("active");
		isClicked_t = false;
		isClicked_nt = true;
	}
}

// Original event listeners (unchanged)
leftBtn.addEventListener("click", rotateLeft);
rightBtn.addEventListener("click", rotateRight);

document.getElementById("tech").addEventListener("click", () => {
	switchCategory("tech");
});

document.getElementById("n-tech").addEventListener("click", () => {
	switchCategory("nontech");
});

// Original hover behavior (unchanged)
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

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
	switchCategory("tech");
});
