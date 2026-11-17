/* Home page: Momo (an SVG illustration) follows the pointer with its eyes and squeezes
   when its button is pressed; plus the sketch-to-colour comparison slider.
   The Burrow Mole concept renderings are static images and are never animated. */
import { $, reduceMotion } from './site.js';
import { HOME_LINES, msg } from './i18n.js';

const momo = $('#momo');
const momoBtn = $('#momo-btn');
const eyes = $('#eyes');
const bubble = $('#bubble');
const LINES = HOME_LINES();
let line = 0, bubbleTimer;

if (momo && eyes && !reduceMotion) {
  let raf = 0, px = 0, py = 0;
  window.addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = momo.getBoundingClientRect();
      // Eye center is ~46% down the SVG.
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.46;
      const dx = px - cx, dy = py - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300) * 6;
      eyes.setAttribute('transform', `translate(${(dx / d * k).toFixed(2)} ${(dy / d * k).toFixed(2)})`);
    });
  }, { passive: true });
}

function squeeze() {
  if (!reduceMotion) { momo.classList.remove('squeeze'); void momo.getBBox(); momo.classList.add('squeeze'); }
  bubble.textContent = LINES[line++ % LINES.length];
  bubble.classList.remove('hide');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.add('hide'), 2800);
}
// A real <button> wraps the SVG, so Enter/Space work natively and it is focusable.
if (momo && momoBtn && bubble) {
  momoBtn.addEventListener('click', squeeze);
  setTimeout(() => bubble.classList.add('hide'), 4000);
}

const compare = $('#compare');
const range = $('#compare-range');
if (compare && range) {
  const setPos = () => {
    compare.style.setProperty('--pos', range.value + '%');
    range.setAttribute('aria-valuetext', msg.compareValuetext(range.value));
  };
  range.addEventListener('input', setPos);
  setPos();
}
