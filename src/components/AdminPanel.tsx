import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon, Package, 
  ShoppingBag, Check, X, RefreshCw, FolderTree, Database, 
  Copy, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Product, Banner, Order, Category, SupabaseConfig } from '../types';
import { ImageColorPicker } from './ImageColorPicker';
import { SUPABASE_SQL_SCHEMA, getSupabaseConfig, saveSupabaseConfig, testSupabaseConnection } from '../lib/supabase';

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddBanner: (banner: Banner) => void;
  onUpdateBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onResetToDemo: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  categories,
  banners,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onUpdateOrderStatus,
  onResetToDemo,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'banners' | 'orders' | 'supabase'>('products');
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Product Add/Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'sarees',
    categoryLabel: 'Pure Silk Sarees',
    artisanCluster: 'Varanasi',
    provenanceTag: 'VARANASI WEAVERS',
    supplierName: 'Marhaba Master Loom Collective',
    color: 'Royal Burgundy',
    colorHex: '#6B1426',
    price: 1299,
    originalPrice: 2999,
    discountPercent: 57,
    images: [] as string[],
    fabric: 'Handloom Katan Silk',
    weaveType: 'Kadwa Brocade Zari',
    blousePiece: 'Included (0.8m Unstitched)',
    dimensions: '6.3 meters with blouse',
    care: 'Dry Clean Only',
    description: 'Exclusive Marhaba Collection master-weaver creation with pure zari highlights.',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: false,
    mTrusted: true
  });

  // Category Add/Edit Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    label: '',
    slug: '',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    description: ''
  });

  // Banner Add/Edit Modal State
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badgeText: 'MARHABA FESTIVE DROP',
    ctaText: 'Shop Now',
    categoryLink: 'sarees',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#9F2089] via-[#80182E] to-[#4B0013]',
    active: true
  });

  // Supabase Configuration State
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getSupabaseConfig());
  const [supabaseTesting, setSupabaseTesting] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<string | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Filtered Products for Admin
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
                          p.artisanCluster.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
                          p.provenanceTag.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
                          (p.color || '').toLowerCase().includes(searchProductQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // PRODUCT HANDLERS
  // ==========================================
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      title: p.title,
      category: p.category,
      categoryLabel: p.categoryLabel,
      artisanCluster: p.artisanCluster,
      provenanceTag: p.provenanceTag,
      supplierName: p.supplierName || 'Marhaba Certified Supplier',
      color: p.color || 'Royal Burgundy',
      colorHex: p.colorHex || '#6B1426',
      price: p.price,
      originalPrice: p.originalPrice,
      discountPercent: p.discountPercent,
      images: p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      fabric: p.fabric,
      weaveType: p.weaveType,
      blousePiece: p.blousePiece,
      dimensions: p.dimensions,
      care: p.care,
      description: p.description,
      freeDelivery: p.freeDelivery,
      readyToShip: p.readyToShip,
      isPureSilk: p.isPureSilk,
      isBridal: p.isBridal,
      mTrusted: p.mTrusted ?? true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      category: categories[1]?.id || 'sarees',
      categoryLabel: categories[1]?.label || 'Pure Silk Sarees',
      artisanCluster: 'Varanasi',
      provenanceTag: 'VARANASI WEAVERS',
      supplierName: 'Marhaba Direct Loom Collective',
      color: 'Royal Burgundy',
      colorHex: '#6B1426',
      price: 1299,
      originalPrice: 2999,
      discountPercent: 57,
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      fabric: 'Handloom Pure Silk Blend',
      weaveType: 'Kadwa Brocade Zari',
      blousePiece: 'Included (0.8m Unstitched)',
      dimensions: '6.3 meters with blouse',
      care: 'Dry Clean Only',
      description: 'Exclusive Marhaba Collection design crafted with generational loom precision.',
      freeDelivery: true,
      readyToShip: true,
      isPureSilk: true,
      isBridal: false,
      mTrusted: true
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedDiscount = Math.round(
      ((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100
    );

    const targetCategory = categories.find((c) => c.id === productForm.category);
    const categoryLabel = targetCategory ? targetCategory.label : productForm.categoryLabel;

    const finalImages = productForm.images.length > 0 
      ? productForm.images 
      : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        title: productForm.title,
        category: productForm.category,
        categoryLabel,
        artisanCluster: productForm.artisanCluster,
        provenanceTag: productForm.provenanceTag,
        supplierName: productForm.supplierName,
        color: productForm.color,
        colorHex: productForm.colorHex,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent: calculatedDiscount > 0 ? calculatedDiscount : productForm.discountPercent,
        images: finalImages,
        fabric: productForm.fabric,
        weaveType: productForm.weaveType,
        blousePiece: productForm.blousePiece,
        dimensions: productForm.dimensions,
        care: productForm.care,
        description: productForm.description,
        freeDelivery: productForm.freeDelivery,
        readyToShip: productForm.readyToShip,
        isPureSilk: productForm.isPureSilk,
        isBridal: productForm.isBridal,
        mTrusted: productForm.mTrusted
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        title: productForm.title,
        category: productForm.category,
        categoryLabel,
        artisanCluster: productForm.artisanCluster,
        artisanName: `${productForm.artisanCluster} Master Weavers`,
        provenanceTag: productForm.provenanceTag,
        supplierName: productForm.supplierName,
        color: productForm.color,
        colorHex: productForm.colorHex,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent: calculatedDiscount > 0 ? calculatedDiscount : 50,
        rating: 4.8,
        reviewCount: 142,
        images: finalImages,
        fabric: productForm.fabric,
        weaveType: productForm.weaveType,
        blousePiece: productForm.blousePiece,
        dimensions: productForm.dimensions,
        care: productForm.care,
        dispatchTime: 'Dispatches in 24 hours',
        freeDelivery: productForm.freeDelivery,
        readyToShip: productForm.readyToShip,
        isPureSilk: productForm.isPureSilk,
        isBridal: productForm.isBridal,
        featured: true,
        availableSizes: ['Free Size (Unstitched)'],
        description: productForm.description,
        mTrusted: productForm.mTrusted,
        reviews: [
          {
            id: `rev-${Date.now()}`,
            userName: 'Sunita Sharma',
            rating: 5,
            date: 'Just now',
            comment: 'Pure elegance from Marhaba Collection! Exact fabric texture and rich zari border.',
            verified: true,
            location: 'Delhi'
          }
        ]
      };
      onAddProduct(newProd);
    }
    setIsProductModalOpen(false);
  };

  // ==========================================
  // CATEGORY HANDLERS
  // ==========================================
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      label: '',
      slug: '',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
      description: ''
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      label: cat.label,
      slug: cat.slug,
      imageUrl: cat.imageUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
      description: cat.description || ''
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (categoryForm.slug || categoryForm.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();

    if (editingCategory) {
      const updated: Category = {
        ...editingCategory,
        label: categoryForm.label,
        slug,
        imageUrl: categoryForm.imageUrl,
        description: categoryForm.description
      };
      onUpdateCategory(updated);
    } else {
      const newCat: Category = {
        id: slug || `cat-${Date.now()}`,
        label: categoryForm.label,
        slug,
        imageUrl: categoryForm.imageUrl,
        description: categoryForm.description,
        itemCount: 0
      };
      onAddCategory(newCat);
    }
    setIsCategoryModalOpen(false);
  };

  // ==========================================
  // BANNER HANDLERS
  // ==========================================
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setBannerForm({
      title: 'Marhaba Grand Wedding & Festive Drop',
      subtitle: 'Flat 70% Off On Royal Silk Sarees, Lehengas & Sherwanis',
      badgeText: 'MARHABA EXCLUSIVE',
      ctaText: 'Explore Collections',
      categoryLink: 'sarees',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-[#9F2089] via-[#80182E] to-[#4B0013]',
      active: true
    });
    setIsBannerModalOpen(true);
  };

  const handleOpenEditBanner = (b: Banner) => {
    setEditingBanner(b);
    setBannerForm({
      title: b.title,
      subtitle: b.subtitle,
      badgeText: b.badgeText,
      ctaText: b.ctaText,
      categoryLink: b.categoryLink,
      imageUrl: b.imageUrl,
      bgGradient: b.bgGradient,
      active: b.active
    });
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      onUpdateBanner({ ...editingBanner, ...bannerForm });
    } else {
      onAddBanner({ id: `banner-${Date.now()}`, ...bannerForm });
    }
    setIsBannerModalOpen(false);
  };

  // ==========================================
  // SUPABASE CONNECT & TEST
  // ==========================================
  const handleTestSupabase = async () => {
    setSupabaseTesting(true);
    setSupabaseTestResult(null);

    const ok = await testSupabaseConnection(supabaseConfig.url, supabaseConfig.anonKey);
    setSupabaseTesting(false);

    if (ok) {
      setSupabaseConfig({ ...supabaseConfig, isConnected: true });
      saveSupabaseConfig({ ...supabaseConfig, isConnected: true });
      setSupabaseTestResult('success');
    } else {
      setSupabaseTestResult('error');
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.finalTotal, 0);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#222222]">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-[#9F2089] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1.5 text-xs font-bold bg-white/10 px-3 py-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                  Marhaba Collection
                </span>
                <span className="bg-[#FECE57] text-[#4B0013] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  Admin & Inventory Suite
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetToDemo}
              className="hidden sm:flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded font-medium transition-colors"
              title="Reset sample products & banners"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white text-[#9F2089] font-bold text-xs rounded shadow-xs hover:bg-slate-100 transition-colors"
            >
              View Live Store
            </button>
          </div>
        </div>

        {/* Admin KPI Ribbon */}
        <div className="bg-[#80182E] text-white/90 text-xs px-4 sm:px-6 py-2 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-white/60">Active Products:</span>{' '}
                <strong className="text-white">{products.length}</strong>
              </div>
              <div>
                <span className="text-white/60">Categories:</span>{' '}
                <strong className="text-white">{categories.length}</strong>
              </div>
              <div>
                <span className="text-white/60">Banners:</span>{' '}
                <strong className="text-white">{banners.length}</strong>
              </div>
              <div>
                <span className="text-white/60">UPI Phone:</span>{' '}
                <strong className="text-[#FECE57] font-mono">9334808340</strong>
              </div>
              <div>
                <span className="text-white/60">Orders:</span>{' '}
                <strong className="text-white">{orders.length}</strong> (₹{totalRevenue.toLocaleString('en-IN')})
              </div>
            </div>
            <div className="text-[11px] text-white/70 italic hidden md:block">
              Photoshop Eyedropper & Drag-Drop Uploader active
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#E8E8E8] text-[#222222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === 'products'
                  ? 'border-[#9F2089] text-[#9F2089]'
                  : 'border-transparent text-[#666666] hover:text-[#222222]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === 'categories'
                  ? 'border-[#9F2089] text-[#9F2089]'
                  : 'border-transparent text-[#666666] hover:text-[#222222]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('banners')}
              className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === 'banners'
                  ? 'border-[#9F2089] text-[#9F2089]'
                  : 'border-transparent text-[#666666] hover:text-[#222222]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Hero Banners ({banners.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === 'orders'
                  ? 'border-[#9F2089] text-[#9F2089]'
                  : 'border-transparent text-[#666666] hover:text-[#222222]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`py-3 px-2 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === 'supabase'
                  ? 'border-[#9F2089] text-[#9F2089]'
                  : 'border-transparent text-[#666666] hover:text-[#222222]'
              }`}
            >
              <Database className="w-4 h-4 text-[#C59B27]" />
              <span>Supabase SQL & Setup</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ============================================================ */}
        {/* TAB 1: PRODUCTS (with Dropzone & Photoshop Eyedropper)       */}
        {/* ============================================================ */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-[#E8E8E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex flex-1 items-center gap-3">
                <input
                  type="text"
                  placeholder="Search by title, color, cluster, or supplier..."
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  className="w-full max-w-sm px-3 py-2 text-xs border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                />

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none cursor-pointer bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white text-xs font-bold rounded shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-[#E8E8E8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#554243] font-bold border-b border-[#E8E8E8] uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Color</th>
                      <th className="py-3 px-4">Price / MRP</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Provenance / Supplier</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAE2]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="w-12 h-14 object-cover rounded border border-[#E8E8E8] shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 max-w-xs">
                              <div className="font-bold text-[#222222] truncate">{p.title}</div>
                              <div className="text-[11px] text-[#666666] truncate mt-0.5">
                                {p.fabric} · {p.images.length} images
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#80182E] border border-[#EFEAE2] rounded text-[11px] font-semibold">
                            {p.categoryLabel || p.category}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: p.colorHex || '#6B1426' }}
                            />
                            <span className="text-xs font-medium text-[#333333]">{p.color || 'Multi'}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-extrabold text-[#222222] text-sm tabular-nums">
                            ₹{p.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-[#887173] line-through tabular-nums">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-1.5 py-0.5 bg-[#9F2089]/10 text-[#9F2089] rounded font-bold text-xs">
                            {p.discountPercent}% OFF
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#C59B27] text-[11px] uppercase">
                            {p.provenanceTag}
                          </div>
                          <div className="text-[10px] text-[#666666]">
                            {p.supplierName || p.artisanCluster}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${p.title}"?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="p-8 text-center text-[#666666]">
                  No products found. Click "Add New Product" to create one!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CATEGORIES (Add, Edit, Delete with Dropzone)           */}
        {/* ============================================================ */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-[#E8E8E8] flex items-center justify-between shadow-xs">
              <div>
                <h3 className="font-bold text-sm text-[#222222]">Category Management</h3>
                <p className="text-xs text-[#666666]">
                  Add custom categories with images. They appear dynamically in the store navigation and filter rails!
                </p>
              </div>

              <button
                onClick={handleOpenAddCategory}
                className="px-4 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-white border border-[#E8E8E8] rounded-lg p-3.5 shadow-xs flex flex-col justify-between hover:border-[#9F2089] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="aspect-[4/3] rounded-md overflow-hidden bg-slate-100 border border-[#E8E8E8]">
                        <img
                          src={cat.imageUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'}
                          alt={cat.label}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-[#222222]">{cat.label}</h4>
                          <span className="text-[10px] font-mono text-[#888888]">Slug: {cat.slug || cat.id}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#9F2089] font-bold text-xs rounded border border-[#E8E8E8]">
                          {count} SKUs
                        </span>
                      </div>

                      {cat.description && (
                        <p className="text-[11px] text-[#666666] line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-[#E8E8E8] flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#CCCCCC] rounded hover:border-[#9F2089] text-[#222222] flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3 text-blue-600" />
                        <span>Edit</span>
                      </button>

                      {cat.id !== 'all' && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete category "${cat.label}"?`)) {
                              onDeleteCategory(cat.id);
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: BANNERS                                               */}
        {/* ============================================================ */}
        {activeTab === 'banners' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-[#E8E8E8] flex items-center justify-between shadow-xs">
              <div>
                <h3 className="font-bold text-sm text-[#222222]">Hero Promo Banners</h3>
                <p className="text-xs text-[#666666]">
                  Control banners displayed on the Marhaba Collection homepage carousel.
                </p>
              </div>

              <button
                onClick={handleOpenAddBanner}
                className="px-4 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/6] bg-slate-100 overflow-hidden">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-4 text-white">
                      <span className="text-[10px] bg-[#FECE57] text-[#4B0013] font-black px-2 py-0.5 rounded w-fit mb-1">
                        {b.badgeText}
                      </span>
                      <h4 className="font-editorial text-lg font-bold leading-tight">{b.title}</h4>
                      <p className="text-xs text-white/90 line-clamp-1 mt-0.5">{b.subtitle}</p>
                      <div className="mt-2 text-xs font-bold text-[#FECE57] underline">
                        {b.ctaText} →
                      </div>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                          b.active ? 'bg-emerald-600 text-white' : 'bg-slate-400 text-white'
                        }`}
                      >
                        {b.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border-t border-[#E8E8E8] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#888888]">Category: </span>
                      <strong className="text-[#222222] capitalize">{b.categoryLink}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditBanner(b)}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#CCCCCC] rounded hover:border-[#9F2089] text-[#222222] flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete banner "${b.title}"?`)) {
                            onDeleteBanner(b.id);
                          }
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: ORDERS (with UPI Phone 9334808340 and UTR Tracking)   */}
        {/* ============================================================ */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-[#E8E8E8] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#222222]">Customer Orders & UPI Payments</h3>
                <p className="text-xs text-[#666666]">
                  Live feed of customer orders with address, PhonePe/UPI verification on phone number <strong className="text-[#9F2089]">9334808340</strong>, and UTR transaction numbers.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg border border-[#E8E8E8] text-[#666666]">
                <ShoppingBag className="w-12 h-12 text-[#CCCCCC] mx-auto mb-2" />
                <h4 className="font-bold text-sm text-[#222222]">No orders placed yet</h4>
                <p className="text-xs mt-1">Place a test order in the storefront to verify the checkout flow.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white rounded-lg border border-[#E8E8E8] p-4 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E8E8] gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-[#222222]">Order #{o.id}</strong>
                          <span className="text-xs text-[#888888]">
                            · {new Date(o.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-xs text-[#666666] mt-0.5">
                          Recipient: <strong>{o.shippingAddress.fullName}</strong> ({o.shippingAddress.phone}) · {o.shippingAddress.addressLine}, {o.shippingAddress.city}, {o.shippingAddress.state} - {o.shippingAddress.pincode}
                        </div>
                        {o.utrNumber && (
                          <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>UPI UTR / Reference: <strong>{o.utrNumber}</strong> (Paid to 9334808340)</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-[#9F2089]">
                            ₹{o.pricing.finalTotal.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-[#775A00] uppercase font-bold">
                            Payment: {o.paymentMethod.toUpperCase()}
                          </div>
                        </div>

                        {/* Status dropdown */}
                        <select
                          value={o.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(o.id, e.target.value as Order['status'])
                          }
                          className="px-2.5 py-1.5 text-xs font-bold border rounded bg-[#FAF8F5] border-[#CCCCCC] focus:border-[#9F2089]"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="artisan_packing">Loom Packing</option>
                          <option value="loom_inspection">Quality Inspected</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {o.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 bg-[#FAF8F5] rounded border border-[#EFEAE2] text-xs"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-10 h-12 object-cover rounded border border-[#E8E8E8]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-[#222222] truncate">{item.product.title}</div>
                            <div className="text-[10px] text-[#666666]">
                              Qty: {item.quantity} · Size: {item.selectedSize}
                            </div>
                            <div className="text-xs font-extrabold text-[#80182E] tabular-nums">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: SUPABASE CLOUD SYNC & FULL SQL SCHEMA SETUP           */}
        {/* ============================================================ */}
        {activeTab === 'supabase' && (
          <div className="space-y-5">
            {/* Supabase Connection Setup Card */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E8E8] shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#3ECF8E]" />
                    <h3 className="font-bold text-base text-[#222222]">
                      Supabase Cloud Database & Storage Optimization
                    </h3>
                  </div>
                  <p className="text-xs text-[#666666] mt-1 max-w-2xl leading-relaxed">
                    Marhaba Collection automatically stores data in your browser immediately, and also provides 1-click sync with your Supabase database. To preserve your free 2GB Supabase tier limit, images are stored via lightweight URL pointers in the database!
                  </p>
                </div>

                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#FAF8F5] border border-[#CCCCCC] hover:border-[#3ECF8E] text-[#222222] text-xs font-semibold rounded flex items-center gap-1 shrink-0"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* API Credentials Input Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E8E8E8]">
                <div>
                  <label className="block text-xs font-bold text-[#222222] mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={supabaseConfig.url}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                    placeholder="https://your-project-ref.supabase.co"
                    className="w-full px-3 py-2 text-xs border border-[#CCCCCC] rounded focus:border-[#3ECF8E] focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-[#888888] mt-0.5 block">
                    Found in Supabase Project Settings ➔ API ➔ Project URL
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#222222] mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={supabaseConfig.anonKey}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 text-xs border border-[#CCCCCC] rounded focus:border-[#3ECF8E] focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-[#888888] mt-0.5 block">
                    Found in Supabase Project Settings ➔ API ➔ Project API keys (anon public)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTestSupabase}
                    disabled={supabaseTesting || !supabaseConfig.url || !supabaseConfig.anonKey}
                    className="px-4 py-2 bg-[#3ECF8E] hover:bg-[#2EB875] text-[#111C2D] font-bold text-xs rounded transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {supabaseTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>Test & Save Supabase Connection</span>
                  </button>

                  {supabaseTestResult === 'success' && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Connected to Supabase!
                    </span>
                  )}
                  {supabaseTestResult === 'error' && (
                    <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Connection failed. Check URL, Key, or run SQL schema below.
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-[#777777]">
                  Status: <strong>{supabaseConfig.isConnected ? 'Connected & Synced' : 'Offline / Local Persistence Active'}</strong>
                </span>
              </div>
            </div>

            {/* Complete SQL Schema Script for Supabase */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E8E8] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#222222]">
                    Step-by-Step Supabase SQL Script (Run Once)
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Copy and run this SQL script in your <strong>Supabase SQL Editor</strong> to create all tables (categories, products, banners, orders) with RLS policies:
                  </p>
                </div>

                <button
                  onClick={handleCopySchema}
                  className="px-3.5 py-1.5 bg-[#9F2089] hover:bg-[#80182E] text-white font-bold text-xs rounded shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSchema ? 'SQL Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-[#1E1E2E] text-[#CDD6F4] text-xs font-mono rounded-lg overflow-x-auto max-h-96 leading-relaxed selection:bg-[#9F2089]">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* PRODUCT ADD / EDIT MODAL (with Dropzone & Color Sampler)     */}
      {/* ============================================================ */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
          <div
            className="bg-white rounded-lg shadow-2xl border border-[#E8E8E8] w-full max-w-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] bg-[#9F2089] text-white">
              <h3 className="font-bold text-base">
                {editingProduct ? 'Edit Product in Marhaba Collection' : 'Add New Product to Marhaba Collection'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#222222] mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Royal Burgundy Kadwa Zari Pure Banarasi Katan Silk Saree"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#222222] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none bg-white font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#222222] mb-1">Weaving Cluster *</label>
                  <select
                    value={productForm.artisanCluster}
                    onChange={(e) => {
                      const cluster = e.target.value;
                      const tagMap: Record<string, string> = {
                        Varanasi: 'VARANASI WEAVERS',
                        Surat: 'SURAT DIRECT',
                        Chanderi: 'CHANDERI CLUSTER',
                        Kanchipuram: 'KANCHIPURAM WEAVE',
                        Jaipur: 'JAIPUR BLOCKPRINT'
                      };
                      setProductForm({
                        ...productForm,
                        artisanCluster: cluster,
                        provenanceTag: tagMap[cluster] || `${cluster.toUpperCase()} GUILD`
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none bg-white font-medium"
                  >
                    <option value="Varanasi">Varanasi</option>
                    <option value="Surat">Surat</option>
                    <option value="Chanderi">Chanderi</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#222222] mb-1">Supplier / Loom Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.supplierName}
                    onChange={(e) => setProductForm({ ...productForm, supplierName: e.target.value })}
                    placeholder="e.g. Marhaba Direct Loom Hub"
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                  />
                </div>
              </div>

              {/* 1. Drag & Drop Images & Photoshop Eyedropper Tool */}
              <div className="border border-[#E8E8E8] rounded-lg p-3.5 bg-white">
                <ImageColorPicker
                  images={productForm.images}
                  onChangeImages={(newImages) => setProductForm({ ...productForm, images: newImages })}
                  selectedColor={productForm.color}
                  selectedHex={productForm.colorHex}
                  onChangeColor={(colorName, colorHex) =>
                    setProductForm({ ...productForm, color: colorName, colorHex })
                  }
                  allowMultiple={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#222222] mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#222222] mb-1">Original MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#222222] mb-1">Fabric Details *</label>
                  <input
                    type="text"
                    required
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="e.g. 100% Pure Katan Handloom Silk"
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#222222] mb-1">Weave / Work *</label>
                  <input
                    type="text"
                    required
                    value={productForm.weaveType}
                    onChange={(e) => setProductForm({ ...productForm, weaveType: e.target.value })}
                    placeholder="e.g. Kadwa Brocade with Real Gold Zari"
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#222222] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Complete product information and artisan provenance..."
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.freeDelivery}
                    onChange={(e) => setProductForm({ ...productForm, freeDelivery: e.target.checked })}
                    className="rounded text-[#9F2089] focus:ring-[#9F2089]"
                  />
                  <span className="font-medium text-[#222222]">Free Delivery Tag</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.mTrusted}
                    onChange={(e) => setProductForm({ ...productForm, mTrusted: e.target.checked })}
                    className="rounded text-[#9F2089] focus:ring-[#9F2089]"
                  />
                  <span className="font-medium text-[#222222]">M-Trusted Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPureSilk}
                    onChange={(e) => setProductForm({ ...productForm, isPureSilk: e.target.checked })}
                    className="rounded text-[#9F2089] focus:ring-[#9F2089]"
                  />
                  <span className="font-medium text-[#222222]">Silk Mark Certified</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#E8E8E8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#CCCCCC] rounded hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white font-bold rounded shadow-xs"
                >
                  {editingProduct ? 'Update Product' : 'Add to Marhaba Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CATEGORY ADD / EDIT MODAL                                    */}
      {/* ============================================================ */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
          <div
            className="bg-white rounded-lg shadow-2xl border border-[#E8E8E8] w-full max-w-md overflow-hidden my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] bg-[#9F2089] text-white">
              <h3 className="font-bold text-base">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#222222] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.label}
                  onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })}
                  placeholder="e.g. Pure Sarees, Bridal Lehengas"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#222222] mb-1">URL Identifier (Slug)</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  placeholder="e.g. sarees, lehengas (auto-generated if empty)"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none font-mono"
                />
              </div>

              {/* Image Uploader & Dropzone for Category */}
              <div>
                <label className="block font-bold text-[#222222] mb-1">Category Cover Image</label>
                <div className="space-y-2">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-slate-100 border border-[#CCCCCC] max-h-40 flex items-center justify-center">
                    <img
                      src={categoryForm.imageUrl}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <input
                    type="url"
                    value={categoryForm.imageUrl}
                    onChange={(e) => setCategoryForm({ ...categoryForm, imageUrl: e.target.value })}
                    placeholder="Image URL or upload"
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] text-[11px] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#222222] mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Brief summary of creations in this category..."
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E8E8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-[#CCCCCC] rounded hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white font-bold rounded shadow-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* BANNER ADD / EDIT MODAL                                      */}
      {/* ============================================================ */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
          <div
            className="bg-white rounded-lg shadow-2xl border border-[#E8E8E8] w-full max-w-lg overflow-hidden my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] bg-[#9F2089] text-white">
              <h3 className="font-bold text-base">
                {editingBanner ? 'Edit Promo Banner' : 'Add New Promo Banner'}
              </h3>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#222222] mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  placeholder="e.g. Marhaba Grand Wedding & Festive Drop"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#222222] mb-1">Subtitle *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  placeholder="e.g. Flat 70% Off On Royal Silk Sarees & Lehengas"
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#222222] mb-1">Badge Tag *</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.badgeText}
                    onChange={(e) => setBannerForm({ ...bannerForm, badgeText: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089] uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#222222] mb-1">CTA Button Text *</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-[#CCCCCC] rounded focus:border-[#9F2089]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#222222] mb-1">Banner Image URL *</label>
                <input
                  type="url"
                  required
                  value={bannerForm.imageUrl}
                  onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-[#CCCCCC] rounded font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E8E8] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 border border-[#CCCCCC] rounded hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9F2089] hover:bg-[#80182E] text-white font-bold rounded shadow-xs"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
