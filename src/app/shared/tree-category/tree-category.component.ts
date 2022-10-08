import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import { Category } from '../../product/models/category.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-tree-category',
  templateUrl: './tree-category.component.html',
  styleUrls: ['./tree-category.component.sass'],
})
export class TreeCategoryComponent {
  @Input() title: any;
  @Input() categories: Category[] = [];
  @Output() categoryId = new EventEmitter<number>();
  direction = 'rtl';
  language = 'fa';
  openedItemIndex = -1;
  openedSubItemIndex = -1;
  selectedCategory = -1;
  selectedCategoryOrSubCategory = -1;
  category: Category;
  selectedCategories: Category[] = [];
  flag = false;
  selectedCategoriesLength = 0;
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
    });
    this.productService.selectedCategories.subscribe(categories => {
      this.selectedCategories = categories;
    });
    this.productService.selectedCategories.subscribe(categories => {
      this.selectedCategoriesLength = categories.length;
    });
  }

  getIcon(i: number) {
    if (i === this.openedItemIndex) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }
  getSubIcon(j: number) {
    if (j === this.openedSubItemIndex) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }

  // changeCategory(id: number) {
  //   this.selectedCategory = id;
  // }
  //
  // onChangeCategory(event: number) {
  //   this.selectedCategoryOrSubCategory = event;
  //   for (const category of this.categories) {
  //     if (category.Id === this.selectedCategoryOrSubCategory) {
  //       this.category = category;
  //     } else if (category.Childs) {
  //       for (const subCategory of category.Childs) {
  //         if (subCategory.Id === this.selectedCategoryOrSubCategory) {
  //           this.category = subCategory;
  //         }
  //       }
  //     }
  //   }
  //   this.productService.selectedCategory.next(this.category);
  // }

  addCategory(category: Category) {
    // event.stopPropagation();
    this.categoryId.emit(category.Id);
    if (this.selectedCategoriesLength > 0) {
      for (const item of this.selectedCategories) {
        if (category.Id === item.Id) {
          return false;
        }
      }
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.push(category);
    }
    this.productService.selectedCategories.next(this.selectedCategories);
  }

  onOpenAccordion(i: number) {
    if (i === this.openedItemIndex) {
      this.openedItemIndex = -1;
    } else {
      this.openedItemIndex = i;
    }
  }
  onOpenSubAccordion(j: number) {
    if (j === this.openedSubItemIndex) {
      this.openedSubItemIndex = -1;
    } else {
      this.openedSubItemIndex = j;
    }
  }
}
