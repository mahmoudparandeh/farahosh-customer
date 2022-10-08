import {Component, OnInit, Renderer2} from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { RFQService } from '../rfq.service';
import { ActivatedRoute } from '@angular/router';
import { InquiryDetails } from '../models/inquiry.details.model';
import { environment } from '../../../environments/environment';
import {FormControl, Validators} from "@angular/forms";
import {AutocompleteValue} from "../../core/models/autoComplete.model";
import {Utility} from "../../shared/helper/util";
import {Value} from "../../models/value.model";
import {Currency} from "../models/currency.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Category} from "../../product/models/category.model";

@Component({
  selector: 'app-inquiry-details-page',
  templateUrl: './inquiry-details-page.component.html',
  styleUrls: ['./inquiry-details-page.component.sass']
})
export class InquiryDetailsPageComponent implements OnInit {
  rfqTitles: any;
  language = 'fa';
  inquiryDetail: InquiryDetails;
  attachments = [];
  productController = new FormControl('', Validators.required);
  sourcingTypeController = new FormControl('', Validators.required);
  quantityTypeController = new FormControl('', Validators.required);
  incotermsController = new FormControl('', Validators.required);
  maxBudgetController = new FormControl('', Validators.required);
  currencyTypeController = new FormControl('', Validators.required);
  testReportController = new FormControl('', Validators.required);
  otherRequirementsController = new FormControl('', Validators.required);
  shoppingMethodController = new FormControl('', Validators.required);
  destinationController = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  daysController = new FormControl('', Validators.required);
  paymentMethodController = new FormControl('', Validators.required);
  agreementCheckbox = new FormControl(true, Validators.required);
  casNumberController = new FormControl('');
  purityController = new FormControl('');
  detailsController = new FormControl('', Validators.required);
  priceController = new FormControl('', Validators.required);
  quantityController = new FormControl(1, {
    validators: Validators.required,
    nonNullable: true,
  });
  sourcingPurposeController = new FormControl('', Validators.required);
  supplierBusinessTypeController = new FormControl('');
  productCertificationController = new FormControl('');
  portController = new FormControl('');
  fullProducts: any[] = [];
  products: AutocompleteValue[] = [];
  filters: AutocompleteValue[] = [];
  quantityTypes: AutocompleteValue[] = [];
  incotermsTypes: AutocompleteValue[] = [];
  currenciesValue: Value[] = [
    {
      name: 'USD',
      value: 1,
    },
    {
      name: 'Rial',
      value: 2,
    },
  ];
  currencies: Currency[] = [];
  destinations: any[] = [];
  destinationsFiltered: any[] = [];
  selectedCountryId = 0;
  productGUID = '';
  selectedCategories: Category[] = [];
  direction = 'rtl';
  files: File[] = [];
  filesPath: any[] = [];
  shoppingMethodTypes = [];
  paymentMethods = [];
  constructor(
    private sharedService: SharedService,
    private rfqService: RFQService,
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
  ) {
    this.rfqService.getCurrencies();
    this.rfqService.rfqIncotermsReplaySubject.subscribe(incoterms => {
      this.incotermsTypes = [];
      for (const item of incoterms) {
        this.incotermsTypes.push({
          value: item.Id,
          name: item.Title,
        });
      }
      this.incotermsController.setValue(this.incotermsTypes[0].value);
    });
    this.rfqService.rfqCountriesReplaySubject.subscribe(countries => {
      this.destinations = [];
      this.destinationsFiltered = [];
      for (const item of countries) {
        this.destinations.push({
          value: item.Id,
          name: item.Name,
          code: item.Path,
        });
        this.destinationsFiltered.push({
          value: item.Id,
          name: item.Name,
          code: item.Path,
        });
      }
    });
    this.rfqService.rfqUnitsReplaySubject.subscribe(units => {
      this.shoppingMethodTypes = [];
      this.paymentMethods = [];
      this.quantityTypes = [];
      for (const unit of units) {
        switch (unit.Type) {
          case 1: {
            this.quantityTypes.push({
              value: unit.Id,
              name: unit.Name,
            });
            break;
          }
          case 3: {
            this.shoppingMethodTypes.push({
              value: unit.Id,
              name: unit.Name,
            });
            break;
          }
          case 9: {
            this.paymentMethods.push({
              value: unit.Id,
              name: unit.Name,
            });
            break;
          }
        }
      }
      this.shoppingMethodController.setValue(this.shoppingMethodTypes[0].value);
      this.paymentMethodController.setValue(this.paymentMethods[0].value);
      this.quantityTypeController.setValue(this.quantityTypes[0].value);
    });
    this.rfqService.currencies.subscribe((currencies) => {
      this.currenciesValue = [];
      this.currencies = currencies;
      for (const currency of currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.language],
        });
      }
      this.currencyTypeController.setValue(this.currenciesValue[0].value);
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'rfqTitle');
      this.rfqService.getRFQBasics();
      this.currenciesValue = [];
      for (const currency of this.currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.language],
        });
      }
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
    this.rfqService.getInquiry(this.activatedRoute.snapshot.params.id).subscribe((response: any) => {
      this.inquiryDetail = response.jsonResult.Data.Inquery;
      this.attachments = response.jsonResult.Data.TicketRFQPictures.filter(p => !p.IsThumbnail);
      if (this.inquiryDetail.ProductPicturePath !== '') {
        this.inquiryDetail.ProductPicturePath = environment.apiUrl + this.inquiryDetail.ProductPicturePath;
      }
      if (this.inquiryDetail.VendorImagePath) {
        this.inquiryDetail.VendorImagePath = environment.apiUrl + this.inquiryDetail.VendorImagePath;
      }
      for (const attachment of this.attachments) {
        attachment.Path = environment.apiUrl + attachment.Path;
      }
    });
    this.rfqService.selectedCategories.subscribe(categories => {
      this.selectedCategories = categories;
      this.productGUID = '';
    });
  }



  selectProduct(object: InquiryDetailsPageComponent, value: any): void {
    object.productGUID = value;
    object.selectedCategories = object.fullProducts.find(p => p.ProductGuid === value).Categories;
  }

  showModal(): void {
    const element = document.getElementById('rfq_select_category');
    this.renderer.addClass(element, 'show');
  }

  ngOnInit(): void {
  }

  uploadProductPicture(event: any): void {
    const reader = new FileReader();
    const mimeType = (<File>event.target.files[0]).type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    reader.readAsDataURL(<File>event.target.files[0]);
    reader.onload = oFREvent => {
      this.filesPath.push(this.domSanitizer.bypassSecurityTrustUrl(oFREvent.target!.result!.toString()));
    };
    this.files.push(<File>event.target.files[0]);
  }

  removeImage(index: number): void {
    this.filesPath.splice(index, 1);
    this.files.splice(index, 1);
  }

  changeQuantity(count: number): void {
    if (this.quantityController.value > 1 || count !== -1) {
      this.quantityController.setValue(this.quantityController.value + count);
    }
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  onDestinationSelected(obj: any, event: any): void {
    obj.selectedCountryId = event;
  }
}
