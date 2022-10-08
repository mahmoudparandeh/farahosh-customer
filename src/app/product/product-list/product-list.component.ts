import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ProductService } from '../product.service';
import { ProductModel } from '../models/product.model';
import { FormControl } from '@angular/forms';
import { Value } from '../../models/value.model';
import { Category } from '../models/category.model';
import { ReplaySubject, toArray } from 'rxjs';
import { ProductDetail } from '../models/product-item.model';
import { CategoryAttributeModel } from '../models/category-attribute.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent {
  language = 'fa';
  productListTitle: any;
  currentPage = 1;
  total = 1;
  pageSize = 12;
  productList: ProductModel[] = [];
  searchTerm = new FormControl('');
  brandController = new FormControl('');
  categoryController = new FormControl('');
  subCategoryController = new FormControl('');
  subSubCategoryController = new FormControl('');
  brands: Value[] = [];
  mainCategories: Category[] = [];
  mainSubCategories: Category[] = [];
  categories: Value[] = [];
  subCategories: Value[] = [];
  subSubCategories: Value[] = [];
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.productService.selectedCategories.next([]);
    this.productService.categoryAttributes.next([]);
    this.productService.productGuid.next('');
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productListTitle');
      this.productService.getBrands();
      this.getProductList();
      this.productService.product.next(null);
      this.productService.productGuid.next('');
    });
    this.sharedService.productListTitle.subscribe(titles => {
      this.productListTitle = titles;
    });
    this.productService.searchProductList.subscribe(products => {
      this.productList = products;
      const interval = setInterval(() => {
        if (this.productListTitle.status_0 !== undefined) {
          for (let i = 0; i < this.productList.length; i++) {
            switch (+this.productList[i].Status) {
              case 0:
                this.productList[i].Status = this.productListTitle.status_0;
                break;
              case 1:
                this.productList[i].Status = this.productListTitle.status_1;
                break;
              case 2:
                this.productList[i].Status = this.productListTitle.status_2;
                break;
              case 3:
                this.productList[i].Status = this.productListTitle.status_3;
                break;
              case 4:
                this.productList[i].Status = this.productListTitle.status_4;
                break;
              case 5:
                this.productList[i].Status = this.productListTitle.status_5;
                break;
            }
          }
          clearInterval(interval);
        }
      }, 1000);
    });
    this.productService.brands.subscribe(brands => {
      this.brands = [];
      for (const item of brands) {
        this.brands.push({
          value: item.Id,
          name: item.BrandName,
        });
      }
    });
    this.productService.productTotal.subscribe(total => {
      this.total = total;
    });
    this.productService.categories.subscribe(categories => {
      this.mainCategories = categories;
      this.categories = [];
      for (const item of categories) {
        this.categories.push({
          value: item.Id,
          name: item.Name[this.language],
        });
      }
    });
  }

  getProductList() {
    this.productService.getSearchProduct(this.currentPage, this.searchTerm.value);
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.getProductList();
  }

  onFilterBtn() {
    let categoryId = '';
    if (this.subSubCategoryController.value) {
      categoryId = this.subSubCategoryController.value;
    } else if (this.subCategoryController.value) {
      categoryId = this.subCategoryController.value;
    } else if (this.categoryController.value) {
      categoryId = this.categoryController.value;
    }
    // const categoryId = this.subCategoryController.value
    //   ? this.subCategoryController.value
    //   : this.categoryController.value;
    this.productService.getSearchProduct(
      this.currentPage,
      this.searchTerm.value,
      +this.brandController.value,
      +categoryId
    );
  }

  categorySelected(thisObj, value: any): void {
    const category = thisObj.mainCategories.find(c => +c.Id === +value);
    thisObj.subCategories = [];
    thisObj.subSubCategories = [];
    for (const item of category.Childs) {
      thisObj.mainSubCategories.push(item);
      thisObj.subCategories.push({
        value: item.Id,
        name: item.Name[thisObj.language],
      });
    }
  }

  subCategorySelected(thisObj, value: any): void {
    const category = thisObj.mainSubCategories.find(c => +c.Id === +value);
    thisObj.subSubCategories = [];
    for (const item of category.Childs) {
      thisObj.subSubCategories.push({
        value: item.Id,
        name: item.Name[thisObj.language],
      });
    }
  }

  onSelectCategory(id: number) {
    this.categoryController.setValue(id.toString());
    const category = this.mainCategories.find(c => +c.Id === +id);
    this.subCategories = [];
    this.subSubCategories = [];
    for (const item of category.Childs) {
      this.mainSubCategories.push(item);
      this.subCategories.push({
        value: item.Id,
        name: item.Name[this.language],
      });
    }
  }

  onSelectSubCategory(id: number) {
    this.subCategoryController.setValue(id.toString());
    const category = this.mainSubCategories.find(c => +c.Id === +id);
    this.subSubCategories = [];
    for (const item of category.Childs) {
      this.subSubCategories.push({
        value: item.Id,
        name: item.Name[this.language],
      });
    }
  }

  onSelectSubSubCategory(id: number) {
    this.subSubCategoryController.setValue(id.toString());
  }
}
