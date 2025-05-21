// // Function to execute the script logic for #section-7
// const initializeSection7 = () => {
// 	const colors = [
// 		"#1900FF",
// 		"#001A6E",
// 		"#0B2F9F",
// 		"#4335A7",
// 		"#9033FF",
// 		"#6B87F4",
// 	];

// 	// Ensure the script targets only .animated-svg elements
// 	const stage = document.querySelector(".animated-svg");
// 	if (stage) {
// 		let xPos = 0;

// 		// Create and append paths to the .animated-svg
// 		for (let i = 0; i < 70; i++) {
// 			const p = document.createElementNS(
// 				"http://www.w3.org/2000/svg",
// 				"path"
// 			);
// 			const width = gsap.utils.random(5, 24, 1);
// 			gsap.set(p, {
// 				x: xPos + width / 2,
// 				y: 50,
// 				attr: {
// 					d: "M0,0 0,0",
// 					stroke: colors[gsap.utils.random(0, 5, 1)],
// 					"stroke-width": width,
// 				},
// 			});
// 			stage.appendChild(p); // Append to stage only
// 			xPos += width + 1.5;
// 		}

// 		// Scope animations strictly to the paths within the .animated-svg
// 		const paths = stage.querySelectorAll("path");

// 		// Animation timeline
// 		const tl = gsap
// 			.timeline({ repeat: -1, repeatRefresh: true })
// 			.to(
// 				stage,
// 				{
// 					attr: { viewBox: () => `random(400,600,1) 0 500 100` },
// 					ease: "power1.inOut",
// 					yoyoEase: "power4.inOut",
// 					repeat: 1,
// 					repeatDelay: 0.5,
// 					duration: 1.5,
// 				},
// 				0
// 			)
// 			.to(
// 				paths, // Use the scoped paths
// 				{
// 					ease: "back.out(4)",
// 					yoyoEase: "power3.in",
// 					stagger: {
// 						amount: 1.75,
// 						yoyo: true,
// 						repeat: 1,
// 						repeatDelay: 0.15,
// 					},
// 					attr: {
// 						d: () => {
// 							const n = gsap.utils.random(1, 50, 1);
// 							return `M0,-${n} 0,${n}`;
// 						},
// 					},
// 				},
// 				0
// 			);
// 	}
// };

// // IntersectionObserver for lazy execution of the section-specific script
// const section7 = document.querySelector("#section-7");
// if (section7) {
// 	const observerOptions = {
// 		root: null, // Viewport
// 		threshold: 0.1, // Trigger when 10% of the section is visible
// 	};

// 	const observer = new IntersectionObserver((entries, observer) => {
// 		entries.forEach((entry) => {
// 			if (entry.isIntersecting) {
// 				// Run the script logic and unobserve
// 				initializeSection7();
// 				observer.unobserve(entry.target); // Unobserve to avoid repeated execution
// 			}
// 		});
// 	}, observerOptions);

// 	observer.observe(section7);
// }
