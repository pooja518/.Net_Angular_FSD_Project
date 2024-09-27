export interface Product {
  productId: number;
  category: string;
  name: string;
  description: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
  ratings: number;
  imageLink: string;
  amountSaved: number;
}
