/* Snugglecraft Christmas landing page prototype.
   Everything here is progressive enhancement: the page content and SEO text are
   in the HTML, so search engines and no-JS visitors still get the full page. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sc_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('sc_' + k, JSON.stringify(v)); } catch { /* private mode */ } },
  };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = () => new Date();
  const YEAR = now().getFullYear();

  /* ---------- Toast + cart ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
  }
  let cart = store.get('cart', 0);
  const cartCount = $('#cart-count');
  const renderCart = () => { cartCount.textContent = cart; };
  function addToCart(label) {
    cart += 1;
    store.set('cart', cart);
    renderCart();
    cartCount.classList.remove('bump'); void cartCount.offsetWidth; cartCount.classList.add('bump');
    toast(`Added to cart: ${label}. (Prototype: there's no checkout yet.)`);
  }
  renderCart();

  $$('[data-lang]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    toast(`The ${a.textContent} version comes in the full build. The hreflang tags are already in the page.`);
  }));

  /* ---------- Ornaments ---------- */
  const ORN = {
    berry: { name: 'Berry bauble', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="16" y="3" width="8" height="6" rx="2" fill="#d9a33a"/><circle cx="20" cy="23" r="14" fill="#c8323a"/><path d="M7 21 Q20 28 33 21" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 2.5" fill="none" opacity=".8"/><circle cx="14" cy="17" r="3.5" fill="#fff" opacity=".35"/></svg>' },
    gold: { name: 'Gold bauble', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="16" y="3" width="8" height="6" rx="2" fill="#b9862a"/><circle cx="20" cy="23" r="14" fill="#e8b33c"/><path d="M6.5 19 H33.5 M6.5 27 H33.5" stroke="#c8323a" stroke-width="3"/><circle cx="14" cy="16" r="3.5" fill="#fff" opacity=".4"/></svg>' },
    star: { name: 'Smiley star', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 L25 14.5 L37.5 15.5 L28 24 L31 36.5 L20 30 L9 36.5 L12 24 L2.5 15.5 L15 14.5 Z" fill="#f2c14e" stroke="#c99520" stroke-width="1.5" stroke-linejoin="round"/><circle cx="16.5" cy="20" r="1.7" fill="#3a2a22"/><circle cx="23.5" cy="20" r="1.7" fill="#3a2a22"/><path d="M17.5 24 Q20 26.5 22.5 24" stroke="#3a2a22" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>' },
    bell: { name: 'Jingle bell', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 8 C12 8 10 15 10 21 L7.5 31 H32.5 L30 21 C30 15 28 8 20 8 Z" fill="#e0a83a" stroke="#b9862a" stroke-width="1.5"/><circle cx="20" cy="33" r="3.5" fill="#c8323a"/><ellipse cx="15" cy="6" rx="5" ry="3" fill="#2e7d4f"/><ellipse cx="25" cy="6" rx="5" ry="3" fill="#2e7d4f"/><circle cx="20" cy="7" r="2.5" fill="#c8323a"/></svg>' },
    ginger: { name: 'Gingerbread', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="#b8743f"><circle cx="20" cy="10" r="7"/><rect x="12" y="15" width="16" height="15" rx="6"/><rect x="4" y="17" width="11" height="6" rx="3"/><rect x="25" y="17" width="11" height="6" rx="3"/><rect x="12" y="26" width="7" height="12" rx="3.5"/><rect x="21" y="26" width="7" height="12" rx="3.5"/></g><circle cx="17.5" cy="9" r="1.2" fill="#fff"/><circle cx="22.5" cy="9" r="1.2" fill="#fff"/><path d="M17 12.5 Q20 14.5 23 12.5" stroke="#fff" stroke-width="1.1" fill="none"/><circle cx="20" cy="19" r="1.4" fill="#c8323a"/><circle cx="20" cy="24" r="1.4" fill="#2e7d4f"/></svg>' },
    cane: { name: 'Candy cane', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M25 37 V14 A7 7 0 0 0 11 14" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M25 37 V14 A7 7 0 0 0 11 14" stroke="#c8323a" stroke-width="7" stroke-dasharray="4 4" fill="none"/></svg>' },
    flake: { name: 'Snowflake', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#6aa9dc" stroke-width="3" stroke-linecap="round" fill="none"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/><g transform="rotate(60 20 20)"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/></g><g transform="rotate(120 20 20)"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/></g></g></svg>' },
    gift: { name: 'Tiny gift', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="15" width="28" height="21" rx="4" fill="#2e7d4f"/><rect x="18" y="15" width="4" height="21" fill="#f2c14e"/><rect x="6" y="22" width="28" height="4" fill="#f2c14e"/><ellipse cx="15" cy="12" rx="6" ry="4" fill="none" stroke="#f2c14e" stroke-width="3"/><ellipse cx="25" cy="12" rx="6" ry="4" fill="none" stroke="#f2c14e" stroke-width="3"/></svg>' },
  };
  const ORN_KEYS = Object.keys(ORN);

  /* ---------- Decorate the tree ---------- */
  const TW = 300, TH = 380, MAX = 24;
  const stage = $('#tree-stage');
  const layer = $('#tree-layer');
  const palette = $('#orn-palette');
  let placed = store.get('tree', []).filter(p => ORN[p.type] && Number.isFinite(p.x) && Number.isFinite(p.y)).slice(0, MAX);
  let uid = Date.now();
  let suppressClick = false;

  const inTree = (x, y) => y >= 26 && y <= 302 && Math.abs(x - 150) <= (y - 20) / 285 * 118;
  const onFace = (x, y) => x > 110 && x < 190 && y > 172 && y < 222;

  function ornEl(type) {
    const d = document.createElement('div');
    d.className = 'orn';
    d.innerHTML = ORN[type].svg;
    return d;
  }

  for (const k of ORN_KEYS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'orn-btn squish';
    b.dataset.type = k;
    b.innerHTML = `${ORN[k].svg}<span>${ORN[k].name}</span>`;
    b.setAttribute('aria-label', `Add ${ORN[k].name} to the tree`);
    palette.append(b);
  }

  function renderTree(popId) {
    layer.textContent = '';
    placed.forEach((p, i) => {
      const el = ornEl(p.type);
      el.classList.add('placed');
      if (p.id === popId) el.classList.add('pop');
      el.style.left = (p.x / TW * 100) + '%';
      el.style.top = (p.y / TH * 100) + '%';
      el.dataset.id = p.id;
      el.title = `Day ${i + 1}: ${ORN[p.type].name}. Drag it off the tree to remove it.`;
      layer.append(el);
    });
    const n = placed.length;
    $('#tree-count').textContent = n;
    $('#tree-progress').style.width = (n / MAX * 100) + '%';
    $('#tree-add').disabled = n < MAX;
    $('#tree-fill').disabled = n >= MAX;
    $('#tree-hint').textContent = n >= MAX
      ? 'All 24 days are filled, so your calendar set is ready.'
      : n === 0 ? 'Drag an ornament onto the tree, or tap one to add it.'
      : `${MAX - n} to go. Drag an ornament to move it, or drag it off the tree to remove it.`;
    store.set('tree', placed);
  }

  function toSvg(cx, cy) {
    const r = stage.getBoundingClientRect();
    return { x: (cx - r.left) / r.width * TW, y: (cy - r.top) / r.height * TH };
  }

  function freeSpot() {
    for (let i = 0; i < 400; i++) {
      const y = 58 + Math.random() * 236;
      const hw = (y - 20) / 285 * 118 - 15;
      const x = 150 + (Math.random() * 2 - 1) * hw;
      if (onFace(x, y)) continue;
      const minGap = i < 250 ? 30 : 20;
      if (placed.every(p => Math.hypot(p.x - x, p.y - y) > minGap)) return { x, y };
    }
    return null;
  }

  function add(type, pos) {
    if (placed.length >= MAX) { toast('All 24 days are filled. Drag an ornament off the tree to swap it.'); return false; }
    const p = { id: ++uid, type, x: pos.x, y: pos.y };
    placed.push(p);
    renderTree(p.id);
    return true;
  }

  function autoPlace(type) {
    if (placed.length >= MAX) return add(type, null);
    const spot = freeSpot();
    if (!spot) return toast('No space left. Try dragging the ornament to a spot instead.');
    add(type, spot);
  }

  function beginDrag(e, type, id) {
    if (e.button !== 0) return;
    const sx = e.clientX, sy = e.clientY;
    const existing = id != null ? layer.querySelector(`[data-id="${id}"]`) : null;
    let moved = false, ghost = null;
    const onMove = ev => {
      if (!moved) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
        moved = true;
        ghost = ornEl(type);
        ghost.classList.add('ghost');
        document.body.append(ghost);
        if (existing) existing.style.visibility = 'hidden';
      }
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
      const p = toSvg(ev.clientX, ev.clientY);
      stage.classList.toggle('drop-ok', inTree(p.x, p.y));
    };
    const onUp = ev => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      stage.classList.remove('drop-ok');
      if (!moved) return;
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 60);
      ghost.remove();
      const p = toSvg(ev.clientX, ev.clientY);
      const ok = ev.type === 'pointerup' && inTree(p.x, p.y);
      if (id != null) {
        const item = placed.find(q => q.id === id);
        if (ok) { item.x = p.x; item.y = p.y; }
        else if (ev.type === 'pointerup') { placed = placed.filter(q => q.id !== id); toast(`Removed ${ORN[type].name}.`); }
        renderTree();
      } else if (ok) {
        add(type, p);
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  palette.addEventListener('pointerdown', e => {
    const b = e.target.closest('.orn-btn');
    if (b) beginDrag(e, b.dataset.type, null);
  });
  palette.addEventListener('click', e => {
    const b = e.target.closest('.orn-btn');
    if (b && !suppressClick) autoPlace(b.dataset.type);
  });
  layer.addEventListener('pointerdown', e => {
    const el = e.target.closest('.placed');
    if (!el) return;
    e.preventDefault();
    const id = Number(el.dataset.id);
    const item = placed.find(q => q.id === id);
    if (item) beginDrag(e, item.type, id);
  });
  layer.addEventListener('dragstart', e => e.preventDefault());

  $('#tree-fill').addEventListener('click', () => {
    let guard = 0;
    while (placed.length < MAX && guard++ < 100) {
      const spot = freeSpot();
      if (!spot) break;
      placed.push({ id: ++uid, type: ORN_KEYS[Math.floor(Math.random() * ORN_KEYS.length)], ...spot });
    }
    renderTree();
    $$('.placed', layer).forEach((el, i) => { el.style.animationDelay = (i * 25) + 'ms'; el.classList.add('pop'); });
  });
  $('#tree-reset').addEventListener('click', () => { placed = []; renderTree(); toast('The tree is empty. Start decorating!'); });
  $('#tree-add').addEventListener('click', () => {
    const counts = {};
    placed.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
    store.set('treeMix', counts);
    addToCart('Tree advent calendar with 24 ornaments');
  });
  renderTree();

  /* ---------- Reindeer builder ---------- */
  const BODY = {
    cocoa: { label: 'Cocoa', b: '#8a5a3b', m: '#e6c7a0', h: '#5a3a26', a: '#f0d7b0' },
    caramel: { label: 'Caramel', b: '#c4874f', m: '#f4dcb8', h: '#7a4f2c', a: '#f6e6c8' },
    snow: { label: 'Snow', b: '#f2ebe0', m: '#fffaf3', h: '#c9b9a3', a: '#c89b6c' },
    grey: { label: 'Frost grey', b: '#9b9ca6', m: '#e2e2e8', h: '#62636d', a: '#f0d7b0' },
  };
  const SCARF = { berry: ['Berry', '#c8323a'], pine: ['Pine', '#2e7d4f'], navy: ['Navy', '#263a6b'], gold: ['Gold', '#d9a33a'], custom: ['Custom color', null] };
  const NOSE = { black: '#2b2220', cocoa: '#6b4330', rose: '#e48a9a', berry: '#c8323a' };
  const SIZE = { S: ['20 cm', 29], M: ['30 cm', 39], L: ['45 cm', 59] };
  const ACC = { none: ['No accessory', 0], hat: ['Santa hat', 4], earmuffs: ['Earmuffs', 4], bell: ['Jingle bell', 3] };
  const NAME_PRICE = 5;
  const DEFAULT = { body: 'cocoa', scarf: 'berry', custom: '#7b3fa0', nose: 'black', acc: 'hat', size: 'M', name: '', corp: false, logo: '' };

  const pick = (v, table, d) => (Object.prototype.hasOwnProperty.call(table, v) ? v : d);
  function sanitize(o) {
    o = o && typeof o === 'object' ? o : {};
    return {
      body: pick(o.body, BODY, DEFAULT.body),
      scarf: pick(o.scarf, SCARF, DEFAULT.scarf),
      custom: /^#[0-9a-f]{6}$/i.test(o.custom) ? o.custom : DEFAULT.custom,
      nose: pick(o.nose, NOSE, DEFAULT.nose),
      acc: pick(o.acc, ACC, DEFAULT.acc),
      size: pick(o.size, SIZE, DEFAULT.size),
      name: typeof o.name === 'string' ? o.name.slice(0, 12) : '',
      corp: o.corp === true,
      logo: typeof o.logo === 'string' ? o.logo.slice(0, 16) : '',
    };
  }
  function fromHash() {
    const m = location.hash.match(/^#deer=(.+)$/);
    if (!m) return null;
    try { return JSON.parse(decodeURIComponent(m[1])); } catch { return null; }
  }
  const hashDeer = fromHash();
  let deer = sanitize(hashDeer || store.get('deer', DEFAULT));

  const form = $('#deer-form');
  function writeForm() {
    for (const k of ['body', 'scarf', 'nose', 'acc', 'size']) {
      const r = form.querySelector(`input[name="${k}"][value="${deer[k]}"]`);
      if (r) r.checked = true;
    }
    form.elements.custom.value = deer.custom;
    form.elements.name.value = deer.name;
    form.elements.logo.value = deer.logo;
    form.elements.corp.checked = deer.corp;
  }
  function readForm() {
    const fd = new FormData(form);
    deer = sanitize({
      body: fd.get('body'), scarf: fd.get('scarf'), custom: fd.get('custom'), nose: fd.get('nose'),
      acc: fd.get('acc'), size: fd.get('size'), name: fd.get('name'), corp: fd.has('corp'), logo: fd.get('logo'),
    });
  }
  function isDark(hex) {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map(c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35;
  }
  const scarfHex = () => (deer.scarf === 'custom' ? deer.custom : SCARF[deer.scarf][1]);
  function summary() {
    const parts = [`${SIZE[deer.size][0]} reindeer`, `${BODY[deer.body].label} fur`, `${SCARF[deer.scarf][0]} scarf`, ACC[deer.acc][0]];
    if (deer.corp) parts.push(`"${deer.logo.trim() || 'your logo'}" on the scarf`);
    else if (deer.name.trim()) parts.push(`"${deer.name.trim()}" embroidered`);
    return parts.join(' · ');
  }
  function renderDeer() {
    const b = BODY[deer.body];
    $$('#deer .d-body').forEach(el => el.setAttribute('fill', b.b));
    $$('#deer .d-muzzle').forEach(el => el.setAttribute('fill', b.m));
    $$('#deer .d-hoof').forEach(el => el.setAttribute('fill', b.h));
    $('#d-antlers').setAttribute('stroke', b.a);
    const sc = scarfHex();
    $$('#deer .d-scarf').forEach(el => el.setAttribute('fill', sc));
    $$('#deer .d-scarf-stroke').forEach(el => el.setAttribute('stroke', sc));
    $('#d-nose').setAttribute('fill', NOSE[deer.nose]);
    for (const a of ['hat', 'earmuffs', 'bell']) $('#acc-' + a).style.display = deer.acc === a ? '' : 'none';

    const text = (deer.corp ? (deer.logo.trim() || 'YOUR LOGO') : deer.name.trim());
    const tp = $('#d-name-tp');
    tp.textContent = text;
    const len = text.length;
    const nameEl = $('#d-name');
    nameEl.setAttribute('font-size', len <= 6 ? 17 : len <= 9 ? 14 : 11.5);
    nameEl.setAttribute('fill', isDark(sc) ? '#fff6e0' : '#2b2220');

    form.classList.toggle('is-corp', deer.corp);
    const price = $('#deer-price');
    const cta = $('#deer-cta');
    if (deer.corp) {
      price.innerHTML = 'Volume pricing <small>from 50 pcs</small>';
      cta.textContent = 'Request a quote for this design';
    } else {
      const total = SIZE[deer.size][1] + ACC[deer.acc][1] + (deer.name.trim() ? NAME_PRICE : 0);
      price.textContent = '$' + total;
      cta.textContent = 'Add to cart';
    }
    $('#deer-summary').textContent = summary();
    store.set('deer', deer);
  }
  form.addEventListener('input', e => {
    if (e.target.name === 'custom') form.querySelector('input[name="scarf"][value="custom"]').checked = true;
    readForm();
    renderDeer();
  });
  form.addEventListener('submit', e => e.preventDefault());
  $('#deer-cta').addEventListener('click', () => {
    if (!deer.corp) { addToCart(summary()); return; }
    $('#q-product').value = 'reindeer';
    $('#q-msg').value = `Design from the reindeer builder: ${summary()}. Scarf color: ${scarfHex()}.`;
    const q = $('#quote-form');
    q.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    q.classList.remove('flash'); void q.offsetWidth; q.classList.add('flash');
    setTimeout(() => $('#q-company').focus({ preventScroll: true }), 500);
  });
  $('#deer-share').addEventListener('click', async () => {
    const url = location.href.split('#')[0] + '#deer=' + encodeURIComponent(JSON.stringify(deer));
    try { await navigator.clipboard.writeText(url); toast('Link copied. Anyone who opens it sees this reindeer.'); }
    catch { window.prompt('Copy this link:', url); }
  });
  writeForm();
  renderDeer();
  if (hashDeer) setTimeout(() => $('#reindeer').scrollIntoView(), 50);
  window.addEventListener('hashchange', () => {
    const h = fromHash();
    if (!h) return;
    deer = sanitize(h);
    writeForm();
    renderDeer();
    $('#reindeer').scrollIntoView();
  });

  /* ---------- Online advent calendar ---------- */
  const ADVENT = [
    ['star', 'The first sketch', 'Our first sketch of the tree calendar had 25 ornaments. We cut one, so the 24th door is the star.'],
    ['berry', 'Gift code', 'Get 10% off any tree calendar today with code <code>DOOR2</code>.'],
    ['ginger', 'How we chose the cinnamon', 'The gingerbread fabric went through 14 shades before it looked warm enough.'],
    ['flake', 'Embroidered eyes', 'We embroider eyes instead of using plastic ones, so nothing can come loose for little hands.'],
    ['cane', 'Pattern peek', 'The candy cane is just two pattern pieces. The stripes are printed, not sewn.'],
    ['gift', 'Free gift wrap', 'Free gift wrap on every order today.'],
    ['bell', 'The bell problem', 'Real bells jingle but they are not safe for toddlers. Ours have a soft rattle inside instead.'],
    ['gold', 'Gift code', 'Free embroidered name on any reindeer with code <code>NAME8</code>.'],
    ['star', 'Meet the designer', 'Every face is drawn by hand. The tree’s smile took 30 versions.'],
    ['berry', 'Plush care tip', 'Wash on cold in a pillowcase, then let it air-dry. Fluff it up with a hairdryer on cool.'],
    ['ginger', 'Coloring page', 'Download a coloring page of our gingerbread family (coming soon).'],
    ['gift', 'Gift code', '15% off company orders confirmed this week: <code>TEAM12</code>.'],
    ['flake', 'Behind the seams', 'One reindeer has 23 pattern pieces and takes about 40 minutes to sew.'],
    ['cane', 'A family idea', 'Some families hide the next ornament around the house each morning.'],
    ['bell', 'Last call for personalization', 'Personalized orders need 2 extra days. Check your country’s deadline below.'],
    ['gold', 'Fabric fact', 'Our short-pile plush is made with recycled polyester fiber.'],
    ['star', 'Gift code', 'Free express upgrade over $80 with code <code>FAST17</code>.'],
    ['berry', 'From the photo team', 'You can turn your pet into a plush with our photo-to-plush service.'],
    ['ginger', 'A reindeer name', 'Customers’ most popular reindeer name this year: “Biscuit”.'],
    ['gift', 'Thank you', 'A thank-you note from our sewing team, with a photo.'],
    ['flake', 'Gift code', 'Buy two reindeer and get a third for half price with code <code>HERD21</code>.'],
    ['cane', 'Packing day', 'Each calendar is packed in a reusable cotton storage bag.'],
    ['bell', 'Almost there', 'Tomorrow the star goes on top. Get the camera ready.'],
    ['star', 'Merry Christmas!', 'The star goes on top. Thank you for decorating with us this year.'],
  ];
  const ORDER = [7, 15, 1, 20, 11, 3, 24, 9, 17, 5, 13, 22, 2, 19, 8, 12, 4, 23, 16, 10, 6, 18, 14, 21];
  const grid = $('#advent-grid');
  const panel = $('#advent-panel');
  const previewBox = $('#advent-preview');
  let opened = new Set(store.get('advent', []).filter(n => Number.isInteger(n) && n >= 1 && n <= 24));
  const unlockDate = n => new Date(YEAR, 11, n);
  const isUnlocked = n => previewBox.checked || now() >= unlockDate(n);

  function renderAdvent() {
    const t = now();
    const today = t.getMonth() === 11 ? t.getDate() : -1;
    grid.textContent = '';
    for (const n of ORDER) {
      const [orn] = ADVENT[n - 1];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'door';
      b.dataset.day = n;
      if (opened.has(n)) b.classList.add('open');
      if (!isUnlocked(n)) b.classList.add('locked');
      if (n === today) b.classList.add('today');
      b.setAttribute('aria-label', `December ${n}${opened.has(n) ? ', opened' : isUnlocked(n) ? '' : ', locked'}`);
      b.innerHTML = `<span class="door-back">${ORN[orn].svg}Dec ${n}</span><span class="door-front" aria-hidden="true">${n}</span>`;
      grid.append(b);
    }
  }
  function showDay(n) {
    const [, title, html] = ADVENT[n - 1];
    panel.hidden = false;
    panel.innerHTML = `<h3>December ${n}: ${title}</h3><p>${html}</p>`;
    $$('.door', grid).forEach(d => d.classList.toggle('active', Number(d.dataset.day) === n));
  }
  grid.addEventListener('click', e => {
    const d = e.target.closest('.door');
    if (!d) return;
    const n = Number(d.dataset.day);
    if (!isUnlocked(n)) {
      const days = Math.ceil((unlockDate(n) - now()) / 864e5);
      d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
      toast(`This door opens on December ${n}, in ${days} day${days === 1 ? '' : 's'}. Tick "Preview all doors" to look now.`);
      return;
    }
    if (!opened.has(n)) {
      opened.add(n);
      if (!previewBox.checked) store.set('advent', [...opened]);
      d.classList.add('open');
      d.classList.remove('locked');
      d.setAttribute('aria-label', `December ${n}, opened`);
    }
    showDay(n);
  });
  previewBox.addEventListener('change', () => {
    if (!previewBox.checked) { opened = new Set(store.get('advent', [])); panel.hidden = true; }
    renderAdvent();
  });
  renderAdvent();

  /* ---------- Shipping deadlines (placeholder dates) ---------- */
  const SHIP = {
    US: ['United States', [12, 8], [12, 16]],
    CA: ['Canada', [12, 4], [12, 13]],
    GB: ['United Kingdom', [12, 6], [12, 15]],
    DE: ['Germany', [12, 5], [12, 14]],
    FR: ['France', [12, 5], [12, 14]],
    NL: ['Netherlands', [12, 5], [12, 14]],
    AU: ['Australia', [12, 1], [12, 11]],
    JP: ['Japan', [12, 7], [12, 16]],
    CN: ['China (mainland)', [12, 12], [12, 18]],
  };
  const LANG_TO_COUNTRY = { de: 'DE', fr: 'FR', ja: 'JP', zh: 'CN', nl: 'NL' };
  function detectCountry() {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en-US'];
    for (const l of langs) {
      const region = (l.split('-')[1] || '').toUpperCase();
      if (region === 'UK') return 'GB';
      if (SHIP[region]) return region;
    }
    for (const l of langs) {
      const c = LANG_TO_COUNTRY[l.split('-')[0].toLowerCase()];
      if (c) return c;
    }
    return 'US';
  }
  const sel = $('#ship-country');
  for (const [code, [name]] of Object.entries(SHIP)) sel.add(new Option(name, code));
  sel.value = store.get('country', detectCountry());
  if (!SHIP[sel.value]) sel.value = 'US';
  const cards = $('#ship-cards');
  const deadline = ([m, d]) => new Date(YEAR, m - 1, d, 23, 59, 59);
  const fmtDate = dt => dt.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' });
  function parts(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
  }
  function buildShip() {
    const [, std, exp] = SHIP[sel.value];
    cards.innerHTML = [['Standard shipping', std], ['Express shipping', exp]].map(([label, md], i) => `
      <div class="ship-card" data-i="${i}">
        <h3>${label}</h3>
        <div class="date">Order by ${fmtDate(deadline(md))}</div>
        <div class="countdown">${['days', 'hrs', 'min', 'sec'].map(u => `<span><b>0</b><small>${u}</small></span>`).join('')}</div>
      </div>`).join('');
    tickShip();
  }
  function tickShip() {
    const [name, std, exp] = SHIP[sel.value];
    const t = now();
    [std, exp].forEach((md, i) => {
      const card = cards.querySelector(`[data-i="${i}"]`);
      const left = deadline(md) - t;
      card.classList.toggle('passed', left <= 0);
      $$('b', card).forEach((b, j) => { b.textContent = parts(left)[j]; });
    });
    const hero = $('#hero-deadline');
    const stdLeft = deadline(std) - t, expLeft = deadline(exp) - t;
    if (stdLeft > 0) {
      const [d, h] = parts(stdLeft);
      hero.innerHTML = `🎁 Order within <strong>${d} days ${h} hrs</strong> for Christmas delivery to ${name} (by ${fmtDate(deadline(std))})`;
    } else if (expLeft > 0) {
      const [d, h] = parts(expLeft);
      hero.innerHTML = `⚡ Express only: order within <strong>${d} days ${h} hrs</strong> for Christmas delivery to ${name}`;
    } else {
      hero.textContent = `Christmas shipping to ${name} has closed. Order now for New Year delivery.`;
    }
  }
  sel.addEventListener('change', () => { store.set('country', sel.value); buildShip(); });
  buildShip();
  setInterval(tickShip, 1000);

  /* ---------- Quote form (prototype: not sent anywhere) ---------- */
  const quote = $('#quote-form');
  const out = $('#q-msg-out');
  quote.addEventListener('submit', e => {
    e.preventDefault();
    out.classList.remove('err');
    if (!quote.checkValidity()) {
      out.classList.add('err');
      out.textContent = 'Please fill in your company name and a valid work email.';
      quote.querySelector(':invalid').focus();
      return;
    }
    const company = quote.elements.company.value.trim();
    out.textContent = `Thanks, ${company}! In the live site our team would reply within 1 business day with a free design proof. (Prototype: nothing was sent.)`;
    quote.reset();
  });

  /* ---------- Process reveal ---------- */
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.2 });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- Snow (hero only, pauses when off-screen) ---------- */
  const canvas = $('#snow');
  const ctx = canvas.getContext('2d');
  const toggle = $('#snow-toggle');
  let snowOn = store.get('snow', !reduceMotion);
  let heroVisible = true, raf = 0, flakes = [], W = 0, H = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(110, W / 12));
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2.8, s: .3 + Math.random() * .9, d: Math.random() * 6.28 }));
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.beginPath();
    for (const f of flakes) {
      f.y += f.s; f.d += 0.012; f.x += Math.sin(f.d) * 0.45;
      if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
      ctx.moveTo(f.x + f.r, f.y);
      ctx.arc(f.x, f.y, f.r, 0, 6.283);
    }
    ctx.fill();
    raf = requestAnimationFrame(frame);
  }
  function updateSnow() {
    cancelAnimationFrame(raf);
    toggle.setAttribute('aria-pressed', String(snowOn));
    if (snowOn && heroVisible && !document.hidden) raf = requestAnimationFrame(frame);
    else if (!snowOn) ctx.clearRect(0, 0, W, H);
  }
  toggle.addEventListener('click', () => { snowOn = !snowOn; store.set('snow', snowOn); updateSnow(); });
  window.addEventListener('resize', () => { resize(); updateSnow(); });
  document.addEventListener('visibilitychange', updateSnow);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; updateSnow(); }).observe($('.hero'));
  }
  resize();
  updateSnow();
})();
