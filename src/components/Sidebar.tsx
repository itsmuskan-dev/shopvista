import React from "react";
import {
  Tv,
  Shirt,
  Sparkles,
  Home,
  Watch,
  Footprints,
  ShoppingBag,
  Gamepad,
  ToyBrick,
  BookOpen,
  Dumbbell,
  Car,
  ChevronRight,
  X,
  Sparkle,
  Star,
  MapPin,
  Compass
} from "lucide-react";
import { CATEGORIES } from "../data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onNavigate?: (action: string) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Tv,
  Shirt,
  Sparkles,
  Home,
  Watch,
  Footprints,
  ShoppingBag,
  Gamepad,
  ToyBrick,
  BookOpen,
  Dumbbell,
  Car,
};

export default function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  onNavigate,
}: SidebarProps) {
  return (
    <>
      {/* Dark overlay with fade-in effect */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer Container */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white dark:bg-zinc-900 z-50 shadow-2xl border-r border-zinc-150 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between bg-violet-50/50 dark:bg-zinc-850/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-600 text-white font-bold text-lg leading-none">SV</span>
            <span className="font-bold text-zinc-900 dark:text-white text-lg">Shop Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Close categories menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
          {/* MOBILE-ONLY QUICK NAVIGATION MENU */}
          <div className="block md:hidden space-y-2">
            <h4 className="text-[10px] font-black text-zinc-450 dark:text-zinc-550 uppercase tracking-widest pl-1 mb-2">
              Navigation
            </h4>
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate("track-order");
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
              >
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Track My Order</span>
              </button>
            </div>
          </div>

          {/* CATEGORIES SECTION */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-zinc-450 dark:text-zinc-550 uppercase tracking-widest pl-1 mb-2">
              Browse Categories
            </h4>
            <div className="space-y-1">
              {/* Option for "All Products" */}
              <button
                onClick={() => {
                  onSelectCategory(null);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === null
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span>All Categories</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              {/* Individual categories */}
              {CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon] || Tv;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`} />
                      <span>{cat.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info footer inside sidebar */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-850">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center font-bold">
            Free shipping on orders above Rs. 5000
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-0.5 font-semibold">
            24/7 Support: 111-222-333
          </p>
        </div>
      </div>
    </>
  );
}
