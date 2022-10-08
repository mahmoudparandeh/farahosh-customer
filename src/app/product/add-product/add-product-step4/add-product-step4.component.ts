import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';
import { Value } from '../../../models/value.model';
import { FormControl, Validators } from '@angular/forms';
import { CertificateImage } from '../../../account/iso.model';
@Component({
  selector: 'app-add-product-step4',
  templateUrl: './add-product-step4.component.html',
  styleUrls: ['./add-product-step4.component.sass'],
})
export class AddProductStep4Component {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() guid;
  activeTab = 4;
  language = 'fa';
  index = 0;
  certificate = {
    certificateId: 1,
  };
  productDetailsTitles: any;
  fileTitles: any;
  apiTitles: any;
  certificates: Value[] = [];
  certificateControllers = [];
  certificateImages = [];
  deletedCertificates = [];
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private sharedService: SharedService,
    private productService: ProductService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.productService.getProductCertificates();
    this.productService.productCertificates.subscribe(certificates => {
      this.certificates = [];
      for (const item of certificates) {
        this.certificates.push({
          value: item.Id,
          name: item.Name,
        });
      }
    });
    this.productService.productCertificateImages.subscribe(certificates => {
      this.certificateControllers = [];
      this.certificateImages = [];
      for (const certificate of certificates) {
        if (certificate.IsThumbnail === false) {
          this.certificateControllers.push(new FormControl(certificate.CertificateId, Validators.required));
          this.certificateImages.push({
            alt: new FormControl(certificate.Alt),
            description: new FormControl(certificate.Description),
            path: certificate.Path,
            tags: new FormControl(certificate.Seo),
            id: certificate.Id,
            tableId: certificate.FileTableId,
            action: 2,
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProductCertificates();
    if (this.guid) {
      this.productService.getProductCertificateImages(this.guid);
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

  onSubmit() {
    const certificates: CertificateImage[] = [];
    for (let i = 0; i < this.certificateImages.length; i++) {
      if (this.certificateImages[i].path !== '' && this.certificateControllers[i].value !== '') {
        certificates.push({
          Action: this.certificateImages[i].action,
          Alt: this.certificateImages[i].alt.value,
          CertificateId: this.certificateControllers[i].value,
          Description: this.certificateImages[i].description.value,
          FileTableId: this.certificateImages[i].tableId,
          Id: this.certificateImages[i].id,
          Seo: this.certificateImages[i].tags.value,
        });
      }
    }
    for (const certificate of this.deletedCertificates) {
      certificates.push(certificate);
    }
    if (certificates.length > 0) {
      this.productService.addProductCertificate(certificates, this.guid).subscribe(_ => {
        window.scrollTo(0, 0);
        this.activatedTab.emit(5);
      });
    } else {
      window.scrollTo(0, 0);
      this.activatedTab.emit(5);
    }
  }

  addNewCertificate(): void {
    this.certificateControllers.push(new FormControl(this.certificates[0].value, Validators.required));
    this.certificateImages.push({
      alt: new FormControl(''),
      description: new FormControl(''),
      path: '',
      tags: new FormControl(''),
      id: -1,
      tableId: '',
      action: 1,
    });
  }

  onCertificateSelected(thisObj, file): void {
    thisObj.certificateImages[thisObj.index].path = file.Path;
    const path = file.Path.split('/');
    thisObj.certificateImages[thisObj.index].tableId = path[path.length - 1];
  }

  deleteCertificate(index): void {
    if (this.certificateImages[index].id === -1) {
      this.certificateImages.splice(index, 1);
      this.certificateControllers.splice(index, 1);
    } else {
      this.deletedCertificates.push({
        Action: 3,
        Alt: this.certificateImages[index].alt.value,
        CertificateId: this.certificateControllers[index].value,
        Description: this.certificateImages[index].description.value,
        FileTableId: this.certificateImages[index].tableId,
        Id: this.certificateImages[index].id,
        Seo: this.certificateImages[index].tags.value,
      });
      this.certificateImages.splice(index, 1);
      this.certificateControllers.splice(index, 1);
    }
  }

  setIndex(i): void {
    this.index = i;
    this.openModal();
  }
  openModal(): void {
    const element = document.getElementById('modal');
    this.renderer.addClass(element, 'show');
  }
}
