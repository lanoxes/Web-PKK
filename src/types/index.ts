export type ProductCategory = 'MORI OATS' | 'MORI BOWL' | 'MORI BITES' | 'MORI DRINKS';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  ingredients: string[];
  allergens: string[];
  image: string;
  badge?: string; // e.g. "Best Seller", "Favorit Mahasiswa", "High Protein", "New"
  tags: ('vegan' | 'gluten-free' | 'high-protein' | 'low-sugar' | 'quick-prep')[];
  customizationOptions?: {
    sweetnessLevels?: string[];
    milkChoices?: { name: string; extraPrice: number }[];
    availableToppings?: { name: string; extraPrice: number }[];
  };
}

export interface BowlBaseOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  price: number;
  color: string;
  image: string;
}

export interface BowlFruitOption {
  id: string;
  name: string;
  calories: number;
  price: number;
  emoji: string;
  color: string;
}

export interface BowlCrunchOption {
  id: string;
  name: string;
  calories: number;
  price: number;
  emoji: string;
}

export interface BowlDrizzleOption {
  id: string;
  name: string;
  calories: number;
  price: number;
  emoji: string;
}

export interface CustomBowl {
  id: string;
  customName: string;
  base: BowlBaseOption;
  fruits: BowlFruitOption[];
  crunch: BowlCrunchOption[];
  drizzles: BowlDrizzleOption[];
  portionSize: 'Reguler' | 'Large (+Rp 6.000)';
  totalCalories: number;
  totalPrice: number;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  product?: Product;
  customBowl?: CustomBowl;
  isCustomBowl: boolean;
  quantity: number;
  selectedSweetness?: string;
  selectedMilk?: string;
  selectedToppings?: string[];
  unitPrice: number;
  totalPrice: number;
  itemNotes?: string;
}

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

export interface CheckoutCustomerInfo {
  name: string;
  whatsapp: string;
  email: string;
  orderType: OrderType;
  outlet: string;
  deliveryAddress: string;
  deliveryTimeSlot: string;
  notes: string;
  paymentMethod: 'qris' | 'gopay' | 'bca' | 'cod';
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customerInfo: CheckoutCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  appliedPromo?: string;
  status: 'Menunggu Konfirmasi' | 'Sedang Disiapkan' | 'Dalam Pengantaran' | 'Selesai';
}
