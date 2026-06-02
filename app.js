import { siteContent } from "./content.js?v=202606021145";

const app = document.querySelector("#app");

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function sectionHeading(kicker, title, body) {
  return `
    <header class="section-heading reveal">
      <p class="kicker">${kicker}</p>
      <h2>${title}</h2>
      <p class="section-copy">${body}</p>
    </header>
  `;
}

function renderWorkbenchStat(item) {
  return `
    <article class="workbench-stat">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <p>${item.note}</p>
    </article>
  `;
}

function renderWorkbenchProof(item) {
  return `
    <article class="proof-row">
      <span>${item.status}</span>
      <div>
        <strong>${item.title}</strong>
        <p>${item.note}</p>
      </div>
    </article>
  `;
}

function renderPipelineRow(item) {
  return `
    <article class="pipeline-row">
      <div>
        <strong>${item.company}</strong>
        <p>${item.role}</p>
      </div>
      <span>${item.compensation}</span>
      <small>${item.status}</small>
    </article>
  `;
}

function renderHeroWorkbench() {
  const stats = siteContent.hero.workbench.stats.map(renderWorkbenchStat).join("");
  const proofs = siteContent.hero.workbench.proofs.map(renderWorkbenchProof).join("");
  const pipeline = siteContent.hero.workbench.pipeline.map(renderPipelineRow).join("");

  return `
    <aside class="hero-workbench reveal" id="hero-stage" aria-label="Portfolio workbench preview">
      <div class="workbench-top">
        <div class="identity-card">
          <img src="${siteContent.siteSettings.avatar}" alt="Andrew Alexaitis">
          <div>
            <span>Remote tech portfolio</span>
            <strong>Andrew Alexaitis</strong>
            <p>AI-assisted workflow builder in Seattle</p>
          </div>
        </div>
        <span class="workbench-status">Prepared, not auto-submitted</span>
      </div>

      <div class="workbench-stats">${stats}</div>

      <section class="workbench-panel">
        <div class="workbench-panel-heading">
          <span>Selected proof</span>
          <strong>Built systems, not placeholder claims</strong>
        </div>
        <div class="proof-stack">${proofs}</div>
      </section>

      <section class="workbench-panel pipeline-panel">
        <div class="workbench-panel-heading">
          <span>Daily opportunity pipeline</span>
          <strong>Jobs, contracts, gigs, and AI training work</strong>
        </div>
        <div class="pipeline-stack">${pipeline}</div>
      </section>
    </aside>
  `;
}

function renderHero() {
  const trustItems = siteContent.hero.trustItems
    .map((item) => `<li>${item}</li>`)
    .join("");

  const audienceNotes = siteContent.hero.audienceNotes
    .map(
      (item, index) => `
        <article class="audience-note${index === 0 ? " is-active" : ""}">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");

  return `
    <section class="hero-scroll-shell" id="hero">
      <div class="hero-scroll-sticky">
        <section class="hero">
          <div class="hero-copy reveal">
            <p class="kicker">${siteContent.hero.eyebrow}</p>
            <h1>${siteContent.hero.title}</h1>
            <p class="hero-body">${siteContent.hero.body}</p>

            <div class="hero-actions">
              <a class="button button-primary" href="${siteContent.hero.primaryCta.href}">${siteContent.hero.primaryCta.label}</a>
              <a class="button button-ghost" href="${siteContent.hero.secondaryCta.href}">${siteContent.hero.secondaryCta.label}</a>
            </div>

            <ul class="trust-list">${trustItems}</ul>

            <div class="audience-note-grid" aria-label="Who this work is for">
              ${audienceNotes}
            </div>
          </div>

          ${renderHeroWorkbench()}
        </section>
      </div>
    </section>
  `;
}

function renderApproach() {
  const pillars = siteContent.approach.pillars
    .map(
      (item) => `
        <article class="pillar-card">
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");

  const checklist = siteContent.approach.checklist
    .map((item) => `<li>${item}</li>`)
    .join("");

  return `
    <section class="section approach" id="approach">
      ${sectionHeading(
        "Profile",
        siteContent.approach.title,
        siteContent.approach.body
      )}

      <div class="approach-layout reveal">
        <div class="pillar-grid">${pillars}</div>
        <aside class="callout-panel">
          <p class="kicker">What this build optimizes for</p>
          <h3>${siteContent.approach.calloutTitle}</h3>
          <p>${siteContent.approach.calloutBody}</p>
          <ul class="check-list">${checklist}</ul>
        </aside>
      </div>
    </section>
  `;
}

function renderServices() {
  const services = siteContent.services.items
    .map(
      (item) => `
        <article class="service-row">
          <div class="service-copy">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
          <ul class="service-list">
            ${item.includes.map((entry) => `<li>${entry}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");

  return `
    <section class="section services" id="services">
      ${sectionHeading(
        "Capabilities",
        siteContent.services.title,
        siteContent.services.body
      )}
      <div class="services-stack reveal">${services}</div>
    </section>
  `;
}

function renderPreview(preview, title) {
  if (preview.mode === "image") {
    return `
      <div class="portfolio-preview portfolio-preview-image">
        <img src="${preview.image}" alt="${title}">
        <div class="preview-overlay">
          <span>${preview.eyebrow}</span>
          <strong>${preview.caption}</strong>
        </div>
      </div>
    `;
  }

  return `
    <div class="portfolio-preview portfolio-preview-pattern preview-tone-${preview.tone}">
      <div class="preview-surface">
        <div class="preview-track">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="preview-copy">
          <span>${preview.eyebrow}</span>
          <strong>${preview.caption}</strong>
          <p>Structured, interactive, and easier to navigate than a generic content dump.</p>
        </div>
      </div>
    </div>
  `;
}

function renderPortfolio() {
  const tabs = siteContent.portfolio.cases
    .map(
      (item, index) => `
        <button
          class="portfolio-tab${index === 0 ? " is-active" : ""}"
          type="button"
          data-portfolio-index="${index}"
          aria-selected="${index === 0 ? "true" : "false"}"
        >
          <span>${item.category}</span>
          <strong>${item.title}</strong>
          <small>${item.clientType}</small>
        </button>
      `
    )
    .join("");

  const panels = siteContent.portfolio.cases
    .map(
      (item, index) => `
        <article class="portfolio-panel${index === 0 ? " is-active" : ""}" data-portfolio-panel="${index}">
          <div class="portfolio-panel-copy">
            <div class="portfolio-panel-top">
              <p class="kicker">${item.category}</p>
              <span class="status-badge status-${item.status}">${item.status === "placeholder" ? "Replace with real project" : "Built piece"}</span>
            </div>
            <h3>${item.title}</h3>
            <p class="portfolio-client-type">${item.clientType}</p>
            <p>${item.summary}</p>
            <p class="impact-note">${item.impactNote}</p>

            <div class="portfolio-detail-block">
              <strong>What this shows</strong>
              <ul class="panel-list">
                ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
              </ul>
            </div>

            <div class="portfolio-detail-block">
              <strong>Project focus</strong>
              <ul class="deliverable-list">
                ${item.deliverables.map((entry) => `<li>${entry}</li>`).join("")}
              </ul>
            </div>

            ${
              item.links.length
                ? `
                  <div class="portfolio-actions">
                    ${item.links
                      .map(
                        (link) =>
                          `<a class="button button-ghost" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
                      )
                      .join("")}
                  </div>
                `
                : ""
            }
          </div>

          <div class="portfolio-panel-preview">
            ${renderPreview(item.preview, item.title)}
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="section portfolio" id="portfolio" data-scroll-portfolio>
      ${sectionHeading(
        "Selected Work",
        siteContent.portfolio.title,
        siteContent.portfolio.body
      )}

      <div class="portfolio-layout reveal">
        <div class="portfolio-tabs" role="tablist" aria-label="Featured projects">
          ${tabs}
        </div>
        <div class="portfolio-panels">
          ${panels}
        </div>
      </div>
    </section>
  `;
}

function renderProcess() {
  const steps = siteContent.process.steps
    .map(
      (step) => `
        <article class="process-card">
          <h3>${step.title}</h3>
          <p>${step.body}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="section process" id="process">
      ${sectionHeading(
        "Experience",
        siteContent.process.title,
        siteContent.process.body
      )}
      <div class="process-grid reveal">${steps}</div>
    </section>
  `;
}

function renderOpportunityLedger() {
  const rows = siteContent.opportunityLedger.rows
    .map(
      (item) => `
        <article class="ledger-row">
          <div>
            <span>${item.type}</span>
            <strong>${item.company}</strong>
            <p>${item.summary}</p>
          </div>
          <div>
            <span>Status</span>
            <strong>${item.status}</strong>
            <p>${item.materials}</p>
          </div>
          <div>
            <span>Compensation</span>
            <strong>${item.compensation}</strong>
            <p>${item.mode}</p>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="section opportunity-ledger" id="opportunities">
      ${sectionHeading(
        "Opportunity Pipeline",
        siteContent.opportunityLedger.title,
        siteContent.opportunityLedger.body
      )}
      <div class="ledger-shell reveal">
        <div class="ledger-summary">
          ${siteContent.opportunityLedger.stats
            .map(
              (item) => `
                <article>
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="ledger-table">${rows}</div>
      </div>
    </section>
  `;
}

function renderReassurance() {
  const concerns = siteContent.reassurance.concerns
    .map(
      (item) => `
        <article class="concern-card">
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");

  return `
    <section class="section reassurance" id="reassurance">
      ${sectionHeading(
        "How I Work",
        siteContent.reassurance.title,
        siteContent.reassurance.body
      )}
      <div class="concern-grid reveal">${concerns}</div>
    </section>
  `;
}

function renderTestimonials() {
  if (siteContent.siteSettings.sections?.testimonials === false) {
    return "";
  }

  const quotes = siteContent.testimonials.quotes
    .map(
      (item) => `
        <article class="quote-card">
          <span class="status-badge status-${item.status}">${item.status === "placeholder" ? "Placeholder" : "Live quote"}</span>
          <p class="quote-text">“${item.quote}”</p>
          <strong>${item.author}</strong>
          <span class="quote-role">${item.role}</span>
        </article>
      `
    )
    .join("");

  return `
    <section class="section testimonials" id="testimonials">
      ${sectionHeading(
        "Testimonials",
        siteContent.testimonials.title,
        siteContent.testimonials.body
      )}
      <div class="quote-grid reveal">${quotes}</div>
    </section>
  `;
}

function renderFaq() {
  if (siteContent.siteSettings.sections?.faq === false) {
    return "";
  }

  const items = siteContent.faq
    .map(
      (item, index) => `
        <details class="faq-item"${index === 0 ? " open" : ""}>
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("");

  return `
    <section class="section faq" id="faq">
      ${sectionHeading(
        "Recruiter FAQ",
        "Straight answers about fit, working style, and what this portfolio is meant to show.",
        "The goal here is clarity: enough context for a recruiter or hiring manager to know where I can add value quickly."
      )}
      <div class="faq-list reveal">${items}</div>
    </section>
  `;
}

function renderFooter() {
  const contactCards = siteContent.footer.contactCards
    .map(
      (item) => `
        <article class="contact-card">
          <span>${item.label}</span>
          ${
            item.href
              ? `<a href="${item.href}">${item.value}</a>`
              : `<strong>${item.value}</strong>`
          }
        </article>
      `
    )
    .join("");

  const quickLinks = siteContent.footer.quickLinks
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join("");

  return `
    <footer class="site-footer section" id="contact">
      <div class="footer-cta reveal">
        <div>
          <p class="kicker">Contact</p>
          <h2>${siteContent.finalCta.title}</h2>
          <p>${siteContent.finalCta.body}</p>
        </div>
        <div class="footer-cta-actions">
          <a class="button button-primary" href="${siteContent.finalCta.primaryCta.href}">${siteContent.finalCta.primaryCta.label}</a>
          <a class="button button-ghost" href="${siteContent.finalCta.secondaryCta.href}">${siteContent.finalCta.secondaryCta.label}</a>
        </div>
      </div>

      <div class="footer-contact-grid reveal">
        ${contactCards}
      </div>

      <div class="footer-lower reveal">
        <div class="footer-note">
          <p class="kicker">Portfolio Note</p>
          <p>${siteContent.siteSettings.notice}</p>
          <p>${siteContent.footer.note}</p>
        </div>
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>${quickLinks}</ul>
        </div>
      </div>
    </footer>
  `;
}

function renderApp() {
  app.innerHTML = `
    ${renderHero()}
    ${renderApproach()}
    ${renderServices()}
    ${renderPortfolio()}
    ${renderOpportunityLedger()}
    ${renderProcess()}
    ${renderReassurance()}
    ${renderTestimonials()}
    ${renderFaq()}
    ${renderFooter()}
  `;
}

function setIndexedState(buttons, panels, activeIndex) {
  buttons.forEach((item, index) => {
    const active = index === activeIndex;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", active ? "true" : "false");
  });

  panels.forEach((panel, index) => {
    panel.classList.toggle("is-active", index === activeIndex);
  });
}

function initSectionSwitches(selector, panelSelector, dataKey) {
  const buttons = Array.from(document.querySelectorAll(selector));
  const panels = Array.from(document.querySelectorAll(panelSelector));
  if (!buttons.length || !panels.length) return null;

  const setActiveIndex = (activeIndex) => {
    setIndexedState(buttons, panels, activeIndex);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const activeIndex = Number(button.dataset[dataKey]);
      setActiveIndex(activeIndex);
    });
  });

  return {
    buttons,
    count: buttons.length,
    setActiveIndex,
  };
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initHeaderState() {
  const header = document.querySelector("#site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initHeroMotion() {
  const shell = document.querySelector("#hero");
  const stage = document.querySelector("#hero-stage");
  if (!shell || !stage) return;

  const audienceNotes = Array.from(shell.querySelectorAll(".audience-note"));
  let rafId = 0;

  const syncScene = () => {
    rafId = 0;

    const rect = shell.getBoundingClientRect();
    const travel = Math.max(shell.offsetHeight - window.innerHeight, 1);
    const motionScale = window.innerWidth <= 900 ? 0.55 : 1;
    const rawProgress = clamp((window.innerHeight * 0.16 - rect.top) / travel);
    const progress = easeInOutCubic(rawProgress);

    shell.style.setProperty("--copy-shift", `${lerp(0, -72 * motionScale, progress).toFixed(2)}px`);
    shell.style.setProperty("--copy-scale", `${lerp(1, 0.95, progress).toFixed(4)}`);
    shell.style.setProperty("--copy-opacity", `${lerp(1, 0.48, progress).toFixed(3)}`);
    shell.style.setProperty("--copy-blur", `${lerp(0, 7 * motionScale, progress).toFixed(2)}px`);

    stage.style.setProperty("--stage-lift", `${lerp(0, -40 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--stage-scale", `${lerp(1.01, 0.94, progress).toFixed(4)}`);
    stage.style.setProperty("--featured-shift-x", `${lerp(0, 24 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--featured-shift-y", `${lerp(0, -34 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--featured-scale", `${lerp(1, 1.06, progress).toFixed(4)}`);
    stage.style.setProperty("--secondary-shift-x", `${lerp(0, 44 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--secondary-shift-y", `${lerp(0, -78 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--secondary-rotate", `${lerp(0, 10 * motionScale, progress).toFixed(2)}deg`);
    stage.style.setProperty("--tertiary-shift-x", `${lerp(0, -28 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--tertiary-shift-y", `${lerp(0, 58 * motionScale, progress).toFixed(2)}px`);
    stage.style.setProperty("--tertiary-rotate", `${lerp(0, -8 * motionScale, progress).toFixed(2)}deg`);
    stage.style.setProperty("--caption-opacity", `${lerp(0.88, 0.42, progress).toFixed(3)}`);

    const activeNote = Math.min(
      audienceNotes.length - 1,
      Math.floor(progress * audienceNotes.length)
    );
    audienceNotes.forEach((note, index) => {
      note.classList.toggle("is-active", index === activeNote);
    });
  };

  const requestSync = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(syncScene);
  };

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--tilt-x", `${x * 8}deg`);
    stage.style.setProperty("--tilt-y", `${y * -8}deg`);
    stage.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    stage.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  });

  stage.addEventListener("pointerleave", () => {
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
    stage.style.setProperty("--glow-x", "50%");
    stage.style.setProperty("--glow-y", "50%");
  });

  syncScene();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
}

function initPortfolioScroll(controller) {
  const section = document.querySelector("[data-scroll-portfolio]");
  if (!section || !controller?.count) return;

  let rafId = 0;

  const syncScene = () => {
    rafId = 0;

    const rect = section.getBoundingClientRect();
    const progress = clamp(
      (window.innerHeight * 0.42 - rect.top) /
        Math.max(rect.height - window.innerHeight * 0.25, 1)
    );

    section.style.setProperty("--portfolio-progress", progress.toFixed(4));

    if (window.innerWidth <= 960) {
      return;
    }

    const index = Math.min(controller.count - 1, Math.floor(progress * controller.count));
    controller.setActiveIndex(index);
  };

  const requestSync = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(syncScene);
  };

  syncScene();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
}

function hydrateShell() {
  const { siteSettings } = siteContent;

  document.title = siteSettings.metaTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", siteSettings.metaDescription);
  }

  const brandMark = document.querySelector(".brand-mark");
  const brandName = document.querySelector("#brand-name");
  const brandTagline = document.querySelector("#brand-tagline");

  if (brandMark && !brandMark.querySelector("img")) brandMark.textContent = siteSettings.brandInitial;
  if (brandName) brandName.textContent = siteSettings.brandName;
  if (brandTagline) brandTagline.textContent = siteSettings.brandTagline;

  const actionPairs = [
    ["#header-primary-cta", siteSettings.contact.bookingLabel, siteSettings.contact.bookingHref],
    ["#header-secondary-cta", siteSettings.contact.secondaryLabel, siteSettings.contact.secondaryHref],
    ["#mobile-primary-cta", siteSettings.contact.bookingLabel, siteSettings.contact.bookingHref],
    ["#mobile-secondary-cta", siteSettings.contact.secondaryLabel, siteSettings.contact.secondaryHref],
  ];

  actionPairs.forEach(([selector, label, href]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.textContent = label;
    element.setAttribute("href", href);
  });
}

renderApp();
hydrateShell();
const portfolioSwitch = initSectionSwitches(
  ".portfolio-tab",
  "[data-portfolio-panel]",
  "portfolioIndex"
);
initReveals();
initHeaderState();
initHeroMotion();
initPortfolioScroll(portfolioSwitch);
