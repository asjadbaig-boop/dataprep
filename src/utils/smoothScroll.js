export function smoothScrollTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navHeight = 88;
  const offset = 20;
  const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
