import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingCart,
  Moon,
  Sun,
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
  ArrowRight,
  ArrowLeft,
  Sparkle,
  Star,
  Check,
  ChevronLeft,
  X,
  Clock,
  PhoneCall,
  RotateCw,
  Gift,
  ShieldCheck,
  Truck,
  Info,
  MapPin
} from "lucide-react";
import { PRODUCTS, REVIEWS, BRANDS } from "./data";
import { Product, CartItem, User as UserType, Order } from "./types";
import Sidebar from "./components/Sidebar";
import FilterSection from "./components/FilterSection";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import AuthModal from "./components/AuthModal";
import ProductDetail from "./components/ProductDetail";
import OrderHistory from "./components/OrderHistory";
import InfoModal from "./components/InfoModal";

// Helper map for visual circles category cards (Sleek real-world e-commerce styling)
const catCircleMap: Record<string, { bg: string; icon: React.ComponentType<any> }> = {
  electronics: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Tv },
  fashion: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Shirt },
  beauty: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Sparkles },
  "home-living": { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Home },
  watches: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Watch },
  shoes: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Footprints },
  bags: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: ShoppingBag },
  gaming: { bg: "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-150 dark:border-zinc-800", icon: Gamepad }
};

export default function App() {
  // Authentication & Persistent State
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem("sv_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("sv_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("sv_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Dark/Light Mode state (defaults to light as in the uploaded image)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("sv_theme");
    return saved === "dark";
  });

  // Announcement scroll text
  const announcements = [
    "⚡ MEGA SUMMER SALE: Up to 50% Off across all categories! Limited time only.",
    "🚚 FREE delivery on all orders above Rs. 5000 in Pakistan!",
    "📞 24/7 Dedicated Customer Support. Help Center is live now."
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  // Search & Filter criteria
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Drawer & Modal triggers
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Product Detail Modal state
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Bottom right non-intrusive toast state
  const [toast, setToast] = useState<{ id: string; product: Product; quantity: number } | null>(null);

  // Track if cart has been opened once
  const [cartOpenedOnce, setCartOpenedOnce] = useState<boolean>(() => {
    return localStorage.getItem("sv_cart_opened_once") === "true";
  });

  // Track if search input is focused
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Flash Sale Countdown (Realistic active ticks)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 30, seconds: 45 });

  // Subscription email input
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Subscription status
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem("sv_subscribed") === "true";
  });

  // Pagination page state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mobile layout columns state (1 or 2)
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(1);

  // Testimonials slide index
  const [reviewIndex, setReviewIndex] = useState<number>(0);

  // Orders State & Current View Section State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("sv_orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSection, setCurrentSection] = useState<"shop" | "orders">("shop");

  // Info Modal state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState<"help" | "shipping" | "returns" | "about" | "outlets" | "contact" | "privacy" | "careers" | "blog" | "track-info">("help");

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("sv_subscribed", isSubscribed ? "true" : "false");
  }, [isSubscribed]);

  // Reset pagination page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedBrand, priceRange, selectedDiscount, sortBy]);

  useEffect(() => {
    localStorage.setItem("sv_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sv_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("sv_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Smooth scroll to products list top when page changes (skip initial render)
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const element = document.getElementById("products-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("sv_theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Rotate announcement bar every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss bottom right notification toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Flash sale countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Guard Actions requiring authentication
  const checkAuth = (): boolean => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return false;
    }
    return true;
  };

  // Add to Cart
  const handleAddToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    if (!checkAuth()) return; // Stop and display login modal if not logged in

    // Build product descriptor or custom variant if needed
    const customProduct = {
      ...product,
      name: (selectedColor || selectedSize)
        ? `${product.name} (${[selectedColor, selectedSize].filter(Boolean).join(" / ")})`
        : product.name,
    };

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id && item.product.name === customProduct.name);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.product.name === customProduct.name ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { product: customProduct, quantity, selectedColor, selectedSize }];
    });

    // Always trigger elegant non-intrusive bottom-right toast
    setToast({
      id: Math.random().toString(),
      product: customProduct,
      quantity,
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove item from Cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Clear Cart after checkout success
  const handleClearCart = () => {
    setCart([]);
  };

  // Order state actions
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentSection("orders"); // Focus the orders tracking page immediately!
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Received"
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleClearAllOrders = () => {
    setOrders([]);
    localStorage.removeItem("sv_orders");
  };

  // Toggle Favorite Wishlist
  const handleToggleFavorite = (product: Product) => {
    if (!checkAuth()) return; // Stop and display login modal if not logged in

    setFavorites((prevFavs) => {
      const exists = prevFavs.find((p) => p.id === product.id);
      if (exists) {
        return prevFavs.filter((p) => p.id !== product.id);
      }
      return [...prevFavs, product];
    });
  };

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter((prod) => {
    // 1. Search Query
    const matchesSearch =
      searchQuery === "" ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category selection
    const matchesCategory = !selectedCategory || prod.category === selectedCategory;

    // 3. Brand selection
    const matchesBrand = !selectedBrand || prod.brand === selectedBrand;

    // 4. Price range
    const matchesPrice = prod.price <= priceRange[1];

    // 5. Discount off
    const matchesDiscount = prod.discountPercent >= selectedDiscount;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesDiscount;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "discount") return b.discountPercent - a.discountPercent;
    return 0; // Default Featured
  });

  const trendingProducts = sortedProducts.filter((p) => p.isTrending);
  const flashSaleProducts = PRODUCTS.filter((p) => p.isFlashSale);
  const bestSellerProducts = sortedProducts.filter((p) => p.isBestSeller);
  const newArrivalProducts = sortedProducts.filter((p) => p.isNewArrival);

  // Cart values calculation
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const resetAllFilters = () => {
    setSelectedBrand(null);
    setPriceRange([0, 500000]);
    setSelectedDiscount(0);
    setSortBy("featured");
    setSearchQuery("");
    setSearchInputValue("");
    setSelectedCategory(null);
  };

  const handleNavigation = (action: string) => {
    setSelectedDetailProduct(null);
    setIsDetailModalOpen(false);

    if (action === "home") {
      resetAllFilters();
      setCurrentSection("shop");
    } else if (action === "shop") {
      setSearchQuery("");
      setSelectedCategory(null);
      setCurrentSection("shop");
    } else if (action === "deals") {
      setSelectedDiscount(30);
      setCurrentSection("shop");
    } else if (action === "top-rated") {
      setSortBy("rating");
      setCurrentSection("shop");
    } else if (action === "track-order") {
      setCurrentSection("orders");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribeSuccess(true);
    setIsSubscribed(true);
    setTimeout(() => {
      setSubscribeSuccess(false);
      setSubscribeEmail("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 flex flex-col font-sans">
      {/* 1. SCROLLING ANNOUNCEMENT BAR */}
      <div className="w-full bg-violet-950 text-white text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5 border-b border-violet-900 overflow-hidden relative">
        <div className="flex items-center gap-2 max-w-full">
          <Truck className="w-4 h-4 text-violet-300 shrink-0 hidden sm:inline" />
          <p className="font-medium animate-fade-in text-center sm:text-left truncate">
            {announcements[announcementIndex]}
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold text-violet-250 shrink-0">
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5" />
            Support: 24/7 (111-222-333)
          </span>
          <a href="#help" className="hover:underline hover:text-white transition-all">
            Help & FAQs
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-150 dark:border-zinc-800 shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => resetAllFilters()}>
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-sans flex items-center">
                Shop<span className="text-violet-600">Vista</span>
              </span>
            </div>

            {/* Icons row for Mobile view */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
              </button>

              <button
                onClick={() => setIsFavoritesOpen(true)}
                className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(searchInputValue);
            }}
            className="w-full md:max-w-xl flex items-center"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products, electronics, watches, brands..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-4 pr-10 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-l-xl border border-zinc-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:border-violet-600 dark:focus:border-violet-400 transition-all"
              />
              {searchInputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInputValue("");
                    setSearchQuery("");
                  }}
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* AUTOCMPLETE / SEARCH SUGGESTIONS DROPDOWN */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-4 max-h-[350px] overflow-y-auto">
                  <div className="space-y-4">
                    {/* Dynamic matching suggestions when typing */}
                    {searchInputValue.trim() !== "" ? (
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1 mb-2">
                          Matching Products ({PRODUCTS.filter(p =>
                            p.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
                            p.brand.toLowerCase().includes(searchInputValue.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchInputValue.toLowerCase())
                          ).length})
                        </h4>
                        {(() => {
                          const matches = PRODUCTS.filter(p =>
                            p.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
                            p.brand.toLowerCase().includes(searchInputValue.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchInputValue.toLowerCase())
                          ).slice(0, 5);

                          if (matches.length === 0) {
                            return <p className="text-xs text-zinc-400 pl-1 py-1 font-semibold">No matching products found. Try "watch" or "shoes".</p>;
                          }

                          return (
                            <div className="space-y-1.5">
                              {matches.map((prod) => (
                                <button
                                  key={prod.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDetailProduct(prod);
                                    setIsDetailModalOpen(true);
                                    setIsSearchFocused(false);
                                  }}
                                  className="w-full flex items-center gap-3 p-2 hover:bg-violet-50 dark:hover:bg-zinc-800 text-left rounded-lg transition-colors cursor-pointer group"
                                >
                                  <img
                                    src={prod.imageUrl}
                                    alt={prod.name}
                                    className="w-9 h-9 rounded-md bg-zinc-50 dark:bg-zinc-950 p-1 object-contain border border-zinc-150 dark:border-zinc-800 group-hover:scale-105 transition-transform shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-zinc-800 dark:text-zinc-150 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                      {prod.name}
                                    </p>
                                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">
                                      {prod.brand} • <span className="font-extrabold text-violet-600 dark:text-violet-400">Rs. {prod.price.toLocaleString()}</span>
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1 mb-2">
                            Suggested Keywords
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {["watch", "casual shirt", "iphone", "nike shoes", "handbag", "airpods", "headphones", "makeup", "gaming gear"].map((keyword) => (
                              <button
                                key={keyword}
                                type="button"
                                onClick={() => {
                                  setSearchInputValue(keyword);
                                  setSearchQuery(keyword);
                                  setIsSearchFocused(false);
                                  document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="bg-zinc-50 hover:bg-violet-50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                              >
                                {keyword}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1 mb-2">
                            Quick Departments
                          </h4>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            {[
                              { name: "Electronics", id: "electronics" },
                              { name: "Fashion & Clothes", id: "fashion" },
                              { name: "Luxury Watches", id: "watches" },
                              { name: "Shoes & Footwear", id: "shoes" },
                              { name: "Bags & Purses", id: "bags" },
                              { name: "Beauty & Makeup", id: "beauty" },
                            ].map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setSearchQuery("");
                                  setSearchInputValue("");
                                  setIsSearchFocused(false);
                                  document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="w-full text-left p-1.5 hover:bg-violet-50 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400 font-bold text-zinc-700 dark:text-zinc-350 rounded-md transition-colors"
                              >
                                📁 {category.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-bold py-[11px] px-6 rounded-r-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 self-stretch"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline text-xs font-black tracking-wide uppercase">Search</span>
            </button>
          </form>

          {/* Desktop actions and profile info */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-400"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
            </button>

            {/* Profile trigger */}
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-zinc-100/80 dark:bg-zinc-800/80 py-1.5 pl-3 pr-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
                <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {currentUser.name[0].toUpperCase()}
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[100px]">
                    {currentUser.name}
                  </p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("sv_current_user");
                      setCurrentUser(null);
                      setCart([]);
                    }}
                    className="text-[10px] text-zinc-400 hover:text-red-500 font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 py-2 px-4 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-semibold transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700"
              >
                <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Favorites Icon */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-100 dark:border-zinc-800"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Box */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black border border-white">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-none">
                <span className="block text-[10px] text-violet-200 uppercase font-bold tracking-wider">My Cart</span>
                <span className="text-xs font-black">Rs. {totalCartCost.toLocaleString()}</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 3. SUB-HEADER BAR */}
      <nav className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-900 py-2">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap gap-4">
          <div className="flex items-center gap-6">
            {/* Sidebar toggle button - Menu Icon Only */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center bg-violet-600 text-white hover:bg-violet-700 p-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
              title="Browse Categories"
              aria-label="Open categories menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Menu Links - Hidden on Mobile, Shown on Tablet/Desktop */}
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-zinc-600 dark:text-zinc-350">
              <a href="#brands-section" onClick={() => handleNavigation("shop")} className="hover:text-violet-600 transition-colors">
                Brands
              </a>
              <button
                onClick={() => handleNavigation("track-order")}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  currentSection === "orders" ? "text-violet-600 font-extrabold" : "hover:text-violet-600"
                }`}
              >
                Track Order
                {orders.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
                )}
              </button>
            </div>
          </div>

          <div className="text-xs font-extrabold text-violet-600 dark:text-violet-400 animate-pulse">
            🚚 FREE SHIPPING ABOVE RS. 5000!
          </div>
        </div>
      </nav>

      {/* 4. MAIN CONTENT AREA */}
      <main className="w-full max-w-7xl mx-auto px-4 py-6 flex-1 space-y-8">
        {currentSection === "orders" ? (
          <OrderHistory
            orders={orders}
            onBackToShop={() => setCurrentSection("shop")}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onClearAllOrders={handleClearAllOrders}
          />
        ) : (
          <>
            {/* HERO MEGA SALE BANNER SLIDESHOW */}
        {selectedCategory === null && searchQuery === "" && (
          <section className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-zinc-900 dark:to-indigo-950/40 rounded-2xl overflow-hidden border border-violet-100 dark:border-zinc-800 shadow-sm relative p-6 sm:p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-4">
                <span className="text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-widest bg-violet-100 dark:bg-violet-900/30 py-1 px-3 rounded-full">
                  Summer Collection 2024
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-none font-sans">
                  MEGA SALE <br />
                  UP TO <span className="text-violet-600">50% OFF</span>
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
                  Shop the latest trends in high-end electronics, elite fashion designer clothing, cosmetics, beauty health, watches and home essentials.
                </p>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => {
                      setSelectedDiscount(25);
                      document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("electronics");
                    }}
                    className="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 font-bold text-sm py-3 px-6 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Explore Deals
                  </button>
                </div>
              </div>

              {/* Banner Right Image & Overlays */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-violet-600/10 rounded-full blur-2xl animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
                  alt="Summer Mega Sale"
                  className="w-full max-w-sm rounded-2xl shadow-xl object-cover aspect-[4/3] border-4 border-white dark:border-zinc-800"
                  referrerPolicy="no-referrer"
                />

                {/* Free shipping floating bubble */}
                <div className="absolute top-4 right-2 bg-white dark:bg-zinc-800 border border-violet-100 dark:border-zinc-700 p-3 rounded-xl shadow-lg text-left hidden sm:flex items-center gap-2 animate-bounce">
                  <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-zinc-900 text-violet-600">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase leading-none">Free Shipping</p>
                    <p className="text-xs font-black text-zinc-800 dark:text-white mt-0.5">On orders above Rs. 5000</p>
                  </div>
                </div>

                {/* 7 Days Easy returns floating bubble */}
                <div className="absolute bottom-4 left-2 bg-white dark:bg-zinc-800 border border-violet-100 dark:border-zinc-700 p-3 rounded-xl shadow-lg text-left hidden sm:flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-pink-50 dark:bg-zinc-900 text-pink-600">
                    <RotateCw className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase leading-none">7 Days Return</p>
                    <p className="text-xs font-black text-zinc-800 dark:text-white mt-0.5">Easy & fast refund</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core guarantees row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 shadow-xs flex items-center justify-center text-violet-600 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-white">Free Shipping</h4>
                  <p className="text-[10px] text-zinc-400">On orders above Rs. 5000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 shadow-xs flex items-center justify-center text-pink-600 shrink-0">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-white">7 Days Returns</h4>
                  <p className="text-[10px] text-zinc-400">Easy returns & refunds</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 shadow-xs flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-white">100% Secure</h4>
                  <p className="text-[10px] text-zinc-400">Secure payments guarantee</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 shadow-xs flex items-center justify-center text-indigo-600 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-850 dark:text-white">24/7 Support</h4>
                  <p className="text-[10px] text-zinc-400">Dedicated support line</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FLASH SALE LIVE COUNTDOWN SECTION */}
        {selectedCategory === null && searchQuery === "" && (
          <section className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-zinc-900 dark:to-red-950/20 border border-red-100 dark:border-zinc-800 p-6 rounded-2xl space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-1.5">
                    Flash Sale
                  </h2>
                  <p className="text-xs text-zinc-450 dark:text-zinc-400">Limited time offers, grab now!</p>
                </div>
              </div>

              {/* COUNTDOWN TILES */}
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-xs border border-red-100 dark:border-zinc-700">
                <div className="text-center px-2.5">
                  <span className="block text-sm font-black text-red-500">{timeLeft.hours.toString().padStart(2, "0")}</span>
                  <span className="text-[9px] text-zinc-450 uppercase font-bold">Hours</span>
                </div>
                <span className="text-red-500 font-bold">:</span>
                <div className="text-center px-2.5">
                  <span className="block text-sm font-black text-red-500">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                  <span className="text-[9px] text-zinc-450 uppercase font-bold">Mins</span>
                </div>
                <span className="text-red-500 font-bold">:</span>
                <div className="text-center px-2.5">
                  <span className="block text-sm font-black text-red-500">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                  <span className="text-[9px] text-zinc-450 uppercase font-bold">Secs</span>
                </div>
              </div>
            </div>

            {/* Flash Sale Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {flashSaleProducts.slice(0, 5).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedDetailProduct(prod);
                    setIsDetailModalOpen(true);
                  }}
                  className="bg-white dark:bg-zinc-900 border border-red-100 dark:border-zinc-800 rounded-xl overflow-hidden p-3 shadow-xs relative flex flex-col justify-between group cursor-pointer hover:border-red-400 transition-all"
                >
                  <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-black py-0.5 px-2 rounded-md z-10">
                    -{prod.discountPercent}%
                  </span>
                  
                  {/* Image stage */}
                  <div className="aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 truncate group-hover:text-red-500 transition-colors">{prod.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-xs font-extrabold text-red-500">Rs. {prod.price.toLocaleString()}</span>
                      <span className="text-[10px] text-zinc-400 line-through">Rs. {prod.originalPrice.toLocaleString()}</span>
                    </div>

                    <div className="w-full text-center bg-zinc-100 hover:bg-violet-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-violet-700 text-zinc-700 dark:text-zinc-200 font-bold text-[11px] py-1.5 px-2 rounded-lg mt-3 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEARCH, CATEGORY FILTER AND DYNAMIC SEARCH GRID */}
        <section id="products-grid" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-zinc-200 dark:border-zinc-850 pb-3">
            <div className="flex flex-wrap items-center gap-3">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}
              <div>
                <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                  {selectedCategory
                    ? `${selectedCategory.toUpperCase().replace("-", " ")} Collection`
                    : searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : "Trending Products"}
                </h2>
                <p className="text-xs text-zinc-450 dark:text-zinc-400">
                  Found {sortedProducts.length} high-fidelity items based on your filters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              {/* Mobile Columns Layout Selector */}
              <div className="flex sm:hidden items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setMobileColumns(1)}
                  className={`py-1 px-2.5 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    mobileColumns === 1
                      ? "bg-violet-600 text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800"
                  }`}
                >
                  1 Col
                </button>
                <button
                  onClick={() => setMobileColumns(2)}
                  className={`py-1 px-2.5 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    mobileColumns === 2
                      ? "bg-violet-600 text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800"
                  }`}
                >
                  2 Col
                </button>
              </div>

              <button
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  isFilterExpanded
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                }`}
              >
                <span>{isFilterExpanded ? "Hide Filters" : "Show Filters"}</span>
              </button>

              {(selectedCategory !== null || searchQuery !== "" || selectedBrand !== null || selectedDiscount > 0) && (
                <button
                  onClick={() => resetAllFilters()}
                  className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Advanced Filters Section */}
          {isFilterExpanded && (
            <FilterSection
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedDiscount={selectedDiscount}
              onSelectDiscount={setSelectedDiscount}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={resetAllFilters}
            />
          )}

          {/* Dynamic Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 p-12 text-center rounded-2xl border border-zinc-150 dark:border-zinc-800">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-250">No products found</h3>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-1 max-w-sm mx-auto">
                We couldn't match your criteria. Try resetting filters, search queries, or expanding price ranges to view more items.
              </p>
              <button
                onClick={() => resetAllFilters()}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold py-2 px-4 rounded-lg mt-4 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (() => {
            const itemsPerPage = 54;
            const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
            const activePage = Math.min(Math.max(1, currentPage), totalPages || 1);
            const paginatedProducts = sortedProducts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

            return (
              <div className="space-y-6">
                <div className={`grid gap-5 ${mobileColumns === 1 ? "grid-cols-1" : "grid-cols-2"} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`}>
                  {paginatedProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      isFavorite={favorites.some((p) => p.id === prod.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                      onClickProduct={(p) => {
                        setSelectedDetailProduct(p);
                        setIsDetailModalOpen(true);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-zinc-150 dark:border-zinc-800">
                    <span className="text-xs text-zinc-550 dark:text-zinc-400 font-medium">
                      Showing <span className="font-bold">{(activePage - 1) * itemsPerPage + 1}</span> to{" "}
                      <span className="font-bold">{Math.min(activePage * itemsPerPage, sortedProducts.length)}</span> of{" "}
                      <span className="font-bold">{sortedProducts.length}</span> items
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={activePage === 1}
                        className="flex items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer text-xs font-bold gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                      </button>

                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - activePage) <= 1) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                                activePage === pageNum
                                  ? "bg-violet-600 text-white shadow-xs"
                                  : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (pageNum === 2 || pageNum === totalPages - 1) {
                          return <span key={pageNum} className="text-zinc-400 dark:text-zinc-600 text-xs px-1">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={activePage === totalPages}
                        className="flex items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer text-xs font-bold gap-1"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* DOUBLE COLUMN: BEST SELLERS & NEW ARRIVALS */}
        {selectedCategory === null && searchQuery === "" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Best Sellers */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    🔥 Best Sellers
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                    setSearchInputValue("");
                    setSortBy("rating");
                    setIsFilterExpanded(true);
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 cursor-pointer hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bestSellerProducts.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedDetailProduct(prod);
                      setIsDetailModalOpen(true);
                    }}
                    className="flex gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-850 items-center group cursor-pointer hover:border-violet-300 dark:hover:border-violet-800 transition-all"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-16 h-16 rounded-lg object-contain bg-white dark:bg-zinc-900 p-1 border border-zinc-100 dark:border-zinc-850 flex-shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold mt-0.5">Rating: ⭐ {prod.rating}</p>
                      <p className="text-xs font-black text-zinc-900 dark:text-white mt-1">Rs. {prod.price.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-100 hover:bg-violet-600 dark:bg-zinc-800 dark:hover:bg-violet-700 text-zinc-500 hover:text-white shrink-0 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Arrivals */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    ✨ New Arrivals
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                    setSearchInputValue("");
                    setSortBy("featured");
                    setIsFilterExpanded(true);
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 cursor-pointer hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newArrivalProducts.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedDetailProduct(prod);
                      setIsDetailModalOpen(true);
                    }}
                    className="flex gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-850 items-center group cursor-pointer hover:border-violet-300 dark:hover:border-violet-800 transition-all"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-16 h-16 rounded-lg object-contain bg-white dark:bg-zinc-900 p-1 border border-zinc-100 dark:border-zinc-850 flex-shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold mt-0.5 uppercase tracking-wide text-violet-600">New</p>
                      <p className="text-xs font-black text-zinc-900 dark:text-white mt-1">Rs. {prod.price.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-100 hover:bg-violet-600 dark:bg-zinc-800 dark:hover:bg-violet-700 text-zinc-500 hover:text-white shrink-0 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEWS CAROUSEL ("What Our Customers Say") */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl space-y-6 relative overflow-hidden">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">What Our Customers Say</h2>
            <p className="text-xs text-zinc-450 dark:text-zinc-400">
              Read honest reviews from real shoppers around the country
            </p>
          </div>

          {/* Carousel Viewport Container */}
          <div className="relative px-2 sm:px-10">
            {/* Carousel track containing sliding grid subset */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-500">
              {/* Card 1 */}
              <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col justify-between h-full min-h-[160px] shadow-xs">
                <div className="space-y-2.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-650 dark:text-zinc-400 italic leading-relaxed">
                    "{REVIEWS[reviewIndex].comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <img
                    src={REVIEWS[reviewIndex].avatarUrl}
                    alt={REVIEWS[reviewIndex].userName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-zinc-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-250">{REVIEWS[reviewIndex].userName}</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold">{REVIEWS[reviewIndex].location}, PK</p>
                  </div>
                </div>
              </div>

              {/* Card 2 (Visible on md and up) */}
              <div className="hidden md:flex bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-100 dark:border-zinc-850 flex-col justify-between h-full min-h-[160px] shadow-xs">
                {(() => {
                  const item = REVIEWS[(reviewIndex + 1) % REVIEWS.length];
                  return (
                    <>
                      <div className="space-y-2.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-zinc-650 dark:text-zinc-400 italic leading-relaxed">
                          "{item.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <img
                          src={item.avatarUrl}
                          alt={item.userName}
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-250">{item.userName}</h4>
                          <p className="text-[10px] text-zinc-400 font-semibold">{item.location}, PK</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Card 3 (Visible on lg and up) */}
              <div className="hidden lg:flex bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-100 dark:border-zinc-850 flex-col justify-between h-full min-h-[160px] shadow-xs">
                {(() => {
                  const item = REVIEWS[(reviewIndex + 2) % REVIEWS.length];
                  return (
                    <>
                      <div className="space-y-2.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-zinc-650 dark:text-zinc-400 italic leading-relaxed">
                          "{item.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <img
                          src={item.avatarUrl}
                          alt={item.userName}
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-250">{item.userName}</h4>
                          <p className="text-[10px] text-zinc-400 font-semibold">{item.location}, PK</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Left Prev Arrow Button */}
            <button
              onClick={() => setReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-md border border-zinc-150 dark:border-zinc-700 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-zinc-750 transition-all cursor-pointer z-10"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Next Arrow Button */}
            <button
              onClick={() => setReviewIndex((prev) => (prev + 1) % REVIEWS.length)}
              className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-md border border-zinc-150 dark:border-zinc-700 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-zinc-750 transition-all cursor-pointer z-10"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 pt-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setReviewIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  reviewIndex === idx ? "w-6 bg-violet-600" : "w-2 bg-zinc-250 dark:bg-zinc-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* TOP BRANDS GRID / CAROUSEL WITH INFINITE AUTOSCROLL MARQUEE */}
        <section id="brands-section" className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl space-y-4 overflow-hidden">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-base font-extrabold text-zinc-900 dark:text-white">Shop by Top Brands</h2>
              <p className="text-[11px] text-zinc-450 dark:text-zinc-400">Hover to pause • Tap any brand logo to filter their official products</p>
            </div>
            <button
              onClick={() => {
                setSelectedBrand(null);
                document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 cursor-pointer hover:underline"
            >
              View All Brands
            </button>
          </div>

          {/* Keyframe Styling self-contained */}
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-brands-marquee {
              display: flex;
              width: max-content;
              animation: marquee 35s linear infinite;
            }
            .animate-brands-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative w-full overflow-hidden py-2 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-zinc-100 dark:border-zinc-850">
            <div className="animate-brands-marquee flex items-center gap-6 py-2">
              {/* First Cycle */}
              {BRANDS.map((brand) => (
                <button
                  key={brand.name + "-cycle1"}
                  onClick={() => {
                    setSelectedBrand(brand.name);
                    setIsFilterExpanded(true);
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-3 px-5 rounded-xl border flex items-center gap-2.5 transition-all hover:scale-105 hover:border-violet-400 cursor-pointer text-center shrink-0 ${
                    selectedBrand === brand.name
                      ? "border-violet-600 bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 font-extrabold"
                      : "border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 shadow-xs"
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-5 object-contain filter dark:invert"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-black">{brand.name}</span>
                </button>
              ))}

              {/* Duplicate Cycle for Seamless Looping */}
              {BRANDS.map((brand) => (
                <button
                  key={brand.name + "-cycle2"}
                  onClick={() => {
                    setSelectedBrand(brand.name);
                    setIsFilterExpanded(true);
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-3 px-5 rounded-xl border flex items-center gap-2.5 transition-all hover:scale-105 hover:border-violet-400 cursor-pointer text-center shrink-0 ${
                    selectedBrand === brand.name
                      ? "border-violet-600 bg-violet-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 font-extrabold"
                      : "border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 shadow-xs"
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-5 object-contain filter dark:invert"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-black">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE BAR */}
        <section className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="space-y-1.5 text-center lg:text-left max-w-md relative z-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-sans">
              Get Latest Deals & Offers
            </h2>
            <p className="text-xs text-violet-100 leading-relaxed">
              Subscribe to our weekly newsleter and get exclusive discount coupons, drops, and shopping guides delivered straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
            {subscribeSuccess ? (
              <div className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-center text-xs font-bold animate-fade-in flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-300" />
                <span>Subscribed! Check your inbox for a 10% OFF Welcome Code!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-violet-200 text-xs px-4 py-2.5 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-white/30 text-center sm:text-left"
                />
                <button
                  type="submit"
                  className="bg-white text-violet-700 hover:bg-violet-50 font-black text-xs py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </section>
          </>
        )}
      </main>

      {/* 5. FULL RESPONSIVE FOOTER */}
      <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-400 text-xs pt-12 pb-6 border-t border-zinc-800 mt-12">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SV
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Shop<span className="text-violet-500">Vista</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Your premium, one-stop destination for authentic electronics, clothing apparel, cosmetics, bags, gaming gear and home accessories. Order today and get delivery straight to your doorstep across Pakistan.
            </p>
            <div className="text-[11px] font-bold text-violet-400">
              © 2026 ShopVista PK Inc. All rights reserved.
            </div>
          </div>

          {/* Col 2: Customer Service */}
          <div className="space-y-3.5">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">Customer Service</h4>
            <ul className="space-y-2 text-zinc-450 flex flex-col items-start">
              <li>
                <button
                  onClick={() => { setInfoModalTab("help"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Help Center & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentSection("orders"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Track Your Order</span>
                  {orders.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("shipping"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Shipping & Delivery Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("returns"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  7-Day Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("contact"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Contact Support Helpline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company Links */}
          <div className="space-y-3.5">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">Company</h4>
            <ul className="space-y-2 text-zinc-450 flex flex-col items-start">
              <li>
                <button
                  onClick={() => { setInfoModalTab("about"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  About ShopVista
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("careers"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Careers & Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("outlets"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Our Physical Outlets
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("blog"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  News & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setInfoModalTab("privacy"); setIsInfoModalOpen(true); }}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Secure Payments */}
          <div className="space-y-3.5">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">Secure Payments</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We process high-grade encrypted transactions safely. Accept Cash On Delivery, Bank Transfers, EasyPaisa, and JazzCash.
            </p>
            <div className="flex gap-2 flex-wrap pt-2">
              <span className="bg-zinc-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-zinc-700">
                VISA
              </span>
              <span className="bg-zinc-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-zinc-700">
                MasterCard
              </span>
              <span className="bg-zinc-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-zinc-700">
                EasyPaisa
              </span>
              <span className="bg-zinc-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-zinc-700">
                COD
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* DRAWERS AND MODALS */}
      
      {/* 1. Sidebar Categories Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigate={handleNavigation}
      />

      {/* 2. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddFreebie={handleAddToCart}
        onPlaceOrder={handlePlaceOrder}
        isSubscribed={isSubscribed}
        onClickProduct={(p) => {
          setSelectedDetailProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      {/* 3. Wishlist Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={(productId) => setFavorites((prev) => prev.filter((p) => p.id !== productId))}
        onAddToCart={handleAddToCart}
        onClickProduct={(p) => {
          setSelectedDetailProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      {/* 4. Auth Modal (Login/Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />

      {/* 5. Help / Info Modal Portal */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        initialTab={infoModalTab}
      />

      {/* 5. Success Add-to-Cart Toast Popup Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-4 flex gap-3 animate-slide-up hover:shadow-3xl transition-all">
          <div className="w-12 h-12 rounded-lg bg-zinc-50 dark:bg-zinc-950 p-1 shrink-0 border border-zinc-150 dark:border-zinc-800 flex items-center justify-center">
            <img
              src={toast.product.imageUrl}
              alt={toast.product.name}
              className="max-h-full max-w-full object-contain rounded"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Added to Cart
              </span>
              <button
                onClick={() => setToast(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate mt-1">
              {toast.product.name}
            </h4>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Qty: <span className="font-extrabold">{toast.quantity}</span> • Rs. {(toast.product.price * toast.quantity).toLocaleString()}
            </p>
            <div className="flex items-center justify-between gap-4 mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-850">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                Cart Total: <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">{cart.reduce((acc, item) => acc + item.quantity, 0)} items</span>
              </span>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setToast(null);
                }}
                className="text-[10px] font-black bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View My Cart</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. IMMERSIVE PRODUCT DETAIL MODAL DIALOG */}
      {selectedDetailProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          {/* Backdrop dismiss click */}
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => {
              setSelectedDetailProduct(null);
              setIsDetailModalOpen(false);
            }} 
          />
          
          <div className="bg-zinc-50 dark:bg-zinc-950 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative border border-zinc-150 dark:border-zinc-800 p-4 sm:p-6 md:p-8 space-y-6 z-10 animate-scale-up">
            {/* Close X Button top-right */}
            <button 
              onClick={() => {
                setSelectedDetailProduct(null);
                setIsDetailModalOpen(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 z-20 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
            
            <ProductDetail
              product={selectedDetailProduct}
              isFavorite={favorites.some((p) => p.id === selectedDetailProduct.id)}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onBack={() => {
                setSelectedDetailProduct(null);
                setIsDetailModalOpen(false);
              }}
              allProducts={PRODUCTS}
              onClickProduct={(p) => setSelectedDetailProduct(p)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
