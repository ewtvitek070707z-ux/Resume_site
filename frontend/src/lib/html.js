export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function safeImageUrl(value) {
  const url = new URL(value, window.location.href);
  return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : '';
}
