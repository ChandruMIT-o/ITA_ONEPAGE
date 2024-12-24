// 1. ITA Title

$(document).ready(function () {
	$(".ITA-text").lettering("words").children("span").lettering();
});

// 2. INFORMATION TECHNOLOGY ASSOCIATION

function _toArray(arr) {
	return Array.isArray(arr) ? arr : Array.from(arr);
}

function makeSpans(selector) {
	var elements = _toArray(document.querySelectorAll(selector));

	return elements.map(function (element) {
		var text = element.innerText.split("");
		var spans = text
			.map(function (letter) {
				return "<span>" + letter + "</span>";
			})
			.join("");
		return (element.innerHTML = spans);
	});
}

makeSpans(".main-transition");

// 3. ITA DESCRIPTION

function _toArray(arr) {
	return Array.isArray(arr) ? arr : Array.from(arr);
}

function makeDescriptionSpans(selector) {
	var elements = _toArray(document.querySelectorAll(selector));

	return elements.map(function (element) {
		var text = element.innerText.split(" ");
		var spans = text
			.map(function (letter) {
				return "<span>" + letter + "</span>";
			})
			.join(" ");
		return (element.innerHTML = spans);
	});
}

makeDescriptionSpans(".description-transition");
