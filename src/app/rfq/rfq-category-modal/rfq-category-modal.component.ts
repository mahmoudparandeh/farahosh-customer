import {Component, Renderer2} from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { RFQService } from '../rfq.service';
import {ProductService} from "../../product/product.service";
import {Category} from "../../product/models/category.model";

@Component({
  selector: 'app-rfq-category-modal',
  templateUrl: './rfq-category-modal.component.html',
  styleUrls: ['./rfq-category-modal.component.sass'],
})
export class RfqCategoryModalComponent {
  rfqTitles: any;
  categories: Category[] = [];
  subCategories: Category[] = [];
  subSubCategories: Category[] = [];
  selectedCategory = 0;
  selectedSubCategory = 0;
  selectedSubSubCategory = 0;
  selectedCategoryList: Category[] = [];
  language = 'fa';
  constructor(
    private sharedService: SharedService,
    private rfqService: RFQService,
    private productService: ProductService,
  ) {
    this.sharedService.currentLanguage.subscribe((language) => {
      this.language = language;
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
    this.productService.categories.subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  selectCategory(id: number, layer: number): void {
    switch (layer) {
      case 1: {
        this.selectedCategoryList = [];
        this.selectedCategoryList.push(this.categories.find(c => c.Id === id)!);
        this.selectedCategory = id;
        this.selectedSubCategory = 0;
        this.selectedSubSubCategory = 0;
        this.subCategories = [];
        this.subSubCategories = [];
        this.subCategories = this.categories.find(c => c.Id === id)!.Childs;
        break;
      }
      case 2: {
        this.selectedSubCategory = id;
        this.selectedSubSubCategory = 0;
        if (this.selectedCategoryList.length === 1) {
          this.selectedCategoryList.push(this.selectedCategoryList[0].Childs.find(c => c.Id === id)!);
        } else {
          this.selectedCategoryList.pop();
          this.selectedCategoryList.push(this.selectedCategoryList[0].Childs.find(c => c.Id === id)!);
        }
        this.subSubCategories = [];
        this.subSubCategories = this.subCategories.find(c => c.Id === id)!.Childs;
        break;
      }
      case 3: {
        this.selectedSubSubCategory = id;
        if (this.selectedCategoryList.length === 2) {
          this.selectedCategoryList.push(this.selectedCategoryList[1].Childs.find(c => c.Id === id)!);
        } else {
          this.selectedCategoryList.pop();
          this.selectedCategoryList.push(this.selectedCategoryList[1].Childs.find(c => c.Id === id)!);
        }
        break;
      }
    }
  }

  onSelectCategories(): void {
    this.rfqService.selectedCategories.next(this.selectedCategoryList);
  }
}
