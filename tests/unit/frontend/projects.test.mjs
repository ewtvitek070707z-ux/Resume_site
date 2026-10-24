import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { projects } from '../../../frontend/src/data/projects.js';
import { escapeHtml, safeImageUrl } from '../../../frontend/src/lib/html.js';

test('Every project has a unique route, descriptive content and an existing local cover', async () => {
  assert.equal(new Set(projects.map(project => project.slug)).size, projects.length);
  for (const project of projects) {
    for (const field of ['title', 'category', 'alt', 'idea', 'approach', 'role']) assert.ok(project[field]?.trim());
    assert.match(project.slug, /^[a-z0-9-]+$/);
    await access(new URL('../../../frontend/' + project.image, import.meta.url));
  }
});

test('Dynamic content is escaped and executable image URLs are rejected', () => {
  assert.equal(escapeHtml('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;');
  globalThis.window = { location: { href: 'http://localhost:5173/' } };
  try {
    assert.equal(safeImageUrl('javascript:alert(1)'), '');
    assert.equal(safeImageUrl('data:text/html,test'), '');
    assert.equal(safeImageUrl('./public/images/tishe.svg'), 'http://localhost:5173/public/images/tishe.svg');
  } finally { delete globalThis.window; }
});
