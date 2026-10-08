/* APGL reviews are managed in reviews-data.js via review-editor.html. */
const APGL_REVIEWS = window.ANTZ_REVIEW_DATA?.apgl || [];
const INITIAL_REVIEW_COUNT = Math.max(1, Math.min(25, Number(window.ANTZ_REVIEW_DATA?.initialCount) || 6));
const GOOGLE_REVIEWS_URL = window.ANTZ_REVIEW_DATA?.googleReviewsUrl || 'https://maps.app.goo.gl/pMG2JZh64t93f5Rj6?g_st=ac';

function escapeReviewHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function reviewStars(value) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  return `<span aria-hidden="true">${"★".repeat(rating)}<span class="empty">${"★".repeat(5-rating)}</span></span>`;
}

function reviewAvatar(review) {
  if (review.avatarImage) {
    return `<span class="review-ui-avatar"><img src="${escapeReviewHTML(review.avatarImage)}" alt="" loading="lazy"></span>`;
  }
  return `<span class="review-ui-avatar" style="background:${escapeReviewHTML(review.avatarColor || "#777")}">${escapeReviewHTML(review.initial || review.name?.charAt(0) || "?")}</span>`;
}

(function renderAPGLReviews(){
  const mount = document.getElementById("reviewCarousel");
  const toggle = document.getElementById("toggleReviews");
  const count = document.getElementById("reviewCount");
  if (!mount) return;

  const card = (review) => {
    const copy = review.text
      ? `<p class="review-ui-copy">${escapeReviewHTML(review.text)}</p>`
      : `<p class="review-ui-copy"><em>Full review wording not present in the saved screenshot.</em></p>`;
    const pending = review.pending
      ? `<div class="review-ui-pending"><strong>Source needed:</strong> ${escapeReviewHTML(review.note || "Expanded Google review screenshot required.")}</div>`
      : "";
    return `
      <a class="review-ui-card" href="${GOOGLE_REVIEWS_URL}" target="_blank" rel="noopener" aria-label="Open APGL Google reviews">
        ${reviewAvatar(review)}
        <span class="review-ui-body">
          <span class="review-ui-stars" aria-label="${Math.max(1,Math.min(5,Math.round(Number(review.stars)||5)))} out of 5 stars">${reviewStars(review.stars)}</span>
          <span class="review-ui-name">${escapeReviewHTML(review.name)}</span>
          ${copy}
          ${pending}
          <span class="review-ui-meta"><span class="review-ui-google">G</span> Google review</span>
        </span>
      </a>`;
  };

  // Shuffle on every page load so visitors see a different mix of reviews.
  const shuffledReviews = [...APGL_REVIEWS];
  for (let i = shuffledReviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledReviews[i], shuffledReviews[j]] = [shuffledReviews[j], shuffledReviews[i]];
  }

  const visible = shuffledReviews.slice(0, INITIAL_REVIEW_COUNT);
  mount.innerHTML = visible.map(card).join("");
  if (count) count.textContent = `${APGL_REVIEWS.length} Google reviews`;
  if (toggle) toggle.textContent = "Show all";
})();
