import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Value } from '../../models/value.model';
import { AutocompleteValue } from '../../core/models/autoComplete.model';
import { ProductPrice, ProductPriceDto } from '../models/product-price.model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.sass'],
})
export class ProductPriceComponent {
  productPriceTitles: any;
  productPriceListTitles: any;
  newProductPriceTitles: any;
  productName = '';
  isEdit = false;
  incoterms: Value[] = [];
  locations: AutocompleteValue[] = [];
  productPrices: ProductPrice[] = [];
  geoLocationId = 0;
  oldPrice = 0;
  currentPage = 1;
  total = 10;
  pageSize = 10;
  product: ProductPriceDto;
  quantityCheckboxController = new FormControl(true, Validators.required);
  incotermCheckboxController = new FormControl(true, Validators.required);
  locationCheckboxController = new FormControl(true, Validators.required);
  priceCheckboxController = new FormControl(true, Validators.required);

  fromController = new FormControl('', Validators.required);
  toController = new FormControl('', Validators.required);
  incotermController = new FormControl('', Validators.required);
  geoLocationController = new FormControl('', Validators.required);
  priceController = new FormControl('', Validators.required);
  displayOrderController = new FormControl(1, Validators.required);

  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productService.productPriceTotal.subscribe(total => {
      this.total = total;
    });
    this.geoLocationController.valueChanges.subscribe(data => {
      if (data.length > 1) {
        this.getGeoLocation();
      }
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'productPriceTitle');
      this.sharedService.onLanguageChanges(language, 'productPriceListTitle');
      this.sharedService.onLanguageChanges(language, 'newProductPriceTitle');
      this.productService.getIncoterms();
      this.getProductsPrices();
    });
    this.productService.isEditPrice.subscribe(value => {
      this.isEdit = value;
    });
    this.productService.productPrices.subscribe(productPrices => {
      this.productPrices = productPrices;
    });
    this.sharedService.productPriceTitles.subscribe(titles => {
      this.productPriceTitles = titles;
    });
    this.sharedService.productPriceListTitles.subscribe(titles => {
      this.productPriceListTitles = titles;
    });
    this.sharedService.newProductPriceTitles.subscribe(titles => {
      this.newProductPriceTitles = titles;
    });
    this.productName = this.activatedRoute.snapshot.params.name;
    this.productService.incoterms.subscribe(incoterms => {
      for (const item of incoterms) {
        const value: Value = {
          name: item.Title,
          value: item.Id,
        };
        this.incoterms.push(value);
      }
    });
    this.productService.productPrice.subscribe((product: ProductPriceDto) => {
      this.product = product;
      if (product.QuantityFrom === -1) {
        this.quantityCheckboxController.setValue(true);
      } else {
        this.quantityCheckboxController.setValue(false);
        this.fromController.setValue(product.QuantityFrom.toString());
      }
      if (product.QuantityTo === -1) {
        this.quantityCheckboxController.setValue(true);
      } else {
        this.quantityCheckboxController.setValue(false);
        this.toController.setValue(product.QuantityTo.toString());
      }
      if (product.IncotermId === -1) {
        this.incotermCheckboxController.setValue(true);
      } else {
        this.incotermCheckboxController.setValue(false);
        this.incotermController.setValue(product.IncotermId.toString());
      }
      if (product.GeolocationId === -1) {
        this.locationCheckboxController.setValue(true);
        this.geoLocationId = -1;
      } else {
        this.locationCheckboxController.setValue(false);
        this.geoLocationId = product.GeolocationId;
        this.geoLocationController.setValue(product.GeoLocationName[this.sharedService.language], {
          emitEvent: false,
        });
      }
      if (product.Price === -1) {
        this.priceCheckboxController.setValue(true);
        this.oldPrice = product.OldPrice;
      } else {
        this.priceCheckboxController.setValue(false);
        this.oldPrice = product.OldPrice;
        this.priceController.setValue(product.Price.toString());
      }
      this.displayOrderController.setValue(product.DisplayOrder);
    });
  }

  isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    return (key > 47 && key < 59) || key === 110 || key === 190;
  }

  getGeoLocation(): void {
    this.sharedService.getGeoLocation(this.geoLocationController.value).subscribe((response: any) => {
      this.locations = [];
      for (const geoLocation of response.jsonResult.Data.geolocation) {
        let country = '';
        let province = '';
        let city = '';
        for (const element of geoLocation.Name) {
          switch (element.Type) {
            case 'country': {
              country += element[this.sharedService.language];
              break;
            }
            case 'Province': {
              province += element[this.sharedService.language];
              break;
            }
            case 'City': {
              city += element[this.sharedService.language];
              break;
            }
          }
        }
        const location = country + (province !== '' ? ', ' : '') + province + (city !== '' ? ', ' : '') + city;
        this.locations.push({
          value: geoLocation.Id,
          name: location,
        });
      }
    });
  }

  onSelectGeolocation(object: ProductPriceComponent, event: any): void {
    object.geoLocationId = event;
  }

  getProductsPrices(): void {
    this.productService.getProductsPrice(this.currentPage, this.activatedRoute.snapshot.params.guid);
  }

  addPrice(): void {
    this.fromController.markAsTouched();
    this.toController.markAsTouched();
    this.incotermController.markAsTouched();
    this.geoLocationController.markAsTouched();
    this.priceController.markAsTouched();
    if (
      (!this.quantityCheckboxController.value ? !this.fromController.errors && !this.toController.errors : true) &&
      (!this.incotermCheckboxController.value ? !this.incotermController.errors : true) &&
      (!this.locationCheckboxController.value ? !this.geoLocationController.errors : true) &&
      (!this.priceCheckboxController.value ? !this.priceController.errors : true)
    ) {
      if (this.isEdit) {
        const data = {
          producttierprice: {
            Id: this.product.Id,
            ProductInventoryId: +this.activatedRoute.snapshot.params.id,
            QuantityFrom: this.quantityCheckboxController.value ? '-1' : this.fromController.value,
            QuantityTo: this.quantityCheckboxController.value ? '-1' : this.toController.value,
            ShowCallForPriceText: true,
            Price: this.priceCheckboxController.value ? '-1' : this.priceController.value,
            OldPrice: 0,
            DisplayOrder: this.displayOrderController.value,
            GeolocationId: this.geoLocationId !== 0 ? this.geoLocationId : '-1',
            IncotermId: this.incotermCheckboxController.value ? '-1' : this.incotermController.value,
          },
        };
        this.productService.updateProductPrice(data, this.currentPage, this.activatedRoute.snapshot.params.guid);
      } else {
        const data = {
          producttierprice: {
            ProductInventoryId: +this.activatedRoute.snapshot.params.id,
            QuantityFrom: this.quantityCheckboxController.value ? '-1' : this.fromController.value,
            QuantityTo: this.quantityCheckboxController.value ? '-1' : this.toController.value,
            ShowCallForPriceText: true,
            Price: this.priceCheckboxController.value ? '-1' : this.priceController.value,
            OldPrice: 0,
            DisplayOrder: this.displayOrderController.value,
            GeolocationId: this.geoLocationId !== 0 ? this.geoLocationId : '-1',
            IncotermId: this.incotermCheckboxController.value ? '-1' : this.incotermController.value,
          },
        };
        this.productService.addProductPrice(data, this.currentPage, this.activatedRoute.snapshot.params.guid);
      }
    }
  }

  onCreate(): void {
    this.displayOrderController.setValue(1);
    this.priceController.setValue('');
    this.fromController.setValue('');
    this.toController.setValue('');
    this.incotermController.setValue('');
    this.geoLocationController.setValue('');

    this.quantityCheckboxController.setValue(true);
    this.incotermCheckboxController.setValue(true);
    this.locationCheckboxController.setValue(true);
    this.priceCheckboxController.setValue(true);

    this.isEdit = false;
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.getProductsPrices();
  }
}
