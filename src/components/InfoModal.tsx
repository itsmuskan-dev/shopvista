import React, { useState, useEffect } from "react";
import { 
  X, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  PhoneCall, 
  Building2, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  ShieldAlert, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Globe,
  ChevronRight
} from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: "help" | "shipping" | "returns" | "about" | "outlets" | "contact" | "privacy" | "careers" | "blog" | "track-info";
}

export default function InfoModal({ isOpen, onClose, initialTab }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "shipping", label: "Shipping Rates", icon: Truck },
    { id: "returns", label: "7-Day Return Policy", icon: RotateCcw },
    { id: "contact", label: "Contact Helpline", icon: PhoneCall },
    { id: "about", label: "About ShopVista", icon: Globe },
    { id: "outlets", label: "Physical Outlets", icon: MapPin },
    { id: "careers", label: "Careers & Jobs", icon: Briefcase },
    { id: "blog", label: "News & Articles", icon: BookOpen },
    { id: "privacy", label: "Privacy & Terms", icon: ShieldAlert },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Overlay with smooth fade */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl h-[85vh] sm:h-[75vh] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-zinc-150 dark:border-zinc-800 z-10 animate-scale-up">
        
        {/* LEFT SIDEBAR: Tabs Navigation */}
        <div className="w-full md:w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-850 p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-none border-b md:border-b-0">
          <div className="hidden md:block mb-4 px-2">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
              Information Portal
            </span>
            <span className="text-xs text-zinc-500 font-semibold mt-1 block">
              How can we assist you?
            </span>
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-violet-600 text-white shadow-sm font-black"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-violet-600"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT AREA: Tab Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto text-left relative flex flex-col justify-between">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-250 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-6">
            
            {/* CONTENT RENDERING BASED ON ACTIVE TAB */}
            {activeTab === "help" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-violet-600" />
                    Help Center & Customer Support
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Answers to commonly asked questions. Our support helpline is online 24/7.</p>
                </div>

                <div className="space-y-4">
                  {/* FAQ Accordion list */}
                  <div className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl space-y-1.5 border border-zinc-150 dark:border-zinc-800">
                    <h4 className="text-xs font-black text-zinc-900 dark:text-white">Q1: Can I open and check the package before paying the courier?</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                      Yes! ShopVista PK offers <strong>"Open-Parcel Assurance"</strong>. You can inspect the product seal and physical condition upon delivery before executing the Cash on Delivery payment.
                    </p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl space-y-1.5 border border-zinc-150 dark:border-zinc-800">
                    <h4 className="text-xs font-black text-zinc-900 dark:text-white">Q2: How long does the dispatch and shipping delivery take?</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                      Delivery takes <strong>1 to 2 working days</strong> for major cities (Karachi, Lahore, Islamabad, Rawalpindi) and 2 to 4 working days for other areas across Pakistan.
                    </p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl space-y-1.5 border border-zinc-150 dark:border-zinc-800">
                    <h4 className="text-xs font-black text-zinc-900 dark:text-white">Q3: What if I receive a broken, damaged, or incorrect item?</h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                      We offer a <strong>7-Day replacement checking warranty</strong>. Simply contact us via email at support@shopvista.pk or call our WhatsApp helpline immediately to initiate a free exchange.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="tel:+923001234567" className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/20 px-4 py-2.5 rounded-xl border border-violet-100 dark:border-violet-900 hover:bg-violet-100 transition-all">
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Helpline: +92 300 1234567</span>
                  </a>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 hover:bg-emerald-100 transition-all">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Support: Chat Live</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-violet-600" />
                    Shipping & Delivery Rates
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Fast delivery partner network with Leopards PK and TCS logistics.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-1.5 text-xs">
                      <span className="font-extrabold text-violet-600 uppercase tracking-wider block text-[10px]">Standard Delivery</span>
                      <p className="font-black text-sm text-zinc-900 dark:text-white">Rs. 250 Flat Rate</p>
                      <p className="text-zinc-500 leading-relaxed font-semibold">Applicable on orders below Rs. 5000 anywhere across Pakistan.</p>
                    </div>

                    <div className="p-4 bg-violet-50/40 dark:bg-zinc-850 rounded-xl border border-violet-200 dark:border-zinc-800 space-y-1.5 text-xs">
                      <span className="font-extrabold text-green-600 dark:text-green-400 uppercase tracking-wider block text-[10px]">VIP Delivery Offer</span>
                      <p className="font-black text-sm text-green-600 dark:text-green-400">FREE HOME DELIVERY</p>
                      <p className="text-zinc-500 leading-relaxed font-semibold">Automatically applies to all shopping carts of Rs. 5000 or above!</p>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-2.5 text-xs">
                    <h4 className="font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-violet-600" />
                      Delivery Timeline Estimates:
                    </h4>
                    <ul className="space-y-1.5 font-semibold text-zinc-550 dark:text-zinc-400 list-disc pl-4 leading-relaxed">
                      <li><strong>Karachi:</strong> 24 to 48 Hours</li>
                      <li><strong>Lahore, Islamabad, Rawalpindi, Peshawar:</strong> 1 to 3 Working Days</li>
                      <li><strong>Quetta, Multan, Faisalabad, Sialkot, Gujranwala:</strong> 2 to 3 Working Days</li>
                      <li><strong>Rural or Remote areas:</strong> 3 to 5 Working Days max</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-violet-600" />
                    7-Day Return & Checking Policy
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Shop with absolute peace of mind. We protect your rights.</p>
                </div>

                <div className="text-xs text-zinc-650 dark:text-zinc-400 space-y-4 font-semibold leading-relaxed">
                  <p>
                    At ShopVista, we stand behind the quality of our electronics and goods. Every purchase includes our standard <strong>7-Day Free Checking & Replacement Guarantee</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 text-center space-y-1">
                      <span className="text-lg font-black text-violet-600">1</span>
                      <p className="font-black text-zinc-900 dark:text-white text-xs">Unbox & Inspect</p>
                      <p className="text-[10px] text-zinc-500">Check packaging seals & product performance.</p>
                    </div>
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 text-center space-y-1">
                      <span className="text-lg font-black text-violet-600">2</span>
                      <p className="font-black text-zinc-900 dark:text-white text-xs">Report Issues</p>
                      <p className="text-[10px] text-zinc-500">Call/WhatsApp within 7 days of receiving package.</p>
                    </div>
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 text-center space-y-1">
                      <span className="text-lg font-black text-violet-600">3</span>
                      <p className="font-black text-zinc-900 dark:text-white text-xs">Free Exchange</p>
                      <p className="text-[10px] text-zinc-500">Our courier collects the item and delivers a brand-new replacement.</p>
                    </div>
                  </div>

                  <p className="bg-red-50/50 dark:bg-zinc-850 p-3.5 rounded-xl border border-red-100 dark:border-zinc-800 text-[11px] text-red-800 dark:text-red-400">
                    <strong>Note:</strong> Items must be returned in their original packaging boxes with all included user manuals, cables, and tags. Self-induced drops or liquid damage are not eligible for replacement.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-violet-600" />
                    Contact Support Helpline
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">We are online 24 hours a day, 7 days a week to handle orders.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-750 dark:text-zinc-300 font-semibold leading-relaxed">
                  <div className="space-y-3.5">
                    <h4 className="font-black text-zinc-950 dark:text-white uppercase tracking-wider text-[10px] text-violet-600">Hotlines & Chats</h4>
                    <div className="space-y-2">
                      <p>📞 Phone Support: <span className="font-extrabold text-zinc-900 dark:text-white">+92 300 1234567</span></p>
                      <p>💬 WhatsApp Sales: <span className="font-extrabold text-zinc-900 dark:text-white">+92 321 9876543</span></p>
                      <p>✉️ General Email: <span className="font-extrabold text-zinc-900 dark:text-white">support@shopvista.pk</span></p>
                      <p>✉️ Return Queries: <span className="font-extrabold text-zinc-900 dark:text-white">returns@shopvista.pk</span></p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <h4 className="font-black text-zinc-950 dark:text-white uppercase tracking-wider text-[10px] text-violet-600">Headquarters Address</h4>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                      <span>ShopVista Building, 4th Floor, Plot 23-C, Khayaban-e-Ittehad, Phase 6, DHA, Karachi, Pakistan.</span>
                    </p>
                    <p>🕒 Operating Hours: <span className="font-extrabold">24/7/365 Non-Stop Support</span></p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-violet-600" />
                    About ShopVista PK
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Pakistan's premier destination for high-quality electronics & luxury apparel.</p>
                </div>

                <div className="text-xs text-zinc-650 dark:text-zinc-400 space-y-4 font-semibold leading-relaxed">
                  <p>
                    Founded in 2024, <strong>ShopVista PK</strong> is an innovative online marketplace designed specifically for Pakistani consumers. We noticed a massive gap in the local market: access to 100% authentic international electronics, designer clothes, original watches, premium handbags, and high-fidelity cosmetics, all backed by quick domestic Cash on Delivery.
                  </p>
                  <p>
                    We operate directly with verified global distributors, ensuring that our customers receive genuine articles with no middle-man price markups. Every single product in our catalog undergoes rigorous physical seal checks at our Karachi fulfillment warehouse before being handed to Leopards Courier agents.
                  </p>
                  <p className="border-l-4 border-violet-600 pl-4 italic text-zinc-500 text-xs py-1">
                    "Our mission is to empower Pakistani consumers with world-class merchandise, ultra-fast shipping, and robust customer protection."
                  </p>
                </div>
              </div>
            )}

            {activeTab === "outlets" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-violet-600" />
                    Our Physical Outlets
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Visit our brick-and-mortar storefront outlets to check out gadgets live.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-2">
                    <h4 className="font-black text-zinc-900 dark:text-white">Karachi Outlet</h4>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Dolmen Mall Clifton, Ground Floor, Ocean Wing, Karachi.</p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400">📞 Phone: 021-3581234</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-2">
                    <h4 className="font-black text-zinc-900 dark:text-white">Lahore Outlet</h4>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Y-Block Market, Commercial Area DHA Phase 3, Lahore.</p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400">📞 Phone: 042-3571234</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-2">
                    <h4 className="font-black text-zinc-900 dark:text-white">Islamabad Outlet</h4>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Centaurus Mall, Third Floor, Tech Wing, Islamabad.</p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400">📞 Phone: 051-3251234</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "careers" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-violet-600" />
                    Careers & Jobs at ShopVista
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">Join Pakistan's fastest-growing e-commerce engineering & marketing crew.</p>
                </div>

                <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  <p>We are always on the lookout for absolute visual craftsmen, typescript experts, and logistics champions. Open positions in Karachi & remote:</p>
                  
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
                      <div className="text-left">
                        <p className="font-black text-zinc-900 dark:text-white">Senior React / Tailwind UI Craftsman</p>
                        <p className="text-[10px] text-zinc-500">Karachi Office / Remote hybrid • Salary: Rs. 250k - 350k</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-violet-600 shrink-0" />
                    </div>

                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
                      <div className="text-left">
                        <p className="font-black text-zinc-900 dark:text-white">Supply Chain & TCS Logistics Manager</p>
                        <p className="text-[10px] text-zinc-500">DHA Karachi Hub Office • Salary: Rs. 180k - 240k</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-violet-600 shrink-0" />
                    </div>
                  </div>

                  <p className="text-[10.5px] text-zinc-450 text-center">To apply, send your resume & portfolio to <span className="text-violet-600 font-black">careers@shopvista.pk</span>.</p>
                </div>
              </div>
            )}

            {activeTab === "blog" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                    News & Articles (Official Blog)
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">E-Commerce advice, design pairing guides, and technological insights.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 p-4 space-y-2 text-left">
                    <span className="text-[9px] bg-violet-100 text-violet-700 font-black px-2 py-0.5 rounded uppercase">Tech Guide</span>
                    <h4 className="font-black text-zinc-900 dark:text-white">Why Mechanical Keyboards are Taking Over Desks in Lahore</h4>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">An inspection of the linear switches and aesthetic builds taking DHA offices by storm.</p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 p-4 space-y-2 text-left">
                    <span className="text-[9px] bg-red-100 text-red-700 font-black px-2 py-0.5 rounded uppercase">Fashion</span>
                    <h4 className="font-black text-zinc-900 dark:text-white">Pakistan Summer Fashion Trends for 2026</h4>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">Flowy breathable linens, pastels, and minimalist accessories are standard this season.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-violet-600" />
                    Privacy Policy & Secure Shopping
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-semibold">We protect your identity and shopping confidentiality safely.</p>
                </div>

                <div className="text-xs text-zinc-650 dark:text-zinc-400 space-y-4 font-semibold leading-relaxed">
                  <p>
                    At ShopVista PK, we employ bank-grade <strong>AES-256 SSL encryption</strong> to secure all transactions. Customer shipping databases, mobile numbers, and physical addresses are strictly protected under federal privacy laws.
                  </p>
                  <p>
                    We never share, sell, or trade your shopping history, names, or emails with third-party advertising companies. Your order details are accessed strictly by TCS/Leopards logistics API integrations to complete domestic dispatch.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Quick Support Footnote */}
          <div className="border-t border-zinc-150 dark:border-zinc-800 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center text-[10.5px] font-bold text-zinc-400 gap-2">
            <span>ShopVista PK Helpline Assured Portal</span>
            <span className="text-violet-600">Secure AES-256 Encrypted</span>
          </div>

        </div>
      </div>
    </div>
  );
}
