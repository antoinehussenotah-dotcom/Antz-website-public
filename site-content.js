/* AntZ Content Studio V5: optional page copy, media, gigs and photo gallery. */
(() => {
  'use strict';
  const data = window.ANTZ_REVIEW_DATA || {};
  const one = (selector, root=document) => root.querySelector(selector);
  const elt = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  const imageURL = value => {
    if (typeof value !== 'string') return '';
    if (/^https:\/\//i.test(value)) return value;
    if (/^assets\/[a-zA-Z0-9_.\/-]+$/.test(value) && !value.includes('..')) return value;
    return '';
  };
  const linkURL = value => typeof value === 'string' && /^https:\/\//i.test(value) ? value : '';
  const youtubeId = url => {
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      let id = '';
      if (host === 'youtu.be' || host === 'www.youtu.be') id = u.pathname.split('/')[1] || '';
      else if (['youtube.com','www.youtube.com','m.youtube.com'].includes(host))
        id = u.searchParams.get('v') || (/^\/(?:shorts|embed)\//.test(u.pathname) ? u.pathname.split('/')[2] : '');
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
    } catch (_) { return ''; }
  };
  function setPhoto(selector, path) {
    const target = one(selector), valid = imageURL(path);
    if (target && valid) target.src = valid;
  }
  if (data.photos) {
    setPhoto('.hero-photo-v62', data.photos.hero);
    setPhoto('.hero-brandmark img', data.photos.logo);
    setPhoto('.lessonvisual img', data.photos.lessons);
  }
  if (data.performance) {
    const r = data.performance;
    for (const root of ['.performanceproof', '#performance-reviews']) {
      const card = one(root + ' .review-ui-card') || one(root + ' .review-card');
      if (!card) continue;
      const url = linkURL(r.googleReviewsUrl);
      if (url) card.href = url;
      const name = one('.review-ui-name', card) || one('.review-identity strong', card);
      const copy = one('.review-ui-copy', card) || one('.review-copy', card);
      const year = one('.review-year', card);
      const stars = one('.review-ui-stars', card) || one('.stars', card);
      const avatar = one('.review-ui-avatar', card) || one('.avatar', card);
      if (name && typeof r.name === 'string') name.textContent = r.name;
      if (copy && typeof r.text === 'string') copy.textContent = r.text;
      if (year && r.year) year.textContent = String(r.year);
      if (stars) {
        const count = Math.max(1,Math.min(5,Math.round(Number(r.stars)||5)));
        stars.textContent = '★'.repeat(count);
        stars.setAttribute('aria-label', count+' out of 5 stars');
      }
      if (avatar) {
        avatar.textContent = String(r.initial || (r.name || 'T').charAt(0)).slice(0,2);
        if (/^#[0-9a-fA-F]{6}$/.test(r.avatarColor||'')) avatar.style.background = r.avatarColor;
      }
      if (r.name) card.setAttribute('aria-label','Open '+r.name+' review on Google');
    }
  }
  if (data.copy && one('#live')) {
    const targets = {
      heroIntro:'.hero-copy > p', liveIntro:'#live .intro', lessonsIntro:'#lessons .intro',
      originalsIntro:'#originals .intro', bioIntro:'#bio .biowrap .intro', contactIntro:'#contact .contactbox > p'
    };
    for (const [key, selector] of Object.entries(targets)) {
      const target = one(selector);
      if (target && typeof data.copy[key] === 'string') target.textContent = data.copy[key];
    }
  }
  if (data.media && one('#live')) {
    const m = data.media;
    const show = one('.showthumb'), showLabel = one('.showcopy strong');
    const showTitle = one('#live .grid2 > .card:nth-child(2) h3');
    if (show && youtubeId(m.showreelUrl)) {
      const id = youtubeId(m.showreelUrl);
      show.href = linkURL(m.showreelUrl);
      show.style.backgroundImage = `linear-gradient(0deg,rgba(0,0,0,.72),rgba(0,0,0,.08)),url('https://img.youtube.com/vi/${id}/hqdefault.jpg')`;
    }
    if (showLabel && typeof m.showreelLabel === 'string') showLabel.textContent = m.showreelLabel;
    if (showTitle && typeof m.showreelTitle === 'string') showTitle.textContent = m.showreelTitle;
    const teaser = one('.upcomingthumb');
    if (teaser && youtubeId(m.teaserUrl)) {
      const id = youtubeId(m.teaserUrl);
      teaser.href = linkURL(m.teaserUrl);
      const thumbnail = one('img',teaser);
      if (thumbnail) thumbnail.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    const competition = one('.competitionthumb');
    if (competition && linkURL(m.competitionUrl)) competition.href = m.competitionUrl;
  }
  if (!one('#live')) return; // Review archive only uses the testimonial mapping.
  const liveWrap = one('#live > .wrap');
  const after = one('.performanceproof',liveWrap);
  if (!liveWrap || !after) return;
  const style = elt('style');
  style.textContent = `
    .antz-v5-block{margin:28px 0 34px}
    .antz-v5-block h3{margin:0 0 13px;font-size:clamp(19px,2.4vw,26px);letter-spacing:.01em}
    .antz-v5-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .antz-v5-tile{background:#151b25;border:1px solid rgba(255,255,255,.14);border-radius:14px;overflow:hidden;color:#f2f2f2;text-decoration:none}
    .antz-v5-photo{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
    .antz-v5-cardcopy{padding:15px 16px 18px;min-width:0}
    .antz-v5-cardcopy strong{display:block;font-size:17px}
    .antz-v5-cardcopy p{margin:6px 0 0;color:#c1cbd7;line-height:1.5;overflow-wrap:anywhere}
    .antz-v5-meta{font-size:12px;color:#eac26e;margin-top:6px}
    .antz-v5-thumbnail{width:100%;aspect-ratio:16/9;display:block;object-fit:cover}
    .antz-v5-pill{font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:#e8bb69}
    @media(max-width:830px){.antz-v5-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:560px){.antz-v5-grid{grid-template-columns:1fr}}
  `;
  document.head.append(style);
  function block(title, rows, makeCard) {
    if (!Array.isArray(rows) || !rows.length) return;
    const section = elt('section','antz-v5-block');
    section.append(elt('h3','',title));
    const grid = elt('div','antz-v5-grid');
    rows.forEach(item => { const card = makeCard(item); if (card) grid.append(card); });
    if (!grid.childElementCount) return;
    section.append(grid);
    liveWrap.insertBefore(section,after);
  }
  block('LATEST GIGS',data.gigs,(g) => {
    if (!g || !g.venue) return null;
    const url = linkURL(g.link);
    const card = elt(url?'a':'article','antz-v5-tile');
    if (url) {card.href=url;card.target='_blank';card.rel='noopener noreferrer';}
    const body = elt('div','antz-v5-cardcopy');
    if (g.status) body.append(elt('span','antz-v5-pill',g.status));
    body.append(elt('strong','',g.venue));
    if (g.date || g.location) body.append(elt('div','antz-v5-meta',[g.date,g.location].filter(Boolean).join(' · ')));
    if (g.description) body.append(elt('p','',g.description));
    card.append(body);return card;
  });
  block('LIVE MOMENTS',data.gallery,(g) => {
    if (!g || !imageURL(g.src)) return null;
    const url = linkURL(g.link);
    const card = elt(url?'a':'article','antz-v5-tile');
    if (url) {card.href=url;card.target='_blank';card.rel='noopener noreferrer';}
    const img = elt('img','antz-v5-photo');img.src=imageURL(g.src);img.alt=g.title||'AntZ live performance';img.loading='lazy';
    card.append(img);
    if (g.title || g.caption) {
      const body = elt('div','antz-v5-cardcopy');
      if (g.title) body.append(elt('strong','',g.title));
      if (g.caption) body.append(elt('p','',g.caption));
      card.append(body);
    }
    return card;
  });
  block('MORE VIDEOS',data.media?.featured,(v) => {
    const id = youtubeId(v?.url);
    if (!id) return null;
    const card = elt('a','antz-v5-tile');card.href=linkURL(v.url);card.target='_blank';card.rel='noopener noreferrer';
    const img = elt('img','antz-v5-thumbnail');img.src=`https://img.youtube.com/vi/${id}/hqdefault.jpg`;img.alt=v.title||'Watch video';img.loading='lazy';
    const body = elt('div','antz-v5-cardcopy');body.append(elt('strong','',v.title||'Watch video'));
    if(v.description)body.append(elt('p','',v.description));
    card.append(img,body);return card;
  });
})();