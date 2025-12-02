document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});
