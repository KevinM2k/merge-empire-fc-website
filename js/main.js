/* =========================================================
   MERGE EMPIRE FC — website behaviour
   Motion here exists to explain the mechanic: the pack deals,
   the ladder reveals in order. Everything is gated on
   prefers-reduced-motion. See /DESIGN.md.
   ========================================================= */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- navbar background once you leave the top ------------ */
(function navbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* --- mobile nav ------------------------------------------ */
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const set = open => {
    toggle.classList.toggle('open', open);
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => set(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') set(false); });
})();

/* --- deal the pack --------------------------------------- */
(function pack() {
  const pack = document.getElementById('pack');
  const deal = document.getElementById('deal');
  if (!pack || !deal) return;

  const label = () => deal.textContent =
    pack.classList.contains('opened') ? 'Shuffle back' : 'Open the pack';

  deal.addEventListener('click', () => { pack.classList.toggle('opened'); label(); });

  // Deal it once unprompted: the mechanic should be visible without a click.
  if (!reduce) setTimeout(() => { pack.classList.add('opened'); label(); }, 900);

  // Pointer tilt, fine pointers only — a hand of cards has weight.
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    pack.addEventListener('pointermove', e => {
      const r = pack.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      pack.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
    });
    pack.addEventListener('pointerleave', () => { pack.style.transform = ''; });
  }
})();

/* --- reveal on scroll, in sequence ------------------------ */
(function reveal() {
  const items = document.querySelectorAll('.rung, .div-row, .asset');
  if (!items.length) return;
  if (reduce) { items.forEach(el => el.classList.add('in')); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('in'), i * 55);
      io.unobserve(entry.target);
    });
  }, { threshold: .2, rootMargin: '0px 0px -40px' });

  items.forEach(el => io.observe(el));
})();

/* --- the store bar follows you past the hero -------------- */
(function storeBar() {
  const bar = document.getElementById('bar');
  const arena = document.querySelector('.arena');
  if (!bar || !arena) { if (bar) bar.classList.add('show'); return; }
  new IntersectionObserver(([e]) => bar.classList.toggle('show', !e.isIntersecting), { threshold: .15 })
    .observe(arena);
})();
