import { Product, Banner, Category, Order, SupabaseConfig } from '../types';

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- MARHABA COLLECTION: COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA & SEED DATA
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY DEFAULT ('cat_' || substr(md5(random()::text), 1, 8)),
    label TEXT NOT NULL,
    slug TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    item_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS TABLE
-- Uses category string (no rigid FK to prevent Table Editor insert blocks)
-- Uses TEXT[] for images to keep size in minimal KB without consuming Supabase bucket quota
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT ('prod_' || substr(md5(random()::text), 1, 8)),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'sarees',
    category_label TEXT NOT NULL DEFAULT 'Pure Silk Sarees',
    artisan_cluster TEXT NOT NULL DEFAULT 'Varanasi',
    artisan_name TEXT NOT NULL DEFAULT 'Marhaba Master Weavers',
    provenance_tag TEXT NOT NULL DEFAULT 'VARANASI WEAVERS',
    supplier_name TEXT DEFAULT 'Marhaba Certified Loom Hub',
    supplier_rating NUMERIC DEFAULT 4.8,
    m_trusted BOOLEAN DEFAULT true,
    color TEXT DEFAULT 'Royal Burgundy',
    color_hex TEXT DEFAULT '#6B1426',
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    discount_percent INTEGER DEFAULT 50,
    rating NUMERIC DEFAULT 4.8,
    review_count INTEGER DEFAULT 120,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    fabric TEXT NOT NULL,
    weave_type TEXT NOT NULL,
    blouse_piece TEXT DEFAULT 'Included (0.8m Unstitched)',
    dimensions TEXT DEFAULT '6.3 meters with blouse',
    care TEXT DEFAULT 'Dry Clean Only',
    dispatch_time TEXT DEFAULT 'Dispatches in 24 hours',
    free_delivery BOOLEAN DEFAULT true,
    ready_to_ship BOOLEAN DEFAULT true,
    is_pure_silk BOOLEAN DEFAULT true,
    is_bridal BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    available_sizes TEXT[] DEFAULT ARRAY['Free Size (Unstitched)'],
    description TEXT NOT NULL,
    reviews JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. HERO PROMOTIONAL BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY DEFAULT ('banner_' || substr(md5(random()::text), 1, 8)),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    badge_text TEXT NOT NULL DEFAULT 'MARHABA EXCLUSIVE',
    cta_text TEXT NOT NULL DEFAULT 'Shop Now',
    category_link TEXT NOT NULL DEFAULT 'sarees',
    image_url TEXT NOT NULL,
    bg_gradient TEXT DEFAULT 'from-[#9F2089] via-[#80182E] to-[#4B0013]',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ORDERS TABLE (Includes UPI 9334808340 and UTR number tracking)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY DEFAULT ('MC-' || floor(random() * 899999 + 100000)::text),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'upi',
    payment_phone TEXT DEFAULT '9334808340',
    utr_number TEXT,
    pricing JSONB NOT NULL,
    coupon_code TEXT,
    status TEXT DEFAULT 'confirmed',
    tracking_number TEXT,
    estimated_delivery_date TEXT,
    items JSONB NOT NULL
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) - PERMISSIVE FOR ANON & AUTHENTICATED
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Clean existing policies
DROP POLICY IF EXISTS "Allow All Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow All Insert Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow All Update Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow All Delete Categories" ON public.categories;

DROP POLICY IF EXISTS "Allow All Products" ON public.products;
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow All Insert Products" ON public.products;
DROP POLICY IF EXISTS "Allow All Update Products" ON public.products;
DROP POLICY IF EXISTS "Allow All Delete Products" ON public.products;

DROP POLICY IF EXISTS "Allow All Banners" ON public.banners;
DROP POLICY IF EXISTS "Public Read Banners" ON public.banners;
DROP POLICY IF EXISTS "Allow All Insert Banners" ON public.banners;
DROP POLICY IF EXISTS "Allow All Update Banners" ON public.banners;
DROP POLICY IF EXISTS "Allow All Delete Banners" ON public.banners;

DROP POLICY IF EXISTS "Allow All Orders" ON public.orders;
DROP POLICY IF EXISTS "Public Read Orders" ON public.orders;
DROP POLICY IF EXISTS "Allow All Insert Orders" ON public.orders;
DROP POLICY IF EXISTS "Allow All Update Orders" ON public.orders;

-- Unrestricted CRUD for Storefront & Admin Table Editor
CREATE POLICY "Allow All Categories" ON public.categories FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Products" ON public.products FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Banners" ON public.banners FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Orders" ON public.orders FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);

-- ==============================================================================
-- 7. INITIAL SEED DATA (Immediately populates Supabase Table Editor)
-- ==============================================================================

-- SEED CATEGORIES
INSERT INTO public.categories (id, label, slug, image_url, description)
VALUES
  ('all', 'All Ethnic', 'all', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80', 'Complete Marhaba Collection handcrafted ethnic & festive apparel'),
  ('sarees', 'Pure Sarees', 'sarees', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80', 'Pure Katan Banarasi, Kanchipuram, Chanderi & Organza Sarees'),
  ('lehengas', 'Bridal Lehengas', 'lehengas', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80', 'Micro-Velvet, Raw Silk & Zardozi Wedding Lehengas'),
  ('anarkalis', 'Kurti & Suits', 'anarkalis', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=300&q=80', 'Lucknowi Chikankari, Shararas & Flowing Anarkali Sets'),
  ('mens', 'Men’s Royal Ethnic', 'mens', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80', 'Raw Silk Sherwanis, Nehru Jackets & Silk Kurta Pajamas'),
  ('jewellery', 'Heritage Jewellery', 'jewellery', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80', '22K Gold Micron Plated Kundan Polki Chokers & Jhumkas'),
  ('dupattas', 'Artisanal Dupattas', 'dupattas', 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=300&q=80', 'Banarasi Zari Weave & Handloom Chanderi Stoles'),
  ('western', 'Indo-Western Fusion', 'western', 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=300&q=80', 'Contemporary Ethnic Co-ord Sets, Tunics & Capes')
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  slug = EXCLUDED.slug,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description;

-- SEED BANNERS
INSERT INTO public.banners (id, title, subtitle, badge_text, cta_text, category_link, image_url, bg_gradient, active)
VALUES
  ('banner-1', 'Lowest Prices Every Day', 'Free Delivery · Cash On Delivery · 7-Day Easy Returns', 'MARHABA MEGA DROP', 'Shop Sarees @ ₹299', 'sarees', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80', 'from-[#9F2089] via-[#80182E] to-[#4B0013]', true),
  ('banner-2', 'Direct From Surat & Varanasi Weavers', 'Zero Middleman Markup · Guaranteed Silk Mark Certified', 'DIRECT LOOM PRICES', 'Explore Banarasi Weaves', 'sarees', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80', 'from-[#6B1426] via-[#9F2089] to-[#775A00]', true),
  ('banner-3', 'Royal Bridal & Wedding Couture', 'Micro-Velvet Lehengas, Sherwanis & Nizam Polki Jewellery', 'FLAT 60% OFF', 'Shop Bridal Edit', 'lehengas', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80', 'from-[#80182E] via-[#4B0013] to-[#111C2D]', true),
  ('banner-4', 'Festive Kurta Sets & Anarkalis', 'Lucknowi Chikankari, Shararas & Flowing Georgette Suits', 'TRENDING NOW', 'Explore Kurtis & Sets', 'anarkalis', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80', 'from-[#9F2089] via-[#A21D7F] to-[#581C87]', true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  badge_text = EXCLUDED.badge_text,
  cta_text = EXCLUDED.cta_text,
  category_link = EXCLUDED.category_link,
  image_url = EXCLUDED.image_url,
  bg_gradient = EXCLUDED.bg_gradient,
  active = EXCLUDED.active;

-- SEED INITIAL PRODUCTS
INSERT INTO public.products (
  id, title, category, category_label, artisan_cluster, artisan_name, provenance_tag, supplier_name,
  supplier_rating, m_trusted, color, color_hex, price, original_price, discount_percent, rating,
  review_count, images, fabric, weave_type, blouse_piece, dimensions, care, dispatch_time,
  free_delivery, ready_to_ship, is_pure_silk, is_bridal, featured, available_sizes, description
)
VALUES
  (
    'prod-1',
    'Royal Burgundy Kadwa Zari Pure Banarasi Katan Silk Saree',
    'sarees',
    'Pure Silk Sarees',
    'Varanasi',
    'Varanasi Master Weavers Guild (Ustad Rashid Ahmed)',
    'VARANASI WEAVERS',
    'Varanasi Silk Loom Hub',
    4.8,
    true,
    'Royal Burgundy',
    '#6B1426',
    3499,
    7999,
    56,
    4.8,
    1420,
    ARRAY[
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    '100% Pure Katan Handloom Silk',
    'Kadwa Brocade with Real Gold Electroplated Zari',
    'Included (0.85m Unstitched Heavy Brocade)',
    '6.3 meters (inclusive of blouse)',
    'Dry Clean Only · Store in Muslin Cloth',
    'Dispatches in 24 hours',
    true,
    true,
    true,
    true,
    true,
    ARRAY['Free Size (Unstitched Blouse)'],
    'Directly sourced from the looms of Varanasi, this heritage Katan silk saree features antique gold floral motifs (Bootis) and a heavy regal pallu handwoven on jacquard wooden pit-looms over 18 days.'
  ),
  (
    'prod-2',
    'Crimson Bridal Micro-Velvet Handcrafted Zardozi Wedding Lehenga',
    'lehengas',
    'Bridal Lehengas',
    'Surat',
    'Surat Artisan Collective (Kala Kunj)',
    'SURAT DIRECT',
    'Surat Zari Craft Works',
    4.9,
    true,
    'Maroon / Crimson',
    '#80182E',
    8999,
    19999,
    55,
    4.9,
    890,
    ARRAY[
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    'Heavy Micro-Velvet 9000 & Net',
    'Intricate Zardozi, Cutdana & Resham Embroidery',
    'Unstitched Velvet Blouse with Heavy Sleeve Work',
    'Semi-Stitched (Up to 42 waist, 3.8m Ghera)',
    'Specialist Bridal Dry Clean Only',
    'Dispatches in 24 hours',
    true,
    true,
    false,
    true,
    true,
    ARRAY['Semi-Stitched (Waist 30-42)'],
    'Royal couture bridal lehenga crafted with dense French knot zardozi and antique gold wire embroidery.'
  ),
  (
    'prod-3',
    'Emerald Green Pure Kanchipuram Korvai Temple Border Silk Saree',
    'sarees',
    'Pure Silk Sarees',
    'Kanchipuram',
    'Kanchipuram Handloom Cooperative Society',
    'KANCHIPURAM SILK',
    'Southern Loom Registry',
    4.7,
    true,
    'Emerald Green',
    '#0B6623',
    4299,
    9499,
    55,
    4.7,
    630,
    ARRAY[
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    'Pure Mulberry Silk (Silk Mark Certified)',
    'Korvai Interlocking Weave with Contrast Red Temple Zari',
    'Attached Contrast Crimson Red (0.8m)',
    '6.2 meters (inclusive of blouse)',
    'Dry Clean Only · Air in shade periodically',
    'Dispatches in 24 hours',
    true,
    true,
    true,
    false,
    true,
    ARRAY['Free Size (Unstitched Blouse)'],
    'Authentic heavy Kanchipuram silk handwoven in Tamil Nadu using interlocked body and border weaving technique.'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  images = EXCLUDED.images;

-- ==============================================================================
-- SUCCESS: Tables, RLS, and Seed Data are active! Check your Table Editor now!
-- ==============================================================================
`;

const SUPABASE_CONFIG_KEY = 'marhaba_supabase_config';

export function getSupabaseConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading Supabase config', e);
  }
  return {
    url: '',
    anonKey: '',
    isConnected: false,
    autoSync: true
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving Supabase config', e);
  }
}

// Clean URL helper
function cleanSupabaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

// Diagnostic connection tester with informative error messages
export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  if (!url || !key) {
    return { success: false, message: 'Please provide both Supabase URL and Anon API key.' };
  }

  const base = cleanSupabaseUrl(url);
  if (!base.startsWith('https://') || !base.includes('.supabase.co')) {
    return { success: false, message: 'URL should look like: https://xyzcompany.supabase.co' };
  }

  try {
    const res = await fetch(`${base}/rest/v1/categories?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': key.trim(),
        'Authorization': `Bearer ${key.trim()}`
      }
    });

    if (res.status === 200) {
      return { success: true, message: 'Connected successfully! Supabase database and tables are verified.' };
    }

    if (res.status === 401 || res.status === 403) {
      return { success: false, message: 'Invalid Anon API Key or RLS Policy blocking access. Run the SQL script below.' };
    }

    if (res.status === 404) {
      return { success: false, message: 'Table "categories" not found. Please run the SQL schema script in Supabase SQL Editor.' };
    }

    const errText = await res.text();
    return { success: false, message: `Supabase returned status ${res.status}: ${errText}` };
  } catch (err: any) {
    return { success: false, message: `Network error connecting to Supabase: ${err.message || 'CORS or unreachable URL'}` };
  }
}

// ---------------------------------------------------------------------------
// DATA MAPPERS (CamelCase React <-> SnakeCase Supabase PostgreSQL)
// ---------------------------------------------------------------------------

export function productToRow(p: Product): Record<string, any> {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    category_label: p.categoryLabel,
    artisan_cluster: p.artisanCluster,
    artisan_name: p.artisanName,
    provenance_tag: p.provenanceTag,
    supplier_name: p.supplierName || 'Marhaba Certified Loom Hub',
    supplier_rating: p.supplierRating ?? 4.8,
    m_trusted: p.mTrusted ?? true,
    color: p.color || 'Royal Burgundy',
    color_hex: p.colorHex || '#6B1426',
    price: p.price,
    original_price: p.originalPrice,
    discount_percent: p.discountPercent,
    rating: p.rating,
    review_count: p.reviewCount,
    images: p.images || [],
    fabric: p.fabric,
    weave_type: p.weaveType,
    blouse_piece: p.blousePiece,
    dimensions: p.dimensions,
    care: p.care,
    dispatch_time: p.dispatchTime || 'Dispatches in 24 hours',
    free_delivery: p.freeDelivery,
    ready_to_ship: p.readyToShip,
    is_pure_silk: p.isPureSilk,
    is_bridal: p.isBridal,
    featured: p.featured ?? false,
    available_sizes: p.availableSizes || ['Free Size (Unstitched)'],
    description: p.description,
    reviews: p.reviews || []
  };
}

export function rowToProduct(row: any): Product {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    categoryLabel: row.category_label || row.category,
    artisanCluster: row.artisan_cluster || 'Varanasi',
    artisanName: row.artisan_name || 'Marhaba Master Weavers',
    provenanceTag: row.provenance_tag || 'VARANASI WEAVERS',
    supplierName: row.supplier_name,
    supplierRating: Number(row.supplier_rating || 4.8),
    mTrusted: row.m_trusted ?? true,
    color: row.color,
    colorHex: row.color_hex,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    discountPercent: Number(row.discount_percent || 50),
    rating: Number(row.rating || 4.8),
    reviewCount: Number(row.review_count || 120),
    images: Array.isArray(row.images) ? row.images : (row.images ? [row.images] : []),
    fabric: row.fabric || 'Pure Silk',
    weaveType: row.weave_type || 'Handloom Weave',
    blousePiece: row.blouse_piece || 'Included',
    dimensions: row.dimensions || '6.3 meters with blouse',
    care: row.care || 'Dry Clean Only',
    dispatchTime: row.dispatch_time || 'Dispatches in 24 hours',
    freeDelivery: Boolean(row.free_delivery),
    readyToShip: Boolean(row.ready_to_ship),
    isPureSilk: Boolean(row.is_pure_silk),
    isBridal: Boolean(row.is_bridal),
    featured: Boolean(row.featured),
    availableSizes: Array.isArray(row.available_sizes) ? row.available_sizes : ['Free Size'],
    description: row.description || '',
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  };
}

export function categoryToRow(c: Category): Record<string, any> {
  return {
    id: c.id,
    label: c.label,
    slug: c.slug,
    image_url: c.imageUrl,
    description: c.description,
    item_count: c.itemCount ?? 0
  };
}

export function rowToCategory(row: any): Category {
  return {
    id: row.id,
    label: row.label,
    slug: row.slug,
    imageUrl: row.image_url,
    description: row.description,
    itemCount: row.item_count ?? 0
  };
}

export function bannerToRow(b: Banner): Record<string, any> {
  return {
    id: b.id,
    title: b.title,
    subtitle: b.subtitle,
    badge_text: b.badgeText,
    cta_text: b.ctaText,
    category_link: b.categoryLink,
    image_url: b.imageUrl,
    bg_gradient: b.bgGradient,
    active: b.active
  };
}

export function rowToBanner(row: any): Banner {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    badgeText: row.badge_text,
    ctaText: row.cta_text,
    categoryLink: row.category_link,
    imageUrl: row.image_url,
    bgGradient: row.bg_gradient,
    active: Boolean(row.active)
  };
}

export function orderToRow(o: Order): Record<string, any> {
  return {
    id: o.id,
    created_at: o.createdAt,
    shipping_address: o.shippingAddress,
    payment_method: o.paymentMethod,
    payment_phone: o.paymentPhone || '9334808340',
    utr_number: o.utrNumber,
    pricing: o.pricing,
    coupon_code: o.couponCode,
    status: o.status,
    tracking_number: o.trackingNumber,
    estimated_delivery_date: o.estimatedDeliveryDate,
    items: o.items
  };
}

export function rowToOrder(row: any): Order {
  return {
    id: row.id,
    createdAt: row.created_at,
    shippingAddress: row.shipping_address,
    paymentMethod: row.payment_method,
    paymentPhone: row.payment_phone || '9334808340',
    utrNumber: row.utr_number,
    pricing: row.pricing,
    couponCode: row.coupon_code,
    status: row.status,
    trackingNumber: row.tracking_number,
    estimatedDeliveryDate: row.estimated_delivery_date,
    items: row.items || []
  };
}

// ---------------------------------------------------------------------------
// REAL LIVE REST SYNC OPERATIONS
// ---------------------------------------------------------------------------

async function postgrestRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
  config?: SupabaseConfig
): Promise<any> {
  const cfg = config || getSupabaseConfig();
  if (!cfg.url || !cfg.anonKey) return null;

  const base = cleanSupabaseUrl(cfg.url);
  const url = `${base}/rest/v1/${endpoint}`;

  const headers: Record<string, string> = {
    'apikey': cfg.anonKey.trim(),
    'Authorization': `Bearer ${cfg.anonKey.trim()}`,
    'Content-Type': 'application/json'
  };

  if (method === 'POST') {
    // PostgREST Upsert Header
    headers['Prefer'] = 'resolution=merge-duplicates,return=representation';
  } else if (method === 'PATCH' || method === 'DELETE') {
    headers['Prefer'] = 'return=representation';
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`PostgREST ${method} ${endpoint} failed (${res.status}):`, errorText);
    throw new Error(`Supabase Error (${res.status}): ${errorText}`);
  }

  if (method === 'DELETE') return true;
  return res.json();
}

/**
 * Fetch all products directly from Supabase Table Editor
 */
export async function fetchProductsFromSupabase(config?: SupabaseConfig): Promise<Product[] | null> {
  try {
    const rows = await postgrestRequest('products?select=*&order=created_at.desc', 'GET', undefined, config);
    if (Array.isArray(rows)) {
      return rows.map(rowToProduct);
    }
  } catch (err) {
    console.warn('Could not fetch products from Supabase', err);
  }
  return null;
}

/**
 * Fetch all categories directly from Supabase Table Editor
 */
export async function fetchCategoriesFromSupabase(config?: SupabaseConfig): Promise<Category[] | null> {
  try {
    const rows = await postgrestRequest('categories?select=*&order=created_at.asc', 'GET', undefined, config);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map(rowToCategory);
    }
  } catch (err) {
    console.warn('Could not fetch categories from Supabase', err);
  }
  return null;
}

/**
 * Fetch all banners directly from Supabase Table Editor
 */
export async function fetchBannersFromSupabase(config?: SupabaseConfig): Promise<Banner[] | null> {
  try {
    const rows = await postgrestRequest('banners?select=*&order=created_at.asc', 'GET', undefined, config);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map(rowToBanner);
    }
  } catch (err) {
    console.warn('Could not fetch banners from Supabase', err);
  }
  return null;
}

/**
 * Fetch all orders directly from Supabase Table Editor
 */
export async function fetchOrdersFromSupabase(config?: SupabaseConfig): Promise<Order[] | null> {
  try {
    const rows = await postgrestRequest('orders?select=*&order=created_at.desc', 'GET', undefined, config);
    if (Array.isArray(rows)) {
      return rows.map(rowToOrder);
    }
  } catch (err) {
    console.warn('Could not fetch orders from Supabase', err);
  }
  return null;
}

/**
 * Upsert a Product into Supabase Table Editor
 */
export async function saveProductToSupabase(product: Product, config?: SupabaseConfig): Promise<boolean> {
  try {
    const row = productToRow(product);
    await postgrestRequest('products', 'POST', row, config);
    return true;
  } catch (err) {
    console.error('Failed saving product to Supabase', err);
    return false;
  }
}

/**
 * Delete a Product from Supabase Table Editor
 */
export async function deleteProductFromSupabase(productId: string, config?: SupabaseConfig): Promise<boolean> {
  try {
    await postgrestRequest(`products?id=eq.${encodeURIComponent(productId)}`, 'DELETE', undefined, config);
    return true;
  } catch (err) {
    console.error('Failed deleting product from Supabase', err);
    return false;
  }
}

/**
 * Upsert a Category into Supabase Table Editor
 */
export async function saveCategoryToSupabase(category: Category, config?: SupabaseConfig): Promise<boolean> {
  try {
    const row = categoryToRow(category);
    await postgrestRequest('categories', 'POST', row, config);
    return true;
  } catch (err) {
    console.error('Failed saving category to Supabase', err);
    return false;
  }
}

/**
 * Delete a Category from Supabase Table Editor
 */
export async function deleteCategoryFromSupabase(categoryId: string, config?: SupabaseConfig): Promise<boolean> {
  try {
    await postgrestRequest(`categories?id=eq.${encodeURIComponent(categoryId)}`, 'DELETE', undefined, config);
    return true;
  } catch (err) {
    console.error('Failed deleting category from Supabase', err);
    return false;
  }
}

/**
 * Upsert a Banner into Supabase Table Editor
 */
export async function saveBannerToSupabase(banner: Banner, config?: SupabaseConfig): Promise<boolean> {
  try {
    const row = bannerToRow(banner);
    await postgrestRequest('banners', 'POST', row, config);
    return true;
  } catch (err) {
    console.error('Failed saving banner to Supabase', err);
    return false;
  }
}

/**
 * Delete a Banner from Supabase Table Editor
 */
export async function deleteBannerFromSupabase(bannerId: string, config?: SupabaseConfig): Promise<boolean> {
  try {
    await postgrestRequest(`banners?id=eq.${encodeURIComponent(bannerId)}`, 'DELETE', undefined, config);
    return true;
  } catch (err) {
    console.error('Failed deleting banner from Supabase', err);
    return false;
  }
}

/**
 * Upsert an Order into Supabase Table Editor
 */
export async function saveOrderToSupabase(order: Order, config?: SupabaseConfig): Promise<boolean> {
  try {
    const row = orderToRow(order);
    await postgrestRequest('orders', 'POST', row, config);
    return true;
  } catch (err) {
    console.error('Failed saving order to Supabase', err);
    return false;
  }
}

/**
 * 1-Click Master Batch Sync: Pushes all local categories, products, banners, orders to Supabase
 */
export async function batchSyncAllToSupabase(
  categories: Category[],
  products: Product[],
  banners: Banner[],
  orders: Order[],
  config?: SupabaseConfig
): Promise<{ success: boolean; message: string; details: { categories: number; products: number; banners: number; orders: number } }> {
  const cfg = config || getSupabaseConfig();
  if (!cfg.url || !cfg.anonKey) {
    return {
      success: false,
      message: 'Supabase URL or Anon key is missing. Please enter them above.',
      details: { categories: 0, products: 0, banners: 0, orders: 0 }
    };
  }

  try {
    // 1. Sync Categories first
    if (categories.length > 0) {
      const catRows = categories.map(categoryToRow);
      await postgrestRequest('categories', 'POST', catRows, cfg);
    }

    // 2. Sync Banners
    if (banners.length > 0) {
      const bannerRows = banners.map(bannerToRow);
      await postgrestRequest('banners', 'POST', bannerRows, cfg);
    }

    // 3. Sync Products
    if (products.length > 0) {
      const prodRows = products.map(productToRow);
      await postgrestRequest('products', 'POST', prodRows, cfg);
    }

    // 4. Sync Orders if any
    if (orders.length > 0) {
      const orderRows = orders.map(orderToRow);
      await postgrestRequest('orders', 'POST', orderRows, cfg);
    }

    return {
      success: true,
      message: `Successfully synchronized to Supabase Table Editor! Rows updated: ${categories.length} Categories, ${products.length} Products, ${banners.length} Banners, ${orders.length} Orders.`,
      details: {
        categories: categories.length,
        products: products.length,
        banners: banners.length,
        orders: orders.length
      }
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Sync failed: ${err.message || 'Make sure the SQL Schema has been executed in Supabase SQL editor.'}`,
      details: { categories: 0, products: 0, banners: 0, orders: 0 }
    };
  }
}
