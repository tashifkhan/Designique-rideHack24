export interface Design {
  id: number;
  title: string;
  image: string;
  designer: string;
}

export interface Designer {
  id: number;
  name: string;
  location: string;
  avatar: string;
  coverImage: string;
  specialization: string;
  bio: string;
  collections: number;
  followers: number;
  following: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}