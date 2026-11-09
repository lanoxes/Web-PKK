import React, { useState } from 'react';
import { MORI_OUTLETS } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useCart();
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCategory, setFormCategory] = useState('Pertanyaan Umum');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa lama MORI Overnight Oats tahan disimpan di kulkas?',
      a: 'Overnight oats MORI tahan 3 hingga 4 hari jika disimpan di dalam chiller/kulkas dengan suhu 2-4°C dalam kondisi tertutup rapat. Kami sarankan dikonsumsi segar di pagi hari agar tekstur buah dan crunch tetap renyah.'
    },
    {
      q: 'Apakah produk MORI menggunakan gula rafinasi atau pengawet?',
      a: 'Tidak sama sekali! MORI 100% bebas dari pemanis buatan, sirup jagung, dan bahan pengawet. Rasa manis alami didapatkan dari madu hutan liar murni, buah segar, atau selai stroberi homemade tanpa gula.'
    },
    {
      q: 'Apakah ada menu yang aman bagi penderita intoleransi laktosa (Dairy-Free)?',
      a: 'Tentu saja! Seluruh varian MORI OATS menggunakan susu nabati (oat milk homemade & almond milk). Kami juga memiliki menu yogurt kelapa dan chia seed pudding yang 100% dairy-free dan vegan-friendly.'
    },
    {
      q: 'Apakah bisa memesan untuk sarapan bersama kelas, kampus, atau rapat kantor?',
      a: 'Bisa banget! Kami melayani pemesanan katering sarapan dalam jumlah besar (20 - 200 pax) dengan harga spesial paket diskon. Anda dapat langsung menghubungi WhatsApp Customer Care kami H-1.'
    },
    {
      q: 'Bagaimana cara menggunakan kode promo diskon mahasiswa?',
      a: 'Masukkan kode promo MAHASISWA pada keranjang belanja untuk mendapatkan diskon 10%. Saat kurir mengantarkan, cukup tunjukkan Kartu Tanda Mahasiswa (KTM) atau kartu pelajar yang aktif.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;

    setSubmitted(true);
    showToast('Pesan Anda berhasil dikirim! Tim MORI akan segera menghubungi.');
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="py-8 sm:py-16 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A8B69B]/30 text-[#3B2C21] text-xs font-bold border border-[#A8B69B]/50">
            <PhoneCall className="w-3.5 h-3.5 text-[#4E623E]" />
            <span>Hubungi & Lokasi MORI</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3B2C21] tracking-tight">
            Kami Siap Membantu Pagimu
          </h1>
          <p className="text-sm sm:text-base text-[#66513F]/80">
            Punya pertanyaan mengenai nutrisi menu, katering sarapan kampus, atau kendala pemesanan? Jangan ragu hubungi kami!
          </p>
        </div>

        {/* 3 Outlets / Hubs */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B]">
              Lokasi Pengambilan & Dapur
            </span>
            <h2 className="font-display font-bold text-2xl text-[#3B2C21] mt-1">
              MORI Hub & Kitchen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MORI_OUTLETS.map((hub) => (
              <div
                key={hub.id}
                className="bg-white rounded-3xl p-6 border border-[#A8B69B]/30 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#66513F] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8C77D]/30 text-[#3B2C21]">
                      {hub.distance}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Buka Hari Ini</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#3B2C21]">
                    {hub.name}
                  </h3>

                  <div className="space-y-2 text-xs text-[#66513F]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#A8B69B] shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#A8B69B] shrink-0" />
                      <span>{hub.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-[#A8B69B] shrink-0" />
                      <span>{hub.phone}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/6281288997701?text=Halo%20${encodeURIComponent(hub.name)}%2C%20saya%20mau%20order%20sarapan`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#FAF8F2] hover:bg-[#F2EFE5] text-[#3B2C21] py-2.5 rounded-xl text-xs font-bold border border-[#A8B69B]/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#4E623E]" />
                  <span>Chat Hub WhatsApp</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Form & Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#A8B69B]/30 shadow-xs space-y-5">
            <div>
              <h3 className="font-display font-bold text-xl text-[#3B2C21]">
                Kirimkan Pesan atau Pertanyaan
              </h3>
              <p className="text-xs text-[#66513F]/80 mt-1">
                Isi formulir di bawah ini dan kami akan membalas via WhatsApp atau Email dalam 1x24 jam.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Pesan Berhasil Terkirim!</h4>
                <p className="text-xs text-emerald-700">
                  Terima kasih sudah menghubungi MORI. Tim kami akan segera menanggapi pertanyaanmu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      Nama Kamu <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Syafa"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      Email / No. WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="Cth: 0812xxxx atau email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                    Topik Keperluan
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 font-semibold text-[#3B2C21] focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                  >
                    <option value="Pertanyaan Umum">Pertanyaan Umum Seputar Menu</option>
                    <option value="Katering Sarapan Kampus/Kantor">Pemesanan Katering Kampus / Kantor</option>
                    <option value="Paket Langganan">Informasi Paket Langganan Mingguan</option>
                    <option value="Kritik & Saran">Kritik, Saran & Masukan Rasa</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                    Pesan Kamu <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pertanyaan atau kebutuhan sarapanmu di sini..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#66513F] hover:bg-[#3B2C21] text-white py-3 px-6 rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-[#E8C77D]" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            )}
          </div>

          {/* Socials & Fast Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F2] rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/40 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                Kontak Cepat
              </h3>
              <p className="text-xs text-[#66513F]/80">
                Untuk respon kilat di jam operasional (06.30 - 15.00 WIB), silakan gunakan WhatsApp Admin langsung:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/6281288997701?text=Halo%20Admin%20MORI%2C%20saya%20mau%20tanya%20seputar%20sarapan"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center gap-3 hover:bg-[#25D366]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#3B2C21]">WhatsApp Customer Care</h4>
                    <p className="text-[11px] text-[#66513F]">+62 812-8899-7701</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-pink-50 border border-pink-200 flex items-center gap-3 hover:bg-pink-100/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#3B2C21]">Instagram Resmi</h4>
                    <p className="text-[11px] text-[#66513F]">@mori.breakfast</p>
                  </div>
                </a>

                <div className="p-3.5 rounded-2xl bg-white border border-[#A8B69B]/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#66513F] text-white flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#3B2C21]">Email Kerjasama & Sekolah</h4>
                    <p className="text-[11px] text-[#66513F]">halo@moribreakfast.id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8B69B] flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#C9A048]" />
              FAQ (Tanya Jawab)
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3B2C21]">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#A8B69B]/30 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm text-[#3B2C21] hover:bg-[#FAF8F2] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#66513F] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#66513F] leading-relaxed border-t border-gray-100 bg-[#FAF8F2]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
