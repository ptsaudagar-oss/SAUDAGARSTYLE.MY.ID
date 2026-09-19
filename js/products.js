const PRODUCTS = [
  {
    id: "SDG-GAMIS-ANAK-01",
    name: "SET GAMIS ANAK CRINKLE PREMIUM - VARIAN PUTIH",
    category: "anak",
    price: 135000,
    originalPrice: 175000,
    badge: "Best Seller • Putih Bersih",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    description: "Model gaun Set Gamis Anak berbahan Crinkle Airflow Premium lembut, jatuh, adem, dan tidak menerawang. Sangat cocok & nyaman digunakan untuk: (1) Manasik Haji Anak/TK/SD, (2) Seragam Pengajian Anak, (3) Seragam Sekolah/Madrasah, serta acara keagamaan lainnya. Dilengkapi jilbab senada.",
    sizes: ["Size S (3-4 Thn)", "Size M (5-6 Thn)", "Size L (7-8 Thn)", "Size XL (9-10 Thn)", "Size Remaja (11-13 Thn)"],
    colors: ["Putih Bersih (Manasik/Sekolah)", "Putih Tulang / BW"]
  },
  {
    id: "SDG-KULOT-01",
    name: "Kulot Payung Ceruty Babydoll Premium 2-Layer",
    category: "muslimah",
    price: 145000,
    originalPrice: 185000,
    badge: "Koleksi Muslimah",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Celana kulot model payung super lebar berbahan Ceruty Babydoll Armani Premium berlapis furing lembut anti-nerawang. Anggun saat melangkah, flowy, dan sangat adem dipakai harian maupun acara formal.",
    sizes: ["Standar (Fit to L)", "Jumbo (Fit to XXL)"],
    colors: ["Hitam Pekat", "Putih Bersih", "Mocca", "Dusty Pink", "Sage Green"]
  },
  {
    id: "SDG-SERAGAM-01",
    name: "Set Gamis Manasik Haji & Seragam Sekolah Syar'i",
    category: "seragam",
    price: 155000,
    originalPrice: 195000,
    badge: "Manasik & Sekolah",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    description: "Setelan gamis putih syar'i lengkap dengan kerudung bergo antem. Didesain khusus sesuai standar seragam manasik haji anak dan seragam sekolah madrasah/DTA. Bahan adem menyerap keringat.",
    sizes: ["TK A/B", "SD Kelas 1-3", "SD Kelas 4-6"],
    colors: ["Putih Polos Manasik"]
  },
  {
    id: "SDG-PENGAJIAN-01",
    name: "Gamis Seragam Pengajian Majelis Ta'lim Crinkle",
    category: "muslimah",
    price: 175000,
    originalPrice: 225000,
    badge: "Seragam Pengajian",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "Gamis muslimah anggun seragam majelis ta'lim dan pengajian rutin. Potongan A-line leluasa, wudhu & busui friendly dengan aksen kancing mutiara manis. Melayani pesanan seragam jumlah banyak.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Putih Bersih", "Hijau Botol", "Navy", "Maroon", "Mocca"]
  },
  {
    id: "SDG-KERUDUNG-01",
    name: "Kerudung Bergo Syar'i Instan Crinkle Soft Pad",
    category: "kerudung",
    price: 49000,
    originalPrice: 65000,
    badge: "Praktis & Lembut",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    description: "Jilbab bergo instan praktis dengan pet antem nyaman tanpa ciput. Bahan crinkle airflow premium yang tidak gampang lecek, cocok untuk harian, mengaji, dan sekolah.",
    sizes: ["Size M (Standar)", "Size L (Menutup Dada)", "Size XL (Syar'i Jumbo)"],
    colors: ["Putih Sekolah", "Hitam", "Coklat Pramuka", "Navy", "Abu-abu"]
  },
  {
    id: "SDG-KERUDUNG-02",
    name: "Jilbab Pashmina Oval Ceruty Babydoll Premium",
    category: "kerudung",
    price: 55000,
    originalPrice: 75000,
    badge: "Viral Muslimah",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    description: "Pashmina bentuk oval curve di bagian belakang sehingga menutup leher dan punggung dengan rapi. Bahan Ceruty Babydoll bertekstur pasir halus dan mudah dibentuk.",
    sizes: ["180 x 75 cm Oval"],
    colors: ["Putih Bersih", "Broken White", "Hitam", "Nude", "Denim"]
  },
  {
    id: "SDG-KOKO-ANAK-01",
    name: "Setelan Koko Kurta Anak Putih Manasik Haji",
    category: "anak",
    price: 125000,
    originalPrice: 160000,
    badge: "Manasik Putra",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    description: "Setelan baju koko kurta putih anak plus celana panjang dan peci untuk latihan manasik haji anak sekolah TK/SD. Bahan Katun Toyobo lembut, sejuk, dan menyerap keringat.",
    sizes: ["No. 4 (TK)", "No. 6 (SD Kls 1-2)", "No. 8 (SD Kls 3-4)", "No. 10 (SD Kls 5-6)"],
    colors: ["Putih Bersih Manasik"]
  },
  {
    id: "SDG-KOKO-DEWASA-01",
    name: "Koko Kurta Dewasa Al-Fatih Seragam Pengajian",
    category: "pria",
    price: 165000,
    originalPrice: 210000,
    badge: "Seragam Hadroh/Kajian",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Koko Kurta lengan panjang & 3/4 bahan Toyobo Fodu berkerah shanghai dengan saku aktif dan aksen kancing elegan. Cocok untuk seragam pengajian, hadroh, dan ibadah.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Putih Bersih", "Hitam", "Emerald", "Navy"]
  }
];
