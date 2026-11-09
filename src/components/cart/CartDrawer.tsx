import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Store, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    orderType,
    setOrderType,
    deliveryFee,
    discountAmount,
    totalAmount,
    setActiveTab
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoFeedback({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoFeedback({ type: 'error', text: res.message });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartPage = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeDeliveryThreshold = 50000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3B2C21]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F2EFE5] shadow-2xl flex flex-col border-l border-[#A8B69B]/40">
          
          {/* Header */}
          <div className="p-5 border-b border-[#A8B69B]/30 bg-[#FAF8F2] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#A8B69B]/30 flex items-center justify-center text-[#3B2C21]">
                <ShoppingBag className="w-5 h-5 text-[#4E623E]" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-[#3B2C21]">
                  Keranjang Sarapan
                </h2>
                <p className="text-xs text-[#66513F]/80">
                  {cartItems.length} menu dipilih
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#66513F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter (for delivery) */}
          {orderType === 'delivery' && (
            <div className="px-5 py-3 bg-[#E8C77D]/20 border-b border-[#E8C77D]/40">
              <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-[#3B2C21]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C9A048]" />
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-700 font-bold">Yeay! Kamu dapat Gratis Ongkir! 🎉</span>
                  ) : (
                    <span>Kurang Rp {remainingForFreeDelivery.toLocaleString('id-ID')} lagi untuk Gratis Ongkir</span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-[#66513F]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/70 overflow-hidden">
                <div 
                  className="h-full bg-[#A8B69B] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Delivery or Pickup Toggle */}
          <div className="p-4 border-b border-[#A8B69B]/30 bg-white/50">
            <div className="grid grid-cols-2 gap-2 bg-[#F2EFE5] p-1 rounded-xl border border-[#A8B69B]/30">
              <button
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-white/50'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                Delivery Antar
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-white/50'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                Ambil di Hub
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#A8B69B]/20 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-[#66513F]/50" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                    Keranjangmu masih kosong
                  </h3>
                  <p className="text-xs text-[#66513F]/80 max-w-xs mt-1">
                    Pilih menu overnight oats, yogurt bowl, atau racik bowl kreasimu sendiri untuk sarapan besok!
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full pt-2">
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActiveTab('menu');
                    }}
                    className="w-full bg-[#66513F] text-white py-2.5 rounded-full font-bold text-xs hover:bg-[#3B2C21] transition-colors"
                  >
                    Jelajahi Menu
                  </button>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActiveTab('customize');
                    }}
                    className="w-full bg-[#A8B69B] text-[#3B2C21] py-2.5 rounded-full font-bold text-xs hover:bg-[#94A587] transition-colors"
                  >
                    ✨ Rakit Bowl Sendiri (DIY)
                  </button>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-2xl p-3.5 border border-[#A8B69B]/30 shadow-2xs flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F2EFE5] shrink-0 border border-[#A8B69B]/20">
                    {item.isCustomBowl ? (
                      <div 
                        className="w-full h-full flex items-center justify-center text-xl font-bold"
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

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-start justify-between">
                      <h4 className="font-display font-bold text-xs text-[#3B2C21] leading-snug truncate">
                        {item.isCustomBowl
                          ? item.customBowl?.customName || 'Custom DIY Bowl'
                          : item.product?.name}
                      </h4>
                    </div>

                    {/* Custom details */}
                    {item.isCustomBowl && item.customBowl && (
                      <div className="text-[11px] text-[#66513F]/80 mt-0.5 space-y-0.5">
                        <p className="truncate">Base: {item.customBowl.base.name}</p>
                        <p className="truncate text-[#4E623E]">
                          Topping: {[
                            ...item.customBowl.fruits.map((f) => f.name),
                            ...item.customBowl.crunch.map((c) => c.name),
                            ...item.customBowl.drizzles.map((d) => d.name)
                          ].join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Standard product variants */}
                    {!item.isCustomBowl && (
                      <div className="text-[10px] text-[#66513F]/75 mt-0.5 space-y-0.5">
                        {item.selectedSweetness && (
                          <span className="inline-block bg-[#F2EFE5] px-1.5 py-0.5 rounded mr-1">
                            {item.selectedSweetness}
                          </span>
                        )}
                        {item.selectedMilk && (
                          <span className="inline-block bg-[#F2EFE5] px-1.5 py-0.5 rounded mr-1">
                            {item.selectedMilk}
                          </span>
                        )}
                        {item.selectedToppings && item.selectedToppings.length > 0 && (
                          <span className="inline-block bg-[#A8B69B]/20 text-[#4E623E] px-1.5 py-0.5 rounded">
                            +{item.selectedToppings.join(', ')}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                      <span className="font-bold text-xs text-[#3B2C21]">
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </span>

                      <div className="flex items-center gap-2 bg-[#F2EFE5] rounded-full px-2 py-0.5 border border-[#A8B69B]/30">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/10 text-[#3B2C21]"
                          aria-label="Kurang"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-[#3B2C21]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/10 text-[#3B2C21]"
                          aria-label="Tambah"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-rose-500 transition-colors p-1"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-[#FAF8F2] border-t border-[#A8B69B]/40 space-y-3">
              
              {/* Promo input */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold">{appliedPromo.code}</span>
                      <span>(-Rp {appliedPromo.discount.toLocaleString('id-ID')})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#66513F]/50 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Kode kupon (cth: MORIBARU)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#A8B69B]/40 focus:outline-none focus:ring-1 focus:ring-[#A8B69B]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#66513F] text-white text-xs font-bold hover:bg-[#3B2C21]"
                    >
                      Terapkan
                    </button>
                  </form>
                )}

                {promoFeedback && (
                  <p className={`text-[11px] flex items-center gap-1 ${promoFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoFeedback.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {promoFeedback.text}
                  </p>
                )}
              </div>

              {/* Summary Calculations */}
              <div className="space-y-1.5 text-xs text-[#66513F] pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} menu)</span>
                  <span className="font-medium text-[#3B2C21]">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Diskon Promo</span>
                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkir ({orderType === 'delivery' ? 'Kurir MORI' : 'Ambil di Hub'})</span>
                  <span className="font-medium text-[#3B2C21]">
                    {deliveryFee === 0 ? <strong className="text-emerald-700">GRATIS</strong> : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#3B2C21] pt-2 border-t border-gray-200">
                  <span>Total Pembayaran</span>
                  <span className="text-base text-[#66513F]">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#66513F] hover:bg-[#3B2C21] text-white py-3 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Lanjut Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C77D]" />
                </button>

                <button
                  onClick={handleViewCartPage}
                  className="w-full text-center text-xs text-[#66513F] font-semibold hover:text-[#3B2C21] py-1"
                >
                  Buka Halaman Keranjang Lengkap →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
