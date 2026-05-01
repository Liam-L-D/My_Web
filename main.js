// ==============================
// Footer Year
// ==============================
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

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
    "pro-aany.html",
    "pro-waada.html",
    "pro-information-design.html",
    "pro-funwe.html",
    "pro-printing-design.html",
    "pro-eco-yummy.html",
    "pro-chocolate-bar.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = projectList.indexOf(currentPage);

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % projectList.length;
  const nextProject = projectList[nextIndex];
  const container = document.getElementById("next-project-btn-container");

  if (!container || container.querySelector("a")) return;

  const nextBtn = document.createElement("a");
  nextBtn.href = nextProject;
  nextBtn.className = "btn btn-outline-primary";
  nextBtn.textContent = "Next Project →";
  container.appendChild(nextBtn);
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
// Reveal Animation
// ===============================================
function initRevealAnimation() {
  const revealGroups = document.querySelectorAll(".reveal-group");
  const revealItems = document.querySelectorAll(".reveal-up, .reveal-card");
  const isPortfolioPage = document.body.classList.contains("portfolio-page");

  if (!revealItems.length) return;

  revealGroups.forEach((group) => {
    const groupItems = group.querySelectorAll(".reveal-up, .reveal-card");

    groupItems.forEach((item, index) => {
      if (
        !isPortfolioPage &&
        (
          item.closest(".services-section") ||
          item.closest(".hero-section") ||
          item.closest(".featured-projects-section")
        )
      ) {
        item.style.setProperty("--delay", "0s");
      } else {
        item.style.setProperty(
          "--delay",
          isPortfolioPage ? `${index * 0.08}s` : `${index * 0.03}s`
        );
      }
    });
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: isPortfolioPage ? 0.08 : 0.02,
      rootMargin: isPortfolioPage ? "0px 0px -15% 0px" : "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// ===============================================
// Portfolio Filter
// ===============================================
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (!filterButtons.length || !portfolioCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      let visibleIndex = 0;

      portfolioCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        const shouldShow = filter === "all" || categories.includes(filter);

        if (shouldShow) {
          card.classList.remove("is-hidden");
          card.classList.remove("is-visible");
          card.style.setProperty("--delay", `${visibleIndex * 0.08}s`);
          visibleIndex += 1;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add("is-visible");
            });
          });
        } else {
          card.classList.add("is-hidden");
          card.classList.remove("is-visible");
        }
      });
    });
  });
}

// ==============================
// Init All
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  initFooterYear();
  initRotatingWord();
  initNextProjectButton();
  initProjectGalleryModal();
  initRevealAnimation();
  initPortfolioFilter();
});