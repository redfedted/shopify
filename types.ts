export interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Flower {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  products: Product[];
}
