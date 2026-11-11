import { Product, BowlBaseOption, BowlFruitOption, BowlCrunchOption, BowlDrizzleOption } from '../types';
import berryVanillaImage from '../assets/images/regenerated_image_1794200019860.png';

export const MORI_PRODUCTS: Product[] = [
  // --- MORI OATS ---
  {
    id: 'oats-1',
    name: 'Berry Vanilla Overnight Oats',
    category: 'MORI OATS',
    price: 26000,
    originalPrice: 30000,
    description: 'Overnight oats lembut direndam susu oat murni dan ekstrak vanila Madagaskar, disajikan dengan selai stroberi homemade tanpa gula rafinasi & taburan chia seed.',
    calories: 285,
    protein: 10,
    carbs: 42,
    fat: 6,
    fiber: 8,
    ingredients: ['Rolled oats Australia', 'Oat milk homemade', 'Vanilla extract murni', 'Chia seeds', 'Stroberi segar', 'Raw honey'],
    allergens: ['Bebas laktosa (Dairy-free)', 'Mengandung oats (Gluten-friendly)'],
    image: berryVanillaImage,
    badge: 'Best Seller',
    tags: ['vegan', 'low-sugar', 'quick-prep'],
    customizationOptions: {
      sweetnessLevels: ['Normal (Madu)', 'Less Sweet (Sedikit Madu)', 'No Sugar Added'],
      milkChoices: [
        { name: 'Oat Milk (Default)', extraPrice: 0 },
        { name: 'Almond Milk', extraPrice: 3000 },
        { name: 'Greek Yogurt Infused', extraPrice: 4000 }
      ],
      availableToppings: [
        { name: 'Extra Granola Crunchy', extraPrice: 4000 },
        { name: 'Extra Blueberry Segar', extraPrice: 5000 },
        { name: 'Peanut Butter Swirl', extraPrice: 4000 }
      ]
    }
  },
  {
    id: 'oats-2',
    name: 'Choco Banana High-Protein Oats',
    category: 'MORI OATS',
    price: 28000,
    description: 'Kombinasi klasik dark cocoa murni, pisang manis alami, dan taburan roasted almond. Padat energi dan tinggi protein untuk memulai hari aktifmu.',
    calories: 340,
    protein: 16,
    carbs: 48,
    fat: 8,
    fiber: 9,
    ingredients: ['Rolled oats', 'Almond milk', 'Pure dark cacao powder 100%', 'Pisang Cavendish', 'Plant protein blend', 'Roasted almond'],
    allergens: ['Mengandung kacang almond'],
    image: 'https://www.theconsciousplantkitchen.com/wp-content/uploads/2025/02/Banana-Chocolate-Overnight-Oats-3.jpg',
    badge: 'High Protein',
    tags: ['high-protein', 'vegan', 'quick-prep'],
    customizationOptions: {
      sweetnessLevels: ['Normal', 'Less Sweet', 'No Sugar'],
      milkChoices: [
        { name: 'Almond Milk', extraPrice: 0 },
        { name: 'Oat Milk', extraPrice: 0 },
        { name: 'Soy Milk', extraPrice: 0 }
      ],
      availableToppings: [
        { name: 'Extra Kacang Almond', extraPrice: 4000 },
        { name: 'Cacao Nibs Bali', extraPrice: 5000 }
      ]
    }
  },
  {
    id: 'oats-3',
    name: 'Apple Cinnamon Warm Oatmeal',
    category: 'MORI OATS',
    price: 25000,
    description: 'Oatmeal hangat yang dimasak lembut dengan rempah kayu manis harum, potongan apel Fuji renyah, dan siraman madu hutan murni.',
    calories: 260,
    protein: 8,
    carbs: 45,
    fat: 4,
    fiber: 7,
    ingredients: ['Rolled oats', 'Apel Fuji segar', 'Kayu manis Cassia', 'Madu hutan', 'Walnut cincang'],
    allergens: ['Mengandung kacang walnut'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3Xqr2afhf0SWTs_AIEQ3Muea0FNVRwf8zxCXHf0LOl-8eQDmpMqlMqEh&s=10',
    badge: 'Comfort Food',
    tags: ['low-sugar', 'vegan'],
    customizationOptions: {
      sweetnessLevels: ['Normal Madu', 'Sedikit Madu', 'Tanpa Madu'],
      milkChoices: [
        { name: 'Oat Milk', extraPrice: 0 },
        { name: 'Fresh Milk Rendah Lemak', extraPrice: 2000 }
      ]
    }
  },
  {
    id: 'oats-4',
    name: 'Matcha Chia Overnight Oats',
    category: 'MORI OATS',
    price: 29000,
    originalPrice: 32000,
    description: 'Uji matcha Jepang kaya antioksidan berpadu dengan puding chia seed dan oats dingin. Rasa earthy yang menenangkan dengan aftertaste creamy.',
    calories: 275,
    protein: 11,
    carbs: 39,
    fat: 7,
    fiber: 8,
    ingredients: ['Ceremonial Matcha Uji', 'Rolled oats', 'Chia seeds', 'Susu kedelai non-GMO', 'Madu hutan', 'Toasted coconut flakes'],
    allergens: ['Mengandung kedelai'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHAD9bhukSD5TTgVQ-fPClCzVNfTbAPyyWnKGZ5GGyTQ&s=10',
    badge: 'Favorit Mahasiswa',
    tags: ['vegan', 'low-sugar'],
    customizationOptions: {
      sweetnessLevels: ['Normal', 'Less Sweet', 'No Sugar'],
      availableToppings: [
        { name: 'Extra Kelapa Panggang', extraPrice: 3000 },
        { name: 'Stroberi Potong', extraPrice: 4000 }
      ]
    }
  },
  {
    id: 'oats-5',
    name: 'Mango Coconut Oats Jar',
    category: 'MORI OATS',
    price: 27000,
    description: 'Kesegaran mangga Arumanis tropis berpadu dengan santan kelapa ringan dan oats kenyal. Disajikan dalam jar ramah lingkungan yang siap dibawa kuliah.',
    calories: 290,
    protein: 7,
    carbs: 46,
    fat: 8,
    fiber: 6,
    ingredients: ['Rolled oats', 'Mangga Arumanis lokal', 'Coconut milk encer murni', 'Biji labu', 'Chia seeds'],
    allergens: ['Dairy-Free', 'Nut-Free'],
    image: 'https://cheneetoday.com/wp-content/uploads/2021/04/mango-overnight-oats-1.jpg',
    tags: ['vegan', 'quick-prep']
  },

  // --- MORI BOWL ---
  {
    id: 'bowl-1',
    name: 'Classic Greek Granola Bowl',
    category: 'MORI BOWL',
    price: 32000,
    originalPrice: 36000,
    description: 'Greek yogurt padat probiotik dipadukan dengan homemade oat granola renyah, potongan buah pisang, stroberi segar, dan drizzle madu keemasan.',
    calories: 310,
    protein: 18,
    carbs: 38,
    fat: 7,
    fiber: 6,
    ingredients: ['Greek Yogurt Plain', 'Homemade artisan granola', 'Stroberi segar', 'Pisang', 'Madu murni'],
    allergens: ['Mengandung produk susu sapi (Dairy)', 'Mengandung kacang almond'],
    image: 'https://i.imgur.com/OeBkiKD.jpg',
    badge: 'Best Seller',
    tags: ['high-protein', 'gluten-free'],
    customizationOptions: {
      sweetnessLevels: ['Madu Hutan Asli', 'Less Honey', 'No Honey'],
      availableToppings: [
        { name: 'Extra Greek Yogurt Scoop', extraPrice: 6000 },
        { name: 'Chia Seeds Boost', extraPrice: 3000 },
        { name: 'Selai Kacang Murni', extraPrice: 4000 }
      ]
    }
  },
  {
    id: 'bowl-2',
    name: 'Tropical Dragon Acai Bowl',
    category: 'MORI BOWL',
    price: 35000,
    description: 'Smoothie bowl ungu menyala dari campuran buah naga merah, berry liar, dan pisang. Ditopping kiwi asam manis, chia seeds, dan kelapa sangrai wangi.',
    calories: 260,
    protein: 6,
    carbs: 48,
    fat: 4,
    fiber: 9,
    ingredients: ['Buah naga merah', 'Wild berries blend', 'Pisang beku', 'Air kelapa', 'Kiwi', 'Biji chia', 'Kelapa panggang'],
    allergens: ['Bebas produk hewani (100% Vegan)', 'Gluten-Free'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKYlW_qWIGq2tYpGMP54IzE27JqB46NYAo-LeEMnbpukXxRiYVoJBdAaQj&s=10',
    badge: 'Superfood',
    tags: ['vegan', 'gluten-free', 'low-sugar']
  },
  {
    id: 'bowl-3',
    name: 'Strawberry Glow Chia Bowl',
    category: 'MORI BOWL',
    price: 30000,
    description: 'Puding chia seed lembut bernutrisi dengan puree stroberi asam manis alami, potongan blueberry segar, dan pumpkin seeds renyah.',
    calories: 240,
    protein: 9,
    carbs: 32,
    fat: 8,
    fiber: 11,
    ingredients: ['Chia seeds premium', 'Susu almond murni', 'Puree stroberi segar', 'Blueberry', 'Pumpkin seeds'],
    allergens: ['Dairy-Free', 'Gluten-Free'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLwaoXwMnlIcYBYbmn-WYWPzzQdhQIRjjyeP0DHkazK_5EM-6ioSeQFk&s=10',
    tags: ['vegan', 'gluten-free', 'low-sugar']
  },
  {
    id: 'bowl-4',
    name: 'Peanut Butter Power Bowl',
    category: 'MORI BOWL',
    price: 33000,
    description: 'Mangkuk energi dengan yogurt kental, double scoop selai kacang panggang homemade tanpa minyak sawit, irisan pisang, granola dan dark cacao nibs.',
    calories: 420,
    protein: 20,
    carbs: 40,
    fat: 18,
    fiber: 8,
    ingredients: ['Greek Yogurt', '100% Roasted Peanut Butter', 'Pisang', 'Signature Granola', 'Cacao nibs'],
    allergens: ['Mengandung susu sapi', 'Mengandung kacang tanah'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbjPv2_5qIeLn8Jc7674Yf-490jmFbXgL26ehL8Lb0CA&s=10',
    badge: '20g Protein',
    tags: ['high-protein']
  },

  // --- MORI BITES ---
  {
    id: 'bites-1',
    name: 'Smoked Chicken & Egg Sourdough',
    category: 'MORI BITES',
    price: 34000,
    originalPrice: 38000,
    description: 'Roti sourdough artisan panggang dengan isian dada ayam asap tanpa pengawet, telur orak-arik lembut, selada romaine segar, dan saus yoghurt herbal.',
    calories: 360,
    protein: 24,
    carbs: 35,
    fat: 10,
    fiber: 4,
    ingredients: ['Artisan sourdough bread', 'Dada ayam asap', 'Telur omega-3', 'Romaine lettuce', 'Yogurt herb spread', 'Tomat ceri'],
    allergens: ['Mengandung telur', 'Mengandung gluten'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYRx_nCBvB7GA-lDrdLnqpKLdTct60_UTBjMDhLPwMrNZ-y6nBYMGBxFnx&s=10',
    badge: 'Favorit Sarapan',
    tags: ['high-protein']
  },
  {
    id: 'bites-2',
    name: 'Avocado Sunny-Side Toast',
    category: 'MORI BITES',
    price: 28000,
    description: 'Toast gandum utuh renyah dengan alpukat Mentega tumbuk berbumbu jeruk nipis & garam laut Bali, ditutup telur mata sapi setengah matang.',
    calories: 310,
    protein: 14,
    carbs: 28,
    fat: 15,
    fiber: 7,
    ingredients: ['Multigrain whole wheat bread', 'Alpukat Mentega', 'Telur ayam kampung', 'Chili flakes', 'Minyak zaitun extra virgin'],
    allergens: ['Mengandung telur', 'Mengandung gluten'],
    image: 'https://www.girlgonegourmet.com/wp-content/uploads/2022/10/Avocado-Toast-featured.jpg',
    tags: ['quick-prep']
  },
  {
    id: 'bites-3',
    name: 'Spinach & Mushroom Breakfast Wrap',
    category: 'MORI BITES',
    price: 29000,
    description: 'Tortilla gandum hangat membungkus tumis bayam hijau segar, jamur champignon gurih, scramble egg, dan sedikit keju mozzarella rendah lemak.',
    calories: 320,
    protein: 16,
    carbs: 30,
    fat: 12,
    fiber: 5,
    ingredients: ['Tortilla gandum utuh', 'Bayam baby organik', 'Jamur champignon', 'Telur', 'Keju mozzarella low-fat'],
    allergens: ['Mengandung susu', 'Mengandung telur', 'Mengandung gluten'],
    image: 'https://www.crunchtimekitchen.com/wp-content/uploads/2018/10/Spicy-Mushroom-Swiss-Breakfast-Wrap.jpg',
    badge: 'Praktis On-The-Go',
    tags: ['high-protein', 'quick-prep']
  },
  {
    id: 'bites-4',
    name: 'Sweet Banana Almond Brioche Toast',
    category: 'MORI BITES',
    price: 24000,
    description: 'Roti panggang ringan dengan selai almond murni gurih, irisan pisang karamel madu, taburan chia seed, dan sedikit bubuk kayu manis.',
    calories: 270,
    protein: 8,
    carbs: 38,
    fat: 9,
    fiber: 5,
    ingredients: ['Brioche gandum', 'Almond butter', 'Pisang', 'Madu hutan', 'Kayu manis'],
    allergens: ['Mengandung kacang almond', 'Mengandung gluten'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgerkdAYRbz0wZMpQcOs3ZGzLfdHXkvHAGiKkk4FZ6Q&s=10',
    tags: ['vegan', 'quick-prep']
  },

  // --- MORI DRINKS ---
  {
    id: 'drinks-1',
    name: 'Sunrise Glow Cold-Pressed Juice',
    category: 'MORI DRINKS',
    price: 22000,
    originalPrice: 26000,
    description: '100% sari buah murni tanpa tambahan air dan gula. Kombinasi wortel manis, apel Malang renyah, jeruk peras segar, dan sentuhan jahe penambah imunitas.',
    calories: 110,
    protein: 1,
    carbs: 25,
    fat: 0,
    fiber: 2,
    ingredients: ['Wortel Berastagi', 'Apel Malang', 'Jeruk Pontianak', 'Jahe emprit'],
    allergens: ['100% Pure Fruit Juice (Bebas Alergen)'],
    image: 'https://feedingyourbeauty.com/wp-content/uploads/2014/11/p2121127.jpg',
    badge: '100% Pure',
    tags: ['vegan', 'gluten-free', 'low-sugar']
  },
  {
    id: 'drinks-2',
    name: 'Green Detox Morning Smoothie',
    category: 'MORI DRINKS',
    price: 25000,
    description: 'Smoothie segar menyegarkan dari bayam baby, nanas madu Subang, mentimun, air kelapa muda, dan mint. Ringan dan membantu pencernaan di pagi hari.',
    calories: 135,
    protein: 3,
    carbs: 28,
    fat: 1,
    fiber: 4,
    ingredients: ['Bayam baby', 'Nanas madu Subang', 'Timun jepang', 'Air kelapa murni', 'Daun mint segar'],
    allergens: ['Vegan', 'Gluten-Free'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-s0b_dZQCsYaiqt6mF_93k0v5Fa0FTuxNv_K6rjG2cw&s=10',
    badge: 'Detox Favorit',
    tags: ['vegan', 'gluten-free', 'low-sugar']
  },
  {
    id: 'drinks-3',
    name: 'Berry Blast Protein Shake',
    category: 'MORI DRINKS',
    price: 28000,
    description: 'Shake kental dari stroberi, blueberry, susu oat, dan 15g plant protein. Sahabat sempurna setelah olahraga pagi atau sebelum kelas kuliah.',
    calories: 220,
    protein: 18,
    carbs: 26,
    fat: 3,
    fiber: 5,
    ingredients: ['Wild berries blend', 'Susu oat', 'Plant protein isolate (kacang polong & beras merah)', 'Pisang'],
    allergens: ['Dairy-Free', 'Vegan'],
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    badge: '18g Protein',
    tags: ['high-protein', 'vegan', 'gluten-free']
  },
  {
    id: 'drinks-4',
    name: 'Iced Ceremonial Oat Matcha',
    category: 'MORI DRINKS',
    price: 26000,
    description: 'Teh hijau Matcha murni kualitas ceremonial dari Uji, dikocok bersama susu oat creamy dengan pemanis madu murni. Bebas rasa pahit tajam.',
    calories: 140,
    protein: 3,
    carbs: 20,
    fat: 4,
    fiber: 2,
    ingredients: ['Ceremonial matcha powder', 'Barista oat milk', 'Madu hutan murni'],
    allergens: ['Dairy-Free', 'Vegan'],
    image: 'https://matchaoishii.com/cdn/shop/articles/Oat_Milk_Matcha_Latte_-_Matcha_Oishii_2000x.jpg?v=1650556574',
    badge: 'Best Seller',
    tags: ['vegan', 'low-sugar']
  },
  {
    id: 'drinks-5',
    name: 'Honey Oat Latte (Low Calorie)',
    category: 'MORI DRINKS',
    price: 24000,
    description: 'Espresso arabika single origin berpadu dengan kehangatan susu oat gurih dan sentuhan madu hutan. Ramah lambung untuk sarapan pagi.',
    calories: 125,
    protein: 2,
    carbs: 18,
    fat: 3,
    fiber: 1,
    ingredients: ['Espresso Arabika Gayo', 'Susu oat', 'Madu hutan murni'],
    allergens: ['Dairy-Free'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMhXSyY35wYIqjtB6NHzXEA3XbavvOf0pFkFajr47xWunuqboVTDKuiVy&s=10',
    tags: ['vegan', 'low-sugar']
  }
];

// --- CUSTOMIZE YOUR BOWL OPTIONS ---
export const BOWL_BASE_OPTIONS: BowlBaseOption[] = [
  {
    id: 'base-oats',
    name: 'Overnight Rolled Oats',
    description: 'Oats Australia bertekstur creamy direndam susu oat lembut semalaman.',
    calories: 190,
    price: 18000,
    color: '#E8DFD0',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'base-greek',
    name: 'Greek Yogurt Plain',
    description: 'Yogurt kental padat probiotik tinggi protein, asam segar lembut.',
    calories: 140,
    price: 20000,
    color: '#FBF9F5',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'base-chia',
    name: 'Vanilla Chia Seed Pudding',
    description: 'Puding chia kaya serat & omega-3 beraroma vanila Madagaskar.',
    calories: 160,
    price: 20000,
    color: '#D8D4CC',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'base-acai',
    name: 'Super Acai Dragon Blend',
    description: 'Smoothie tebal warna magenta alami dari acai & buah naga beku.',
    calories: 130,
    price: 24000,
    color: '#A03E6D',
    image: 'https://images.unsplash.com/photo-1590080875727-464877f86ebf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'base-matcha',
    name: 'Kyoto Matcha Oat Base',
    description: 'Oats lembut dengan ekstrak green tea murni beraroma earthy menenangkan.',
    calories: 175,
    price: 22000,
    color: '#9BB088',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80'
  }
];

export const BOWL_FRUIT_OPTIONS: BowlFruitOption[] = [
  { id: 'f-banana', name: 'Pisang Cavendish', calories: 50, price: 4000, emoji: '🍌', color: '#FFE169' },
  { id: 'f-strawberry', name: 'Stroberi Segar', calories: 30, price: 5000, emoji: '🍓', color: '#FF5C5C' },
  { id: 'f-blueberry', name: 'Wild Blueberry', calories: 35, price: 6000, emoji: '🍇', color: '#5B67A2' },
  { id: 'f-mango', name: 'Mangga Arumanis', calories: 45, price: 5000, emoji: '🥭', color: '#FFAA33' },
  { id: 'f-kiwi', name: 'Kiwi Hijau', calories: 35, price: 5000, emoji: '🥝', color: '#88C057' },
  { id: 'f-dragon', name: 'Buah Naga Merah', calories: 40, price: 4000, emoji: '🌺', color: '#E53888' }
];

export const BOWL_CRUNCH_OPTIONS: BowlCrunchOption[] = [
  { id: 'c-granola', name: 'Artisan Honey Granola', calories: 80, price: 4000, emoji: '🥣' },
  { id: 'c-almond', name: 'Roasted Almond Slices', calories: 75, price: 5000, emoji: '🥜' },
  { id: 'c-coconut', name: 'Toasted Coconut Flakes', calories: 60, price: 4000, emoji: '🥥' },
  { id: 'c-chia', name: 'Chia Seeds Crunch', calories: 35, price: 3000, emoji: '🌱' },
  { id: 'c-pumpkin', name: 'Roasted Pumpkin Seeds', calories: 55, price: 4000, emoji: '🎃' },
  { id: 'c-cacao', name: 'Pure Dark Cacao Nibs', calories: 50, price: 5000, emoji: '🍫' }
];

export const BOWL_DRIZZLE_OPTIONS: BowlDrizzleOption[] = [
  { id: 'd-honey', name: 'Madu Hutan Asli', calories: 45, price: 4000, emoji: '🍯' },
  { id: 'd-pb', name: 'Homemade Peanut Butter', calories: 90, price: 5000, emoji: '🥜' },
  { id: 'd-almond', name: 'Roasted Almond Butter', calories: 85, price: 6000, emoji: '🌰' },
  { id: 'd-choco', name: '70% Dark Choco Drizzle', calories: 60, price: 4000, emoji: '🍫' },
  { id: 'd-berry', name: 'Strawberry Compote (No Sugar)', calories: 30, price: 4000, emoji: '🍓' }
];

export const MORI_OUTLETS = [
  {
    id: 'hub-kampus',
    name: 'MORI Hub — Kampus Barat',
    address: 'Jl. Margonda Raya No. 42 (Dekat Stasiun & Gerbang Utama Kampus)',
    hours: '06.30 - 15.00 WIB',
    phone: '+62 812-8899-7701',
    distance: '350m dari Kampus'
  },
  {
    id: 'hub-sudirman',
    name: 'MORI Hub — Sudirman Walk',
    address: 'Lantai Ground Gedung Sentra Mandiri, Jl. Jend. Sudirman Kav. 52',
    hours: '06.30 - 16.30 WIB',
    phone: '+62 812-8899-7702',
    distance: 'Stasiun MRT Terdekat'
  },
  {
    id: 'hub-bintaro',
    name: 'MORI Kitchen — Bintaro Sektor 7',
    address: 'Ruko Kebayoran Arcade 2 Blok B No. 8, Bintaro Jaya',
    hours: '06.30 - 15.00 WIB',
    phone: '+62 812-8899-7703',
    distance: 'Pusat Delivery & Pick-up'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Janandra',
    role: 'Project Manager & Konsep Bisnis',
    responsibility: 'Mengembangkan value proposition MORI, strategi penetapan harga terjangkau untuk pelajar & pekerja muda, serta timeline pengerjaan proyek.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: '"Sarapan sehat harus mudah diakses oleh semua anak muda tanpa bikin kantong bolong."'
  },
  {
    name: 'Anisa',
    role: 'Lead UI/UX Designer & Brand Identity',
    responsibility: 'Merancang logo MORI, color palette (Oat Cream, Sage Green, Earth Brown, Honey Yellow), tipografi, desain kemasan ramah lingkungan, dan prototipe antarmuka website.',
    avatar: '/assets/aistudio/1000198546_33305318.jpg',
    quote: '"Desain MORI menghadirkan nuansa hangat, bersih, dan menenangkan layaknya udara pagi."'
  },
  {
    name: 'Syafa',
    role: 'Content Manager & Nutrition Specialist',
    responsibility: 'Menyusun narasi brand MORI, copywriting edukatif, perhitungan kalori & makronutrisi setiap menu, kurasi komposisi bahan segar, serta penulisan informasi alergen.',
    avatar: '/assets/aistudio/1000198547_02e2a247.jpg',
    quote: '"Kami percaya makanan segar dengan bahan alami adalah investasi terbaik untuk masa depan."'
  },
  {
    name: 'Rijal',
    role: 'Fullstack Web Developer & Systems Engineer',
    responsibility: 'Mengembangkan arsitektur website interaktif berbasis React & Vite, sistem keranjang belanja dinamis, fitur kustomisasi bowl interaktif, kalkulator harga otomatis, dan alur checkout pesanan.',
    avatar: '/assets/aistudio/image_f3253340.png',
    quote: '"Website yang ringan, cepat, dan intuitif memastikan pelanggan memesan sarapan dalam waktu kurang dari 2 menit."'
  }
];

export const PROMO_CODES = [
  { code: 'MORIBARU', discountPercentage: 15, maxDiscount: 20000, description: 'Diskon 15% untuk pelanggan baru MORI' },
  { code: 'SARAPANSEHAT', discountNominal: 10000, minPurchase: 35000, description: 'Potongan langsung Rp 10.000 minimal belanja Rp 35.000' },
  { code: 'MAHASISWA', discountPercentage: 10, maxDiscount: 15000, description: 'Spesial pelajar & mahasiswa: Diskon 10%' }
];
