import React from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Award, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const { moriPoints, showToast } = useCart();

  if (!isOpen) return null;

  const rewards = [
    { title: 'Voucher Potongan Rp 10.000', cost: 100, desc: 'Dapat digunakan untuk semua menu Oats & Bowl' },
    { title: 'Gratis Extra Honey Granola', cost: 60, desc: 'Topping artisan granola renyah' },
    { title: 'Gratis Cold-Pressed Juice', cost: 180, desc: 'Sunrise Glow Juice 100% buah murni' },
    { title: 'Diskon 20% Paket Langganan', cost: 250, desc: 'Potongan hemat untuk paket sarapan mingguan' }
  ];

  const handleClaimReward = (title: string, cost: number) => {
    if (moriPoints < cost) {
      showToast(`Poin tidak cukup. Butuh ${cost} poin.`);
      return;
    }
    showToast(`Hadiah "${title}" berhasil diklaim!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#3B2C21]/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#FAF8F2] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#A8B69B]/40 my-8 z-10">
        {/* Header */}
        <div className="bg-[#66513F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#E8C77D] text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Program Loyalitas MORI Club</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">
            Membership & Poin Sarapan
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Digital Member Card */}
          <div className="bg-gradient-to-br from-[#A8B69B] to-[#677E57] rounded-3xl p-6 text-[#FAF8F2] shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 font-black text-9xl">
              M
            </div>

            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8C77D] bg-black/20 px-2.5 py-0.5 rounded-full">
                  Member Level: Oat Explorer
                </span>
                <h3 className="font-display font-black text-2xl mt-2 tracking-wide">
                  MORI REWARDS CARD
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#E8C77D]" />
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-end relative z-10">
              <div>
                <span className="text-[10px] text-white/70 block uppercase">Saldo Poin Kamu</span>
                <div className="font-display font-black text-3xl text-white">
                  {moriPoints} <span className="text-base font-bold text-[#E8C77D]">Pts</span>
                </div>
              </div>

              <div className="text-right text-[11px] text-white/80">
                <span>1 Poin per Rp 1.000</span>
              </div>
            </div>
          </div>

          {/* Point Rewards Catalog */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#3B2C21] uppercase tracking-wider flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#C9A048]" />
              <span>Katalog Hadiah Tukar Poin</span>
            </h4>

            <div className="space-y-2">
              {rewards.map((rew, idx) => {
                const canRedeem = moriPoints >= rew.cost;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-[#A8B69B]/30 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <h5 className="font-bold text-xs text-[#3B2C21]">{rew.title}</h5>
                      <p className="text-[11px] text-[#66513F]/75">{rew.desc}</p>
                    </div>

                    <button
                      onClick={() => handleClaimReward(rew.title, rew.cost)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        canRedeem
                          ? 'bg-[#66513F] text-white hover:bg-[#3B2C21]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Tukar {rew.cost} Pts
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-[#F2EFE5] rounded-2xl border border-[#A8B69B]/30 text-xs text-[#66513F] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#A8B69B] shrink-0" />
            <span>Poin otomatis bertambah setiap kamu menyelesaikan pesanan sarapan di MORI!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
