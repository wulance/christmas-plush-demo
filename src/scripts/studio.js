/* Studio page: the sketch-to-colour comparison slider (Momo is a drawing, not a product). */
import { $ } from './site.js';
import { msg } from './i18n.js';

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
