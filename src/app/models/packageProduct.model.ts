import { PackageSpecialFeature } from './packageSpecialFeature.model';
export class PackageProduct {
  id: number;
  name: string;
  image: string;
  specialFeatures: PackageSpecialFeature[] = [];
}
