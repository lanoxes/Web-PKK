import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingBag, 
  Sparkles, 
  UtensilsCrossed, 
  Info, 
  PhoneCall, 
  CalendarDays, 
  Award, 
  Menu as MenuIcon, 
  X, 
  History,
  ChefHat
} from 'lucide-react';

interface NavbarProps {
  onOpenSubscription: () => void;
  onOpenMembership: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubscription,
  onOpenMembership,
  onOpenAdmin
}) => {
  const { activeTab, setActiveTab, itemCount, setIsCartDrawerOpen, subtotal, moriPoints } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#66513F] text-[#F2EFE5] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#E8C77D] animate-pulse"></span>
        <span>
          🌱 Sarapan Sehat Mulai Rp 22.000 | <strong>Gratis Ongkir</strong> minimal belanja Rp 50.000 dengan kode <span className="bg-[#E8C77D] text-[#3B2C21] px-1.5 py-0.5 rounded font-bold text-[11px]">MORIBARU</span>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#F2EFE5]/95 backdrop-blur-md border-b border-[#A8B69B]/30 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform border-2 border-[#A8B69B]/40 bg-white shrink-0">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_jkk8mjjkk8mjjkk8_1e24e2af.jfif"
                  alt="MORI Healthy Breakfast Logo"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-[#3B2C21]">
                    MORI
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#A8B69B]/20 text-[#4E623E] border border-[#A8B69B]/40">
                    Healthy
                  </span>
                </div>
                <p className="text-[11px] text-[#66513F]/80 font-medium tracking-wide">
                  A Better Start, Every Day.
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-[#A8B69B]/30 shadow-xs">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:text-[#3B2C21] hover:bg-[#A8B69B]/15'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('menu')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'menu'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:text-[#3B2C21] hover:bg-[#A8B69B]/15'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Our Menu
              </button>

              <button
                onClick={() => handleNavClick('customize')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'customize'
                    ? 'bg-[#A8B69B] text-[#3B2C21] font-bold shadow-xs'
                    : 'text-[#3B2C21] hover:bg-[#A8B69B]/25'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C9A048]" />
                Customize Bowl
                <span className="bg-[#E8C77D] text-[#3B2C21] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  DIY
                </span>
              </button>

              <button
                onClick={onOpenSubscription}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-[#66513F] hover:text-[#3B2C21] hover:bg-[#A8B69B]/15 transition-all"
                title="Paket Langganan Mingguan"
              >
                <CalendarDays className="w-4 h-4 text-[#A8B69B]" />
                Langganan
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'about'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:text-[#3B2C21] hover:bg-[#A8B69B]/15'
                }`}
              >
                <Info className="w-4 h-4" />
                About Us
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:text-[#3B2C21] hover:bg-[#A8B69B]/15'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                Contact
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5">
              
              {/* Membership Points Badge */}
              <button
                onClick={onOpenMembership}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8C77D]/25 border border-[#E8C77D]/60 text-[#3B2C21] text-xs font-bold hover:bg-[#E8C77D]/40 transition-colors"
                title="Buka MORI Points & Membership"
              >
                <Award className="w-4 h-4 text-[#C9A048]" />
                <span>{moriPoints} Pts</span>
              </button>

              {/* Order History */}
              <button
                onClick={() => handleNavClick('history')}
                className="hidden sm:flex items-center gap-1 p-2 rounded-full bg-white/70 text-[#66513F] hover:bg-white hover:text-[#3B2C21] border border-[#A8B69B]/30 transition-colors"
                title="Riwayat Pesanan Anda"
              >
                <History className="w-5 h-5" />
              </button>

              {/* Kitchen / Admin Simulator (Demo Mode) */}
              <button
                onClick={onOpenAdmin}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#A8B69B]/20 text-[#4E623E] hover:bg-[#A8B69B]/35 border border-[#A8B69B]/40 text-xs font-semibold transition-colors"
                title="Kitchen Order Simulator (Demo)"
              >
                <ChefHat className="w-4 h-4" />
                <span>Dapur</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 bg-[#66513F] hover:bg-[#3B2C21] text-white px-4 py-2.5 rounded-full font-semibold shadow-sm transition-all transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#E8C77D]" />
                <span className="hidden sm:inline text-xs font-medium">Keranjang</span>
                {itemCount > 0 && (
                  <span className="bg-[#E8C77D] text-[#3B2C21] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {itemCount}
                  </span>
                )}
                {subtotal > 0 && (
                  <span className="hidden md:inline text-xs font-bold pl-1 border-l border-white/20">
                    Rp {(subtotal / 1000).toFixed(0)}k
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/70 text-[#66513F] hover:text-[#3B2C21] border border-[#A8B69B]/30"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#A8B69B]/30 bg-[#F2EFE5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
                activeTab === 'home' ? 'bg-[#66513F] text-white' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
                activeTab === 'menu' ? 'bg-[#66513F] text-white' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              🥣 Our Menu (Katalog Lengkap)
            </button>
            <button
              onClick={() => handleNavClick('customize')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-between ${
                activeTab === 'customize' ? 'bg-[#A8B69B] text-[#3B2C21]' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              <span className="flex items-center gap-2">
                ✨ Customize Your Bowl
              </span>
              <span className="bg-[#E8C77D] text-[#3B2C21] text-xs px-2 py-0.5 rounded-full font-bold">
                DIY
              </span>
            </button>
            <button
              onClick={() => {
                onOpenSubscription();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm text-[#3B2C21] hover:bg-white/60 flex items-center gap-2"
            >
              📅 Paket Langganan Mingguan (Senin-Jumat)
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
                activeTab === 'about' ? 'bg-[#66513F] text-white' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              🌿 About Us & Cerita Brand
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
                activeTab === 'contact' ? 'bg-[#66513F] text-white' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              📍 Outlet & Kontak MORI
            </button>
            <button
              onClick={() => handleNavClick('history')}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm ${
                activeTab === 'history' ? 'bg-[#66513F] text-white' : 'text-[#3B2C21] hover:bg-white/60'
              }`}
            >
              🕒 Riwayat Pesanan Saya
            </button>

            <div className="pt-3 border-t border-[#A8B69B]/30 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenMembership();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8C77D]/30 text-[#3B2C21] text-xs font-bold"
              >
                <Award className="w-4 h-4 text-[#C9A048]" />
                <span>Poin MORI: {moriPoints} Pts</span>
              </button>

              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A8B69B]/30 text-[#3B2C21] text-xs font-bold"
              >
                <ChefHat className="w-4 h-4 text-[#4E623E]" />
                <span>Simulasi Dapur</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
