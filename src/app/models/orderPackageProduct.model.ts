import { Product } from 'src/app/models/product.model';
export class OrderPackageProduct {
  id: number;
  name: string;
  discount: number;
  count: number;
  products: Product[];
}
