import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Smartphone, Store, User, Settings, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenArtisans: () => void;
  onOpenTracking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenArtisans,
  onOpenTracking
}) => {
  const [showAppPrompt, setShowAppPrompt] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8E8E8] shadow-xs">
      {/* Top Utilities Strip */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E8E8] text-[11px] text-[#555555] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-[#038D63]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lowest Prices Every Day · Free Delivery & UPI / PhonePe (9334808340)</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setShowAppPrompt(true)}
              className="hover:text-[#9F2089] flex items-center gap-1 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>
            <span className="text-[#DDDDDD]">|</span>
            <button
              onClick={onOpenArtisans}
              className="hover:text-[#9F2089] flex items-center gap-1 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Master Weavers Guild</span>
            </button>
            <span className="text-[#DDDDDD]">|</span>
            <button
              onClick={onOpenTracking}
              className="hover:text-[#9F2089] transition-colors"
            >
              Track Order
            </button>
            <span className="text-[#DDDDDD]">|</span>
            {/* Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className="bg-[#9F2089] hover:bg-[#80182E] text-white font-bold px-2.5 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Settings className="w-3 h-3" />
              <span>Admin & Inventory Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand: Marhaba Collection */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex flex-col text-left focus:outline-none group"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#4B0013] group-hover:text-[#9F2089] transition-colors leading-none">
                Marhaba
              </span>
              <span className="text-xl sm:text-2xl font-light text-[#9F2089] tracking-tight">
                Collection
              </span>
            </div>
            <span className="text-[9px] font-bold text-[#C59B27] tracking-widest uppercase mt-0.5">
              Haute Handloom & Direct Looms
            </span>
          </button>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1 max-w-xl hidden sm:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Sarees, Lehengas, Kurti, Banarasi Silk or Product Code..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-white border border-[#CCCCCC] rounded-md focus:border-[#9F2089] focus:ring-1 focus:ring-[#9F2089] focus:outline-none transition-all placeholder:text-[#999999]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-[#888888] hover:text-[#222222]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Mobile Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="md:hidden flex items-center gap-1 text-[11px] font-bold text-white bg-[#9F2089] px-2 py-1 rounded"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Profile */}
          <div className="hidden lg:flex flex-col items-center cursor-pointer group text-[#444444] hover:text-[#9F2089] transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[11px] font-medium mt-0.5">Profile</span>
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center text-[#444444] hover:text-[#9F2089] transition-colors focus:outline-none"
            aria-label="Wishlist"
          >
            <div className="relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#9F2089] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium mt-0.5 hidden sm:block">Wishlist</span>
          </button>

          {/* Shopping Bag / Cart */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center text-[#444444] hover:text-[#9F2089] transition-colors focus:outline-none"
            aria-label="Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#9F2089] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium mt-0.5 hidden sm:block">
              {cartCount > 0 ? `₹${cartTotal.toLocaleString('en-IN')}` : 'Cart'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="px-4 pb-2.5 sm:hidden">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Sarees, Lehengas, Kurtis, Jewelry..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-[#888888]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Category Navigation Bar */}
      <div className="border-t border-[#E8E8E8] bg-white overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-3 py-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-md transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#9F2089] text-white shadow-2xs font-bold'
                    : 'text-[#444444] hover:text-[#9F2089] hover:bg-[#FDE5F4]/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile App QR Prompt Modal */}
      {showAppPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center space-y-4 border border-[#E8E8E8] shadow-xl">
            <div className="w-12 h-12 bg-[#FDE5F4] text-[#9F2089] rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#222222]">Marhaba Collection Mobile</h3>
            <p className="text-xs text-[#666666]">
              Shop directly on your mobile device with exclusive festive discounts and instant UPI payments to <strong>9334808340</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowAppPrompt(false)}
                className="w-full py-2.5 bg-[#9F2089] text-white font-bold rounded text-xs hover:bg-[#80182E] transition-colors"
              >
                Continue to Store
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
