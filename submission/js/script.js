/* =====================================================
   Amara Wanjiku Photography — CAT 2 JavaScript
   Vanilla JS only. No frameworks, no libraries.
   ===================================================== */

/* =====================================================
   FEATURE 5 — Click-to-reveal on the banner
   Clicking the banner image toggles a class on its
   wrapper with classList.toggle(), revealing an overlay
   caption — same pattern as the "Toggling Classes"
   example from class.
   ===================================================== */

function initBannerReveal() {
  const banner = document.getElementById("site-banner");
  const wrap = document.getElementById("banner-wrap");
  if (!banner || !wrap) return;

  banner.addEventListener("click", function () {
    wrap.classList.toggle("revealed");
  });
}

/* =====================================================
   START-UP — run everything once the DOM is ready
   (script is loaded with `defer`, so the DOM is parsed)
   ===================================================== */

initBannerReveal();
