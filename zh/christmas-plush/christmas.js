/* Snugglecraft Christmas collection page.
   Everything here is progressive enhancement: the page content and SEO text are
   in the HTML, so search engines and no-JS visitors still get the full page. */
(() => {
  'use strict';
  const { $, $$, store, toast, addToCart, reduceMotion } = window.SC;
  const now = () => new Date();
  const YEAR = now().getFullYear();

  /* ---------- Ornaments ---------- */
  const ORN = {
    berry: { name: '莓红彩球', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="16" y="3" width="8" height="6" rx="2" fill="#d9a33a"/><circle cx="20" cy="23" r="14" fill="#c8323a"/><path d="M7 21 Q20 28 33 21" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 2.5" fill="none" opacity=".8"/><circle cx="14" cy="17" r="3.5" fill="#fff" opacity=".35"/></svg>' },
    gold: { name: '金色彩球', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="16" y="3" width="8" height="6" rx="2" fill="#b9862a"/><circle cx="20" cy="23" r="14" fill="#e8b33c"/><path d="M6.5 19 H33.5 M6.5 27 H33.5" stroke="#c8323a" stroke-width="3"/><circle cx="14" cy="16" r="3.5" fill="#fff" opacity=".4"/></svg>' },
    star: { name: '微笑星星', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 L25 14.5 L37.5 15.5 L28 24 L31 36.5 L20 30 L9 36.5 L12 24 L2.5 15.5 L15 14.5 Z" fill="#f2c14e" stroke="#c99520" stroke-width="1.5" stroke-linejoin="round"/><circle cx="16.5" cy="20" r="1.7" fill="#3a2a22"/><circle cx="23.5" cy="20" r="1.7" fill="#3a2a22"/><path d="M17.5 24 Q20 26.5 22.5 24" stroke="#3a2a22" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>' },
    bell: { name: '铃铛', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 8 C12 8 10 15 10 21 L7.5 31 H32.5 L30 21 C30 15 28 8 20 8 Z" fill="#e0a83a" stroke="#b9862a" stroke-width="1.5"/><circle cx="20" cy="33" r="3.5" fill="#c8323a"/><ellipse cx="15" cy="6" rx="5" ry="3" fill="#2e7d4f"/><ellipse cx="25" cy="6" rx="5" ry="3" fill="#2e7d4f"/><circle cx="20" cy="7" r="2.5" fill="#c8323a"/></svg>' },
    ginger: { name: '姜饼人', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="#b8743f"><circle cx="20" cy="10" r="7"/><rect x="12" y="15" width="16" height="15" rx="6"/><rect x="4" y="17" width="11" height="6" rx="3"/><rect x="25" y="17" width="11" height="6" rx="3"/><rect x="12" y="26" width="7" height="12" rx="3.5"/><rect x="21" y="26" width="7" height="12" rx="3.5"/></g><circle cx="17.5" cy="9" r="1.2" fill="#fff"/><circle cx="22.5" cy="9" r="1.2" fill="#fff"/><path d="M17 12.5 Q20 14.5 23 12.5" stroke="#fff" stroke-width="1.1" fill="none"/><circle cx="20" cy="19" r="1.4" fill="#c8323a"/><circle cx="20" cy="24" r="1.4" fill="#2e7d4f"/></svg>' },
    cane: { name: '拐杖糖', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M25 37 V14 A7 7 0 0 0 11 14" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M25 37 V14 A7 7 0 0 0 11 14" stroke="#c8323a" stroke-width="7" stroke-dasharray="4 4" fill="none"/></svg>' },
    flake: { name: '雪花', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#6aa9dc" stroke-width="3" stroke-linecap="round" fill="none"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/><g transform="rotate(60 20 20)"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/></g><g transform="rotate(120 20 20)"><path d="M20 4 V36 M15 8 L20 12.5 L25 8 M15 32 L20 27.5 L25 32"/></g></g></svg>' },
    gift: { name: '小礼物', svg: '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="15" width="28" height="21" rx="4" fill="#2e7d4f"/><rect x="18" y="15" width="4" height="21" fill="#f2c14e"/><rect x="6" y="22" width="28" height="4" fill="#f2c14e"/><ellipse cx="15" cy="12" rx="6" ry="4" fill="none" stroke="#f2c14e" stroke-width="3"/><ellipse cx="25" cy="12" rx="6" ry="4" fill="none" stroke="#f2c14e" stroke-width="3"/></svg>' },
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
    b.setAttribute('aria-label', `把${ORN[k].name}加到树上`);
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
      el.title = `第 ${i + 1} 天：${ORN[p.type].name}。拖出树外即可移除。`;
      layer.append(el);
    });
    const n = placed.length;
    $('#tree-count').textContent = n;
    $('#tree-progress').style.width = (n / MAX * 100) + '%';
    $('#tree-add').disabled = n < MAX;
    $('#tree-fill').disabled = n >= MAX;
    $('#tree-hint').textContent = n >= MAX
      ? '24 天都已放满，这套日历可以加入清单了。'
      : n === 0 ? '把挂饰拖到树上，或点一下来添加。'
      : `还差 ${MAX - n} 个。拖动挂饰可移动，拖出树外即可移除。`;
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
    if (placed.length >= MAX) { toast('24 天都已放满。把挂饰拖出树外即可替换。'); return false; }
    const p = { id: ++uid, type, x: pos.x, y: pos.y };
    placed.push(p);
    renderTree(p.id);
    return true;
  }

  function autoPlace(type) {
    if (placed.length >= MAX) return add(type, null);
    const spot = freeSpot();
    if (!spot) return toast('没有空位了。请试着把挂饰拖到树上的位置。');
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
        else if (ev.type === 'pointerup') { placed = placed.filter(q => q.id !== id); toast(`已移除${ORN[type].name}。`); }
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
  $('#tree-reset').addEventListener('click', () => { placed = []; renderTree(); toast('树是空的。开始装饰吧！'); });
  $('#tree-add').addEventListener('click', () => {
    const counts = {};
    placed.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
    store.set('treeMix', counts);
    addToCart('带 24 个挂饰的圣诞树降临日历');
  });
  renderTree();

  /* ---------- Reindeer builder ---------- */
  const BODY = {
    cocoa: { label: '可可色', b: '#8a5a3b', m: '#e6c7a0', h: '#5a3a26', a: '#f0d7b0' },
    caramel: { label: '焦糖色', b: '#c4874f', m: '#f4dcb8', h: '#7a4f2c', a: '#f6e6c8' },
    snow: { label: '雪白', b: '#f2ebe0', m: '#fffaf3', h: '#c9b9a3', a: '#c89b6c' },
    grey: { label: '霜灰', b: '#9b9ca6', m: '#e2e2e8', h: '#62636d', a: '#f0d7b0' },
  };
  const SCARF = { berry: ['莓红', '#c8323a'], pine: ['松绿', '#2e7d4f'], navy: ['海军蓝', '#263a6b'], gold: ['金色', '#d9a33a'], custom: ['自定义颜色', null] };
  const NOSE = { black: '#2b2220', cocoa: '#6b4330', rose: '#e48a9a', berry: '#c8323a' };
  const SIZE = { S: ['20 cm', 29], M: ['30 cm', 39], L: ['45 cm', 59] };
  const ACC = { none: ['无配件', 0], hat: ['圣诞帽', 4], earmuffs: ['耳罩', 4], bell: ['铃铛', 3] };
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
    const parts = [`${SIZE[deer.size][0]} 麋鹿`, `${BODY[deer.body].label}毛皮`, `${SCARF[deer.scarf][0]}围巾`, ACC[deer.acc][0]];
    if (deer.corp) parts.push(`围巾上的「${deer.logo.trim() || '你们的 logo'}」`);
    else if (deer.name.trim()) parts.push(`刺绣「${deer.name.trim()}」`);
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
      price.innerHTML = '批量询价 <small>演示起订 50 件</small>';
      cta.textContent = '就这个设计申请报价';
    } else {
      const total = SIZE[deer.size][1] + ACC[deer.acc][1] + (deer.name.trim() ? NAME_PRICE : 0);
      price.textContent = '$' + total;
      cta.textContent = '加入清单（演示）';
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
    $('#q-msg').value = `来自麋鹿搭配器的设计：${summary()}。围巾颜色：${scarfHex()}。`;
    const q = $('#quote-form');
    q.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    q.classList.remove('flash'); void q.offsetWidth; q.classList.add('flash');
    setTimeout(() => $('#q-company').focus({ preventScroll: true }), 500);
  });
  $('#deer-share').addEventListener('click', async () => {
    const url = location.href.split('#')[0] + '#deer=' + encodeURIComponent(JSON.stringify(deer));
    try { await navigator.clipboard.writeText(url); toast('链接已复制。打开后会看到这只麋鹿。'); }
    catch { window.prompt('请复制这个链接：', url); }
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
    ['star', '第一张草图', '圣诞树日历的第一张草图本来有 25 个挂饰。我们去掉了一个，所以第 24 扇门是星星。'],
    ['berry', '演示优惠码', '演示优惠码 <code>DOOR2</code> 表示日历套装 9 折，不能真正使用。'],
    ['ginger', '肉桂色是怎么选的', '姜饼人面料试了 14 种色号，才看起来足够温暖。'],
    ['flake', '刺绣眼睛', '我们用刺绣眼睛，而不是塑料眼睛，避免幼儿可以扯下小零件。'],
    ['cane', '版型一瞥', '拐杖糖只有两片版型。条纹是印上去的，不是缝上去的。'],
    ['gift', '演示礼包', '“今日订单免费礼品包装”仅为演示文案，不能作为真实优惠。'],
    ['bell', '铃铛的问题', '真铃铛会响，但对幼儿不够安全。我们改用内置柔软响袋。'],
    ['gold', '演示优惠码', '演示优惠码 <code>NAME8</code> 表示免费绣名，不能真正使用。'],
    ['star', '认识设计师', '每张脸都是手绘的。树的微笑改了 30 个版本。'],
    ['berry', '玩偶保养', '请套上枕套后冷水洗涤，再阴干。可用冷风吹松。'],
    ['ginger', '涂色页', '姜饼人家庭涂色页（即将推出，演示说明）。'],
    ['gift', '演示优惠码', '演示优惠码 <code>TEAM12</code> 表示本周确认的企业订单 85 折，不能真正使用。'],
    ['flake', '缝线背后', '一只麋鹿有 23 片版型，大约需要 40 分钟缝制。'],
    ['cane', '一个家庭玩法', '有些家庭每天早上会把第二天的挂饰藏在家里。'],
    ['bell', '个性化截止提醒', '个性化款需再预留 2 天。请查看下方各目的地的演示截止日期。'],
    ['gold', '面料说明', '短毛绒面料使用再生聚酯纤维（演示说明）。'],
    ['star', '演示优惠码', '演示优惠码 <code>FAST17</code> 表示满 80 美元升级加急，不能真正使用。'],
    ['berry', '来自照片团队', '也可以通过照片生成玩偶服务，把宠物做成玩偶。'],
    ['ginger', '麋鹿的名字', '演示文案：今年最受欢迎的麋鹿名字是 “Biscuit”。这不是真实销售统计。'],
    ['gift', '谢谢', '来自缝制团队的感谢卡，并配一张照片（演示内容）。'],
    ['flake', '演示优惠码', '演示优惠码 <code>HERD21</code> 表示买两只麋鹿第三只半价，不能真正使用。'],
    ['cane', '装箱的一天', '每套日历会装进可重复使用的棉布收纳袋。'],
    ['bell', '就快到了', '明天就要把星星放到树顶。把相机准备好吧。'],
    ['star', '圣诞快乐！', '把星星放到树顶。谢谢你今年和我们一起装饰。'],
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
      b.setAttribute('aria-label', `12 月 ${n} 日${opened.has(n) ? '，已打开' : isUnlocked(n) ? '' : '，未到日期'} `);
      b.innerHTML = `<span class="door-back">${ORN[orn].svg}12/${n}</span><span class="door-front" aria-hidden="true">${n}</span>`;
      grid.append(b);
    }
  }
  function showDay(n) {
    const [, title, html] = ADVENT[n - 1];
    panel.hidden = false;
    panel.innerHTML = `<h3>12 月 ${n} 日：${title}</h3><p>${html}</p>`;
    $$('.door', grid).forEach(d => d.classList.toggle('active', Number(d.dataset.day) === n));
  }
  grid.addEventListener('click', e => {
    const d = e.target.closest('.door');
    if (!d) return;
    const n = Number(d.dataset.day);
    if (!isUnlocked(n)) {
      const days = Math.ceil((unlockDate(n) - now()) / 864e5);
      d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
      toast(`这扇门会在 12 月 ${n} 日打开，还有 ${days} 天。勾选“预览全部门”可以现在查看。`);
      return;
    }
    if (!opened.has(n)) {
      opened.add(n);
      if (!previewBox.checked) store.set('advent', [...opened]);
      d.classList.add('open');
      d.classList.remove('locked');
      d.setAttribute('aria-label', `12 月 ${n} 日，已打开`);
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
    US: ['美国', [12, 8], [12, 16]],
    CA: ['加拿大', [12, 4], [12, 13]],
    GB: ['英国', [12, 6], [12, 15]],
    DE: ['德国', [12, 5], [12, 14]],
    FR: ['法国', [12, 5], [12, 14]],
    NL: ['荷兰', [12, 5], [12, 14]],
    AU: ['澳大利亚', [12, 1], [12, 11]],
    JP: ['日本', [12, 7], [12, 16]],
    CN: ['中国大陆', [12, 12], [12, 18]],
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
    cards.innerHTML = [['标准配送', std], ['加急配送', exp]].map(([label, md], i) => `
      <div class="ship-card" data-i="${i}">
        <h3>${label}</h3>
        <div class="date">请在 ${fmtDate(deadline(md))} 前下单（演示日期）</div>
        <div class="countdown">${['天', '小时', '分', '秒'].map(u => `<span><b>0</b><small>${u}</small></span>`).join('')}</div>
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
      hero.innerHTML = `🎁 距离寄往${name}的圣诞演示截止还有 <strong>${d} 天 ${h} 小时</strong>（${fmtDate(deadline(std))} 前，非承诺送达）`;
    } else if (expLeft > 0) {
      const [d, h] = parts(expLeft);
      hero.innerHTML = `⚡ 仅剩加急：寄往${name}的演示加急截止还有 <strong>${d} 天 ${h} 小时</strong>（非承诺送达）`;
    } else {
      hero.textContent = `寄往${name}的圣诞演示截止已过。现在询价仅作新年送达参考，并非承诺。`;
    }
  }
  sel.addEventListener('change', () => { store.set('country', sel.value); buildShip(); });
  buildShip();
  setInterval(tickShip, 1000);

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
