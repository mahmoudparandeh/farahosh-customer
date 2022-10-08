import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ProductService } from '../product.service';
import { Image } from '../../shared/image.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductItemModel } from '../models/product-item.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent {
  language = 'fa';
  productListTitles: any;
  apiTitles: any;
  activeTab = 1;
  id = '';
  productDetailsTitles: any;
  attributeTitles: any;
  logo: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
  };
  gallery: Image[] = [];

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productListTitle');
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
      this.sharedService.onLanguageChanges(language, 'faqTitle');
      this.productService.getPackageTypes();
      this.productService.getWeightUnits();
      this.productService.getTaxCategories();
      this.productService.getAllTransports();
    });
    this.sharedService.productListTitle.subscribe(titles => {
      this.productListTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.attributeTitles.subscribe(titles => {
      this.attributeTitles = titles;
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.productService.productGuid.next(this.id);
      this.productService.getProductByGuid(this.id);
    } else {
      this.productService.productGuid.subscribe(id => {
        this.id = id;
      });
    }
  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
    window.scrollTo(0, 0);
  }

  // cancel() {}
  // reset() {}
  // submit() {}
}
