import { getProjects } from './lib/project-repository.js';
import { projectCard } from './components/project-card.js';
import { projectDetail } from './components/project-detail.js';

const grid = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#case-content');
let projects = [];
let returnFocus;

function closeProject() {
  if (location.hash.startsWith('#project/')) history.replaceState(null, '', '#work');
  if (dialog.open) dialog.close();
}

function syncProject() {
  if (!location.hash.startsWith('#project/')) {
    if (dialog.open) dialog.close();
    return;
  }
  const slug = location.hash.slice('#project/'.length);
  const index = projects.findIndex(project => encodeURIComponent(project.slug) === slug);
  if (index < 0) {
    closeProject();
    return;
  }
  if (!dialog.open) returnFocus = document.activeElement;
  content.innerHTML = projectDetail(projects[index], projects[(index + 1) % projects.length]);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  content.querySelector('[data-close]').focus({ preventScroll: true });
}

dialog.addEventListener('click', event => {
  if (event.target === dialog || event.target.closest('[data-close]')) closeProject();
});
dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  returnFocus?.focus({ preventScroll: true });
});
window.addEventListener('hashchange', syncProject);

try {
  projects = await getProjects();
  grid.innerHTML = projects.map(projectCard).join('');
  document.querySelector('.nav-count').textContent = String(projects.length).padStart(2, '0');
  document.querySelector('.superscript').textContent = `(${String(projects.length).padStart(2, '0')})`;
  syncProject();
} catch (error) {
  grid.innerHTML = '<p role="status">Не удалось загрузить проекты. Попробуйте обновить страницу.</p>';
  console.error('Project loading failed', error);
}
