document.addEventListener("DOMContentLoaded", () => {
	const usection = document.querySelector(".usection");

	const rows = Math.ceil(usection.offsetHeight / 40);
	const cols = Math.ceil(usection.offsetWidth / 40);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.style.top = `${i * 40}px`;
			square.style.left = `${j * 40}px`;

			const randomDuration = (Math.random() * 3 + 2).toFixed(2); // Between 2s and 5s
			square.style.transition = `background-color ${randomDuration}s ease-in-out, border-color ${randomDuration}s ease-in-out`;

			const setRandomAlphas = () => {
				const borderAlpha = [0, 0.1, 0.2, 0.3, 0.4][
					Math.floor(Math.random() * 5)
				];
				const bgAlpha = Math.min(
					borderAlpha,
					[0.1, 0.2, 0.3][Math.floor(Math.random() * 3)]
				);

				square.style.backgroundColor = `rgba(255, 255, 255, ${bgAlpha})`;
				square.style.borderColor = `rgba(255, 255, 255, ${borderAlpha})`;
			};

			setRandomAlphas();

			square.addEventListener("mouseenter", () => {
				square.style.transition =
					"background-color 0.3s ease-in-out, border-color 0.3s ease-in-out";

				const borderAlpha = [0, 0.1, 0.2, 0.3, 0.4][
					Math.floor(Math.random() * 5)
				];
				const bgAlpha = Math.min(
					borderAlpha,
					[0.1, 0.2, 0.3][Math.floor(Math.random() * 3)]
				);

				square.style.backgroundColor = `rgba(255, 255, 255, ${bgAlpha})`;
				square.style.borderColor = `rgba(255, 255, 255, ${borderAlpha})`;

				setTimeout(() => {
					square.style.transition = `background-color ${randomDuration}s ease-in-out, border-color ${randomDuration}s ease-in-out`;
				}, 300); // Matches the hover duration
			});

			setInterval(() => {
				setRandomAlphas();
			}, Math.random() * 3000 + 2000); // Between 2s and 5s

			usection.appendChild(square);
		}
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const buttonGroup = document.querySelector(".button-group");
	const buttons = buttonGroup.querySelectorAll(".gbutton");
	const selectionBg = document.querySelector(".selection-bg");
	const hoverOverlay = document.querySelector(".hover-overlay");

	let selectedButton = null; // Track the selected button

	const updateMorph = (target, morphDiv) => {
		const rect = target.getBoundingClientRect();
		const parentRect = buttonGroup.getBoundingClientRect();

		morphDiv.style.left = `${rect.left - parentRect.left}px`;
		morphDiv.style.top = `${rect.top - parentRect.top}px`;
		morphDiv.style.width = `${rect.width}px`;
		morphDiv.style.height = `${rect.height}px`;
	};

	const resetButtonStyles = () => {
		buttons.forEach((button) => {
			button.style.transition = "all 0.2s ease";
			button.style.backgroundColor = "white";
			button.style.color = "#3721ff";
			button.style.borderColor = "#3721ff";
		});
	};

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			if (selectedButton) {
				selectedButton.style.boxShadow = "none";
			}

			selectedButton = button;
			resetButtonStyles();

			button.style.backgroundColor = "#3721ff";
			button.style.color = "white";
			button.style.borderColor = "white";
			updateMorph(button, selectionBg);
		});

		button.addEventListener("mouseenter", () => {
			button.style.backgroundColor = "rgba(55, 33, 255, 1)";
			button.style.borderColor = "#3721ff";
			button.style.color = "white";
			updateMorph(button, hoverOverlay);
		});

		button.addEventListener("mouseleave", () => {
			resetButtonStyles();

			if (selectedButton) {
				selectedButton.style.backgroundColor = "#3721ff";
				selectedButton.style.color = "white";
				selectedButton.style.borderColor = "white";
			}
		});
	});

	if (buttons.length > 0) {
		selectedButton = buttons[0];
		selectedButton.style.backgroundColor = "#3721ff";
		selectedButton.style.color = "white";
		selectedButton.style.borderColor = "white";
		updateMorph(selectedButton, selectionBg);
	}
});

const track = document.getElementById("image-track");

const handleOnDown = (e) => {
	track.dataset.mouseDownAt = e.clientX; // Store where the mouse is clicked
};

const handleOnUp = () => {
	track.dataset.mouseDownAt = "0"; // Reset on mouse release
	track.dataset.prevPercentage = track.dataset.percentage; // Save the current percentage
};

const handleOnMove = (e) => {
	if (track.dataset.mouseDownAt === "0") return; // Ignore if mouse is not clicked

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, // Calculate movement
		maxDelta = window.innerWidth / 2; // Normalize movement by screen size

	const percentage = (mouseDelta / maxDelta) * -100, // Convert movement to percentage
		nextPercentageUnconstrained =
			parseFloat(track.dataset.prevPercentage) + percentage, // Add to previous position
		nextPercentage = Math.max(
			Math.min(nextPercentageUnconstrained, 0),
			-100
		); // Clamp value between -100 and 0

	track.dataset.percentage = nextPercentage; // Save percentage for next move

	// Smoothly animate the track position
	track.animate(
		{
			transform: `translate(${nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	// Animate each image's object position
	for (const image of track.getElementsByClassName("image")) {
		image.animate(
			{
				objectPosition: `${100 + nextPercentage}% center`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
};

/* Add Event Listeners */
window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);
