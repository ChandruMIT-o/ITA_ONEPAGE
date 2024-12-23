const speedColumn1 = 0.5;
const speedColumn2 = 0.375;
const speedColumn3 = 0.5;
const speedColumn4 = 0.375;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  const column1 = document.querySelector("#column1");
  column1.style.transform = `translateY(${-scrollPosition * speedColumn1}px)`;

  const column2 = document.querySelector("#column2");
  column2.style.transform = `translateY(${-scrollPosition * speedColumn2}px)`;

  const column3 = document.querySelector("#column3");
  column3.style.transform = `translateY(${-scrollPosition * speedColumn3}px)`;

  const column4 = document.querySelector("#column4");
  column4.style.transform = `translateY(${-scrollPosition * speedColumn4}px)`;
});

document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");

    setTimeout(() => {
      const copyText = icon.getAttribute("data-copy");
      if (copyText) {
        navigator.clipboard.writeText(copyText).then(() => {
          const toast = document.createElement("div");
          toast.textContent = "Copied!";
          toast.className = "copy-toast";
          document.body.appendChild(toast);

          const iconRect = icon.getBoundingClientRect();
          toast.style.left = `${iconRect.left + iconRect.width / 2}px`;
          toast.style.top = `${iconRect.top - 33}px`;

          setTimeout(() => {
            toast.remove();
          }, 1500);
        });
      }
    }, 700);

    setTimeout(() => {
      icon.classList.remove("clicked");
    }, 500);
  });
});
