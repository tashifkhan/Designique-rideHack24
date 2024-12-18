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