export type ProductReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productVariation?: string;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  maker: string; // Shop name
  makerAvatar?: string;
  makerSales?: number;
  starSeller?: boolean;
  price: number;
  originalPrice?: number;
  discount?: string;
  bestseller?: boolean;
  etsyPick?: boolean;
  freeShipping?: boolean;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  description: string;
  itemDetails: string[];
  materials?: string[];
  variations?: {
    name: string;
    options: string[];
  }[];
  allowsPersonalization?: boolean;
  personalizationPrompt?: string;
  inDemandCount?: number;
};

export const categories = [
  'All',
  'Feng Shui Decor',
  'Feng Shui Jewelry',
  'Feng Shui Candles',
  'Crystals & Trees',
  'Zen & Meditation',
  'Feng Shui Books',
  'Wealth & Abundance',
  'Protection & Charms',
] as const;

export type CategoryCircleInfo = {
  name: string;
  slug: string;
  image: string;
};

export const circularCategories: CategoryCircleInfo[] = [
  {
    name: 'Feng Shui Decor',
    slug: 'Feng Shui Decor',
    image:
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Feng Shui Jewelry',
    slug: 'Feng Shui Jewelry',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Feng Shui Candles',
    slug: 'Feng Shui Candles',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Feng Shui Books',
    slug: 'Feng Shui Books',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Crystals & Trees',
    slug: 'Crystals & Trees',
    image:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Zen & Meditation',
    slug: 'Zen & Meditation',
    image:
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=500&q=80',
  },
];

export const summerCollections: CategoryCircleInfo[] = [
  {
    name: 'Wealth & Prosperity',
    slug: 'Feng Shui Decor',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Health & Longevity',
    slug: 'Feng Shui Decor',
    image:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Love & Harmony',
    slug: 'Feng Shui Jewelry',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Protection & Shielding',
    slug: 'Feng Shui Decor',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Zen Meditation Space',
    slug: 'Zen & Meditation',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Career & Success',
    slug: 'Feng Shui Decor',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
];

export const birthdayHeroCards = [
  {
    title: 'Feng Shui Wealth Corner Starter Kits',
    slug: 'Feng Shui Decor',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Cinnabar & Obsidian Talismans',
    slug: 'Feng Shui Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Natural Citrine & Amethyst Money Trees',
    slug: 'Crystals & Trees',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
  },
];

export const birthdayProductPicks = [
  {
    id: 'b1',
    title: '2026 Red String Zodiac Luck Bracelet with Cinnabar',
    price: 850,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'b2',
    title: 'Handcrafted Solid Brass Dragon Turtle with Ingot',
    price: 3200,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'b3',
    title: 'Natural Citrine Crystal Bonsai Tree on Real Wood Base',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'b4',
    title: 'Traditional Convex Brass Bagua Mirror for Protection',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'b5',
    title: 'Authentic Tibetan Singing Bowl Healing Sound Kit',
    price: 2990,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'b6',
    title: '7 Chakra Natural Raw Healing Gemstones Hanging Set',
    price: 1680,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80',
  },
];

export const specialGiftCategories = [
  {
    name: 'Wealth Corners',
    slug: 'Feng Shui Decor',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Protection Mirrors & Charms',
    slug: 'Feng Shui Decor',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Abundance Candles',
    slug: 'Feng Shui Candles',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pixiu Luck Bracelets',
    slug: 'Feng Shui Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Meditation Bowls',
    slug: 'Zen & Meditation',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80',
  },
];

export const todaysDeals = [
  {
    id: 'd1',
    title: 'Temple-Blessed 2026 Red String Zodiac Luck Bracelet with Cinnabar',
    price: 699,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd2',
    title: 'Natural Citrine Gemstone Bonsai Wealth Tree on Real Agate Base',
    price: 2445,
    originalPrice: 3705,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd3',
    title: 'Handcrafted Solid Brass Dragon Turtle with Baby & Wealth Ingot',
    price: 2850,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd4',
    title: 'Raw Black Obsidian Pixiu Prosperity & Energy Shielding Bracelet',
    price: 902,
    originalPrice: 1503,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd5',
    title: '328 Golden Abundance & Infinite Wealth Framed Art Canvas Print',
    price: 1499,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd6',
    title: 'Authentic Hand-Hammered Tibetan Singing Bowl Sound Healing Kit',
    price: 1850,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd7',
    title: 'Solid Brass Traditional Convex Bagua Mirror for Door Protection',
    price: 950,
    originalPrice: 1600,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
];

export const fashionGuideData = {
  title: "Miracle feng shui's Guide to Energy & Harmony",
  subtitle: "From sacred brass talismans to handcrafted healing crystals, everything you need to balance your home and spirit.",
  sweatshirts: {
    title: 'Embroidered Yin Yang Organic Meditation Robe',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    slug: 'Zen & Meditation',
  },
  mensOvershirt: {
    title: 'Hand-Carved Green Jade Pi Yao Wealth Talisman',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    slug: 'Feng Shui Jewelry',
  },
  toteBag: {
    title: 'Tibetan Singing Bowl Meditation & Sound Cleansing',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/fashion-craft-1.mp4',
    slug: 'Zen & Meditation',
  },
  linenBlouse: {
    title: 'Natural Raw Citrine Wealth Cluster Crystal on Wood',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    slug: 'Crystals & Trees',
  },
  metallicHeart: {
    title: 'Seven Chakra Orgonite Energy Pyramid',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/fashion-craft-2.mp4',
    slug: 'Feng Shui Decor',
  },
  spiralEarrings: {
    title: 'Hand-Forged Brass Bagua & Windchime Protection',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/fashion-craft-3.mp4',
    slug: 'Feng Shui Decor',
  },
};

export const blogPosts = [
  {
    id: 'blog-1',
    category: 'Shopping Guides',
    title: 'How to activate your home\'s southeast wealth corner with Feng Shui',
    summary: 'Discover the exact placements for water elements, citrine crystals, and dragon turtles to amplify your home\'s prosperity.',
    slug: '/shop?category=Feng%20Shui%20Decor',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    collage: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'blog-2',
    category: 'Shopping Guides',
    title: 'The power of Pixiu & Cinnabar: Attracting prosperity and protection in 2026',
    summary: 'Learn the ancient art of wearing sacred red string cinnabar beads and how the Pixiu talisman guards your financial harmony.',
    slug: '/shop?category=Feng%20Shui%20Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-3',
    category: 'Gift Ideas',
    title: '11 sacred crafts that make shopping on Miracle feng shui special',
    summary: 'Get to know the artistry behind authentic Tibetan singing bowls, hand-carved jade statues, and artisan crystal bonsai trees.',
    slug: '/shop?category=Zen%20%26%20Meditation',
    hasOrangeBar: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    collage: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
    ],
  },
];



export const products: Product[] = [
  {
    id: '4565611181',
    name: 'Feng Shui Symbol Fortune Attraction • Golden Water Tap Flowing Wealth Canvas Print • Feng Shui Abundance & Prosperity Wall Art Decor',
    maker: 'MiracleFengShuiArt',
    makerAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    makerSales: 52400,
    starSeller: true,
    price: 1499,
    originalPrice: 2499,
    discount: '40% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 4890,
    category: 'Feng Shui Decor',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'The sacred Golden Water Tap flowing endless gold coins into a celestial mountain river is one of the most revered symbols in traditional Feng Shui. It represents continuous, unobstructed wealth flow, career ascension, and unlimited prosperity.',
    itemDetails: [
      'Giclée museum-quality archival canvas with vibrant golden pigments',
      'Solid wooden framing with pre-installed mounting brackets',
      'Waterproof, fade-resistant UV protection coating',
      'Consecrated with positive Feng Shui harmony blessing',
    ],
    materials: ['Archival Cotton Canvas', 'Solid Pine Wood Frame', 'Golden Pigment Ink'],
    variations: [
      {
        name: 'Frame & Finish Style',
        options: ['Gilded Gold Frame', 'Solid Dark Walnut Frame', 'Modern Black Metal Frame', 'Rolled Canvas (Unframed)'],
      },
      {
        name: 'Dimensions / Size',
        options: ['12" x 16" (30 x 40 cm)', '18" x 24" (45 x 60 cm)', '24" x 36" (60 x 90 cm)', '30" x 40" (75 x 100 cm)'],
      },
    ],
    allowsPersonalization: true,
    personalizationPrompt: 'Add custom family name, business dedication, or Feng Shui blessing text (optional):',
    inDemandCount: 24,
  },
  {
    id: 'e1',
    name: 'Temple-Blessed 2026 Red String Zodiac Luck Bracelet with Cinnabar • Chinese Feng Shui Wealth & Prosperity Amulet',
    maker: 'ZenHarmonyAmulets',
    makerAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    makerSales: 48200,
    starSeller: true,
    price: 699,
    originalPrice: 1399,
    discount: '50% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 4210,
    category: 'Feng Shui Jewelry',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475152-478d130ee79e?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Consecrated and blessed with sacred mantras. Hand-braided red silk cord featuring natural cinnabar beads to ward off negative energy and attract infinite wealth in 2026.',
    itemDetails: [
      'Handmade item with natural cinnabar and red silk',
      'Adjustable cord fit (6" to 8.5")',
      'Blessed at ancient Taoist temple',
      'Comes in velvet gift pouch with blessing card',
    ],
    materials: ['Natural Cinnabar', 'Silk Cord', 'Gold Vermeil Beads'],
    inDemandCount: 18,
  },
  {
    id: 'e2',
    name: 'Natural Citrine Crystal Bonsai Wealth Tree on Real Agate Slice • Feng Shui Money Tree for Abundance & Prosperity',
    maker: 'SacredCrystalSanctuary',
    makerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    makerSales: 29450,
    starSeller: true,
    price: 2445,
    originalPrice: 3705,
    discount: '34% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 3820,
    category: 'Crystals & Trees',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Crafted with hundreds of natural raw golden citrine crystal chips wired into copper branches on a natural Brazilian agate slice base. Ideal for the Southeast wealth corner.',
    itemDetails: [
      'Handcrafted natural citrine gemstone',
      'Natural Brazilian agate slice base',
      'Flexible hand-twisted copper branches',
      'Height approx. 7 inches',
    ],
    inDemandCount: 14,
  },
  {
    id: 'e3',
    name: 'Hand-Cast Solid Brass Dragon Turtle with Baby & Wealth Ingot • Powerful Feng Shui Symbol for Career & Longevity',
    maker: 'AncientFengShuiMasters',
    makerAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    makerSales: 32100,
    starSeller: true,
    price: 2850,
    originalPrice: 4200,
    discount: '32% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 2900,
    category: 'Feng Shui Decor',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Heavy solid brass Dragon Turtle sitting on coins and ingots with baby turtle on its back. Combines the dragon\'s celestial power with the turtle\'s steadfast protection and longevity.',
    itemDetails: [
      '100% Solid Cast Brass',
      'Weight: 750g',
      'Dimensions: 5" x 3.5" x 3.8"',
      'Finished with antiqued golden patina',
    ],
    inDemandCount: 12,
  },
  {
    id: 'e4',
    name: 'Authentic Hand-Hammered Tibetan Singing Bowl Sound Healing Set • Meditation & Energy Space Cleansing Kit',
    maker: 'HimalayanZenSound',
    makerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    makerSales: 19800,
    starSeller: true,
    price: 1850,
    originalPrice: 2800,
    discount: '34% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 2150,
    category: 'Zen & Meditation',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Handcrafted in Nepal by multi-generational metalsmiths using traditional 7-metal alloy. Emits deep, resonant harmonic vibrations that instantly clear negative stagnant Chi.',
    itemDetails: [
      'Hand-hammered 7-metal bronze alloy',
      'Includes dual-end suede rosewood mallet',
      'Hand-sewn silk brocade ring cushion',
      'Diameter: 4.5 inches / F Note resonance',
    ],
    inDemandCount: 9,
  },
  {
    id: 'e5',
    name: 'Natural Black Obsidian & 24K Gold Plated Pixiu Wealth Bracelet • Feng Shui Protection & Abundance Talisman',
    maker: 'PixiuTreasures',
    makerAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    makerSales: 44200,
    starSeller: true,
    price: 902,
    originalPrice: 1503,
    discount: '40% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 3680,
    category: 'Feng Shui Jewelry',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Natural volcanic black obsidian beads paired with color-changing thermo-chromic 24k gold plated Pi Xiu amulet that draws wealth from all 8 cardinal directions.',
    itemDetails: [
      '10mm Grade-AAA Natural Black Obsidian',
      'Engraved Sanskrit Mantra beads',
      'Sturdy elastic double-strung stretch cord',
      'Unisex design with purification sage kit',
    ],
    inDemandCount: 22,
  },
  {
    id: 'e6',
    name: 'Solid Brass Traditional Convex Bagua Mirror for Door & Window Feng Shui Energy Shielding',
    maker: 'TaoistSanctuaryShop',
    makerAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    makerSales: 18900,
    starSeller: true,
    price: 950,
    originalPrice: 1600,
    discount: '40% off',
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1520,
    category: 'Feng Shui Decor',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Features the Early Heaven Trigram arrangement and a convex central brass mirror to deflect poison arrows, sharp roof angles, and sha chi away from your home.',
    itemDetails: [
      'Heavy solid carved brass with hanging loop',
      'Diameter: 5 inches',
      'For outdoor entrance mounting',
      'Traditional Taoist protective blessing',
    ],
    inDemandCount: 7,
  },
  {
    id: 'e7',
    name: '328 Golden Abundance & Infinite Wealth Number Art Framed Canvas • Feng Shui Manifestation Wall Decor',
    maker: 'AssaPrintsStudio',
    makerAvatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    makerSales: 37300,
    starSeller: true,
    price: 1499,
    originalPrice: 2499,
    discount: '40% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 2900,
    category: 'Feng Shui Decor',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      '328 represents "San Liang Ba" in Cantonese numerology, translating to "Easy & Continuous Wealth Flow". Gilded gold foil texture print in a handcrafted frame.',
    itemDetails: [
      'Giclée museum archival canvas print with gold accents',
      'Solid wood frame with mounting hardware',
      'Dimensions: 12" x 16"',
      'Perfect for home office or living room wealth corner',
    ],
    inDemandCount: 16,
  },
  {
    id: 'e8',
    name: 'Natural Green Jade Pi Yao Hand-Carved Pendant • Good Fortune & Financial Success Amulet Necklace',
    maker: 'JadeTreasuresOrient',
    makerAvatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    makerSales: 21100,
    starSeller: true,
    price: 1850,
    originalPrice: 2600,
    discount: '28% off',
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 3100,
    category: 'Feng Shui Jewelry',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Natural untreated Grade-A nephrite green jade meticulously hand-carved in the likeness of Pi Yao, the mythological creature of boundless fortune.',
    itemDetails: [
      '100% Genuine Natural Green Jade',
      'Adjustable hand-knotted braided silk cord',
      'Certified authentic gemstone certificate',
      'Pendant size: 35mm x 20mm',
    ],
    inDemandCount: 11,
  },
  {
    id: 'e9',
    name: 'Solid Brass Feng Shui Wu Lou (Calabash) Longevity & Health Gourd with Red Tassel & Chinese Coins',
    maker: 'TaoistSanctuaryShop',
    makerAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
    makerSales: 18900,
    starSeller: true,
    price: 1150,
    originalPrice: 1650,
    discount: '30% off',
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 1420,
    category: 'Feng Shui Decor',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'The Wu Lou gourd is revered in Feng Shui as a sacred vessel of longevity and health. Hollow interior allows holding sacred blessings, while the brass body absorbs negative illness chi.',
    itemDetails: [
      'Solid Polished Brass with twist-open top cap',
      'Hand-tied silk mystic knot and emperor coins',
      'Height: 4.2 inches',
      'Ideal for bedside table or illness flying star sector',
    ],
    inDemandCount: 5,
  },
  {
    id: 'e10',
    name: 'Rose Quartz Mandarin Ducks Pair on Lotus Leaf • Harmony & Unconditional Love Romance Feng Shui Enhancer',
    maker: 'CrystalSanctuaryCo',
    makerAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    makerSales: 48900,
    starSeller: true,
    price: 1690,
    originalPrice: 2400,
    discount: '30% off',
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 11200,
    category: 'Crystals & Trees',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Mandarin ducks mate for life, making them the ultimate Feng Shui symbol of eternal marital devotion and romantic harmony. Carved from natural rose quartz crystal.',
    itemDetails: [
      'Pair of hand-carved Natural Rose Quartz Ducks',
      'Green Aventurine lotus leaf base included',
      'Dimensions: 3" length x 2" height each',
      'Best placed in Southwest corner of the bedroom',
    ],
    allowsPersonalization: true,
    personalizationPrompt: 'Provide custom gift message or couple names for blessed card:',
    inDemandCount: 31,
  },
  {
    id: 'e11',
    name: 'Tibetan 7 Chakra Orgonite Energy Generator Pyramid • EMF Protection & Chi Balance Healing Crystal',
    maker: 'ZenHavenArtisans',
    makerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    makerSales: 16700,
    starSeller: true,
    price: 1350,
    originalPrice: 1950,
    discount: '30% off',
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 2840,
    category: 'Zen & Meditation',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Layered with genuine amethyst, lapis lazuli, turquoise, green aventurine, tiger eye, red jasper, and copper coil matrix to transmute negative electromagnetic energy into vibrant prana.',
    itemDetails: [
      '7 Authentic Chakra Gemstone layers',
      'High-clarity organic resin matrix with Copper Coil',
      'Pyramid Base: 60mm x 60mm',
      'Sacred geometry Sri Yantra symbol engraved',
    ],
    inDemandCount: 12,
  },
  {
    id: 'e12',
    name: 'Ceramic Mountain Waterfall Backflow Incense Burner • Zen Dragon Smoke Cascade Meditation Fountain',
    maker: 'HarmonyLivingArt',
    makerAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    makerSales: 22400,
    starSeller: true,
    price: 1799,
    originalPrice: 2600,
    discount: '30% off',
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 3950,
    category: 'Feng Shui Candles',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Glazed ceramic incense holder where aromatherapeutic smoke cascades downward like a misty mountain river, creating an instant calming sanctuary for meditation.',
    itemDetails: [
      'Handcrafted high-fire glazed ceramic',
      'Includes 50 assorted natural backflow incense cones',
      'Dimensions: 7.8" x 4.2" x 4.0"',
      'Purifies indoor air and calms the nervous system',
    ],
    variations: [
      {
        name: 'Incense Aroma Pack',
        options: ['Sandalwood & Agarwood', 'Lavender & Jasmine', 'Frankincense & Myrrh', 'Dragon Blood & Sage'],
      },
    ],
    inDemandCount: 16,
  },
];

export const sampleReviews: ProductReview[] = [
  {
    id: 'r1',
    author: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Sep 2, 2026',
    comment:
      'Absolutely breathtaking quality! The engraving was so delicate and crisp, and the packaging felt like receiving a high-end luxury gift. My sister cried when she opened it!',
    productVariation: 'Finish: 14K Gold Fill, Chain Length: 18 inches',
  },
  {
    id: 'r2',
    author: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Aug 28, 2026',
    comment:
      'Fast shipping, arrived 3 days earlier than estimated. The craftsmanship is top notch and the seller reached out with a mock-up to confirm spelling. 10/10 will buy again.',
    productVariation: 'Finish: Sterling Silver, Chain Length: 16 inches',
  },
  {
    id: 'r3',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Aug 15, 2026',
    comment:
      'Exceeded every single expectation. You can tell this was made with real love and care. Looks even better in person than in the photos!',
  },
];
