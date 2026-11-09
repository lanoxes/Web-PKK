import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  BOWL_BASE_OPTIONS, 
  BOWL_FRUIT_OPTIONS, 
  BOWL_CRUNCH_OPTIONS, 
  BOWL_DRIZZLE_OPTIONS 
} from '../data/products';
import { BowlBaseOption, BowlFruitOption, BowlCrunchOption, BowlDrizzleOption, CustomBowl } from '../types';
import { 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Flame, 
  RotateCcw, 
  Layers, 
  Apple, 
  Cookie, 
  Droplet,
  ArrowRight,
  Info
} from 'lucide-react';

export const CustomizeBowl: React.FC = () => {
  const { addToCart, setIsCartDrawerOpen } = useCart();

  // Active step: 1 (Base), 2 (Fruits), 3 (Crunch), 4 (Drizzle)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Selections
  const [selectedBase, setSelectedBase] = useState<BowlBaseOption>(BOWL_BASE_OPTIONS[0]);
  const [selectedFruits, setSelectedFruits] = useState<BowlFruitOption[]>([BOWL_FRUIT_OPTIONS[0], BOWL_FRUIT_OPTIONS[1]]);
  const [selectedCrunch, setSelectedCrunch] = useState<BowlCrunchOption[]>([BOWL_CRUNCH_OPTIONS[0]]);
  const [selectedDrizzles, setSelectedDrizzles] = useState<BowlDrizzleOption[]>([BOWL_DRIZZLE_OPTIONS[0]]);
  const [portionSize, setPortionSize] = useState<'Reguler' | 'Large (+Rp 6.000)'>('Reguler');
  const [customBowlName, setCustomBowlName] = useState('My MORI Power Bowl');
  const [customNotes, setCustomNotes] = useState('');

  // Calculations
  const sizeExtra = portionSize.includes('Large') ? 6000 : 0;
  const sizeCalorieMultiplier = portionSize.includes('Large') ? 1.25 : 1.0;

  const basePrice = selectedBase.price;
  const fruitsPrice = selectedFruits.reduce((sum, f) => sum + f.price, 0);
  const crunchPrice = selectedCrunch.reduce((sum, c) => sum + c.price, 0);
  const drizzPrice = selectedDrizzles.reduce((sum, d) => sum + d.price, 0);

  const totalPrice = basePrice + fruitsPrice + crunchPrice + drizzPrice + sizeExtra;

  const rawCalories =
    selectedBase.calories +
    selectedFruits.reduce((sum, f) => sum + f.calories, 0) +
    selectedCrunch.reduce((sum, c) => sum + c.calories, 0) +
    selectedDrizzles.reduce((sum, d) => sum + d.calories, 0);

  const totalCalories = Math.round(rawCalories * sizeCalorieMultiplier);

  // Fruit toggle (max 4)
  const handleToggleFruit = (fruit: BowlFruitOption) => {
    if (selectedFruits.some((f) => f.id === fruit.id)) {
      setSelectedFruits((prev) => prev.filter((f) => f.id !== fruit.id));
    } else {
      if (selectedFruits.length >= 4) return;
      setSelectedFruits((prev) => [...prev, fruit]);
    }
  };

  // Crunch toggle (max 3)
  const handleToggleCrunch = (crunch: BowlCrunchOption) => {
    if (selectedCrunch.some((c) => c.id === crunch.id)) {
      setSelectedCrunch((prev) => prev.filter((c) => c.id !== crunch.id));
    } else {
      if (selectedCrunch.length >= 3) return;
      setSelectedCrunch((prev) => [...prev, crunch]);
    }
  };

  // Drizzle toggle (max 2)
  const handleToggleDrizzle = (drizzle: BowlDrizzleOption) => {
    if (selectedDrizzles.some((d) => d.id === drizzle.id)) {
      setSelectedDrizzles((prev) => prev.filter((d) => d.id !== drizzle.id));
    } else {
      if (selectedDrizzles.length >= 2) return;
      setSelectedDrizzles((prev) => [...prev, drizzle]);
    }
  };

  const handleReset = () => {
    setSelectedBase(BOWL_BASE_OPTIONS[0]);
    setSelectedFruits([BOWL_FRUIT_OPTIONS[0]]);
    setSelectedCrunch([BOWL_CRUNCH_OPTIONS[0]]);
    setSelectedDrizzles([BOWL_DRIZZLE_OPTIONS[0]]);
    setPortionSize('Reguler');
    setCustomBowlName('My MORI Power Bowl');
    setActiveStep(1);
  };

  const handleAddToCart = () => {
    const customBowl: CustomBowl = {
      id: `custom-bowl-${Date.now()}`,
      customName: customBowlName.trim() || 'Custom MORI Bowl',
      base: selectedBase,
      fruits: selectedFruits,
      crunch: selectedCrunch,
      drizzles: selectedDrizzles,
      portionSize,
      totalCalories,
      totalPrice,
      notes: customNotes.trim() || undefined
    };

    addToCart({
      customBowl,
      isCustomBowl: true,
      quantity: 1,
      unitPrice: totalPrice,
      itemNotes: customNotes.trim() || undefined
    });

    setIsCartDrawerOpen(true);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8C77D]/40 text-[#3B2C21] text-xs font-bold mb-3 border border-[#E8C77D]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A048]" />
            <span>Interactive Bowl Builder (DIY)</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3B2C21] tracking-tight">
            Customize Your MORI Bowl
          </h1>
          <p className="text-sm sm:text-base text-[#66513F]/80 mt-2">
            Rakit mangkuk sarapan impianmu langkah demi langkah. Pilih base bernutrisi, topping buah segar, crunch renyah, dan drizzle alami!
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Column: Visual Bowl Preview & Step Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-white/70 p-1.5 rounded-2xl border border-[#A8B69B]/30 shadow-2xs">
              <button
                onClick={() => setActiveStep(1)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeStep === 1
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-[#F2EFE5]'
                }`}
              >
                <Layers className="w-4 h-4 text-[#E8C77D]" />
                <span>1. Base</span>
              </button>

              <button
                onClick={() => setActiveStep(2)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeStep === 2
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-[#F2EFE5]'
                }`}
              >
                <Apple className="w-4 h-4 text-[#A8B69B]" />
                <span>2. Buah</span>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeStep === 3
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-[#F2EFE5]'
                }`}
              >
                <Cookie className="w-4 h-4 text-[#E8C77D]" />
                <span>3. Crunch</span>
              </button>

              <button
                onClick={() => setActiveStep(4)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  activeStep === 4
                    ? 'bg-[#66513F] text-white shadow-xs'
                    : 'text-[#66513F] hover:bg-[#F2EFE5]'
                }`}
              >
                <Droplet className="w-4 h-4 text-[#A8B69B]" />
                <span>4. Drizzle</span>
              </button>
            </div>

            {/* Step Selection Panels */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#A8B69B]/30 shadow-sm">
              
              {/* STEP 1: BASE */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                        Langkah 1: Pilih Pondasi / Base
                      </h3>
                      <p className="text-xs text-[#66513F]/80">
                        Pilih 1 pondasi utama sarapanmu (Termasuk 1 porsi dasar)
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#A8B69B]/20 text-[#4E623E]">
                      Wajib (1)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BOWL_BASE_OPTIONS.map((base) => {
                      const isSelected = selectedBase.id === base.id;
                      return (
                        <div
                          key={base.id}
                          onClick={() => setSelectedBase(base)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 relative ${
                            isSelected
                              ? 'border-[#66513F] bg-[#FAF8F2] shadow-sm'
                              : 'border-gray-200 hover:border-[#A8B69B] hover:bg-gray-50/50'
                          }`}
                        >
                          <div 
                            className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-xl shadow-2xs border border-black/10"
                            style={{ backgroundColor: base.color }}
                          >
                            🥣
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-display font-bold text-sm text-[#3B2C21] truncate">
                                {base.name}
                              </h4>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-[#66513F] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                            <p className="text-[11px] text-[#66513F]/80 line-clamp-2 mt-0.5">
                              {base.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs font-bold text-[#66513F]">
                                Rp {base.price.toLocaleString('id-ID')}
                              </span>
                              <span className="text-[10px] bg-orange-100 text-orange-800 font-semibold px-1.5 py-0.5 rounded">
                                {base.calories} kcal
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>Lanjut Pilih Buah</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E8C77D]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: FRUITS */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                        Langkah 2: Pilih Buah Segar
                      </h3>
                      <p className="text-xs text-[#66513F]/80">
                        Pilih 1 hingga 4 buah favoritmu untuk vitamin & rasa manis alami.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8C77D]/30 text-[#3B2C21]">
                      {selectedFruits.length}/4 Terpilih
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BOWL_FRUIT_OPTIONS.map((fruit) => {
                      const isSelected = selectedFruits.some((f) => f.id === fruit.id);
                      return (
                        <div
                          key={fruit.id}
                          onClick={() => handleToggleFruit(fruit)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-between relative ${
                            isSelected
                              ? 'border-[#A8B69B] bg-[#EBF1E8] shadow-2xs'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#4E623E] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                          <span className="text-3xl mb-1">{fruit.emoji}</span>
                          <h4 className="font-display font-bold text-xs text-[#3B2C21]">
                            {fruit.name}
                          </h4>
                          <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px]">
                            <span className="font-bold text-[#66513F]">
                              +Rp {fruit.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              • {fruit.calories} kcal
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="text-xs font-bold text-[#66513F] hover:underline"
                    >
                      ← Kembali ke Base
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>Lanjut Pilih Crunch</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E8C77D]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CRUNCH */}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                        Langkah 3: Pilih Crunch & Biji-bijian
                      </h3>
                      <p className="text-xs text-[#66513F]/80">
                        Tambahkan tekstur renyah, serat tinggi, dan lemak sehat (Maksimal 3 pilihan)
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8C77D]/30 text-[#3B2C21]">
                      {selectedCrunch.length}/3 Terpilih
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BOWL_CRUNCH_OPTIONS.map((crunch) => {
                      const isSelected = selectedCrunch.some((c) => c.id === crunch.id);
                      return (
                        <div
                          key={crunch.id}
                          onClick={() => handleToggleCrunch(crunch)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-between relative ${
                            isSelected
                              ? 'border-[#E8C77D] bg-[#FBF4DE] shadow-2xs'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#C9A048] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                          <span className="text-3xl mb-1">{crunch.emoji}</span>
                          <h4 className="font-display font-bold text-xs text-[#3B2C21]">
                            {crunch.name}
                          </h4>
                          <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px]">
                            <span className="font-bold text-[#66513F]">
                              +Rp {crunch.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              • {crunch.calories} kcal
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="text-xs font-bold text-[#66513F] hover:underline"
                    >
                      ← Kembali ke Buah
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>Lanjut Pilih Drizzle</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E8C77D]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: DRIZZLE */}
              {activeStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#3B2C21]">
                        Langkah 4: Pilih Drizzle & Spread
                      </h3>
                      <p className="text-xs text-[#66513F]/80">
                        Sentuhan saus pelengkap (Maksimal 2 pilihan)
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8C77D]/30 text-[#3B2C21]">
                      {selectedDrizzles.length}/2 Terpilih
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BOWL_DRIZZLE_OPTIONS.map((drizzle) => {
                      const isSelected = selectedDrizzles.some((d) => d.id === drizzle.id);
                      return (
                        <div
                          key={drizzle.id}
                          onClick={() => handleToggleDrizzle(drizzle)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-between relative ${
                            isSelected
                              ? 'border-[#66513F] bg-[#FAF8F2] shadow-2xs'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#66513F] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                          <span className="text-3xl mb-1">{drizzle.emoji}</span>
                          <h4 className="font-display font-bold text-xs text-[#3B2C21]">
                            {drizzle.name}
                          </h4>
                          <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px]">
                            <span className="font-bold text-[#66513F]">
                              +Rp {drizzle.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              • {drizzle.calories} kcal
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Size & Name inputs */}
                  <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#3B2C21] block mb-1.5 uppercase tracking-wider">
                        Ukuran Porsi Mangkuk
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Reguler', 'Large (+Rp 6.000)'] as const).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setPortionSize(sz)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                              portionSize === sz
                                ? 'bg-[#66513F] text-white border-[#66513F]'
                                : 'bg-white text-[#3B2C21] border-gray-200'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#3B2C21] block mb-1.5 uppercase tracking-wider">
                        Nama Kreasi Bowl-mu
                      </label>
                      <input
                        type="text"
                        value={customBowlName}
                        onChange={(e) => setCustomBowlName(e.target.value)}
                        placeholder="Cth: Booster Sarapan Rijal"
                        className="w-full text-xs p-2.5 rounded-xl bg-[#F2EFE5] border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="text-xs font-bold text-[#66513F] hover:underline"
                    >
                      ← Kembali ke Crunch
                    </button>
                    <button
                      onClick={handleReset}
                      className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Pilihan
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Live Interactive Bowl Stacker Preview & Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Visual Bowl Stacker Card */}
            <div className="bg-[#FAF8F2] rounded-3xl p-6 border border-[#A8B69B]/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#66513F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A048]" />
                  Live Bowl Stacker
                </span>
                <span className="text-[11px] font-semibold bg-[#A8B69B]/20 text-[#4E623E] px-2 py-0.5 rounded-full">
                  {portionSize}
                </span>
              </div>

              {/* The Visual Bowl Graphic */}
              <div className="relative w-full h-56 rounded-2xl bg-white border border-[#A8B69B]/30 flex flex-col items-center justify-center overflow-hidden p-4 shadow-inner">
                
                {/* Visual Bowl Ceramic Container */}
                <div 
                  className="relative w-48 h-36 rounded-b-[70px] rounded-t-xl border-4 border-[#3B2C21] flex flex-col items-center justify-center shadow-lg transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: selectedBase.color }}
                >
                  {/* Base Layer Label */}
                  <div className="absolute inset-x-0 bottom-2 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-xs">
                      {selectedBase.name}
                    </span>
                  </div>

                  {/* Floating Fruits Layer */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 z-10 px-3">
                    {selectedFruits.map((fruit) => (
                      <span 
                        key={fruit.id} 
                        className="text-2xl transform hover:scale-125 transition-transform filter drop-shadow-xs"
                        title={fruit.name}
                      >
                        {fruit.emoji}
                      </span>
                    ))}
                  </div>

                  {/* Crunch Sprinkles */}
                  <div className="flex items-center justify-center gap-2 z-10 mt-1">
                    {selectedCrunch.map((crunch) => (
                      <span 
                        key={crunch.id}
                        className="text-lg filter drop-shadow-xs"
                        title={crunch.name}
                      >
                        {crunch.emoji}
                      </span>
                    ))}
                  </div>

                  {/* Drizzle Overlay */}
                  {selectedDrizzles.length > 0 && (
                    <div className="absolute inset-x-0 top-1 text-center z-15">
                      <span className="text-xs font-bold text-[#66513F] bg-white/70 px-2 py-0.5 rounded-full">
                        Drizzle: {selectedDrizzles.map((d) => d.emoji).join(' ')}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-[#66513F]/70 text-center mt-3">
                  Preview Mangkuk Keramik MORI Ramah Lingkungan
                </p>
              </div>

              {/* Bowl Name & Calorie Counter */}
              <div>
                <h3 className="font-display font-extrabold text-lg text-[#3B2C21] truncate">
                  {customBowlName || 'Custom Bowl'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs font-bold bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full">
                    <Flame className="w-3.5 h-3.5 text-orange-600" />
                    <span>~{totalCalories} kkal</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Bahan 100% Segar Alami
                  </span>
                </div>
              </div>

              {/* Selected Ingredients Breakdown */}
              <div className="space-y-1.5 text-xs text-[#66513F] pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Base:</span>
                  <span className="font-medium text-[#3B2C21]">{selectedBase.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Buah ({selectedFruits.length}):</span>
                  <span className="font-medium text-[#3B2C21]">
                    {selectedFruits.length > 0 ? selectedFruits.map((f) => f.name).join(', ') : 'Belum dipilih'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Crunch ({selectedCrunch.length}):</span>
                  <span className="font-medium text-[#3B2C21]">
                    {selectedCrunch.length > 0 ? selectedCrunch.map((c) => c.name).join(', ') : 'Belum dipilih'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Drizzle ({selectedDrizzles.length}):</span>
                  <span className="font-medium text-[#3B2C21]">
                    {selectedDrizzles.length > 0 ? selectedDrizzles.map((d) => d.name).join(', ') : 'Belum dipilih'}
                  </span>
                </div>
              </div>

              {/* Notes input */}
              <div>
                <label className="text-[11px] font-bold text-[#66513F] block mb-1">
                  Catatan untuk Dapur (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Cth: Madu dipisah di cup kecil..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#A8B69B]/40 focus:outline-none focus:ring-1 focus:ring-[#A8B69B]"
                />
              </div>

              {/* Price & Add to Cart Action */}
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#66513F]">Harga Total Bowl:</span>
                  <span className="font-display font-black text-2xl text-[#66513F]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#66513F] hover:bg-[#3B2C21] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8C77D]" />
                  <span>Tambahkan DIY Bowl ke Keranjang</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
