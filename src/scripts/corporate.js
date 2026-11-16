/* Corporate page: mascot concept builder that feeds the quote form. */
import { $, $$, store, reduceMotion } from './site.js';
import { t, isZh, msg } from './i18n.js';
const form = $('#mascot-form');
const HEX = /^#[0-9a-f]{6}$/i;
const EARS = { bear: t('Bear'), cat: t('Cat'), bunny: t('Bunny') };
const FACES = { happy: t('Friendly'), wink: t('Playful'), cool: t('Confident') };

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map(c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35;
}
// Darken a hex color for outlines.
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(c => Math.round(c * f).toString(16).padStart(2, '0')).join('');
}

function read() {
  const fd = new FormData(form);
  const bodyChoice = fd.get('body');
  const custom = fd.get('bodyCustom');
  return {
    brand: String(fd.get('brand') || '').slice(0, 14),
    ears: EARS[fd.get('ears')] ? fd.get('ears') : 'bear',
    body: bodyChoice === 'custom' ? (HEX.test(custom) ? custom : '#7b3fa0') : (HEX.test(bodyChoice) ? bodyChoice : '#3b7dd8'),
    patch: HEX.test(fd.get('patch')) ? fd.get('patch') : '#ffffff',
    face: FACES[fd.get('face')] ? fd.get('face') : 'happy',
  };
}

function write(s) {
  form.elements.brand.value = s.brand;
  for (const k of ['ears', 'patch', 'face']) {
    const r = form.querySelector(`input[name="${k}"][value="${s[k]}"]`);
    if (r) r.checked = true;
  }
  const preset = form.querySelector(`input[name="body"][value="${s.body}"]`);
  if (preset) preset.checked = true;
  else { form.querySelector('input[name="body"][value="custom"]').checked = true; form.elements.bodyCustom.value = s.body; }
}

let state;
const summary = () => msg.mascotSummary({
  ears: EARS[state.ears],
  body: state.body,
  face: isZh() ? FACES[state.face] : FACES[state.face].toLowerCase(),
  brand: state.brand.trim() || (isZh() ? '你们的 logo' : 'your logo'),
  patch: state.patch,
});

function render() {
  state = read();
  $$('#mascot .m-body').forEach(el => { el.setAttribute('fill', state.body); el.setAttribute('stroke', shade(state.body, 0.82)); el.setAttribute('stroke-width', '3'); });
  $$('#mascot .m-inner').forEach(el => el.setAttribute('fill', isDark(state.body) ? '#f7b7a3' : '#fbd3c6'));
  for (const e of Object.keys(EARS)) $('#ears-' + e).style.display = state.ears === e ? '' : 'none';
  for (const f of Object.keys(FACES)) $('#face-' + f).style.display = state.face === f ? '' : 'none';
  $('#m-patch').setAttribute('fill', state.patch);
  const text = state.brand.trim() || 'LOGO';
  const t = $('#m-brand');
  t.textContent = text;
  t.setAttribute('font-size', text.length <= 5 ? 26 : text.length <= 8 ? 20 : 15);
  // Brand text uses the body color, unless that would be unreadable on the patch.
  t.setAttribute('fill', isDark(state.patch) === isDark(state.body) ? (isDark(state.patch) ? '#ffffff' : '#1b2b22') : state.body);
  $('#mascot-summary').textContent = summary();
  store.set('mascot', state);
}

const saved = store.get('mascot', null);
if (saved && typeof saved === 'object') {
  write({
    brand: typeof saved.brand === 'string' ? saved.brand.slice(0, 14) : 'ACME',
    ears: EARS[saved.ears] ? saved.ears : 'bear',
    body: HEX.test(saved.body) ? saved.body : '#3b7dd8',
    patch: HEX.test(saved.patch) ? saved.patch : '#ffffff',
    face: FACES[saved.face] ? saved.face : 'happy',
  });
}
form.addEventListener('input', e => {
  if (e.target.name === 'bodyCustom') form.querySelector('input[name="body"][value="custom"]').checked = true;
  render();
});
form.addEventListener('submit', e => e.preventDefault());
render();

$('#mascot-cta').addEventListener('click', () => {
  $('#q-product').value = 'mascot';
  if (state.brand.trim()) $('#q-company').value = state.brand.trim();
  $('#q-msg').value = msg.mascotConcept(summary());
  const q = $('#quote-form');
  q.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  q.classList.remove('flash'); void q.offsetWidth; q.classList.add('flash');
  setTimeout(() => $('#q-email').focus({ preventScroll: true }), 500);
});
