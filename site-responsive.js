/* AntZ Content Studio V6 — responsive phone layout and narrow-screen correction. */
(() => {
  'use strict';
  const responsive = window.ANTZ_REVIEW_DATA?.responsive;
  const clamp = (value, lower, upper, fallback) => {
    const n = Number(value);
    return Number.isFinite(n) ? Math.round(Math.max(lower, Math.min(upper, n))) : fallback;
  };
  const x = clamp(responsive?.mobileHeroX, 0, 100, 31);
  const y = clamp(responsive?.mobileHeroY, 0, 100, 50);
  const size = clamp(responsive?.mobileTitleSize, 30, 60, 38);
  const css = [
    '@media(max-width:359px){.routes{grid-template-columns:minmax(0,1fr)!important}.route{min-width:0!important}.review-ui-card{max-width:100%}}',
    responsive ? '@media(max-width:760px){.hero-photo-v62{object-position:'+x+'% '+y+'%!important}.hero-copy h1{font-size:'+size+'px!important}}' : ''
  ].join('\n');
  const style = document.createElement('style');
  style.setAttribute('data-antz-responsive', 'v6');
  style.textContent = css;
  document.head.append(style);
})();
