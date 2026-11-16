/* Photo-to-plush page: local photo preview (never uploaded) and style options. */
(() => {
  'use strict';
  const { $, $$ } = window.SC;
  const form = $('#photo-form');
  const box = $('#photo-box');
  const cap = $('#photo-cap');
  const input = $('#photo-in');
  const PRICES = { 25: 89, 35: 129 };
  const HAIR = { short: '短发', long: '长发', bun: '发髻' };
  const EXTRA = { none: '', glasses: '眼镜', santa: '圣诞帽' };
  let objectUrl = null;

  input.addEventListener('change', () => {
    const f = input.files && input.files[0];
    if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
    box.textContent = '';
    if (!f || !f.type.startsWith('image/')) {
      box.innerHTML = '照片放在<br>这里';
      cap.textContent = '原图';
      return;
    }
    objectUrl = URL.createObjectURL(f);
    const img = new Image();
    img.alt = '你上传的照片';
    img.src = objectUrl;
    box.append(img);
    cap.textContent = '你的照片';
  });

  function render() {
    const fd = new FormData(form);
    const hair = HAIR[fd.get('hair')] || 'short';
    const extra = Object.prototype.hasOwnProperty.call(EXTRA, fd.get('extra')) ? fd.get('extra') : 'none';
    const size = PRICES[fd.get('size')] ? fd.get('size') : '25';
    $$('#chibi .c-hair').forEach(el => el.setAttribute('fill', fd.get('hairColor')));
    $$('#chibi .c-skin').forEach(el => el.setAttribute('fill', fd.get('skin')));
    $$('#chibi .c-outfit').forEach(el => el.setAttribute('fill', fd.get('outfit')));
    $('#c-long').style.display = hair === 'long' ? '' : 'none';
    $('#c-bun').style.display = hair === 'bun' && extra !== 'santa' ? '' : 'none';
    $('#c-glasses').style.display = extra === 'glasses' ? '' : 'none';
    $('#c-santa').style.display = extra === 'santa' ? '' : 'none';
    $('#photo-price').textContent = '$' + PRICES[size];
    $('#chibi-summary').textContent = `${size} cm 玩偶 · ${hair}${EXTRA[extra] ? ' · ' + EXTRA[extra] : ''}`;
  }
  form.addEventListener('input', render);
  form.addEventListener('change', render);
  // After the shared prototype handler resets the form, clear the photo too.
  form.addEventListener('proto-reset', () => { input.dispatchEvent(new Event('change')); render(); });
  render();
})();
