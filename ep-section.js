/* AntZ V6.2 optional EP releases block */
(function(){
  'use strict';
  const root=document.querySelector('#originals > .wrap');
  if(!root || document.getElementById('antz-ep-releases'))return;
  const entries=window.ANTZ_REVIEW_DATA?.eps;
  if(!Array.isArray(entries))return;
  const releases=entries.filter(ep=>ep?.visible===true && typeof ep.title==='string' && ep.title.trim());
  if(!releases.length)return;
  const safeUrl=v=>typeof v==='string' && /^https:\/\//i.test(v)?v:'';
  const safeImage=v=>typeof v==='string' && (safeUrl(v)||(/^assets\/[\w.\/-]+$/.test(v)&&!v.includes('..')))?v:'';
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined&&txt!==null)n.textContent=String(txt);return n;};
  const css=el('style');
  css.textContent=`
.antz-ep-wrap{margin:32px 0 40px;min-width:0}.antz-ep-wrap h3{font-size:clamp(21px,3vw,34px);letter-spacing:-.03em;margin:0 0 16px}
.antz-ep-list{display:grid;gap:16px}.antz-ep-card{display:grid;grid-template-columns:minmax(175px,275px) minmax(0,1fr);gap:24px;padding:20px;background:linear-gradient(135deg,#17151d,#101115);border:1px solid #34303e;border-radius:21px;min-width:0}
.antz-ep-artwork{width:100%;aspect-ratio:1;object-fit:cover;border-radius:14px;background:linear-gradient(145deg,#30202d,#111);display:block}
.antz-ep-placeholder{display:grid;place-items:center;color:#eadfe8;text-align:center;font-weight:950;font-size:clamp(20px,4vw,32px);letter-spacing:.09em;padding:12px}
.antz-ep-eyebrow{font-size:11px;font-weight:800;letter-spacing:.16em;color:#ff9fa7;text-transform:uppercase;margin:5px 0 10px}
.antz-ep-title{font-size:clamp(25px,4vw,43px);line-height:1.03;margin:0 0 10px}.antz-ep-description{font-size:15px;line-height:1.6;color:#d0cbd3;margin:0 0 14px;white-space:pre-line;overflow-wrap:anywhere}
.antz-ep-tracks{margin:12px 0 17px;padding-left:20px;display:grid;gap:5px;color:#ece5ef;font-size:14px}.antz-ep-meta{color:#aaa1af;font-size:13px;margin:0 0 10px}
.antz-ep-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}.antz-ep-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border-radius:999px;border:1px solid #b48191;color:#fff;text-decoration:none;font-size:13px;font-weight:800}.antz-ep-link:hover,.antz-ep-link:focus-visible{background:#5a2b3b}
@media(max-width:620px){.antz-ep-card{grid-template-columns:minmax(0,1fr);gap:15px;padding:15px}.antz-ep-artwork{max-width:420px;margin:auto}.antz-ep-title{font-size:29px}}
`;
  document.head.append(css);
  const section=el('div','antz-ep-wrap');section.id='antz-ep-releases';section.append(el('h3','','EPS & RELEASES'));
  const cards=el('div','antz-ep-list');
  for(const ep of releases){
    const card=el('article','antz-ep-card'),imgUrl=safeImage(ep.artwork);
    const art=imgUrl?el('img','antz-ep-artwork'):el('div','antz-ep-artwork antz-ep-placeholder',ep.title);
    if(imgUrl){art.src=imgUrl;art.alt='Artwork for '+ep.title;art.loading='lazy';}
    const body=el('div','');
    body.append(el('div','antz-ep-eyebrow',ep.status||'Original release'),el('h4','antz-ep-title',ep.title));
    if(ep.releaseDate)body.append(el('div','antz-ep-meta',ep.releaseDate));
    if(ep.description)body.append(el('p','antz-ep-description',ep.description));
    if(Array.isArray(ep.tracks)){
      const list=el('ol','antz-ep-tracks');
      for(const title of ep.tracks.slice(0,25))if(typeof title==='string' && title.trim())list.append(el('li','',title.trim()));
      if(list.childElementCount)body.append(list);
    }
    const links=el('div','antz-ep-links');
    for(const [key,label] of [['listenUrl','Listen'],['videoUrl','Watch video'],['moreUrl','More details']]){
      const href=safeUrl(ep[key]);if(!href)continue;
      const a=el('a','antz-ep-link',label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';links.append(a);
    }
    if(links.childElementCount)body.append(links);
    card.append(art,body);cards.append(card);
  }
  section.append(cards);
  const filters=root.querySelector('.filters');
  if(filters)filters.before(section);else root.append(section);
})();
