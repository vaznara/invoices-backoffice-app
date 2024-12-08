export interface Product {
  uid?: string;
  name: string;
  description: string | null;
  currentPrice: number;
  sku: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProductPrice {
  uid?: string;
  price: number;
  productUid: string;
  validFrom: string;
  validTo?: string;
}
