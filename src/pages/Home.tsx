import React from 'react';
import { useCart } from '../context/CartContext';
import { MORI_PRODUCTS } from '../data/products';
import { Product } from '../types';
import heroImage from '../assets/images/regenerated_image_1794199890350.png';
import { 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Heart, 
  Clock, 
  Flame, 
  Plus, 
  Eye, 
  CalendarDays, 
  ShieldCheck, 
  Star,
  CheckCircle2,
  UtensilsCrossed,
  Layers,
  Award
} from 'lucide-react';

interface HomeProps {
  onOpenSubscription: () => void;
  onOpenMembership: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenSubscription, onOpenMembership }) => {
  const { setActiveTab, setSelectedProductForDetail, addToCart } = useCart();

  // Curate best sellers and featured items
  const bestSellers = MORI_PRODUCTS.filter((p) => p.badge?.includes('Best Seller') || p.badge?.includes('Favorit')).slice(0, 4);

  const categories = [
    {
      id: 'MORI OATS',
      title: 'MORI OATS',
      desc: 'Overnight oats & warm oatmeal lembut bernutrisi.',
      image: 'https://www.theconsciousplantkitchen.com/wp-content/uploads/2025/02/Banana-Chocolate-Overnight-Oats-3.jpg',
      badge: '5 Varian'
    },
    {
      id: 'MORI BOWL',
      title: 'MORI BOWL',
      desc: 'Greek yogurt & superfood smoothie bowls kaya antioksidan.',
      image: 'https://i.imgur.com/OeBkiKD.jpg',
      badge: '4 Varian'
    },
    {
      id: 'MORI BITES',
      title: 'MORI BITES',
      desc: 'Artisan sourdough, egg wrap, & toast on-the-go.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYRx_nCBvB7GA-lDrdLnqpKLdTct60_UTBjMDhLPwMrNZ-y6nBYMGBxFnx&s=10',
      badge: '4 Varian'
    },
    {
      id: 'MORI DRINKS',
      title: 'MORI DRINKS',
      desc: '100% pure cold-pressed juice, matcha oat, & protein shakes.',
      image: 'https://feedingyourbeauty.com/wp-content/uploads/2014/11/p2121127.jpg',
      badge: '5 Varian'
    }
  ];

  const testimonials = [
    {
      name: 'Anisa',
      role: 'murid xii tkj 4',
      text: 'Biasa skip sarapan atau beli gorengan sebelum kelas jam 8. Sejak ada MORI Oats jar, praktis banget bisa makan di selasar sekolah dan kenyang sampai siang!',
      avatar: '/assets/aistudio/image_e547750c.png',
      rating: 5,
      menu: 'Berry Vanilla Oats'
    },
    {
      name: 'Farhan',
      role: 'Master IoT',
      text: 'Langganan paket 5 hari senin-jumat sangat ngebantu hidup anak kos. Jam 7 pagi sudah sampai di lobi kosan, hemat waktu banget sebelum meeting pagi.',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqugxujK4ZG4tvKPoOIbI9V5E7-8uMWBtwSG2mzfpTAg&s=10',
      rating: 5,
      menu: 'Paket High-Protein'
    },
    {
      name: 'Agoy',
      role: 'Master Valorant',
      text: 'Fitur Customize Your Bowl-nya seru banget! Bisa pilih yogurt plain sama buah stroberi & granola sesuka hati, harganya juga affordable banget di kantong.',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfOhe-OB_-lIPmkqdhJBmveYq8H6EZpfUPSeFhlocjbQ&s=10',
      rating: 5,
      menu: 'DIY Custom Bowl'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B69B]/25 text-[#4E623E] text-xs font-extrabold border border-[#A8B69B]/40 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#4E623E]" />
                <span>Healthy Breakfast for Gen Z & Young Professionals</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#3B2C21] tracking-tight leading-[1.12]">
                A Better Start, <br />
                <span className="text-[#66513F] relative inline-block">
                  Every Single Day.
                  <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E8C77D]/50 -z-10 rounded-sm"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#66513F]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Sarapan sehat, praktis, dan ramah kantong. Mulai harimu dengan overnight oats lembut, yogurt granola renyah, dan buah segar lokal pilihan.
              </p>

              {/* Badges Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#3B2C21] pt-1">
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#A8B69B]/30 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Real Food Alami</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#A8B69B]/30 shadow-2xs">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Mulai Rp 22.000</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#A8B69B]/30 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#A8B69B]" />
                  <span>Antar Pagi 06.30 - 08.30</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[#66513F] hover:bg-[#3B2C21] text-white px-7 py-4 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <UtensilsCrossed className="w-4 h-4 text-[#E8C77D]" />
                  <span>Jelajahi Menu MORI</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('customize');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[#A8B69B] hover:bg-[#92A384] text-[#3B2C21] px-7 py-4 rounded-full font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-95 border border-[#A8B69B]/50"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A048]" />
                  <span>Rakit Bowl Sendiri (DIY)</span>
                </button>
              </div>

            </div>

            {/* Right Hero Visual Showcase (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Food Photo */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-[#FAF8F2] aspect-square relative group">
                  <img
                    src={heroImage}
                    alt="MORI Healthy Breakfast Bowl"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating Micro Tag */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                        Favorite Pick
                      </div>
                      <div className="font-display font-extrabold text-sm text-[#3B2C21]">
                        Berry Vanilla Overnight Oats
                      </div>
                      <div className="text-xs text-[#66513F] font-bold">Rp 26.000</div>
                    </div>
                    <button
                      onClick={() => {
                        const berry = MORI_PRODUCTS.find((p) => p.id === 'oats-1');
                        if (berry) setSelectedProductForDetail(berry);
                      }}
                      className="p-2.5 rounded-xl bg-[#66513F] text-white hover:bg-[#3B2C21] transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Floating Official Brand Emblem Pill */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl border border-[#A8B69B]/30 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#A8B69B]/40 shrink-0 shadow-xs">
                    <img
                      src="/assets/aistudio/Gemini_Generated_Image_jkk8mjjkk8mjjkk8_1e24e2af.jfif"
                      alt="MORI Official Logo Badge"
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                  <div className="pr-1">
                    <div className="font-display font-extrabold text-xs text-[#3B2C21]">MORI MORI</div>
                    <div className="text-[10px] font-bold text-[#4E623E]">Healthy Breakfast</div>
                  </div>
                </div>

                {/* Floating Nutrition Pill */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-[#A8B69B]/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A8B69B]/30 flex items-center justify-center text-[#4E623E]">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[#3B2C21]">Zero Refined Sugar</div>
                    <div className="text-[10px] text-[#66513F]/80">Madu Alami & Buah Segar</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY SHORTCUTS (4 CATEGORIES FROM BRIEF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
            Pilihan Kategori Sarapan
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#3B2C21] mt-1">
            Menu Sehat untuk Setiap Selera
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-3xl overflow-hidden border border-[#A8B69B]/30 shadow-xs hover:shadow-md hover:border-[#66513F] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-[#E8DFD0] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 text-[#3B2C21] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {cat.badge}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-[#3B2C21] group-hover:text-[#66513F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#66513F]/80 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#66513F]">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-4 h-4 text-[#A8B69B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED & BEST SELLER PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A048]" />
              <span>Produk Unggulan</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#3B2C21] mt-1">
              Menu Terfavorit Minggu Ini
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#66513F] hover:text-[#3B2C21] flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Lihat Semua Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductForDetail(product)}
              className="bg-white rounded-3xl overflow-hidden border border-[#A8B69B]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative h-48 w-full bg-[#E8DFD0] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A8B69B] text-[#3B2C21]">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8C77D] text-[#3B2C21]">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display font-bold text-base text-[#3B2C21] group-hover:text-[#66513F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#66513F]/80 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#66513F]">
                  <span className="flex items-center gap-1 bg-[#F2EFE5] px-2 py-0.5 rounded-lg text-orange-800">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {product.calories} kcal
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg font-bold">
                    {product.protein}g protein
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-display font-black text-base text-[#66513F]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        product,
                        isCustomBowl: false,
                        quantity: 1,
                        unitPrice: product.price
                      });
                    }}
                    className="p-2.5 rounded-2xl bg-[#A8B69B] hover:bg-[#66513F] hover:text-white text-[#3B2C21] transition-all shadow-2xs active:scale-95"
                    title="Tambah ke Keranjang"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIY BOWL INTERACTIVE TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF8F2] to-[#EBF1E8] rounded-[40px] p-8 sm:p-14 border border-[#A8B69B]/40 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8C77D] text-[#3B2C21] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#3B2C21]" />
                <span>Fitur Unggulan DIY</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3B2C21] tracking-tight">
                Customize Your Bowl: <br />
                Kreasikan Sarapan Impianmu
              </h2>

              <p className="text-sm sm:text-base text-[#66513F]/85 leading-relaxed">
                Punya preferensi nutrisi sendiri? Gunakan builder interaktif kami untuk memilih 5 base segar (Overnight Oats, Greek Yogurt, Chia Seed, Acai, atau Kyoto Matcha), buah-buahan lokal, granola madu artisan, dan drizzle alami!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-[#3B2C21]">
                <div className="bg-white/80 p-3 rounded-2xl border border-[#A8B69B]/30 text-center">
                  <div className="text-xl mb-1">🥣</div>
                  <span>1. Pilih Base</span>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#A8B69B]/30 text-center">
                  <div className="text-xl mb-1">🍓</div>
                  <span>2. Pilih Buah</span>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#A8B69B]/30 text-center">
                  <div className="text-xl mb-1">🥣</div>
                  <span>3. Pilih Crunch</span>
                </div>
                <div className="bg-white/80 p-3 rounded-2xl border border-[#A8B69B]/30 text-center">
                  <div className="text-xl mb-1">🍯</div>
                  <span>4. Drizzle Madu</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setActiveTab('customize');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-8 py-4 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#E8C77D]" />
                  <span>Coba Rakit Bowl Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              {/* Visual Bowl Graphic Teaser */}
              <div className="relative w-64 h-56 sm:w-72 sm:h-64 rounded-3xl bg-white p-6 shadow-xl border border-[#A8B69B]/30 flex flex-col items-center justify-center text-center">
                <div className="w-36 h-28 rounded-b-[50px] rounded-t-lg bg-[#E8DFD0] border-4 border-[#3B2C21] flex flex-col items-center justify-center shadow-md relative overflow-hidden">
                  <span className="text-2xl">🍓 🍌 🍇</span>
                  <span className="text-xs font-bold text-[#3B2C21] mt-1">Granola Crunch</span>
                </div>
                <span className="font-display font-extrabold text-sm text-[#3B2C21] mt-4">
                  Interactive Live Stacker
                </span>
                <span className="text-[11px] text-[#66513F]/75">
                  Hitung kalori & harga real-time!
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MENGAPA MEMILIH MORI? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
            Keunggulan Brand
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#3B2C21] mt-1">
            Mengapa Sarapan Bersama MORI?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-[#A8B69B]/30 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A8B69B]/25 flex items-center justify-center text-[#4E623E]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#3B2C21]">
              100% Real Food
            </h3>
            <p className="text-xs text-[#66513F]/80 leading-relaxed">
              Bebas pengawet sintetis dan perasa buatan. Pemanis murni dari buah segar dan madu hutan lokal.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#A8B69B]/30 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8C77D]/30 flex items-center justify-center text-[#C9A048]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#3B2C21]">
              Ramah Kantong Pelajar
            </h3>
            <p className="text-xs text-[#66513F]/80 leading-relaxed">
              Harga menu sarapan mulai Rp 22.000 dengan porsi padat energi yang mengenyangkan hingga siang.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#A8B69B]/30 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#66513F]/15 flex items-center justify-center text-[#66513F]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#3B2C21]">
              Siap Pagi Tepat Waktu
            </h3>
            <p className="text-xs text-[#66513F]/80 leading-relaxed">
              Diantar ke kosan atau kampus mulai jam 06.30 WIB sebelum kuliah atau jam kantor dimulai.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#A8B69B]/30 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#3B2C21]">
              Eco-Friendly Packaging
            </h3>
            <p className="text-xs text-[#66513F]/80 leading-relaxed">
              Jar kaca reusable dan mangkuk serat tebu bagasse yang ramah lingkungan dan minim plastik.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WEEKLY SUBSCRIPTION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#66513F] text-white rounded-[36px] p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-[#A8B69B]/30">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8C77D] flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              <span>Paket Langganan Mingguan (Senin - Jumat)</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FAF8F2]">
              Sarapan Rutin Terjadwal, Hemat Hingga 25%
            </h2>
            <p className="text-xs sm:text-sm text-[#F2EFE5]/80 leading-relaxed">
              Tak perlu pusing memikirkan sarapan setiap pagi. Kami kirimkan menu variatif setiap Senin hingga Jumat ke alamat kos atau kantormu tepat waktu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenSubscription}
              className="bg-[#E8C77D] hover:bg-[#d9b666] text-[#3B2C21] px-7 py-3.5 rounded-full font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              Lihat Pilihan Paket Langganan
            </button>
            <button
              onClick={onOpenMembership}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-full font-bold text-xs border border-white/20 transition-colors"
            >
              Cek Poin Member
            </button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
            Ulasan Pelanggan
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#3B2C21] mt-1">
            Kata Mereka Tentang MORI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/30 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C9A048]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A048]" />
                  ))}
                </div>
                <p className="text-xs text-[#66513F] leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#A8B69B]/40"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#3B2C21]">{t.name}</h4>
                  <p className="text-[10px] text-gray-500">{t.role} • {t.menu}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
