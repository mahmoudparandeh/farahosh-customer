import { PackageSpecialFeature } from './packageSpecialFeature.model';
import { SpecialFeature } from './specialfeature.model';

export class Product {
  id: number;
  name: string;
  code: string;
  price: number;
  thumbnail: string;
  images: string[];
  status: string;
  brand: string;
  category: string;
  specialFeatures: SpecialFeature[];
  packageSpecialFeature: PackageSpecialFeature[];
}
