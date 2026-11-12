import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FacetFilterBar } from './components/FacetFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ArtisanHubsModal } from './components/ArtisanHubsModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { PRODUCTS } from './data/products';
import { INITIAL_BANNERS } from './data/banners';
import { INITIAL_CATEGORIES } from './data/categories';
import { Product, Banner, Category, CartItem, FilterState, Order } from './types';
import { Sparkles, ShoppingBag, Settings, Store } from 'lucide-react';

export default function App() {
  // Admin View State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Persistent Categories State
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const stored = localStorage.getItem('marhaba_categories');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading stored categories', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Persistent Products State (localStorage + initial fallback)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('marhaba_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading stored products', e);
    }
    return PRODUCTS;
  });

  // Persistent Banners State
  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const stored = localStorage.getItem('marhaba_banners');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading stored banners', e);
    }
    return INITIAL_BANNERS;
  });

  // Persistent Orders State
  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('marhaba_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading stored orders', e);
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marhaba_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed saving categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('marhaba_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('marhaba_banners', JSON.stringify(banners));
    } catch (e) {
      console.error('Failed saving banners to localStorage', e);
    }
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem('marhaba_orders', JSON.stringify(recentOrders));
    } catch (e) {
      console.error('Failed saving orders to localStorage', e);
    }
  }, [recentOrders]);

  // Category & Filter State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    cluster: '',
    maxPrice: null,
    minRating: null,
    onlyPureSilk: false,
    onlyReadyToShip: false,
    onlyFreeDelivery: false,
    onlyBridal: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isArtisansOpen, setIsArtisansOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Cart & Wishlist Storage
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: products[0] || PRODUCTS[0],
      selectedSize: 'Free Size (Unstitched Blouse)',
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([products[1] || PRODUCTS[1]]);
  const [appliedCouponInfo, setAppliedCouponInfo] = useState<{ discount: number; code: string }>({
    discount: 350,
    code: 'MARHABA10'
  });

  // Handle Category Change from Nav
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setFilters((prev) => ({
      ...prev,
      category: catId
    }));
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setFilters({
      category: 'all',
      cluster: '',
      maxPrice: null,
      minRating: null,
      onlyPureSilk: false,
      onlyReadyToShip: false,
      onlyFreeDelivery: false,
      onlyBridal: false,
      searchQuery: '',
      sortBy: 'featured'
    });
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category check
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Cluster check
      if (filters.cluster && product.artisanCluster !== filters.cluster) {
        return false;
      }
      // Max price
      if (filters.maxPrice !== null && product.price > filters.maxPrice) {
        return false;
      }
      // Rating check
      if (filters.minRating !== null && product.rating < filters.minRating) {
        return false;
      }
      // Pure Silk flag
      if (filters.onlyPureSilk && !product.isPureSilk) {
        return false;
      }
      // Ready to Ship
      if (filters.onlyReadyToShip && !product.readyToShip) {
        return false;
      }
      // Free Delivery
      if (filters.onlyFreeDelivery && !product.freeDelivery) {
        return false;
      }
      // Bridal
      if (filters.onlyBridal && !product.isBridal) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        const matchesCluster = product.artisanCluster.toLowerCase().includes(q);
        const matchesTag = product.provenanceTag.toLowerCase().includes(q);
        const matchesColor = (product.color || '').toLowerCase().includes(q);
        const matchesSupplier = (product.supplierName || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesFabric && !matchesCluster && !matchesTag && !matchesColor && !matchesSupplier) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, filters]);

  // Cart operations
  const handleAddToCart = (product: Product, selectedSize?: string) => {
    const size = selectedSize || product.availableSizes?.[0] || 'Free Size';
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, selectedSize: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Buy Now
  const handleBuyNow = (product: Product, selectedSize: string) => {
    handleAddToCart(product, selectedSize);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // Cart Totals
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemsTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleOrderPlaced = (order: Order) => {
    setRecentOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  // ==========================================
  // ADMIN ACTIONS (Products, Categories, Banners, Orders)
  // ==========================================
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    if (quickViewProduct?.id === updatedProduct.id) {
      setQuickViewProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    if (quickViewProduct?.id === productId) {
      setQuickViewProduct(null);
    }
  };

  const handleAddCategory = (newCat: Category) => {
    setCategories((prev) => [...prev, newCat]);
  };

  const handleUpdateCategory = (updatedCat: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCat.id ? updatedCat : c))
    );
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    if (activeCategory === categoryId) {
      setActiveCategory('all');
    }
  };

  const handleAddBanner = (newBanner: Banner) => {
    setBanners((prev) => [newBanner, ...prev]);
  };

  const handleUpdateBanner = (updatedBanner: Banner) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
    );
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleResetToDemo = () => {
    if (confirm('Reset Marhaba Collection products, categories, and banners to default state?')) {
      setProducts(PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      setBanners(INITIAL_BANNERS);
      localStorage.removeItem('marhaba_products');
      localStorage.removeItem('marhaba_categories');
      localStorage.removeItem('marhaba_banners');
    }
  };

  // If Admin View is active, render full Admin Portal
  if (isAdminOpen) {
    return (
      <AdminPanel
        products={products}
        categories={categories}
        banners={banners}
        orders={recentOrders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddBanner={handleAddBanner}
        onUpdateBanner={handleUpdateBanner}
        onDeleteBanner={handleDeleteBanner}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onResetToDemo={handleResetToDemo}
        onClose={() => setIsAdminOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F9] text-[#222222] flex flex-col font-sans selection:bg-[#9F2089] selection:text-white">
      {/* Floating Quick Admin Toggle */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 bg-[#9F2089] hover:bg-[#80182E] text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 border-2 border-white"
          title="Open Admin & Inventory Management"
        >
          <Settings className="w-4 h-4" />
          <span>Marhaba Admin Panel ({products.length})</span>
        </button>
      </div>

      {/* Header */}
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        wishlistCount={wishlist.length}
        cartCount={cartItemCount}
        cartTotal={cartItemsTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenArtisans={() => setIsArtisansOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Hero Section (banners + dynamic category bubbles) */}
      {!filters.searchQuery && activeCategory === 'all' && (
        <HeroSection
          banners={banners}
          categories={categories}
          onExploreCategory={handleSelectCategory}
          onOpenArtisans={() => setIsArtisansOpen(true)}
        />
      )}

      {/* Facet Filter & Sort Bar */}
      <FacetFilterBar
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Active Cluster or Search Filter Banner */}
      {(filters.cluster || filters.searchQuery) && (
        <div className="bg-white border-b border-[#E8E8E8] py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#555555]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#9F2089]" />
              {filters.cluster && (
                <span>
                  Filtering by Guild: <strong>{filters.cluster} Weavers</strong>
                </span>
              )}
              {filters.searchQuery && (
                <span>
                  Search results for: <strong>"{filters.searchQuery}"</strong>
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[#9F2089] font-bold hover:underline"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      {/* Main Product Catalog Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-[#222222] tracking-tight">
              {activeCategory === 'all'
                ? 'Marhaba Collection · Top Handcrafted Picks'
                : `${activeCategory.toUpperCase()} · Curated Creations`}
            </h2>
            <div className="text-xs text-[#666666]">
              Direct from generational weaver clusters in Varanasi, Surat, Chanderi & Kanchipuram
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#9F2089] hover:underline font-bold sm:hidden flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-3 bg-white p-8 rounded-lg border border-[#E8E8E8]">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto text-[#888888]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#222222]">
              No Products Found
            </h3>
            <p className="text-xs text-[#666666]">
              Try adjusting your price or filter selections, or reset filters to see all creations.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#9F2089] text-white text-xs font-bold rounded hover:bg-[#80182E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenArtisans={() => setIsArtisansOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={
          quickViewProduct
            ? wishlist.some((p) => p.id === quickViewProduct.id)
            : false
        }
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={(discount, code) => {
          setAppliedCouponInfo({ discount, code });
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal with PhonePe 9334808340 and UTR verification */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        couponDiscount={appliedCouponInfo.discount}
        appliedCode={appliedCouponInfo.code}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Artisan Guilds Modal */}
      <ArtisanHubsModal
        isOpen={isArtisansOpen}
        onClose={() => setIsArtisansOpen(false)}
        onSelectCluster={(clusterId) => {
          setFilters((prev) => ({ ...prev, cluster: clusterId }));
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrders={recentOrders}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) =>
          setWishlist((prev) => prev.filter((p) => p.id !== id))
        }
        onMoveToCart={handleMoveToCart}
      />
    </div>
  );
}
