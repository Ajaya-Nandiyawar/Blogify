//  scroll button
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    window.scrollTo({
      top: offsetTop - 70,
      behavior: "smooth",
    });
  });
});

document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const categoryItems = document.getElementsByClassName("category-item");
  const categorySections = document.getElementsByClassName("category-section");

  Array.from(categoryItems).forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  Array.from(categorySections).forEach((section) => {
    const visibleItems = section.querySelectorAll(
      ".category-item:not(.hidden)"
    );
    if (visibleItems.length === 0) {
      section.classList.add("hidden");
    } else {
      section.classList.remove("hidden");
    }
  });
});

document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", function () {
    console.log("Clicked:", this.textContent.trim());
  });
});
