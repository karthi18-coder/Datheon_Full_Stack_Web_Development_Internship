"use strict";

// =========================
// 1. SELECT HTML ELEMENTS
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");

const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalFeatures = document.getElementById("modal-features");
const modalTech = document.getElementById("modal-tech");
const modalLink = document.getElementById("modal-link");


// =========================
// 2. DARK / LIGHT THEME
// =========================

function applyTheme(theme) {
  const isLight = theme === "light";

  document.documentElement.dataset.theme = theme;

  themeIcon.textContent = isLight ? "☾" : "☼";
  themeLabel.textContent = isLight ? "Dark mode" : "Light mode";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", isLight ? "#f5f7f5" : "#0b1220");
}

// Read saved theme, if available.
let savedTheme = "dark";

try {
  const storedTheme = localStorage.getItem("portfolio-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    savedTheme = storedTheme;
  }
} catch (error) {
  console.warn("Theme preference storage is unavailable.");
}

applyTheme(savedTheme);

// Change theme when the button is clicked.
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.");
  }
});


// =========================
// 3. MOBILE NAVIGATION
// =========================

function closeMenu() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close the menu after selecting a navigation link.
navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when clicking outside it.
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMenu();
  }
});

// Close the menu with Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


// =========================
// 4. PROJECT INFORMATION
// =========================

const projects = {
  pondguardian: {
    title: "PondGuardian",
    category: "ENVIRONMENTAL WEB APPLICATION",
    description:
      "A web project focused on pond monitoring, water-related reporting, and supporting environmental rejuvenation efforts.",
    features: [
      "Water and environmental information presentation.",
      "Reporting features for pond-related issues.",
      "A web interface designed to support environmental awareness."
    ],
    tech: "HTML · CSS · JavaScript · Firebase",
    link: "https://karthi18-coder.github.io/pondguard/"
  },

  ibvap: {
    title: "IBVAP",
    category: "AI / INTELLIGENT VIDEO ANALYTICS",
    description:
      "An AI-based video analytics prototype exploring how existing CCTV video can support automated detection, object tracking, and virtual-zone monitoring.",
    features: [
      "Video analytics using object detection.",
      "Object tracking and virtual-zone concepts.",
      "A web interface for interacting with the prototype."
    ],
    tech: "Python · Flask · YOLO · OpenCV",
    link: "https://ibvap-20k0.onrender.com"
  },

  food: {
    title: "AI Food Review Analyzer",
    category: "MACHINE LEARNING / SENTIMENT ANALYSIS",
    description:
      "A web application that analyzes food-review text and predicts sentiment using a machine-learning workflow.",
    features: [
      "Accepts review text for analysis.",
      "Uses a trained sentiment-analysis model.",
      "Presents predictions through a web interface."
    ],
    tech: "Python · Flask · Pandas · Machine Learning",
    link: "https://aifood-review-analyzer.onrender.com/"
  }
};


// =========================
// 5. OPEN PROJECT MODAL
// =========================

function openProjectModal(projectKey) {
  const project = projects[projectKey];

  if (!project) {
    return;
  }

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDescription.textContent = project.description;
  modalTech.textContent = "TECH STACK: " + project.tech;

  // Create feature list without inserting HTML strings.
  modalFeatures.replaceChildren();

  project.features.forEach((feature) => {
    const listItem = document.createElement("li");

    listItem.textContent = feature;
    modalFeatures.appendChild(listItem);
  });

  modalLink.href = project.link;

  if (typeof projectModal.showModal === "function") {
    projectModal.showModal();
  }
}

// Connect every project Details button.
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});


// =========================
// 6. CLOSE PROJECT MODAL
// =========================

modalClose.addEventListener("click", () => {
  projectModal.close();
});

// Close when clicking the backdrop.
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.close();
  }
});

/* 3D HERO MOUSE INTERACTION */

const workspace = document.getElementById("workspace-scene");

if (workspace) {
  const heroVisual = workspace.closest(".hero-visual");

  heroVisual.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 900) return;

    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    workspace.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    workspace.style.transform = "";
  });
}



// =========================
// 7. CURRENT FOOTER YEAR
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();
