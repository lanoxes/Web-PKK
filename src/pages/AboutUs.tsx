import React from 'react';
import { TEAM_MEMBERS } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Users,
  ArrowRight
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setActiveTab } = useCart();

  const brandValues = [
    {
      icon: Leaf,
      title: '100% Real Food & Fresh',
      desc: 'Kami menggunakan oats rolled murni, buah-buahan segar lokal, kacang panggang asli, tanpa pemanis buatan atau sirup jagung.'
    },
    {
      icon: Heart,
      title: 'Ramah Kantong Pelajar',
      desc: 'Sarapan bernutrisi seimbang mulai Rp 22.000 agar mahasiswa & pelajar bisa menikmati makanan berkualitas setiap pagi.'
    },
    {
      icon: ShieldCheck,
      title: 'Praktis & Tepat Waktu',
      desc: 'Pagi hari begitu berharga. Menu MORI siap santap dan diantar ke kosan/kampus sebelum kelas pagi dimulai.'
    },
    {
      icon: Sparkles,
      title: 'Kemasan Ramah Lingkungan',
      desc: 'Komitmen kami pada bumi: Jar kaca dapat digunakan kembali, mangkuk serat bagasse biodegradable, dan sendok kayu.'
    }
  ];

  return (
    <div className="py-8 sm:py-16 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A8B69B]/30 text-[#3B2C21] text-xs font-bold border border-[#A8B69B]/50">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Cerita di Balik MORI</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#3B2C21] tracking-tight">
            A Better Start, Every Day.
          </h1>
          <p className="text-base sm:text-lg text-[#66513F]/80 leading-relaxed">
            MORI lahir dari kegelisahan bersama: banyak pelajar, mahasiswa, dan pekerja muda yang melewatkan sarapan atau terpaksa mengonsumsi makanan cepat saji berminyak karena keterbatasan waktu dan biaya.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#A8B69B]/30 shadow-xs">
          <div className="space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#A8B69B]">
              Filosofi Brand
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3B2C21]">
              Sarapan Berkualitas Bukan Kemewahan, Melainkan Hak Setiap Pagi
            </h2>
            <p className="text-sm text-[#66513F] leading-relaxed">
              Nama <strong>MORI</strong> terinspirasi dari kata <em>"Morning"</em> dan <em>"Mori"</em> (dalam bahasa Jepang berarti hutan yang segar dan asri). Kami percaya bahwa apa yang masuk ke dalam tubuhmu di pagi hari menentukan fokus pikiran, suasana hati, dan energi sepanjang hari.
            </p>
            <p className="text-sm text-[#66513F] leading-relaxed">
              Dengan mengombinasikan oats kaya beta-glukan, chia seeds tinggi omega-3, greek yogurt kaya probiotik, serta buah segar tropis Indonesia, MORI menghadirkan pengalaman sarapan yang tidak hanya lezat namun menyehatkan tubuh secara jangka panjang.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('menu')}
                className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-3 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Lihat Pilihan Menu Kami</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8C77D]" />
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96 bg-[#E8DFD0]">
            <img
              src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1000&q=80"
              alt="MORI Breakfast Preparation"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 w-14 h-14 rounded-full overflow-hidden shadow-xl border-2 border-white bg-white z-10">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_jkk8mjjkk8mjjkk8_1e24e2af.jfif"
                alt="Logo Resmi MORI"
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <p className="text-xs font-semibold text-[#E8C77D]">Fresh Everyday</p>
                <p className="font-display font-bold text-lg">Dibuat dari Dapur Bersih Setiap Jam 05.00 Pagi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF8F2] rounded-3xl p-8 border border-[#A8B69B]/40 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A8B69B]/30 flex items-center justify-center text-[#4E623E]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#3B2C21]">
              Visi MORI
            </h3>
            <p className="text-sm text-[#66513F] leading-relaxed">
              Menjadi pionir healthy breakfast lifestyle nomor satu bagi generasi muda Indonesia, membuktikan bahwa makanan sehat bisa terasa sangat lezat, praktis, dan dapat dijangkau oleh semua kalangan.
            </p>
          </div>

          <div className="bg-[#FAF8F2] rounded-3xl p-8 border border-[#A8B69B]/40 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8C77D]/30 flex items-center justify-center text-[#C9A048]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#3B2C21]">
              Misi MORI
            </h3>
            <ul className="text-sm text-[#66513F] space-y-2 list-disc pl-4 leading-relaxed">
              <li>Menyajikan sarapan bergizi tinggi dengan bahan 100% alami tanpa pemanis buatan.</li>
              <li>Menjaga harga yang adil dan terjangkau khusus pelajar & mahasiswa.</li>
              <li>Membangun kebiasaan sarapan teratur melalui sistem pre-order dan langganan mingguan.</li>
              <li>Mengadopsi praktik ramah lingkungan dengan kemasan minim sampah plastik.</li>
            </ul>
          </div>
        </div>

        {/* 4 Brand Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
              Komitmen Kami
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3B2C21] mt-1">
              4 Pilar Utama MORI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#A8B69B]/30 shadow-2xs space-y-3 hover:border-[#A8B69B] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F2EFE5] flex items-center justify-center text-[#66513F]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-[#3B2C21]">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#66513F]/80 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tim Pengembang Sekolah (Per Brief) */}
        <div className="bg-[#FAF8F2] rounded-3xl p-8 sm:p-12 border border-[#A8B69B]/40 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#66513F] text-white text-xs font-bold">
              <Users className="w-3.5 h-3.5 text-[#E8C77D]" />
              <span>Tim Project MORI</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3B2C21]">
              Kenalkan Tim di Balik MORI
            </h2>
            <p className="text-xs sm:text-sm text-[#66513F]/80">
              Kolaborasi 4 siswa dengan pembagian peran terstruktur untuk mewujudkan konsep brand sarapan sehat berkualitas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-5 border border-[#A8B69B]/30 shadow-2xs flex flex-col justify-between space-y-4 text-center hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-[#F2EFE5] border-2 border-[#A8B69B] shadow-xs mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#3B2C21]">
                    {member.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#4E623E] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#66513F] mt-2.5 leading-relaxed text-left bg-[#F2EFE5] p-3 rounded-xl border border-[#A8B69B]/20">
                    {member.responsibility}
                  </p>
                </div>

                <p className="text-[11px] italic text-[#66513F]/75 border-t border-gray-100 pt-3">
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
