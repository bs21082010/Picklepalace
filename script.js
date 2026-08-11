/* Maa Ke Haton Ka Acchar — main script.
   HOW TO EDIT: Change the 3 lines below (your numbers & email). Everything else works automatically. */

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // your WhatsApp number, with country code, no + or spaces
const PHONE_NUMBER = "+91XXXXXXXXXX";   // your phone number for the "Call Us" button
const EMAIL = "your@email.com";         // your email

const WA_BASE = "https://wa.me/" + WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

/* -------------------- Language system -------------------- */

const langSelect = document.getElementById("langSelect");
let currentLang = localStorage.getItem("mkha_lang") || "en";

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] !== undefined ? dict[key] : TRANSLATIONS.en[key] !== undefined ? TRANSLATIONS.en[key] : key;
}

function fillLanguageSelect() {
  langSelect.innerHTML = "";
  Object.keys(LANGUAGES).forEach((code) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = LANGUAGES[code];
    langSelect.appendChild(opt);
  });
  langSelect.value = currentLang;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  renderProducts();
  renderSeasonal();
  renderReviews();
  renderFaq();
  renderGallery();
  renderOfferBanners();
  updateOrderLinks();
  updateCartUI();
  document.title = t("brand_name");
}

langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  localStorage.setItem("mkha_lang", currentLang);
  applyLanguage();
});

/* -------------------- Contact details -------------------- */

function updateOrderLinks() {
  document.getElementById("heroWhatsApp").href = WA_BASE + "?text=" + encodeURIComponent(t("order_message_default"));
  document.getElementById("contactWhatsApp").href = WA_BASE + "?text=" + encodeURIComponent(t("order_message_default"));
  document.getElementById("floatWa").href = WA_BASE + "?text=" + encodeURIComponent(t("order_message_default"));
  document.getElementById("contactPhoneLink").href = "tel:" + PHONE_NUMBER.replace(/[^0-9+]/g, "");
  document.getElementById("contactCall").href = "tel:" + PHONE_NUMBER.replace(/[^0-9+]/g, "");
  document.getElementById("contactEmailLink").href = "mailto:" + EMAIL;
}

/* -------------------- Product helpers -------------------- */

function productName(p) { return p.name[currentLang] || p.name.en; }
function productDesc(p) { return p.desc[currentLang] || p.desc.en || ""; }
function money(s) { return s; }

function starsHTML(rating) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= Math.round(rating) ? "★" : "☆";
  return s;
}

function variantFor(p, idx) { return p.variants[idx] || p.variants[0]; }

/* -------------------- Products render + filter + search -------------------- */

let currentFilter = "all";
let searchTerm = "";

function makeProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  const soldout = p.badge === "soldout";

  const badge = p.badge ? '<span class="product-badge badge-' + p.badge + '">' + t("badge_" + p.badge) + "</span>" : "";

  let variantOptions = "";
  p.variants.forEach((v, i) => {
    variantOptions += '<option value="' + i + '">' + v.size + " — " + v.price + (v.mrp !== v.price ? " (MRP " + v.mrp + ")" : "") + "</option>";
  });

  card.innerHTML =
    badge +
    (p.cat === "seasonal" ? '<span class="seasonal-tag">' + t("seasonal_tag") + "</span>" : "") +
    '<div class="product-emoji">' + p.emoji + "</div>" +
    '<div class="product-body">' +
      '<h3 class="product-name"></h3>' +
      '<div class="product-rating">' + starsHTML(p.rating) + ' <span class="reviews-count">' + p.rating + " (" + p.reviews + " " + t("reviews_suffix") + ")</span></div>" +
      '<p class="product-desc"></p>' +
      '<div class="product-variant-row">' +
        '<select class="product-size-select" aria-label="Size"></select>' +
      "</div>" +
      '<div class="product-meta">' +
        '<span class="product-price"><span class="product-mrp"></span><span class="product-sale"></span></span>' +
      "</div>" +
      '<button class="product-order">' + (soldout ? t("badge_soldout") : t("add_to_cart")) + "</button>" +
    "</div>";

  card.querySelector(".product-name").textContent = productName(p);
  card.querySelector(".product-desc").textContent = productDesc(p);

  const select = card.querySelector(".product-size-select");
  select.innerHTML = variantOptions;

  const saleEl = card.querySelector(".product-sale");
  const mrpEl = card.querySelector(".product-mrp");

  function updatePrice() {
    const v = variantFor(p, parseInt(select.value, 10));
    if (v.mrp && v.mrp !== v.price) {
      mrpEl.textContent = "MRP " + v.mrp;
    } else {
      mrpEl.textContent = "";
    }
    saleEl.textContent = v.price;
  }
  updatePrice();
  select.addEventListener("change", updatePrice);

  const orderBtn = card.querySelector(".product-order");
  if (soldout) {
    orderBtn.classList.add("soldout");
    orderBtn.disabled = true;
  } else {
    orderBtn.addEventListener("click", () => addToCart(p, parseInt(select.value, 10)));
  }
  return card;
}

function filteredRegularProducts() {
  return PRODUCTS.filter((p) => {
    if (p.cat === "seasonal") return false;
    if (currentFilter !== "all" && p.cat !== currentFilter) return false;
    if (searchTerm) {
      const hay = productName(p).toLowerCase() + " " + productDesc(p).toLowerCase();
      if (!hay.includes(searchTerm)) return false;
    }
    return true;
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  const list = filteredRegularProducts();
  const empty = document.getElementById("searchEmpty");
  if (list.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    list.forEach((p) => grid.appendChild(makeProductCard(p)));
  }
}

function renderSeasonal() {
  const grid = document.getElementById("seasonalGrid");
  grid.innerHTML = "";
  PRODUCTS.filter((p) => p.cat === "seasonal").forEach((p) => grid.appendChild(makeProductCard(p)));
}

document.getElementById("filterChips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  currentFilter = chip.getAttribute("data-filter");
  renderProducts();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderProducts();
});

/* -------------------- Offers banners -------------------- */

function renderOfferBanners() {
  const wrap = document.getElementById("offerBanners");
  wrap.innerHTML = "";
  const offers = PRODUCTS.filter((p) => p.badge === "offer" || p.badge === "bestseller").slice(0, 2);
  offers.forEach((p) => {
    const v = p.variants[0];
    const card = document.createElement("div");
    card.className = "offer-banner";
    card.innerHTML =
      '<div class="offer-emoji">' + p.emoji + "</div>" +
      '<div><h3></h3><p></p><button class="btn btn-whatsapp">' + t("order_btn") + "</button></div>";
    card.querySelector("h3").textContent = productName(p);
    card.querySelector("p").textContent = v.size + " — " + (v.mrp !== v.price ? "MRP " + v.mrp + " " : "") + v.price;
    card.querySelector("button").addEventListener("click", () => orderProductDirect(p));
    wrap.appendChild(card);
  });
}

function orderProductDirect(p) {
  const v = p.variants[0];
  const msg = t("order_message_1") + " " + productName(p) + " (" + v.size + " — " + v.price + "). " + t("order_message_2");
  window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
}

/* -------------------- Cart -------------------- */

let cart = [];
try { cart = JSON.parse(localStorage.getItem("mkha_cart") || "[]"); } catch (e) { cart = []; }

function saveCart() { localStorage.setItem("mkha_cart", JSON.stringify(cart)); }

function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function cartTotal() {
  let total = 0;
  cart.forEach((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    if (!p) return;
    const v = variantFor(p, i.vi);
    total += parseInt(String(v.price).replace(/[^0-9]/g, ""), 10) * i.qty;
  });
  return total;
}

function addToCart(p, vi) {
  const found = cart.find((i) => i.id === p.id && i.vi === vi);
  if (found) found.qty++;
  else cart.push({ id: p.id, vi: vi, qty: 1 });
  saveCart();
  updateCartUI();
  openCart();
  flashAdded();
}

function changeQty(id, vi, delta) {
  const item = cart.find((i) => i.id === id && i.vi === vi);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => !(i.id === id && i.vi === vi));
  saveCart();
  updateCartUI();
}

function removeItem(id, vi) {
  cart = cart.filter((i) => !(i.id === id && i.vi === vi));
  saveCart();
  updateCartUI();
}

function flashAdded() {
  const btn = document.querySelector(".cart-btn");
  if (!btn) return;
  btn.style.animation = "none";
  btn.offsetHeight;
  btn.style.animation = "pulse 0.6s 2";
}

function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  const countEl = document.getElementById("cartCount");
  countEl.textContent = cartCount();

  if (cart.length === 0) {
    itemsEl.innerHTML =
      '<div class="cart-empty"><p>🫙</p><p>' + t("cart_empty") + "</p>" +
      '<a class="btn btn-primary" href="#products" id="cartBrowse">' + t("cart_empty_btn") + "</a></div>";
    footerEl.style.display = "none";
    const browse = document.getElementById("cartBrowse");
    if (browse) browse.addEventListener("click", closeCart);
    return;
  }

  footerEl.style.display = "flex";
  itemsEl.innerHTML = "";
  cart.forEach((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    if (!p) return;
    const v = variantFor(p, i.vi);
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML =
      '<span class="cl-emoji">' + p.emoji + "</span>" +
      '<div class="cl-info">' +
        '<div class="cl-name"></div>' +
        '<div class="cl-size">' + v.size + " — " + v.price + "</div>" +
      "</div>" +
      '<div class="cl-qty">' +
        '<button data-act="minus">−</button><span>' + i.qty + "</span><button data-act=\"plus\">+</button>" +
      "</div>" +
      '<button class="cl-remove" data-act="remove" aria-label="Remove">✕</button>';
    line.querySelector(".cl-name").textContent = productName(p);
    line.querySelector('[data-act="minus"]').addEventListener("click", () => changeQty(i.id, i.vi, -1));
    line.querySelector('[data-act="plus"]').addEventListener("click", () => changeQty(i.id, i.vi, 1));
    line.querySelector('[data-act="remove"]').addEventListener("click", () => removeItem(i.id, i.vi));
    itemsEl.appendChild(line);
  });
  document.getElementById("cartTotal").textContent = "₹" + cartTotal();
}

function checkoutCart() {
  if (cart.length === 0) return;
  let msg = "🛒 " + t("cart_msg_1") + "\n";
  cart.forEach((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    if (!p) return;
    const v = variantFor(p, i.vi);
    const priceNum = parseInt(String(v.price).replace(/[^0-9]/g, ""), 10);
    msg += "• " + i.qty + "× " + productName(p) + " (" + v.size + ") — ₹" + (priceNum * i.qty) + "\n";
  });
  msg += "\n" + t("cart_msg_2") + " ___________\n" + t("cart_msg_3") + " ___________\n\n" + t("cart_total") + ": ₹" + cartTotal();
  window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
}

function updateCartUI() { renderCart(); }

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);
document.getElementById("cartCheckout").addEventListener("click", checkoutCart);
document.getElementById("cartClear").addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartUI();
});

/* -------------------- Reviews -------------------- */

function renderReviews() {
  const grid = document.getElementById("reviewGrid");
  grid.innerHTML = "";
  const reviews = [
    { text: t("review_1_text"), author: t("review_1_author") },
    { text: t("review_2_text"), author: t("review_2_author") },
    { text: t("review_3_text"), author: t("review_3_author") }
  ];
  reviews.forEach((r) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML =
      '<div class="review-stars">★★★★★</div>' +
      '<p class="review-text"></p>' +
      '<div class="review-author"></div>';
    card.querySelector(".review-text").textContent = r.text;
    card.querySelector(".review-author").textContent = r.author;
    grid.appendChild(card);
  });
  const note = document.createElement("p");
  note.className = "review-note";
  note.textContent = t("reviews_note");
  grid.appendChild(note);
}

document.getElementById("sendReviewBtn").addEventListener("click", () => {
  const msg = t("review_send_msg") + " ";
  window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
});

/* -------------------- FAQ & Policies -------------------- */

function bindFaqItems(container) {
  container.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const open = item.classList.contains("open");
      container.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        item.querySelector(".faq-answer").style.maxHeight = item.querySelector(".faq-answer-inner").scrollHeight + "px";
      }
    });
  });
}

function renderFaq() {
  const list = document.getElementById("faqList");
  list.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML =
      '<button class="faq-question"><span></span><span class="faq-arrow">▼</span></button>' +
      '<div class="faq-answer"><div class="faq-answer-inner"></div></div>';
    item.querySelector(".faq-question span").textContent = t("faq_" + i + "_q");
    item.querySelector(".faq-answer-inner").textContent = t("faq_" + i + "_a");
    list.appendChild(item);
  }
  bindFaqItems(list);
}

function renderPolicies() {
  const list = document.getElementById("policyList");
  bindFaqItems(list);
}

/* -------------------- Gallery -------------------- */

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = '<span>📷</span><strong>' + t("gallery_photo") + " " + i + "</strong><small>" + t("gallery_photo_" + i) + "</small>";
    grid.appendChild(item);
  }
}

/* -------------------- Track order + newsletter -------------------- */

document.getElementById("trackForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("trackInput").value.trim();
  const msg = t("track_msg") + " " + id;
  window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
});

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("newsletterInput").value.trim();
  const msg = t("newsletter_msg") + " " + name;
  window.open(WA_BASE + "?text=" + encodeURIComponent(msg), "_blank");
});

/* -------------------- Mobile menu + back to top -------------------- */

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
document.getElementById("mainNav").addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
});

const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* -------------------- PWA / installable app -------------------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

/* -------------------- Start -------------------- */

fillLanguageSelect();
applyLanguage();
renderPolicies();
