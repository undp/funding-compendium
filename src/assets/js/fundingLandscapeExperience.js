export function initFundingLandscapeExperience() {
  const page = document.querySelector('.fl-modern');
  const nav = document.querySelector('.fl-chapter-nav');

  if (!page || !nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const revealItems = Array.from(page.querySelectorAll('[data-fl-reveal]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  page.classList.add('is-ready');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === `#${visible.target.id}`
        );
      });
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.6] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

export default initFundingLandscapeExperience;
