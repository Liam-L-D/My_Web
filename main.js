// ==============================
// Typed Text Effect
// ==============================
function initRotatingWord() {
  const el = document.getElementById("rotating-word");
  if (!el) return;

  const words = [
    "UX/UI Systems",
    "Web Interfaces",
    "Visual Identities"
  ];

  let index = 0;

  setInterval(() => {
    el.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove("fade-out");
      el.classList.add("fade-in");

      setTimeout(() => {
        el.classList.remove("fade-in");
      }, 600);
    }, 500);
  }, 2600);
}

// ======================================
// Next Project Button Insertion Script
// ======================================
function initNextProjectButton() {
  const projectList = [
    "pro-chocolate-bar.html",
    "pro-eco-yummy.html",
    "pro-funwe.html",
    "pro-printing-design.html",
    "pro-prepress-manual.html",
    "pro-information-design.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = projectList.indexOf(currentPage);

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % projectList.length;
  const nextProject = projectList[nextIndex];
  const container = document.getElementById("next-project-btn-container");

  if (container && !container.querySelector("a")) {
    const nextBtn = document.createElement("a");
    nextBtn.href = nextProject;
    nextBtn.className = "btn btn-outline-primary";
    nextBtn.textContent = "Next Project →";
    container.appendChild(nextBtn);
  }
}

// ===============================================
// Shared Modal + Carousel Handler for All Projects
// ===============================================
function initProjectGalleryModal() {
  const galleryItems = document.querySelectorAll(".portfolio-item img");
  const modalElement = document.querySelector("#modalGallery");
  const carouselElement = document.querySelector("#carouselIndicators");

  if (!galleryItems.length || !modalElement || !carouselElement) return;
  if (typeof bootstrap === "undefined") return;

  const carousel = new bootstrap.Carousel(carouselElement);

  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => {
      carousel.to(index);
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    });
  });
}

// ===============================================
// Portfolio Reveal Animation
// ===============================================
function initRevealAnimation() {
  const groups = document.querySelectorAll(".reveal-group");
  const standaloneItems = document.querySelectorAll(
    ".reveal-up:not(.reveal-group .reveal-up), .reveal-card:not(.reveal-group .reveal-card)"
  );

  groups.forEach((group) => {
    const items = group.querySelectorAll(".reveal-up, .reveal-card");
    items.forEach((item) => item.classList.add("reveal-ready"));
  });

  standaloneItems.forEach((item) => item.classList.add("reveal-ready"));

  if (!("IntersectionObserver" in window)) {
    document
      .querySelectorAll(".reveal-ready")
      .forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const groupObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const items = entry.target.querySelectorAll(".reveal-up, .reveal-card");
        items.forEach((item) => item.classList.add("is-visible"));
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  groups.forEach((group) => groupObserver.observe(group));

  const itemObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  standaloneItems.forEach((item) => itemObserver.observe(item));
}

// ==============================
// Init All
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  initRotatingWord();
  initNextProjectButton();
  initProjectGalleryModal();
  initRevealAnimation();
});