/* Maa Ke Haton Ka Acchar — main script.
   HOW TO EDIT: Change the 3 lines below (your numbers & email). Everything else works automatically. */

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // your WhatsApp number, with country code, no + or spaces
const PHONE_NUMBER = "+91XXXXXXXXXX";   // your phone number for the "Call Us" button
const EMAIL = "your@email.com";         // your email

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
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = val;
      else el.textContent = val;
    }
  });
  renderProducts();
  renderReviews();
  renderFaq();
  renderGallery();
  updateOrderLinks();
  document.title = t("brand_name");
}

langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  localStorage.setItem("mkha_lang", currentLang);
  applyLanguage();
});

/* -------------------- Contact details -------------------- */

function updateOrderLinks() {
  const base = "https://wa.me/" + WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  document.getElementById("heroWhatsApp").href = base + "?text=" + encodeURIComponent(t("order_message_default"));
  document.getElementById("contactWhatsApp").href = base + "?text=" + encodeURIComponent(t("order_message_default"));
  document.getElementById("contactPhoneLink").href = "tel:" + PHONE_NUMBER.replace(/[^0-9+]/g, "");
  document.getElementById("contactCall").href = "tel:" + PHONE_NUMBER.replace(/[^0-9+]/g, "");
  document.getElementById("contactEmailLink").href = "mailto:" + EMAIL;
}

function orderOnWhatsApp(product) {
  const name = product.name[currentLang] || product.name.en;
  const msg = t("order_message_1") + " " + name + " (" + product.size + " — " + product.price + "). " + t("order_message_2");
  const url = "https://wa.me/" + WHATSAPP_NUMBER.replace(/[^0-9]/g, "") + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}

/* -------------------- Products -------------------- */

function productCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  const name = p.name[currentLang] || p.name.en;
  const desc = p.desc[currentLang] || p.desc.en || "";
  card.innerHTML =
    (p.cat === "seasonal" ? '<span class="seasonal-tag">' + t("seasonal_tag") + "</span>" : "") +
    '<div class="product-emoji">' + p.emoji + "</div>" +
    '<div class="product-body">' +
      '<h3 class="product-name"></h3>' +
      '<p class="product-desc"></p>' +
      '<div class="product-meta">' +
        '<span class="product-price">' + p.price + '</span>' +
        '<span class="product-size">' + p.size + "</span>" +
      "</div>" +
      '<button class="product-order"></button>' +
    "</div>";
  card.querySelector(".product-name").textContent = name;
  card.querySelector(".product-desc").textContent = desc;
  card.querySelector(".product-order").textContent = t("order_btn");
  card.querySelector(".product-order").addEventListener("click", () => orderOnWhatsApp(p));
  return card;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const sgrid = document.getElementById("seasonalGrid");
  grid.innerHTML = "";
  sgrid.innerHTML = "";
  PRODUCTS.forEach((p) => {
    if (p.cat === "seasonal") sgrid.appendChild(productCard(p));
    else grid.appendChild(productCard(p));
  });
}

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
  note.className = "contact-note";
  note.style.marginTop = "18px";
  note.textContent = t("reviews_note");
  grid.appendChild(note);
}

/* -------------------- FAQ -------------------- */

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
    item.querySelector(".faq-question").addEventListener("click", () => {
      const open = item.classList.contains("open");
      list.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        item.querySelector(".faq-answer").style.maxHeight = item.querySelector(".faq-answer-inner").scrollHeight + "px";
      }
    });
    list.appendChild(item);
  }
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

/* -------------------- Mobile menu -------------------- */

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
document.getElementById("mainNav").addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
});

/* -------------------- PWA / installable app -------------------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

/* -------------------- Start -------------------- */

fillLanguageSelect();
applyLanguage();
