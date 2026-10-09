/* AntZ Content Studio V7.2 — balanced full-width desktop hero; mobile unchanged. */
(() => {
  'use strict';
  if (document.querySelector('style[data-antz-cinematic]')) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (!hero.querySelector('.antz-desktop-portrait')) {
    const photo = document.createElement('img');
    photo.className = 'antz-desktop-portrait';
    photo.src = 'assets/image-74e0abbcaa8a.png';
    photo.alt = '';
    photo.setAttribute('aria-hidden','true');
    photo.decoding = 'async';
    hero.prepend(photo);
  }
  if (!hero.querySelector('.antz-desktop-guitar')) {
    const guitar = document.createElement('img');
    guitar.className = 'antz-desktop-guitar';
    guitar.src = 'assets/image-74e0abbcaa8a.png';
    guitar.alt = '';
    guitar.setAttribute('aria-hidden','true');
    guitar.decoding = 'async';
    hero.prepend(guitar);
  }
  const css = `
@media (max-width:760px){
  .hero .antz-desktop-portrait,.hero .antz-desktop-guitar{display:none!important}
}
@media (min-width:761px){
  .hero{
    isolation:isolate!important;
    position:relative!important;
    overflow:hidden!important;
    background:#4e1530!important;
    background-image:linear-gradient(90deg,#ad3159 0%,#ef7090 20%,#f16f92 38%,#c14f79 51%,#78304d 69%,#360f29 100%)!important;
    background-repeat:no-repeat!important;
    background-position:center!important;
    background-size:100% 100%!important;
    filter:none!important;
    min-height:clamp(690px,82vh,900px)!important;
    padding-top:110px!important;
    padding-bottom:105px!important;
  }
  /* Smooth tonal wash instead of competing photographs at the join. */
  .hero::before{
    content:''!important;
    display:block!important;
    position:absolute!important;
    inset:0!important;
    z-index:0!important;
    pointer-events:none!important;
    background:linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 37%,rgba(22,5,17,.06) 47%,rgba(19,4,15,.18) 58%,rgba(14,3,12,.34) 74%,rgba(11,3,13,.54) 100%)!important;
    transform:none!important;
    opacity:1!important;
    filter:none!important;
  }
  /* The old ::after was a fixed-width duplicate image, creating the vertical seam. */
  .hero::after{content:none!important;display:none!important}
  .hero .antz-desktop-portrait{
    display:block!important;
    position:absolute!important;
    z-index:2!important;
    pointer-events:none!important;
    top:50%!important;
    left:0!important;
    height:107%!important;
    width:auto!important;
    max-width:none!important;
    object-fit:contain!important;
    transform:translateY(-50%)!important;
    filter:contrast(1.04) saturate(1.06) brightness(0.995)!important;
    -webkit-mask-image:radial-gradient(ellipse 108% 168% at 0% 50%,#000 0%,#000 58%,rgba(0,0,0,.98) 68%,rgba(0,0,0,.86) 77%,rgba(0,0,0,.42) 86%,rgba(0,0,0,.08) 93%,transparent 100%)!important;
    mask-image:radial-gradient(ellipse 108% 168% at 0% 50%,#000 0%,#000 58%,rgba(0,0,0,.98) 68%,rgba(0,0,0,.86) 77%,rgba(0,0,0,.42) 86%,rgba(0,0,0,.08) 93%,transparent 100%)!important;
  }
  /* Keep the headstock and neck crisp as the background feathers away. */
  .hero .antz-desktop-guitar{
    display:block!important;
    position:absolute!important;
    z-index:3!important;
    pointer-events:none!important;
    top:50%!important;
    left:0!important;
    height:107%!important;
    width:auto!important;
    max-width:none!important;
    object-fit:contain!important;
    transform:translateY(-50%)!important;
    filter:contrast(1.08) saturate(1.10) brightness(0.99)!important;
    -webkit-mask-image:radial-gradient(ellipse 19% 42% at 80.5% 65.5%,#000 0%,#000 62%,rgba(0,0,0,.97) 72%,rgba(0,0,0,.72) 82%,rgba(0,0,0,.20) 92%,transparent 100%)!important;
    mask-image:radial-gradient(ellipse 19% 42% at 80.5% 65.5%,#000 0%,#000 62%,rgba(0,0,0,.97) 72%,rgba(0,0,0,.72) 82%,rgba(0,0,0,.20) 92%,transparent 100%)!important;
  }
  .hero .hero-copy{position:relative!important;z-index:5!important}
  .hero .hero-copy h1,.hero .hero-copy p,.hero .hero-copy .kicker{text-shadow:0 2px 14px rgba(0,0,0,.55)!important}
  .hero .hero-brandmark{z-index:6!important}
  .hero .antz-social-bar{z-index:7!important}
}
@media (min-width:761px) and (max-width:1150px){
  .hero .antz-desktop-portrait,.hero .antz-desktop-guitar{left:0!important;height:100%!important}
  .hero .wrap.hero-copy{width:min(50vw,495px)!important;margin-right:3vw!important}
}
@media (min-width:761px) and (max-width:1549px){
  .hero .antz-desktop-portrait,.hero .antz-desktop-guitar{height:100%!important;left:2vw!important}
  .hero .wrap.hero-copy{width:min(43vw,565px)!important;max-width:565px!important;margin-right:clamp(24px,4.2vw,75px)!important;box-sizing:border-box!important}
}
@media (min-width:761px) and (max-width:1100px){
  .hero .wrap.hero-copy{width:min(45vw,470px)!important;margin-right:3vw!important}
}
@media (min-width:1550px){
  .hero .antz-desktop-portrait,.hero .antz-desktop-guitar{height:108%!important;left:3vw!important}
  .hero .wrap.hero-copy{width:min(40vw,640px)!important;max-width:640px!important;margin-right:clamp(28px,6vw,115px)!important}
  .hero .hero-copy h1{font-size:clamp(76px,5vw,99px)!important}
}
`;
  const style=document.createElement('style');
  style.setAttribute('data-antz-cinematic','v7');
  style.textContent=css;
  document.head.append(style);
})();
