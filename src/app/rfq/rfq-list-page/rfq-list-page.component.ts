import { Component, OnInit } from '@angular/core';
import { RFQ } from '../models/rfq.model';
import {FormControl} from "@angular/forms";
import {Value} from "../../models/value.model";
import {SharedService} from "../../shared/shared.service";
import {ProductService} from "../../product/product.service";
import {RFQService} from "../rfq.service";
import {Category} from "../../product/models/category.model";
import { Utility } from '../../shared/helper/util';
import moment from 'jalali-moment';

@Component({
  selector: 'app-rfq-list-page',
  templateUrl: './rfq-list-page.component.html',
  styleUrls: ['./rfq-list-page.component.sass']
})
export class RfqListPageComponent implements OnInit {
  rfqTitles: any;
  currentPage = 1;
  pageSize = 10;
  total = 1;
  rfqs: RFQ[] = [];
  searchCustomerController = new FormControl('');
  searchProductController = new FormControl('');
  searchCodeController = new FormControl('');
  searchStatusController = new FormControl('');
  searchCategoryController = new FormControl('');
  searchSubCategoryController = new FormControl('');
  searchSubSubCategoryController = new FormControl('');
  searchFromDateController = new FormControl('');
  searchToDateController = new FormControl('');
  mainCategories: Category[] = [];
  subMainCategories: Category[] = [];
  categories: Value[] = [];
  subCategories: Value[] = [];
  subSubCategories: Value[] = [];
  statusValues: Value[] = [];

  constructor(private sharedService: SharedService,
              private productService: ProductService,
              private rfqService: RFQService) {
    this.productService.getCategories();
    this.productService.categories.subscribe(categories => {
      this.mainCategories = categories;
      this.categories = [];
      this.categories.push({
        value: '',
        name: 'انتخاب نشده',
      });
      for (const item of categories) {
        this.categories.push({
          value: item.Id,
          name: item.Name,
        });
      }
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
      this.statusValues = [];
      this.statusValues.push({
        name: 'انتخاب نشده',
        value: ''
      });
      this.statusValues.push({
        name: this.rfqTitles.status_0,
        value: 0
      });
      this.statusValues.push({
        name: this.rfqTitles.status_1,
        value: 1
      });
      this.statusValues.push({
        name: this.rfqTitles.status_2,
        value: 2
      });
      this.statusValues.push({
        name: this.rfqTitles.status_3,
        value: 3
      });
    });
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: this.currentPage,
    });
    this.rfqService.getRFQs(options);
    this.rfqService.totalRFQ.subscribe(total => {
      this.total = total;
    });
    this.rfqService.rfqs.subscribe(rfqs => {
      this.rfqs = rfqs;
    });
  }

  ngOnInit(): void {
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.onFilter(false);
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  categorySelected(thisObj, value: any): void {
    const category = thisObj.mainCategories.find(c => +c.Id === +value);
    thisObj.subMainCategories = category.Childs;
    thisObj.subCategories = [];
    thisObj.subSubCategories = [];
    thisObj.subCategories.push({
      value: '',
      name: 'انتخاب نشده',
    });
    for (const item of category.Childs) {
      thisObj.subCategories.push({
        value: item.Id,
        name: item.Name,
      });
    }
  }

  subCategorySelected(thisObj, value: any): void {
    const category = thisObj.subMainCategories.find(c => +c.Id === +value);
    thisObj.subSubCategories = [];
    thisObj.subSubCategories.push({
      value: '',
      name: 'انتخاب نشده',
    });
    for (const item of category.Childs) {
      thisObj.subSubCategories.push({
        value: item.Id,
        name: item.Name[this.sharedService.language],
      });
    }
  }

  onFilter(fromFilter: boolean): void {
    if (fromFilter) {
      this.currentPage = 1;
    }
    let categoryId = this.searchCategoryController.value;
    if (this.searchSubCategoryController.value) {
      categoryId = this.searchSubCategoryController.value;
    }
    if (this.searchSubSubCategoryController.value) {
      categoryId = this.searchSubSubCategoryController.value;
    }
    const data = {
      PageSize: 10,
      PageNumber: this.currentPage,
      CategoryId: categoryId,
      Id: this.searchCodeController.value,
      Status: this.searchStatusController.value,
      // CustomerNameKey: encodeURIComponent(this.searchCustomerController.value),
      ProductNameKey: encodeURIComponent(this.searchProductController.value),
      StartDate: moment(this.searchFromDateController.value, 'jYYYY/jM/jD').format('YYYY-M-D'),
      EndDate: moment(this.searchToDateController.value, 'jYYYY/jM/jD').format('YYYY-M-D')
    };
    if (this.searchCategoryController.value === '') {
      delete data.CategoryId;
    }
    if (this.searchCodeController.value === '') {
      delete data.Id;
    }
    if (this.searchStatusController.value === '') {
      delete data.Status;
    }
    // if (this.searchCustomerController.value === '') {
    //   delete data.CustomerNameKey;
    // }
    if (this.searchProductController.value === '') {
      delete data.ProductNameKey;
    }
    const options = JSON.stringify(data);
    this.rfqService.getRFQs(options);
  }

}
