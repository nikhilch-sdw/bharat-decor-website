export type PageId = 'home' | 'about' | 'services' | 'products' | 'portfolio' | 'contact';

export type InteriorCategory =
  | 'Wall Paneling & Louvers'
  | 'Designer & 3D Wallpapers'
  | 'Modular Kitchens & Wardrobes'
  | 'Curtains, Blinds & Window Treatments'
  | 'False Ceilings & Architectural Lighting'
  | 'Turnkey Residential & Commercial Renovation';

export type ProductCategory =
  | 'Wall Panels & Louvers'
  | '3D & Designer Wallpapers'
  | 'Texture Sheets & Digital Mica'
  | 'Modular Kitchens & Hardware'
  | 'Curtains & Blinds';

export interface ProductItem {
  id: string;
  title: string;
  category: ProductCategory;
  image: string;
  badge: string;
  description: string;
  material: string;
  finish: string;
  idealFor: string;
  specs: string[];
  instagramHandle?: string;
  instagramPostUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: InteriorCategory;
  image: string;
  features: string[];
  description: string;
  turnaroundTime: string;
  materialHighlight: string;
  materialSpecs: string[];
  whatsAppPrompt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: InteriorCategory;
  image: string;
  location: string;
  year: string;
  description: string;
  highlights: string[];
  scope: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  projectType: string;
  comment: string;
  date: string;
  image: string;
  avatar?: string;
}

export interface InquiryFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  serviceNeeded: string;
  propertyType: 'Apartment' | 'Independent House' | 'Commercial Office' | 'Retail' | '';
  approxBudget?: string;
  spaceDetails: string;
}

export interface InquirySubmission extends InquiryFormData {
  referenceId: string;
  timestamp: string;
}
