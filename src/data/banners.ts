import { Banner } from '../types';

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Lowest Prices Every Day',
    subtitle: 'Free Delivery · Cash On Delivery · 7-Day Easy Returns',
    badgeText: 'MEESHO MEGA DROP',
    ctaText: 'Shop Sarees @ ₹299',
    categoryLink: 'sarees',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#9F2089] via-[#80182E] to-[#4B0013]',
    active: true
  },
  {
    id: 'banner-2',
    title: 'Direct From Surat & Varanasi Weavers',
    subtitle: 'Zero Middleman Markup · Guaranteed Silk Mark Certified',
    badgeText: 'DIRECT LOOM PRICES',
    ctaText: 'Explore Banarasi Weaves',
    categoryLink: 'sarees',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#6B1426] via-[#9F2089] to-[#775A00]',
    active: true
  },
  {
    id: 'banner-3',
    title: 'Royal Bridal & Wedding Couture',
    subtitle: 'Micro-Velvet Lehengas, Sherwanis & Nizam Polki Jewellery',
    badgeText: 'FLAT 60% OFF',
    ctaText: 'Shop Bridal Edit',
    categoryLink: 'lehengas',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#80182E] via-[#4B0013] to-[#111C2D]',
    active: true
  },
  {
    id: 'banner-4',
    title: 'Festive Kurta Sets & Anarkalis',
    subtitle: 'Lucknowi Chikankari, Shararas & Flowing Georgette Suits',
    badgeText: 'TRENDING NOW',
    ctaText: 'Explore Kurtis & Sets',
    categoryLink: 'anarkalis',
    imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#9F2089] via-[#A21D7F] to-[#581C87]',
    active: true
  }
];
