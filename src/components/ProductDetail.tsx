import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  RotateCw, 
  Check, 
  Sparkles,
  MessageSquare
} from "lucide-react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductDetailProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  onBack: () => void;
  allProducts: Product[];
  onClickProduct: (product: Product) => void;
}

// Generate premium mock images/angles based on category & primary image
const getMockImagesForProduct = (product: Product): string[] => {
  if (!product) return [];
  const primary = product.imageUrl;

  switch (product.category) {
    case "fashion":
      return [
        primary,
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80"  
      ];
    case "shoes":
      return [
        primary,
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"  
      ];
    case "electronics":
      return [
        primary,
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"  
      ];
    case "watches":
      return [
        primary,
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80"  
      ];
    case "bags":
      return [
        primary,
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80", 
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80"  
      ];
    default:
      return [
        primary,
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
      ];
  }
};

// Colors and Sizes map based on category
const getMockSpecsForProduct = (product: Product) => {
  if (!product) return { colors: [], sizes: [], specs: [] };

  switch (product.category) {
    case "fashion":
      return {
        colors: [
          { name: "Slate Grey", hex: "#4B5563", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80" },
          { name: "Navy Blue", hex: "#1E3A8A", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80" },
          { name: "Burgundy Maroon", hex: "#7F1D1D", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80" },
          { name: "Classic Black", hex: "#111827", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        specs: [
          { name: "Material", value: "80% Pure Linen, 20% Cotton blend" },
          { name: "Fit", value: "Premium Slim Tailored Fit" },
          { name: "Care Instructions", value: "Machine Wash cold, tumble dry low" },
          { name: "Country of Origin", value: "Made in Pakistan (Faisalabad)" }
        ]
      };
    case "shoes":
      return {
        colors: [
          { name: "Hyper Red", hex: "#EF4444", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80" },
          { name: "Pitch Black", hex: "#000000", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80" },
          { name: "Midnight Blue", hex: "#1D4ED8", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80" },
          { name: "Clean White", hex: "#F9FAFB", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["39", "40", "41", "42", "43", "44"],
        specs: [
          { name: "Sole", value: "Premium Cushioned Air TPU outsole" },
          { name: "Upper", value: "Breathable engineered mesh flyknit" },
          { name: "Weight", value: "280g per shoe" },
          { name: "Helpline Guarantee", value: "7-Day Replacement Guarantee" }
        ]
      };
    case "electronics":
      return {
        colors: [
          { name: "Space Grey", hex: "#374151", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80" },
          { name: "Silver Titanium", hex: "#D1D5DB", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80" },
          { name: "Anodized Black", hex: "#0F172A", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["128GB", "256GB", "512GB"],
        specs: [
          { name: "Box Contents", value: "Device, USB-C High-Speed Cable, User Guide" },
          { name: "Warranty", value: "1 Year Official Local Brand Warranty" },
          { name: "Battery Lifespan", value: "Up to 30 Hours active usage" },
          { name: "Fast Charge", value: "50% charge in 25 minutes via Type-C" }
        ]
      };
    case "watches":
      return {
        colors: [
          { name: "Royal Gold", hex: "#D97706", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&auto=format&fit=crop&q=80" },
          { name: "Sterling Silver", hex: "#9CA3AF", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80" },
          { name: "Obsidian Black", hex: "#111827", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["40mm", "42mm", "44mm"],
        specs: [
          { name: "Case Material", value: "Aerospace-grade Stainless Steel" },
          { name: "Strap", value: "Premium Genuine Calf Leather" },
          { name: "Water Resistance", value: "IP68 dustproof & 50m Waterproof" },
          { name: "Sensor Suite", value: "Heart Rate, SpO2, Sleep, Multi-Sport Tracker" }
        ]
      };
    case "bags":
      return {
        colors: [
          { name: "Cognac Brown", hex: "#B45309", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80" },
          { name: "Rich Charcoal", hex: "#1F2937", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80" },
          { name: "Desert Sand", hex: "#F59E0B", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["Standard Medium", "Elite Large"],
        specs: [
          { name: "Fabric Type", value: "Eco-friendly premium PU water-resistant leather" },
          { name: "Compartments", value: "2 Main chambers, 1 Padded Laptop sleeve (up to 15.6\")" },
          { name: "Zippers", value: "Self-repairing heavy duty brass zippers" }
        ]
      };
    default:
      return {
        colors: [
          { name: "Carbon Black", hex: "#18181b", img: product.imageUrl },
          { name: "Ice White", hex: "#f4f4f5", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" }
        ],
        sizes: ["Standard One Size"],
        specs: [
          { name: "Guarantee", value: "100% Genuine product validation" },
          { name: "Shipping Time", value: "Delivered in 2-4 business days" }
        ]
      };
  }
};

export default function ProductDetail({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBack,
  allProducts,
  onClickProduct,
}: ProductDetailProps) {
  const specsInfo = getMockSpecsForProduct(product);
  const mockImages = getMockImagesForProduct(product);

  const [activeImage, setActiveImage] = useState(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState(specsInfo.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(specsInfo.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [addingState, setAddingState] = useState<"idle" | "adding" | "added">("idle");

  // Reset states when switching product
  useEffect(() => {
    setActiveImage(product.imageUrl);
    setSelectedSize(specsInfo.sizes[0] || "");
    setSelectedColor(specsInfo.colors[0]?.name || "");
    setQuantity(1);
    setAddingState("idle");
    
    // Scroll the modal container (not the window) if it exists so we stay where we are on home page
    const modalContainer = document.querySelector(".fixed.inset-0.overflow-y-auto");
    if (modalContainer) {
      modalContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleColorSelect = (colorName: string, colorImg?: string) => {
    setSelectedColor(colorName);
    if (colorImg) {
      setActiveImage(colorImg);
    }
  };

  const handleAddToCartClick = () => {
    setAddingState("adding");
    setTimeout(() => {
      onAddToCart(product, quantity, selectedSize, selectedColor);
      setAddingState("added");
      setTimeout(() => {
        setAddingState("idle");
      }, 2000);
    }, 800);
  };

  // Related products filtered by same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 shrink-0 ${
            i <= floorRating ? "text-amber-400 fill-amber-400" : "text-zinc-200 dark:text-zinc-700"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* 1. BACK NAVIGATION & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <span>Home</span>
          <span>/</span>
          <span className="text-zinc-650 dark:text-zinc-350">{product.category}</span>
          <span>/</span>
          <span className="text-violet-600 dark:text-violet-400 truncate max-w-[120px]">{product.brand}</span>
        </div>
      </div>

      {/* 2. DEDICATED PRODUCT DESCRIPTOR GRID */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* LEFT: MEDIA SECTION (IMAGE VIEWER) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Stage */}
            <div className="aspect-square w-full bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-850 p-6 flex items-center justify-center relative group">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails strip */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {mockImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-lg border bg-zinc-50 dark:bg-zinc-950 p-1 flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                    activeImage === img
                      ? "border-violet-600 ring-2 ring-violet-500/20"
                      : "border-zinc-200 dark:border-zinc-850 hover:border-zinc-350"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Angle ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONFIGURATION & ADD TO CART DETAILS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-zinc-800 py-1 px-3 rounded-full">
                  {product.brand}
                </span>
                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 px-2 py-0.5 rounded">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Stars summary */}
              <div className="flex items-center gap-2 pt-1 border-b border-zinc-100 dark:border-zinc-850 pb-3">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">{product.rating} / 5.0</span>
                <span className="text-xs text-zinc-400 font-semibold">({product.reviewCount || 12} Authentic reviews)</span>
              </div>

              {/* Retail Price Table */}
              <div className="py-3 px-5 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-150 dark:border-zinc-850 rounded-xl flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-zinc-900 dark:text-white">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="ml-2.5 text-sm text-zinc-455 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  ● In Stock (Local Dispatch)
                </span>
              </div>

              {/* ACTION ROW: QUANTITY & ADD TO CART (INSTANTLY BELOW THE PRICE) */}
              <div className="py-4 border-b border-t border-zinc-150 dark:border-zinc-850 flex flex-col sm:flex-row gap-3 items-center">
                
                {/* Quantity selector */}
                <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-1 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
                  <button
                    onClick={handleDecreaseQty}
                    className="w-10 h-10 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-extrabold text-zinc-900 dark:text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    className="w-10 h-10 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Stateful interactive add-to-cart confirmation button */}
                <button
                  onClick={handleAddToCartClick}
                  disabled={addingState === "adding"}
                  className={`w-full text-sm font-black py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider ${
                    addingState === "added"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : addingState === "adding"
                      ? "bg-violet-400 text-white cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-700 text-white active:scale-98"
                  }`}
                >
                  {addingState === "added" ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added Successfully ✓</span>
                    </>
                  ) : addingState === "adding" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart (Rs. {(product.price * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => onToggleFavorite(product)}
                  className={`p-3.5 border rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500"
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Description body */}
              <div className="space-y-1">
                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                  Product Description:
                </span>
                <p className="text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed font-semibold">
                  {product.description}
                </p>
              </div>

              {/* INTERACTIVE COLOR SELECTOR */}
              {specsInfo.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-black text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    Select Color: <span className="text-violet-600 dark:text-violet-400 font-black pl-1">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {specsInfo.colors.map((color) => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => handleColorSelect(color.name, color.img)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center relative cursor-pointer hover:scale-110 active:scale-95 transition-all ring-offset-2 dark:ring-offset-zinc-900 ${
                            isSelected ? "ring-2 ring-violet-600" : "border border-zinc-300 dark:border-zinc-700"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {isSelected && (
                            <Check
                              className={`w-4 h-4 ${
                                color.hex === "#F9FAFB" ? "text-black" : "text-white"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SIZE OPTIONS SELECTOR */}
              {specsInfo.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-black text-zinc-550 dark:text-zinc-400 uppercase tracking-wider">
                    Select Size/Variant: <span className="text-violet-600 dark:text-violet-400 font-black pl-1">{selectedSize}</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {specsInfo.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-violet-600 text-white border-violet-600 shadow"
                              : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Guarantees rail info */}
            <div className="grid grid-cols-3 gap-3 border-t border-zinc-150 dark:border-zinc-850 pt-4 text-[10px] text-zinc-450 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 justify-center">
                <Truck className="w-4 h-4 text-violet-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <RotateCw className="w-4 h-4 text-violet-600" />
                <span>7 Days Return</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-4 h-4 text-violet-600" />
                <span>100% Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL SPECIFICATIONS CARD */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-2">
          <ShieldCheck className="w-4 h-4 text-violet-600" />
          <span>Product Specifications</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {specsInfo.specs.map((spec, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-850 text-xs font-semibold">
              <span className="text-zinc-450">{spec.name}</span>
              <span className="text-zinc-800 dark:text-zinc-250 text-right font-bold">{spec.value}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-850 text-xs font-semibold">
            <span className="text-zinc-450">Delivery Warranty</span>
            <span className="text-zinc-800 dark:text-zinc-250 font-bold">7-Day Local Replacement Claim</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-850 text-xs font-semibold">
            <span className="text-zinc-450">Secure checkout</span>
            <span className="text-violet-600 dark:text-violet-400 font-extrabold">Standard Cash On Delivery (COD)</span>
          </div>
        </div>
      </div>

      {/* 4. VERIFIED CUSTOMER REVIEWS */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-850 pb-3">
          <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-violet-600" />
            <span>Verified Customer Feedback</span>
          </h3>
          <span className="text-xs bg-emerald-100 text-emerald-800 py-1 px-2.5 rounded-md font-bold">
            98.7% Satisfaction Rate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Sajid Khan", rating: 5, date: "June 24, 2026", comment: "Outstanding premium quality! Highly recommend ShopVista for quick and secure Cash on Delivery orders in Karachi. Parcel was neatly packed." },
            { name: "Ayesha Bibi", rating: 5, date: "June 18, 2026", comment: "Love the custom colors! The color selection actually works and matches exactly. Packing was perfect and shipping took only 2 days to Lahore!" },
            { name: "Bilal Sheikh", rating: 4, date: "May 29, 2026", comment: "Item works flawlessly as described. The specification description is perfectly accurate. Will buy again from this vendor." },
            { name: "Fatima Shah", rating: 5, date: "May 12, 2026", comment: "Best e-commerce store in Pakistan. Clean interface, responsive layout, and very safe Cash on Delivery service!" }
          ].map((rev, idx) => (
            <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-150 dark:border-zinc-850 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200">{rev.name}</span>
                <span className="text-[10px] text-zinc-400 font-bold">{rev.date}</span>
              </div>
              <div className="flex">{renderStars(rev.rating)}</div>
              <p className="text-[11px] text-zinc-650 dark:text-zinc-450 leading-relaxed font-semibold">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SUGGESTED / RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pl-1">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">You May Also Like</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={false}
                onToggleFavorite={() => onToggleFavorite(p)}
                onAddToCart={(prod) => onAddToCart(prod, 1, "Standard")}
                onClickProduct={() => onClickProduct(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
