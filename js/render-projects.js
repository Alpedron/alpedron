console.log("render-projects.js loaded");
const projects = [
  {
    title: "Enrollment/Registration App",
    type: "PHP / MySQL Web App",
    description:
      "A simple CRUD-based registration system for managing students, faculty, sections, courses, and enrollments.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "XAMPP"],
    image: "images/project_1.png",
    link: "https://alpedron.infinityfreeapp.com/registration_app/index.php"
  },
  {
    title: "Tax Calculator App",
    type: "Frontend Project",
    description:
      "Designed and customized a portfolio website to showcase my background, skills, and selected projects.",
    tech: ["PHP", "HTML", "CSS"],
    image: "images/project_2.png",
    link: "https://alpedron.infinityfreeapp.com/tax_calculator/index.php"
  },
  {
    title: "2D Platformer Game",
    type: "Python / Pygame",
    description:
      "Created a side-scrolling game with sprite animation, collision handling, and a simple battle system.",
    tech: ["Python", "Pygame"],
    image: "images/project_3.jpg",
    link: "#"
  }
];

function renderProjects() {
  const container = document.getElementById("projects-list");
  console.log("projects-list container:", container);
  if (!container) return;

  container.innerHTML = `
    <div class="row justify-content-start mb-5 pb-2">
        <div class="col-md-4 heading-section project-reveal">
        <span class="subheading subheading-with-line">
          <small class="pr-2 bg-white">Projects</small>
        </span>
        <h2 class="mb-4">Featured Projects</h2>
      </div>
      <div class="col-md-8 pl-md-5 heading-section project-reveal">
        <div class="pl-md-4 border-line">
          <p>A selection of projects I’ve built while studying software engineering.</p>
        </div>
      </div>
    </div>

    <div class="row">
      ${projects.map(project => `
        <div class="col-md-6 col-lg-4 project-reveal">
          <div class="project-card bg-white p-4 mb-4">
            <div class="project-card-img mb-3" style="background-image: url('${project.image}'); height: 220px; background-size: cover; background-position: center;"></div>
            <span class="project-type d-block mb-2">${project.type}</span>
            <h3 class="project-title mb-3">${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Tech:</strong> ${project.tech.join(", ")}</p>
            <a href="${project.link}" class="btn-custom" target="_blank" rel="noopener noreferrer">View Project <span class="ion-ios-arrow-forward"></span></a>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  const revealItems = container.querySelectorAll(".project-reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealItems.forEach((item) => observer.observe(item));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProjects);
} else {
  renderProjects();
}