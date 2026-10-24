import { escapeHtml as e, safeImageUrl } from '../lib/html.js';

export function projectCard(project) {
  return `<article class="project-card project-card--${project.layout === 'large' ? 'large' : 'small'}">
    <a class="project-link" href="#project/${encodeURIComponent(project.slug)}" aria-label="${e(project.title)} — открыть демонстрационный проект">
      <div class="project-image"><img src="${safeImageUrl(project.image)}" alt="${e(project.alt)}" width="900" height="1000" loading="lazy" /><span class="project-open" aria-hidden="true">↗</span></div>
      <div class="project-meta"><span class="project-number">${e(project.number)}</span><div><h3>${e(project.title)}</h3><p>${e(project.subtitle)}</p></div><span class="project-category">${e(project.category)}<br />${e(project.year)}</span></div>
    </a>
  </article>`;
}
