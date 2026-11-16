/* Shared behavior for every page: storage, toast messages, cart count,
   mobile menu, language placeholder and scroll reveal.
   Page scripts load after this and use window.SC. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sc_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('sc_' + k, JSON.stringify(v)); } catch { /* private mode */ } },
  };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    toast(`已加入清单：${label}。（演示：还没有结算付款。）`);
  }
  renderCart();

  /* Language links are real hrefs to the localized pages. Only block a leftover placeholder. */
  $$('[data-lang]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === '#' || href === '') {
      a.addEventListener('click', e => {
        e.preventDefault();
        toast('The local-market version is being designed. The language switch will link to it here.');
      });
    }
  });

  const menuBtn = $('.menu-btn');
  const nav = $('#main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.15 });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* Simple prototype forms: validate, show a thank-you, send nothing. */
  $$('form[data-proto-form]').forEach(form => {
    const out = form.querySelector('.form-msg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      out.classList.remove('err');
      if (!form.checkValidity()) {
        out.classList.add('err');
        out.textContent = form.dataset.errorText || '请填写必填项。';
        form.querySelector(':invalid').focus();
        return;
      }
      const who = (form.elements.company || form.elements.name || {}).value || '';
      out.textContent = `谢谢${who.trim() ? '，' + who.trim() : ''}！在正式网站上，团队会在 1 个工作日内回复。（演示：信息没有发送。）`;
      form.reset();
      form.dispatchEvent(new Event('proto-reset'));
    });
  });

  window.SC = { $, $$, store, toast, addToCart, reduceMotion };
})();
