(() => {
  const nav = document.querySelector('.sidebar nav');
  if (!nav) return;
  const button = document.createElement('button');
  button.innerHTML = '▥ <span>학과 소개</span>';
  button.setAttribute('aria-label', '학과 소개');
  button.addEventListener('click', () => { location.href = 'campus.html'; });
  nav.insertBefore(button, nav.children[2]);
})();
