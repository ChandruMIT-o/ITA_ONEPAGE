const colors = [
	"#1900FF",
	"#001A6E",
	"#0B2F9F",
	"#4335A7",
	"#9033FF",
	"#6B87F4",
];
const stage = document.querySelector(".animated-svg");
let xPos = 0;

for (let i = 0; i < 70; i++) {
	const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
	const width = gsap.utils.random(5, 24, 1);
	gsap.set(p, {
		x: xPos + width / 2,
		y: 50,
		attr: {
			d: "M0,0 0,0",
			stroke: colors[gsap.utils.random(0, 5, 1)],
			"stroke-width": width,
		},
	});
	stage.append(p);
	xPos += width + 1.5;
}

const tl = gsap
	.timeline({ repeat: -1, repeatRefresh: true })
	.to(
		stage,
		{
			attr: { viewBox: () => "random(400,600,1)" + " 0 500 100" },
			ease: "power1.inOut",
			yoyoEase: "power4.inOut",
			repeat: 1,
			repeatDelay: 0.5,
			duration: 1.5,
		},
		0
	)
	.to(
		"path",
		{
			ease: "back.out(4)",
			yoyoEase: "power3.in",
			stagger: { amount: 1.75, yoyo: true, repeat: 1, repeatDelay: 0.15 },
			attr: {
				d: () => {
					const n = gsap.utils.random(1, 50, 1);
					return "M0,-" + n + " 0," + n;
				},
			},
		},
		0
	);
