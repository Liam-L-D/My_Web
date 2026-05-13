// ==============================
// Footer Year
// ==============================
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ==============================
// Rotating Word
// ==============================
function initRotatingWord() {
  const el = document.getElementById("rotating-word");
  if (!el) return;

  const words = ["UX/UI Systems", "Web Interfaces", "Visual Identities"];
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

// ==============================
// Next Project Button
// ==============================
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
  const container = document.getElementById("next-project-btn-container");

  if (currentIndex === -1 || !container || container.querySelector("a")) return;

  const nextProject = projectList[(currentIndex + 1) % projectList.length];

  const nextBtn = document.createElement("a");
  nextBtn.href = nextProject;
  nextBtn.className = "btn btn-outline-primary";
  nextBtn.textContent = "Next Project →";

  container.appendChild(nextBtn);
}

// ==============================
// Simple Project Gallery Modal
// ==============================
function initProjectGalleryModal() {
  const galleryImages = document.querySelectorAll(".portfolio-item img");
  const modalElement = document.getElementById("modalGallery");
  const carouselElement = document.getElementById("carouselIndicators");

  if (!galleryImages.length || !modalElement || !carouselElement) return;
  if (typeof bootstrap === "undefined") return;

  const carouselItems = carouselElement.querySelectorAll(".carousel-item");
  if (!carouselItems.length) return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
    interval: false,
    ride: false
  });

  galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      if (index < carouselItems.length) {
        carousel.to(index);
      }

      modal.show();
    });
  });
}

// ==============================
// Reveal Animation
// ==============================
function initRevealAnimation() {
  const revealGroups = document.querySelectorAll(".reveal-group");
  const revealItems = document.querySelectorAll(".reveal-up, .reveal-card");
  const isPortfolioPage = document.body.classList.contains("portfolio-page");

  if (!revealItems.length) return;

  revealGroups.forEach((group) => {
    const groupItems = group.querySelectorAll(".reveal-up, .reveal-card");

    groupItems.forEach((item, index) => {
      const noDelay =
        !isPortfolioPage &&
        (
          item.closest(".services-section") ||
          item.closest(".hero-section") ||
          item.closest(".featured-projects-section")
        );

      item.style.setProperty(
        "--delay",
        noDelay ? "0s" : `${index * (isPortfolioPage ? 0.08 : 0.03)}s`
      );
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

// ==============================
// Portfolio Filter
// ==============================
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (!filterButtons.length || !portfolioCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      let visibleIndex = 0;

      portfolioCards.forEach((card) => {
        const categories = (card.dataset.category || "")
          .split(" ")
          .map((cat) => cat.trim());

        const shouldShow = filter === "all" || categories.includes(filter);

        if (shouldShow) {
          card.classList.remove("is-hidden");
          card.classList.remove("is-visible");
          card.style.setProperty("--delay", `${visibleIndex * 0.08}s`);
          visibleIndex++;

          requestAnimationFrame(() => {
            card.classList.add("is-visible");
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
document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initRotatingWord();
  initNextProjectButton();
  initProjectGalleryModal();
  initRevealAnimation();
  initPortfolioFilter();
});