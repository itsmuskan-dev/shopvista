import React, { useState } from "react";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClickProduct?: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onClickProduct,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  // Render dynamic star rating icons
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 shrink-0 ${
            i <= floorRating
              ? "text-amber-400 fill-amber-400"
              : "text-zinc-300 dark:text-zinc-650 fill-zinc-300 dark:fill-zinc-650"
          }`}
        />
      );
    }
    return stars;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click is inside buttons, do not open detail view
    const target = e.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }
    if (onClickProduct) {
      onClickProduct(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className={`bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-300 flex flex-col group relative ${
        onClickProduct ? "cursor-pointer" : ""
      }`}
    >
      {/* Sale/Discount Badge */}
      {product.discountPercent > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md z-10 shadow-xs">
          -{product.discountPercent}%
        </span>
      )}

      {/* Favorite Heart Button */}
      <button
        id={`product-fav-btn-${product.id}`}
        onClick={() => onToggleFavorite(product)}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-sm text-zinc-400 hover:text-red-500 hover:scale-110 active:scale-90 transition-all z-10 cursor-pointer"
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorite ? "text-red-500 fill-red-500" : "text-zinc-400"
          }`}
        />
      </button>

      {/* Product Image Stage */}
      <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 aspect-square flex items-center justify-center p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Brand & Category info */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase">
              {product.category}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-zinc-850 dark:text-zinc-100 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-[11px] text-zinc-450 dark:text-zinc-500 line-clamp-2 min-h-[32px]">
            {product.description}
          </p>

          {/* Rating Block with Solid (Sold) Items Count */}
          <div className="flex items-center justify-between gap-1 pt-1 flex-wrap">
            <div className="flex items-center gap-1">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                ({product.reviewCount})
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/40 px-1.5 py-0.5 rounded-md">
              {Math.floor(product.reviewCount * 3.4 + 12)} Sold
            </span>
          </div>
        </div>

        {/* Price & Cart CTA Block */}
        <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm font-black text-zinc-900 dark:text-white">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.discountPercent > 0 && (
                <span className="text-[11px] text-zinc-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
