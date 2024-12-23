document.addEventListener("DOMContentLoaded", () => {
    const initializeOdometer = (selector, value) => {
        const element = document.querySelector(selector);

        element.innerHTML = "0";

        const odometer = new Odometer({
            el: element,
            value: 0,
            format: "(,ddd)", 
        });

        odometer.update(value);
    };

    const handleAboutUsSection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                initializeOdometer(".placements-odometer", 99); 
                initializeOdometer(".ctc-odometer", 43); 
                initializeOdometer(".interns-odometer", 32); 
                initializeOdometer(".higher-studies-odometer", 3);
            }
        });
    };

    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const aboutUsSection = document.querySelector(".about-us-section");
    const observer = new IntersectionObserver(handleAboutUsSection, observerOptions);
    observer.observe(aboutUsSection);
});

// 2. RIGHT ABOUT US SECTION

const wrapper = document.getElementById("wrapper");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
  let next = prev;

  while (prev === next) next = rand(min, max);

  return next;
};

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 }
];

let prev = 0;

setInterval(() => {
  const index = uniqueRand(0, combinations.length - 1, prev),
    combination = combinations[index];

  wrapper.dataset.configuration = combination.configuration;
  wrapper.dataset.roundness = combination.roundness;

  prev = index;
}, 3000);
