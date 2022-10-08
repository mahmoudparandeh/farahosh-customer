import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';
import { Value } from '../../../models/value.model';
import { FormControl, Validators } from '@angular/forms';
import { Image, ImageDto } from '../../../shared/image.model';
import Swal from 'sweetalert2';
import { ProductDetail } from '../../models/product-item.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product-step3',
  templateUrl: './add-product-step3.component.html',
  styleUrls: ['./add-product-step3.component.sass'],
})
export class AddProductStep3Component implements OnInit {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() guid;
  activeTab = 3;
  product: ProductDetail;
  language = 'fa';
  packageIndex = 1;
  productDetailsTitles: any;
  fileTitles: any;
  apiTitles: any;
  transportValidation = true;
  productKind = 'dangerous';
  packageTypes: Value[] = [];
  weightUnits: Value[] = [];
  transports: Value[] = [];
  packageImages: Image[] = [];
  deletedPackageImages: Image[] = [];
  packageTypeController = new FormControl('', Validators.required);
  packageWeightController = new FormControl('', Validators.required);
  weightUniteController = new FormControl('', Validators.required);
  lengthController = new FormControl('', Validators.required);
  widthController = new FormControl('', Validators.required);
  heightController = new FormControl('', Validators.required);
  transportsControllers = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private productService: ProductService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.productService.transports.subscribe(transports => {
      for (const item of transports) {
        this.transports.push({
          value: item.Id,
          name: item.Name,
        });
        this.transportsControllers.push(new FormControl());
      }
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    this.productService.productPackageTypes.subscribe(productPackage => {
      this.packageTypes = [];
      for (const item of productPackage) {
        this.packageTypes.push({
          value: item.Id,
          name: item.Name[this.sharedService.language],
        });
      }
      this.packageTypeController.setValue(this.packageTypeController.value ?? '0');
    });
    this.productService.productPackageImages.subscribe(images => {
      this.packageImages = [];
      for (const image of images) {
        if (image.IsThumbnail === false) {
          this.packageImages.push({
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
    this.productService.product.subscribe(product => {
      this.product = product;
      this.lengthController.setValue(product.Detail.pkgLength);
      this.widthController.setValue(product.Detail.pkgWidth);
      this.heightController.setValue(product.Detail.pkgHeight);
      if (product.Detail.pkhWeigthUnit) {
        this.weightUniteController.setValue(product.Detail.pkhWeigthUnit);
      }
      this.packageWeightController.setValue(product.Detail.pkgWeigth);
      if (product.Detail.pkgType) {
        this.packageTypeController.setValue(product.Detail.pkgType);
      }
      this.productKind = product.Detail.pkgNature === 0 ? 'dangerous' : 'not dangerous';
      const interval = setInterval(() => {
        if (this.transports.length > 0) {
          for (const transport of this.product.ProductTransportation) {
            const index = this.transports.findIndex(trs => trs.value === transport.TransportationId);
            this.transportsControllers[index].setValue(true);
            this.transportValidation = false;
          }
          clearInterval(interval);
        }
      }, 50);
    });
    this.productService.productWeightUnit.subscribe(weights => {
      this.weightUnits = [];
      for (const item of weights) {
        this.weightUnits.push({
          value: item.Id,
          name: item.Name[this.sharedService.language],
        });
      }
      this.weightUniteController.setValue(this.weightUniteController.value ?? '0');
    });
  }

  ngOnInit(): void {
    this.productService.getProductPictures(this.guid, 'ProductPackaging');
  }

  goBack() {
    if (this.activeTab > 1) {
      this.activeTab -= 1;
      this.activatedTab.emit(this.activeTab);
    } else {
      this.router.navigate(['/', this.language, 'product', 'list']);
    }
  }

  onSubmit() {
    this.weightUniteController.markAsTouched();
    this.packageWeightController.markAsTouched();
    this.widthController.markAsTouched();
    this.lengthController.markAsTouched();
    this.heightController.markAsTouched();
    this.packageTypeController.markAsTouched();
    let validation = false;
    for (const transport of this.transportsControllers) {
      if (transport.value) {
        validation = true;
        break;
      }
    }
    if (
      !this.weightUniteController.errors &&
      !this.packageWeightController.errors &&
      !this.widthController.errors &&
      !this.lengthController.errors &&
      !this.heightController.errors &&
      !this.packageTypeController.errors &&
      validation
    ) {
      const data = {
        ProductGuid: this.guid,
        pkgHeight: this.heightController.value,
        pkgLength: this.lengthController.value,
        pkgNature: this.productKind === 'dangerous' ? 0 : 1,
        pkgType: this.packageTypeController.value,
        pkgWeigth: this.packageWeightController.value,
        pkgWidth: this.widthController.value,
        pkhWeigthUnit: this.weightUniteController.value,
      };
      this.productService.productCustomUpdate(data).subscribe(_ => {
        this.productService.getProductByGuid(this.guid);
        window.scrollTo(0, 0);
        this.activatedTab.emit(4);
      });
      const packageImages: ImageDto[] = [];
      for (let i = 0; i < this.packageImages.length; i++) {
        if (this.packageImages[i].path !== '') {
          packageImages.push({
            Action: this.packageImages[i].action,
            Alt: this.packageImages[i].alt.value,
            Description: this.packageImages[i].description.value,
            FileTableId: this.packageImages[i].tableId,
            Id: this.packageImages[i].id,
            Seo: this.packageImages[i].tags.value,
          });
        }
      }
      for (const packageImage of this.deletedPackageImages) {
        packageImages.push({
          Action: packageImage.action,
          Alt: packageImage.alt.value,
          Description: packageImage.description.value,
          FileTableId: packageImage.tableId,
          Id: packageImage.id,
          Seo: packageImage.tags.value,
        });
      }
      if (packageImages.length > 0) {
        this.productService.addProductPictures(packageImages, this.guid, 'ProductPackaging').subscribe(_ => {});
      }
      const transports = [];
      for (let i = 0; i < this.transportsControllers.length; i++) {
        if (this.transportsControllers[i].value) {
          transports.push({
            producttransportation: {
              ProductGuid: this.guid,
              TransportationId: this.transports[i].value,
            },
          });
        }
      }
      this.productService.upsertTransport(transports).subscribe((response: any) => {
        this.productService.getProductByGuid(this.guid);
        this.activatedTab.emit(4);
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: this.apiTitles.required,
      });
    }
  }

  setValidation(i: number): void {
    this.transportsControllers[i].setValue(this.transportsControllers[i].value);
    this.transportValidation = true;
    for (const transport of this.transportsControllers) {
      if (transport.value) {
        this.transportValidation = false;
        break;
      }
    }
  }

  setProductKind(value: string): void {
    this.productKind = value;
  }

  isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    return (key > 47 && key < 59) || key === 110 || key === 190;
  }

  onPackageSelected(thisObj, file) {
    const paths = file.Path.split('/');
    const image: Image = {
      alt: new FormControl(''),
      description: new FormControl(''),
      path: file.Path,
      tags: new FormControl(''),
      tableId: paths[paths.length - 1],
      id: -1,
      action: 1,
    };
    thisObj.packageImages.push(image);
  }

  deletePackage(index: number) {
    if (this.packageImages[index].id !== -1) {
      this.packageImages[index].action = 3;
      this.deletedPackageImages.push(this.packageImages[index]);
    }
    this.packageImages.splice(index, 1);
  }

  openModal(): void {
    const element = document.getElementById('modal');
    this.renderer.addClass(element, 'show');
  }
}
