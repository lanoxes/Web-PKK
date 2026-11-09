import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderRecord } from '../types';
import { OrderSuccessModal } from '../components/modals/OrderSuccessModal';
import { 
  History, 
  ShoppingBag, 
  Clock, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  PackageCheck,
  ChevronRight 
} from 'lucide-react';

export const OrderHistoryPage: React.FC = () => {
  const { ordersHistory, setActiveTab } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  if (ordersHistory.length === 0) {
    return (
      <div className="py-20 bg-[#F2EFE5] min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 space-y-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto shadow-2xs border border-[#A8B69B]/30">
            <History className="w-10 h-10 text-[#66513F]/50" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#3B2C21]">
            Belum Ada Riwayat Pesanan
          </h2>
          <p className="text-xs text-[#66513F]/80">
            Pesanan sarapan yang Anda buat akan tercatat otomatis di sini untuk memudahkan pelacakan status.
          </p>
          <button
            onClick={() => setActiveTab('menu')}
            className="bg-[#66513F] text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#3B2C21] transition-transform active:scale-95"
          >
            Pesan Sarapan Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B69B]/30 text-[#3B2C21] text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5 text-[#4E623E]" />
            <span>Tersimpan di Perangkat Anda</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#3B2C21]">
            Riwayat Pesanan MORI
          </h1>
          <p className="text-xs text-[#66513F]/80 mt-1">
            Lihat kembali detail dan status pesanan sarapan Anda.
          </p>
        </div>

        <div className="space-y-4">
          {ordersHistory.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#A8B69B]/30 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#66513F] transition-all"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-[#F2EFE5] px-2.5 py-1 rounded-md text-[#3B2C21]">
                    {order.orderId}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#3B2C21]">
                  {order.items.length} menu • Slot: {order.customerInfo.deliveryTimeSlot}
                </div>

                <p className="text-[11px] text-[#66513F]/80 truncate">
                  {order.items.map((i) => (i.isCustomBowl ? i.customBowl?.customName : i.product?.name)).join(', ')}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-gray-400 block font-semibold">Total Tagihan</span>
                  <span className="font-display font-extrabold text-base text-[#66513F]">
                    Rp {order.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-[#FAF8F2] hover:bg-[#F2EFE5] border border-[#A8B69B]/40 text-[#3B2C21] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#4E623E]" />
                  <span>Lihat Bukti / Lacak</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedOrder && (
        <OrderSuccessModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
