import { OrderPackageProduct } from './orderPackageProduct.model';
import { Address } from './address.model';
import { Product } from 'src/app/models/product.model';
import { Discount } from './discount.model';
export class Order {
  id: number;
  discount: number;
  price: number;
  sendPrice: number;
  sendDate: string;
  createdAt: string;
  payType: string;
  sendType: string;
  status: string;
  withoutDiscountPrice: number;
  fishImage: string;
  fishNumber: string;
  code: number;
  postTrackingCode: string;
  paymentTrackingCode: string;
  discountCode: Discount;
  orderProducts: Product[];
  orderPackageProducts: OrderPackageProduct[];
  address: Address;
  credit: number;
  userName: string;
  userMelli: string;
}
