import { t, msg } from './i18n.js';

/* Shared behavior for every page: storage, toast messages, cart count,
   mobile menu, language placeholder and scroll reveal.
   Page scripts import these helpers from this module. */
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
  toast(msg.addedToCart(label));
}
renderCart();

/* Optional language links use real hrefs when present. A leftover "#" stays inactive. */
$$('[data-lang]').forEach(a => {
  const href = a.getAttribute('href') || '';
  if (href === '#' || href === '') {
    a.addEventListener('click', e => {
      e.preventDefault();
      toast('A local-market version can be added later.');
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
      out.textContent = form.dataset.errorText || t('Please fill in the required fields.');
      form.querySelector(':invalid').focus();
      return;
    }
    const who = (form.elements.company || form.elements.name || {}).value || '';
    out.textContent = msg.formThanks(who.trim());
    form.reset();
    form.dispatchEvent(new Event('proto-reset'));
  });
});

export { $, $$, store, toast, addToCart, reduceMotion };
