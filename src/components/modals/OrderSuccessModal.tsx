import React, { useState } from 'react';
import { OrderRecord } from '../../types';
import { useCart } from '../../context/CartContext';
import { 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  X, 
  Copy, 
  Check, 
  ArrowRight,
  ChefHat,
  Truck,
  Sparkles
} from 'lucide-react';

interface OrderSuccessModalProps {
  order: OrderRecord;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const { setActiveTab } = useCart();
  const [copied, setCopied] = useState(false);

  // Generate pre-filled WhatsApp message
  const generateWhatsAppMessage = () => {
    const itemsList = order.items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.isCustomBowl ? i.customBowl?.customName : i.product?.name} x${i.quantity} = Rp ${i.totalPrice.toLocaleString('id-ID')}`
      )
      .join('%0A');

    const text = `Halo MORI Healthy Breakfast! 🥣%0ASaya ingin konfirmasi pesanan saya:%0A%0A*No. Pesanan:* ${order.orderId}%0A*Nama:* ${order.customerInfo.name}%0A*No. WhatsApp:* ${order.customerInfo.whatsapp}%0A*Tipe:* ${order.customerInfo.orderType.toUpperCase()}%0A*Slot Waktu:* ${order.customerInfo.deliveryTimeSlot}%0A*Lokasi / Alamat:* ${order.customerInfo.deliveryAddress || order.customerInfo.outlet}%0A%0A*Daftar Menu:*%0A${itemsList}%0A%0A*Total Bayar:* Rp ${order.totalAmount.toLocaleString('id-ID')} (${order.customerInfo.paymentMethod.toUpperCase()})%0A%0AMohon diproses ya MORI, terima kasih! ✨`;
    return `https://wa.me/6281288997701?text=${text}`;
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status index for timeline tracker
  const statusSteps = [
    { title: 'Menunggu Konfirmasi', icon: Clock },
    { title: 'Sedang Disiapkan di Dapur', icon: ChefHat },
    { title: 'Dalam Pengantaran', icon: Truck },
    { title: 'Pesanan Selesai', icon: CheckCircle2 }
  ];

  const currentStepIndex =
    order.status === 'Menunggu Konfirmasi'
      ? 0
      : order.status === 'Sedang Disiapkan'
      ? 1
      : order.status === 'Dalam Pengantaran'
      ? 2
      : 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#3B2C21]/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative bg-[#FAF8F2] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-[#A8B69B]/40 my-8 z-10">
        
        {/* Header Ribbon */}
        <div className="bg-[#66513F] text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#E8C77D] text-[#3B2C21] flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-[#3B2C21]" />
          </div>

          <h2 className="font-display font-extrabold text-2xl text-white">
            Pesanan Berhasil Dibuat!
          </h2>
          <p className="text-xs text-[#F2EFE5]/80 mt-1">
            Terima kasih telah memilih sarapan sehat bersama MORI.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-mono font-bold mt-3 border border-white/20">
            <span>ID Pesanan: {order.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-[#E8C77D] hover:text-white"
              title="Salin ID"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Timeline Status Tracker */}
          <div className="bg-[#F2EFE5] rounded-2xl p-4 border border-[#A8B69B]/30">
            <h4 className="text-xs font-bold text-[#66513F] uppercase tracking-wider mb-3">
              Pelacak Status Pesanan
            </h4>
            <div className="grid grid-cols-4 gap-2 relative">
              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#66513F] text-white ring-4 ring-[#E8C77D]'
                          : isPassed
                          ? 'bg-[#A8B69B] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3B2C21] mt-1.5 leading-tight">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Delivery Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block">Pelanggan</span>
              <p className="font-bold text-[#3B2C21] truncate">{order.customerInfo.name}</p>
              <p className="text-[#66513F]">{order.customerInfo.whatsapp}</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-semibold block">Waktu Sarapan</span>
              <p className="font-bold text-[#3B2C21] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#A8B69B]" />
                {order.customerInfo.deliveryTimeSlot}
              </p>
              <p className="text-[11px] text-[#66513F]">{order.customerInfo.orderType.toUpperCase()}</p>
            </div>
          </div>

          {/* Items Summary list */}
          <div className="bg-white rounded-2xl p-4 border border-[#A8B69B]/30 max-h-48 overflow-y-auto space-y-2">
            <h4 className="text-xs font-bold text-[#3B2C21] border-b border-gray-100 pb-2">
              Menu Dipesan ({order.items.length} item)
            </h4>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <div className="flex-1 truncate pr-2">
                  <span className="font-semibold text-[#3B2C21]">
                    {item.isCustomBowl ? item.customBowl?.customName : item.product?.name}
                  </span>
                  <span className="text-gray-500 ml-1.5 font-bold">x{item.quantity}</span>
                </div>
                <span className="font-bold text-[#66513F]">
                  Rp {item.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          {/* Payment & Total Amount */}
          <div className="flex items-center justify-between bg-[#E8C77D]/25 p-3.5 rounded-2xl border border-[#E8C77D]/50">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#66513F] block">
                Metode Pembayaran
              </span>
              <span className="font-bold text-xs text-[#3B2C21] uppercase">
                {order.customerInfo.paymentMethod}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#66513F] font-semibold block">Total Akhir</span>
              <span className="font-display font-black text-xl text-[#66513F]">
                Rp {order.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Kirim Pesanan ke WhatsApp MORI</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('history');
                }}
                className="w-full bg-white border border-[#A8B69B]/40 hover:bg-[#F2EFE5] text-[#3B2C21] py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Lihat Riwayat Pesanan
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('home');
                }}
                className="w-full bg-[#66513F] hover:bg-[#3B2C21] text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
