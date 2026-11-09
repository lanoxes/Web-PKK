import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  CalendarDays, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Flame, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface WeeklySubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklySubscriptionModal: React.FC<WeeklySubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const [selectedPlan, setSelectedPlan] = useState<'student' | 'fitness' | 'glow'>('student');
  const [deliveryHour, setDeliveryHour] = useState('06:45 - 07:15 WIB');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'student',
      name: 'Paket Pelajar & Mahasiswa Cerdas',
      tagline: 'Hemat 25% • 5 Hari Senin - Jumat',
      price: 115000,
      originalPrice: 145000,
      badge: 'Paling Populer',
      caloriesAvg: '280 kcal/hari',
      schedule: [
        { day: 'Senin', menu: 'Berry Vanilla Overnight Oats' },
        { day: 'Selasa', menu: 'Choco Banana High-Protein Oats' },
        { day: 'Rabu', menu: 'Classic Greek Granola Bowl' },
        { day: 'Kamis', menu: 'Mango Coconut Oats Jar' },
        { day: 'Jumat', menu: 'Apple Cinnamon Warm Oatmeal' }
      ]
    },
    {
      id: 'fitness',
      name: 'Paket High-Protein Fitness Starter',
      tagline: 'Padat Protein • 18-24g/porsi',
      price: 145000,
      originalPrice: 175000,
      badge: 'High Protein',
      caloriesAvg: '360 kcal/hari',
      schedule: [
        { day: 'Senin', menu: 'Choco Banana High-Protein Oats' },
        { day: 'Selasa', menu: 'Smoked Chicken & Egg Sourdough' },
        { day: 'Rabu', menu: 'Peanut Butter Power Bowl' },
        { day: 'Kamis', menu: 'Spinach & Mushroom Wrap' },
        { day: 'Jumat', menu: 'Berry Blast Protein Shake + Oats Jar' }
      ]
    },
    {
      id: 'glow',
      name: 'Paket Glow & Natural Detox',
      tagline: '100% Buah & Superfood Alami',
      price: 135000,
      originalPrice: 165000,
      badge: 'Vegan & Superfood',
      caloriesAvg: '240 kcal/hari',
      schedule: [
        { day: 'Senin', menu: 'Tropical Dragon Acai Bowl' },
        { day: 'Selasa', menu: 'Sunrise Glow Cold Pressed Juice + Oats' },
        { day: 'Rabu', menu: 'Strawberry Glow Chia Bowl' },
        { day: 'Kamis', menu: 'Green Detox Morning Smoothie + Toast' },
        { day: 'Jumat', menu: 'Matcha Chia Overnight Oats' }
      ]
    }
  ];

  const current = plans.find((p) => p.id === selectedPlan) || plans[0];

  const handleSubscribe = () => {
    // Add subscription package to cart
    addToCart({
      isCustomBowl: false,
      product: {
        id: `sub-${current.id}-${Date.now()}`,
        name: `Langganan Mingguan: ${current.name}`,
        category: 'MORI OATS',
        price: current.price,
        originalPrice: current.originalPrice,
        description: `Paket sarapan 5 hari (Senin-Jumat). Diantar rutin tiap pagi pada slot ${deliveryHour}.`,
        calories: 300,
        protein: 15,
        carbs: 40,
        fat: 6,
        fiber: 7,
        ingredients: ['5 menu sarapan segar berganti tiap hari', 'Termasuk pengantaran rutin'],
        allergens: ['Disesuaikan per hari'],
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
        badge: 'Weekly Plan',
        tags: ['quick-prep', 'low-sugar']
      },
      quantity: 1,
      unitPrice: current.price,
      itemNotes: `Paket Langganan 5 Hari (${deliveryHour})`
    });

    onClose();
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#3B2C21]/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#FAF8F2] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#A8B69B]/40 my-8 z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#66513F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#E8C77D] text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Fitur Khusus Pelanggan Rutin</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">
            Paket Langganan Sarapan Mingguan
          </h2>
          <p className="text-xs text-[#F2EFE5]/80 mt-1">
            Sarapan sehat diantar otomatis tiap Senin s/d Jumat ke kos atau kantormu. Bebas ribet, hemat hingga 25%!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Plan Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#66513F] bg-white shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white/60'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8C77D]/30 text-[#3B2C21] inline-block mb-1.5">
                      {p.badge}
                    </span>
                    <h4 className="font-display font-bold text-xs text-[#3B2C21] leading-snug">
                      {p.name}
                    </h4>
                    <p className="text-[10px] text-[#66513F]/80 mt-1">{p.tagline}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <span className="font-extrabold text-sm text-[#66513F]">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through ml-1.5">
                      Rp {p.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Schedule Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-[#A8B69B]/30 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 className="font-bold text-xs text-[#3B2C21] uppercase tracking-wider">
                Jadwal Menu 5 Hari ({current.name})
              </h4>
              <span className="text-[11px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                {current.caloriesAvg}
              </span>
            </div>

            <div className="space-y-2">
              {current.schedule.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#F2EFE5]/50 border border-[#A8B69B]/20"
                >
                  <span className="font-bold text-[#66513F] w-16">{item.day}</span>
                  <span className="font-semibold text-[#3B2C21] flex-1 truncate text-left">
                    {item.menu}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Fresh
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Slot Choice */}
          <div>
            <label className="text-xs font-bold text-[#3B2C21] block mb-1.5 uppercase tracking-wider">
              Jam Pengantaran Pagi Rutin
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                '06:45 - 07:15 WIB (Sebelum Kelas)',
                '07:30 - 08:00 WIB (Pagi Nyaman)'
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setDeliveryHour(slot)}
                  className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                    deliveryHour === slot
                      ? 'bg-[#66513F] text-white border-[#66513F]'
                      : 'bg-white text-[#3B2C21] border-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#F2EFE5] border-t border-[#A8B69B]/30 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#66513F] block font-semibold">Total Paket (5 Hari):</span>
            <span className="font-display font-black text-xl text-[#66513F]">
              Rp {current.price.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8C77D]" />
            <span>Masukkan Paket ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
