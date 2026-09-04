/* Maa Ke Haton Ka Acchar — main script.
   HOW TO EDIT: open editor.html (double-click) to change products, prices,
   WhatsApp number, phone, email, social links, brand name. Then run
   deploy-update.ps1 to publish. */

const WHATSAPP_NUMBER = SITE_CONFIG.whatsapp;
const PHONE_NUMBER = SITE_CONFIG.phone;
const EMAIL = SITE_CONFIG.email;

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
  document.getElementById("footerFbLink").href = SITE_CONFIG.facebook;
  document.getElementById("footerIgLink").href = SITE_CONFIG.instagram;
  document.getElementById("footerYtLink").href = SITE_CONFIG.youtube;
  document.getElementById("footerPhoneLink").href = "tel:" + PHONE_NUMBER.replace(/[^0-9+]/g, "");
  document.getElementById("footerEmailLink").href = "mailto:" + EMAIL;
}

/* -------------------- Product helpers -------------------- */

function productName(p) { return p.name[currentLang] || p.name.en; }
function productDesc(p) { return p.desc[currentLang] || p.desc.en || ""; }
function money(s) { return s; }

function parseGrams(sizeStr) {
  var s = sizeStr.toLowerCase();
  if (s.indexOf("kg") !== -1) {
    var m = s.match(/(\d+(?:\.\d+)?)\s*kg/);
    return m ? parseFloat(m[1]) * 1000 : 1000;
  }
  if (s.indexOf("\u00d7") !== -1) {
    var parts = s.split("\u00d7").map(function(p) { return p.trim(); });
    var count = parseInt(parts[0], 10);
    var grams = parseInt(parts[1].replace(/[^0-9]/g, ""), 10);
    return count * grams || 0;
  }
  var m2 = s.match(/(\d+)/);
  return m2 ? parseInt(m2[1], 10) : 0;
}

function pricePer100g(priceStr, sizeStr) {
  var price = parseInt(String(priceStr).replace(/[^0-9]/g, ""), 10);
  var grams = parseGrams(sizeStr);
  if (!grams || !price) return "";
  return "\u20b9" + Math.round(price * 100 / grams) + " / 100g";
}

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
    variantOptions += '<option value="' + i + '">' + v.size + " \u2014 " + v.price + (v.mrp !== v.price ? " (MRP " + v.mrp + ")" : "") + "</option>";
  });

  var featuresHTML = '<div class="product-features">';
  PRODUCT_FEATURES.forEach(function(f) {
    featuresHTML += '<span class="product-feature">' + f + '</span>';
  });
  featuresHTML += '</div>';

  var v0 = p.variants[0];
  var pp100 = pricePer100g(v0.price, v0.size);

  card.innerHTML =
    badge +
    (p.cat === "seasonal" ? '<span class="seasonal-tag">' + t("seasonal_tag") + "</span>" : "") +
    '<div class="product-emoji"><img class="mark-img" src="brand.svg" alt=""></div>' +
    '<div class="product-body">' +
      '<h3 class="product-name"></h3>' +
      '<div class="product-rating">' + starsHTML(p.rating) + '</div>' +
      '<p class="product-desc"></p>' +
      featuresHTML +
      '<div class="product-variant-row">' +
        '<select class="product-size-select" aria-label="Size"></select>' +
      "</div>" +
      '<div class="product-pricing">' +
        '<span class="product-sale"></span>' +
        '<span class="product-mrp"></span>' +
        (pp100 ? '<span class="product-pp100">' + pp100 + '</span>' : '') +
      "</div>" +
      '<div class="product-actions">' +
        '<button class="btn-add-cart">' + (soldout ? t("badge_soldout") : t("add_to_cart")) + "</button>" +
        (!soldout ? '<button class="btn-buy-now">' + t("buy_now") + "</button>" : '') +
      "</div>" +
    "</div>";

  card.querySelector(".product-name").textContent = productName(p);
  card.querySelector(".product-desc").textContent = productDesc(p);

  const select = card.querySelector(".product-size-select");
  select.innerHTML = variantOptions;

  const saleEl = card.querySelector(".product-sale");
  const mrpEl = card.querySelector(".product-mrp");

  function updatePrice() {
    const v = variantFor(p, parseInt(select.value, 10));
    saleEl.textContent = v.price;
    if (v.mrp && v.mrp !== v.price) {
      mrpEl.textContent = "MRP " + v.mrp;
      mrpEl.style.display = "";
    } else {
      mrpEl.style.display = "none";
    }
    var pp = pricePer100g(v.price, v.size);
    var ppEl = card.querySelector(".product-pp100");
    if (ppEl) ppEl.textContent = pp;
  }
  updatePrice();
  select.addEventListener("change", updatePrice);

  const addCartBtn = card.querySelector(".btn-add-cart");
  if (soldout) {
    addCartBtn.classList.add("soldout");
    addCartBtn.disabled = true;
  } else {
    addCartBtn.addEventListener("click", function() { addToCart(p, parseInt(select.value, 10)); });
  }

  var buyNowBtn = card.querySelector(".btn-buy-now");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function() {
      addToCart(p, parseInt(select.value, 10));
      openCart();
    });
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

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.getAttribute("data-filter") === filter));
  document.querySelectorAll(".cat-circle").forEach((c) => c.classList.toggle("active", c.getAttribute("data-filter") === filter));
  renderProducts();
}

document.getElementById("filterChips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  setFilter(chip.getAttribute("data-filter"));
});

document.getElementById("catCircles").addEventListener("click", (e) => {
  const circle = e.target.closest(".cat-circle");
  if (!circle) return;
  setFilter(circle.getAttribute("data-filter"));
  document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
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
      '<div class="offer-emoji offer-emoji-text"><img class="mark-img" src="brand.svg" alt="SVJ"></div>' +
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
      '<div class="cart-empty"><p class="cart-empty-emoji"><img class="mark-img" src="brand.svg" alt="SVJ"></p><p>' + t("cart_empty") + "</p>" +
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
      '<span class="cl-emoji cl-emoji-text"><img class="mark-img" src="brand.svg" alt="SVJ"></span>' +
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
  let msg = t("cart_msg_1") + "\n";
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
    item.innerHTML = '<span class="gallery-icon"><img class="mark-img" src="brand.svg" alt="SVJ"></span><strong>' + t("gallery_photo") + " " + i + "</strong><small>" + t("gallery_photo_" + i) + "</small>";
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

/* -------------------- Mobile bottom bar -------------------- */

(function () {
  var mbbCart = document.getElementById("mbbCart");
  var mbbCall = document.getElementById("mbbCall");
  var mbbSearch = document.querySelector(".mbb-search");
  if (mbbCart) mbbCart.addEventListener("click", function (e) { e.preventDefault(); document.getElementById("cartBtn").click(); });
  if (mbbCall) mbbCall.addEventListener("click", function (e) { e.preventDefault(); var a = document.getElementById("contactCall"); if (a) a.click(); });
  if (mbbSearch) {
    mbbSearch.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
      var inp = document.getElementById("searchInput");
      if (inp) setTimeout(function () { inp.focus(); }, 400);
    });
  }
})();

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
