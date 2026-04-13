/* ============================================================
   COMPARED TO WHAT? — App JS
   Scroll reveal, nav highlighting, scale bar animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Scale bar animation ── */
  const scaleBars = document.querySelectorAll('.scale-bar');
  const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // trigger reflow so transition fires
        const bar = entry.target;
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = targetWidth;
          });
        });
        scaleObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  scaleBars.forEach(bar => {
    const originalWidth = bar.style.width;
    bar.dataset.targetWidth = originalWidth;
    bar.style.width = '0';
    scaleObserver.observe(bar);
  });

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(4, 6, 10, 0.97)';
    } else {
      nav.style.background = 'rgba(4, 6, 10, 0.85)';
    }
  }, { passive: true });

  /* ── Active nav link highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#d4a056';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ── Stagger framework cards ── */
  const frameworkItems = document.querySelectorAll('.framework-item');
  frameworkItems.forEach((item, i) => {
    item.style.setProperty('--i', i);
    item.style.transitionDelay = `${i * 0.12}s`;
  });

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
