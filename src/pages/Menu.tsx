import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { MORI_PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types';
import { 
  Search, 
  Filter, 
  Flame, 
  Plus, 
  Sparkles, 
  SlidersHorizontal, 
  Check, 
  Eye,
  UtensilsCrossed
} from 'lucide-react';

export const Menu: React.FC = () => {
  const { setSelectedProductForDetail, addToCart, setActiveTab } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'calories-asc'>('popular');

  const categories: { label: string; value: ProductCategory | 'ALL'; count: number }[] = [
    { label: 'Semua Menu', value: 'ALL', count: MORI_PRODUCTS.length },
    { label: 'MORI OATS', value: 'MORI OATS', count: MORI_PRODUCTS.filter((p) => p.category === 'MORI OATS').length },
    { label: 'MORI BOWL', value: 'MORI BOWL', count: MORI_PRODUCTS.filter((p) => p.category === 'MORI BOWL').length },
    { label: 'MORI BITES', value: 'MORI BITES', count: MORI_PRODUCTS.filter((p) => p.category === 'MORI BITES').length },
    { label: 'MORI DRINKS', value: 'MORI DRINKS', count: MORI_PRODUCTS.filter((p) => p.category === 'MORI DRINKS').length }
  ];

  const dietaryTags = [
    { label: 'Semua', value: 'all' },
    { label: 'High Protein', value: 'high-protein' },
    { label: 'Vegan Friendly', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' },
    { label: 'Low Sugar', value: 'low-sugar' },
    { label: '< Rp 30.000', value: 'under-30k' }
  ];

  const filteredProducts = useMemo(() => {
    return MORI_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }

      // Dietary tag filter
      if (selectedTag === 'under-30k') {
        if (product.price >= 30000) return false;
      } else if (selectedTag !== 'all') {
        if (!product.tags.includes(selectedTag as any)) return false;
      }

      // Search query filter (matches name, ingredients, or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'calories-asc') return a.calories - b.calories;
      // 'popular' keeps default order
      return 0;
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // If the product has options, opening detail modal lets them customize, or quick add with default
    addToCart({
      product,
      isCustomBowl: false,
      quantity: 1,
      unitPrice: product.price
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F2EFE5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A8B69B]/30 text-[#3B2C21] text-xs font-bold mb-3 border border-[#A8B69B]/50">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#4E623E]" />
            <span>Katalog Lengkap Sarapan Sehat</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3B2C21] tracking-tight">
            Our Menu — MORI
          </h1>
          <p className="text-sm sm:text-base text-[#66513F]/80 mt-2">
            Pilihan menu bergizi seimbang, dibuat segar setiap pagi tanpa bahan pengawet ataupun gula berlebih.
          </p>
        </div>

        {/* DIY Bowl Callout Card */}
        <div className="bg-[#E8C77D]/25 border border-[#E8C77D]/60 rounded-3xl p-6 sm:p-7 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8C77D] text-[#3B2C21] flex items-center justify-center text-3xl shadow-xs shrink-0">
              🥣
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg text-[#3B2C21]">
                  Ingin Meracik Sendiri Mangkuk Sarapanmu?
                </span>
                <span className="text-[10px] bg-[#66513F] text-white px-2 py-0.5 rounded-full font-bold">
                  DIY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#66513F]/80 mt-1">
                Gunakan fitur <strong>Customize Your Bowl</strong> untuk memilih 5 base unik, aneka buah segar, granola artisan, dan drizzle madu!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('customize')}
            className="shrink-0 bg-[#66513F] hover:bg-[#3B2C21] text-white px-6 py-3 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#E8C77D]" />
            <span>Mulai Rakit Bowl DIY</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#66513F]/60 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Cari menu, bahan (misal: oats, chia, stroberi, alpukat, matcha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-[#A8B69B]/40 focus:outline-none focus:ring-2 focus:ring-[#A8B69B] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-[#A8B69B]/40 shadow-2xs shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#66513F]" />
              <span className="text-xs text-[#66513F] font-semibold">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-[#3B2C21] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="popular">Terpopuler</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="calories-asc">Kalori Terendah</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#66513F] text-white shadow-xs'
                      : 'bg-white text-[#66513F] border border-[#A8B69B]/30 hover:bg-[#FAF8F2]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#A8B69B]/20 text-[#4E623E]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dietary Tag Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-[#66513F]/70 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              Filter Nutrisi:
            </span>
            {dietaryTags.map((tag) => {
              const isSelected = selectedTag === tag.value;
              return (
                <button
                  key={tag.value}
                  onClick={() => setSelectedTag(tag.value)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-semibold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#A8B69B] text-[#3B2C21] font-bold shadow-2xs'
                      : 'bg-white/80 text-[#66513F] hover:bg-white'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-[#A8B69B]/30 shadow-2xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F2EFE5] flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-display font-bold text-lg text-[#3B2C21]">
              Menu Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#66513F]/80">
              Tidak ada menu yang sesuai dengan filter atau kata kunci "{searchQuery}". Coba kata kunci lain atau reset filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedTag('all');
              }}
              className="bg-[#66513F] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#3B2C21]"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProductForDetail(product)}
                className="bg-white rounded-3xl overflow-hidden border border-[#A8B69B]/30 shadow-xs hover:shadow-md hover:border-[#A8B69B] transition-all flex flex-col cursor-pointer group"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full bg-[#E8DFD0] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A8B69B] text-[#3B2C21] shadow-2xs">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8C77D] text-[#3B2C21] shadow-2xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Quick Detail Trigger */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 text-[#3B2C21] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Eye className="w-3 h-3" />
                      Detail
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#3B2C21] group-hover:text-[#66513F] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#66513F]/80 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Calorie & Protein Chips */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#66513F]">
                    <span className="flex items-center gap-1 bg-[#F2EFE5] px-2 py-0.5 rounded-lg text-orange-800">
                      <Flame className="w-3 h-3 text-orange-500" />
                      {product.calories} kcal
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg font-bold">
                      {product.protein}g protein
                    </span>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="font-display font-extrabold text-base text-[#66513F]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                      {product.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="bg-[#A8B69B] hover:bg-[#66513F] hover:text-white text-[#3B2C21] p-2.5 rounded-2xl transition-all shadow-2xs active:scale-95 flex items-center justify-center"
                      title="Tambah ke Keranjang"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
