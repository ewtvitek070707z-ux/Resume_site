import { escapeHtml as e, safeImageUrl } from '../lib/html.js';

export function projectDetail(project, next) {
  return `<div class="case-shell">
    <header class="case-header"><span class="small-label">Проект ${e(project.number)} / Демонстрационная концепция</span><button class="close-button" type="button" data-close autofocus aria-label="Закрыть проект">Закрыть <span aria-hidden="true">×</span></button></header>
    <div class="case-heading"><h2 id="case-title">${e(project.title)}</h2><span>${e(project.category)}<br />${e(project.year)}</span></div>
    <p class="case-subtitle">${e(project.subtitle)}</p>
    <img class="case-cover" src="${safeImageUrl(project.image)}" alt="${e(project.alt)}" width="900" height="1000" />
    <div class="case-story"><div><span class="small-label">Идея</span><p>${e(project.idea)}</p></div><div><span class="small-label">Визуальный подход</span><p>${e(project.approach)}</p><p class="muted">${e(project.role)}</p></div></div>
    <p class="demo-note">Учебный визуальный материал для этого прототипа. Не является реальным проектом или опытом Надежды.</p>
    <a class="next-project" href="#project/${encodeURIComponent(next.slug)}"><span>Следующий проект</span><strong>${e(next.title)}</strong><span aria-hidden="true">↗</span></a>
  </div>`;
}
