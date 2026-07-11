(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (innerWidth <= 1020) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
      }));
    }

    const switcher = document.querySelector('.language-switcher');
    const trigger = document.querySelector('.lang-trigger');
    if (switcher && trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = switcher.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', (e) => {
        if (!switcher.contains(e.target)) { switcher.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { switcher.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
      });
    }

    // Keep language switching testable on localhost and GitHub Pages project URLs,
    // while production links point to their canonical regional domains.
    document.querySelectorAll('.lang-option[data-local]').forEach(link => {
      link.addEventListener('click', e => {
        const host = location.hostname.toLowerCase();
        const localMode = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.github.io') || location.protocol === 'file:';
        if (localMode) { e.preventDefault(); location.href = link.dataset.local; }
      });
    });

    const hero = document.querySelector('[data-slider]');
    if (hero) {
      const slides = [...hero.querySelectorAll('.hero-slide')];
      const dots = [...hero.querySelectorAll('.hero-dots button')];
      const title = hero.querySelector('.hero-content [data-title]');
      const copy = hero.querySelector('.hero-content [data-copy]');
      const eyebrow = hero.querySelector('.hero-content [data-eyebrow]');
      const primary = hero.querySelector('.hero-content [data-primary]');
      const secondary = hero.querySelector('.hero-content [data-secondary]');
      let active = 0;
      let timer;
      const show = (index) => {
        active = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === active));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
        const slide = slides[active];
        const content = hero.querySelector('.hero-content');
        if (content) content.classList.add('is-changing');
        window.setTimeout(() => {
          if (title) title.innerHTML = slide.dataset.title || '';
          if (copy) copy.textContent = slide.dataset.copy || '';
          if (eyebrow) eyebrow.textContent = slide.dataset.eyebrow || '';
          if (primary) { primary.textContent = slide.dataset.primary || ''; primary.href = slide.dataset.primaryHref || '#'; }
          if (secondary) { secondary.textContent = slide.dataset.secondary || ''; secondary.href = slide.dataset.secondaryHref || '#'; }
          if (content) content.classList.remove('is-changing');
        }, 160);
      };
      const stop = () => { if (timer) clearInterval(timer); };
      const start = () => { stop(); timer = setInterval(() => show(active + 1), 7200); };
      hero.querySelector('.hero-arrow.prev')?.addEventListener('click', () => { show(active - 1); start(); });
      hero.querySelector('.hero-arrow.next')?.addEventListener('click', () => { show(active + 1); start(); });
      dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', start);
      show(0); start();
    }


    // Resilient image loading: if a WebP asset is unavailable on a static host,
    // retry the matching PNG asset instead of leaving an empty visual.
    document.querySelectorAll('img[src$=".webp"]').forEach(img => {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackTried) return;
        img.dataset.fallbackTried = 'true';
        img.src = img.getAttribute('src').replace(/\.webp(?:\?.*)?$/i, '.png');
      });
    });

    const reveals = [...document.querySelectorAll('.reveal')];
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => observer.observe(el));
    } else reveals.forEach(el => el.classList.add('visible'));

    document.querySelectorAll('.cursor-glow').forEach(card => {
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });

    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const subject = encodeURIComponent(`${data.get('subject') || 'Website enquiry'} — ${data.get('name') || ''}`);
        const body = encodeURIComponent([
          `Name: ${data.get('name') || ''}`,
          `Company: ${data.get('company') || ''}`,
          `Email: ${data.get('email') || ''}`,
          `Phone: ${data.get('phone') || ''}`,
          '',
          data.get('message') || ''
        ].join('\n'));
        location.href = `mailto:info@eastbridgetechnologies.com?subject=${subject}&body=${body}`;
      });
    }

    // Fallback regional routing. For SEO-grade 301 routing, use the included Cloudflare rules/Worker.
    const host = location.hostname.toLowerCase();
    const path = location.pathname;
    const isAsset = /\.(css|js|png|jpe?g|webp|svg|xml|txt|json|ico|woff2?)$/i.test(path);
    if (!isAsset && (host === 'eastbridge.my' || host === 'www.eastbridge.my') && !path.startsWith('/ms/')) {
      const target = document.documentElement.dataset.msPath || '/ms/';
      if (path === '/' || document.documentElement.lang !== 'ms') location.replace(target + location.search + location.hash);
    }
    if (!isAsset && (host === 'eastbridge.sg' || host === 'www.eastbridge.sg') && !path.startsWith('/zh/')) {
      const target = document.documentElement.dataset.zhPath || '/zh/';
      if (path === '/' || !document.documentElement.lang.startsWith('zh')) location.replace(target + location.search + location.hash);
    }
  });
})();
