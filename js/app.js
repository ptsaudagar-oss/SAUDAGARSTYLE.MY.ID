/**
 * app.js - UI interaction, Product Rendering, Modal, and Cart Drawer
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentFilter = "all";
  let activeProduct = null;
  let selectedSize = null;
  let selectedColor = null;

  const productGrid = document.getElementById("productGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  const cartDrawer = document.getElementById("cartDrawer");
  const cartDrawerBackdrop = document.getElementById("cartDrawerBackdrop");
  const cartTriggerBtn = document.getElementById("cartTriggerBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartBadgeCount = document.getElementById("cartBadgeCount");
  const cartDrawerCount = document.getElementById("cartDrawerCount");
  const cartSubtotalText = document.getElementById("cartSubtotalText");
  const waCheckoutBtn = document.getElementById("waCheckoutBtn");

  const custNameInput = document.getElementById("custNameInput");
  const custCityInput = document.getElementById("custCityInput");
  const custNotesInput = document.getElementById("custNotesInput");

  // Modal Elements
  const productModalBackdrop = document.getElementById("productModalBackdrop");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalImg = document.getElementById("modalImg");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");
  const modalSizesList = document.getElementById("modalSizesList");
  const modalColorsList = document.getElementById("modalColorsList");
  const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

  // 1. Render Products
  function renderProducts() {
    if (!productGrid) return;

    const filtered = currentFilter === "all" 
      ? PRODUCTS 
      : PRODUCTS.filter((p) => p.category === currentFilter);

    productGrid.innerHTML = filtered.map((prod) => `
      <div class="product-card" data-id="${prod.id}">
        <div class="card-thumb-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="card-thumb" loading="lazy" />
          <span class="card-badge">${prod.badge}</span>
          <div class="quick-view-overlay">
            <button class="btn-quick-view" onclick="openProductModal('${prod.id}')">
              <i class="fa-solid fa-eye"></i> Detail Cepat
            </button>
          </div>
        </div>
        <div class="card-body">
          <span class="card-category">${prod.category}</span>
          <h3 class="card-title">${prod.name}</h3>
          <div class="price-box">
            <span class="current-price">Rp ${prod.price.toLocaleString("id-ID")}</span>
            <span class="original-price">Rp ${prod.originalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div class="card-footer-actions">
            <button class="btn-add-cart" onclick="quickAddToCart('${prod.id}')">
              <i class="fa-solid fa-bag-shopping"></i> Beli
            </button>
            <button class="btn-detail-icon" title="Lihat Detail" onclick="openProductModal('${prod.id}')">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 2. Filter Handler
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // 3. Quick Add to Cart
  window.quickAddToCart = function (productId) {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    window.cartManager.addItem(prod, prod.sizes[0], prod.colors[0], 1);
    openCartDrawer();
  };

  // 4. Modal Functions
  window.openProductModal = function (productId) {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;

    activeProduct = prod;
    selectedSize = prod.sizes[0];
    selectedColor = prod.colors[0];

    modalImg.src = prod.image;
    modalCategory.textContent = prod.category;
    modalTitle.textContent = prod.name;
    modalPrice.textContent = `Rp ${prod.price.toLocaleString("id-ID")}`;
    modalDesc.textContent = prod.description;

    // Render sizes
    modalSizesList.innerHTML = prod.sizes.map((s, idx) => `
      <button class="chip-btn ${idx === 0 ? 'active' : ''}" data-size="${s}">
        ${s}
      </button>
    `).join("");

    // Render colors
    modalColorsList.innerHTML = prod.colors.map((c, idx) => `
      <button class="chip-btn ${idx === 0 ? 'active' : ''}" data-color="${c}">
        ${c}
      </button>
    `).join("");

    attachChipListeners();
    productModalBackdrop.classList.add("active");
  };

  function attachChipListeners() {
    modalSizesList.querySelectorAll(".chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modalSizesList.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = btn.dataset.size;
      });
    });

    modalColorsList.querySelectorAll(".chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modalColorsList.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = btn.dataset.color;
      });
    });
  }

  function closeProductModal() {
    productModalBackdrop.classList.remove("active");
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeProductModal);
  if (productModalBackdrop) {
    productModalBackdrop.addEventListener("click", (e) => {
      if (e.target === productModalBackdrop) closeProductModal();
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", () => {
      if (activeProduct) {
        window.cartManager.addItem(activeProduct, selectedSize, selectedColor, 1);
        closeProductModal();
        openCartDrawer();
      }
    });
  }

  // 5. Cart Drawer Controls
  function openCartDrawer() {
    cartDrawer.classList.add("active");
    cartDrawerBackdrop.classList.add("active");
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    cartDrawerBackdrop.classList.remove("active");
  }

  if (cartTriggerBtn) cartTriggerBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartDrawerBackdrop) cartDrawerBackdrop.addEventListener("click", closeCartDrawer);

  // 6. Update Cart UI on change
  window.cartManager.subscribe((items) => {
    const totalCount = window.cartManager.getTotalCount();
    const subtotal = window.cartManager.getSubtotal();

    if (cartBadgeCount) cartBadgeCount.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = `(${totalCount})`;
    if (cartSubtotalText) cartSubtotalText.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;

    if (items.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-view">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Keranjang belanja masih kosong.</p>
        </div>
      `;
      if (waCheckoutBtn) waCheckoutBtn.disabled = true;
      return;
    }

    if (waCheckoutBtn) waCheckoutBtn.disabled = false;

    cartItemsList.innerHTML = items.map((item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <button class="cart-remove-btn" onclick="window.cartManager.removeItem('${item.key}')">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.size} • ${item.color}</div>
          <div class="cart-item-price">Rp ${(item.price * item.quantity).toLocaleString("id-ID")}</div>
          <div class="cart-qty-ctrls">
            <button class="btn-qty" onclick="window.cartManager.updateQuantity('${item.key}', -1)">-</button>
            <span style="font-size: 0.9rem; font-weight: 600;">${item.quantity}</span>
            <button class="btn-qty" onclick="window.cartManager.updateQuantity('${item.key}', 1)">+</button>
          </div>
        </div>
      </div>
    `).join("");
  });

  // 7. Direct WhatsApp Checkout Button
  if (waCheckoutBtn) {
    waCheckoutBtn.addEventListener("click", () => {
      const items = window.cartManager.items;
      if (items.length === 0) {
        alert("Keranjang belanja Anda masih kosong!");
        return;
      }

      const name = custNameInput ? custNameInput.value : "";
      const city = custCityInput ? custCityInput.value : "";
      const notes = custNotesInput ? custNotesInput.value : "";

      const waUrl = window.cartManager.generateWhatsAppOrderUrl({
        waNumber: "6281808630730",
        name: name,
        city: city,
        notes: notes
      });

      window.open(waUrl, "_blank");
    });
  }

  // Initial load
  renderProducts();
});
