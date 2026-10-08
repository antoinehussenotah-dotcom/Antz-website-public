/* Open the visual reviews archive, sourced from the same reviews-data.js as the homepage. */
(function () {
  const overlay = document.getElementById('reviewArchiveOverlay');
  const frame = document.getElementById('reviewArchiveFrame');
  if (!overlay || !frame) return;
  let loaded = false;
  function openArchive(pushHash=true) {
    if (!loaded) { frame.src = 'reviews.html'; loaded = true; }
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('review-archive-open');
    if (pushHash && location.hash !== '#reviews') history.pushState(null,'','#reviews');
  }
  function closeArchive(updateHash=true) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('review-archive-open');
    if (updateHash && location.hash === '#reviews') history.replaceState(null,'','#lessons');
  }
  document.querySelectorAll('[data-open-review-archive]').forEach(a => a.addEventListener('click', e => {e.preventDefault();openArchive();}));
  window.addEventListener('message',e => {if (e.data === 'antz-close-reviews') closeArchive();});
  window.addEventListener('hashchange',() => {if (location.hash === '#reviews') openArchive(false); else if (overlay.classList.contains('open')) closeArchive(false);});
  if (location.hash === '#reviews') openArchive(false);
})();
