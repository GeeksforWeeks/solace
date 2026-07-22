export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  sizes: string[];
  materials: string[];
  details: string[];
  isSale?: boolean;
  isLimited?: boolean;
  isExclusive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isAccountOpen: boolean;
  isMobileMenuOpen: boolean;
  isSizeMatrixOpen: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAccountOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSizeMatrixOpen: (open: boolean) => void;
  clearCart: () => void;
}
