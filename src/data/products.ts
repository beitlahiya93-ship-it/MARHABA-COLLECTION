import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Royal Burgundy Kadwa Zari Pure Banarasi Katan Silk Saree',
    category: 'sarees',
    categoryLabel: 'Pure Silk Sarees',
    artisanCluster: 'Varanasi',
    artisanName: 'Varanasi Master Weavers Guild (Ustad Rashid Ahmed)',
    provenanceTag: 'VARANASI WEAVERS',
    supplierName: 'Varanasi Silk Loom Hub',
    supplierRating: 4.8,
    mTrusted: true,
    color: 'Royal Burgundy',
    price: 3499,
    originalPrice: 7999,
    discountPercent: 56,
    rating: 4.8,
    reviewCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Pure Katan Handloom Silk',
    weaveType: 'Kadwa Brocade with Real Gold Electroplated Zari',
    blousePiece: 'Included (0.85m Unstitched Heavy Brocade)',
    dimensions: '6.3 meters (inclusive of blouse)',
    care: 'Dry Clean Only · Store in Muslin Cloth',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: true,
    featured: true,
    availableSizes: ['Free Size (Unstitched Blouse)'],
    description: 'Directly sourced from the looms of Varanasi, this heritage Katan silk saree features antique gold floral motifs (Bootis) and a heavy regal pallu handwoven on jacquard wooden pit-looms over 18 days.',
    reviews: [
      {
        id: 'rev-1',
        userName: 'Arundhati Sen',
        rating: 5,
        date: '2 days ago',
        comment: 'The sheen and hand-feel of the pure Katan silk is breathtaking. Boutique quality at direct-weaver pricing.',
        verified: true,
        location: 'Kolkata',
        reviewImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'rev-2',
        userName: 'Priyanka Sharma',
        rating: 5,
        date: '1 week ago',
        comment: 'Wore this for my brother’s Sangeet ceremony. Received compliments throughout the evening! Zari work is pristine.',
        verified: true,
        location: 'New Delhi'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Crimson Velvet Zardozi Bridal Lehenga with Double Dupatta',
    category: 'lehengas',
    categoryLabel: 'Bridal Couture Lehengas',
    artisanCluster: 'Surat',
    artisanName: 'Surat Direct Bridal Atelier',
    provenanceTag: 'SURAT DIRECT',
    supplierName: 'Surat Bridal Hub Direct',
    supplierRating: 4.9,
    mTrusted: true,
    color: 'Crimson Red',
    price: 8999,
    originalPrice: 22499,
    discountPercent: 60,
    rating: 4.9,
    reviewCount: 840,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Micro 9000 Royal Velvet with Net Dupattas',
    weaveType: 'Intricate Hand Zardozi, Resham & Cutdana Embroidery',
    blousePiece: 'Semi-Stitched Heavy Velvet Blouse (Up to 44")',
    dimensions: 'Flair: 4.2 meters full circular flare with Can-Can canvas',
    care: 'Professional Bridal Dry Clean',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: true,
    featured: true,
    availableSizes: ['Free Size (Semi-Stitched)'],
    description: 'A showstopping bridal statement crafted in rich royal crimson micro-velvet. Embellished with heirloom zardozi threadwork, floral jaal, scalloped borders, paired with a matching velvet dupatta and a peach veil dupatta.',
    reviews: [
      {
        id: 'rev-3',
        userName: 'Meera Kapadia',
        rating: 5,
        date: '3 days ago',
        comment: 'Cannot believe the price for such an opulent lehenga. The weight and flare is true couture standard!',
        verified: true,
        location: 'Mumbai',
        reviewImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Emerald Green Chanderi Silk Tissue Saree with Meenakari Border',
    category: 'sarees',
    categoryLabel: 'Handloom Sarees',
    artisanCluster: 'Chanderi',
    artisanName: 'Chanderi Heritage Craft Guild',
    provenanceTag: 'CHANDERI CLUSTER',
    price: 2199,
    originalPrice: 4999,
    discountPercent: 56,
    rating: 4.7,
    reviewCount: 960,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Chanderi Pure Silk-Cotton Tissue Blend',
    weaveType: 'Handloom Eknaliya with Meenakari Resham Inlay',
    blousePiece: 'Included (0.8m running silk blouse)',
    dimensions: '5.5 meters saree + 0.8m blouse piece',
    care: 'Dry Clean Preferred',
    dispatchTime: 'Dispatches tomorrow',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: false,
    featured: true,
    availableSizes: ['Free Size (Unstitched)'],
    description: 'Featherlight and effortlessly draped, this Chanderi tissue silk combines natural metallic sheen with hand-inlaid jewel-toned meenakari peacocks on the border.',
    reviews: [
      {
        id: 'rev-4',
        userName: 'Tanvi Joshi',
        rating: 5,
        date: '5 days ago',
        comment: 'Extremely lightweight, yet looks like pure gold. Ideal for morning festivities and puja.',
        verified: true,
        location: 'Pune'
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Royal Burgundy Raw Silk Sherwani Set with Embroidered Stole',
    category: 'mens',
    categoryLabel: 'Men’s Royal Ethnic',
    artisanCluster: 'Varanasi',
    artisanName: 'Benares Regal Menswear Atelier',
    provenanceTag: 'VARANASI WEAVERS',
    price: 4999,
    originalPrice: 11999,
    discountPercent: 58,
    rating: 4.8,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Raw Silk with Cotton Silk Lining',
    weaveType: 'Self-Thread Texture with Antique Zari Collar & Cuffs',
    blousePiece: 'Complete 3-Piece Set: Sherwani, Churidar & Stole',
    dimensions: 'Standard Men’s Tailored Fit',
    care: 'Dry Clean Only',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: true,
    featured: true,
    availableSizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    description: 'Crafted for grooms and wedding guests, this majestic burgundy raw silk sherwani features hand-carved brass buttons, Mandarin collar embroidery, and a coordinated ivory zari stole.',
    reviews: [
      {
        id: 'rev-5',
        userName: 'Rohan Mehra',
        rating: 5,
        date: '4 days ago',
        comment: 'Fitted perfectly out of the box. Fabric has a regal natural slub texture and the brass buttons are stunning.',
        verified: true,
        location: 'Jaipur'
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'Deep Plum Pure Kanchipuram Mulberry Silk Saree with Temple Border',
    category: 'sarees',
    categoryLabel: 'Temple Handloom Silks',
    artisanCluster: 'Kanchipuram',
    artisanName: 'Kanchipuram Loom Collectives',
    provenanceTag: 'KANCHIPURAM WEAVE',
    price: 4499,
    originalPrice: 9999,
    discountPercent: 55,
    rating: 4.9,
    reviewCount: 1120,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: '100% Pure Mulberry Silk (Silk Mark Certified)',
    weaveType: 'Korvai Interlock Technique with Pure Zari',
    blousePiece: 'Contrast Rich Mustard Gold Blouse Piece Included',
    dimensions: '6.2 meters with blouse piece',
    care: 'Dry Clean Only',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: true,
    featured: false,
    availableSizes: ['Free Size (Unstitched)'],
    description: 'Woven with three single threads of silk yarn entwined with silver-gilt thread. The iconic temple spires (Gopuram motifs) line the pallu in pure radiant contrast.',
    reviews: [
      {
        id: 'rev-6',
        userName: 'Sowmya Raman',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Authentic Korvai joint and original Silk Mark tag verified. Unbelievable pricing for genuine Kanchipuram.',
        verified: true,
        location: 'Chennai'
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'Ivory & Antique Gold Georgette Floor-Length Anarkali Suit',
    category: 'anarkalis',
    categoryLabel: 'Anarkali & Festive Suits',
    artisanCluster: 'Jaipur',
    artisanName: 'Jaipur Royal Blockprint & Gota Guild',
    provenanceTag: 'JAIPUR BLOCKPRINT',
    price: 1899,
    originalPrice: 4299,
    discountPercent: 56,
    rating: 4.6,
    reviewCount: 780,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Heavy Flowing Faux Georgette with Shantoon Silk Lining',
    weaveType: 'Fine Hand Gota Patti & Zari Resham Work',
    blousePiece: 'Complete 3-Piece Stitched Set (Anarkali, Pant & Dupatta)',
    dimensions: 'Length: 52 inches · Kalis: 28 Kalis Flare',
    care: 'Gentle Hand Wash or Dry Clean',
    dispatchTime: 'Dispatches tomorrow',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: false,
    featured: false,
    availableSizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    description: 'Effortlessly graceful 28-kali flared Anarkali embellished with artisanal Jaipur gota ribbon embroidery on the yolk and hem. Accompanied by a pure chiffon dupatta.',
    reviews: [
      {
        id: 'rev-7',
        userName: 'Kavita Chawla',
        rating: 5,
        date: '1 week ago',
        comment: 'The drape and flare are majestic! Got it delivered in just 2 days. Perfect stitching.',
        verified: true,
        location: 'Chandigarh'
      }
    ]
  },
  {
    id: 'prod-7',
    title: 'Heritage 22K Gold Plated Kundan Polki Choker Necklace Set',
    category: 'jewellery',
    categoryLabel: 'Heritage Jewellery',
    artisanCluster: 'Jaipur',
    artisanName: 'Johari Bazaar Master Silversmiths',
    provenanceTag: 'JAIPUR BLOCKPRINT',
    price: 1249,
    originalPrice: 3499,
    discountPercent: 64,
    rating: 4.8,
    reviewCount: 650,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Brass Alloy with 22K Antique Micro-Gold Polish',
    weaveType: 'Hand-set Glass Polki Stones with Emerald Green Beads Drop',
    blousePiece: 'Includes Choker, Matching Jhumka Earrings & Maang Tikka',
    dimensions: 'Adjustable Dori cord for all neck sizes',
    care: 'Wipe with soft cloth · Keep away from perfumes',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: true,
    featured: true,
    availableSizes: ['One Size (Adjustable)'],
    description: 'Inspired by royal Nizam treasures, this magnificent bridal choker set features closed-setting Kundan stones bordered with natural pearl clusters and hydro-green bead drops.',
    reviews: [
      {
        id: 'rev-8',
        userName: 'Ananya Deshmukh',
        rating: 5,
        date: '6 days ago',
        comment: 'Looks exactly like real Jadau jewellery worth lakhs. The brass gold plating has zero cheap yellow tint.',
        verified: true,
        location: 'Hyderabad'
      }
    ]
  },
  {
    id: 'prod-8',
    title: 'Mustard Gold Handwoven Banarasi Brocade Silk Dupatta',
    category: 'dupattas',
    categoryLabel: 'Artisanal Dupattas',
    artisanCluster: 'Varanasi',
    artisanName: 'Benares Loom Guild',
    provenanceTag: 'VARANASI WEAVERS',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    rating: 4.7,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Chanderi Silk-Brocade with Zari Border',
    weaveType: 'All-over Mughal Jaal Hand Weave',
    blousePiece: 'Stand-alone Dupatta with Handmade Latkan Tassels',
    dimensions: '2.5 meters length × 36 inches width',
    care: 'Dry Clean Only',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: false,
    featured: false,
    availableSizes: ['One Size (2.5m)'],
    description: 'Transform any simple kurta into celebratory festive wear. Intricately woven with gold zari floral vines and finished with traditional hand-tied silk tassels.',
    reviews: [
      {
        id: 'rev-9',
        userName: 'Simran Walia',
        rating: 5,
        date: '3 days ago',
        comment: 'Great value under ₹1,000! Wore it over a plain black raw silk suit and it looked spectacular.',
        verified: true,
        location: 'Bengaluru'
      }
    ]
  },
  {
    id: 'prod-9',
    title: 'Emerald Green Katan Silk Kurta Pajama with Zari Buta',
    category: 'mens',
    categoryLabel: 'Men’s Royal Ethnic',
    artisanCluster: 'Varanasi',
    artisanName: 'Varanasi Menswear Guild',
    provenanceTag: 'VARANASI WEAVERS',
    price: 1999,
    originalPrice: 4599,
    discountPercent: 56,
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Katan Silk Blend with Ivory Cotton Pajama',
    weaveType: 'Fine Jacquard Zari Weave',
    blousePiece: '2-Piece Set: Long Kurta & Churidar Pajama',
    dimensions: 'Knee-Length Straight Cut Kurta',
    care: 'Dry Clean Recommended',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: true,
    isBridal: false,
    featured: false,
    availableSizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    description: 'Elevated festive staple for Diwali and Haldi celebrations. Finished with side slits, in-seam pockets, and delicate zari buta motifs.',
    reviews: [
      {
        id: 'rev-10',
        userName: 'Aditya Singhania',
        rating: 5,
        date: '1 week ago',
        comment: 'Rich emerald green color, looks very distinguished. Fabric breathes nicely.',
        verified: true,
        location: 'Lucknow'
      }
    ]
  },
  {
    id: 'prod-10',
    title: 'Pastel Blush Pink Georgette Chikankari Sharara Suit',
    category: 'anarkalis',
    categoryLabel: 'Festive Sharara Suits',
    artisanCluster: 'Surat',
    artisanName: 'Surat Direct Textile Collective',
    provenanceTag: 'SURAT DIRECT',
    price: 1599,
    originalPrice: 3799,
    discountPercent: 58,
    rating: 4.7,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Viscose Georgette with Shantoon Lining',
    weaveType: 'Lucknowi Chikankari Style Resham Embroidery with Mukaish',
    blousePiece: '3-Piece Set: Short Kurti, Tiered Sharara & Net Dupatta',
    dimensions: 'Tiered 3-Layer Flared Sharara',
    care: 'Gentle Machine Wash or Hand Wash',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: false,
    featured: true,
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'Dreamy pastel blush hue with delicate shadow-work embroidery and light-catching mukaish dots. The tiered sharara flows effortlessly for pre-wedding rituals.',
    reviews: [
      {
        id: 'rev-11',
        userName: 'Zoya Khan',
        rating: 5,
        date: '4 days ago',
        comment: 'Comfortable to wear all day. The color looks even prettier in person.',
        verified: true,
        location: 'Bhopal'
      }
    ]
  },
  {
    id: 'prod-11',
    title: 'Midnight Black & Antique Brass Zari Brocade Organza Saree',
    category: 'sarees',
    categoryLabel: 'Festive Organza Sarees',
    artisanCluster: 'Surat',
    artisanName: 'Surat Direct Textile Collective',
    provenanceTag: 'SURAT DIRECT',
    price: 1749,
    originalPrice: 3899,
    discountPercent: 55,
    rating: 4.8,
    reviewCount: 1340,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Korean Sheer Organza with Antique Brass Zari',
    weaveType: 'Cutwork Zari Borders with Scalloped Edges',
    blousePiece: 'Included (0.8m Raw Silk Blouse Piece with Zari Work)',
    dimensions: '5.5 meters saree + 0.8m blouse piece',
    care: 'Dry Clean Preferred',
    dispatchTime: 'Dispatches tomorrow',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: false,
    featured: false,
    availableSizes: ['Free Size (Unstitched)'],
    description: 'A striking blend of dramatic midnight black sheer organza and antique burnished brass zari weaving with contemporary scalloped lace edges.',
    reviews: [
      {
        id: 'rev-12',
        userName: 'Deepika Rao',
        rating: 5,
        date: '1 week ago',
        comment: 'The contrast of black with antique brass is super chic. Perfect evening cocktail saree.',
        verified: true,
        location: 'Bengaluru'
      }
    ]
  },
  {
    id: 'prod-12',
    title: 'Heritage Temple Jhumka Earrings with South Sea Pearls',
    category: 'jewellery',
    categoryLabel: 'Heritage Jewellery',
    artisanCluster: 'Kanchipuram',
    artisanName: 'Kanchipuram Temple Guild Artisans',
    provenanceTag: 'KANCHIPURAM WEAVE',
    price: 799,
    originalPrice: 1899,
    discountPercent: 58,
    rating: 4.9,
    reviewCount: 910,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    fabric: 'Pure Brass with 24K Matte Gold Micron Plating',
    weaveType: 'Kemp Stone Inlay with Dangling South Sea Pearl Drops',
    blousePiece: 'Pair of Heavyweight Statement Jhumkas with Ear Support Chains',
    dimensions: 'Drop Length: 7.5 cm · Weight: Lightweight 38g',
    care: 'Store in airtight box with cotton',
    dispatchTime: 'Dispatches in 24 hours',
    freeDelivery: true,
    readyToShip: true,
    isPureSilk: false,
    isBridal: true,
    featured: false,
    availableSizes: ['Standard Size'],
    description: 'Carved with traditional temple goddess and peacock iconography, accented with cabochon ruby red stones and luminous south sea pearl fringes.',
    reviews: [
      {
        id: 'rev-13',
        userName: 'Divya Nambiar',
        rating: 5,
        date: '5 days ago',
        comment: 'Very authentic antique temple finish. Matches my silk saree effortlessly!',
        verified: true,
        location: 'Kochi'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Creations' },
  { id: 'sarees', label: 'Pure Sarees' },
  { id: 'lehengas', label: 'Bridal Lehengas' },
  { id: 'anarkalis', label: 'Kurta & Anarkali' },
  { id: 'mens', label: 'Men’s Royal Ethnic' },
  { id: 'jewellery', label: 'Heritage Jewellery' },
  { id: 'dupattas', label: 'Artisanal Dupattas' }
];
