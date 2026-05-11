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
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  function toggleMenu(forceClose) {
    menuOpen = forceClose ? false : !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  burger.addEventListener('click', () => toggleMenu(false));
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(true)));
  document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      toggleMenu(true);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) toggleMenu(true);
  });

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Stagger siblings slightly
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx   = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 75, 280);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ---- Skill bar animation ---- */
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const width = el.getAttribute('data-width') + '%';
        // Slight delay so bar animates after card has appeared
        setTimeout(() => { el.style.width = width; }, 250);
        barObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ---- "Weitere Stationen" toggle ---- */
  const moreBtn      = document.getElementById('moreBtn');
  const moreBtnIcon  = document.getElementById('moreBtnIcon');
  const moreBtnText  = document.getElementById('moreBtnText');
  const extraStations = document.getElementById('extraStations');

  if (moreBtn && extraStations) {
    let extraVisible = false;

    moreBtn.addEventListener('click', () => {
      extraVisible = !extraVisible;

      if (extraVisible) {
        extraStations.classList.add('visible');
        moreBtnText.textContent = 'Weitere Stationen ausblenden';
        moreBtnIcon.style.transform = 'rotate(180deg)';
      } else {
        extraStations.classList.remove('visible');
        moreBtnText.textContent = 'Weitere Stationen anzeigen';
        moreBtnIcon.style.transform = '';
      }
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 130) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--white)';
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Subtle cursor glow — desktop only ---- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'width:320px',
      'height:320px',
      'border-radius:50%',
      'background:radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
      'transform:translate(-50%,-50%)',
      'transition:left 0.55s ease,top 0.55s ease',
      'z-index:0',
      'will-change:left,top',
    ].join(';');
    document.body.appendChild(glow);

    let rafId;
    document.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
      });
    }, { passive: true });
  }

})();
