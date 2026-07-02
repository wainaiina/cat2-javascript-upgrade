/* =====================================================
   Amara Wanjiku Photography — CAT 2 JavaScript
   Vanilla JS only. No frameworks, no libraries.
   ===================================================== */

/* =====================================================
   FEATURE 1 — Loop-rendered dynamic content
   The four service cards are no longer hardcoded in HTML.
   They live in this array of objects (each with a `name`
   property) and are rendered into the DOM with forEach().
   ===================================================== */

const services = [
  {
    name: "Portrait Sessions",
    icon: "\u{1F4F7}",
    description:
      "Professional headshots and personal portraits for individuals, families, and corporate teams.",
    price: "From KSh 8,000"
  },
  {
    name: "Wedding Coverage",
    icon: "\u{1F48D}",
    description:
      "Full-day wedding packages with edited gallery delivery within two weeks. Printed albums available.",
    price: "From KSh 45,000"
  },
  {
    name: "Wildlife & Travel",
    icon: "\u{1F30E}",
    description:
      "Safari and travel photography — stock licensing available for media and commercial use.",
    price: "From KSh 15,000"
  },
  {
    name: "Real Estate",
    icon: "\u{1F3E0}",
    description:
      "Interior and exterior shoots optimised for listings, brochures, and architectural portfolios.",
    price: "From KSh 10,000"
  }
];

function renderServices() {
  const container = document.getElementById("services-container");
  if (!container) return;

  container.innerHTML = ""; // start clean

  services.forEach(function (service) {
    const card = document.createElement("article");
    card.className = "service-card";

    const icon = document.createElement("div");
    icon.className = "service-icon";
    icon.textContent = service.icon;

    const title = document.createElement("h3");
    title.textContent = service.name;

    const desc = document.createElement("p");
    desc.textContent = service.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = service.price;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(price);
    container.appendChild(card);
  });
}

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

renderServices();
initBannerReveal();
