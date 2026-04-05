"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2, ShieldCheck, Leaf, Loader2, Info, X, CheckCircle2, Droplet, Clock, Info as InfoIcon, MapPin, Languages } from "lucide-react";
import { useLanguage, useCart } from "../../store/useCart"; 
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

// --- TRANSLATIONS FOR STORE UI ---
const uiTranslations = {
  en: {
    storeTitle: "Avdhut Agro Store",
    items: "Items",
    ourProducts: "Our Premium Products",
    loading: "Loading products from database...",
    noProducts: "No products found in the database. Please add them in Supabase!",
    addToCart: "Add to Cart",
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty.",
    totalAmount: "Total Amount",
    checkout: "Place Order", 
    processing: "Processing...",
    securePayment: "Cash on delivery or manual payment available", 
    close: "Close",
    keyBenefits: "Key Benefits",
    howToUse: "How to Use",
    dosage: "Dosage",
    application: "Application",
    timing: "Timing",
    proTip: "Pro Tip",
    orderSuccess: "Order Placed Successfully! We will contact you for payment and delivery.",
    // New Address Translations
    deliveryDetails: "Delivery Details",
    name: "Full Name",
    phone: "Phone Number",
    address: "Complete Address (Village/Taluka)",
    pincode: "Pincode"
  },
  mr: {
    storeTitle: "अवधूत ॲग्रो स्टोअर",
    items: "वस्तू",
    ourProducts: "आमची प्रीमियम उत्पादने",
    loading: "डेटाबेसमधून उत्पादने लोड होत आहेत...",
    noProducts: "डेटाबेसमध्ये कोणतीही उत्पादने आढळली नाहीत!",
    addToCart: "कार्टमध्ये जोडा",
    yourCart: "तुमचे कार्ट",
    cartEmpty: "तुमचे कार्ट रिकामे आहे.",
    totalAmount: "एकूण रक्कम",
    checkout: "ऑर्डर करा", 
    processing: "प्रक्रिया सुरू आहे...",
    securePayment: "कॅश ऑन डिलिव्हरी किंवा मॅन्युअल पेमेंट उपलब्ध", 
    close: "बंद करा",
    keyBenefits: "मुख्य फायदे",
    howToUse: "कसे वापरावे",
    dosage: "प्रमाण",
    application: "वापरण्याची पद्धत",
    timing: "वेळ",
    proTip: "खास टीप",
    orderSuccess: "ऑर्डर यशस्वीरीत्या नोंदवली गेली! पेमेंट आणि वितरणासाठी आम्ही तुमच्याशी संपर्क साधू.",
    // New Address Translations
    deliveryDetails: "वितरण तपशील",
    name: "पूर्ण नाव",
    phone: "फोन नंबर",
    address: "संपूर्ण पत्ता (गाव/तालुका)",
    pincode: "पिनकोड"
  }
};

const extendedDetails: Record<string, any> = {
  "Amino Casil": {
    en: {
      benefits: ["Boosts plant growth & strength", "Increases stress resistance (heat, drought)", "Improves photosynthesis"],
      usage: { dosage: "2–3 ml per liter of water", application: "Foliar spray (on leaves)", timing: "Every 10–15 days", proTip: "Morning or evening" }
    },
    mr: {
      benefits: ["वनस्पतींची वाढ आणि ताकद वाढवते", "तणाव प्रतिकारक्षमता वाढवते (उष्णता, दुष्काळ)", "प्रकाशसंश्लेषण सुधारते"],
      usage: { dosage: "२-३ मिली प्रति लिटर पाणी", application: "पानांवर फवारणी", timing: "दर १०-१५ दिवसांनी", proTip: "सकाळी किंवा संध्याकाळी फवारणी करा" }
    }
  },
  "Avdhut Sweeper": {
    en: {
      benefits: ["Cleans leaf surface (dust, fungus)", "Improves sunlight absorption", "Acts as mild pest control"],
      usage: { dosage: "2 ml per liter of water", application: "Spray directly on leaves", timing: "Every 7–10 days or as needed", proTip: "Spray both sides of leaves" }
    },
    mr: {
      benefits: ["पानांचा पृष्ठभाग स्वच्छ करते (धूळ, बुरशी)", "सूर्यप्रकाश शोषण सुधारते", "किरकोळ कीड नियंत्रण करते"],
      usage: { dosage: "२ मिली प्रति लिटर पाणी", application: "पानांवर थेट फवारणी", timing: "दर ७-१० दिवसांनी", proTip: "पानांच्या दोन्ही बाजूंनी फवारा" }
    }
  },
  "Bio Fighter": {
    en: {
      benefits: ["Controls pests and diseases", "Strengthens plant immunity", "Eco-friendly alternative to chemicals"],
      usage: { dosage: "2–3 ml per liter of water", application: "Foliar spray", timing: "Every 7–12 days (or during attack)", proTip: "Use regularly for prevention" }
    },
    mr: {
      benefits: ["कीड आणि रोगांवर नियंत्रण", "वनस्पतींची प्रतिकारशक्ती वाढवते", "रासायनिक कीटकनाशकांना सेंद्रिय पर्याय"],
      usage: { dosage: "२-३ मिली प्रति लिटर पाणी", application: "फवारणी", timing: "दर ७-१२ दिवसांनी", proTip: "प्रतिबंधासाठी नियमित वापरा" }
    }
  },
  "Root & Shoot": {
    en: {
      benefits: ["Promotes strong root development", "Enhances new shoots & branches", "Improves early-stage plant growth"],
      usage: { dosage: "2–3 ml per liter of water", application: "Soil drenching or foliar spray", timing: "Every 10–15 days", proTip: "Seedling and vegetative stage" }
    },
    mr: {
      benefits: ["मुळांचा मजबूत विकास", "नवीन फांद्या आणि फुटवे वाढवते", "सुरुवातीच्या टप्प्यात वाढ सुधारते"],
      usage: { dosage: "२-३ मिली प्रति लिटर पाणी", application: "आळवणी (ड्रेन्चिंग) किंवा फवारणी", timing: "दर १०-१५ दिवसांनी", proTip: "रोप आणि वाढीच्या अवस्थेत उत्तम" }
    }
  }
};

export default function StorePage() {
  const { lang, toggleLang } = useLanguage();
  const t = uiTranslations[lang as keyof typeof uiTranslations]; 
  
  const { cart, addToCart, removeFromCart, clearCart } = useCart() as any; 
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Address Form State
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: ""
  });

  const isFormValid = customer.name && customer.phone && customer.address;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error("Error fetching products from Supabase:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const cartTotal = cart?.reduce((total: number, item: any) => total + Number(item.price), 0) || 0;

  const handleCheckout = async () => {
    if (cart.length === 0) return alert(t.cartEmpty);
    if (!isFormValid) return alert("Please fill in all delivery details.");
    
    setIsCheckingOut(true);

    try {
      // Send both Cart Items AND Customer Address to our backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cart,
          customer: customer 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to place order");

      // Success!
      alert(t.orderSuccess);
      if(clearCart) clearCart(); 
      setCustomer({ name: "", phone: "", address: "", pincode: "" }); // Reset form
      window.location.href = "/"; 

    } catch (error: any) {
      console.error("Order Error:", error);
      alert("Error placing order. Please try again."); 
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
      
      {/* Product Details Modal (Popup) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8 border-b border-slate-100 pb-8">
                <div className="w-full md:w-40 h-40 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 shrink-0">
                  {selectedProduct.image ? (
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full max-w-full object-contain" />
                  ) : <Leaf className="w-12 h-12 text-green-200" />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">{selectedProduct.name}</h2>
                  <p className="text-2xl font-bold text-[#0B4A2B] mb-4">₹{selectedProduct.price}</p>
                  <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>

              {extendedDetails[selectedProduct.name] ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-green-500" /> {t.keyBenefits}
                    </h3>
                    <ul className="space-y-3">
                      {extendedDetails[selectedProduct.name][lang].benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 bg-green-50/50 p-3 rounded-xl border border-green-100/50">
                          <Leaf className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Droplet className="w-6 h-6 text-blue-500" /> {t.howToUse}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{t.dosage}</p>
                        <p className="text-slate-700 font-medium">{extendedDetails[selectedProduct.name][lang].usage.dosage}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{t.application}</p>
                        <p className="text-slate-700 font-medium">{extendedDetails[selectedProduct.name][lang].usage.application}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {t.timing}</p>
                        <p className="text-slate-700 font-medium">{extendedDetails[selectedProduct.name][lang].usage.timing}</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#0B4A2B] to-[#0E623A] text-white p-4 rounded-xl shadow-sm">
                        <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-1 flex items-center gap-1"><InfoIcon className="w-3 h-3"/> {t.proTip}</p>
                        <p className="font-medium">{extendedDetails[selectedProduct.name][lang].usage.proTip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">Details coming soon...</p>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {t.close}
                </button>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="bg-[#0B4A2B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0E623A] transition-colors shadow-lg"
                >
                  {t.addToCart}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 shrink-0">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl md:text-2xl font-black text-[#0B4A2B] flex items-center gap-3">
              <img src="/logo.png" alt="Avdhut Agro Logo" className="w-10 h-10 object-contain hidden sm:block" />
              {t.storeTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 transition-colors shadow-sm text-sm"
            >
              <Languages className="w-4 h-4" />
              {lang === 'en' ? 'मराठी' : 'English'}
            </button>

            <div className="flex items-center gap-2 text-slate-600 font-bold bg-slate-100 px-4 py-2 rounded-xl shrink-0">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span className="hidden sm:inline">{cart?.length || 0} {t.items}</span>
              <span className="sm:hidden">{cart?.length || 0}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Products Grid */}
        <div className="flex-1 w-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">{t.ourProducts}</h2>
          
          {isLoadingProducts ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
              <p className="font-medium">{t.loading}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-slate-500">{t.noProducts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col group relative">
                  
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white/90 backdrop-blur-sm border border-slate-200 p-2 rounded-full shadow-sm text-slate-600 hover:text-[#0B4A2B] hover:scale-110 transition-all flex items-center gap-2"
                      title="View Details"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full h-40 bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4 border border-slate-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Leaf className="w-12 h-12 text-green-200" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 cursor-pointer hover:text-[#0B4A2B] transition-colors" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                  <p className="text-slate-500 text-sm mt-2 mb-4 flex-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2">
                    <span className="text-2xl font-black text-[#0B4A2B]">₹{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-[#0B4A2B] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#0E623A] transition-colors text-sm shadow-sm"
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="w-full lg:w-[450px] shrink-0 lg:sticky lg:top-24">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-lg flex flex-col max-h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-8rem)]">
            
            <h2 className="text-2xl font-black text-slate-800 mb-6 shrink-0 flex items-center gap-2">
               <Leaf className="w-7 h-7 text-[#00E676] -rotate-12" /> {t.yourCart}
            </h2>

            {cart?.length === 0 ? (
              <div className="text-center py-10 flex-1 flex flex-col justify-center">
                <ShoppingCart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">{t.cartEmpty}</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                {cart?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 shrink-0 overflow-hidden flex items-center justify-center p-1">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                            ) : (
                              <Leaf className="w-6 h-6 text-green-200" />
                            )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-sm font-medium text-green-600">₹{item.price}</p>
                        </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {/* ADDRESS FORM SECTION (Only shows if cart has items) */}
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" /> {t.deliveryDetails}
                  </h3>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder={t.name}
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder={t.phone}
                      value={customer.phone}
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                      required
                    />
                    <textarea 
                      placeholder={t.address}
                      value={customer.address}
                      onChange={(e) => setCustomer({...customer, address: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 h-24 resize-none"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder={t.pincode}
                      value={customer.pincode}
                      onChange={(e) => setCustomer({...customer, pincode: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                    />
                  </div>
                </div>

              </div>
            )}

            <div className="border-t border-slate-200 pt-6 shrink-0 mt-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-500 font-medium text-lg">{t.totalAmount}</span>
                <span className="text-3xl font-black text-[#0B4A2B]">₹{cartTotal}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cart?.length === 0 || isCheckingOut || !isFormValid}
                className="w-full flex items-center justify-center gap-2 bg-[#00E676] text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isCheckingOut ? t.processing : t.checkout}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium text-center">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                {t.securePayment}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}