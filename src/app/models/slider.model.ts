import { Brand } from './brand.model';
import { Category } from './category.model';

export class Slider {
  id: number;
  brand: Brand;
  category: Category;
  image: string;
  productsCount: number;
  date: string;
}
