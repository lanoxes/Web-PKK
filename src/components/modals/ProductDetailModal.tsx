import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Plus, 
  Minus, 
  Flame, 
  ShieldAlert, 
  Check, 
  ShoppingBag, 
  Sparkles,
  Leaf
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart } = useCart();

  const product = selectedProductForDetail;

  const [quantity, setQuantity] = useState(1);
  const [selectedSweetness, setSelectedSweetness] = useState<string>(() => {
    return product?.customizationOptions?.sweetnessLevels?.[0] || 'Normal';
  });
  const [selectedMilk, setSelectedMilk] = useState<string>(() => {
    return product?.customizationOptions?.milkChoices?.[0]?.name || '';
  });
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [itemNotes, setItemNotes] = useState('');

  if (!product) return null;

  const handleClose = () => {
    setSelectedProductForDetail(null);
    setQuantity(1);
    setSelectedToppings([]);
    setItemNotes('');
  };

  const toggleTopping = (toppingName: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  // Calculate unit price with selected milk and toppings
  const milkExtra = product.customizationOptions?.milkChoices?.find(
    (m) => m.name === selectedMilk
  )?.extraPrice || 0;

  const toppingsExtra = (product.customizationOptions?.availableToppings || [])
    .filter((t) => selectedToppings.includes(t.name))
    .reduce((sum, t) => sum + t.extraPrice, 0);

  const unitPrice = product.price + milkExtra + toppingsExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      product,
      isCustomBowl: false,
      quantity,
      selectedSweetness: product.customizationOptions?.sweetnessLevels ? selectedSweetness : undefined,
      selectedMilk: product.customizationOptions?.milkChoices ? selectedMilk : undefined,
      selectedToppings: selectedToppings.length > 0 ? selectedToppings : undefined,
      unitPrice,
      itemNotes: itemNotes.trim() || undefined
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#3B2C21]/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF8F2] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#A8B69B]/40 my-8 z-10 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#3B2C21] flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#E8DFD0]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Category & Badge */}
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A8B69B] text-[#3B2C21] shadow-xs">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8C77D] text-[#3B2C21] shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A8B69B]/20 pb-4">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-[#3B2C21]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#66513F]/80 mt-1">
                  Tagline: A Better Start, Every Day.
                </p>
              </div>
              <div className="text-right sm:text-right">
                <div className="text-2xl font-black text-[#66513F]">
                  Rp {unitPrice.toLocaleString('id-ID')}
                </div>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#3B2C21]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Nutrition Highlights Bar */}
            <div className="bg-[#F2EFE5] rounded-2xl p-4 border border-[#A8B69B]/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#66513F] mb-3 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Informasi Nutrisi & Kalori</span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="bg-white rounded-xl p-2 shadow-2xs">
                  <div className="font-extrabold text-base text-[#3B2C21]">{product.calories}</div>
                  <div className="text-[10px] text-[#66513F] font-semibold">Kkal</div>
                </div>
                <div className="bg-white rounded-xl p-2 shadow-2xs">
                  <div className="font-extrabold text-base text-emerald-700">{product.protein}g</div>
                  <div className="text-[10px] text-[#66513F] font-semibold">Protein</div>
                </div>
                <div className="bg-white rounded-xl p-2 shadow-2xs">
                  <div className="font-extrabold text-base text-amber-700">{product.carbs}g</div>
                  <div className="text-[10px] text-[#66513F] font-semibold">Karbo</div>
                </div>
                <div className="bg-white rounded-xl p-2 shadow-2xs">
                  <div className="font-extrabold text-base text-indigo-700">{product.fiber}g</div>
                  <div className="text-[10px] text-[#66513F] font-semibold">Serat</div>
                </div>
                <div className="bg-white rounded-xl p-2 shadow-2xs">
                  <div className="font-extrabold text-base text-stone-600">{product.fat}g</div>
                  <div className="text-[10px] text-[#66513F] font-semibold">Lemak</div>
                </div>
              </div>
            </div>

            {/* Ingredients & Allergens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-[#A8B69B]/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#3B2C21] mb-2">
                  <Leaf className="w-3.5 h-3.5 text-[#4E623E]" />
                  <span>Komposisi Bahan</span>
                </div>
                <ul className="text-xs text-[#66513F] space-y-1">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8B69B]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-amber-200 bg-amber-50/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>Informasi Alergen</span>
                </div>
                <ul className="text-xs text-amber-800 space-y-1">
                  {product.allergens.map((alg, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{alg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Customization Options */}
            {product.customizationOptions?.sweetnessLevels && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3B2C21] uppercase tracking-wider block">
                  Tingkat Kemanisan (Madu Alami)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.customizationOptions.sweetnessLevels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedSweetness(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                        selectedSweetness === lvl
                          ? 'bg-[#66513F] text-white border-[#66513F] shadow-xs'
                          : 'bg-white text-[#3B2C21] border-[#A8B69B]/40 hover:bg-[#F2EFE5]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.customizationOptions?.milkChoices && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3B2C21] uppercase tracking-wider block">
                  Pilihan Susu / Base Tambahan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.customizationOptions.milkChoices.map((milk) => (
                    <button
                      key={milk.name}
                      type="button"
                      onClick={() => setSelectedMilk(milk.name)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        selectedMilk === milk.name
                          ? 'bg-[#A8B69B]/30 border-[#A8B69B] text-[#3B2C21] font-bold'
                          : 'bg-white text-[#3B2C21] border-gray-200 hover:bg-[#F2EFE5]'
                      }`}
                    >
                      <span>{milk.name}</span>
                      {milk.extraPrice > 0 && (
                        <span className="text-[10px] text-[#4E623E] font-bold">
                          +Rp {milk.extraPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.customizationOptions?.availableToppings && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3B2C21] uppercase tracking-wider block">
                  Ekstra Topping Renyah
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.customizationOptions.availableToppings.map((top) => {
                    const isSelected = selectedToppings.includes(top.name);
                    return (
                      <button
                        key={top.name}
                        type="button"
                        onClick={() => toggleTopping(top.name)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#E8C77D]/30 border-[#E8C77D] text-[#3B2C21] font-bold'
                            : 'bg-white text-[#3B2C21] border-gray-200 hover:bg-[#F2EFE5]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isSelected ? 'bg-[#C9A048] border-[#C9A048] text-white' : 'border-gray-300'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span>{top.name}</span>
                        </div>
                        <span className="text-[11px] text-[#66513F] font-bold">
                          +Rp {top.extraPrice.toLocaleString('id-ID')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Catatan Tambahan */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#3B2C21] uppercase tracking-wider block">
                Catatan Khusus (Opsional)
              </label>
              <input
                type="text"
                placeholder="Cth: Sendok kayu, dingin maksimal, pisahkan selai..."
                value={itemNotes}
                onChange={(e) => setItemNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl bg-white border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
              />
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-[#F2EFE5] border-t border-[#A8B69B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-[#A8B69B]/40 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 text-[#3B2C21] active:scale-95 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-display font-extrabold text-sm w-6 text-center text-[#3B2C21]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 text-[#3B2C21] active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex-1 bg-[#66513F] hover:bg-[#3B2C21] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-3 transition-transform active:scale-98"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8C77D]" />
            <span>Tambah ke Keranjang</span>
            <span className="text-[#E8C77D] font-black">
              • Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
