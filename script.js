const filterButtons = document.querySelectorAll(".filter-chip");
const cards = document.querySelectorAll(".profile-card");
const tankRange = document.querySelector("#tankRange");
const tankValue = document.querySelector("#tankValue");
const preferenceForm = document.querySelector(".preference-form");
const joinForm = document.querySelector("#joinForm");
const formNote = document.querySelector("#formNote");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

document.querySelectorAll(".icon-button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("is-saved");
    const name = button.getAttribute("aria-label").replace("收藏 ", "");
    button.setAttribute("aria-label", `${saved ? "取消收藏" : "收藏"} ${name}`);
  });
});

document.querySelectorAll(".message-button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m20 6-11 11-5-5"></path>
      </svg>
      已向 ${name} 打招呼
    `;
    button.disabled = true;
  });
});

tankRange.addEventListener("input", () => {
  tankValue.textContent = `${tankRange.value}+`;
});

preferenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const activeFilter = document.querySelector(".filter-chip.is-active");
  activeFilter.classList.remove("is-active");
  document.querySelector('[data-filter="all"]').classList.add("is-active");
  cards.forEach((card, index) => {
    card.classList.remove("is-hidden");
    card.animate(
      [
        { transform: "translateY(10px)", opacity: 0.65 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      {
        duration: 260 + index * 70,
        easing: "ease-out",
      },
    );
  });
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(joinForm);
  const name = formData.get("name").toString().trim();
  formNote.textContent = `${name}，档案已收到。我们会优先推荐安全偏好相近的潜友。`;
  formNote.classList.add("is-success");
  joinForm.reset();
});
