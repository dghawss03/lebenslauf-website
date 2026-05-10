/* ============================================================
   PORTFOLIO SCRIPT — Dariush Ghawss
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  function toggleMenu(forceClose = false) {
    menuOpen = forceClose ? false : !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  burger.addEventListener('click', () => toggleMenu());
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(true)));

  document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      toggleMenu(true);
    }
  });

  /* ---- Reveal on scroll (IntersectionObserver) ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings inside the same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 300);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ---- Skill bar animation ---- */
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width') + '%';
          setTimeout(() => {
            target.style.width = width;
          }, 200);
          barObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ---- Smooth active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 120) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--white)';
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Subtle cursor glow (desktop only) ---- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 340px;
      height: 340px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.6s ease, top 0.6s ease;
      z-index: 0;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    let rafId;
    document.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }, { passive: true });
  }

  /* ---- Typing effect for hero title ---- */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Only run on first load
    heroTitle.style.opacity = '1';
  }

  /* ---- Number counter for a nice stat effect (if needed later) ---- */
  function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ---- Contact form feedback (placeholder for real form submission) ---- */
  const primaryBtn = document.querySelector('.contact__text .btn--primary');
  if (primaryBtn) {
    primaryBtn.addEventListener('click', (e) => {
      // Let mailto: links work naturally;
      // For a real form you'd intercept here.
    });
  }

  /* ---- Keyboard accessibility: close mobile menu on Escape ---- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) toggleMenu(true);
  });

  /* ---- Init ---- */
  console.log('%c Dariush Ghawss Portfolio ', 'background:#3b82f6;color:#fff;font-family:monospace;padding:4px 8px;border-radius:4px;');
})();
