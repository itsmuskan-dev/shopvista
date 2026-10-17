import React, { useState } from "react";
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Gift, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Truck,
  CreditCard
} from "lucide-react";
import { CartItem, Order } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddFreebie?: (product: any) => void;
  onClickProduct?: (product: any) => void;
  onPlaceOrder?: (order: Order) => void;
  isSubscribed?: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddFreebie,
  onClickProduct,
  onPlaceOrder,
  isSubscribed = false,
}: CartDrawerProps) {
  // Step & Form State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Karachi");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [lastPlacedOrder, setLastPlacedOrder] = useState<{
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    grandTotal: number;
    items: CartItem[];
  } | null>(null);

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Newsletter subscription discount (5% off on subtotal)
  const subscriberDiscount = isSubscribed ? Math.round(subtotal * 0.05) : 0;

  // Free shipping on orders above Rs. 5000 (after discount)
  const deliveryCharge = subtotal === 0 ? 0 : (subtotal - subscriberDiscount) >= 5000 ? 0 : 250;
  
  // Total savings
  const baseSavings = cartItems.reduce(
    (acc, item) => acc + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );
  const totalSavings = baseSavings + subscriberDiscount;

  const grandTotal = subtotal - subscriberDiscount + deliveryCharge;

  // Validation & Checkout Handlers
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 12) {
      newErrors.phone = "Please enter a valid Pakistani phone number (10-12 digits)";
    }
    
    // Address validation
    if (!address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (address.trim().length < 10) {
      newErrors.address = "Address must be detailed (at least 10 characters)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll form to top/errors
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    // Simulate real Cash on Delivery dispatch & integration
    setTimeout(() => {
      const generatedOrderId = "SV-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      
      const orderDate = new Date().toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short"
      });

      const newOrderObj: Order = {
        id: generatedOrderId,
        date: orderDate,
        fullName,
        email,
        phone,
        city,
        address,
        items: [...cartItems],
        subtotal,
        deliveryCharge,
        grandTotal,
        status: "Processing"
      };

      // Store checkout detail to render on success page
      setLastPlacedOrder({
        fullName,
        email,
        phone,
        city,
        address,
        grandTotal,
        items: [...cartItems]
      });

      if (onPlaceOrder) {
        onPlaceOrder(newOrderObj);
      }
      
      setIsSubmitting(false);
      setCheckoutSuccess(true);
    }, 1800);
  };

  const handleFinishSuccess = () => {
    onClearCart();
    setCheckoutSuccess(false);
    setIsCheckingOut(false);
    // Reset state
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("Karachi");
    setAddress("");
    setLastPlacedOrder(null);
    onClose();
  };

  const PakistaniCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", 
    "Hyderabad", "Abbottabad", "Sargodha", "Bahawalpur", "Sukkur"
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
          onClick={() => {
            if (!isSubmitting && !checkoutSuccess) onClose();
          }}
        />
      )}

      {/* Cart Container */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] sm:w-[450px] bg-white dark:bg-zinc-900 z-50 shadow-2xl border-l border-zinc-150 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/40 shrink-0">
          <div className="flex items-center gap-2.5">
            {isCheckingOut && !checkoutSuccess ? (
              <button 
                onClick={() => setIsCheckingOut(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer mr-1"
                title="Go back to cart details"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <ShoppingCart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            )}
            <span className="font-extrabold text-zinc-900 dark:text-white text-base">
              {checkoutSuccess ? "Order Receipt" : isCheckingOut ? "Secure Checkout" : "My Shopping Cart"}
            </span>
            {!checkoutSuccess && !isCheckingOut && cartItems.length > 0 && (
              <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full font-black ml-1 animate-pulse">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (!isSubmitting) {
                if (checkoutSuccess) {
                  handleFinishSuccess();
                } else {
                  onClose();
                }
              }
            }}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {checkoutSuccess && lastPlacedOrder ? (
          /* ================= ORDER SUCCESS SCREEN ================= */
          <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
            <div className="p-6 text-center space-y-4 shrink-0 bg-white dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-850">
              <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white font-sans tracking-tight">Order Placed Successfully!</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold mt-1 uppercase tracking-wider">Cash On Delivery Confirmed</p>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-xl max-w-sm mx-auto text-left space-y-1">
                <p className="text-[11px] text-zinc-500 font-bold flex justify-between">
                  <span>Order Number:</span>
                  <span className="text-zinc-900 dark:text-white font-black">{orderId}</span>
                </p>
                <p className="text-[11px] text-zinc-500 font-bold flex justify-between">
                  <span>Shipment Service:</span>
                  <span className="text-violet-600 dark:text-violet-400 font-black">Leopards / TCS Logistics</span>
                </p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Customer Details Summary */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-xl space-y-2.5 shadow-xs">
                <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-1.5">Shipping Details</h4>
                <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-350 font-medium">
                  <p><span className="font-extrabold text-zinc-900 dark:text-white">Customer:</span> {lastPlacedOrder.fullName}</p>
                  <p><span className="font-extrabold text-zinc-900 dark:text-white">Email Address:</span> {lastPlacedOrder.email}</p>
                  <p><span className="font-extrabold text-zinc-900 dark:text-white">Phone No:</span> {lastPlacedOrder.phone}</p>
                  <p><span className="font-extrabold text-zinc-900 dark:text-white">Address:</span> {lastPlacedOrder.address}, {lastPlacedOrder.city}</p>
                </div>
              </div>

              {/* Items Summary list */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-xl space-y-3.5 shadow-xs">
                <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-1.5">Ordered Items</h4>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-850 space-y-2">
                  {lastPlacedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 pt-2 first:pt-0 justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2 min-w-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-8 h-8 rounded object-contain border border-zinc-100 bg-zinc-50 p-0.5" 
                        />
                        <div className="min-w-0">
                          <p className="text-zinc-800 dark:text-zinc-150 truncate max-w-[180px] font-bold">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-400 font-medium">Qty: {item.quantity} • {item.selectedColor || "Default Color"}</p>
                        </div>
                      </div>
                      <span className="text-zinc-900 dark:text-white font-black text-right shrink-0">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between items-center text-sm font-black text-zinc-900 dark:text-white">
                  <span>Grand Paid Total:</span>
                  <span className="text-violet-600 dark:text-violet-400 text-base font-black">Rs. {lastPlacedOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Courier disclaimer banner */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-3.5 rounded-xl text-left flex gap-3 text-amber-800 dark:text-amber-350">
                <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black">7-Days Checking Warranty</h5>
                  <p className="text-[10.5px] font-medium leading-relaxed mt-0.5">Please check package items upon arrival. You can open and inspect your parcel with our Leopards/TCS courier agent prior to delivery.</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
              <button
                onClick={handleFinishSuccess}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer text-center block uppercase tracking-wide"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : isCheckingOut ? (
          /* ================= ACTIVE CHECKOUT FORM PAGE ================= */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Form Scroll Container */}
            <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {/* Trust Badge / Header info */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 p-4 rounded-xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-150 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">Cash On Delivery (COD)</h4>
                  <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">No advance payment required. Safely pay physical cash upon package dispatch arrival.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">Billing & Shipping Address Form</h3>

                {/* Full Name field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-350 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Full Name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name (e.g. Ali Ahmed)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full text-xs bg-white dark:bg-zinc-900 border ${
                      errors.fullName ? "border-red-500 ring-2 ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                    } py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all text-zinc-800 dark:text-zinc-100 font-bold`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-red-500 font-extrabold pl-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-350 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Email Address <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email for receipt (e.g. ali@example.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-xs bg-white dark:bg-zinc-900 border ${
                      errors.email ? "border-red-500 ring-2 ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                    } py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all text-zinc-800 dark:text-zinc-100 font-bold`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-extrabold pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-350 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Phone Number <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter Pakistani contact number (e.g. 03001234567)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full text-xs bg-white dark:bg-zinc-900 border ${
                      errors.phone ? "border-red-500 ring-2 ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                    } py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all text-zinc-800 dark:text-zinc-100 font-bold`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-extrabold pl-1">{errors.phone}</p>
                  )}
                </div>

                {/* City select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-350 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Destination City <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all text-zinc-800 dark:text-zinc-100 font-bold"
                  >
                    {PakistaniCities.map((cityName) => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))}
                  </select>
                </div>

                {/* Complete Address textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-350 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Complete Street Address <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your street name, house/apartment number, sector, area location details"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full text-xs bg-white dark:bg-zinc-900 border ${
                      errors.address ? "border-red-500 ring-2 ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                    } py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900 focus:outline-hidden transition-all text-zinc-800 dark:text-zinc-100 font-bold`}
                  />
                  {errors.address && (
                    <p className="text-[10px] text-red-500 font-extrabold pl-1">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Order total info table */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-zinc-500 font-bold">
                  <span>Cart Items Subtotal:</span>
                  <span className="text-zinc-800 dark:text-zinc-100">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-500 font-bold">
                  <span>Home Delivery:</span>
                  <span className="text-zinc-800 dark:text-zinc-100">{deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`}</span>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between text-xs font-black text-zinc-900 dark:text-white">
                  <span>Grand Total to Pay:</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action submission button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-black py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Cash On Delivery Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* ================= STANDARD EDITABLE SHOPPING CART VIEW ================= */
          <>
            {/* Cart Items Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 my-auto">
                  <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 border border-zinc-150 dark:border-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-black text-zinc-800 dark:text-zinc-200">Your cart is empty</h3>
                  <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-1 max-w-[240px]">
                    Add items from our trending collection or flash sales to get started!
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-850 items-start group"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      onClick={() => {
                        if (onClickProduct) {
                          onClickProduct(item.product);
                          onClose();
                        }
                      }}
                      className="w-16 h-16 rounded-lg object-contain p-1 bg-zinc-50 dark:bg-zinc-800 shrink-0 border border-zinc-100 dark:border-zinc-850 cursor-pointer hover:opacity-80 transition-all"
                      referrerPolicy="no-referrer"
                    />

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          if (onClickProduct) {
                            onClickProduct(item.product);
                            onClose();
                          }
                        }}
                        className="text-xs font-black text-zinc-850 dark:text-zinc-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors cursor-pointer hover:underline"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                        Brand: {item.product.brand} • Color: <span className="font-bold">{item.selectedColor || "Default"}</span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-white">
                          Rs. {item.product.price.toLocaleString()}
                        </span>
                        {item.product.discountPercent > 0 && (
                          <span className="text-[10px] text-zinc-400 line-through">
                            Rs. {item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 scale-90 -ml-1">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-l-md transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-zinc-850 dark:text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-r-md transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1 rounded-md cursor-pointer"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Free Gifts Claim Section */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-violet-50/50 dark:bg-zinc-850/40 border border-violet-100 dark:border-zinc-800 rounded-xl space-y-2 mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-violet-700 dark:text-violet-400">
                    <Gift className="w-4 h-4 animate-bounce text-violet-600" />
                    <span>Claim Your Free Gifts (Rs. 0)</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Select any complimentary goodies to add to your order:</p>
                  
                  {/* Scrollable Gift Items List */}
                  <div className="flex gap-3 overflow-x-auto pb-2 pt-1 border-t border-zinc-100 dark:border-zinc-850/50 scrollbar-thin scrollbar-thumb-zinc-200">
                    {[
                      { id: "free-socks", name: "Premium Cotton Socks", imageUrl: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=150&q=80", brand: "VistaSports" },
                      { id: "free-keyring", name: "Leather Metallic Keychain", imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80", brand: "VistaAccess" },
                      { id: "free-cleaner", name: "Screen Cleaner Fluid Spray", imageUrl: "https://images.unsplash.com/photo-1585336261022-675929945037?auto=format&fit=crop&w=150&q=80", brand: "VistaClean" },
                      { id: "free-pouch", name: "Earphone Velvet Pouch", imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=150&q=80", brand: "VistaCase" }
                    ].map((freebie) => {
                      const alreadyAdded = cartItems.some(item => item.product.id === freebie.id);
                      return (
                        <div key={freebie.id} className="w-[120px] bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-150 dark:border-zinc-800 text-center shrink-0 flex flex-col justify-between shadow-xs">
                          <img
                            src={freebie.imageUrl}
                            alt={freebie.name}
                            className="w-10 h-10 object-cover rounded-md mx-auto bg-zinc-50 dark:bg-zinc-950 p-0.5 border border-zinc-100 dark:border-zinc-850"
                            referrerPolicy="no-referrer"
                          />
                          <h5 className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 truncate mt-1">{freebie.name}</h5>
                          <p className="text-[9px] text-green-600 dark:text-green-400 font-extrabold">FREE</p>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (alreadyAdded) return;
                              if (onAddFreebie) {
                                onAddFreebie({
                                  id: freebie.id,
                                  name: `🎁 [Freebie] ${freebie.name}`,
                                  price: 0,
                                  originalPrice: 1200,
                                  imageUrl: freebie.imageUrl,
                                  category: "accessories",
                                  brand: freebie.brand,
                                  rating: 5.0,
                                  description: "Special freebie product bundled with your order.",
                                  reviewsCount: 1,
                                  variants: { colors: [{ name: "Classic", hex: "#7c3aed" }], sizes: ["OS"] }
                                });
                              }
                            }}
                            disabled={alreadyAdded}
                            className={`text-[9px] font-black py-1 px-1.5 rounded-md mt-1.5 w-full cursor-pointer transition-colors ${
                              alreadyAdded
                                ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900"
                                : "bg-violet-600 hover:bg-violet-700 text-white"
                            }`}
                          >
                            {alreadyAdded ? "Claimed ✓" : "Claim Gift"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Calculations & Secure checkout trigger block */}
            {cartItems.length > 0 && (
              <div className="border-t border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5 space-y-3.5 shrink-0">
                {/* Promo/Savings Badge */}
                {totalSavings > 0 && (
                  <div className="bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 rounded-lg p-2.5 flex items-center gap-2 text-xs font-semibold">
                    <Gift className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Fantastic! You saved Rs. {totalSavings.toLocaleString()} on this order!</span>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>Subtotal</span>
                  <span className="text-zinc-800 dark:text-zinc-200">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Subscriber Discount */}
                {subscriberDiscount > 0 && (
                  <div className="flex justify-between text-xs font-bold text-green-600 dark:text-green-400">
                    <span className="flex items-center gap-1">
                      <span>Subscriber Discount (5% Off)</span>
                      <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded-full font-black">
                        Active
                      </span>
                    </span>
                    <span>
                      - Rs. {subscriberDiscount.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Delivery Fee */}
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span className="flex items-center gap-1">
                    Delivery Charges
                    {subtotal >= 5000 && (
                      <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-black">
                        FREE
                      </span>
                    )}
                  </span>
                  <span>
                    {deliveryCharge === 0 ? "Rs. 0" : `Rs. ${deliveryCharge}`}
                  </span>
                </div>

                {/* Shipping Progress */}
                {subtotal < 5000 && (
                  <div className="text-[10.5px] text-zinc-500 dark:text-zinc-400 bg-violet-50/50 dark:bg-zinc-900 border border-violet-100 dark:border-zinc-800 rounded-lg p-2">
                    Add products worth{" "}
                    <span className="font-bold text-violet-600 dark:text-violet-400">
                      Rs. {(5000 - subtotal).toLocaleString()}
                    </span>{" "}
                    more to qualify for <span className="font-semibold">FREE Shipping</span>!
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-850 dark:text-zinc-200 font-extrabold text-sm">Total Payment</span>
                  <span className="text-lg font-black text-violet-600 dark:text-violet-400">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 text-xs uppercase tracking-wider"
                >
                  <span>Proceed to secure checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
