"use client"
import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { ShoppingCart, Loader2, Info, X, CheckCircle2, FlaskConical } from "lucide-react";
import axios from "axios";
import { supabase } from "../lib/supabase"; // Import the database connection

export default function Home() {
  const { cart, addToCart, totalPrice } = useCart();
  const [products, setProducts] = useState<any[]>([]); // Database State
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Loading state for DB
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase.from("products").select("*").order('id', { ascending: true });
      
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setIsFetching(false);
    }
    loadProducts();
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/checkout", { items: cart });
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: Stripe did not return a checkout URL.");
        setIsLoading(false);
      }
    } catch (error: any) {
      alert("Error connecting to Stripe. Check your terminal."); 
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <nav className="bg-white border-b sticky top-0 z-40 shadow-sm py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Avdhut Agro Logo" 
              className="h-20 md:h-28 w-auto object-contain drop-shadow-sm cursor-pointer transition-all duration-300" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="relative p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 pb-32 pt-8">
        {/* Loading Spinner for Database */}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-4" />
            <p className="text-slate-500 font-medium">Loading catalog from database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-56 p-6 flex items-center justify-center bg-white relative border-b border-slate-50">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain drop-shadow-md" />
                  <button 
                    onClick={() => setSelectedProduct(p)}
                    className="absolute top-4 right-4 p-2 bg-slate-100/80 backdrop-blur rounded-full text-slate-600 hover:text-green-600 hover:bg-white shadow-sm transition"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-extrabold text-slate-800 leading-tight mb-1">{p.name}</h2>
                  <p className="text-slate-500 text-sm mb-6 font-medium">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-2xl font-black text-green-700">₹{p.price}</span>
                    <button 
                      onClick={() => addToCart(p)}
                      className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 hover:shadow-lg transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Info Modal (Unchanged) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-6 mb-8 border-b pb-6">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border border-slate-100">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full object-contain drop-shadow-sm" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
                  <p className="text-green-600 font-bold bg-green-50 inline-block px-3 py-1 rounded-lg mt-2 text-sm">How to Use & Benefits</p>
                </div>
              </div>
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {selectedProduct.benefits?.map((b: string, i: number) => (
                      <li key={i} className="text-slate-600 text-sm pl-7 relative font-medium leading-relaxed">
                        <span className="absolute left-2 top-2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-sm" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-blue-500" /> Application Guide
                  </h3>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                    <div>
                      <p className="text-slate-400 uppercase text-[10px] font-extrabold tracking-wider mb-1">Dosage</p>
                      <p className="font-bold text-slate-800">{selectedProduct.usage?.dosage}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-[10px] font-extrabold tracking-wider mb-1">Method</p>
                      <p className="font-bold text-slate-800">{selectedProduct.usage?.method}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-[10px] font-extrabold tracking-wider mb-1">Timing</p>
                      <p className="font-bold text-slate-800">{selectedProduct.usage?.timing}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-[10px] font-extrabold tracking-wider mb-1">Best Tip</p>
                      <p className="font-bold text-slate-800">{selectedProduct.usage?.bestTime}</p>
                    </div>
                  </div>
                </section>
              </div>
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
              >
                Add to Cart - ₹{selectedProduct.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Checkout Bar (Unchanged) */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex justify-between items-center z-40">
          <div className="ml-4 sm:ml-8">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Your Cart ({cart.length})</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalPrice()}</p>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className={`flex items-center gap-2 px-8 sm:px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg mr-4 sm:mr-8 ${
              isLoading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
            }`}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? "Processing..." : "Checkout Securely"}
          </button>
        </div>
      )}
    </div>
  );
}