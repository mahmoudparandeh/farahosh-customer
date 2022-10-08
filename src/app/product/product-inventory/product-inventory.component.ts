import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ProductService } from '../product.service';
import { ProductInventory, ProductInventoryDto } from '../models/profuctInventory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../../ware-house/warehouse.service';
import { Value } from '../../models/value.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidatorsHelper } from '../../shared/helper/validators';
import { ProductInventoryAttribute } from '../models/productAttribute.model';
import { AutocompleteValue } from '../../core/models/autoComplete.model';
import { ProductInventoryPrice } from '../models/product.inventory.price.model';
import {Currency} from "../models/currency.model";

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.sass'],
})
export class ProductInventoryComponent implements OnInit {
  total = 1;
  pageSize = 10;
  currentPage = 1;
  id = 0;
  productInventoryId = 0;
  productGUID = '';
  isEdit = false;
  products: ProductInventoryPrice[] = [];
  productName = '';
  productInventoryTitles: any;
  productInventoryListTitles: any;
  apiTitles: any;
  warehouses: Value[] = [];
  units: Value[] = [];
  incoterms: Value[] = [];
  locations: AutocompleteValue[] = [];
  geoLocationId = 0;
  productAttributes: ProductInventoryAttribute[] = [];
  oldPrice = 0;
  currencies: Currency[] = [];
  currenciesValue: Value[] = [];
  locationCheckboxController = new FormControl(true, Validators.required);
  priceCheckboxController = new FormControl(true, Validators.required);
  warehouseId = 0;
  warehouseController = new FormControl<any>('', Validators.required);
  inventoryController = new FormControl('', Validators.required);
  unitController = new FormControl<any>('', Validators.required);
  fromController = new FormControl<any>('', [Validators.required, Validators.pattern('\\b([0-9]*[.])?[0-9]+\\b')]);
  toController = new FormControl<any>('', [Validators.required, Validators.pattern('\\b([0-9]*[.])?[0-9]+\\b')]);
  incotermController = new FormControl('', Validators.required);
  geoLocationController = new FormControl('', Validators.required);
  priceController = new FormControl('', [Validators.required, Validators.pattern('\\b([0-9]*[.])?[0-9]+\\b')]);
  currencyController = new FormControl('', [Validators.required]);
  minInventoryController = new FormControl('', [
    Validators.required,
    ValidatorsHelper.mustSmall(this.inventoryController),
  ]);
  maxOrderController = new FormControl('', Validators.required);
  minOrderController = new FormControl('', [Validators.required, ValidatorsHelper.mustSmall(this.maxOrderController)]);
  attributeControllers = [];
  inventoryForm: FormGroup = this.formBuilder.group({
    warehouseController: this.warehouseController,
    inventoryController: this.inventoryController,
    unitController: this.unitController,
    toController: this.toController,
    fromController: this.fromController,
    currencyController: this.currencyController,
    priceController: this.priceController,
    minInventoryController: this.minInventoryController,
    maxOrderController: this.maxOrderController,
    minOrderController: this.minOrderController,
  });
  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
    private formBuilder: FormBuilder
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'productInventoryTitle');
      this.sharedService.onLanguageChanges(language, 'productInventoryListTitle');
      this.sharedService.onLanguageChanges(language, 'newProductPriceTitle');
      this.productService.getProductsPrice(this.currentPage, this.activatedRoute.snapshot.params.id);
      this.warehouseService.getWarehouseList();
      this.productService.getIncoterms();
      this.productService.getProductAttributes(this.activatedRoute.snapshot.params.id);
      this.productService.getVirtualWarehouse();
      this.currenciesValue = [];
      for (const currency of this.currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.sharedService.language],
        });
      }
    });
    this.productService.getCurrencies();
    this.productService.currencies.subscribe((currencies) => {
      this.currencies = currencies;
      this.currenciesValue = [];
      for (const currency of currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.sharedService.language]
        });
      }
      this.currencyController.setValue(this.currenciesValue[0].value);
    });
    this.productService.productPriceTotal.subscribe(total => {
      this.total = total;
    });
    this.geoLocationController.valueChanges.subscribe(data => {
      if (data.length > 1) {
        this.geoLocationId = -1;
        this.getGeoLocation();
      }
    });
    this.sharedService.productInventoryTitles.subscribe(titles => {
      this.productInventoryTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.productService.isEditInventory.subscribe(value => {
      this.isEdit = value.isEdit;
      const productInventoryPrice: ProductInventoryPrice = this.products.find(p => p.Id === value.id);
      let index = 0;
      for (const item of productInventoryPrice.SpecialAttributeValue) {
        this.attributeControllers[index].setValue(item.AttributeValueId);
        index++;
      }
      this.id = value.id;
      this.productInventoryId = productInventoryPrice.ProductInventoryId;
      this.unitController.setValue(productInventoryPrice.UnitId);
      this.incotermController.setValue(productInventoryPrice.IncotermId.toString());
      this.fromController.setValue(productInventoryPrice.QuantityFrom.toString());
      this.toController.setValue(productInventoryPrice.QuantityTo.toString());
      this.currencyController.setValue(productInventoryPrice.CurrencyId.toString());
      this.locationCheckboxController.setValue(productInventoryPrice.GeolocationId === -1);
      this.geoLocationController.setValue(productInventoryPrice.GeolocationName[this.sharedService.language], {
        emitEvent: false,
      });
      this.geoLocationId = productInventoryPrice.GeolocationId;
      this.priceCheckboxController.setValue(productInventoryPrice.Price === -1);
      if (productInventoryPrice.Price !== -1) {
        this.priceController.setValue(productInventoryPrice.Price.toString());
      } else {
        this.priceController.setValue('');
      }
    });
    this.sharedService.productInventoryListTitles.subscribe(titles => {
      this.productInventoryListTitles = titles;
    });
    this.warehouseService.warehouseList.subscribe(warehouses => {
      this.warehouses = [];
      for (const item of warehouses) {
        this.warehouses.push({
          name: item.Name[this.sharedService.language] ?? item.Name['fa'],
          value: item.Id,
        });
      }
    });
    this.sharedService.units.subscribe(units => {
      this.units = [];
      for (const item of units) {
        this.units.push({
          name: item.Name,
          value: item.Id,
        });
      }
    });
    this.productService.productInventoryPrices.subscribe(products => {
      this.products = products;
    });
    this.productService.productInventory.subscribe(product => {
      if (product !== null) {
        this.id = product.Id;
        this.productGUID = product.ProductGuid;
        this.warehouseController.setValue(product.WareHouseId);
        this.unitController.setValue(product.UnitId);
        const interval = setInterval(() => {
          if (this.productAttributes !== null) {
            for (const attribute of product.SpecialAttributeValue) {
              for (let i = 0; i < this.productAttributes.length; i++) {
                if (attribute.AttributeId === this.productAttributes[i].AttributeId) {
                  this.attributeControllers[i].setValue(attribute.AttributeValueId);
                }
              }
            }
            clearInterval(interval);
          }
        }, 1000);
      }
    });
    this.productService.productInventoryTotal.subscribe(total => {
      this.total = total;
    });
    this.productService.productInventoryAttribute.subscribe(attributes => {
      this.attributeControllers = [];
      this.productAttributes = attributes;
      this.productAttributes = this.productAttributes.filter(attr => attr.AttributeValues.length > 0 && attr.Type === 1);
      this.productAttributes.forEach(_ => {
        this.attributeControllers.push(new FormControl('', Validators.required));
      });
    });
    this.productService.incoterms.subscribe(incoterms => {
      this.incoterms = [];
      for (const item of incoterms) {
        const value: Value = {
          name: item.Title,
          value: item.Id,
        };
        this.incoterms.push(value);
        this.incotermController.setValue(this.incoterms[0].value);
      }
    });
    this.productName = this.activatedRoute.snapshot.params.name;
    this.productService.virtualWarehouse.subscribe((warehouse: any) => {
      this.warehouseController.setValue(warehouse.Id);
      this.warehouseId = warehouse.Id;
    });
  }

  onSelectGeolocation(object: ProductInventoryComponent, event: any): void {
    object.geoLocationId = event;
  }

  ngOnInit(): void {}

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

  onSubmitProductInventory(): void {
    this.incotermController.markAllAsTouched();
    if (this.warehouses.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: this.productInventoryTitles.warehouse_warning,
        confirmButtonText: this.productInventoryTitles.warehouse_confirm,
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate([this.sharedService.language, 'warehouse']);
        }
      });
    } else {
      this.inventoryForm.markAllAsTouched();
      let attributeValidation = true;
      for (const attribute of this.attributeControllers) {
        if (attribute.errors) {
          attributeValidation = false;
          break;
        }
      }
      if (
        (!this.fromController.errors || this.fromController.value <= this.toController.value) &&
        (!this.toController.errors || this.fromController.value <= this.toController.value) &&
        !this.incotermController.errors &&
        !this.unitController.errors &&
        !this.currencyController.errors &&
        (!this.locationCheckboxController.value ? !this.geoLocationController.errors : true) &&
        (!this.priceCheckboxController.value ? !this.priceController.errors : true) &&
        attributeValidation
      ) {
        const dto: ProductInventoryDto = {
          Id: 0,
          UnitId: +this.unitController.value,
          ProductGuid: this.activatedRoute.snapshot.params.id,
          ShowCallForPriceText: false,
          SpecialAttributeValue: [],
          WareHouseId: +this.warehouseController.value,
          GeolocationId: this.locationCheckboxController.value === false ? this.geoLocationId : -1,
          Price: this.priceCheckboxController.value === false ? +this.priceController.value : -1,
          QuantityFrom: +this.fromController.value,
          QuantityTo: +this.toController.value,
          IncotermId: +this.incotermController.value,
          CurrencyId: +this.currencyController.value ?? 0,
          ProductInventoryId: 0,
        };
        let index = 0;
        for (const attribute of this.productAttributes) {
          dto.SpecialAttributeValue.push({
            AttributeId: attribute.AttributeId,
            AttributeValueId: +this.attributeControllers[index].value,
          });
          index++;
        }
        if (this.isEdit) {
          dto.Id = this.id;
          dto.ProductInventoryId = this.productInventoryId;
          const data = { productinventoryandtierprice: dto };
          this.productService.updateProductInventory(data).subscribe(response => {
            Swal.fire({
              icon: 'success',
              text: this.apiTitles.update,
            });
            this.productService.getProductsPrice(this.currentPage, data.productinventoryandtierprice.ProductGuid);
          });
        } else {
          delete dto.Id;
          delete dto.ProductInventoryId;
          const data = { productinventoryandtierprice: dto };
          this.productService.addProductToInventory(data).subscribe(response => {
            Swal.fire({
              icon: 'success',
              text: this.apiTitles.update,
            });
            this.productService.getProductsPrice(this.currentPage, data.productinventoryandtierprice.ProductGuid);
            this.onCreate();
          });
        }
      }
    }
  }

  onCreate(): void {
    this.id = 0;
    this.unitController.setValue('');
    this.unitController.markAsUntouched();
    this.inventoryController.setValue('');
    this.inventoryController.markAsUntouched();
    this.minInventoryController.setValue('');
    this.minInventoryController.markAsUntouched();
    this.maxOrderController.setValue('');
    this.maxOrderController.markAsUntouched();
    this.minOrderController.setValue('');
    this.minOrderController.markAsUntouched();
    this.fromController.setValue('');
    this.fromController.markAsUntouched();
    this.toController.setValue('');
    this.toController.markAsUntouched();
    this.geoLocationId = -1;
    this.geoLocationController.setValue('');
    this.geoLocationController.markAsUntouched();
    this.incotermController.setValue(this.incoterms[0].value);
    this.priceController.setValue('');
    this.priceController.markAsUntouched();
    this.priceCheckboxController.setValue(true);
    this.locationCheckboxController.setValue(true);
    for (const item of this.attributeControllers) {
      item.setValue('');
      item.markAsUntouched();
    }
    this.isEdit = false;
  }

  isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    return (key > 47 && key < 59) || key === 110 || key === 190 || key === 46;
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.productService.getProductsPrice(this.currentPage, this.activatedRoute.snapshot.params.id);
  }
}
