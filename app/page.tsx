"use client"
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, ShieldCheck, Sprout, Droplets, Languages, MapPin, Phone, Mail, Building, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../store/useCart"; 

// Translation Dictionary 
const translations = {
  en: {
    navProducts: "Products",
    navAbout: "About",
    navGallery: "Gallery",
    navContact: "Contact",
    visitStore: "Visit Store",
    heroTitle1: "Empowering Farmers.",
    heroTitle2: "Enriching Soil.",
    heroSub: "Avdhut Agro provides premium bio-stimulants and organic solutions to maximize crop yield and protect your farm's future.",
    shopBtn: "Shop Products",
    learnBtn: "Learn More",
    aboutTitle: "About Avdhut Agro",
    aboutText: "Avdhut Agro is an agricultural brand focused on organic and plant growth–enhancing solutions. The products are designed to work across all types of crops, helping farmers improve yield, plant health, and soil quality in a sustainable way.",
    whyTitle: "Why Choose Avdhut Agro?",
    whySub: "We combine modern agricultural science with sustainable practices to deliver products that actually work in the field.",
    feat1Title: "Proven Growth",
    feat1Text: "Our bio-stimulants are rigorously tested to ensure maximum root development and crop strength.",
    feat2Title: "Optimized Nutrition",
    feat2Text: "Delivering the exact amino acids and nutrients your plants need, exactly when they need them.",
    feat3Title: "Stress Resistance",
    feat3Text: "Protect your crops from harsh heat, drought, and pests with our specialized protective formulas.",
    galleryTitle: "Our Field Impact",
    gallerySub: "See the real-world results of Avdhut Agro products on farms across Maharashtra.",
    contactTitle: "Contact Us",
    manufacturer: "Manufactured by",
    companyName: "Avdhut Agro Consultancy Services Private Limited",
    address: "31A, Mangal Krupa, Plot No. 46, Sector 12B, Kopar Khairne, Navi Mumbai - 400 709, Maharashtra",
    phone: "Phone",
    email: "Email",
    footerTitle: "Ready to transform your farm?",
    footerBtn: "Browse Our Catalog"
  },
  mr: {
    navProducts: "उत्पादने",
    navAbout: "आमच्याबद्दल",
    navGallery: "गॅलरी",
    navContact: "संपर्क",
    visitStore: "स्टोअरला भेट द्या",
    heroTitle1: "शेतकऱ्यांचे सक्षमीकरण.",
    heroTitle2: "मातीचे संवर्धन.",
    heroSub: "अवधूत ॲग्रो पिकांचे जास्तीत जास्त उत्पादन घेण्यासाठी आणि तुमच्या शेतीचे भविष्य सुरक्षित करण्यासाठी प्रीमियम बायो-स्टिम्युलंट्स आणि सेंद्रिय उत्पादने प्रदान करते.",
    shopBtn: "उत्पादने खरेदी करा",
    learnBtn: "अधिक माहिती",
    aboutTitle: "अवधूत ॲग्रो बद्दल",
    aboutText: "अवधूत ॲग्रो हा सेंद्रिय आणि वनस्पतींच्या वाढीस चालना देणाऱ्या उत्पादनांवर लक्ष केंद्रित करणारा एक कृषी ब्रँड आहे. आमची उत्पादने सर्व प्रकारच्या पिकांवर काम करण्यासाठी डिझाइन केलेली आहेत, ज्यामुळे शेतकऱ्यांना शाश्वत पद्धतीने पीक उत्पादन, वनस्पतींचे आरोग्य आणि मातीचा दर्जा सुधारण्यास मदत होते.",
    whyTitle: "अवधूत ॲग्रो का निवडावे?",
    whySub: "आम्ही आधुनिक कृषी विज्ञान आणि शाश्वत पद्धतींचा मेळ घालून अशी उत्पादने देतो जी शेतात खरोखर परिणामकारक ठरतात.",
    feat1Title: "खात्रीशीर वाढ",
    feat1Text: "आमची उत्पादने मुळांचा जास्तीत जास्त विकास आणि पिकांची ताकद सुनिश्चित करण्यासाठी कठोरपणे तपासली जातात.",
    feat2Title: "इष्टतम पोषण",
    feat2Text: "तुमच्या वनस्पतींना जेव्हा आवश्यक असते, तेव्हाच अचूक अमिनो ऍसिड आणि पोषक तत्वे पुरवणे.",
    feat3Title: "तणाव प्रतिकारक्षमता",
    feat3Text: "आमच्या विशेष संरक्षणात्मक सूत्रांसह तुमच्या पिकांचे उष्णता, दुष्काळ आणि कीटकांपासून संरक्षण करा.",
    galleryTitle: "आमचा शेतावरील प्रभाव",
    gallerySub: "संपूर्ण महाराष्ट्रातील शेतांवर अवधूत ॲग्रो उत्पादनांचे वास्तविक परिणाम पहा.",
    contactTitle: "संपर्क साधा",
    manufacturer: "निर्माता",
    companyName: "अवधूत ॲग्रो कन्सल्टन्सी सर्व्हिसेस प्रायव्हेट लिमिटेड",
    address: "३१ए, मंगल कृपा, प्लॉट नं. ४६, सेक्टर १२बी, कोपर खैरणे, नवी मुंबई - ४०० ७०९, महाराष्ट्र",
    phone: "फोन ক্রি.",
    email: "ईमेल",
    footerTitle: "तुमची शेती बदलण्यासाठी तयार आहात?",
    footerBtn: "आमची उत्पादने पहा"
  }
};

const galleryMedia = [
  { type: "image", src: "/1.jpeg", alt: "Farmers in greenhouse" },
  
  { type: "image", src: "/2.jpeg", alt: "Healthy plant roots" },
  { type: "image", src: "/3.jpeg", alt: "Seedling roots in coco peat" },
  { type: "image", src: "/4.jpeg", alt: "Nursery seedlings" },
  { type: "image", src: "/10.jpeg", alt: "Harvested onions with healthy roots" },
  { type: "image", src: "/9.jpeg", alt: "Fresh pomegranates" },
  { type: "image", src: "/5.jpeg", alt: "Fresh coriander harvest" },
  { type: "image", src: "/6.jpeg", alt: "Lush green field at sunset" },
  { type: "image", src: "/7.jpeg", alt: "Healthy green crops" },
  { type: "image", src: "/11.jpeg", alt: "Farmers in greenhouse" },
  { type: "video", src: "/vid1.mp4" },

  { type: "image", src: "/12.jpeg", alt: "Farmers in field with product" },
];

export default function LandingPage() {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Advanced scrolling logic with Loop capabilities
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -400 : 400; 
      
      // Check if we are at the very end of the scroll container
      const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
      // Check if we are at the very beginning
      const isAtStart = current.scrollLeft <= 10;

      if (direction === 'right' && isAtEnd) {
        // If moving right and at the end, LOOP back to the start
        current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && isAtStart) {
        // If moving left and at the start, LOOP to the end
        current.scrollTo({ left: current.scrollWidth, behavior: 'smooth' });
      } else {
        // Otherwise, just scroll normally
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Auto-play interval effect
  useEffect(() => {
    if (isPaused) return; // Don't slide if the user is hovering/touching

    const interval = setInterval(() => {
      scroll('right');
    }, 3500); // Slide every 3.5 seconds

    return () => clearInterval(interval); // Cleanup when unmounted
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans scroll-smooth flex flex-col">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          
          <div className="flex items-center gap-8">
            <img src="/logo.png" alt="Avdhut Agro Logo" className="h-16 md:h-20 w-auto object-contain cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            
            <div className="hidden md:flex items-center gap-6 font-bold text-slate-600">
              <Link href="/store" className="hover:text-green-600 transition-colors">{t.navProducts}</Link>
              <a href="#about" className="hover:text-green-600 transition-colors">{t.navAbout}</a>
              <a href="#gallery" className="hover:text-green-600 transition-colors">{t.navGallery}</a>
              <a href="#contact" className="hover:text-green-600 transition-colors">{t.navContact}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 transition-colors shadow-sm text-sm md:text-base"
            >
              <Languages className="w-4 h-4 md:w-5 md:h-5" />
              {lang === 'en' ? 'मराठी' : 'English'}
            </button>
            <Link 
              href="/store"
              className="hidden sm:inline-block bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition shadow-sm text-sm md:text-base"
            >
              {t.visitStore}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10 w-full">
        <div className="bg-[#0B4A2B] rounded-[2.5rem] p-10 md:p-16 shadow-2xl flex flex-col items-start text-left border border-[#0F5A35]">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tight">
            {t.heroTitle1} <br className="hidden md:block" />
            <span className="text-[#00E676]">{t.heroTitle2}</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50/90 max-w-2xl mb-10 font-medium leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/store"
              className="flex items-center justify-center gap-2 bg-white text-[#0B4A2B] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.shopBtn} <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#about"
              className="flex items-center justify-center gap-2 bg-[#0E623A] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#117A48] transition-colors border border-transparent hover:border-[#1A9C5E]"
            >
              {t.learnBtn}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 pt-24 -mt-24 relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative mt-10">
            
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-600/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Leaf className="w-10 h-10" />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
                {t.aboutTitle}
              </h2>
              <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full mb-8 opacity-80"></div>
              
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
                {t.aboutText}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 relative z-10 w-full">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">{t.whyTitle}</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.whySub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t.feat1Title}</h3>
              <p className="text-slate-500">{t.feat1Text}</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t.feat2Title}</h3>
              <p className="text-slate-500">{t.feat2Text}</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{t.feat3Title}</h3>
              <p className="text-slate-500">{t.feat3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Sliding Loop Gallery Section */}
      <section id="gallery" className="py-12 pt-24 -mt-24 relative z-10 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">{t.galleryTitle}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.gallerySub}</p>
            </div>

            {/* Added mouse/touch events to pause the slider on hover! */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Left Arrow Button */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 bg-white shadow-xl rounded-full p-3 text-green-700 hover:bg-green-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-slate-100"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Scrolling Container */}
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory pb-8 pt-4 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {galleryMedia.map((media, index) => (
                  <div 
                    key={index} 
                    className="shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 aspect-square relative snap-center group/card bg-slate-100"
                  >
                    {media.type === "image" ? (
                      <img 
                        src={media.src} 
                        alt={media.alt} 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700"
                        >
                          <source src={media.src} type="video/mp4" />
                        </video>
                        <div className="absolute pointer-events-none bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                          <Play className="w-8 h-8 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Arrow Button */}
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 bg-white shadow-xl rounded-full p-3 text-green-700 hover:bg-green-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-slate-100"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Contact & Address Section */}
      <section id="contact" className="py-12 pt-24 -mt-24 mb-12 relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">{t.contactTitle}</h2>
              <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 md:p-10 shadow-inner border border-slate-100 flex flex-col md:flex-row gap-12 items-start justify-between">
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-xl mt-1">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">{t.manufacturer}</p>
                    <h3 className="text-xl font-black text-slate-800">{t.companyName}</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-md">
                      {t.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full md:w-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <a href="tel:+918828884111" className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-slate-50 group-hover:bg-green-100 group-hover:text-green-700 text-slate-600 rounded-xl transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.phone}</p>
                    <p className="text-lg font-bold text-slate-800 group-hover:text-green-700 transition-colors">
                      +91 8828884111 <br className="md:hidden" /><span className="hidden md:inline"> / </span>+91 8828885111
                    </p>
                  </div>
                </a>

                <a href="mailto:avdhutagro2020@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-slate-50 group-hover:bg-amber-100 group-hover:text-amber-700 text-slate-600 rounded-xl transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.email}</p>
                    <p className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors break-all">
                      avdhutagro2020@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Leaf className="w-12 h-12 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t.footerTitle}</h2>
          <Link 
            href="/store"
            className="inline-block bg-[#00E676] text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-400 transition-all shadow-lg"
          >
            {t.footerBtn}
          </Link>
          <p className="mt-12 text-slate-400 text-sm">© 2026 {t.companyName}. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}