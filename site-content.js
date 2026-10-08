/* AntZ V4 public content mapping: reads the published review data. */
(() => {
  'use strict';
  const d=window.ANTZ_REVIEW_DATA||{};
  function select(selector){return document.querySelector(selector);}
  function setPhoto(selector,path){
    const node=select(selector);
    if(!node||typeof path!=='string')return;
    if(/^https:\/\//i.test(path)||(/^assets\/[a-zA-Z0-9_.\/-]+$/.test(path)&&!path.includes('..')))node.src=path;
  }
  if(d.photos){
    setPhoto('.hero-photo-v62',d.photos.hero);
    setPhoto('.hero-brandmark img',d.photos.logo);
    setPhoto('.lessonvisual img',d.photos.lessons);
  }
  if(!d.performance)return;
  const r=d.performance;
  for(const root of ['.performanceproof','#performance-reviews']){
    const card=select(root+' .review-ui-card')||select(root+' .review-card');
    if(!card)continue;
    if(/^https:\/\//i.test(r.googleReviewsUrl||''))card.href=r.googleReviewsUrl;
    const target=(s)=>card.querySelector(s);
    const name=target('.review-ui-name')||target('.review-identity strong');
    const copy=target('.review-ui-copy')||target('.review-copy');
    const year=target('.review-year');
    const stars=target('.review-ui-stars')||target('.stars');
    const avatar=target('.review-ui-avatar')||target('.avatar');
    if(name)name.textContent=r.name||'';
    if(copy)copy.textContent=r.text||'';
    if(year&&r.year)year.textContent=String(r.year);
    if(stars){const num=Math.max(1,Math.min(5,Math.round(Number(r.stars)||5)));stars.textContent='★'.repeat(num);stars.setAttribute('aria-label',num+' out of 5 stars');}
    if(avatar){avatar.textContent=(r.initial||r.name?.charAt(0)||'T').slice(0,2);if(/^#[0-9a-fA-F]{6}$/.test(r.avatarColor||''))avatar.style.background=r.avatarColor;}
    card.setAttribute('aria-label','Open '+(r.name||'performance')+' review on Google');
  }
})();