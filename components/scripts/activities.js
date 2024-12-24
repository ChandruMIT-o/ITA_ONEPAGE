document.addEventListener("DOMContentLoaded", () => {
	const buttonGroup = document.querySelector(".button-group-activities");
	const buttons = buttonGroup.querySelectorAll(".gbutton-activities");
	const selectionBg = document.querySelector(".selection-bg-activities");
	const hoverOverlay = document.querySelector(".hover-overlay-activities");

	let selectedButton = null; // card the selected button

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
			button.style.borderColor = "#3721ff";
			updateMorph(button, selectionBg);
		});

		button.addEventListener("mouseenter", () => {
			button.style.backgroundColor = "#5D70D7";
			button.style.borderColor = "#5D70D7";
			button.style.color = "white";
			updateMorph(button, hoverOverlay);
		});

		button.addEventListener("mouseleave", () => {
			resetButtonStyles();

			if (selectedButton) {
				selectedButton.style.backgroundColor = "#3721ff";
				selectedButton.style.color = "white";
				selectedButton.style.borderColor = "#3721ff";
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

// 2. CAROUSAL
const carousel = document.getElementById("carousel");

let isDragging = false;
let startX, scrollLeft;

carousel.addEventListener("mousedown", (e) => {
	isDragging = true;
	startX = e.pageX - carousel.offsetLeft;
	scrollLeft = carousel.scrollLeft;
	carousel.style.cursor = "grabbing";
});

carousel.addEventListener("mouseleave", () => {
	isDragging = false;
	carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseup", () => {
	isDragging = false;
	carousel.style.cursor = "grab";
});

carousel.addEventListener("mousemove", (e) => {
	if (!isDragging) return;
	e.preventDefault();
	const x = e.pageX - carousel.offsetLeft;
	const scroll = (x - startX) * 2; // Adjust scroll speed by multiplying with factor
	carousel.scrollLeft = scrollLeft - scroll;
});

// 3. EVENT TEASER

(function ($) {
	function calculateDistanceX(elem, mouseX) {
		return Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 1);
	}

	function calculateDistanceY(elem, mouseY) {
		return Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 1);
	}

	var mX, mY, distance;

	var teaser = function (box) {
		var onMouseLeave,
			onMouseEnter,
			onMouseMove,
			mX,
			mY,
			distance,
			$teaser = $(box);

		onMouseEnter = function (e) {
			e.stopImmediatePropagation();
			$element = $(this);
		};

		onMouseMove = function (e) {
			mX = e.pageX;
			mY = e.pageY;
			distanceY = (calculateDistanceY($element, mY) / 100) * -2;
			distanceX = (calculateDistanceX($element, mX) / 100) * 2;
			$element.css({
				transform:
					"rotateY(" +
					distanceX +
					"deg) rotateX(" +
					distanceY +
					"deg)",
				"box-shadow":
					"" +
					distanceX * 3 * -1 +
					"px " +
					distanceY * 3 +
					"px 10px 0px rgba(0,0,0,0.2)",
				transition: "all 0s",
			});
			$element
				.find("img")
				.css(
					"transform",
					"scale(1.2) translate3d(" +
						distanceY * 3 +
						"px, " +
						distanceX * 2 +
						"px, 0)"
				);
		};

		onMouseLeave = function (e) {
			e.stopImmediatePropagation();
			// Assuming bouncingValue is defined elsewhere
			bouncingValue($element, distanceX, distanceY);
		};

		return {
			bindHandlers: function (e) {
				$teaser.on("mouseenter", onMouseEnter);
				$teaser.on("mousemove", onMouseMove);
				$teaser.on("mouseleave", onMouseLeave);
				return this;
			},
		};
	};

	teaser(".event__teaser").bindHandlers();
})(jQuery);
