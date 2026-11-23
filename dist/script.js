const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Fechar' : 'Menu';
  navigation.classList.toggle('is-open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu';
  }
});
document.getElementById('year').textContent = String(new Date().getFullYear());

const motionTargets = document.querySelectorAll('.section h2, .section .section-kicker, .section figure, .section .service__copy > p, .section .intro__text > p, .section .steps__item, .section .gallery__head, .section details, .section .location__map');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const entrance = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entrance.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: .05 });
  motionTargets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    entrance.observe(target);
  });
}
