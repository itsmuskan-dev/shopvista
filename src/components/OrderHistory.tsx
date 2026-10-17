import React, { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Download, 
  Package, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Trash2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  ShoppingBag
} from "lucide-react";
import { Order } from "../types";
import { jsPDF } from "jspdf";

interface OrderHistoryProps {
  orders: Order[];
  onBackToShop: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Received") => void;
  onClearAllOrders: () => void;
}

export default function OrderHistory({
  orders,
  onBackToShop,
  onUpdateOrderStatus,
  onClearAllOrders,
}: OrderHistoryProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  // Active selected order details
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleDownloadPDF = (order: Order) => {
    const doc = new jsPDF();
    
    // 1. Add Brand logo / header
    doc.setFillColor(128, 0, 0); // Maroon primary theme color
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SHOPVISTA PK", 15, 18);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Premium E-Commerce Platform", 15, 24);
    doc.text("Helpline: +92 300 1234567 | support@shopvista.pk", 15, 29);
    
    // Right align invoice title
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("CASH ON DELIVERY INVOICE", 115, 24);
    
    // 2. Billing / Shipping Info
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER SUMMARY", 15, 50);
    doc.line(15, 52, 195, 52);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${order.id}`, 15, 58);
    doc.text(`Order Date: ${order.date}`, 15, 63);
    doc.text(`Payment Status: Cash on Delivery (COD)`, 15, 68);
    doc.text(`Order Status: ${order.status}`, 15, 73);
    
    doc.setFont("helvetica", "bold");
    doc.text("SHIPPING DETAILS", 110, 58);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer Name: ${order.fullName}`, 110, 63);
    doc.text(`Phone Number: ${order.phone}`, 110, 68);
    doc.text(`Email Address: ${order.email}`, 110, 73);
    doc.text(`Address: ${order.address}, ${order.city}`, 110, 78);
    
    // 3. Items list Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(15, 87, 180, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("S.No", 18, 92);
    doc.text("Item & Configuration", 30, 92);
    doc.text("Price", 115, 92);
    doc.text("Qty", 145, 92);
    doc.text("Subtotal", 165, 92);
    
    doc.line(15, 95, 195, 95);
    
    // 4. Render items
    doc.setFont("helvetica", "normal");
    let y = 101;
    order.items.forEach((item, index) => {
      let itemName = item.product.name;
      if (itemName.length > 40) itemName = itemName.substring(0, 37) + "...";
      
      const config = `${item.selectedColor || "Default"} / ${item.selectedSize || "Standard"}`;
      
      doc.text(`${index + 1}`, 18, y);
      doc.setFont("helvetica", "bold");
      doc.text(itemName, 30, y);
      doc.setFont("helvetica", "normal");
      doc.text(config, 30, y + 4);
      
      doc.text(`Rs. ${item.product.price.toLocaleString()}`, 115, y);
      doc.text(`${item.quantity}`, 145, y);
      
      const sub = item.product.price * item.quantity;
      doc.setFont("helvetica", "bold");
      doc.text(`Rs. ${sub.toLocaleString()}`, 165, y);
      doc.setFont("helvetica", "normal");
      
      doc.line(15, y + 6, 195, y + 6);
      y += 11;
    });
    
    // 5. Calculations Summary
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("CALCULATIONS", 15, y);
    doc.line(15, y + 2, 85, y + 2);
    
    doc.setFont("helvetica", "normal");
    doc.text("Cart Subtotal:", 15, y + 8);
    doc.text(`Rs. ${order.subtotal.toLocaleString()}`, 60, y + 8);
    
    doc.text("Home Delivery Charge:", 15, y + 13);
    doc.text(order.deliveryCharge === 0 ? "FREE" : `Rs. ${order.deliveryCharge}`, 60, y + 13);
    
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total to Pay:", 15, y + 19);
    doc.text(`Rs. ${order.grandTotal.toLocaleString()}`, 60, y + 19);
    
    // Leopards stamp/signature placeholder
    doc.rect(115, y + 2, 80, 20);
    doc.setFontSize(8);
    doc.text("AUTHORIZED DISPATCH STAMP", 120, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text("Leopards / TCS Logistics PK", 120, y + 12);
    doc.text("Status: COD Dispatch Assured", 120, y + 17);
    
    // 6. Guarantee & Footer notes
    y += 35;
    doc.setFillColor(254, 242, 242);
    doc.rect(15, y, 180, 15, "F");
    doc.setDrawColor(239, 68, 68);
    doc.rect(15, y, 180, 15);
    
    doc.setTextColor(128, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("7-DAYS FREE RETURN CHECKING WARRANTY ASSURED", 20, y + 6);
    doc.setFont("helvetica", "normal");
    doc.text("Please do not accept package if shipping seals are torn. Open and verify items before courier dispatch departure.", 20, y + 11);
    
    // Footer credit
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(7);
    doc.text("Thank you for choosing ShopVista PK. This is an auto-generated official invoice.", 105, 285, { align: "center" });
    
    doc.save(`ShopVista-Invoice-${order.id}.pdf`);
  };

  // Helper for tracking steps based on status
  const getStatusStep = (status: string) => {
    switch (status) {
      case "Pending": return 1;
      case "Processing": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      case "Received": return 5;
      default: return 2;
    }
  };

  // Helper style/color for status badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900";
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900";
      case "Shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
      case "Received":
        return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 border-green-200 dark:border-green-900";
      default:
        return "bg-zinc-100 text-zinc-850 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200";
    }
  };

  // Simulate courier updates manually for demo testing
  const triggerSimulateShipping = (orderId: string, currentStatus: string) => {
    if (currentStatus === "Processing") {
      onUpdateOrderStatus(orderId, "Shipped");
    } else if (currentStatus === "Shipped") {
      onUpdateOrderStatus(orderId, "Delivered");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800">
        <button
          onClick={onBackToShop}
          className="flex items-center gap-2 text-xs font-black text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Online Store</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-extrabold uppercase tracking-widest">
            Order Status Tracking Panel
          </span>
          {orders.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your local order history?")) {
                  onClearAllOrders();
                  setSelectedOrderId(null);
                }
              }}
              className="text-[10px] text-zinc-400 hover:text-red-500 font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        /* NO ORDERS YET SCREEN */
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 text-zinc-450 border border-zinc-150 dark:border-zinc-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Package className="w-7 h-7 text-violet-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">No active orders placed yet</h3>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
              You haven't placed any Cash on Delivery orders during this session. Explore our catalog, add items to your cart, and check out securely!
            </p>
          </div>
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs py-3 px-6 rounded-xl shadow-md uppercase tracking-wider cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping Now</span>
          </button>
        </div>
      ) : (
        /* MAIN DASHBOARD LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ORDERS LIST DIRECTORY */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest pl-1">
              Placed Orders ({orders.length})
            </h3>
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {orders.map((order) => {
                const isSelected = order.id === selectedOrderId;
                return (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 shadow-xs ${
                      isSelected
                        ? "bg-violet-50/50 dark:bg-zinc-850/40 border-violet-500 ring-2 ring-violet-500/10"
                        : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-800 hover:border-zinc-350"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-black text-xs text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-violet-600" />
                        {order.id}
                      </span>
                      <span className={`text-[9px] font-black uppercase py-0.5 px-2 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-zinc-450 dark:text-zinc-500">
                      Placed: {order.date}
                    </div>

                    <div className="border-t border-dashed border-zinc-100 dark:border-zinc-800 pt-2 flex justify-between items-center">
                      <span className="text-[10px] text-zinc-400 uppercase font-black">
                        {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items
                      </span>
                      <span className="text-xs font-black text-violet-600 dark:text-violet-400">
                        Rs. {order.grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILED ORDER TRACKING TIMELINE & RECIEPT */}
          <div className="lg:col-span-8 space-y-6">
            {activeOrder ? (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                
                {/* Panel Header */}
                <div className="p-5 sm:p-6 border-b border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-black text-zinc-900 dark:text-white">Order {activeOrder.id}</span>
                      <span className={`text-[10px] font-black uppercase py-0.5 px-2.5 rounded-full border ${getStatusColor(activeOrder.status)}`}>
                        {activeOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-450 dark:text-zinc-500 font-bold">Placed on {activeOrder.date} • Cash On Delivery (COD)</p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleDownloadPDF(activeOrder)}
                      className="flex-1 sm:flex-initial bg-violet-600 hover:bg-violet-700 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all uppercase tracking-wider"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Receipt</span>
                    </button>
                  </div>
                </div>

                {/* 1. DYNAMIC SHIPMENT TRACKING TIMELINE */}
                <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                      Live Delivery Tracker
                    </h4>
                    {activeOrder.status !== "Received" && activeOrder.status !== "Delivered" && (
                      <button
                        onClick={() => triggerSimulateShipping(activeOrder.id, activeOrder.status)}
                        className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-350 font-bold px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all"
                        title="Simulate courier shipping transit updates for testing"
                      >
                        <RefreshCw className="w-2.5 h-2.5 animate-spin-slow" />
                        <span>Simulate Courier Transit Update</span>
                      </button>
                    )}
                  </div>

                  {/* Horizontal Graphic Timeline */}
                  <div className="relative pt-4 pb-8 max-w-xl mx-auto">
                    <div className="absolute top-8 left-4 right-4 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    
                    {/* Active filled track */}
                    <div 
                      className="absolute top-8 left-4 h-1.5 bg-violet-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          activeOrder.status === "Pending" ? "0%" :
                          activeOrder.status === "Processing" ? "25%" :
                          activeOrder.status === "Shipped" ? "50%" :
                          activeOrder.status === "Delivered" ? "75%" : "100%"
                        }`
                      }}
                    />

                    <div className="relative flex justify-between">
                      {/* Step 1: Pending */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                          getStatusStep(activeOrder.status) >= 1
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-750 text-zinc-400"
                        }`}>
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase mt-2 text-zinc-800 dark:text-zinc-200">Pending</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                          getStatusStep(activeOrder.status) >= 2
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-750 text-zinc-400"
                        }`}>
                          <Package className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase mt-2 text-zinc-800 dark:text-zinc-200">Processing</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                          getStatusStep(activeOrder.status) >= 3
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-750 text-zinc-400"
                        }`}>
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase mt-2 text-zinc-800 dark:text-zinc-200">In Transit</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                          getStatusStep(activeOrder.status) >= 4
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-750 text-zinc-400"
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase mt-2 text-zinc-800 dark:text-zinc-200">Delivered</span>
                      </div>

                      {/* Step 5: Received */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-colors ${
                          getStatusStep(activeOrder.status) >= 5
                            ? "bg-green-600 border-green-600 text-white"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-750 text-zinc-400"
                        }`}>
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black uppercase mt-2 text-zinc-800 dark:text-zinc-200">Received ✓</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE ACTION BUTTON FOR CONFIRMING "MARK AS RECEIVED" */}
                  {activeOrder.status !== "Received" ? (
                    <div className="bg-violet-50/50 dark:bg-zinc-850/40 border border-violet-150 dark:border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left space-y-0.5">
                        <h5 className="text-xs font-black text-zinc-800 dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-violet-600" />
                          Did you receive this parcel order?
                        </h5>
                        <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed">
                          Confirming package receipt switches order status to "Received" and concludes logistics.
                        </p>
                      </div>
                      <button
                        onClick={() => onUpdateOrderStatus(activeOrder.id, "Received")}
                        className="w-full sm:w-auto shrink-0 bg-green-600 hover:bg-green-700 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer uppercase tracking-wider text-center"
                      >
                        Confirm Order Received ✓
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900/40 p-4 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-450 text-left">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-black">Order Received & Fully Completed</h5>
                        <p className="text-[10.5px] font-semibold mt-0.5">You confirmed receipt of this shipment. Thank you for shopping with us! Your 7-day local checking replacement warranty is officially active.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CUSTOMER INFO CARD */}
                <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      Shipping Destination
                    </h5>
                    <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-semibold leading-relaxed">
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>Name: <span className="font-extrabold text-zinc-900 dark:text-white">{activeOrder.fullName}</span></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>Phone: <span className="font-extrabold text-zinc-900 dark:text-white">{activeOrder.phone}</span></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>Email: <span className="font-extrabold text-zinc-900 dark:text-white">{activeOrder.email}</span></span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      Complete Courier Address
                    </h5>
                    <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
                      <p className="flex items-start gap-2 leading-relaxed">
                        <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{activeOrder.address}, <span className="font-extrabold text-zinc-900 dark:text-white">{activeOrder.city}, Pakistan</span></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>Courier Partner: <span className="text-violet-600 dark:text-violet-400 font-black">Leopards PK / TCS Logistics</span></span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. ORDERED PRODUCTS LIST */}
                <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 space-y-4">
                  <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-left">
                    Ordered Products list
                  </h5>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800 space-y-3.5">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 pt-3.5 first:pt-0 justify-between items-start text-xs font-semibold">
                        <div className="flex gap-3 min-w-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-12 h-12 rounded-lg object-contain border border-zinc-100 bg-zinc-50 p-1 shrink-0" 
                          />
                          <div className="min-w-0 text-left">
                            <p className="text-zinc-900 dark:text-white font-extrabold truncate max-w-[280px] sm:max-w-[400px]">
                              {item.product.name}
                            </p>
                            <p className="text-[10.5px] text-zinc-400 mt-0.5">
                              Brand: {item.product.brand} • Color: <span className="font-extrabold text-zinc-700 dark:text-zinc-300">{item.selectedColor || "Default"}</span> • Size: <span className="font-extrabold text-zinc-700 dark:text-zinc-300">{item.selectedSize || "Standard"}</span>
                            </p>
                            <p className="text-[10.5px] text-zinc-500 mt-0.5">
                              Quantity: {item.quantity} x Rs. {item.product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-zinc-900 dark:text-white font-black shrink-0 text-right">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. TOTAL PAYMENT SUMMARY */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-950/20 text-left space-y-3">
                  <div className="flex justify-between text-xs text-zinc-500 font-bold">
                    <span>Products Subtotal:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">Rs. {activeOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 font-bold">
                    <span>Delivery Charges:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-extrabold">
                      {activeOrder.deliveryCharge === 0 ? "FREE Delivery" : `Rs. ${activeOrder.deliveryCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex justify-between items-center text-sm font-black text-zinc-900 dark:text-white">
                    <span>Grand Total Payment (Pay Courier COD):</span>
                    <span className="text-violet-600 dark:text-violet-400 text-lg font-black">Rs. {activeOrder.grandTotal.toLocaleString()}</span>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}
    </div>
  );
}
