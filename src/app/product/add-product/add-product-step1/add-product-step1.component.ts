import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Value } from '../../../models/value.model';
import { ProductService } from '../../product.service';
import { ProductItemModel } from '../../models/product-item.model';
import Swal from 'sweetalert2';
let otherFeatures = '';
@Component({
  selector: 'app-add-product-step1',
  templateUrl: './add-product-step1.component.html',
  styleUrls: ['./add-product-step1.component.sass'],
})
export class AddProductStep1Component {
  @Output() activatedTab = new EventEmitter<number>();
  attributeTitles: any;
  productDetailsTitles: any;
  apiTitles: any;
  language = 'fa';
  activeTab = 1;
  brands: Value[] = [];
  product: ProductItemModel = {
    pkgHeight: undefined,
    pkgLength: undefined,
    pkgNature: undefined,
    pkgType: undefined,
    pkgWeigth: undefined,
    pkgWidth: undefined,
    pkhWeigthUnit: undefined,
    Id: 0,
    FullDescription: {},
    Name: {},
    MetaDescription: {},
    ShortDescription: {},
    FarahooshComment: {},
    BrandId: 0,
    MetaKeywords: {},
    MetaTitle: {},
    UserAgreementText: {},
    Status: 4,
  };

  name = new FormControl('', [Validators.required]);
  customizable = 'yes';
  readyToShip = 'yes';
  guid = '';
  shortDescription = new FormControl('', [Validators.required]);
  fullDescription = new FormControl('', [Validators.required]);
  metaDescription = new FormControl('');
  metaKeywords = new FormControl('');
  metaTitle = new FormControl('');
  userAgreement = new FormControl('');
  brand = new FormControl('', [Validators.required]);
  sku = new FormControl('');
  gtin = new FormControl('');
  manufacturerPartNumber = new FormControl('');

  productForm = this.formBuilder.group({
    name: this.name,
    shortDescription: this.shortDescription,
    fullDescription: this.fullDescription,
    metaDescription: this.metaDescription,
    metaKeywords: this.metaKeywords,
    metaTitle: this.metaTitle,
    UserAgreement: this.userAgreement,
    sku: this.sku,
    brand: this.brand,
    ManufacturerPartNumber: this.manufacturerPartNumber,
    Gtin: this.gtin,
  });

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
      this.productService.getBrands();
    });
    if (this.guid === '') {
      this.guid = this.activatedRoute.snapshot.params.id;
    }
    this.sharedService.attributeTitles.subscribe(titles => {
      this.attributeTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    if (!this.activatedRoute.snapshot.params.id) {
      otherFeatures = '';
    }
    this.productService.brands.subscribe(brands => {
      this.brands = [];
      for (const item of brands) {
        this.brands.push({
          value: item.Id,
          name: item.BrandName,
        });
      }
      if (this.brands.length > 0) {
        this.brand.setValue(this.brands[0].value);
      }
    });
    this.productService.productGuid.subscribe(guid => {
      this.guid = guid;
      if (this.guid) {
      } else {
        otherFeatures = '';
      }
    });
    this.productService.product.subscribe(product => {
      this.product = product.Detail;
      otherFeatures = '';
      if (this.activatedRoute.snapshot.params.id || this.guid) {
        this.name.setValue(product.Detail?.Name[this.language]);
        this.shortDescription.setValue(product.Detail?.ShortDescription[this.language]);
        this.fullDescription.setValue(product.Detail?.FullDescription[this.language]);
        this.metaDescription.setValue(product.Detail?.MetaDescription[this.language]);
        this.metaKeywords.setValue(product.Detail?.MetaKeywords[this.language]);
        this.metaTitle.setValue(product.Detail?.MetaTitle[this.language]);
        this.userAgreement.setValue(product.Detail?.UserAgreementText[this.language]);
        otherFeatures = product.Detail?.OtherDetails[this.language];
        this.brand.setValue(product.Detail?.BrandId);
        this.sku.setValue(product.Detail?.Sku);
        this.gtin.setValue(product.Detail?.Gtin);
        this.sku.setValue(product.Detail?.Sku);
        this.manufacturerPartNumber.setValue(product.Detail?.ManufacturerPartNumber);
        this.readyToShip = product.Detail?.ReadyToShip ? 'yes' : 'no';
        this.customizable = product.Detail?.IsCustomizable ? 'yes' : 'no';
      }
    });
  }

  getOtherFeature(): string {
    return otherFeatures;
  }

  onOtherFeatureChanged(thisObj, data): void {
    otherFeatures = data;
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    console.log(this.product);
    this.product.Name.fa = this.name.value;
    try {
      this.product.ShortDescription.fa = this.shortDescription.value;
    } catch {
      this.product.ShortDescription = {
        fa: this.shortDescription.value,
      };
    }
    try {
      this.product.ShortDescription.fa = this.shortDescription.value;
    } catch {
      this.product.ShortDescription = {
        fa: this.shortDescription.value,
      };
    }
    try {
      this.product.FullDescription.fa = this.fullDescription.value;
    } catch {
      this.product.FullDescription = {
        fa: this.fullDescription.value,
      };
    }
    try {
      this.product.MetaDescription.fa = this.metaDescription.value;
    } catch {
      this.product.MetaDescription = {
        fa: this.metaDescription.value,
      };
    }
    try {
      this.product.MetaKeywords.fa = this.metaKeywords.value;
    } catch {
      this.product.MetaKeywords = {
        fa: this.metaKeywords.value,
      };
    }
    try {
      this.product.MetaTitle.fa = this.metaTitle.value;
    } catch {
      this.product.MetaTitle = {
        fa: this.metaTitle.value,
      };
    }
    try {
      this.product.UserAgreementText.fa = this.userAgreement.value;
    } catch {
      this.product.UserAgreementText = {
        fa: this.userAgreement.value,
      };
    }
    this.product.Sku = this.sku.value;
    this.product.BrandId = this.brand.value;
    this.product.ManufacturerPartNumber = this.manufacturerPartNumber.value;
    this.product.Gtin = this.gtin.value;
    try {
      this.product.OtherDetails.fa = otherFeatures;
    } catch {
      this.product.OtherDetails = {
        fa: otherFeatures,
      };
    }
    this.product.IsCustomizable = this.customizable === 'yes';
    this.product.ReadyToShip = this.readyToShip === 'yes';
    if (this.productForm.valid) {
      if (this.guid) {
        delete this.product.Id;
        this.product.ProductGuid = this.guid;
        this.productService.productCustomUpdate(this.product).subscribe(_ => {
          this.productService.getProductByGuid(this.guid);
          this.activatedTab.emit(2);
        });
      } else {
        this.productService.createProduct(this.product).subscribe((response: any) => {
          this.productService.productGuid.next(response.id);
          this.productService.getProductByGuid(response.id);
          // sessionStorage.setItem('formValueStep1', JSON.stringify(this.product));
          window.scrollTo(0, 0);
          this.activatedTab.emit(2);
        });
      }
    } else {
      let error = '';
      if (this.name.errors) {
        error += this.productDetailsTitles.product_name_required + '<br>';
      }
      if (this.shortDescription.errors) {
        error += this.productDetailsTitles.shortDescription_required + '<br>';
      }
      if (this.fullDescription.errors) {
        error += this.productDetailsTitles.product_fullDescription_required + '<br>';
      }
      if (this.brand.errors) {
        error += this.productDetailsTitles.brand_required + '<br>';
      }
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: error,
      }).then();
    }
  }

  goBack() {
    if (this.activeTab > 1) {
      this.activeTab -= 1;
      this.activatedTab.emit(this.activeTab);
    } else {
      this.router.navigate(['/', this.language, 'product', 'list']);
    }
  }

  setCustomizable(value): void {
    this.customizable = value;
  }
  setReadyToShip(value): void {
    this.readyToShip = value;
  }
}
