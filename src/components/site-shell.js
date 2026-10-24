const pages = [
  { id: 'work', href: './index.html', label: 'Работы' },
  { id: 'about', href: './about.html', label: 'Обо мне' },
  { id: 'contacts', href: './contacts.html', label: 'Контакты' },
];
const current = document.body.dataset.page;

document.querySelector('[data-site-header]').innerHTML = `
  <a class="wordmark" href="./index.html" aria-label="Надежда, на главную">надежда<span aria-hidden="true">↗</span></a>
  <span class="header-description">Графический дизайнер<br />Портфолио / первый эскиз</span>
  <nav aria-label="Основная навигация">${pages.map(page => `<a href="${page.href}"${page.id === current ? ' aria-current="page"' : ''}>${page.label}</a>`).join('')}</nav>`;

document.querySelector('[data-site-footer]').innerHTML = `
  <a class="wordmark" href="./index.html">надежда<span aria-hidden="true">↗</span></a>
  <span>Визуальная концепция / 2026</span>
  <span>Сделано с вниманием к деталям.</span>`;
