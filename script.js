"use strict";

/* ============================================================
   FA2M — Main Script  |  v3.0 — Panier + CFA + WhatsApp Pro
   ============================================================ */

// ─── 1. Config ────────────────────────────────────────────────
const FA2M = {
  phone: "781332323",
  storageKey: "fa2m_products",
  cartKey: "fa2m_cart",
  adminPass: "fa2m2024",
  sessionKey: "fa2m_admin_ok",
};

// ─── 2. Format prix CFA ───────────────────────────────────────
function formatCFA(amount) {
  return Number(amount).toLocaleString("fr-FR") + " FCFA";
}

// ─── 3. Default Products (prix en FCFA) ──────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Montre Luxe Pro X1",
    category: "accessoires",
    price: 75000,
    oldPrice: 115000,
    badge: "Populaire",
    shortDesc:
      'Montre connectée haut de gamme — bracelet cuir véritable, écran AMOLED 1.4"',
    longDesc:
      "La Montre Luxe Pro X1 allie élégance et technologie de pointe. Son boîtier en acier inoxydable 316L résiste à l'eau jusqu'à 50m. L'écran AMOLED offre une luminosité exceptionnelle même en plein soleil. Suivi santé 24h/24 : cardiaque, SpO2, sommeil. Autonomie 7 jours.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1548171916-c8fd108eba62?w=600&q=80",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=600&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    ],
    rating: 4.8,
    reviews: 142,
    stock: 15,
    specs: [
      ["Boîtier", "Acier inoxydable 316L"],
      ["Écran", 'AMOLED 1.4"'],
      ["Étanchéité", "5 ATM (50m)"],
      ["Autonomie", "7 jours"],
      ["Bracelet", "Cuir véritable"],
      ["Connectivité", "Bluetooth 5.0"],
    ],
  },
  {
    id: 2,
    name: "Sac Cuir Milano",
    category: "sacs",
    price: 52000,
    oldPrice: 87000,
    badge: "Promo",
    shortDesc: "Sac à main en cuir pleine fleur — coutures main, doublure soie",
    longDesc:
      "Fabriqué artisanalement en Italie, le Sac Cuir Milano est confectionné avec du cuir pleine fleur de la meilleure qualité. Ses coutures faites main garantissent une durabilité exceptionnelle. La doublure en soie naturelle et les finitions dorées en font un accessoire de luxe accessible.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4468?w=600&q=80",
    ],
    rating: 4.9,
    reviews: 87,
    stock: 8,
    specs: [
      ["Matière", "Cuir pleine fleur"],
      ["Origine", "Italie"],
      ["Doublure", "Soie naturelle"],
      ["Fermeture", "Zip YKK doré"],
      ["Dimensions", "32×24×12 cm"],
      ["Poids", "680g"],
    ],
  },
  {
    id: 3,
    name: "Parfum Noir Absolu",
    category: "beaute",
    price: 40000,
    oldPrice: 55000,
    badge: "Nouveau",
    shortDesc:
      "Eau de parfum intense — notes boisées, musquées et ambrées — 100ml",
    longDesc:
      "Noir Absolu est une fragrance captivante qui évoque mystère et élégance. Sa pyramide olfactive s'ouvre sur des notes de bergamote et de cardamome épicée, évolue vers un cœur de rose de Damas et de vétiver, pour se clore sur un sillage profond de bois de oud et de musc blanc.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=600&q=80",
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
    ],
    rating: 4.7,
    reviews: 203,
    stock: 24,
    specs: [
      ["Volume", "100 ml"],
      ["Concentration", "Eau de Parfum"],
      ["Famille", "Oriental boisé"],
      ["Tête", "Bergamote, Cardamome"],
      ["Cœur", "Rose de Damas, Vétiver"],
      ["Fond", "Oud, Musc blanc"],
    ],
  },
  {
    id: 4,
    name: "Sneakers Urban Elite",
    category: "chaussures",
    price: 63000,
    oldPrice: 92000,
    badge: "Populaire",
    shortDesc:
      "Baskets premium — semelle épaisse, cuir nubuck — confort toute la journée",
    longDesc:
      "Les Sneakers Urban Elite redéfinissent le confort urbain. Construites sur une semelle EVA de 4cm pour un amorti optimal, leur tige en cuir nubuck premium vieillit magnifiquement. La doublure respirante maintient le pied au sec toute la journée. Disponible en 5 coloris.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ],
    rating: 4.6,
    reviews: 318,
    stock: 31,
    specs: [
      ["Matière tige", "Cuir nubuck"],
      ["Semelle", "EVA 4cm"],
      ["Doublure", "Tissu respirant"],
      ["Fermeture", "Lacets plats"],
      ["Tailles", "36 à 47"],
      ["Coloris", "5 disponibles"],
    ],
  },
  {
    id: 5,
    name: "Ceinture Signature",
    category: "accessoires",
    price: 26000,
    oldPrice: 38000,
    badge: "Promo",
    shortDesc:
      "Ceinture en cuir de vachette — boucle acier inox — largeur 3.5cm",
    longDesc:
      "La Ceinture Signature est taillée dans un cuir de vachette souple et résistant, tanné végétalement en France. Sa boucle en acier inoxydable brossé ne ternira jamais. La coupe droite de 3.5cm convient autant au costume qu'au jean.",
    image:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80",
      "https://images.unsplash.com/photo-1553682544-60a6a46a9236?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1548171916-c8fd108eba62?w=600&q=80",
    ],
    rating: 4.5,
    reviews: 56,
    stock: 19,
    specs: [
      ["Matière", "Cuir vachette"],
      ["Tannage", "Végétal France"],
      ["Boucle", "Acier inox brossé"],
      ["Largeur", "3.5 cm"],
      ["Tailles", "85 à 115 cm"],
      ["Coloris", "Noir, Marron"],
    ],
  },
  {
    id: 6,
    name: "Lunettes Aviator Gold",
    category: "accessoires",
    price: 46000,
    oldPrice: 70000,
    badge: "Nouveau",
    shortDesc:
      "Lunettes de soleil aviateur — monture dorée, verres polarisés UV400",
    longDesc:
      "Les Lunettes Aviator Gold incarnent le chic intemporel. Leur monture en alliage dorée est légère et robuste. Les verres polarisés catégorie 3 offrent une protection UV400 optimale. Le traitement anti-reflets permet une vision parfaite même dans les conditions de forte luminosité.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80",
    ],
    rating: 4.4,
    reviews: 94,
    stock: 12,
    specs: [
      ["Monture", "Alliage doré"],
      ["Verres", "Polarisés catégorie 3"],
      ["Protection", "UV400"],
      ["Traitement", "Anti-reflets"],
      ["Pont", "Ajustable"],
      ["Poids", "22g"],
    ],
  },
  {
    id: 7,
    name: "Portefeuille Slim Carbon",
    category: "accessoires",
    price: 22000,
    oldPrice: 32000,
    badge: "",
    shortDesc:
      "Portefeuille ultra-fin — fibre de carbone, protection RFID, 8 cartes",
    longDesc:
      "Le Portefeuille Slim Carbon est le compagnon idéal de l'homme moderne. Son épaisseur de seulement 6mm grâce à la fibre de carbone véritable. La protection RFID intégrée bloque les tentatives de piratage sans contact. Jusqu'à 8 cartes + billets dans un encombrement minimal.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      "https://images.unsplash.com/photo-1553682544-60a6a46a9236?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ],
    rating: 4.7,
    reviews: 167,
    stock: 42,
    specs: [
      ["Matière", "Fibre de carbone"],
      ["Épaisseur", "6 mm"],
      ["Capacité", "8 cartes + billets"],
      ["Protection", "RFID anti-scan"],
      ["Fermeture", "Élastique dyneema"],
      ["Poids", "35g"],
    ],
  },
  {
    id: 8,
    name: "Chapeau Panama Artisan",
    category: "chapeaux",
    price: 34000,
    oldPrice: 50000,
    badge: "Populaire",
    shortDesc:
      "Chapeau Panama tressé main — fibre de toquilla, protection UV50+",
    longDesc:
      "Véritable Panama d'Équateur, ce chapeau est tressé à la main par des artisans de Montecristi. Sa fibre de toquilla sèche au soleil offre légèreté et solidité incomparables. Le ruban en grosgrain marine et la finition brûlée intérieure en font une pièce de collection. Protection solaire UV50+.",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&q=80",
      "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=600&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    ],
    rating: 4.9,
    reviews: 48,
    stock: 6,
    specs: [
      ["Origine", "Montecristi, Équateur"],
      ["Matière", "Fibre de toquilla"],
      ["Fabrication", "Tressage main"],
      ["Protection", "UV50+"],
      ["Ruban", "Grosgrain marine"],
      ["Tailles", "S / M / L / XL"],
    ],
  },
];

// ─── 4. Storage: produits ──────────────────────────────────────
function loadProducts() {
  try {
    var raw = localStorage.getItem(FA2M.storageKey);
    if (raw) {
      var arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) {
    /* ignore */
  }
  return DEFAULT_PRODUCTS.map(function (p) {
    return Object.assign({}, p);
  });
}
function saveProducts(products) {
  try {
    localStorage.setItem(FA2M.storageKey, JSON.stringify(products));
  } catch (e) {
    /* ignore */
  }
}
window.FA2M_PRODUCTS = loadProducts();

// ─── 5. Storage: panier ───────────────────────────────────────
function loadCart() {
  try {
    var raw = localStorage.getItem(FA2M.cartKey);
    if (raw) {
      var arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    }
  } catch (e) {
    /* ignore */
  }
  return [];
}
function saveCart(cart) {
  try {
    localStorage.setItem(FA2M.cartKey, JSON.stringify(cart));
  } catch (e) {
    /* ignore */
  }
}
var CART = loadCart();

// ─── 6. Utilitaires ──────────────────────────────────────────
function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function starsHtml(rating) {
  var full = Math.floor(rating);
  var half = rating % 1 >= 0.5 ? 1 : 0;
  var empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}
function discount(price, old) {
  if (!old || old <= price) return 0;
  return Math.round((1 - price / old) * 100);
}
function badgeCls(badge) {
  var m = {
    Populaire: "badge-populaire",
    Promo: "badge-promo",
    Nouveau: "badge-nouveau",
  };
  return m[badge] || "";
}
function formatNum(n, dec) {
  if (dec > 0) return n.toFixed(dec);
  return Math.floor(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}
function openNew(url) {
  window.open(url, "_blank", "noopener");
}

// ─── 7. Icône WhatsApp ───────────────────────────────────────
var WA_ICON =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

// ─── 8. Rendu carte produit ────────────────────────────────────
function renderProductCard(p) {
  var disc = discount(p.price, p.oldPrice);
  var badgeHtml = p.badge
    ? '<span class="product-badge ' +
      badgeCls(p.badge) +
      '">' +
      escHtml(p.badge) +
      "</span>"
    : "";
  var oldPriceHtml = p.oldPrice
    ? '<span class="price-old">' + formatCFA(p.oldPrice) + "</span>"
    : "";
  var discHtml =
    disc > 0 ? '<span class="price-discount">-' + disc + "%</span>" : "";

  return (
    '<div class="product-card reveal" data-id="' +
    p.id +
    '">' +
    '<div class="product-img-wrap">' +
    '<img src="' +
    escHtml(p.image) +
    '" alt="' +
    escHtml(p.name) +
    '" loading="lazy">' +
    badgeHtml +
    '<button class="product-wishlist" title="Ajouter aux favoris" aria-label="Favoris">&#9825;</button>' +
    "</div>" +
    '<div class="product-body">' +
    '<div class="product-cat">' +
    escHtml(p.category) +
    "</div>" +
    '<h3 class="product-name">' +
    escHtml(p.name) +
    "</h3>" +
    '<p class="product-short">' +
    escHtml(p.shortDesc) +
    "</p>" +
    '<div class="rating">' +
    '<span class="stars">' +
    starsHtml(p.rating) +
    "</span>" +
    '<span class="rating-count">(' +
    p.reviews +
    ")</span>" +
    "</div>" +
    '<div class="price-row">' +
    '<span class="price-current">' +
    formatCFA(p.price) +
    "</span>" +
    oldPriceHtml +
    discHtml +
    "</div>" +
    '<div class="card-actions">' +
    '<button class="btn btn-primary btn-sm" onclick="openProductModal(' +
    p.id +
    ')">Voir détails</button>' +
    '<button class="btn btn-cart btn-sm" onclick="addToCart(' +
    p.id +
    ', this)">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z"/></svg>' +
    " Panier" +
    "</button>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

// ─── 9. PANIER — Logique complète ─────────────────────────────

function addToCart(productId, btnEl) {
  var p = window.FA2M_PRODUCTS.find(function (x) {
    return x.id === productId || x.id === Number(productId);
  });
  if (!p) return;

  var existing = CART.find(function (item) {
    return item.id === p.id;
  });
  if (existing) {
    existing.qty = Math.min(existing.qty + 1, p.stock || 99);
  } else {
    CART.push({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      qty: 1,
    });
  }
  saveCart(CART);
  updateCartUI();
  animateCartBtn(btnEl);
  showCartToast(p.name);
}

function removeFromCart(productId) {
  CART = CART.filter(function (item) {
    return item.id !== Number(productId);
  });
  saveCart(CART);
  updateCartUI();
  renderCartItems();
}

function updateCartQty(productId, newQty) {
  var qty = parseInt(newQty, 10);
  if (isNaN(qty) || qty < 1) {
    removeFromCart(productId);
    return;
  }
  var item = CART.find(function (i) {
    return i.id === Number(productId);
  });
  if (item) {
    var p = window.FA2M_PRODUCTS.find(function (x) {
      return x.id === item.id;
    });
    item.qty = p ? Math.min(qty, p.stock || 99) : qty;
    saveCart(CART);
    updateCartUI();
    renderCartItems();
  }
}

function clearCart() {
  CART = [];
  saveCart(CART);
  updateCartUI();
  renderCartItems();
}

function cartTotal() {
  return CART.reduce(function (sum, item) {
    return sum + item.price * item.qty;
  }, 0);
}

function cartCount() {
  return CART.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
}

// Met à jour badge compteur + total dans le header
function updateCartUI() {
  var count = cartCount();
  document.querySelectorAll(".cart-badge").forEach(function (el) {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
  var totalEl = document.getElementById("cart-total-amount");
  if (totalEl) totalEl.textContent = formatCFA(cartTotal());

  var emptyMsg = document.getElementById("cart-empty-msg");
  var cartContent = document.getElementById("cart-content");
  var cartCheckoutBtn = document.getElementById("cart-checkout-btn");
  if (emptyMsg) emptyMsg.style.display = count === 0 ? "block" : "none";
  if (cartContent) cartContent.style.display = count === 0 ? "none" : "block";
  if (cartCheckoutBtn)
    cartCheckoutBtn.style.display = count === 0 ? "none" : "flex";
}

// Rendu de la liste articles dans le drawer panier
function renderCartItems() {
  var container = document.getElementById("cart-items-list");
  if (!container) return;
  if (CART.length === 0) {
    container.innerHTML = "";
    updateCartUI();
    return;
  }
  container.innerHTML = CART.map(function (item) {
    return (
      '<div class="cart-item" data-id="' +
      item.id +
      '">' +
      '<img class="cart-item-img" src="' +
      escHtml(item.image) +
      '" alt="' +
      escHtml(item.name) +
      '" onerror="this.src=\'https://placehold.co/60x60/0d1829/00e676?text=FA2M\'">' +
      '<div class="cart-item-info">' +
      '<p class="cart-item-name">' +
      escHtml(item.name) +
      "</p>" +
      '<p class="cart-item-price">' +
      formatCFA(item.price) +
      "</p>" +
      '<div class="cart-qty-wrap">' +
      '<button class="cart-qty-btn" onclick="updateCartQty(' +
      item.id +
      ", " +
      (item.qty - 1) +
      ')" aria-label="Diminuer">−</button>' +
      '<span class="cart-qty-val">' +
      item.qty +
      "</span>" +
      '<button class="cart-qty-btn" onclick="updateCartQty(' +
      item.id +
      ", " +
      (item.qty + 1) +
      ')" aria-label="Augmenter">+</button>' +
      "</div>" +
      "</div>" +
      '<div class="cart-item-right">' +
      '<p class="cart-item-subtotal">' +
      formatCFA(item.price * item.qty) +
      "</p>" +
      '<button class="cart-item-remove" onclick="removeFromCart(' +
      item.id +
      ')" aria-label="Supprimer ' +
      escHtml(item.name) +
      '">✕</button>' +
      "</div>" +
      "</div>"
    );
  }).join("");
  updateCartUI();
}

// Ouvrir/fermer le drawer panier
function openCart() {
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");
  if (drawer) {
    drawer.classList.add("open");
  }
  if (overlay) {
    overlay.classList.add("visible");
  }
  document.body.style.overflow = "hidden";
  renderCartItems();
}
function closeCart() {
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");
  if (drawer) {
    drawer.classList.remove("open");
  }
  if (overlay) {
    overlay.classList.remove("visible");
  }
  document.body.style.overflow = "";
  // Fermer aussi le formulaire si ouvert
  var checkoutForm = document.getElementById("checkout-form-wrap");
  if (checkoutForm) {
    checkoutForm.classList.remove("open");
  }
}

// Animation bouton "Ajouter au panier"
function animateCartBtn(btn) {
  if (!btn) return;
  var orig = btn.innerHTML;
  btn.innerHTML = "✓ Ajouté !";
  btn.style.background = "linear-gradient(135deg,#25D366,#00bfa5)";
  btn.style.color = "#04221b";
  btn.disabled = true;
  setTimeout(function () {
    btn.innerHTML = orig;
    btn.style.background = "";
    btn.style.color = "";
    btn.disabled = false;
  }, 1400);
}

// Toast notification mini
function showCartToast(name) {
  var toast = document.getElementById("cart-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cart-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <strong>' +
    escHtml(name) +
    "</strong> ajouté au panier";
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(function () {
    toast.classList.remove("show");
  }, 2800);
}

// ─── 10. FORMULAIRE DE COMMANDE ────────────────────────────────

function openCheckoutForm() {
  if (CART.length === 0) return;
  var wrap = document.getElementById("checkout-form-wrap");
  if (wrap) {
    wrap.classList.add("open");
    // Scroll vers le formulaire
    setTimeout(function () {
      var formEl = document.getElementById("order-form");
      if (formEl)
        formEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

function closeCheckoutForm() {
  var wrap = document.getElementById("checkout-form-wrap");
  if (wrap) wrap.classList.remove("open");
}

// Soumettre la commande → WhatsApp + sauvegarde localStorage
function submitOrder(e) {
  e.preventDefault();

  var prenom = (document.getElementById("order-prenom") || {}).value || "";
  var nom = (document.getElementById("order-nom") || {}).value || "";
  var telephone =
    (document.getElementById("order-telephone") || {}).value || "";
  var adresse = (document.getElementById("order-adresse") || {}).value || "";

  if (!prenom.trim() || !nom.trim() || !telephone.trim() || !adresse.trim()) {
    alert("⚠️ Veuillez remplir tous les champs obligatoires.");
    return;
  }

  var total = cartTotal();
  var items = CART.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    };
  });

  // ── Sauvegarder la commande dans localStorage (visible dans admin) ──
  var newOrder = {
    id: "cmd_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    prenom: prenom.trim(),
    nom: nom.trim(),
    telephone: telephone.trim(),
    adresse: adresse.trim(),
    items: items,
    total: total,
    status: "nouvelle",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  try {
    var rawOrders = localStorage.getItem("fa2m_orders");
    var orders = rawOrders ? JSON.parse(rawOrders) : [];
    if (!Array.isArray(orders)) orders = [];
    orders.push(newOrder);
    localStorage.setItem("fa2m_orders", JSON.stringify(orders));
  } catch (err) {
    /* ignore storage errors */
  }

  // ── Construire le message WhatsApp structuré ──
  var lines = [];
  lines.push("🛍️ *NOUVELLE COMMANDE — FA2M*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("👤 *INFORMATIONS CLIENT*");
  lines.push("• Prénom  : " + prenom.trim());
  lines.push("• Nom     : " + nom.trim());
  lines.push("• Tél     : " + telephone.trim());
  lines.push("• Adresse : " + adresse.trim());
  lines.push("");
  lines.push("📦 *ARTICLES COMMANDÉS*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━");

  CART.forEach(function (item, idx) {
    lines.push("");
    lines.push(idx + 1 + ". *" + item.name + "*");
    lines.push("   Qté      : " + item.qty);
    lines.push("   Prix/u   : " + formatCFA(item.price));
    lines.push("   Sous-total : " + formatCFA(item.price * item.qty));
  });

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("🧾 *TOTAL : " + formatCFA(total) + "*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push(
    "✅ Merci de confirmer cette commande et d'indiquer le délai de livraison.",
  );

  var message = lines.join("\n");
  var url =
    "https://wa.me/" + FA2M.phone + "?text=" + encodeURIComponent(message);
  openNew(url);

  // ── Réinitialiser après envoi ──
  clearCart();
  closeCart();
  var form = document.getElementById("order-form");
  if (form) form.reset();
  showGlobalToast("✓ Commande envoyée et enregistrée !");
}

// ─── 11. Modal produit détaillé ───────────────────────────────
var _modalProduct = null;
var _modalImgIdx = 0;

function openProductModal(productId) {
  var p = window.FA2M_PRODUCTS.find(function (x) {
    return x.id === productId || x.id === Number(productId);
  });
  if (!p) return;
  _modalProduct = p;
  _modalImgIdx = 0;

  var overlay = document.getElementById("product-modal");
  if (!overlay) return;

  var imgs = p.images && p.images.length ? p.images : [p.image];
  var disc = discount(p.price, p.oldPrice);

  // Image principale
  var mainImg = overlay.querySelector(".modal-main-img");
  if (mainImg) {
    mainImg.src = imgs[0];
    mainImg.alt = p.name;
    mainImg.style.opacity = "1";
  }

  // Miniatures (jusqu'à 4)
  var thumbsEl = overlay.querySelector(".modal-thumbs");
  if (thumbsEl) {
    thumbsEl.innerHTML = imgs
      .map(function (img, i) {
        return (
          '<img class="modal-thumb' +
          (i === 0 ? " active" : "") +
          '" src="' +
          escHtml(img) +
          '" alt="Vue ' +
          (i + 1) +
          '" onclick="changeModalImage(' +
          i +
          ')" loading="lazy">'
        );
      })
      .join("");
  }

  // Badge
  var badgeWrap = overlay.querySelector(".modal-badge-wrap");
  if (badgeWrap) {
    badgeWrap.innerHTML = p.badge
      ? '<span class="product-badge ' +
        badgeCls(p.badge) +
        '">' +
        escHtml(p.badge) +
        "</span>"
      : "";
  }

  // Nom
  var nameEl = overlay.querySelector(".modal-name");
  if (nameEl) nameEl.textContent = p.name;

  // Rating
  var ratingEl = overlay.querySelector(".modal-rating-row");
  if (ratingEl) {
    ratingEl.innerHTML =
      '<span class="stars">' +
      starsHtml(p.rating) +
      "</span>" +
      '<span style="color:var(--text-2);font-size:.9rem">' +
      p.rating +
      "/5</span>" +
      '<span style="color:var(--muted);font-size:.85rem">· ' +
      p.reviews +
      " avis</span>";
  }

  // Prix en CFA
  var priceRow = overlay.querySelector(".modal-price-row");
  if (priceRow) {
    var oldHtml = p.oldPrice
      ? '<span class="modal-price-old">' + formatCFA(p.oldPrice) + "</span>"
      : "";
    var saveHtml =
      disc > 0 ? '<span class="modal-price-save">−' + disc + "%</span>" : "";
    priceRow.innerHTML =
      '<span class="modal-price-current">' +
      formatCFA(p.price) +
      "</span>" +
      oldHtml +
      saveHtml;
  }

  // Description
  var descEl = overlay.querySelector(".modal-desc");
  if (descEl) descEl.textContent = p.longDesc;

  // Specs
  var specsEl = overlay.querySelector(".modal-specs-tbody");
  if (specsEl) {
    specsEl.innerHTML = (p.specs || [])
      .map(function (row) {
        return (
          "<tr><td>" +
          escHtml(row[0]) +
          "</td><td>" +
          escHtml(row[1]) +
          "</td></tr>"
        );
      })
      .join("");
  }

  // Stock
  var stockEl = overlay.querySelector(".modal-stock strong");
  if (stockEl) stockEl.textContent = p.stock;

  // Bouton "Ajouter au panier"
  var cartBtnModal = overlay.querySelector(".modal-cart-btn");
  if (cartBtnModal) {
    cartBtnModal.onclick = function () {
      addToCart(p.id, cartBtnModal);
    };
  }

  // Bouton "Commander directement" (WhatsApp produit seul)
  var orderBtn = overlay.querySelector(".modal-order-btn");
  if (orderBtn) {
    orderBtn.onclick = function () {
      closeProductModal();
      addToCart(p.id, null);
      setTimeout(function () {
        openCart();
      }, 200);
    };
  }

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeModalImage(idx) {
  if (!_modalProduct) return;
  var imgs =
    _modalProduct.images && _modalProduct.images.length
      ? _modalProduct.images
      : [_modalProduct.image];
  if (idx < 0 || idx >= imgs.length) return;
  _modalImgIdx = idx;
  var overlay = document.getElementById("product-modal");
  if (!overlay) return;
  var mainImg = overlay.querySelector(".modal-main-img");
  if (mainImg) {
    mainImg.style.opacity = "0";
    setTimeout(function () {
      mainImg.src = imgs[idx];
      mainImg.style.opacity = "1";
    }, 180);
  }
  overlay.querySelectorAll(".modal-thumb").forEach(function (t, i) {
    t.classList.toggle("active", i === idx);
  });
}

function closeProductModal() {
  var overlay = document.getElementById("product-modal");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ─── 12. Page produits ────────────────────────────────────────
function initProductsPage() {
  var container = document.getElementById("products-list");
  if (!container) return;

  var products = window.FA2M_PRODUCTS;
  var filtered = products.slice();
  var activeCat = "all";
  var searchQ = "";
  var sortVal = "default";

  function render() {
    if (!filtered.length) {
      container.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)"><p style="font-size:2rem;margin-bottom:.5rem">🔍</p><p>Aucun produit trouvé</p></div>';
    } else {
      container.innerHTML = filtered.map(renderProductCard).join("");
    }
    var countEl = document.getElementById("products-count");
    if (countEl)
      countEl.textContent =
        filtered.length + " produit" + (filtered.length !== 1 ? "s" : "");
    initReveal();
    initCardTilt();
  }

  function applyFilters() {
    filtered = products.filter(function (p) {
      var catOk = activeCat === "all" || p.category === activeCat;
      var srchOk =
        !searchQ ||
        p.name.toLowerCase().includes(searchQ) ||
        p.shortDesc.toLowerCase().includes(searchQ) ||
        p.category.toLowerCase().includes(searchQ);
      return catOk && srchOk;
    });
    if (sortVal === "price-asc")
      filtered.sort(function (a, b) {
        return a.price - b.price;
      });
    else if (sortVal === "price-desc")
      filtered.sort(function (a, b) {
        return b.price - a.price;
      });
    else if (sortVal === "rating")
      filtered.sort(function (a, b) {
        return b.rating - a.rating;
      });
    else if (sortVal === "popular")
      filtered.sort(function (a, b) {
        return b.reviews - a.reviews;
      });
    render();
  }

  document.querySelectorAll(".cat-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeCat = btn.dataset.cat;
      document.querySelectorAll(".cat-btn").forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      applyFilters();
    });
  });

  var searchEl = document.getElementById("filter-search");
  if (searchEl) {
    searchEl.addEventListener("input", function (e) {
      searchQ = (e.target.value || "").toLowerCase().trim();
      applyFilters();
    });
  }
  var sortEl = document.getElementById("filter-sort");
  if (sortEl) {
    sortEl.addEventListener("change", function (e) {
      sortVal = e.target.value;
      applyFilters();
    });
  }
  render();
}

// ─── 13. Bestsellers (index.html) ─────────────────────────────
function initBestsellers() {
  var grid = document.getElementById("bestsellers-grid");
  if (!grid) return;
  var popular = window.FA2M_PRODUCTS.filter(function (p) {
    return p.badge === "Populaire";
  }).slice(0, 3);
  var list = popular.length >= 3 ? popular : window.FA2M_PRODUCTS.slice(0, 3);
  grid.innerHTML = list.map(renderProductCard).join("");
  initReveal();
  initCardTilt();
}

// ─── 14. Scroll Reveal ───────────────────────────────────────
function initReveal() {
  var opts = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, opts);
  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach(function (el) {
      if (!el.classList.contains("visible")) obs.observe(el);
    });
}

// ─── 15. Card 3D Tilt ─────────────────────────────────────────
function initCardTilt() {
  document.querySelectorAll(".product-card").forEach(function (card) {
    if (card._tilt) return;
    card._tilt = true;
    var rect = null;
    card.addEventListener("mousemove", function (e) {
      rect = rect || card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var tx = (((y - rect.height / 2) / (rect.height / 2)) * 6).toFixed(2);
      var ty = (((x - rect.width / 2) / (rect.width / 2)) * -6).toFixed(2);
      card.style.transform =
        "translateY(-10px) scale(1.012) rotateX(" +
        tx +
        "deg) rotateY(" +
        ty +
        "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
      rect = null;
    });
  });
}

// ─── 16. Compteurs animés ─────────────────────────────────────
function initCounters() {
  var els = document.querySelectorAll(".counter-number");
  if (!els.length) return;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var el = entry.target;
        var target = parseFloat(el.dataset.target || "0");
        var dec = parseInt(el.dataset.dec || "0", 10);
        var suffix = el.dataset.suffix || "";
        var dur = 2200;
        var start = performance.now();
        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / dur, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatNum(eased * target, dec) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
}

// ─── 17. Typing Effect ────────────────────────────────────────
function initTyping() {
  var el = document.querySelector(".typed-text");
  if (!el) return;
  var words = ["Premium", "Exclusif", "Tendance", "Luxueux", "Unique"];
  var wi = 0,
    ci = 0,
    deleting = false,
    pausing = false;
  function type() {
    if (pausing) {
      pausing = false;
      setTimeout(type, 1600);
      return;
    }
    var word = words[wi];
    if (!deleting) {
      el.textContent = word.substring(0, ci + 1);
      ci++;
      if (ci === word.length) {
        pausing = true;
        deleting = true;
      }
      setTimeout(type, 115);
    } else {
      el.textContent = word.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
      setTimeout(type, 55);
    }
  }
  setTimeout(type, 1000);
}

// ─── 18. Particules ──────────────────────────────────────────
function initParticles() {
  var container = document.querySelector(".particles-container");
  if (!container) return;
  for (var i = 0; i < 35; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    var size = (Math.random() * 4 + 2).toFixed(1);
    p.style.cssText = [
      "left:" + Math.random() * 100 + "%",
      "width:" + size + "px",
      "height:" + size + "px",
      "animation-duration:" + (Math.random() * 14 + 10) + "s",
      "animation-delay:" + Math.random() * 12 + "s",
      "opacity:0",
      Math.random() > 0.6 ? "background:var(--accent-2)" : "",
    ]
      .filter(Boolean)
      .join(";");
    container.appendChild(p);
  }
}

// ─── 19. Carousel témoignages ────────────────────────────────
function initCarousel() {
  var track = document.querySelector(".testimonials-track");
  if (!track) return;
  var cards = Array.from(track.querySelectorAll(".testimonial-card"));
  if (!cards.length) return;
  var dotsWrap = document.querySelector(".carousel-dots");
  var current = 0;
  var autoTimer = null;

  if (dotsWrap) {
    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Témoignage " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    var w = cards[0].offsetWidth + 24;
    track.style.transform = "translateX(-" + current * w + "px)";
    cards.forEach(function (c, i) {
      c.classList.toggle("active", i === current);
    });
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".carousel-dot").forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
    }
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, 5500);
  }
  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  var prevBtn = document.querySelector(".carousel-prev");
  var nextBtn = document.querySelector(".carousel-next");
  if (prevBtn)
    prevBtn.addEventListener("click", function () {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", function () {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  var touchX = 0;
  track.addEventListener(
    "touchstart",
    function (e) {
      touchX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        goTo(current + (diff > 0 ? 1 : -1));
        startAuto();
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", function () {
    goTo(current);
  });
  goTo(0);
  startAuto();
}

// ─── 20. Header Scroll ───────────────────────────────────────
function initHeader() {
  var hdr = document.querySelector(".site-header");
  if (!hdr) return;
  window.addEventListener(
    "scroll",
    function () {
      hdr.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
}

// ─── 21. Hamburger ───────────────────────────────────────────
function initHamburger() {
  var btn = document.querySelector(".hamburger");
  var nav = document.querySelector(".nav-mobile");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = btn.classList.toggle("active");
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      btn.classList.remove("active");
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      btn.classList.remove("active");
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ─── 22. Active Nav ──────────────────────────────────────────
function setActiveNav() {
  var page = location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".nav-desktop a, .nav-mobile a")
    .forEach(function (a) {
      var href = a.getAttribute("href") || "";
      a.classList.toggle(
        "active",
        href === page || (page === "" && href === "index.html"),
      );
    });
}

// ─── 23. WhatsApp Float ──────────────────────────────────────
function initWhatsAppFloat() {
  var btn = document.getElementById("whatsapp-float");
  if (!btn) return;
  btn.href =
    "https://wa.me/" +
    FA2M.phone +
    "?text=" +
    encodeURIComponent("Bonjour, je souhaite passer une commande !");
}

// ─── 24. Newsletter ──────────────────────────────────────────
function initNewsletter() {
  var form = document.getElementById("newsletter-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim()) return;
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = "✓ Inscrit !";
      btn.style.background = "linear-gradient(135deg,#25D366,#00bfa5)";
      btn.style.color = "#04221b";
      input.value = "";
      setTimeout(function () {
        btn.textContent = "S'inscrire";
        btn.style.background = "";
        btn.style.color = "";
      }, 3500);
    }
  });
}

// ─── 25. Contact Form ────────────────────────────────────────
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = (document.getElementById("c-name") || {}).value || "";
    var email = (document.getElementById("c-email") || {}).value || "";
    var msg = (document.getElementById("c-msg") || {}).value || "";
    var text = encodeURIComponent(
      "Contact FA2M\nNom : " +
        name +
        "\nEmail : " +
        email +
        "\nMessage : " +
        msg,
    );
    window.open(
      "https://wa.me/" + FA2M.phone + "?text=" + text,
      "_blank",
      "noopener",
    );
  });
}

// ─── 26. Toast global ────────────────────────────────────────
function showGlobalToast(msg) {
  var toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}

// ─── 27. GSAP Animations ─────────────────────────────────────
function initGSAP() {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  if (document.querySelector(".hero-badge")) {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-badge", { y: 28, opacity: 0, duration: 0.65 })
      .from(".hero-title", { y: 50, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".hero-desc", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".hero-actions", { y: 28, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(".hero-trust", { y: 20, opacity: 0, duration: 0.5 }, "-=0.35");
    if (document.querySelector(".hero-visual")) {
      tl.from(
        ".hero-visual",
        { x: 70, opacity: 0, duration: 1.1, ease: "power2.out" },
        "-=0.9",
      );
    }
  }
  if (typeof ScrollTrigger !== "undefined") {
    gsap.from(".feature-card", {
      scrollTrigger: { trigger: ".features-grid", start: "top 82%" },
      y: 55,
      opacity: 0,
      duration: 0.65,
      stagger: 0.14,
      ease: "power2.out",
    });
    gsap.from(".counter-item", {
      scrollTrigger: { trigger: ".counters-section", start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    });
    document.querySelectorAll(".section-title").forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    });
  }
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    if (document.querySelector('script[src="' + src + '"]')) {
      resolve();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ─── 28. Admin Panel ─────────────────────────────────────────
function initAdmin() {
  var loginEl = document.getElementById("admin-login");
  var dashEl = document.getElementById("admin-dashboard");
  if (!loginEl && !dashEl) return;

  if (sessionStorage.getItem(FA2M.sessionKey) === "1") showDashboard();

  var loginForm = document.getElementById("admin-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var passEl = document.getElementById("admin-password");
      var errEl = document.getElementById("login-error");
      if (passEl && passEl.value === FA2M.adminPass) {
        sessionStorage.setItem(FA2M.sessionKey, "1");
        showDashboard();
      } else {
        if (errEl) {
          errEl.textContent = "❌ Mot de passe incorrect.";
          errEl.style.display = "block";
        }
        if (passEl) {
          passEl.value = "";
          passEl.focus();
        }
      }
    });
  }
  var logoutBtn = document.getElementById("admin-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem(FA2M.sessionKey);
      location.reload();
    });
  }
}

function showDashboard() {
  var loginEl = document.getElementById("admin-login");
  var dashEl = document.getElementById("admin-dashboard");
  if (loginEl) loginEl.style.display = "none";
  if (dashEl) {
    dashEl.style.display = "block";
    renderAdminTable();
    updateAdminStats();
  }
}

function renderAdminTable(filter) {
  var tbody = document.getElementById("admin-tbody");
  if (!tbody) return;
  var products = loadProducts();
  if (filter) {
    var q = filter.toLowerCase();
    products = products.filter(function (p) {
      return (
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    });
  }
  if (!products.length) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:2.5rem">Aucun produit</td></tr>';
    return;
  }
  tbody.innerHTML = products
    .map(function (p) {
      var badgeCell = p.badge
        ? '<span class="product-badge ' +
          badgeCls(p.badge) +
          '" style="font-size:.72rem;padding:.22rem .6rem">' +
          escHtml(p.badge) +
          "</span>"
        : '<span style="color:var(--muted)">—</span>';
      var oldPrCell = p.oldPrice
        ? '<br><span style="color:var(--muted);text-decoration:line-through;font-size:.78rem">' +
          formatCFA(p.oldPrice) +
          "</span>"
        : "";
      return (
        "<tr>" +
        '<td><img class="thumb" src="' +
        escHtml(p.image) +
        '" alt="' +
        escHtml(p.name) +
        '" onerror="this.src=\'https://placehold.co/50x40/0d1829/00e676?text=FA2M\'"></td>' +
        "<td><strong>" +
        escHtml(p.name) +
        "</strong></td>" +
        '<td><span style="color:var(--text-2)">' +
        escHtml(p.category) +
        "</span></td>" +
        '<td><strong style="color:var(--accent)">' +
        formatCFA(p.price) +
        "</strong>" +
        oldPrCell +
        "</td>" +
        "<td>" +
        (p.stock || 0) +
        "</td>" +
        "<td>" +
        badgeCell +
        "</td>" +
        '<td><div class="table-actions">' +
        '<button class="btn btn-sm btn-ghost" onclick="editProduct(' +
        p.id +
        ')">✎ Modifier</button>' +
        '<button class="btn btn-sm btn-danger" onclick="deleteProduct(' +
        p.id +
        ')">✕</button>' +
        "</div></td>" +
        "</tr>"
      );
    })
    .join("");
}

function updateAdminStats() {
  var products = loadProducts();
  var el = function (id) {
    return document.getElementById(id);
  };
  if (el("stat-total")) el("stat-total").textContent = products.length;
  if (el("stat-stock"))
    el("stat-stock").textContent = products.reduce(function (s, p) {
      return s + (p.stock || 0);
    }, 0);
  var cats = new Set(
    products.map(function (p) {
      return p.category;
    }),
  );
  if (el("stat-cats")) el("stat-cats").textContent = cats.size;
  if (el("stat-badges"))
    el("stat-badges").textContent = products.filter(function (p) {
      return p.badge;
    }).length;
}

function filterAdminTable(val) {
  renderAdminTable(val.trim());
}

function editProduct(id) {
  openProductForm(id);
}

function deleteProduct(id) {
  if (!confirm("Supprimer ce produit définitivement ?")) return;
  var products = loadProducts().filter(function (p) {
    return p.id !== id;
  });
  saveProducts(products);
  window.FA2M_PRODUCTS = products;
  renderAdminTable();
  updateAdminStats();
  showGlobalToast("Produit supprimé");
}

function resetToDefaults() {
  if (!confirm("Réinitialiser le catalogue avec les 8 produits par défaut ?"))
    return;
  saveProducts(
    DEFAULT_PRODUCTS.map(function (p) {
      return Object.assign({}, p);
    }),
  );
  window.FA2M_PRODUCTS = loadProducts();
  renderAdminTable();
  updateAdminStats();
  showGlobalToast("✓ Catalogue réinitialisé");
}

function openProductForm(productId) {
  var overlay = document.getElementById("admin-modal");
  if (!overlay) return;
  var products = loadProducts();
  var p = productId
    ? products.find(function (x) {
        return x.id === productId;
      })
    : null;

  var titleEl = overlay.querySelector(".admin-modal-title");
  if (titleEl)
    titleEl.textContent = p ? "Modifier le produit" : "Nouveau produit";

  var f = function (id) {
    return document.getElementById(id);
  };
  if (f("pf-id")) f("pf-id").value = p ? p.id : "";
  if (f("pf-name")) f("pf-name").value = p ? p.name : "";
  if (f("pf-category")) f("pf-category").value = p ? p.category : "";
  if (f("pf-price")) f("pf-price").value = p ? p.price : "";
  if (f("pf-oldprice")) f("pf-oldprice").value = p ? p.oldPrice || "" : "";
  if (f("pf-shortdesc")) f("pf-shortdesc").value = p ? p.shortDesc : "";
  if (f("pf-longdesc")) f("pf-longdesc").value = p ? p.longDesc : "";
  if (f("pf-image")) f("pf-image").value = p ? p.image : "";
  if (f("pf-images"))
    f("pf-images").value = p && p.images ? p.images.join("\n") : "";
  if (f("pf-badge")) f("pf-badge").value = p ? p.badge || "" : "";
  if (f("pf-stock")) f("pf-stock").value = p ? p.stock || "" : "";
  if (f("pf-rating")) f("pf-rating").value = p ? p.rating : "4.5";
  if (f("pf-reviews")) f("pf-reviews").value = p ? p.reviews : "0";

  renderSpecsEditor(p ? p.specs || [] : []);

  // Preview image
  var prev = document.getElementById("pf-image-preview");
  if (prev) {
    if (p && p.image) {
      prev.src = p.image;
      prev.classList.add("show");
    } else {
      prev.src = "";
      prev.classList.remove("show");
    }
  }

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    if (f("pf-name")) f("pf-name").focus();
  }, 150);
}

function closeAdminModal() {
  var overlay = document.getElementById("admin-modal");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function renderSpecsEditor(specs) {
  var container = document.getElementById("specs-container");
  if (!container) return;
  container.innerHTML = (specs || [])
    .map(function (row, i) {
      return (
        '<div class="spec-row" data-i="' +
        i +
        '">' +
        '<input type="text" class="form-control spec-key" placeholder="Caractéristique" value="' +
        escHtml(row[0] || "") +
        '">' +
        '<input type="text" class="form-control spec-val" placeholder="Valeur" value="' +
        escHtml(row[1] || "") +
        '">' +
        '<button type="button" class="btn-rm-spec" onclick="removeSpec(this)" aria-label="Supprimer">✕</button>' +
        "</div>"
      );
    })
    .join("");
}

function addSpec() {
  var container = document.getElementById("specs-container");
  if (!container) return;
  var row = document.createElement("div");
  row.className = "spec-row";
  row.innerHTML =
    '<input type="text" class="form-control spec-key" placeholder="Caractéristique">' +
    '<input type="text" class="form-control spec-val" placeholder="Valeur">' +
    '<button type="button" class="btn-rm-spec" onclick="removeSpec(this)" aria-label="Supprimer">✕</button>';
  container.appendChild(row);
  row.querySelector("input").focus();
}

function removeSpec(btn) {
  var row = btn.closest(".spec-row");
  if (row) row.remove();
}

function previewMainImage(url) {
  var prev = document.getElementById("pf-image-preview");
  if (!prev) return;
  if (url && url.startsWith("http")) {
    prev.src = url;
    prev.classList.add("show");
    prev.onerror = function () {
      prev.classList.remove("show");
    };
  } else {
    prev.classList.remove("show");
  }
}

function saveProductForm(e) {
  if (e) e.preventDefault();
  var f = function (id) {
    return document.getElementById(id);
  };
  var name = (f("pf-name") && f("pf-name").value.trim()) || "";
  var category = (f("pf-category") && f("pf-category").value.trim()) || "";
  var price = parseFloat(f("pf-price") && f("pf-price").value);

  if (!name || !category || isNaN(price)) {
    alert("Veuillez remplir les champs obligatoires : Nom, Catégorie, Prix.");
    return;
  }

  var specs = Array.from(document.querySelectorAll(".spec-row"))
    .map(function (r) {
      return [
        (r.querySelector(".spec-key") || {}).value || "",
        (r.querySelector(".spec-val") || {}).value || "",
      ];
    })
    .filter(function (r) {
      return r[0].trim();
    });

  var rawImgs = (f("pf-images") && f("pf-images").value.trim()) || "";
  var imagesArr = rawImgs
    ? rawImgs
        .split("\n")
        .map(function (s) {
          return s.trim();
        })
        .filter(Boolean)
    : [];
  var mainImg = (f("pf-image") && f("pf-image").value.trim()) || "";
  if (!imagesArr.length && mainImg) imagesArr = [mainImg];

  var existId = f("pf-id") && f("pf-id").value;
  var newProduct = {
    id: existId ? Number(existId) : Date.now(),
    name: name,
    category: category,
    price: price,
    oldPrice: parseFloat(f("pf-oldprice") && f("pf-oldprice").value) || 0,
    shortDesc: (f("pf-shortdesc") && f("pf-shortdesc").value.trim()) || "",
    longDesc: (f("pf-longdesc") && f("pf-longdesc").value.trim()) || "",
    image: mainImg,
    images: imagesArr,
    badge: (f("pf-badge") && f("pf-badge").value) || "",
    stock: parseInt(f("pf-stock") && f("pf-stock").value, 10) || 0,
    rating: parseFloat(f("pf-rating") && f("pf-rating").value) || 4.5,
    reviews: parseInt(f("pf-reviews") && f("pf-reviews").value, 10) || 0,
    specs: specs,
  };

  var products = loadProducts();
  if (existId) {
    var idx = products.findIndex(function (p) {
      return p.id === Number(existId);
    });
    if (idx !== -1) products[idx] = newProduct;
    else products.push(newProduct);
  } else {
    products.push(newProduct);
  }

  saveProducts(products);
  window.FA2M_PRODUCTS = products;
  closeAdminModal();
  renderAdminTable();
  updateAdminStats();
  showGlobalToast(existId ? "✓ Produit modifié !" : "✓ Produit ajouté !");
}

// ─── 29. Fermeture modals globaux ────────────────────────────
function initGlobalEvents() {
  var pm = document.getElementById("product-modal");
  if (pm)
    pm.addEventListener("click", function (e) {
      if (e.target === pm) closeProductModal();
    });

  var am = document.getElementById("admin-modal");
  if (am)
    am.addEventListener("click", function (e) {
      if (e.target === am) closeAdminModal();
    });

  var cartOverlay = document.getElementById("cart-overlay");
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProductModal();
      closeAdminModal();
      closeCart();
    }
  });
}

// ─── 30. Injecter le Drawer Panier + Formulaire ──────────────
function injectCartDrawer() {
  if (document.getElementById("cart-drawer")) return;

  var drawerHtml =
    "" +
    // Overlay
    '<div id="cart-overlay" class="cart-overlay" aria-hidden="true"></div>' +
    // Drawer
    '<aside id="cart-drawer" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Panier d\'achat">' +
    // Header drawer
    '<div class="cart-drawer-header">' +
    '<div class="cart-drawer-title">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z"/></svg>' +
    "<span>Mon Panier</span>" +
    '<span class="cart-badge cart-drawer-badge" aria-live="polite">0</span>' +
    "</div>" +
    '<button class="cart-close-btn" onclick="closeCart()" aria-label="Fermer le panier">✕</button>' +
    "</div>" +
    // Corps drawer
    '<div class="cart-drawer-body">' +
    // Message vide
    '<div id="cart-empty-msg" class="cart-empty">' +
    '<div class="cart-empty-icon" aria-hidden="true">🛒</div>' +
    "<p>Votre panier est vide</p>" +
    '<a href="produits.html" class="btn btn-primary" onclick="closeCart()" style="margin-top:1rem;font-size:.9rem">Découvrir nos produits</a>' +
    "</div>" +
    // Contenu panier
    '<div id="cart-content" style="display:none">' +
    '<div id="cart-items-list" class="cart-items-list"></div>' +
    // Récap total
    '<div class="cart-summary">' +
    '<div class="cart-summary-row">' +
    "<span>Sous-total</span>" +
    '<span id="cart-total-amount" class="cart-summary-total">0 FCFA</span>' +
    "</div>" +
    '<p class="cart-summary-note">Livraison calculée à la confirmation</p>' +
    "</div>" +
    // Bouton vider
    '<button class="cart-clear-btn" onclick="clearCart()">🗑️ Vider le panier</button>' +
    "</div>" +
    "</div>" + // fin cart-drawer-body
    // Footer drawer : bouton commander
    '<div class="cart-drawer-footer">' +
    '<button id="cart-checkout-btn" class="btn btn-whatsapp btn-checkout" onclick="openCheckoutForm()" style="display:none">' +
    WA_ICON +
    "<span>Confirmer la commande</span>" +
    "</button>" +
    // Formulaire client intégré
    '<div id="checkout-form-wrap" class="checkout-form-wrap">' +
    '<div class="checkout-form-header">' +
    "<h3>📋 Vos informations</h3>" +
    '<button type="button" class="cart-close-btn" onclick="closeCheckoutForm()" aria-label="Fermer le formulaire">✕</button>' +
    "</div>" +
    '<form id="order-form" class="order-form" onsubmit="submitOrder(event)" novalidate>' +
    '<div class="order-form-grid">' +
    '<div class="order-form-group">' +
    '<label for="order-prenom">Prénom <span class="req">*</span></label>' +
    '<input type="text" id="order-prenom" class="order-input" placeholder="Ex : Moussa" required autocomplete="given-name">' +
    "</div>" +
    '<div class="order-form-group">' +
    '<label for="order-nom">Nom <span class="req">*</span></label>' +
    '<input type="text" id="order-nom" class="order-input" placeholder="Ex : Diallo" required autocomplete="family-name">' +
    "</div>" +
    "</div>" +
    '<div class="order-form-group">' +
    '<label for="order-telephone">Numéro de téléphone <span class="req">*</span></label>' +
    '<input type="tel" id="order-telephone" class="order-input" placeholder="Ex : +221 77 123 45 67" required autocomplete="tel">' +
    "</div>" +
    '<div class="order-form-group">' +
    '<label for="order-adresse">Adresse / Localisation <span class="req">*</span></label>' +
    '<textarea id="order-adresse" class="order-input order-textarea" placeholder="Ex : Dakar, Plateau, Rue 10 — ou précisez votre quartier / point de repère" required rows="3"></textarea>' +
    "</div>" +
    // Récap commande dans le formulaire
    '<div class="order-recap" id="order-recap-mini"></div>' +
    '<button type="submit" class="btn btn-whatsapp btn-submit-order">' +
    WA_ICON +
    "<span>Envoyer ma commande sur WhatsApp</span>" +
    "</button>" +
    '<p class="order-note">En cliquant, vous serez redirigé vers WhatsApp avec votre commande complète pré-remplie.</p>' +
    "</form>" +
    "</div>" +
    "</div>" + // fin cart-drawer-footer
    "</aside>";

  var wrapper = document.createElement("div");
  wrapper.innerHTML = drawerHtml;
  document.body.appendChild(wrapper);

  // Mettre à jour le récap mini quand on ouvre le formulaire
  document.getElementById("cart-checkout-btn") &&
    document
      .getElementById("cart-checkout-btn")
      .addEventListener("click", function () {
        renderOrderRecap();
      });
}

function renderOrderRecap() {
  var recap = document.getElementById("order-recap-mini");
  if (!recap || !CART.length) return;
  recap.innerHTML =
    '<p class="order-recap-title">📦 Récapitulatif (' +
    cartCount() +
    " article" +
    (cartCount() > 1 ? "s" : "") +
    ")</p>" +
    '<ul class="order-recap-list">' +
    CART.map(function (item) {
      return (
        "<li><span>" +
        escHtml(item.name) +
        " × " +
        item.qty +
        "</span><span>" +
        formatCFA(item.price * item.qty) +
        "</span></li>"
      );
    }).join("") +
    "</ul>" +
    '<div class="order-recap-total"><strong>Total : ' +
    formatCFA(cartTotal()) +
    "</strong></div>";
}

// ─── 31. Injecter bouton panier dans le header ───────────────
function injectCartButton() {
  var headerActions = document.querySelector(".header-actions");
  if (!headerActions || document.getElementById("cart-btn-header")) return;

  var btn = document.createElement("button");
  btn.id = "cart-btn-header";
  btn.className = "cart-btn-header";
  btn.setAttribute("aria-label", "Ouvrir le panier");
  btn.onclick = openCart;
  btn.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z"/></svg>' +
    '<span class="cart-badge" aria-live="polite" style="display:none">0</span>';

  // Insérer avant le hamburger
  var hamburger = headerActions.querySelector(".hamburger");
  if (hamburger) {
    headerActions.insertBefore(btn, hamburger);
  } else {
    headerActions.appendChild(btn);
  }
}

// Bouton panier dans modal produit → ajouter au panier depuis modal
function injectModalCartBtn() {
  var modalActions = document.querySelector(".modal-actions");
  if (!modalActions || modalActions.querySelector(".modal-cart-btn")) return;
  var btn = document.createElement("button");
  btn.className = "btn btn-cart modal-cart-btn";
  btn.type = "button";
  btn.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z"/></svg>' +
    " Ajouter au panier";

  // Insérer avant le bouton Commander
  var orderBtn = modalActions.querySelector(".modal-order-btn");
  if (orderBtn) {
    modalActions.insertBefore(btn, orderBtn);
  } else {
    modalActions.appendChild(btn);
  }
}

// ─── 32. Boot principal ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  window.FA2M_PRODUCTS = loadProducts();

  // Footer année
  var yr = document.getElementById("footer-year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Injecter panier
  injectCartDrawer();
  injectCartButton();
  injectModalCartBtn();

  // Core
  setActiveNav();
  initHeader();
  initHamburger();
  initReveal();
  initTyping();
  initParticles();
  initCounters();
  initCarousel();
  initNewsletter();
  initContactForm();
  initWhatsAppFloat();
  initBestsellers();
  initProductsPage();
  initAdmin();
  initGlobalEvents();

  // Mise à jour UI panier au chargement
  updateCartUI();

  // GSAP async
  Promise.all([
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
    ),
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
    ),
  ])
    .then(function () {
      initGSAP();
    })
    .catch(function () {
      console.info("FA2M: GSAP non chargé — animations CSS actives");
    });

  // Card tilt léger délai
  setTimeout(initCardTilt, 300);
});
