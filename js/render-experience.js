console.log("render-experience.js loaded");

const experiences = [
  {
    id: "job-1",
    company: "Oakland Community College",
    role: "Student Hub Assistant",
    date: "Sep 2026 – Present",
    points: [
      "Support daily Student Hub operations, student services, and coordination of campus activities."
    ]
  },
  {
    id: "job-2",
    company: "RTI International",
    role: "Technical Writer / Documenter – Consultant",
    date: "May 2024 – Aug 2024",
    points: [
      "Analyzed and interpreted a national dataset spanning 16 participating sites, tracking project indicators including program reach, institutional support, and delivery of health services.",
      "Designed qualitative data collection tools and conducted 15 key informant interviews and focus group discussions with 50+ participants across 16 project sites in 9 regions to assess project implementation and stakeholder experiences.",
      "Synthesized quantitative and qualitative findings into the project's terminal report, documenting implementation achievements, outcomes, and evidence-based recommendations for national stakeholders."
    ]
  },
  {
    id: "job-3",
    company: "One CoreDev IT",
    role: "Clinical Patient Recruiter Team Lead",
    date: "May 2024 – Jul 2024",
    points: [
      "Supervised a team conducting patient recruitment for multiple clinical studies.",
      "Monitored recruitment targets and reported progress to upper management.",
      "Coordinated cross-functional communication and recommended workflow improvements."
    ]
  },
  {
    id: "job-4",
    company: "University of the Philippines Manila, National Telehealth Center, IQVIA RDS Philippines",
    role: "Research and Project Coordinator – Multiple Organizations",
    date: "Jun 2017 – Nov 2022",
    points: [
      "Supported 17+ research, clinical, and public-health project and site engagements and trainings across roles in project coordination, clinical research, and data analysis.",
      "Built a digital tracking system for 1,200+ participant records, replacing manual KPI tracking and enabling daily monitoring of recruitment targets and timely identification of severe adverse reactions requiring institutional reporting.",
      "Processed, cleaned, validated, and analyzed quantitative and qualitative datasets, translating findings into technical reports, data visualizations, and stakeholder presentations."
    ]
  }
];

function renderExperience() {
  const root = document.getElementById("experience-root");
  console.log("experience-root container:", root);

  if (!root) return;

  root.innerHTML = `
    <div class="row justify-content-start mb-5 pb-2">
        <div class="col-md-4 heading-section experience-heading experience-reveal">
            <span class="subheading subheading-with-line"><small class="pr-2 bg-white">Experience</small></span>
            <h2 class="mb-4">Where I've Worked</h2>
        </div>
        <div class="col-md-8 pl-md-5 heading-section experience-reveal">
            <div class="pl-md-4 border-line">
            <p>
                Experience spanning student services, technical documentation, research coordination, clinical operations, and data analysis across education and public health.
            </p>
            </div>
        </div>
    </div>
   

    <div class="experience-tabs experience-reveal">
      <div class="experience-tab-list" role="tablist" aria-label="Work experience tabs">
        ${experiences
          .map(
            (exp, index) => `
              <button
                class="experience-tab ${index === 0 ? "active" : ""}"
                data-tab="${exp.id}"
                role="tab"
                aria-selected="${index === 0 ? "true" : "false"}"
              >
                ${exp.company}
              </button>
            `
          )
          .join("")}
      </div>

      <div class="experience-panels">
        ${experiences
          .map(
            (exp, index) => `
              <div class="experience-panel ${index === 0 ? "active" : ""}" id="${exp.id}" role="tabpanel">
                <h3>${exp.role} <span>@ ${exp.company}</span></h3>
                <p class="experience-date">${exp.date}</p>
                <ul>
                  ${exp.points.map((point) => `<li>${point}</li>`).join("")}
                </ul>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  setupExperienceTabs(root);
  setupExperienceReveal(root);
}

function setupExperienceTabs(root) {
  const tabs = root.querySelectorAll(".experience-tab");
  const panels = root.querySelectorAll(".experience-panel");

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-tab");

      tabs.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active", "panel-visible");
        panel.style.display = "none";
      });

      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      const targetPanel = root.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.style.display = "block";
        targetPanel.classList.add("active");
        requestAnimationFrame(() => {
          targetPanel.classList.add("panel-visible");
        });
      }
    });
  });

  tabs[0].classList.add("active");
  tabs[0].setAttribute("aria-selected", "true");

  panels.forEach((panel, index) => {
    if (index === 0) {
      panel.style.display = "block";
      panel.classList.add("active", "panel-visible");
    } else {
      panel.style.display = "none";
      panel.classList.remove("active", "panel-visible");
    }
  });
}

function setupExperienceReveal(root) {
  const revealItems = root.querySelectorAll(".experience-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderExperience);
} else {
  renderExperience();
}