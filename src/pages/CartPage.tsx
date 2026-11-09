import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MORI_PRODUCTS } from '../data/products';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Truck, 
  Store, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Utensils
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    orderType,
    setOrderType,
    deliveryFee,
    discountAmount,
    totalAmount,
    setActiveTab,
    addToCart
  } = useCart();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    if (res.success) {
      setFeedback({ type: 'success', msg: res.message });
      setPromoCodeInput('');
    } else {
      setFeedback({ type: 'error', msg: res.message });
    }
  };

  const freeDeliveryThreshold = 50000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  // Quick addon suggestions (from Drinks or Bites)
  const quickAddons = MORI_PRODUCTS.filter(
    (p) => (p.category === 'MORI DRINKS' || p.category === 'MORI BITES') && !cartItems.some(ci => ci.product?.id === p.id)
  ).slice(0, 3);

  if (cartItems.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-[#F2EFE5] min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 space-y-5">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm border border-[#A8B69B]/30">
            <ShoppingBag className="w-12 h-12 text-[#66513F]/50" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3B2C21]">
              Keranjangmu Masih Kosong
            </h1>
            <p className="text-sm text-[#66513F]/80 mt-2">
              Tubuhmu membutuhkan nutrisi terbaik untuk mengawali hari. Pilih menu sarapan favoritmu atau rakit mangkuk impianmu sekarang!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setActiveTab('menu')}
              className="bg-[#66513F] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#3B2C21] transition-transform active:scale-95"
            >
              Jelajahi Menu
            </button>
            <button
              onClick={() => setActiveTab('customize')}
              className="bg-[#A8B69B] text-[#3B2C21] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#92A384] transition-transform active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C9A048]" />
              <span>Rakit Bowl DIY</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('menu')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66513F] hover:text-[#3B2C21]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>

          <button
            onClick={clearCart}
            className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Kosongkan Keranjang
          </button>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3B2C21] tracking-tight mb-8">
          Keranjang Belanja MORI
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Free Delivery Banner */}
            {orderType === 'delivery' && (
              <div className="bg-white rounded-2xl p-4 border border-[#A8B69B]/40 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="flex items-center gap-2 text-[#3B2C21]">
                    <Truck className="w-4 h-4 text-[#C9A048]" />
                    {remainingForFreeDelivery === 0 ? (
                      <span className="text-emerald-700">Selamat! Pesananmu berhak mendapatkan Gratis Ongkir 🎉</span>
                    ) : (
                      <span>Tambah Rp {remainingForFreeDelivery.toLocaleString('id-ID')} lagi untuk Gratis Ongkir</span>
                    )}
                  </span>
                  <span className="text-[#66513F]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F2EFE5] overflow-hidden">
                  <div
                    className="h-full bg-[#A8B69B] transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items Cards */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-[#A8B69B]/30 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F2EFE5] shrink-0 border border-[#A8B69B]/20">
                      {item.isCustomBowl ? (
                        <div
                          className="w-full h-full flex items-center justify-center text-3xl font-bold"
                          style={{ backgroundColor: item.customBowl?.base.color || '#E8DFD0' }}
                        >
                          🥣
                        </div>
                      ) : (
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A8B69B]/20 text-[#4E623E]">
                          {item.isCustomBowl ? 'DIY Bowl' : item.product?.category}
                        </span>
                        {item.itemNotes && (
                          <span className="text-[10px] text-gray-500 italic truncate max-w-[150px]">
                            Note: {item.itemNotes}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-base text-[#3B2C21] truncate mt-1">
                        {item.isCustomBowl
                          ? item.customBowl?.customName || 'Custom Bowl'
                          : item.product?.name}
                      </h3>

                      {item.isCustomBowl && item.customBowl && (
                        <p className="text-xs text-[#66513F]/80 mt-0.5 truncate">
                          Base: {item.customBowl.base.name} • {item.customBowl.fruits.length} Buah • {item.customBowl.crunch.length} Crunch
                        </p>
                      )}

                      {!item.isCustomBowl && (
                        <div className="text-xs text-[#66513F]/80 mt-0.5 flex flex-wrap gap-1">
                          {item.selectedSweetness && <span>{item.selectedSweetness}</span>}
                          {item.selectedMilk && <span>• {item.selectedMilk}</span>}
                          {item.selectedToppings && item.selectedToppings.length > 0 && (
                            <span>• +{item.selectedToppings.join(', ')}</span>
                          )}
                        </div>
                      )}

                      <div className="text-sm font-black text-[#66513F] mt-1">
                        Rp {item.unitPrice.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="flex items-center gap-2.5 bg-[#F2EFE5] px-3 py-1.5 rounded-full border border-[#A8B69B]/30">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/10 text-[#3B2C21]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-extrabold w-5 text-center text-[#3B2C21]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/10 text-[#3B2C21]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-[#3B2C21]">
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                      title="Hapus menu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Addons Suggestions */}
            {quickAddons.length > 0 && (
              <div className="bg-[#FAF8F2] rounded-3xl p-5 border border-[#A8B69B]/30 mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-sm text-[#3B2C21] flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-[#A8B69B]" />
                    <span>Lengkapi Sarapanmu (Rekomendasi)</span>
                  </h4>
                  <span className="text-[11px] text-[#66513F]/70">Minuman Segar & Toast</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {quickAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <img
                        src={addon.image}
                        alt={addon.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-[#3B2C21] truncate">
                          {addon.name}
                        </h5>
                        <div className="text-[11px] text-[#66513F] font-semibold">
                          Rp {addon.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            product: addon,
                            isCustomBowl: false,
                            quantity: 1,
                            unitPrice: addon.price
                          })
                        }
                        className="p-1.5 rounded-lg bg-[#A8B69B]/30 hover:bg-[#A8B69B] text-[#3B2C21] transition-colors"
                        title="Tambah"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Summary & Checkout Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/40 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-lg text-[#3B2C21] border-b border-gray-100 pb-3">
                Ringkasan Pesanan
              </h3>

              {/* Order Type Toggle */}
              <div>
                <label className="text-xs font-bold text-[#66513F] block mb-2 uppercase tracking-wider">
                  Metode Pengambilan
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#F2EFE5] p-1 rounded-2xl border border-[#A8B69B]/30">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#66513F] text-white shadow-xs'
                        : 'text-[#66513F] hover:bg-white/50'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    Delivery Antar
                  </button>
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#66513F] text-white shadow-xs'
                        : 'text-[#66513F] hover:bg-white/50'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    Ambil di Hub
                  </button>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#66513F] block uppercase tracking-wider">
                  Kupon Promo & Diskon Pelajar
                </label>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">{appliedPromo.code}</span>
                        <p className="text-[11px] text-emerald-700">{appliedPromo.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Masukkan kode: MORIBARU / MAHASISWA"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-1 focus:ring-[#A8B69B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#66513F] text-white text-xs font-bold hover:bg-[#3B2C21]"
                    >
                      Pakai
                    </button>
                  </form>
                )}

                {feedback && (
                  <p className={`text-xs flex items-center gap-1.5 ${feedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {feedback.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {feedback.msg}
                  </p>
                )}

                <div className="flex items-center gap-1.5 text-[11px] text-[#66513F]/70 pt-1">
                  <span>Tips kode: </span>
                  <button onClick={() => setPromoCodeInput('MORIBARU')} className="underline font-bold hover:text-[#3B2C21]">
                    MORIBARU (-15%)
                  </button>
                  <span>•</span>
                  <button onClick={() => setPromoCodeInput('SARAPANSEHAT')} className="underline font-bold hover:text-[#3B2C21]">
                    SARAPANSEHAT (-10k)
                  </button>
                </div>
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-sm text-[#66513F] pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal Pesanan</span>
                  <span className="font-semibold text-[#3B2C21]">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Potongan Diskon</span>
                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Biaya Pengantaran</span>
                  <span className="font-semibold text-[#3B2C21]">
                    {deliveryFee === 0 ? <strong className="text-emerald-700">GRATIS</strong> : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-[#3B2C21] pt-3 border-t border-gray-200">
                  <span>Total Pembayaran</span>
                  <span className="text-xl text-[#66513F]">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setActiveTab('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#66513F] hover:bg-[#3B2C21] text-white py-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Lanjut ke Formulir Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#E8C77D]" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
