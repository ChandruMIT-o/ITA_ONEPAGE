document.addEventListener("DOMContentLoaded", () => {
	const buttonGroup = document.querySelector(".button-group-activities");
	const buttons = buttonGroup.querySelectorAll(".gbutton-activities");
	const selectionBg = document.querySelector(".selection-bg-activities");
	const hoverOverlay = document.querySelector(".hover-overlay-activities");

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
