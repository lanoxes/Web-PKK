import React from 'react';
import { useCart } from '../../context/CartContext';
import { OrderRecord } from '../../types';
import { 
  X, 
  ChefHat, 
  Clock, 
  Truck, 
  CheckCircle2, 
  DollarSign, 
  Package, 
  Phone, 
  MapPin,
  RefreshCw
} from 'lucide-react';

interface AdminKitchenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminKitchenModal: React.FC<AdminKitchenModalProps> = ({ isOpen, onClose }) => {
  const { ordersHistory, updateOrderStatus } = useCart();

  if (!isOpen) return null;

  const totalRevenue = ordersHistory.reduce((sum, o) => sum + o.totalAmount, 0);

  const statuses: OrderRecord['status'][] = [
    'Menunggu Konfirmasi',
    'Sedang Disiapkan',
    'Dalam Pengantaran',
    'Selesai'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#3B2C21]/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#FAF8F2] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#A8B69B]/40 my-8 z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#3B2C21] text-white p-6 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E8C77D] text-xs font-bold uppercase tracking-wider mb-1">
              <ChefHat className="w-4 h-4" />
              <span>Simulasi Dashboard Dapur & Pesanan Masuk (Mode Demo Presentasi)</span>
            </div>
            <h2 className="font-display font-black text-2xl text-white">
              MORI Kitchen Order Manager
            </h2>
            <p className="text-xs text-[#F2EFE5]/75 mt-0.5">
              Kelola status pesanan pelanggan secara langsung untuk demonstrasi sistem pemesanan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#F2EFE5] border-b border-[#A8B69B]/30">
          <div className="bg-white p-4 rounded-2xl border border-[#A8B69B]/20 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Total Pesanan</span>
            <div className="font-display font-extrabold text-2xl text-[#3B2C21] mt-1">
              {ordersHistory.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#A8B69B]/20 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Omset Tercatat</span>
            <div className="font-display font-extrabold text-xl text-emerald-700 mt-1">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#A8B69B]/20 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Perlu Diproses</span>
            <div className="font-display font-extrabold text-2xl text-amber-600 mt-1">
              {ordersHistory.filter((o) => o.status !== 'Selesai').length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#A8B69B]/20 shadow-2xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase block">Pesanan Selesai</span>
            <div className="font-display font-extrabold text-2xl text-[#4E623E] mt-1">
              {ordersHistory.filter((o) => o.status === 'Selesai').length}
            </div>
          </div>
        </div>

        {/* Orders Table / List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {ordersHistory.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-[#66513F]/40 mx-auto" />
              <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                Belum Ada Pesanan Masuk
              </h3>
              <p className="text-xs text-[#66513F]/75 max-w-sm mx-auto">
                Silakan lakukan checkout terlebih dahulu di menu atau custom bowl untuk melihat data pesanan muncul secara real-time di sini!
              </p>
            </div>
          ) : (
            ordersHistory.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl p-5 border border-[#A8B69B]/30 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#3B2C21] bg-[#F2EFE5] px-2.5 py-1 rounded-md">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#3B2C21] mt-1">
                      {order.customerInfo.name} ({order.customerInfo.whatsapp})
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {statuses.map((st) => {
                      const isActive = order.status === st;
                      return (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(order.orderId, st)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                            isActive
                              ? 'bg-[#66513F] text-white shadow-2xs'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#66513F]">
                  <div className="bg-[#FAF8F2] p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Slot Waktu</span>
                    <span className="font-bold text-[#3B2C21]">{order.customerInfo.deliveryTimeSlot}</span>
                  </div>

                  <div className="bg-[#FAF8F2] p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Tipe & Alamat</span>
                    <span className="font-bold text-[#3B2C21] truncate block">
                      {order.customerInfo.orderType === 'delivery'
                        ? order.customerInfo.deliveryAddress
                        : order.customerInfo.outlet}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F2] p-2.5 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Pembayaran</span>
                    <span className="font-bold text-[#3B2C21]">
                      Rp {order.totalAmount.toLocaleString('id-ID')} ({order.customerInfo.paymentMethod.toUpperCase()})
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="text-xs space-y-1">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Menu:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#3B2C21]">
                    {order.items.map((it, idx) => (
                      <li key={idx}>
                        <strong>{it.isCustomBowl ? it.customBowl?.customName : it.product?.name}</strong> x{it.quantity}
                        {it.isCustomBowl && (
                          <span className="text-[11px] text-gray-500 ml-1">
                            (Base: {it.customBowl?.base.name}, Topping: {it.customBowl?.fruits.map(f => f.name).join(', ')})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
