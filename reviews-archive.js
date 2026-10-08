/* The full APGL review archive uses the same data as the homepage cards. */
(function () {
  const list = document.getElementById('antzTeachingReviewList');
  const count = document.getElementById('antzTeachingReviewCount');
  const d = window.ANTZ_REVIEW_DATA || {};
  const reviews = Array.isArray(d.apgl) ? d.apgl : [];
  if (!list) return;
  if (count) count.textContent = `${reviews.length} reviews`;
  let latest = null;
  const append = (parent, tag, cls, text) => {
    const e = document.createElement(tag); if (cls) e.className = cls;
    if (text !== undefined) e.textContent = String(text); parent.appendChild(e); return e;
  };
  for (const r of [...reviews].sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0))) {
    const year = Number(r.year) || 'Undated';
    if (year !== latest) { append(list,'div','year-divider',year); latest = year; }
    const a=append(list,'a','review-card');
    a.href=d.googleReviewsUrl || '#'; a.target='_blank'; a.rel='noopener';
    a.setAttribute('aria-label',`Open ${r.name} review on Google`);
    const avatar=append(a,'span','avatar');
    if (r.avatarImage) { const img=append(avatar,'img');img.src=r.avatarImage;img.alt='';img.loading='lazy'; }
    else { avatar.style.background=/^#[0-9a-f]{6}$/i.test(r.avatarColor||'')?r.avatarColor:'#555'; avatar.textContent=(r.initial||r.name?.[0]||'?').slice(0,2); }
    const body=append(a,'span','review-body'), top=append(body,'span','review-top'), identity=append(top,'span','review-identity');
    append(identity,'strong','',r.name||'Reviewer');append(identity,'small','review-year',year);
    const stars=append(top,'span','stars','★'.repeat(Math.max(1,Math.min(5,Number(r.stars)||5))));
    stars.setAttribute('aria-label',`${r.stars} out of 5 stars`);
    append(body,'span','review-copy',r.text||'');
    const source=append(body,'span','review-source');append(source,'b','','G');source.append(' Teaching review · Open original');
  }
})();
