import React from "react";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClickProduct?: (product: Product) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onClickProduct,
}: FavoritesDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] sm:w-[420px] bg-white dark:bg-zinc-900 z-50 shadow-2xl border-l border-zinc-150 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between bg-violet-50/50 dark:bg-zinc-850/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <span className="font-bold text-zinc-900 dark:text-white text-lg font-sans">My Favorites</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Close favorites list"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Favorites List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-400 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300 font-sans">Your wishlist is empty</h3>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-1 max-w-[240px]">
                Browse items and tap the heart icon on any product card to save them here!
              </p>
            </div>
          ) : (
            favorites.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-850 items-start group"
              >
                {/* Product Image */}
                <div
                  onClick={() => {
                    if (onClickProduct) {
                      onClickProduct(product);
                      onClose();
                    }
                  }}
                  className="w-16 h-16 rounded-lg bg-zinc-50 dark:bg-zinc-800 shrink-0 border border-zinc-100 dark:border-zinc-850 cursor-pointer overflow-hidden flex items-center justify-center p-1"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      if (onClickProduct) {
                        onClickProduct(product);
                        onClose();
                      }
                    }}
                    className="text-sm font-bold text-zinc-850 dark:text-zinc-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                    Category: {product.category}
                  </p>
                  <p className="text-xs font-extrabold text-zinc-900 dark:text-white mt-1">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold py-1 px-3 rounded-md transition-all cursor-pointer shadow-xs hover:shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(product.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1 rounded-md cursor-pointer ml-auto"
                      aria-label="Remove item from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Info */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-800">
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
            Your favorites list is saved securely to your device.
          </p>
        </div>
      </div>
    </>
  );
}
