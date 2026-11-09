import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CustomBowl, CheckoutCustomerInfo, OrderRecord, OrderType } from '../types';
import { PROMO_CODES } from '../data/products';

interface AppliedPromo {
  code: string;
  discount: number;
  description: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  appliedPromo: AppliedPromo | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  ordersHistory: OrderRecord[];
  placeOrder: (customerInfo: CheckoutCustomerInfo) => OrderRecord;
  activeOrder: OrderRecord | null;
  setActiveOrder: (order: OrderRecord | null) => void;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
  moriPoints: number;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mori_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [ordersHistory, setOrdersHistory] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mori_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [moriPoints, setMoriPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mori_points');
      return saved ? parseInt(saved, 10) : 150; // Starter points bonus!
    } catch {
      return 150;
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mori_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('mori_orders', JSON.stringify(ordersHistory));
    } catch (e) {
      console.error(e);
    }
  }, [ordersHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('mori_points', moriPoints.toString());
    } catch (e) {
      console.error(e);
    }
  }, [moriPoints]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (newItem: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => {
    const cartItemId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const totalPrice = newItem.unitPrice * newItem.quantity;
    
    // Check if an identical standard product item already exists
    if (!newItem.isCustomBowl && newItem.product) {
      const existingIndex = cartItems.findIndex(
        (ci) =>
          !ci.isCustomBowl &&
          ci.product?.id === newItem.product?.id &&
          ci.selectedSweetness === newItem.selectedSweetness &&
          ci.selectedMilk === newItem.selectedMilk &&
          JSON.stringify(ci.selectedToppings?.sort()) === JSON.stringify(newItem.selectedToppings?.sort())
      );

      if (existingIndex > -1) {
        setCartItems((prev) => {
          const updated = [...prev];
          const item = updated[existingIndex];
          const newQty = item.quantity + newItem.quantity;
          updated[existingIndex] = {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty
          };
          return updated;
        });
        showToast(`Ditambahkan ke keranjang (${newItem.product.name})`);
        return;
      }
    }

    const completeItem: CartItem = {
      ...newItem,
      cartItemId,
      totalPrice
    };

    setCartItems((prev) => [...prev, completeItem]);
    showToast(newItem.isCustomBowl ? 'DIY MORI Bowl ditambahkan ke keranjang!' : `${newItem.product?.name} ditambahkan!`);
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item dihapus dari keranjang');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMO_CODES.find((p) => p.code === cleanCode);

    if (!promo) {
      return { success: false, message: 'Kode promo tidak valid atau telah kadaluarsa.' };
    }

    if (promo.minPurchase && subtotal < promo.minPurchase) {
      return {
        success: false,
        message: `Minimal belanja Rp ${promo.minPurchase.toLocaleString('id-ID')} untuk menggunakan kupon ini.`
      };
    }

    let calculatedDiscount = 0;
    if (promo.discountPercentage) {
      calculatedDiscount = Math.round((subtotal * promo.discountPercentage) / 100);
      if (promo.maxDiscount && calculatedDiscount > promo.maxDiscount) {
        calculatedDiscount = promo.maxDiscount;
      }
    } else if (promo.discountNominal) {
      calculatedDiscount = promo.discountNominal;
    }

    setAppliedPromo({
      code: promo.code,
      discount: calculatedDiscount,
      description: promo.description
    });

    return {
      success: true,
      message: `Kupon ${promo.code} berhasil diterapkan! Hemat Rp ${calculatedDiscount.toLocaleString('id-ID')}`
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Kupon promo dilepas');
  };

  // Free delivery for orders over Rp 50.000 or pickup/dine-in
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 50000 || subtotal === 0 ? 0 : 10000) : 0;
  const discountAmount = appliedPromo ? Math.min(appliedPromo.discount, subtotal) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const placeOrder = (customerInfo: CheckoutCustomerInfo): OrderRecord => {
    const newOrderId = `MORI-${Date.now().toString().slice(-6)}`;
    const newOrder: OrderRecord = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      customerInfo,
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      deliveryFee,
      totalAmount,
      appliedPromo: appliedPromo?.code,
      status: 'Menunggu Konfirmasi'
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Reward loyalty points: 1 point per Rp 1.000 spent
    const earnedPoints = Math.floor(totalAmount / 1000);
    setMoriPoints((prev) => prev + earnedPoints);

    // Clear active cart
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrdersHistory((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
    if (activeOrder && activeOrder.orderId === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
    showToast(`Status pesanan ${orderId} diubah ke: ${status}`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        appliedPromo,
        applyPromo,
        removePromo,
        orderType,
        setOrderType,
        deliveryFee,
        discountAmount,
        totalAmount,
        ordersHistory,
        placeOrder,
        activeOrder,
        setActiveOrder,
        updateOrderStatus,
        moriPoints,
        selectedProductForDetail,
        setSelectedProductForDetail,
        activeTab,
        setActiveTab,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
