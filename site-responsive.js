/* AntZ V6 mobile hero correction — layout-only; desktop styles and published content are unchanged. */
(() => {
  'use strict';
  const opts = window.ANTZ_REVIEW_DATA?.responsive || {};
  const clamp = (v, lo, hi, fallback) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(lo, Math.min(hi, Math.round(n))) : fallback;
  };
  const x = clamp(opts.mobileHeroX, 0, 100, 50);
  const y = clamp(opts.mobileHeroY, 0, 100, 35);
  const title = clamp(opts.mobileTitleSize, 30, 60, 38);
  const style = document.createElement('style');
  style.setAttribute('data-antz-responsive', 'v6-mobile-hero-fix');
  style.textContent = `
@media(max-width:760px){
  body>nav{z-index:100!important;background:#090909!important}
  body>nav .navin{height:auto!important;min-height:60px!important;display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;padding:10px 0!important}
  body>nav .antz-menu-toggle{display:block!important;border:1px solid #484848;background:#181818;color:#fff;border-radius:12px;padding:10px 15px;min-height:43px;font:inherit;font-size:14px;font-weight:800;cursor:pointer}
  body.antz-menu-enhanced>nav .links{display:none!important;flex-basis:100%!important;max-width:none!important;width:100%!important;overflow:visible!important;white-space:normal!important;}
  body.antz-menu-enhanced>nav.antz-menu-open .links{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;padding:8px 0!important}
  body>nav .links a{display:block;padding:12px;border:1px solid #303030;border-radius:10px;background:#151515;font-size:14px}
  .hero{display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;min-height:0!important;height:auto!important;max-height:none!important;padding:0!important;overflow:hidden!important;background:#090909!important;background-image:none!important;filter:none!important}
  .hero::before,.hero::after{content:none!important;display:none!important}
  .hero-photo-v62{position:relative!important;inset:auto!important;display:block!important;flex:none!important;width:100%!important;height:clamp(315px,110vw,500px)!important;object-fit:cover!important;object-position:${x}% ${y}%!important;transform:none!important;filter:none!important}
  .hero-brandmark{position:absolute!important;top:16px!important;left:auto!important;right:16px!important;width:66px!important;height:66px!important;z-index:6!important}
  .hero .wrap.hero-copy{position:relative!important;z-index:4!important;width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0!important;padding:22px 20px 8px!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;background:linear-gradient(#111,#080808)!important;text-shadow:none!important}
  .hero-copy .kicker{max-width:36ch;font-size:10px!important;line-height:1.6!important;letter-spacing:.13em!important;color:#b9bdc4!important}
  .hero-copy h1{font-size:${title}px!important;line-height:.94!important;letter-spacing:-.045em!important;margin:12px 0!important;max-width:100%!important}
  .hero-copy p{font-size:16px!important;line-height:1.5!important;max-width:44ch!important;margin:8px 0 0!important;color:#e2e2e2!important}
  .hero-copy .actions{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:stretch!important;width:100%!important;gap:10px!important;margin-top:18px!important}
  .hero-copy .actions .btn{display:flex!important;align-items:center!important;justify-content:center!important;flex:1 1 148px!important;min-height:46px!important;padding:11px 13px!important;text-align:center!important;font-size:14px!important;line-height:1.3!important}
  .hero .antz-social-bar{position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;transform:none!important;z-index:4!important;width:100%!important;max-width:none!important;margin:0!important;padding:14px 20px 22px!important;display:flex!important;flex-wrap:wrap!important;align-items:center!important;justify-content:flex-start!important;gap:9px!important;background:#080808!important}
  .hero .antz-social-bar .brand{width:43px!important;height:43px!important}
  .routes{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
  .route{min-width:0!important}
}
@media(max-width:359px){.routes{grid-template-columns:1fr!important}}
@media(min-width:761px){body>nav .antz-menu-toggle{display:none!important}}
`;
  document.head.append(style);
  const nav = document.querySelector('body > nav');
  const links = nav?.querySelector('.links');
  const holder = nav?.querySelector('.navin');
  if (nav && links && holder && !nav.querySelector('.antz-menu-toggle')) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'antz-menu-toggle';
    button.textContent = '☰ Menu';
    button.setAttribute('aria-label', 'Open navigation');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'antz-mobile-links');
    links.id = 'antz-mobile-links';
    holder.insertBefore(button, links);
    document.body.classList.add('antz-menu-enhanced');
    const close = () => {
      nav.classList.remove('antz-menu-open');
      button.textContent = '☰ Menu';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
    };
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('antz-menu-open');
      button.textContent = open ? '✕ Close' : '☰ Menu';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    links.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
  // Use the existing text-free portrait at phone widths until a real custom hero image is published.
  const hero = document.querySelector('.hero-photo-v62');
  const image = window.ANTZ_REVIEW_DATA?.photos?.hero;
  const defaultImage = 'assets/image-d5350ae8c45c.jpg';
  if (hero && window.matchMedia('(max-width:760px)').matches && (!image || image === defaultImage)) {
    hero.src = 'assets/image-74e0abbcaa8a.png';
  }
})();
