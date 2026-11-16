/* Home page: Momo's eyes follow the pointer, squeeze on click,
   and the sketch-to-plush comparison slider. */
(() => {
  'use strict';
  const { $, reduceMotion } = window.SC;

  const momo = $('#momo');
  const eyes = $('#eyes');
  const bubble = $('#bubble');
  const LINES = [
    'Hee hee, that tickles!',
    'Our designers drew me by hand.',
    'I started as a pencil sketch.',
    'I can wear your company colors!',
    'Want one of me with your logo?',
    "Soft and squeezable — I'm just a prototype mascot.",
  ];
  let line = 0, bubbleTimer;

  if (!reduceMotion) {
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
  momo.addEventListener('click', squeeze);
  momo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); squeeze(); } });
  setTimeout(() => bubble.classList.add('hide'), 4000);

  const compare = $('#compare');
  const range = $('#compare-range');
  const setPos = () => compare.style.setProperty('--pos', range.value + '%');
  range.addEventListener('input', setPos);
  setPos();
})();
