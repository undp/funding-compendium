export function initRegularResourcesExperience() {
  const page = document.querySelector('.rr-modern');
  const nav = document.querySelector('.rr-chapter-nav');

  if (!page || !nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const revealItems = Array.from(page.querySelectorAll('[data-rr-reveal]'));
  const chartItems = Array.from(page.querySelectorAll('.echarts'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  revealItems.forEach((item) => {
    const signalCards = Array.from(item.querySelectorAll('.rr-signal-grid > *'));
    const directChildren = Array.from(item.children).filter(
      (child) => child.tagName !== 'SCRIPT'
    );
    const steps = signalCards.length
      ? signalCards
      : directChildren.length === 1 && directChildren[0].classList.contains('grid-x')
        ? Array.from(directChildren[0].children)
        : directChildren;

    steps.slice(0, 8).forEach((step, index) => {
      step.classList.add('rr-reveal-step');
      step.style.setProperty('--rr-reveal-order', index);
    });
  });

  chartItems.forEach((chart) => chart.classList.add('rr-chart-reveal'));

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

  const chartObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-chart-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.18 }
  );

  chartItems.forEach((chart) => chartObserver.observe(chart));

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

export default initRegularResourcesExperience;
