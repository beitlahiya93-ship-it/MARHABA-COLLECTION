import { Product, Banner, Category, Order, SupabaseConfig } from '../types';

export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- MARHABA COLLECTION: FULL SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    description TEXT,
    item_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS TABLE (Images saved as URL text array to preserve Supabase 2GB storage)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    category_label TEXT NOT NULL,
    artisan_cluster TEXT NOT NULL,
    artisan_name TEXT NOT NULL,
    provenance_tag TEXT NOT NULL,
    supplier_name TEXT,
    supplier_rating NUMERIC DEFAULT 4.8,
    m_trusted BOOLEAN DEFAULT true,
    color TEXT,
    color_hex TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    discount_percent INTEGER NOT NULL,
    rating NUMERIC DEFAULT 4.8,
    review_count INTEGER DEFAULT 120,
    images TEXT[] NOT NULL,
    fabric TEXT NOT NULL,
    weave_type TEXT NOT NULL,
    blouse_piece TEXT,
    dimensions TEXT,
    care TEXT,
    dispatch_time TEXT DEFAULT 'Dispatches in 24 hours',
    free_delivery BOOLEAN DEFAULT true,
    ready_to_ship BOOLEAN DEFAULT true,
    is_pure_silk BOOLEAN DEFAULT true,
    is_bridal BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    available_sizes TEXT[] DEFAULT ARRAY['Free Size'],
    description TEXT NOT NULL,
    reviews JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    badge_text TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    category_link TEXT NOT NULL,
    image_url TEXT NOT NULL,
    bg_gradient TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ORDERS TABLE (Includes UPI 9334808340 and UTR transaction tracking)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_method TEXT NOT NULL,
    payment_phone TEXT DEFAULT '9334808340',
    utr_number TEXT,
    pricing JSONB NOT NULL,
    coupon_code TEXT,
    status TEXT DEFAULT 'confirmed',
    tracking_number TEXT,
    estimated_delivery_date TEXT,
    items JSONB NOT NULL
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ/WRITE POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow Public Anonymous Read
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Banners" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);

-- Allow Public / Authenticated Insert & Update
CREATE POLICY "Allow All Insert Categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow All Delete Categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow All Insert Products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow All Delete Products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow All Insert Banners" ON public.banners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Banners" ON public.banners FOR UPDATE USING (true);
CREATE POLICY "Allow All Delete Banners" ON public.banners FOR DELETE USING (true);

CREATE POLICY "Allow All Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Orders" ON public.orders FOR UPDATE USING (true);

-- ========================================================
-- END OF SCHEMA SCRIPT. RUN THIS SCRIPT IN SUPABASE SQL EDITOR!
-- ========================================================
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

// Light REST helper to talk to Supabase PostgREST API without bloated SDK weight
export async function testSupabaseConnection(url: string, key: string): Promise<boolean> {
  if (!url || !key) return false;
  try {
    const cleanUrl = url.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/rest/v1/products?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    return res.status === 200;
  } catch (err) {
    console.error('Supabase connection test failed', err);
    return false;
  }
}
