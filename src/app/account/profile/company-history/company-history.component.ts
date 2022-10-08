import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Image } from '../../../shared/image.model';
import { formControl } from '@angular/core/schematics/migrations/typed-forms/util';
import { Profile } from '../profile.model';
import Swal from 'sweetalert2';
import { CertificateImage } from '../../iso.model';
import { AccountService } from '../../account.service';
import { FileManagerService } from '../../../file-manager/file-manager.service';

@Component({
  selector: 'app-company-history',
  templateUrl: './company-history.component.html',
  styleUrls: ['./company-history.component.sass'],
})
export class CompanyHistoryComponent implements OnInit {
  profileTitles: any;
  fileTitles: any;
  apiTitles: any;
  imageGalleryIndex = 1;
  galleryType = 'Image';
  fileManagerType = 'Image';
  @Input() controllers: any;
  @Input() logo: Image;
  @Input() gallery: Image[] = [];
  @Input() deletedGallery: Image[] = [];
  profile: Profile;
  constructor(
    private sharedService: SharedService,
    private accountService: AccountService,
    private renderer: Renderer2,
    private fileManagerService: FileManagerService
  ) {
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.accountService.profile.subscribe(profile => {
      this.profile = profile;
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  ngOnInit(): void {}
  onLogoSelected(thisObj, file) {
    const paths = file.Path.split('/');
    thisObj.logo.path = file.Path;
    thisObj.logo.tableId = paths[paths.length - 1];
  }
  onGallerySelected(thisObj, file) {
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
    thisObj.gallery.push(image);
  }
  deleteGallery(index: number) {
    if (this.gallery[index].id !== -1) {
      this.gallery[index].action = 3;
      this.deletedGallery.push(this.gallery[index]);
    }
    this.gallery.splice(index, 1);
  }

  updateProfile(): void {
    if (!this.controllers.emailController.hasError('email')) {
      this.profile.AnnualExportTurnover = this.controllers.annualExportTurnoverController.value;
      try {
        this.profile.BusinessType.fa = this.controllers.typeOfBusinessProductsController.value;
      } catch {
        this.profile.BusinessType = {
          fa: this.controllers.typeOfBusinessProductsController.value,
        };
      }
      try {
        this.profile.ContactPerson.fa = this.controllers.contactPersonController.value;
      } catch {
        this.profile.ContactPerson = {
          fa: this.controllers.contactPersonController.value,
        };
      }
      this.profile.Email = this.controllers.emailController.value;
      this.profile.Fax = this.controllers.mobileCountry.value + '-' + this.controllers.faxController.value;
      this.profile.GrossAnnualTurnover = this.controllers.grossAnnualTurnoverController.value;
      try {
        this.profile.LegalStatus.fa = this.controllers.legalStatusController.value;
      } catch {
        this.profile.LegalStatus = {
          fa: this.controllers.legalStatusController.value,
        };
      }
      this.profile.NumberOfEmployees = +this.controllers.numberOfEmployeeController.value;
      try {
        this.profile.Refrences.fa = this.controllers.referencesController.value;
      } catch {
        this.profile.Refrences = {
          fa: this.controllers.referencesController.value,
        };
      }
      this.profile.YearEstablished = this.controllers.yearEstablishedController.value;
      this.profile.ResponseRFQTime = this.controllers.responseRFQTimeController.value;
      const vendor = {
        AnnualExportTurnover: this.profile.AnnualExportTurnover,
        BusinessType: this.profile.BusinessType,
        ContactPerson: this.profile.ContactPerson,
        Email: this.profile.Email,
        Fax: this.profile.Fax,
        GrossAnnualTurnover: this.profile.GrossAnnualTurnover,
        LegalStatus: this.profile.LegalStatus,
        NumberOfEmployees: this.profile.NumberOfEmployees,
        Refrences: this.profile.Refrences,
        YearEstablished: this.profile.YearEstablished,
        ResponseRFQTime: this.profile.ResponseRFQTime,
      };
      this.accountService.customUpdateProfile(vendor).subscribe((response: any) => {
        this.accountService.getProfile();
        Swal.fire({
          icon: 'success',
          text: this.apiTitles.update,
        });
      });
    }
    if (this.logo.path !== '') {
      this.accountService.updateLogo(this.logo).subscribe((response: any) => {
        this.accountService.getVendorProfileImages();
        Swal.fire({
          icon: 'success',
          text: this.apiTitles.update,
        });
      });
    }
    if (this.gallery.length > 0) {
      this.accountService.updateGallery(this.gallery, this.deletedGallery).subscribe((response: any) => {
        this.accountService.getVendorProfileImages();
        Swal.fire({
          icon: 'success',
          text: this.apiTitles.update,
        });
      });
    }
  }

  isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    return (key > 47 && key < 59) || key === 110 || key === 190;
  }

  setFileManagerType(type: string, id: string): void {
    this.fileManagerType = type;
    this.galleryType = id;
    this.fileManagerService.type.next(type);
    const element = document.getElementById('modal');
    this.renderer.addClass(element, 'show');
  }

  onFileGallerySelected(thisObj, file, id) {
    switch (id) {
      case 'Logo': {
        thisObj.onLogoSelected(thisObj, file);
        break;
      }
      case 'Gallery': {
        thisObj.onGallerySelected(thisObj, file);
        break;
      }
    }
  }
}
