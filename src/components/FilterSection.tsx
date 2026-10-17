import React from "react";
import { Filter, SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import { BRANDS } from "../data";

interface FilterSectionProps {
  selectedBrand: string | null;
  onSelectBrand: (brand: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedDiscount: number; // minimum discount percentage
  onSelectDiscount: (discount: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
}

export default function FilterSection({
  selectedBrand,
  onSelectBrand,
  priceRange,
  onPriceRangeChange,
  selectedDiscount,
  onSelectDiscount,
  sortBy,
  onSortChange,
  onResetFilters,
}: FilterSectionProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-100">
          <SlidersHorizontal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span>Advanced Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 transition-colors cursor-pointer font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Sort Products
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all"
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>

        {/* Filter by Brand */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Filter by Brand
          </label>
          <select
            value={selectedBrand || ""}
            onChange={(e) => onSelectBrand(e.target.value || null)}
            className="w-full text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 py-2 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all"
          >
            <option value="">All Brands</option>
            {BRANDS.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Max Price: Rs. {priceRange[1].toLocaleString()}
            </label>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-zinc-400">Rs. 0</span>
            <input
              type="range"
              min="0"
              max="500000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <span className="text-xs text-zinc-400">500k+</span>
          </div>
        </div>

        {/* Discount Minimum */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Minimum Discount Off
          </label>
          <div className="flex gap-2">
            {[0, 15, 30, 50].map((disc) => (
              <button
                key={disc}
                onClick={() => onSelectDiscount(disc)}
                className={`flex-1 py-1 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedDiscount === disc
                    ? "bg-violet-600 text-white shadow-xs"
                    : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {disc === 0 ? "Any" : `${disc}%+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
