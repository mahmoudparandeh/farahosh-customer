import { Address } from './address.model';
import { Business } from './business.model';
import { Order } from './order.model';

export class UserDetail {
  id: number;
  userfullname: string;
  name: string;
  type: string;
  mobile: string;
  active: boolean;
  registerDate: string;
  nationalCode: string;
  address: Address[];
  wholeOrderCount: number;
  wholeOrderSale: number;
  wholeProductCount: number;
  credit: number;
  phone: string;
  verify: boolean;
  shabaNumber: string;
  business: Business;
  orders: Order[];
}
