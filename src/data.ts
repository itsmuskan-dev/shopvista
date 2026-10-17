import { Product, Review } from "./types";

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "Tv" },
  { id: "fashion", name: "Fashion", icon: "Shirt" },
  { id: "beauty", name: "Beauty & Health", icon: "Sparkles" },
  { id: "home-living", name: "Home & Living", icon: "Home" },
  { id: "watches", name: "Watches & Accessories", icon: "Watch" },
  { id: "shoes", name: "Shoes", icon: "Footprints" },
  { id: "bags", name: "Bags & Wallets", icon: "ShoppingBag" },
  { id: "gaming", name: "Gaming & Consoles", icon: "Gamepad" },
  { id: "toys-games", name: "Toys & Games", icon: "ToyBrick" },
  { id: "books", name: "Books & Stationery", icon: "BookOpen" },
  { id: "sports", name: "Sports & Outdoors", icon: "Dumbbell" },
  { id: "automotive", name: "Automotive", icon: "Car" }
];

export const BRANDS = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" },
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_g_logo.svg" }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Ayesha Khan",
    location: "Lahore",
    rating: 5,
    comment: "Amazing quality products and super fast delivery. Highly recommended!",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: "r2",
    userName: "Usman Ali",
    location: "Karachi",
    rating: 5,
    comment: "Best online shopping experience ever. Customer support is excellent.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: "r3",
    userName: "Sanam Malik",
    location: "Islamabad",
    rating: 5,
    comment: "I found the best deals here. Will definitely shop again!",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  },
  {
    id: "r4",
    userName: "Hassan Raza",
    location: "Multan",
    rating: 5,
    comment: "Easy returns and genuine products. Very happy!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    id: "r5",
    userName: "Zainab Fatima",
    location: "Peshawar",
    rating: 5,
    comment: "The checking warranty is real! I checked my open parcel at my doorstep before paying COD. Fantastic!",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
  },
  {
    id: "r6",
    userName: "Bilal Siddiqui",
    location: "Faisalabad",
    rating: 5,
    comment: "Extremely fast shipping. I got my mechanical keyboard within 24 hours of placing the order. 10/10!",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
  }
];

const STATIC_PRODUCTS: Product[] = [
  // --- Trending Products ---
  {
    id: "trend-1",
    name: "Apple iPhone 15 Pro Max",
    description: "256GB, Natural Titanium, A17 Pro Chip, 120Hz ProMotion XDR Display",
    price: 399999,
    originalPrice: 449999,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Apple",
    isTrending: true
  },
  {
    id: "trend-2",
    name: "Sony WH-1000XM5",
    description: "Wireless Noise Cancelling Headset, 30 Hours Battery, Alexa Built-in",
    price: 74999,
    originalPrice: 89999,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 96,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Sony",
    isTrending: true
  },
  {
    id: "trend-3",
    name: "Samsung 55\" QLED 4K Smart TV",
    description: "Smart TV 2024, Quantum HDR, Object Tracking Sound, Alexa",
    price: 149999,
    originalPrice: 179999,
    discountPercent: 16,
    rating: 4.6,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Samsung",
    isTrending: true
  },
  {
    id: "trend-4",
    name: "Nike Air Max 270",
    description: "Men's Running Shoes, breathable upper, max-cushioned comfort sole",
    price: 22499,
    originalPrice: 29999,
    discountPercent: 25,
    rating: 4.5,
    reviewCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60",
    category: "shoes",
    brand: "Nike",
    isTrending: true
  },
  {
    id: "trend-5",
    name: "Fossil Gen 6 Smartwatch",
    description: "Stainless Steel, AMOLED Screen, WearOS, Heart Rate & SpO2 Monitor",
    price: 28999,
    originalPrice: 34999,
    discountPercent: 17,
    rating: 4.4,
    reviewCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60",
    category: "watches",
    brand: "Fossil",
    isTrending: true
  },
  {
    id: "trend-6",
    name: "Dyson V15 Detect",
    description: "Cordless Vacuum Cleaner, laser illumination, heavy-duty suction",
    price: 119999,
    originalPrice: 139999,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 37,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&auto=format&fit=crop&q=60",
    category: "home-living",
    brand: "Dyson",
    isTrending: true
  },

  // --- Flash Sale Products ---
  {
    id: "flash-1",
    name: "boAt Airdopes 141",
    description: "True Wireless Earbuds, 42 Hours Playback, ENx Tech, Beast Mode low-latency",
    price: 2999,
    originalPrice: 4999,
    discountPercent: 40,
    rating: 4.3,
    reviewCount: 245,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "boAt",
    isFlashSale: true
  },
  {
    id: "flash-2",
    name: "HP Pavilion 15",
    description: "AMD Ryzen 5, 16GB RAM, 512GB SSD, FHD Micro-Edge Display, Windows 11",
    price: 112499,
    originalPrice: 149999,
    discountPercent: 25,
    rating: 4.5,
    reviewCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "HP",
    isFlashSale: true
  },
  {
    id: "flash-3",
    name: "Dior Sauvage EDP",
    description: "Eau de Parfum for Men, warm vanilla, citrus, and raw wood notes",
    price: 19499,
    originalPrice: 29999,
    discountPercent: 35,
    rating: 4.8,
    reviewCount: 189,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop&q=60",
    category: "beauty",
    brand: "Dior",
    isFlashSale: true
  },
  {
    id: "flash-4",
    name: "Lavie Women's Handbag",
    description: "Premium Faux Leather Tote, dual handles, multiple security zip compartments",
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    rating: 4.2,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60",
    category: "bags",
    brand: "Lavie",
    isFlashSale: true
  },
  {
    id: "flash-5",
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "IP67 Waterproof, deep bass, 12 hours playtime, portable party boost speaker",
    price: 10499,
    originalPrice: 14999,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 220,
    imageUrl: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "JBL",
    isFlashSale: true
  },

  // --- Best Sellers ---
  {
    id: "best-1",
    name: "Apple AirPods Pro 2",
    description: "Active Noise Cancelling, Adaptive Audio, USB-C Charging Case",
    price: 59999,
    originalPrice: 74999,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Apple",
    isBestSeller: true
  },
  {
    id: "best-2",
    name: "Zara Men Shirt",
    description: "Linen Slim Fit, Casual Collar, comfortable and breathable everyday wear",
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.4,
    reviewCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=60",
    category: "fashion",
    brand: "Zara",
    isBestSeller: true
  },
  {
    id: "best-3",
    name: "Instant Pot Duo 7-in-1",
    description: "Electric Pressure Cooker, Slow Cooker, Rice Cooker, Yogurt Maker",
    price: 19999,
    originalPrice: 24999,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&auto=format&fit=crop&q=60",
    category: "home-living",
    brand: "Instant Pot",
    isBestSeller: true
  },
  {
    id: "best-4",
    name: "Michael Kors Watch",
    description: "Slim Runway Gold-Tone Chronograph Stainless Steel Luxury Watch",
    price: 24999,
    originalPrice: 34999,
    discountPercent: 28,
    rating: 4.5,
    reviewCount: 53,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=60",
    category: "watches",
    brand: "Michael Kors",
    isBestSeller: true
  },

  // --- New Arrivals ---
  {
    id: "new-1",
    name: "Realme 12 Pro+",
    description: "5G Smartphone, 120Hz Curved Display, 64MP Periscope Portrait Camera",
    price: 69999,
    originalPrice: 79999,
    discountPercent: 12,
    rating: 4.6,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Realme",
    isNewArrival: true
  },
  {
    id: "new-2",
    name: "Adidas Campus 00s",
    description: "Suede Lifestyle Skate Shoes, signature three stripes with fat laces",
    price: 17999,
    originalPrice: 21999,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 39,
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&auto=format&fit=crop&q=60",
    category: "shoes",
    brand: "Adidas",
    isNewArrival: true
  },
  {
    id: "new-3",
    name: "The Ordinary Serum",
    description: "Niacinamide 10% + Zinc 1% High-Strength Vitamin Blemish Formula",
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 110,
    imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=400&auto=format&fit=crop&q=60",
    category: "beauty",
    brand: "The Ordinary",
    isNewArrival: true
  },
  {
    id: "new-4",
    name: "Puma Backpack",
    description: "Unisex Phase Backpack, multi-pocket utility, durable canvas build",
    price: 4499,
    originalPrice: 5999,
    discountPercent: 25,
    rating: 4.3,
    reviewCount: 28,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=60",
    category: "bags",
    brand: "Puma",
    isNewArrival: true
  },

  // --- Search Filler / Category expansion items ---
  {
    id: "extra-watch-1",
    name: "Casio Vintage Digital Watch",
    description: "Retro Stainless Steel, LED Light, daily alarm, water resistant classic watch",
    price: 8499,
    originalPrice: 11999,
    discountPercent: 29,
    rating: 4.6,
    reviewCount: 154,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&auto=format&fit=crop&q=60",
    category: "watches",
    brand: "Casio"
  },
  {
    id: "extra-watch-2",
    name: "Rolex Cosmograph Daytona",
    description: "Oystersteel and Yellow Gold bezel luxury timepiece, white dial chronometer",
    price: 4500000,
    originalPrice: 5000000,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&auto=format&fit=crop&q=60",
    category: "watches",
    brand: "Rolex"
  },
  {
    id: "extra-beauty-1",
    name: "CeraVe Hydrating Facial Cleanser",
    description: "With hyaluronic acid and ceramides. Fragrance-free daily wash",
    price: 3499,
    originalPrice: 4499,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 312,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60",
    category: "beauty",
    brand: "CeraVe"
  },
  {
    id: "extra-beauty-2",
    name: "MAC Matte Lipstick (Ruby Woo)",
    description: "Iconic vivid red long-wearing lipstick with high color payoff",
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 95,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop&q=60",
    category: "beauty",
    brand: "MAC"
  },
  {
    id: "extra-elec-1",
    name: "Dell XPS 13 Laptop",
    description: "Intel Core i7, 16GB LPDDR5, 512GB SSD, InfinityEdge 13.4-inch display",
    price: 245000,
    originalPrice: 285000,
    discountPercent: 14,
    rating: 4.6,
    reviewCount: 68,
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&auto=format&fit=crop&q=60",
    category: "electronics",
    brand: "Dell"
  },
  {
    id: "extra-toy-1",
    name: "LEGO Star Wars Millennium Falcon",
    description: "Starship building kit with iconic characters from the classic saga",
    price: 18499,
    originalPrice: 24999,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 41,
    imageUrl: "https://images.unsplash.com/photo-1585366119957-e5733f3000cd?w=400&auto=format&fit=crop&q=60",
    category: "toys-games",
    brand: "LEGO"
  },
  {
    id: "extra-gaming-1",
    name: "Sony PlayStation 5 Console",
    description: "Ultra-high-speed SSD, deep integration, 3D audio, 4K gaming capabilities",
    price: 155000,
    originalPrice: 175000,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 140,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&auto=format&fit=crop&q=60",
    category: "gaming",
    brand: "Sony"
  },
  {
    id: "extra-gaming-2",
    name: "Wireless RGB Gaming Controller",
    description: "Ergonomic layout with custom vibration feedback, turbo trigger buttons",
    price: 4999,
    originalPrice: 7999,
    discountPercent: 37,
    rating: 4.4,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&auto=format&fit=crop&q=60",
    category: "gaming",
    brand: "Generic"
  }
];

// Definition of premium product titles, details and Unsplash images per category to guarantee 25+ products for ALL 12 categories
const categorySpecs: Record<string, {
  brands: string[];
  images: string[];
  items: { name: string; desc: string; priceBase: number }[];
}> = {
  electronics: {
    brands: ["Anker", "Ugreen", "Xiaomi", "Belkin", "Baseus", "TP-Link", "Crucial", "Google"],
    images: [
      "https://images.unsplash.com/photo-1609592424085-f6df460b57f0?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "MagSafe Wireless Charging Pad", desc: "15W ultra-thin fast charger with smart temperature controls", priceBase: 3499 },
      { name: "USB-C Power Delivery 65W Charger", desc: "GaN technology dual-port high-speed travel adapter block", priceBase: 4999 },
      { name: "High-Capacity 20000mAh Power Bank", desc: "Bi-directional 22.5W fast charging backup battery shell", priceBase: 6499 },
      { name: "Pro 7-in-1 USB-C Multimodule Hub", desc: "With 4K HDMI, SD reader, gigabit ethernet, power-through port", priceBase: 4299 },
      { name: "Smart LED Bluetooth Desk Lamp", desc: "Dimmable eye-comfort lighting with automatic sleep timer", priceBase: 7999 },
      { name: "Anti-Loss Bluetooth Smart Tag Tracker", desc: "Global find-my network keyfinder and wallet tracker card", priceBase: 2499 },
      { name: "Dynamic USB Podcast Microphone", desc: "High-fidelity cardioid recording mic with customizable RGB status", priceBase: 11499 },
      { name: "Dual-Band Wi-Fi 6 Range Extender", desc: "Gigabit throughput wall-plug repeater for dead zones", priceBase: 5999 },
      { name: "Portable Solid State Drive 1TB", desc: "Rugged rubber finish, up to 1050MB/s USB 3.2 Gen 2 transfer", priceBase: 22999 },
      { name: "Wireless Bluetooth Audio Receiver", desc: "Car and home stereo auxiliary adapter with low latency aptX", priceBase: 1999 },
      { name: "Smart Plug Wi-Fi Outlet Adaptor", desc: "Automate appliance timers and voice-controlled smart systems", priceBase: 1799 },
      { name: "Ergonomic Vertical Wireless Mouse", desc: "Handshake position mouse with optical tracking precision", priceBase: 3899 },
      { name: "Ultra HD Web Camera 4K Pro", desc: "Auto-focus camera with stereo dual mics and physical privacy shutter", priceBase: 14499 },
      { name: "High-Speed HDMI 2.1 Cable 3m", desc: "Gold-plated braided cord supporting 8K 60Hz and 4K 120Hz", priceBase: 1499 },
      { name: "RGB LED Matrix Smart Clock", desc: "Visual weather, custom pixel art display, and alarm settings", priceBase: 8999 }
    ]
  },
  fashion: {
    brands: ["Zara", "H&M", "Levis", "Uniqlo", "Champion", "Superdry", "Tommy Hilfiger", "Lacoste"],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Premium Cotton Everyday Hoodie", desc: "Super-soft brushed fleece lining, classic relaxed street fit", priceBase: 4499 },
      { name: "Original Denim Rider Jacket", desc: "Heavyweight raw indigo washed canvas, button closure classics", priceBase: 7999 },
      { name: "Slim Fit Stretch Chino Pants", desc: "Breathable twill fabric with flexible waist for sleek daily wear", priceBase: 3499 },
      { name: "Airism Moisture-Wicking Tee", desc: "Ultralight breathable mesh backing, quick dry sports undershirt", priceBase: 1999 },
      { name: "Heavyweight Knit Crewneck Sweater", desc: "Chunky structured wool-blend warmth for chilly seasonal outings", priceBase: 5499 },
      { name: "Sleek Tailored Linen Blazer", desc: "Breathable double-vent back structure, ideal for summer formals", priceBase: 12999 },
      { name: "Casual Pique Cotton Polo Shirt", desc: "Signature embroidery crest, ribbed collar and double button placket", priceBase: 2899 },
      { name: "Athletic Compression Training Shorts", desc: "Hidden phone pocket lining, quick-dry performance waistband", priceBase: 2299 },
      { name: "Rugged Utility Cargo Pants", desc: "Reinforced knee lining and multi-button tactical gear pockets", priceBase: 4999 },
      { name: "Sherpa-Lined Corduroy Jacket", desc: "Insulated plush lining warmth with classic retro button flap collars", priceBase: 8999 },
      { name: "Classic Harrington Windbreaker", desc: "Water-resistant lightweight shell jacket with tartan cotton lining", priceBase: 6999 },
      { name: "Athletic Tech Fleece Sweatpants", desc: "Sleek tapered fit, zipper utility side pockets and drawstring", priceBase: 3999 },
      { name: "Premium Leather Dress Belt", desc: "Hand-finished full grain cowhide strap with metallic silver buckle", priceBase: 2499 },
      { name: "Classic French Terry Sweatshirt", desc: "Heavy weight loopback knit, ribbed cuffs and comfortable collar", priceBase: 4199 },
      { name: "Cable-Knit Cozy Wool Scarf", desc: "Extra long elegant scarf protection from harsh weather chills", priceBase: 1899 },
      { name: "Relaxed Fit Oxford Cotton Shirt", desc: "Button-down collar classic, durable oxford weave texture fabric", priceBase: 3299 },
      { name: "Luxury Embroidered Sherwani vest", desc: "Elegant metallic button closures, ideal festive accessory", priceBase: 9999 },
      { name: "Summer Floral Breathable Dress", desc: "Flowing lightweight chiffon lining with cinched waist detailing", priceBase: 5999 },
      { name: "Lounge Knit Soft PJ Set", desc: "Two-piece organic cotton sleeping shirt and matching pants set", priceBase: 4500 },
      { name: "Waterproof Travel Trench Coat", desc: "Double breasted long wind blocker, premium waist belt accent", priceBase: 15999 },
      { name: "Waffle-Knit Daily Base Layer", desc: "Thermal heat retention texture shirt for snug winter layering", priceBase: 2499 },
      { name: "Activewear Training Half-Zip", desc: "Thumbhole cuffs and breathable mock-neck athletic performance stretch", priceBase: 3299 },
      { name: "Designer Silk Floral Scarf", desc: "100% authentic mulberry silk neckwear with premium custom prints", priceBase: 4999 },
      { name: "Tapered Pleated Dress Trousers", desc: "Sharp center crease elegant office wear, stain resistant coat fabric", priceBase: 4599 },
      { name: "Water-Repellent Puffer Vest", desc: "Synthetic lightweight thermal down fill, zip closure hand pockets", priceBase: 7499 }
    ]
  },
  beauty: {
    brands: ["CeraVe", "The Ordinary", "La Roche-Posay", "Dior", "MAC", "Kiehls", "Laneige", "COSRX"],
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Hyaluronic Acid 2% + B5 Hydrator", desc: "Deep multi-depth rehydration serum with premium vitamin complex", priceBase: 2499 },
      { name: "Mineral SPF 50 Dry Touch Sunscreen", desc: "Zero white cast non-greasy water resistant ultraviolet guard", priceBase: 3899 },
      { name: "Snail Mucin 96 Power Essence", desc: "Highly popular Korean skin barrier repairs and glowing hydration", priceBase: 4200 },
      { name: "BHA Blackhead Clearing Exfoliator", desc: "2% Salicylic acid formula to unclog pores and refine skin texture", priceBase: 3500 },
      { name: "Hydro Boost Water Gel Moisterizer", desc: "Refreshing quick absorption hyaluronic gel for 72-hour moisture", priceBase: 2999 },
      { name: "Vitamin C Brightening Dark Spot Serum", desc: "Concentrated antioxidant boost formula to even out skin tone", priceBase: 3299 },
      { name: "Clay Mask Pore Purifying Detox", desc: "Natural bentonite clay, absorbs sebum, removes dead cells smoothly", priceBase: 1999 },
      { name: "Advanced Night Repair Serum", desc: "Synchronized recovery complex for anti-wrinkle youth radiance", priceBase: 14999 },
      { name: "Gentle Foaming Hydrating Cleanser", desc: "Ceramides enriched daily wash for dry to normal sensitive skin", priceBase: 2699 },
      { name: "Matte Lipstick Vivid Longwear", desc: "Highly pigmented creamy texture classic red lip colors that last", priceBase: 3999 },
      { name: "Lip Sleeping Mask Berry Repair", desc: "Nutrient-rich overnight softening lip balm with vitamin extracts", priceBase: 2499 },
      { name: "Rosewater Refreshing Facial Mist", desc: "Natural toner mist to hydrate, soothe and set makeup look", priceBase: 1499 },
      { name: "Collagen Peptide Firming Cream", desc: "Day and night anti-aging moisturizer for face and neck firming", priceBase: 4999 },
      { name: "Eyelash Volumizing Lash Paradise", desc: "Intense black mascara, feather-soft volume brush applicator", priceBase: 1899 },
      { name: "Radiant Creamy Full Concealer", desc: "Buildable medium coverage crease-proof dark circle corrector", priceBase: 4499 },
      { name: "Micellar All-in-1 Makeup Remover", desc: "Gentle cleansing water, lifts dirt and waterproof mascara instantly", priceBase: 1299 },
      { name: "Shea Butter Ultra Hand Therapy", desc: "Nourishing dry skin relief hand cream with sweet almond scent", priceBase: 1599 },
      { name: "Pro-Definition Matte Foundation", desc: "24-hour oil control sweatproof base liquid for all skin tones", priceBase: 5499 },
      { name: "Fine Precision Waterproof Eye Liner", desc: "Ultra-sharp liquid pen tip for bold wing designs that don't smudge", priceBase: 1799 },
      { name: "Argan Oil Hair Nourishing Mask", desc: "Deep conditioning restorative cream for dry split ends and shine", priceBase: 2299 },
      { name: "Nail Care Hardener & Base Coat", desc: "Keratin active formula to strengthen brittle nails and prevent chipping", priceBase: 1199 },
      { name: "Tea Tree Skin Clearing Toner", desc: "Mattifying purifying solution for blemish-prone oily skins", priceBase: 1699 },
      { name: "Dead Sea Mineral Bath Salt", desc: "100% pure natural therapeutic body wash salt for muscle relaxation", priceBase: 2199 },
      { name: "Gentle Bamboo Makeup Brush Set", desc: "12 pieces synthetic fiber brushes with organic wood handles", priceBase: 3499 },
      { name: "Charcoal Deep Peel-Off Mask", desc: "Active carbon formula to pull out stubborn blackheads on nose", priceBase: 1399 }
    ]
  },
  "home-living": {
    brands: ["IKEA", "Philips", "Dyson", "Breville", "Tefal", "Zojirushi", "OXO", "Prestige"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "LED Smart Color Lightbulb", desc: "Wi-Fi enabled bulb with millions of dimmable RGB color moods", priceBase: 2999 },
      { name: "Rapid-Boil Cordless Electric Kettle", desc: "1.7L stainless steel body, auto shut-off, boil-dry safety shield", priceBase: 5499 },
      { name: "Classic French Press Coffee Maker", desc: "Double-walled glass, triple steel filter, 8-cup espresso brewer", priceBase: 3899 },
      { name: "Vacuum-Insulated Travel Mug", desc: "Double wall steel leakproof mug, keeps drinks hot for 12 hours", priceBase: 2499 },
      { name: "Air Fryer Multi-Cooker 4.5L", desc: "Rapid hot air circulation for oil-free crispy healthy meals", priceBase: 18499 },
      { name: "Orthopedic Memory Foam Bed Pillow", desc: "Contoured neck support core, breathable hypoallergenic cover", priceBase: 3999 },
      { name: "Ultrasonic Cool Mist Air Humidifier", desc: "Whisper-quiet auto-off vaporizer with aromatherapy oil tray", priceBase: 4500 },
      { name: "Stainless Steel Sensor Trash Can", desc: "Infrared touchless motion sensor lid, fingerprint-resistant body", priceBase: 8999 },
      { name: "Premium Bamboo Fiber Bed Sheet Set", desc: "4-piece luxury queen sheets, incredibly soft cooling properties", priceBase: 6999 },
      { name: "Non-Stick Ceramic Frying Pan", desc: "Toxin-free healthy non-stick coating with ergonomic stay-cool handle", priceBase: 3299 },
      { name: "Premium Glass Prep Bowls Set", desc: "Set of 5 nesting borosilicate glass food containers with airtight lids", priceBase: 4999 },
      { name: "Scented Soy Wax Luxury Candle", desc: "Hand-poured natural soy, lavender and vanilla stress relief jar", priceBase: 1999 },
      { name: "Minimalist Wood Desk Organiser", desc: "Multi-slot storage rack for pens, phones, and paper mail trays", priceBase: 1499 },
      { name: "Digital Kitchen Food Scale", desc: "High-precision measurement sensors with touch tara button", priceBase: 1899 },
      { name: "Absorbent Microfiber Bath Mat", desc: "Plush shag floor rug with non-slip backing, machine washable", priceBase: 1599 },
      { name: "Ceramic Minimalist Succulent Pots", desc: "Set of 3 geometric white planters with natural bamboo coasters", priceBase: 2199 },
      { name: "Airtight Dry Food Storage Jars", desc: "Set of 4 stackable cereal canisters with easy lock-flap lids", priceBase: 3499 },
      { name: "Self-Watering Hanging Planter", desc: "Double-layer pot basket with water level gauge indicators", priceBase: 2299 },
      { name: "Insulated Thermal Lunch Tote Bag", desc: "Heavy duty canvas outer, aluminum foil cooling inner lining", priceBase: 1699 },
      { name: "Adjustable Laptop Desk Bed Tray", desc: "Folding bamboo table with drawer panel and cooling vents", priceBase: 4299 },
      { name: "Anti-Fatigue Cushioned Floor Mat", desc: "Thick ergonomic foam rug for standing comfort in kitchens", priceBase: 2999 },
      { name: "Handheld Garment Steamer Pro", desc: "1000W portable quick crease remover, ideal travel companion", priceBase: 5999 },
      { name: "Decorative Round Wall Mirror", desc: "Gold metallic thin framed modern hanging glass for bedrooms", priceBase: 7999 },
      { name: "Luxury Turkish Cotton Towel Set", desc: "Set of 4 thick fluffy face and hand towels, super absorbent", priceBase: 4499 },
      { name: "Heavy-Duty Laundry Hamper Bag", desc: "Folding canvas basket with dual durable aluminum ring handles", priceBase: 1999 }
    ]
  },
  watches: {
    brands: ["Rolex", "Seiko", "Casio", "Daniel Wellington", "Citizen", "Tissot", "Garmin", "Fossil"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "G-Shock Black Sport Utility Watch", desc: "Shockproof rugged design, water resistant, dual digital-analog face", priceBase: 18999 },
      { name: "Classic Seiko 5 Automatic Watch", desc: "Self-winding movement, day-date window, stainless steel link band", priceBase: 29999 },
      { name: "Classic Brown Leather Quartz Dress Watch", desc: "Clean minimalist dial, ultra-thin case, premium calfskin strap", priceBase: 14499 },
      { name: "Eco-Drive Solar Chronograph Watch", desc: "Powered by any light source, multi-dial stopwatch, dark blue face", priceBase: 38900 },
      { name: "Smart Fitness Health Tracker 6", desc: "AMOLED screen, heart rate, sleep analyzer, oxygen, sports tracker", priceBase: 11999 },
      { name: "Vintage Gold Digital Metallic Watch", desc: "Classic retro style digital watch, alarm clock, calendar, daily light", priceBase: 7499 },
      { name: "Seiko Presage Cocktail Automatic", desc: "Guilloche texture radial pattern dial, luxury dress wear classic", priceBase: 65000 },
      { name: "Rugged Tactical Outdoor GPS Watch", desc: "Built to military standards, altimeter, barometer, compass, navigation", priceBase: 49999 },
      { name: "Fossil Grant Black Chronograph", desc: "Roman numeral markers, three stopwatch sub-dials, durable casing", priceBase: 24999 },
      { name: "Luminous Diver Mechanical Watch", desc: "Rotating click-bezel, 200m water depth proof, glowing indices", priceBase: 32500 },
      { name: "Daniel Wellington Rose Gold Mesh", desc: "Ultra thin elegant watch face, adjustable metallic mesh lock strap", priceBase: 16999 },
      { name: "Hamilton Field Mechanical Watch", desc: "Hand-winding heritage military field watch, green canvas strap", priceBase: 85000 },
      { name: "Classic Pocket Watch Roman Dial", desc: "Mechanical hand wind filigree case, classic chain accessory", priceBase: 4999 },
      { name: "Elegant Ladies Diamond Dial Watch", desc: "Premium quartz watch, gold plated bracelet with diamond accent studs", priceBase: 19999 },
      { name: "Minimalist Blackout Minimalist Watch", desc: "Monochromatic black matte finish casing, minimalist grey markers", priceBase: 8999 },
      { name: "Orient Bambino Premium Leather", desc: "Domed crystal dial cover, automatic classic formal dress watch", priceBase: 45000 },
      { name: "Tissot Luxury Swiss Chronometer", desc: "Sapphire glass anti-scratch protection, high caliber Swiss movement", priceBase: 120000 },
      { name: "Silver Stainless Steel Chronograph", desc: "Heavy weight polished links, premium fold-over double clasp safety", priceBase: 15499 },
      { name: "Sports Silicon Stopwatch Watch", desc: "Sweat-resistant band, lap memory, timer, perfect gym companion", priceBase: 3499 },
      { name: "Citizen Promaster Marine Watch", desc: "ISO certified professional diver gear, eco-drive battery tech", priceBase: 58000 },
      { name: "Retro Style Silver Calculator Watch", desc: "Integrated keypad mini calculator, dual time zone, vintage cool", priceBase: 6499 }
    ]
  },
  shoes: {
    brands: ["Nike", "Adidas", "Puma", "Vans", "Converse", "New Balance", "Timberland", "Skechers"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Air Force 1 '07 Low Sneakers", desc: "Crisp white full-grain leather, legendary air sole cushioning", priceBase: 24999 },
      { name: "Stan Smith Classic Leather Shoes", desc: "Minimalist perforated three stripes, iconic clean white tennis build", priceBase: 18999 },
      { name: "Vans Old Skool Canvas Trainers", desc: "Classic checkerboard stripe side wall, waffle rubber traction grip", priceBase: 9999 },
      { name: "Ultraboost Light Running Shoes", desc: "Responsive energy return boost midsole, breathable knit comfort", priceBase: 34999 },
      { name: "New Balance 574 Lifestyle Sneakers", desc: "Retro running shoe aesthetic, suede and mesh combo, ENCAP support", priceBase: 16499 },
      { name: "Pegasus 40 Air Zoom Running", desc: "Engineered mesh ventilation, springy dual Zoom Air units inside", priceBase: 22499 },
      { name: "Timberland 6-Inch Premium Boot", desc: "Waterproof nubuck leather, rustproof hardware, rugged lug sole", priceBase: 38999 },
      { name: "Dr. Martens 1460 Smooth Boot", desc: "8-eyelet classic air-cushioned bouncing soles, yellow welt stitching", priceBase: 28499 },
      { name: "Clarks Desert Suede Boots", desc: "Premium sand suede leather, clean crepe natural rubber soles", priceBase: 19999 },
      { name: "Samba OG Retro Turf Sneakers", desc: "Classic indoor soccer flat sole trainers, iconic suede T-toe design", priceBase: 17999 },
      { name: "Birkenstock Arizona Two-Strap Sandals", desc: "Contoured cork footbed, adjustable copper buckles, comfortable walk", priceBase: 14500 },
      { name: "Asics Gel-Kayano Stability Running", desc: "Premium overpronation correction, gel cushioning shock absorber", priceBase: 26999 },
      { name: "Crocs Classic Comfortable Clogs", desc: "Water-friendly ventilated slip-on sandals, comfortable foam bed", priceBase: 5499 },
      { name: "Converse Chuck 70 High Tops", desc: "Vintage stitching heavyweight canvas, higher rubber foxing edge", priceBase: 11499 },
      { name: "Skechers Arch Fit Go Walk Shoes", desc: "Slip-on casual sock style shoes, orthotic support mesh fabric", priceBase: 8999 },
      { name: "Chelsea Suede Slip-On Boots", desc: "Elastic side goring, premium brown suede leather, clean stacked heel", priceBase: 12999 },
      { name: "Leather Penny Loafers Premium", desc: "Polished cordovan cowhide leather, slip-on elegant formal footwear", priceBase: 14999 },
      { name: "Reebok Club C Vintage Sneakers", desc: "Soft garment leather, retro union jack logo embroidery, cream color", priceBase: 13499 },
      { name: "Cole Haan GrandPro Tennis Sneaker", desc: "Featherweight lifestyle court shoes, rich burnished leather panels", priceBase: 19999 },
      { name: "Under Armour Basketball High-Tops", desc: "Ankle locking support, heavy court grip, professional gaming shoes", priceBase: 16999 },
      { name: "Outdoor Waterproof Hiking Shoes", desc: "Gore-Tex breathable layer, rugged Vibram deep traction rubber soles", priceBase: 21999 },
      { name: "Athletic Slides Gym Sandals", desc: "Contoured quick-dry slide strap, cushioning comfort post-workout", priceBase: 2499 },
      { name: "Salomon Trail Running Sneakers", desc: "Quicklace drawcord system, ortholite sockliner, premium speed grip", priceBase: 24500 }
    ]
  },
  bags: {
    brands: ["Puma", "Lavie", "Herschel", "Samsonite", "Fjallraven", "Coach", "Nomatic", "Bellroy"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Heritage Classic Canvas Backpack", desc: "Fully lined signature fabric strip, 15-inch protective laptop slot", priceBase: 8999 },
      { name: "Omni Hardside Suitcase Cabin size", desc: "Scratch-resistant polycarbonate shell, multidirectional spinner wheels", priceBase: 24999 },
      { name: "Kanken Water-Resistant Daily Pack", desc: "Vinylon F material, converting backpack/tote straps, foam cushion seat", priceBase: 11499 },
      { name: "Borealis Heavy-Duty Utility Backpack", desc: "FlexVent suspension system, front elastic bungee cord packing gear", priceBase: 14499 },
      { name: "Jet Set Saffiano Leather Tote", desc: "Dual slim buckled straps, spacious multi-pocket design gold tone logo", priceBase: 38999 },
      { name: "Aer Day Pack Tech Organiser", desc: "Water-resistant ballistic nylon, structured self-standing design", priceBase: 16999 },
      { name: "Everyday Sling Camera Bag 6L", desc: "Fast-access strap adjuster, customizable padded flex-fold dividers", priceBase: 19999 },
      { name: "Waterproof Travel Duffle Bag 50L", desc: "Heavy weather-proof material, convertible backpack padded straps", priceBase: 12499 },
      { name: "Minimalist Leather Trifold Wallet", desc: "RFID blocking security lining, premium vegetable tanned leather skin", priceBase: 4499 },
      { name: "Nomatic Travel Tech Pack", desc: "Full perimeter zipper expansion, smart cord pass-through pockets", priceBase: 28999 },
      { name: "Adidas Alliance Drawstring Gym Bag", desc: "Zipper key valuables pocket, breathable mesh side pockets bottle pack", priceBase: 2499 },
      { name: "Leather Formal Business Briefcase", desc: "Padded files partition, dual lock brass buckle closures carry handle", priceBase: 19999 },
      { name: "Sleek Crossbody Messenger Shoulder Bag", desc: "Magnetic flap closure, durable cotton canvas, leather accent trim", priceBase: 5999 },
      { name: "Lavie Classic Shoulder Purse", desc: "Soft pebbled faux leather, twin handles, middle zip divider pocket", priceBase: 3999 },
      { name: "Secrid Aluminum Slim Card protector", desc: "Card ejection lever mechanism, protective aluminum RFID shielding", priceBase: 6499 },
      { name: "Handcrafted Toiletry Wash Bag", desc: "Waterproof inner lining, zipper compartments, portable hanging hook", priceBase: 1899 },
      { name: "Gym Sack Pack Drawstring Bag", desc: "Lightweight ripstop nylon, front zipper pocket, breathable straps", priceBase: 1599 },
      { name: "Peak Design Travel Backpack 30L", desc: "Full rear zipper access, magnetic tuck-away shoulder strap system", priceBase: 34999 },
      { name: "Michael Kors Saffiano Wristlet Clutch", desc: "Removable leather wrist strap, cards card slots, gold metallic zip", priceBase: 15499 },
      { name: "Anti-Theft Commuter Backpack", desc: "Hidden back-facing zipper closures, slash proof wire reinforced body", priceBase: 7999 },
      { name: "Herschel Roy Bi-fold Wallet", desc: "Durable classic woven fabric wallet, currency sleeve, cards slot", priceBase: 2999 },
      { name: "Samsonite Softside Expandable Spinner", desc: "Heavy weave fabric, TSA combination padlock integrated, large bag", priceBase: 32000 },
      { name: "Ultra-Light Packable Backpack 15L", desc: "Folds down into a tiny integrated pouch, highly portable helper", priceBase: 1999 }
    ]
  },
  gaming: {
    brands: ["Sony", "Nintendo", "Microsoft", "Razer", "Logitech", "SteelSeries", "Corsair", "Secretlab"],
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "DualSense Edge Elite Controller", desc: "Pro grade modular analogs, mapping rear paddles, trigger locks", priceBase: 58999 },
      { name: "Nintendo Switch Pro Controller", desc: "Motion control sensors, HD rumble haptic, built-in amiibo reader", priceBase: 18999 },
      { name: "G502 X Plus Lightspeed Gaming Mouse", desc: "Hybrid optical-mechanical switches, RGB lightsync, wireless gaming", priceBase: 26499 },
      { name: "Apex Pro TKL Mechanical Keyboard", desc: "OmniPoint 2.0 adjustable magnetic switches, mini smart OLED screen", priceBase: 39999 },
      { name: "Cloud III Red Wired Gaming Headset", desc: "Re-engineered angled 53mm audio drivers, ultra clear microphone", priceBase: 19499 },
      { name: "Wave:3 Premium USB Microphone", desc: "Digital mixing software integration, capacitive mute sensor head", priceBase: 34999 },
      { name: "G Pro X Superlight Wireless Mouse", desc: "Ultra light 63g weight design, HERO 25K gaming sensor tracking", priceBase: 32999 },
      { name: "Nintendo Switch OLED Model System", desc: "7-inch vibrant OLED screen console, wider adjustable stand docks", priceBase: 88000 },
      { name: "Steam Deck Handheld 512GB System", desc: "Custom AMD APU gaming machine, high speed NVMe SSD storage", priceBase: 145000 },
      { name: "BlackShark V2 Pro Wireless Headset", desc: "Titanium 50mm drivers, noise isolation mic, gaming sound profiles", priceBase: 28999 },
      { name: "Kishi V2 Mobile Universal Controller", desc: "Microswitch analog buttons, extendable bridge for iPhone & Android", priceBase: 14999 },
      { name: "Xbox Wireless Controller Carbon Black", desc: "Hybrid D-pad design, textured grip triggers, bluetooth connect PC", priceBase: 16499 },
      { name: "Huntsman Mini 60% Optical Keyboard", desc: "Linear optical switches, doubleshot PBT keycaps, compact layout", priceBase: 21999 },
      { name: "WD_Black SN850X SSD with Heatsink", desc: "PCIe Gen4 M.2 NVMe SSD storage up to 7300MB/s, fully PS5 compatible", priceBase: 28499 },
      { name: "Logitech G29 Driving Force Racing Wheel", desc: "Dual-motor force feedback, leather wheel wrap, stainless steel pedals", priceBase: 69999 },
      { name: "Stealth Pro Wireless ANC Headset", desc: "50mm Nanoclear audio drivers, active noise cancellation system", priceBase: 54999 },
      { name: "NZXT Capsule USB Cardioid Microphone", desc: "24-bit/96kHz recording clarity, built-in shock mount desk stand", priceBase: 18999 },
      { name: "Corsair K70 RGB Rapidfire Keyboard", desc: "Cherry MX Speed silver switches, aluminum frame, media keys roller", priceBase: 31999 },
      { name: "BenQ ZOWIE XL2546K Esport Monitor", desc: "24.5 inch display, 240Hz refresh rate, DyAc+ recoil control tech", priceBase: 98000 },
      { name: "Secretlab TITAN Evo Gaming Chair", desc: "L-adapt lumbar support, magnetic memory foam head pillow, leatherette", priceBase: 125000 },
      { name: "Razer DeathAdder V3 Ergonomic Mouse", desc: "63g ultra-light wired design, 30K optical sensor, gaming classic", priceBase: 14999 },
      { name: "Gaming RGB Oversized Mousepad", desc: "Waterproof fabric surface, stitching LED light strip edges micro-USB", priceBase: 3899 },
      { name: "Microsoft Xbox Series S Console 512GB", desc: "All-digital next-gen gaming console, HDR speed architecture", priceBase: 99999 }
    ]
  },
  "toys-games": {
    brands: ["LEGO", "Hasbro", "Mattel", "Ravensburger", "Crayola", "Pokemon", "Schleich", "Hot Wheels"],
    images: [
      "https://images.unsplash.com/photo-1585366119957-e5733f3000cd?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Skyline Architecture Building Kit", desc: "Rebuild iconic cityscapes with display baseplates and books", priceBase: 14999 },
      { name: "Monopoly Deal Card Game Classic", desc: "Fast-paced property trading card gameplay for family gathering", priceBase: 1299 },
      { name: "Classic UNO Flip Card Deck", desc: "Double sided play cards, special action cards for competitive nights", priceBase: 999 },
      { name: "1000pc Beautiful Landscape Jigsaw", desc: "Premium anti-glare puzzle board, perfect interlocking thick parts", priceBase: 3299 },
      { name: "Hot Wheels 10-Car Gift Pack Assortment", desc: "1:64 scale die-cast toy vehicles collection with highly detailed decals", priceBase: 3899 },
      { name: "Elite 2.0 Commander Toy Blaster", desc: "Rotating 6-dart barrel, tactical rails and custom barrel extensions", priceBase: 4499 },
      { name: "Rubik's 3x3 Speed Cube", desc: "Smoother spring loaded rotation mechanism for fast puzzle solving", priceBase: 1899 },
      { name: "Speed Champions Porsche Race Car Kit", desc: "Authentic design replica sports vehicle construction brick toy", priceBase: 6999 },
      { name: "Barbie Fashionistas Classic Doll", desc: "Trendy casual wear clothing, realistic hairstyles and poseable limbs", priceBase: 3499 },
      { name: "Catan Board Game Base Edition", desc: "Classic settlement building and resource trade strategy game", priceBase: 8999 },
      { name: "Ticket to Ride Europe Board Game", desc: "Cross-country railway connection card game, simple rules family fun", priceBase: 7999 },
      { name: "Classic Jenga Wood Blocks Stack", desc: "54 genuine hardwood blocks, stack and pull balance party game", priceBase: 2499 },
      { name: "Exploding Kittens Card Game", desc: "Highly popular strategic card party game for cat lovers and lasers", priceBase: 3200 },
      { name: "Risk Global Domination Board Game", desc: "Tactical map control war strategy board game with armies pieces", priceBase: 6499 },
      { name: "Tamagotchi Pix Virtual Camera Pet", desc: "Color screen pocket digital pet, interactive photo camera cooking", priceBase: 12500 },
      { name: "Technic Chevrolet Corvette Race Kit", desc: "Realistic gear mechanism steering build, sleek toy muscle car", priceBase: 11999 },
      { name: "Super Soaker Torrent Water Blaster", desc: "High pressure pumping water squirt gun for summer outdoor pool play", priceBase: 2899 },
      { name: "Mattel Classic Scrabble Crossword", desc: "Wooden tile letter holders and premium board spelling board game", priceBase: 3499 },
      { name: "Wooden Rainbow Building Blocks Set", desc: "100 pieces natural wood shapes with non-toxic bright color stains", priceBase: 3999 },
      { name: "Crayola 120 Ultimate Crayon Tin", desc: "Huge color collection with integrated sharpener case box", priceBase: 2199 },
      { name: "Pokemon TCG Battle Academy Game Set", desc: "Complete two-player trading card learning board and instructions", priceBase: 6499 },
      { name: "Classic Connect 4 Grid Game", desc: "Get four red or yellow discs in a row to win disc dropper board", priceBase: 1799 },
      { name: "Schleich Wild Savannah Animals Set", desc: "5 realistically detailed hand-painted wildlife figures collection", priceBase: 4999 },
      { name: "Play-Doh Sparkle Multi-Can Pack", desc: "6 cans of glitter modeling compound with butterfly cutting molds", priceBase: 1899 },
      { name: "Electric Remote Control RC Drift Car", desc: "High speed rechargeable battery rc car with LED headlights drift tyres", priceBase: 8999 }
    ]
  },
  books: {
    brands: ["Penguin Books", "HarperCollins", "Oxford Press", "Moleskine", "Parker", "Lamy", "Faber-Castell"],
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "The Creative Act by Rick Rubin", desc: "A beautiful study of creativity, art, and inspiration from the master music producer", priceBase: 3499 },
      { name: "Atomic Habits by James Clear", desc: "An easy & proven way to build good habits and break bad ones. Hardcover bestselling book", priceBase: 2499 },
      { name: "Show Your Work! by Austin Kleon", desc: "10 ways to share your creativity and get discovered in the digital age. Compact graphic guide", priceBase: 1999 },
      { name: "Premium Leather Bullet Journal", desc: "160 pages heavyweight dotted paper, premium faux leather hard back, flat opening", priceBase: 2899 },
      { name: "Parker Jotter Classic Ballpoint Pen", desc: "Authentic metallic body, signature arrow clip, smooth clicking ballpoint write", priceBase: 2199 },
      { name: "Lamy Safari Premium Fountain Pen", desc: "Robust ABS plastic body, ergonomically shaped grip, stainless steel medium nib", priceBase: 6999 },
      { name: "Moleskine Hardcover Ruled Notebook", desc: "Classic pocket journal, rounded corners, acid-free paper, expandable back pouch", priceBase: 3499 },
      { name: "Faber-Castell Pitt Artist Brush Pens", desc: "8-pack pigment India ink drawing pens, waterproof, lightfast calligraphy set", priceBase: 3899 },
      { name: "Mildliner Double-Ended Highlighters", desc: "15 pastel and neutral color warm highlighters, chisel and fine bullet tips", priceBase: 2499 },
      { name: "The Alchemist by Paulo Coelho", desc: "Inspiring fable about following your personal legend and worldly treasures", priceBase: 1499 },
      { name: "Thinking, Fast and Slow by Daniel Kahneman", desc: "Fascinating Nobel Prize-winning study of human psychology and decisions", priceBase: 2999 },
      { name: "Sapiens: A Brief History of Humankind", desc: "Bestselling exploration of the history and future of the human race by Yuval Noah Harari", priceBase: 3299 },
      { name: "The Psychology of Money", desc: "Timeless lessons on wealth, greed, and happiness by Morgan Housel", priceBase: 1999 },
      { name: "Fahrenheit 451 Classic Edition", desc: "Ray Bradbury's dystopian classic about the cost of free thought", priceBase: 1699 },
      { name: "Dune Deluxe Hardcover Novel", desc: "Herbert's masterpiece sci-fi epic, beautifully bound with metallic foil pages", priceBase: 5999 },
      { name: "Rhodia Dot Grid Webnotebook A5", desc: "90g ivory paper, dotted layout, leatherette soft-feel notebook", priceBase: 3200 },
      { name: "Staedtler Triplus Fineliner Pens 20-pack", desc: "0.3mm metal-clad tip fine drawing pens, dry-safe ink color set", priceBase: 3999 },
      { name: "Premium Bottled Fountain Pen Ink", desc: "Deep rich ink in elegant glass bottle, ideal for Lamy and Parker pens", priceBase: 1499 },
      { name: "Sticky Index Tab Page Markers", desc: "1000 pieces pastel colors writable index flag tabs for books annotations", priceBase: 899 },
      { name: "Prismacolor Premier Coloring Pencils 24", desc: "Soft core thick cores pencils, rich saturated blendable colors for artists", priceBase: 6499 },
      { name: "A4 Heavyweight Sketchbook 120 Pages", desc: "Acid-free toothy texture paper, sturdy double wire binding, cardboard back", priceBase: 2199 },
      { name: "Handcrafted Refillable Leather Journal", desc: "Authentic crazy horse leather cover, blank cotton pages, retro wrap strap", priceBase: 4999 },
      { name: "Rechargeable Clip-On Book Light", desc: "USB powered reading light, 3 color modes, dimmable clamp neck", priceBase: 1799 },
      { name: "Handcrafted Antique Brass Bookmark", desc: "Intricate filigree metallic bookmark with crystal bead hanging chain tassel", priceBase: 1199 },
      { name: "Pilot Metropolitan Fountain Pen Classic", desc: "Polished brass barrel, matte black accent, converter cartridge system", priceBase: 5499 }
    ]
  },
  sports: {
    brands: ["Wilson", "Decathlon", "Spalding", "Everlast", "CamelBak", "Giro", "Kettlebell Prime", "Manduka"],
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Decathlon Hex Dumbbells 10kg Set", desc: "Ergonomic chrome handle, durable anti-roll hexagon rubber coating", priceBase: 9999 },
      { name: "Manduka PRO High Grip Yoga Mat", desc: "6mm ultra thick dense cushion, non-slip textured finish hygiene mat", priceBase: 4499 },
      { name: "Spalding Indoor-Outdoor Basketball", desc: "Composite leather cover, deep channels pebble texture grip, official size 7", priceBase: 3899 },
      { name: "Wilson US Open Tennis Racket", desc: "Lightweight titanium alloy frame, stable swing power, pre-strung", priceBase: 5499 },
      { name: "Everlast Pro Boxing Gloves 12oz", desc: "Premium synthetic leather, secure wrist wrap hook and loop locks", priceBase: 4999 },
      { name: "CamelBak Eddy+ Insulated Water Bottle", desc: "BPA-free leakproof bite valve, double wall vacuum keeps ice cold 24h", priceBase: 2499 },
      { name: "TRX Suspension Training System", desc: "Anchor straps and heavy-duty carbines for bodyweight workout", priceBase: 11999 },
      { name: "Speedo Anti-Fog Swimming Goggles", desc: "Leakproof silicone gaskets, UV protected wide lens, adjustable strap", priceBase: 2899 },
      { name: "Kettlebell Prime Cast Iron 12kg", desc: "Solid single piece cast iron casting, wide powder coated texture grip", priceBase: 5999 },
      { name: "Fitness Resistance Band Loops Set", desc: "5 bands with varying resistance levels, premium natural latex rubber", priceBase: 1899 },
      { name: "Steel Wire Speed Skipping Rope", desc: "Double ball bearings aluminum handles, adjustable length cable jump", priceBase: 1499 },
      { name: "Dual Grip Exercise Ab Roller", desc: "Wide heavy-duty wheel traction grip, comfortable foam handles, knee pad", priceBase: 1999 },
      { name: "Ankle Weights Adjustable Strap", desc: "Padded pockets with steel shot weight fillings, secure straps set", priceBase: 2999 },
      { name: "Sports Running Waist Belt Pack", desc: "Sweatproof expandable zipper pouch, headphones port, elastic band", priceBase: 1299 },
      { name: "Polarized UV400 Sports Sunglasses", desc: "Impact resistant polycarbonate lenses, lightweight non-slip frames", priceBase: 3499 },
      { name: "Hydration Pack 2L Water Bladder", desc: "Breathable backpack, quick release bite valve straw, storage pockets", priceBase: 4299 },
      { name: "Table Tennis Rackets Set of 2", desc: "7-ply wood blades, premium pimpled rubber skin, 3 training balls", priceBase: 3199 },
      { name: "Microfiber Quick-Dry Gym Towels", desc: "Super absorbent compact towels, carry mesh bag included", priceBase: 1599 },
      { name: "Foam Roller Muscle Massager", desc: "High density EVA foam grids, deep tissue trigger point roller wheel", priceBase: 2199 },
      { name: "Official Size 5 Football", desc: "Machine-stitched 32 panel synthetic leather, butyl bladder air lock", priceBase: 2800 },
      { name: "Decathlon Cork Yoga Blocks Set", desc: "100% natural eco-friendly firm cork bricks, contoured edges support", priceBase: 2499 },
      { name: "Decathlon Elastic Gym Gloves", desc: "Padded suede palm protection, breathable backing mesh daily lifting", priceBase: 1799 },
      { name: "Adjustable Hand Grip Strengthener", desc: "Tension dial ranges 10kg to 60kg, non-slip ergonomic spring squeezer", priceBase: 1199 },
      { name: "Badminton Rackets Set with Net", desc: "Two alloy rackets, steel shafts, three shuttlecocks and carry bag", priceBase: 4999 },
      { name: "Heavy Duty Punching Bag Chain", desc: "Four-way steel swivel chain hanger hook, handles up to 100lbs bags", priceBase: 1899 }
    ]
  },
  automotive: {
    brands: ["Bosch", "Meguiars", "Chemical Guys", "Noco", "ThisWorx", "Lamicall", "Armor All", "Turtle Wax"],
    images: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=60"
    ],
    items: [
      { name: "Meguiar's Gold Class Car Wash 1.8L", desc: "Rich suds formula, conditions paint, safely lifts dirt without wax strip", priceBase: 3499 },
      { name: "Bosch ICON Frameless Wiper Blade", desc: "Dual tension spring technology, clean wipe in heavy monsoon rain", priceBase: 2499 },
      { name: "Noco Genius1 Smart Battery Charger", desc: "1-amp automatic battery charger, maintainer, desulfator for car batteries", priceBase: 8999 },
      { name: "Microfiber Detailing Towels 12-pack", desc: "Plush scratch-free silk edges, absorbs water, ideal for wax buffing", priceBase: 1999 },
      { name: "ThisWorx Portable Car Vacuum 12V", desc: "High power suction, HEPA filter, plugs directly into lighter socket", priceBase: 4499 },
      { name: "Lamicall Air Vent Phone Mount", desc: "Strong steel hook clamp grip, 360-degree rotation universal cradle", priceBase: 1499 },
      { name: "Meguiar's Ultimate Liquid Carnauba Wax", desc: "Synthetic polymer protection, mirror-like gloss finish paint sealer", priceBase: 4999 },
      { name: "Armor All Protectant Wipes 30pc", desc: "Safely cleans dashboards and vinyl, UV protection shields from fading", priceBase: 1199 },
      { name: "LED Headlight H4 Conversion Kit", desc: "Cool white 6000K bulb set, plug-and-play high visibility headlights", priceBase: 7999 },
      { name: "Digital Heavy Duty Tire Pressure Gauge", desc: "Backlit LCD screen, metal nozzle, 150 PSI maximum read accuracy", priceBase: 1899 },
      { name: "Heavy Duty Jumper Cables 4-Gauge", desc: "Tangle-free copper coated cables, heavy duty spring clamps, travel bag", priceBase: 3899 },
      { name: "Turtle Wax Scratch Repair Pen", desc: "Clear coat scratch filling formula, prevents rust, fixes light scrapes", priceBase: 1599 },
      { name: "Clay Bar Detailing Kit Premium", desc: "Removes deep embedded paint contaminations, smooth glassy surface feel", priceBase: 3499 },
      { name: "Rain-X Water Repellent Glass Spray", desc: "Invisible hydrophobic coating, disperses rain droplets instantly", priceBase: 1299 },
      { name: "Lavender Car Hanging Air Fresheners", desc: "4-pack natural aroma wood diffusers, neutralizes cigarette and pet odors", priceBase: 899 },
      { name: "Premium Leather Cleaner and Conditioner", desc: "Restores leather car seats shine, prevents cracks, leaves dry matte finish", priceBase: 2499 },
      { name: "Foldable Accordion Car Windshield Sunshade", desc: "Double bubble silver foil backing, keeps cabin cool under direct sun", priceBase: 1499 },
      { name: "Trunk Cargo Organiser Collapsible", desc: "Heavy duty oxford fabric, non-slip base straps, multiple side pockets", priceBase: 3299 },
      { name: "Car Seat Gap Filler organizer 2-pack", desc: "Snug fits between seat console, stops dropping keys, coin slots ports", priceBase: 1899 },
      { name: "Dual USB QC3.0 Car Charger Adapter", desc: "All-metal mini adapter, fast charges dual smartphones simultaneously", priceBase: 999 },
      { name: "OBD2 Bluetooth Engine Code Scanner", desc: "Diagnoses vehicle check engine light, works with Torque and iOS apps", priceBase: 4999 },
      { name: "1080P Ultra Wide Dashboard Camera", desc: "G-sensor crash detector, loop recording memory, night vision lens", priceBase: 11499 },
      { name: "Portable Electric Air Compressor 150PSI", desc: "Digital tyre inflator pump, automatic shutoff presets, flashlight LED", priceBase: 6999 },
      { name: "Meguiar's Non-Acid Wheel & Tire Cleaner", desc: "Active foam dissolves brake dust, safe on all factory finished rims", priceBase: 2999 },
      { name: "Heavy Microfiber Scratch-free Wash Mitt", desc: "Extra plush chenille wash glove, holds soapy water, secure elastic cuff", priceBase: 1199 }
    ]
  }
};

// Programmatic expansion of products list to guarantee every category has at least 25 items!
export const PRODUCTS: Product[] = (() => {
  const finalProducts = [...STATIC_PRODUCTS];

  // Loop through all 12 categories
  CATEGORIES.forEach((cat) => {
    // Check how many items currently exist in finalProducts for this category
    const existingCount = finalProducts.filter((p) => p.category === cat.id).length;
    const itemsToGenerate = Math.max(0, 25 - existingCount);

    if (itemsToGenerate > 0) {
      const spec = categorySpecs[cat.id] || categorySpecs["electronics"];
      
      for (let i = 0; i < itemsToGenerate; i++) {
        const itemTemplate = spec.items[i % spec.items.length];
        const brand = spec.brands[i % spec.brands.length];
        const image = spec.images[i % spec.images.length];
        const discountPercent = Math.floor(10 + ((i * 7) % 31)); // 10% to 40%
        const originalPrice = Math.round(itemTemplate.priceBase * 1.25);
        const price = Math.round(originalPrice * (1 - discountPercent / 100));
        const rating = parseFloat((4.1 + ((i * 3) % 9) / 10).toFixed(1)); // 4.1 to 4.9
        const reviewCount = Math.floor(12 + ((i * 19) % 138));

        finalProducts.push({
          id: `gen-${cat.id}-${i}`,
          name: `${brand} ${itemTemplate.name}`,
          description: itemTemplate.desc,
          price,
          originalPrice,
          discountPercent,
          rating,
          reviewCount,
          imageUrl: image,
          category: cat.id,
          brand,
          isTrending: i % 7 === 0,
          isBestSeller: i % 8 === 0,
          isNewArrival: i % 9 === 0
        });
      }
    }
  });

  return finalProducts;
})();
