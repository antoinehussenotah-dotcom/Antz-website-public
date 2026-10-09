/* AntZ Content Studio V6.8 — full-bleed desktop hero, CSS only. */
(() => {
  'use strict';
  if (document.querySelector('style[data-antz-cinematic]')) return;
  const css = `
@media (min-width: 761px) {
  /* One continuous red/pink photograph-inspired hero; no hard photo/text divide. */
  .hero {
    isolation: isolate !important;
    position: relative !important;
    overflow: hidden !important;
    background-color: #4e1530 !important;
    background-image:
      radial-gradient(ellipse at 25% 46%, #ed3d78 0%, #b52b58 31%, #761c3e 65%, #270d21 100%) !important;
    background-size: 100% 100% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    filter: none !important;
    min-height: clamp(690px, 82vh, 900px) !important;
    padding-top: 110px !important;
    padding-bottom: 105px !important;
  }
  /* A soft, enlarged photographic colour wash fills even the right-hand text area. */
  .hero::before {
    content: '' !important;
    display: block !important;
    position: absolute !important;
    inset: -40px !important;
    z-index: 0 !important;
    pointer-events: none !important;
    background:
      linear-gradient(90deg, rgba(35,0,12,.02) 0%, rgba(32,4,16,.10) 38%, rgba(18,2,11,.70) 66%, rgba(12,5,13,.80) 100%),
      url('assets/image-74e0abbcaa8a.png') center center / cover no-repeat !important;
    background-size: 100% 100%, cover !important;
    filter: blur(39px) saturate(1.15) !important;
    opacity: .56 !important;
    transform: scale(1.08) !important;
  }
  /* Original unaltered portrait on the left, softly fading into the shared hero background. */
  .hero::after {
    content: '' !important;
    display: block !important;
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: auto !important;
    width: 65% !important;
    height: 100% !important;
    z-index: 1 !important;
    pointer-events: none !important;
    background: url('assets/image-74e0abbcaa8a.png') 21% center / auto 109% no-repeat !important;
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 35%, rgba(0,0,0,.90) 44%, rgba(0,0,0,.35) 58%, transparent 66%) !important;
    mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 35%, rgba(0,0,0,.90) 44%, rgba(0,0,0,.35) 58%, transparent 66%) !important;
  }
  .hero .hero-copy { position: relative !important; z-index: 5 !important; }
  .hero .hero-copy h1,
  .hero .hero-copy p,
  .hero .hero-copy .kicker { text-shadow: 0 2px 14px rgba(0,0,0,.62) !important; }
  .hero .hero-brandmark { z-index: 6 !important; }
  .hero .antz-social-bar { z-index: 7 !important; }
}
@media (min-width: 761px) and (max-width: 1150px) {
  .hero::after { width: 60% !important; background-position: 10% center !important; }
  .hero .wrap.hero-copy { width: min(50vw, 495px) !important; margin-right: 3vw !important; }
}
@media (min-width: 1550px) {
  .hero .wrap.hero-copy { width: min(42vw, 610px) !important; max-width: 610px !important; margin-right: 5.5vw !important; }
  .hero .hero-copy h1 { font-size: clamp(76px, 5.0vw, 99px) !important; }
}
`;
  const style = document.createElement('style');
  style.setAttribute('data-antz-cinematic','v6.8');
  style.textContent = css;
  document.head.append(style);
})();
