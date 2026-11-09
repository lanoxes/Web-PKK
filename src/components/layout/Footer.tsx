import React from 'react';
import { useCart } from '../../context/CartContext';
import { Instagram, MessageCircle, MapPin, Clock, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/products';

export const Footer: React.FC = () => {
  const { setActiveTab } = useCart();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3B2C21] text-[#F2EFE5] border-t border-[#66513F] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="bg-[#66513F] rounded-3xl p-8 mb-14 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#A8B69B]/20">
          <div>
            <div className="flex items-center gap-2 text-[#E8C77D] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Sarapan Sehat Tanpa Repot</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#FAF8F2]">
              Awali Harimu Bersama MORI
            </h3>
            <p className="text-sm text-[#F2EFE5]/80 mt-1 max-w-xl">
              Fresh overnight oats, nutritious yogurt bowls, & cold-pressed smoothies siap diantar ke kosan, kampus, atau kantormu tepat waktu.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('customize')}
              className="bg-[#A8B69B] hover:bg-[#92A384] text-[#3B2C21] px-5 py-3 rounded-full font-bold text-sm shadow-sm transition-transform active:scale-95"
            >
              Rakit Bowl Sendiri
            </button>
            <button
              onClick={() => handleNav('menu')}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors border border-white/20"
            >
              Lihat Menu
            </button>
          </div>
        </div>

        {/* 4 Columns Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-xs border-2 border-[#A8B69B]/50 bg-white shrink-0">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_jkk8mjjkk8mjjkk8_1e24e2af.jfif"
                  alt="MORI Healthy Breakfast Logo"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                MORI
              </span>
            </div>
            <p className="text-sm text-[#F2EFE5]/80 leading-relaxed">
              <strong>A Better Start, Every Day.</strong> Menyediakan opsi sarapan sehat, bergizi seimbang, dan ramah kantong bagi pelajar, mahasiswa, dan pekerja muda.
            </p>
            {/* Color Palette Indicators */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-[#A8B69B] uppercase tracking-wider mb-2">
                Brand Color Palette
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F2EFE5] text-[#3B2C21] font-mono text-[11px] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2EFE5] border border-black/20"></span>
                  Oat Cream
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#A8B69B] text-[#3B2C21] font-mono text-[11px] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A8B69B]"></span>
                  Sage
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8C77D] text-[#3B2C21] font-mono text-[11px] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8C77D]"></span>
                  Honey
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#FAF8F2] tracking-wide">
              Halaman Website
            </h4>
            <ul className="space-y-2 text-sm text-[#F2EFE5]/80 font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#E8C77D] transition-colors">
                  1. Home (Beranda & Pengenalan)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-[#E8C77D] transition-colors">
                  2. Our Menu (Katalog 4 Kategori)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('customize')} className="hover:text-[#E8C77D] transition-colors">
                  3. Customize Your Bowl (DIY Builder)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#E8C77D] transition-colors">
                  4. About Us (Visi, Misi & Tim)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#E8C77D] transition-colors">
                  5. Contact & Lokasi Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('history')} className="hover:text-[#E8C77D] transition-colors">
                  6. Riwayat Pesanan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Outlet & Jam Operasional */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#FAF8F2] tracking-wide">
              Jam & Lokasi Hub
            </h4>
            <div className="space-y-2.5 text-sm text-[#F2EFE5]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#A8B69B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Buka Setiap Hari</p>
                  <p className="text-xs text-[#F2EFE5]/70">06.30 - 15.00 WIB (Ready Pagi)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A8B69B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Hub Margonda Kampus</p>
                  <p className="text-xs text-[#F2EFE5]/70">Jl. Margonda Raya No. 42</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E8C77D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Higienis & 100% Halal</p>
                  <p className="text-xs text-[#F2EFE5]/70">Bahan alami tanpa pewarna sintetis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Project Team (Brief Assignment) */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#FAF8F2] tracking-wide">
              Tim Pengembang Project
            </h4>
            <div className="space-y-2 text-xs text-[#F2EFE5]/80">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.name} className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <span className="font-bold text-[#E8C77D]">{m.name}</span>
                  <span className="text-[#A8B69B] ml-1.5 text-[11px]">— {m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar & Socials */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2EFE5]/70">
          <div className="flex items-center gap-1.5">
            <span>© 2026 MORI Healthy Breakfast. Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>untuk tugas sekolah & presentasi project.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E8C77D] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#A8B69B]" />
              <span>@mori.breakfast</span>
            </a>
            <a
              href="https://wa.me/6281288997701?text=Halo%20MORI%2C%20saya%20mau%20tanya%20seputar%20sarapan%20sehat"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E8C77D] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#E8C77D]" />
              <span>WhatsApp Admin</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
