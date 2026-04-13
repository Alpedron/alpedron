console.log("render-experience.js loaded");

const experiences = [
  {
    id: "job-1",
    company: "RTI International – ReachHealth Project",
    role: "Consultant – Technical Writer / Documenter",
    date: "May 2024 – Aug 2024",
    points: [
      "Conducted qualitative and quantitative analysis of national health project data and authored the terminal report with findings and recommendations.",
      "Designed qualitative tools and led key informant interviews (KIIs) and focus group discussions (FGDs) across multiple regions.",
      "Monitored project deliverables and coordinated with stakeholders for timely submission and tracking."
      
    ]
  },
  {
    id: "job-2",
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
    id: "job-3",
    company: "Evergreen Hospice",
    role: "Healthcare Virtual Assistant",
    date: "Jan 2023 – Mar 2024",
    points: [
      "Ensured data quality of patient records in HospiceMD EMR.",
      "Generated and analyzed quarterly patient data reports for QAPI.",
      "Provided insights and recommendations to improve patient care processes.",
      "Used Power BI for data analysis and visualization."
    ]
  },
  {
    id: "job-4",
    company: "IQVIA RDS Philippines",
    role: "Clinical Research Associate I",
    date: "May 2022 – Nov 2022",
    points: [
      "Monitored COVID-19 vaccine trials and ensured compliance with GCP and data quality standards.",
      "Performed data review, cleaning, and query resolution using Medidata (EDC) and CTMS.",
      "Prepared monitoring reports and coordinated with clinical sites to resolve protocol issues."
    ]
  },
  {
    id: "job-5",
    company: "St. Luke’s BGC Vaccination Site",
    role: "Clinical Research Coordinator",
    date: "Oct 2021 – Mar 2022",
    points: [
      "Managed clinical trial data and ensured integrity of subject charts and study files.",
      "Created an online tracking system to monitor KPIs and project progress.",
      "Performed data cleaning and query resolution using Medidata/Rave.",
      "Oversaw patient recruitment and retention processes."
    ]
  },
  {
    id: "job-6",
    company: "University of the Philippines Manila – Various Health Projects",
    role: "Project / Research Assistant",
    date: "Jun 2017 – Jul 2021",
    points: [
      "Authored summary reports and contributed drafts for research papers submitted for scientific publication.",
      "Conducted data collection through house-to-house surveys, online surveys, structured interviews, Key Informant Interviews (KIIs), and Focus Group Discussions (FGDs).",
      "Performed data processing, cleaning, and both qualitative and quantitative analysis of project datasets; synthesized insights and summarized findings for reporting.",
      "Developed data visualizations and prepared presentations for key stakeholders and project partners.",
      "Provided administrative and operational support for multiple public health projects and coordinated with stakeholders.",
      "Managed project finances including liquidation, reimbursements, and reporting.",
      "Organized meetings, trainings, and logistics for fieldwork and stakeholder activities."
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
                A mix of research, clinical operations, documentation, and analytics-focused roles that shaped my interest in data, health, and technology.
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