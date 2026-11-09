import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MORI_OUTLETS } from '../data/products';
import { CheckoutCustomerInfo, OrderRecord } from '../types';
import { OrderSuccessModal } from '../components/modals/OrderSuccessModal';
import { 
  ArrowLeft, 
  Truck, 
  Store, 
  Clock, 
  MapPin, 
  QrCode, 
  Wallet, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    totalAmount,
    orderType,
    setOrderType,
    placeOrder,
    setActiveTab,
    appliedPromo
  } = useCart();

  // Form state
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState(MORI_OUTLETS[0].name);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Besok Pagi: 06:45 - 07:30 WIB');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'gopay' | 'bca' | 'cod'>('qris');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const timeSlots = [
    'Pagi Ini Segera (07:00 - 08:00 WIB)',
    'Besok Pagi: 06:30 - 07:15 WIB (Sebelum Kuliah)',
    'Besok Pagi: 07:15 - 08:00 WIB (Sarapan Utama)',
    'Besok Pagi: 08:00 - 09:00 WIB (Santai)',
    'Siang Sehat: 11:30 - 12:30 WIB'
  ];

  if (cartItems.length === 0 && !createdOrder) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-display font-bold text-2xl text-[#3B2C21]">
          Tidak Ada Menu untuk di-Checkout
        </h2>
        <p className="text-sm text-[#66513F]/80 mt-2 mb-6">
          Keranjang belanja Anda kosong. Silakan pilih menu sarapan terlebih dahulu.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="bg-[#66513F] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#3B2C21]"
        >
          Lihat Menu MORI
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Mohon masukkan nama lengkap Anda.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setErrorMessage('Mohon masukkan nomor WhatsApp yang valid untuk konfirmasi.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Mohon masukkan alamat pengantaran lengkap beserta patokan kos/kantor.');
      return;
    }

    const customerInfo: CheckoutCustomerInfo = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      orderType,
      outlet: orderType === 'pickup' ? selectedOutlet : '',
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : '',
      deliveryTimeSlot,
      notes: notes.trim(),
      paymentMethod
    };

    const newOrder = placeOrder(customerInfo);
    setCreatedOrder(newOrder);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => setActiveTab('cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66513F] hover:text-[#3B2C21]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Keranjang</span>
          </button>
        </div>

        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3B2C21] tracking-tight">
            Checkout Pesanan Sarapan
          </h1>
          <p className="text-sm text-[#66513F]/80 mt-1">
            Lengkapi data pemesanan dan pilih metode pembayaran favoritmu.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer Info, Slot, Delivery & Payment (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Data Pelanggan */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/30 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-lg text-[#3B2C21] flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span>1. Data Pelanggan</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Janandra / Syafa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      No. WhatsApp Aktif <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Cth: 081288997701"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      Alamat Email (Opsional, untuk e-receipt)
                    </label>
                    <input
                      type="email"
                      placeholder="Cth: emailkamu@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Metode Pengantaran & Alamat / Hub */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/30 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-lg text-[#3B2C21] flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span>2. Metode & Waktu Sarapan</span>
                </h3>

                {/* Delivery or Pickup Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setOrderType('delivery')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      orderType === 'delivery'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#A8B69B]/30 flex items-center justify-center text-[#4E623E]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B2C21]">Delivery Antar</h4>
                      <p className="text-[11px] text-[#66513F]">Kurir MORI ke lokasimu</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setOrderType('pickup')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      orderType === 'pickup'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#E8C77D]/30 flex items-center justify-center text-[#C9A048]">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B2C21]">Ambil di Hub (Pick-up)</h4>
                      <p className="text-[11px] text-[#66513F]">Bebas biaya ongkir</p>
                    </div>
                  </div>
                </div>

                {/* Slot Waktu Pengantaran */}
                <div>
                  <label className="text-xs font-bold text-[#3B2C21] block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A8B69B]" />
                    <span>Pilih Slot Waktu Pengantaran Sarapan</span>
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 font-bold text-[#3B2C21] focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Address or Outlet Picker */}
                {orderType === 'delivery' ? (
                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>Alamat Lengkap & Patokan Pengantaran <span className="text-rose-500">*</span></span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Cth: Kost Griya Putri Asri No. 15, Jl. Margonda Gg. Kober. Pagar hitam lantai 2 kamar 204. Titip di meja resepsionis/satpam."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                      Pilih Outlet / Hub MORI untuk Pengambilan
                    </label>
                    <div className="space-y-2">
                      {MORI_OUTLETS.map((outlet) => (
                        <div
                          key={outlet.id}
                          onClick={() => setSelectedOutlet(outlet.name)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                            selectedOutlet === outlet.name
                              ? 'border-[#66513F] bg-[#FAF8F2] font-bold'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="text-[#3B2C21]">{outlet.name}</div>
                            <div className="text-[11px] text-[#66513F]/70 font-normal">{outlet.address}</div>
                          </div>
                          {selectedOutlet === outlet.name && <Check className="w-4 h-4 text-[#66513F]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="text-xs font-bold text-[#3B2C21] block mb-1">
                    Catatan Tambahan untuk Dapur / Kurir (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Sendok kayu, dingin maksimal, jangan pencet bel kos..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                  />
                </div>
              </div>

              {/* Card 3: Metode Pembayaran (Simulasi Realistis) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/30 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-lg text-[#3B2C21] flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span>3. Metode Pembayaran (Simulasi)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* QRIS */}
                  <div
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'qris'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-black text-xs shrink-0 border border-rose-200">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-[#3B2C21]">QRIS</h4>
                        <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded">
                          Instant
                        </span>
                      </div>
                      <p className="text-[11px] text-[#66513F] mt-0.5">
                        BCA, Mandiri, GoPay, OVO, ShopeePay, DANA
                      </p>
                    </div>
                  </div>

                  {/* E-Wallet */}
                  <div
                    onClick={() => setPaymentMethod('gopay')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'gopay'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B2C21]">GoPay / ShopeePay</h4>
                      <p className="text-[11px] text-[#66513F] mt-0.5">
                        Direct e-wallet payment
                      </p>
                    </div>
                  </div>

                  {/* Transfer Bank */}
                  <div
                    onClick={() => setPaymentMethod('bca')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'bca'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B2C21]">Transfer BCA Virtual Account</h4>
                      <p className="text-[11px] text-[#66513F] mt-0.5">
                        Konfirmasi otomatis 24 jam
                      </p>
                    </div>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'cod'
                        ? 'border-[#66513F] bg-[#FAF8F2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B2C21]">Bayar di Tempat (COD)</h4>
                      <p className="text-[11px] text-[#66513F] mt-0.5">
                        Bayar tunai saat pesanan tiba
                      </p>
                    </div>
                  </div>

                </div>

                {/* QRIS Interactive Mockup Preview */}
                {paymentMethod === 'qris' && (
                  <div className="bg-[#F2EFE5] rounded-2xl p-4 border border-[#A8B69B]/40 text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B2C21]">
                      <span>Mockup QRIS Standar Nasional</span>
                    </div>
                    <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto shadow-xs border border-gray-300 flex flex-col items-center justify-center">
                      {/* Decorative QR code mockup */}
                      <div className="grid grid-cols-4 gap-1 p-2 bg-black/5 rounded-lg w-full h-full">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              i % 3 === 0 || i === 0 || i === 3 || i === 12
                                ? 'bg-black'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#66513F]">
                      Simulasi: Scan kode di atas dengan aplikasi mobile banking apa saja (BCA, Mandiri, GoPay, OVO).
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/40 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-lg text-[#3B2C21] border-b border-gray-100 pb-3">
                  Ringkasan Pesanan ({cartItems.length} menu)
                </h3>

                {/* Items preview list */}
                <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="font-bold text-[#3B2C21] truncate">
                          {item.isCustomBowl
                            ? item.customBowl?.customName || 'Custom Bowl'
                            : item.product?.name}
                        </div>
                        <div className="text-[11px] text-[#66513F]/75">
                          {item.quantity} x Rp {item.unitPrice.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <span className="font-bold text-[#66513F] shrink-0">
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-[#66513F] pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal Menu</span>
                    <span className="font-medium text-[#3B2C21]">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Diskon Promo ({appliedPromo?.code})</span>
                      <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Biaya Pengantaran</span>
                    <span className="font-medium text-[#3B2C21]">
                      {deliveryFee === 0 ? <strong className="text-emerald-700">GRATIS</strong> : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-[#3B2C21] pt-3 border-t border-gray-200">
                    <span>Total Tagihan</span>
                    <span className="text-lg text-[#66513F]">Rp {totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="w-full bg-[#66513F] hover:bg-[#3B2C21] text-white py-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E8C77D]" />
                  <span>Konfirmasi & Buat Pesanan</span>
                </button>

                <p className="text-[11px] text-center text-[#66513F]/70">
                  🔒 Data pemesanan Anda aman dan langsung diteruskan ke tim dapur MORI.
                </p>
              </div>

            </div>

          </div>
        </form>

      </div>

      {/* Order Success Receipt Modal */}
      {createdOrder && (
        <OrderSuccessModal
          order={createdOrder}
          onClose={() => setCreatedOrder(null)}
        />
      )}
    </div>
  );
};
