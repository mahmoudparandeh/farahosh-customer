import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { Value } from '../../../models/value.model';
import { ProductService } from '../../product.service';
import { Image } from '../../../shared/image.model';
import { ProductDetail } from '../../models/product-item.model';
import Swal from 'sweetalert2';
import { Unit } from '../../../shared/models/unit.model';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-product-final',
  templateUrl: './add-product-final.component.html',
  styleUrls: ['./add-product-final.component.sass'],
})
export class AddProductFinalComponent implements OnInit, OnDestroy {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() logo: Image;
  @Input() gallery: Image[] = [];
  @Input() guid;
  activeTab = 7;
  units: Unit[] = [];
  language = 'fa';
  brands: Value[] = [];
  taxes: Value[] = [];
  productDetailsTitles: any;
  apiTitles: any;
  fileTitles: any;

  // name = '';
  shortDescription = '';
  brand = '';
  sku = '';
  gtin = '';
  tax = '';
  faqList = [];
  productStatus = '';
  ProductionCapacityList = [];
  productImages: Image[] = [];
  productPackageImages: Image[] = [];
  certificateImages: Image[] = [];
  video: Image;
  introductionVideo: Image;
  product: any;

  constructor(private router: Router, private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
      this.sharedService.onLanguageChanges(language, 'fileManagerTitle');
      this.sharedService.onLanguageChanges(language, 'apiTitle');
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    this.sharedService.units.subscribe(units => {
      this.units = units;
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.productService.productImages.subscribe(images => {
      this.productImages = [];
      for (const image of images) {
        if (image.IsThumbnail === false) {
          this.productImages.push({
            id: image.Id,
            alt: new FormControl<any>(image.Alt),
            description: new FormControl<any>(image.Description),
            path: image.Path,
            tags: new FormControl<any>(image.Seo),
            action: 2,
            tableId: image.FileTableId,
          });
        }
      }
    });
    this.productService.productPackageImages.subscribe(images => {
      this.productPackageImages = [];
      for (const image of images) {
        if (image.IsThumbnail === false) {
          this.productPackageImages.push({
            id: image.Id,
            alt: new FormControl<any>(image.Alt),
            description: new FormControl<any>(image.Description),
            path: image.Path,
            tags: new FormControl<any>(image.Seo),
            action: 2,
            tableId: image.FileTableId,
          });
        }
      }
    });
    this.productService.productCertificateImages.subscribe(certificates => {
      this.certificateImages = [];
      for (const certificate of certificates) {
        if (certificate.IsThumbnail === false) {
          this.certificateImages.push({
            path: certificate.Path,
            tags: new FormControl(certificate.Seo),
            id: certificate.Id,
            tableId: certificate.FileTableId,
            certificateName: certificate.CertificateName,
            action: 2,
          });
        }
      }
    });
    this.productService.productVideo.subscribe(videos => {
      for (const video of videos) {
        if (+video.Type === 0) {
          this.video = {
            id: video.Id,
            description: new FormControl<any>(video.Description),
            path: video.Path,
            tags: new FormControl<any>(video.Seo),
            action: 2,
            tableId: video.FileTableId,
          };
        }
        if (+video.Type === 1) {
          this.introductionVideo = {
            id: video.Id,
            description: new FormControl<any>(video.Description),
            path: video.Path,
            tags: new FormControl<any>(video.Seo),
            action: 2,
            tableId: video.FileTableId,
          };
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.guid !== undefined) {
      this.getProduct();
      this.productService.getBrands();
      this.productService.getTaxCategories();
      this.productService.getProductVideos(this.guid, '0');
      this.productService.getProductPictures(this.guid, 'Product');
      this.productService.getProductPictures(this.guid, 'ProductPackaging');
      this.productService.getProductCertificateImages(this.guid);
    }
  }

  getProduct() {
    this.productService.getProductByGuid(this.guid);
    this.productService.product.subscribe(product => {
      this.product = product;
      if (this.product) {
        this.productService.brands.subscribe(brands => {
          for (const brand of brands) {
            if (brand.Id === this.product.Detail.BrandId) {
              this.brand = brand.BrandName;
            }
          }
        });
        this.productService.taxCategoryList.subscribe(taxes => {
          for (const tax of taxes) {
            if (tax.Id === this.product.Detail.TaxCategoryId) {
              // this.tax.setValue(tax.Name);
              this.tax = tax.Name[this.language];
            }
          }
        });
        this.tax = product.Detail.TaxCategoryName;
        this.faqList = this.product.Detail?.FAQ;
        this.ProductionCapacityList = this.product.Detail?.ProductionCapacity;
        if (this.ProductionCapacityList) {
          for (const item of this.ProductionCapacityList) {
            item.unit = this.units.find(u => +u.Id === +item.unit)?.Name;
          }
        }
        switch (this.product.Detail.Status) {
          case 0:
            this.productStatus = this.productDetailsTitles.status_0;
            break;
          case 1:
            this.productStatus = this.productDetailsTitles.status_1;
            break;
          case 2:
            this.productStatus = this.productDetailsTitles.status_2;
            break;
          case 3:
            this.productStatus = this.productDetailsTitles.status_3;
            break;
          case 4:
            this.productStatus = this.productDetailsTitles.status_4;
            break;
        }
      }
    });
  }
  onSubmit() {
    // let product;
    this.productService.productFinalSave(this.guid).subscribe(response => {
      this.productService.productGuid.next('');
      this.productService.product = new ReplaySubject<ProductDetail>();
      this.productService.categoryAttributes.next([]);
      this.productService.selectedCategories.next([]);
      this.router.navigate(['/', this.language, 'product', 'list']);
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.create,
      });
      // sessionStorage.removeItem('formValueStep1');
    });
  }

  goBack() {
    if (this.activeTab > 1) {
      this.activeTab -= 1;
      this.activatedTab.emit(this.activeTab);
    } else {
      this.router.navigate(['/', this.language, 'product', 'list']);
    }
  }

  ngOnDestroy(): void {
    this.productService.product.complete();
  }
}
