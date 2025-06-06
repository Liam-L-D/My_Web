// ==============================
// Typed Text Effect (Typed.js)
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  new Typed('#typed-text', {
    strings: ['Love Design'],
    typeSpeed: 120,
    backSpeed: 120,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
});

// ======================================
// Next Project Button Insertion Script
// ======================================
document.addEventListener("DOMContentLoaded", function () {
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

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % projectList.length;
    const nextProject = projectList[nextIndex];
    const container = document.getElementById("next-project-btn-container");

    if (container) {
      const nextBtn = document.createElement("a");
      nextBtn.href = nextProject;
      nextBtn.className = "btn btn-outline-primary";
      nextBtn.textContent = "Next Project →";
      container.appendChild(nextBtn);
    }
  }
});

// ===============================================
// Shared Modal + Carousel Handler for All Projects
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.portfolio-item img');
  const modalElement = document.querySelector('#modalGallery');
  const carouselElement = document.querySelector('#carouselIndicators');

  if (galleryItems.length && modalElement && carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement);

    galleryItems.forEach((img, index) => {
      img.addEventListener('click', () => {
        carousel.to(index);
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      });
    });
  }
});
