export function initHomepageExperience() {
  const page = document.querySelector('.fc-home-content');

  if (!page) return;

  const sections = Array.from(page.querySelectorAll(':scope > section'));

  sections.forEach((section) => {
    section.classList.add('fc-home-reveal');

    const steps = section.classList.contains('fc-explore')
      ? [
          section.querySelector('h2'),
          section.querySelector('.fc-section-intro'),
          ...section.querySelectorAll('.fc-featured-report')
        ]
      : [
          section.querySelector('h2'),
          ...section.querySelectorAll('.fc-highlight-card'),
          ...section.querySelectorAll('.fc-partner-card')
        ];

    steps.filter(Boolean).forEach((step, index) => {
      step.classList.add('fc-home-reveal-step');
      step.style.setProperty('--fc-home-reveal-order', index);
    });
  });

  page.classList.add('is-ready');

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  sections.forEach((section) => observer.observe(section));
}

export default initHomepageExperience;
