export type Language = 'en' | 'bn';

export const LANGUAGE_STORAGE_KEY = 'alvi-plastic-language';

export const TRANSLATIONS = {
  searchPlaceholder: {
    en: 'Search products or categories...',
    bn: 'পণ্য বা ক্যাটাগরি খুঁজুন...'
  },
  contactButton: {
    en: 'Contact Us',
    bn: 'যোগাযোগ'
  },
  clearButton: {
    en: 'Clear',
    bn: 'মুছে ফেলুন'
  },
  wholesaleButton: {
    en: 'Request Wholesale Quote',
    bn: 'পাইকারি দাম জানুন'
  },
  stockIn: {
    en: 'In Stock',
    bn: 'স্টকে আছে'
  },
  stockOut: {
    en: 'Out of Stock',
    bn: 'স্টকে নেই'
  },
  priceLabel: {
    en: 'Price: ৳',
    bn: 'মূল্য: ৳'
  },
  headOffice: {
    en: 'Head Office',
    bn: 'প্রধান কার্যালয়'
  },
  showroom: {
    en: 'Showroom',
    bn: 'শো-রুম'
  },
  allCategories: {
    en: 'All Categories',
    bn: 'সব ক্যাটেগরি'
  }
};

export const CATEGORY_LABELS = [
  { id: 'rack', en: 'Rack', bn: 'র‍্যাক' },
  { id: 'balti', en: 'Balti (Bucket)', bn: 'বালতি' },
  { id: 'gamla', en: 'Gamla (Tub)', bn: 'গামলা' },
  { id: 'tool', en: 'Tool / Phri (Stool)', bn: 'টুল / পিঁড়ি' },
  { id: 'jali', en: 'Jali (Net Basket)', bn: 'জালি' },
  { id: 'dala', en: 'Dala / Chalon', bn: 'ডালা / চালন' },
  { id: 'basket', en: 'Basket', bn: 'বাস্কেট' },
  { id: 'kula', en: 'Kula', bn: 'কুলা' },
  { id: 'setbati', en: 'Set Bati', bn: 'সেট বাটি' },
  { id: 'jug', en: 'Jug', bn: 'জগ' },
  { id: 'dhakna', en: 'Dhakna Jali', bn: 'ঢাকনা জালি' },
  { id: 'plate', en: 'Plate & Glass', bn: 'প্লেট ও গ্লাস' },
  { id: 'container', en: 'Container', bn: 'কন্টেইনার' },
  { id: 'others', en: 'Others', bn: 'অন্যান্য' }
] as const;

export const CATEGORY_LABEL_MAP = CATEGORY_LABELS.reduce(
  (map, item) => ({ ...map, [item.id]: item }),
  {} as Record<string, { id: string; en: string; bn: string }> 
);
