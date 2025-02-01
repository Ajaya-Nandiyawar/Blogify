document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollBtn");

  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

function openLoginDialog() {
  const dialog = document.getElementById("loginDialog");
  dialog.showModal();
  document.body.style.overflow = "hidden";
}

function closeLoginDialog() {
  const dialog = document.getElementById("loginDialog");
  dialog.addEventListener(
    "animationend",
    () => {
      dialog.close();
      dialog.style.animation = "";
      document.body.style.overflow = "auto";
    },
    { once: true }
  );

  dialog.style.animation = "dialogHide 0.3s ease forwards";
}

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = e.target.querySelector(".button-submit");
  const loader = e.target.querySelector(".loader");

  submitBtn.disabled = true;
  loader.style.display = "block";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    closeLoginDialog();

    showNotification("Successfully logged in!", "success");

    window.open("blog-content.html", "_blank");
  } catch (error) {
    showNotification("Login failed. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    loader.style.display = "none";
  }
});

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
