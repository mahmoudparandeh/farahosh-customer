import { Component, OnInit } from '@angular/core';
import {Invoice} from "../models/invoice.model";
import {FormControl} from "@angular/forms";
import {Value} from "../../models/value.model";
import {SharedService} from "../../shared/shared.service";
import {RFQService} from "../rfq.service";
import {Utility} from "../../shared/helper/util";

@Component({
  selector: 'app-invoice-list-page',
  templateUrl: './invoice-list-page.component.html',
  styleUrls: ['./invoice-list-page.component.sass']
})
export class InvoiceListPageComponent implements OnInit {
  rfqTitles: any;
  invoices: Invoice[] = [];
  currentPage = 1;
  pageSize = 10;
  total = 1;
  searchVendorController = new FormControl('');
  searchProductController = new FormControl('');
  searchCodeController = new FormControl('');
  searchStatusController = new FormControl('');
  searchIncotermController = new FormControl('');
  searchMinPriceController = new FormControl('');
  searchMaxPriceController = new FormControl('');
  incoterms: Value[] = [];
  statusValues: Value[] = [];

  constructor(private sharedService: SharedService, private rfqService: RFQService) {
    this.rfqService.getAllIncoterms();
    this.rfqService.incoterms.subscribe((incoterms) => {
      this.incoterms = [];
      this.incoterms.push({
        value: '',
        name: 'انتخاب نشده',
      });
      for (const incoterm of incoterms) {
        this.incoterms.push({
          value: incoterm.Id,
          name: incoterm.Title[this.sharedService.language],
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
        name: 'ارسال توسط تأمین کننده',
        value: 0
      });
      this.statusValues.push({
        name: 'دریافت توسط فرهوش',
        value: 1
      });
      this.statusValues.push({
        name: 'ارسال توسط فرهوش',
        value: 2
      });
      this.statusValues.push({
        name: 'دریافت توسط مشتری',
        value: 3
      });
    });
    const data = {
      PageSize: 10,
      PageNumber: this.currentPage,
    };
    const options = JSON.stringify(data);
    this.rfqService.getInvoices(options);
    this.rfqService.totalInvoices.subscribe(total => {
      this.total = total;
    });
    this.rfqService.invoices.subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.onFilter(false);
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  onFilter(fromFilter: boolean): void {
    if (fromFilter) {
      this.currentPage = 1;
    }
    const data = {
      PageSize: 10,
      PageNumber: this.currentPage,
      Id: this.searchCodeController.value,
      Status: this.searchStatusController.value,
      IncotermId: this.searchIncotermController.value,
      MinPrice: this.searchMinPriceController.value,
      MaxPrice: this.searchMaxPriceController.value,
      VendorNameKey: encodeURIComponent(this.searchVendorController.value),
      ProductNameKey: encodeURIComponent(this.searchProductController.value),
    };
    if (this.searchCodeController.value === '') {
      delete data.Id;
    }
    if (this.searchIncotermController.value === '') {
      delete data.IncotermId;
    }
    if (this.searchStatusController.value === '') {
      delete data.Status;
    }
    if (this.searchVendorController.value === '') {
      delete data.VendorNameKey;
    }
    if (this.searchMinPriceController.value === '') {
      delete data.MinPrice;
    }
    if (this.searchMaxPriceController.value === '') {
      delete data.MaxPrice;
    }
    if (this.searchProductController.value === '') {
      delete data.ProductNameKey;
    }
    const options = JSON.stringify(data);
    this.rfqService.getInvoices(options);
  }

  ngOnInit(): void {
  }

}
