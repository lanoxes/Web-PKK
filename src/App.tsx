import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { WeeklySubscriptionModal } from './components/modals/WeeklySubscriptionModal';
import { MembershipModal } from './components/modals/MembershipModal';
import { AdminKitchenModal } from './components/modals/AdminKitchenModal';

// Pages
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { CustomizeBowl } from './pages/CustomizeBowl';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { OrderHistoryPage } from './pages/OrderHistoryPage';

import { MessageCircle, CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, toastMessage } = useCart();

  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isAdminKitchenOpen, setIsAdminKitchenOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EFE5] text-[#3B2C21] font-sans selection:bg-[#A8B69B] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#3B2C21] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-[#A8B69B]/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#E8C77D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenAdmin={() => setIsAdminKitchenOpen(true)}
      />

      {/* Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onOpenSubscription={() => setIsSubscriptionOpen(true)}
            onOpenMembership={() => setIsMembershipOpen(true)}
          />
        )}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'customize' && <CustomizeBowl />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'checkout' && <CheckoutPage />}
        {activeTab === 'about' && <AboutUs />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'history' && <OrderHistoryPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/6281288997701?text=Halo%20Admin%20MORI%2C%20saya%20mau%20tanya%20seputar%20sarapan%20sehat"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        title="Chat WhatsApp MORI"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Chat MORI
        </span>
      </a>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <WeeklySubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />
      <AdminKitchenModal
        isOpen={isAdminKitchenOpen}
        onClose={() => setIsAdminKitchenOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
