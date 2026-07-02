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
   FEATURE 2 — Dynamically add & remove elements
   "Shot Wishlist": visitors type a dream shot idea and
   add it to a list (createElement + appendChild). Every
   item gets its own Remove button (remove()).

   FEATURE 4 — Persistent state with localStorage
   The wishlist is saved to localStorage on every change
   and restored on page load, so it survives a reload.
   ===================================================== */

const WISHLIST_KEY = "amara-shot-wishlist";

function getSavedWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

/* Reads the current list items from the DOM and saves them */
function syncWishlistToStorage() {
  const list = document.getElementById("wishlist-list");
  const items = [];
  list.querySelectorAll(".wishlist-text").forEach(function (span) {
    items.push(span.textContent);
  });
  saveWishlist(items);
}

/* Builds one <li> with its text and its own Remove button */
function createWishlistItem(text) {
  const li = document.createElement("li");
  li.className = "wishlist-item";

  const span = document.createElement("span");
  span.className = "wishlist-text";
  span.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "wishlist-remove";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    li.remove();
    syncWishlistToStorage();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  return li;
}

function addWishlistItem() {
  const input = document.getElementById("wishlist-input");
  const list = document.getElementById("wishlist-list");
  const text = input.value.trim();

  if (text === "") {
    input.focus();
    return;
  }

  const li = createWishlistItem(text);
  list.appendChild(li);
  input.value = "";
  input.focus();
  syncWishlistToStorage();
}

function initWishlist() {
  const addBtn = document.getElementById("wishlist-add");
  const input = document.getElementById("wishlist-input");
  const list = document.getElementById("wishlist-list");
  if (!addBtn || !input || !list) return;

  /* Restore anything saved from a previous visit (Feature 4) */
  getSavedWishlist().forEach(function (text) {
    list.appendChild(createWishlistItem(text));
  });

  addBtn.addEventListener("click", addWishlistItem);

  /* Pressing Enter in the input also adds the item */
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addWishlistItem();
    }
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
initWishlist();
initBannerReveal();
