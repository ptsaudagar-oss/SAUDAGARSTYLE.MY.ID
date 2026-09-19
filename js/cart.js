/**
 * cart.js - Saudagar Style Cart & WhatsApp Order Formulator
 */

const CART_STORAGE_KEY = "saudagar_cart_items_v1";

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Gagal memuat keranjang", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      this.notifyListeners();
    } catch (e) {
      console.error("Gagal menyimpan keranjang", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.items);
  }

  notifyListeners() {
    this.listeners.forEach((fn) => fn(this.items));
  }

  addItem(product, selectedSize, selectedColor, quantity = 1) {
    const size = selectedSize || product.sizes[0] || "-";
    const color = selectedColor || product.colors[0] || "-";
    const itemKey = `${product.id}_${size}_${color}`;

    const existingIndex = this.items.findIndex((item) => item.key === itemKey);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        color: color,
        quantity: quantity
      });
    }

    this.saveCart();
  }

  updateQuantity(itemKey, delta) {
    const item = this.items.find((i) => i.key === itemKey);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(itemKey);
        return;
      }
      this.saveCart();
    }
  }

  removeItem(itemKey) {
    this.items = this.items.filter((i) => i.key !== itemKey);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  generateWhatsAppOrderUrl(customerInfo = {}) {
    const phone = customerInfo.waNumber || "6281808630730";
    const name = customerInfo.name ? customerInfo.name.trim() : "Pelanggan";
    const city = customerInfo.city ? customerInfo.city.trim() : "-";
    const notes = customerInfo.notes ? customerInfo.notes.trim() : "-";

    const formattedDate = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    let message = `*HALO CS SAUDAGAR STYLE (CV. SAUDAGAR)*\n`;
    message += `Saya ingin melakukan pemesanan melalui website resmi saudagarstyle.my.id:\n\n`;
    message += `📅 *Tanggal*: ${formattedDate}\n`;
    message += `👤 *Nama*: ${name}\n`;
    message += `📍 *Kota / Kecamatan*: ${city}\n\n`;
    message += `🛒 *DETAIL DAFTAR PESANAN*:\n`;
    message += `------------------------------------\n`;

    this.items.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Varian : Ukuran [${item.size}] | Warna [${item.color}]\n`;
      message += `   - Jumlah : ${item.quantity} pcs x Rp ${item.price.toLocaleString("id-ID")}\n`;
      message += `   - Subtotal : Rp ${itemSubtotal.toLocaleString("id-ID")}\n\n`;
    });

    message += `------------------------------------\n`;
    message += `💰 *TOTAL ESTIMASI BELANJA*: Rp ${this.getSubtotal().toLocaleString("id-ID")}\n`;
    message += `📝 *Catatan Tambahan*: ${notes}\n\n`;
    message += `Mohon info ongkir, ketersediaan stok, serta nomor rekening pembayaran resmi CV. SAUDAGAR. Terima kasih! 🙏`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
}

window.cartManager = new CartManager();
