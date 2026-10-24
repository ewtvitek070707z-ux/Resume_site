import { contacts } from '../data/contacts.js';
import { escapeHtml as e } from '../lib/html.js';

function contactRow(contact) {
  // Only explicit supported contact schemes may become live links.
  const active = contact.href && /^(https:\/\/|mailto:|tel:)/i.test(contact.href);
  const tag = active ? 'a' : 'span';
  return `<${tag} class="contact-row${active ? '' : ' contact-row--placeholder'}" ${active ? `href="${e(contact.href)}"` : 'aria-disabled="true"'}>
    <span class="contact-label">${e(contact.label)}</span>
    <span class="contact-value">${e(contact.display)}</span>
    <span class="contact-status">${active ? '↗' : 'Скоро'}</span>
  </${tag}>`;
}

document.querySelector('#contact-links').innerHTML = contacts.map(contactRow).join('');
