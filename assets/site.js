document.documentElement.classList.add('js-ready');

const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('#primary-nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const imageLightbox = document.querySelector('#image-lightbox');
const lightboxImage = document.querySelector('#image-lightbox-image');
const lightboxCaption = document.querySelector('#image-lightbox-caption');
const lightboxClose = document.querySelector('[data-lightbox-close]');

if (imageLightbox && lightboxImage && lightboxCaption && typeof imageLightbox.showModal === 'function') {
  document.querySelectorAll('[data-image-preview]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const image = trigger.querySelector('img');
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = trigger.dataset.previewCaption || image.alt;
      imageLightbox.showModal();
      lightboxClose?.focus();
    });
  });
  lightboxClose?.addEventListener('click', () => imageLightbox.close());
  imageLightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      imageLightbox.close();
    }
  });
  imageLightbox.addEventListener('cancel', (event) => {
    event.preventDefault();
    imageLightbox.close();
  });
  imageLightbox.addEventListener('click', (event) => {
    if (event.target === imageLightbox) imageLightbox.close();
  });
  imageLightbox.addEventListener('close', () => { lightboxImage.removeAttribute('src'); });
}
