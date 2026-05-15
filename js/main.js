/* =========================================================
   MERGE EMPIRE FC — WEBSITE JS
   ========================================================= */

/* --- Navbar scroll effect ------------------------------ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* --- Mobile nav toggle --------------------------------- */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close menu when a link is tapped
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* --- Scroll-reveal animations -------------------------- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();

/* --- Animated stat counters ---------------------------- */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();

    const tick = now => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach(el => observer.observe(el));
})();

/* --- Card row drag-to-scroll --------------------------- */
(function initCardScroll() {
  const wrapper = document.getElementById('cardsScroll');
  if (!wrapper) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', e => {
    isDown = true;
    wrapper.style.cursor = 'grabbing';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.6;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // Touch swipe (let browser handle naturally, just block vertical on horizontal scroll)
  let touchStartX = 0;
  let touchStartY = 0;

  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  wrapper.addEventListener('touchmove', e => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > dy && dx > 8) e.stopPropagation();
  }, { passive: true });
})();

/* --- Smooth anchor scroll for nav links ---------------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
        10
      ) || 68;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: 'smooth'
      });
    });
  });
})();

/* --- Divisions ladder — staggered entrance ------------- */
(function initDivisionStagger() {
  const rows = document.querySelectorAll('.division-row.reveal');
  rows.forEach((row, i) => {
    row.style.setProperty('--delay', `${i * 60}ms`);
  });
})();

/* --- Parallax on hero background (subtle) -------------- */
(function initParallax() {
  const stadium = document.querySelector('.hero-stadium');
  if (!stadium || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const onScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;
    stadium.style.transform = `translateY(${scrolled * 0.25}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* --- Card hover tilt (mouse tracking) ------------------ */
(function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // skip on touch devices

  const cards = document.querySelectorAll('.player-card');

  cards.forEach(card => {
    const inner = card.querySelector('.pc-inner');
    if (!inner) return;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientX - cx) / (rect.width  / 2)) * 8;
      const ry   = ((e.clientY - cy) / (rect.height / 2)) * -8;
      inner.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = '';
    });
  });
})();

/* --- Hero card entrance animation override on load ----- */
(function initHeroEntrance() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(24px)';

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  });
})();
