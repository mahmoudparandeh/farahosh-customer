import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { AccountService } from '../../account.service';
import { CertificateImage, Iso } from '../../iso.model';
import { formControl } from '@angular/core/schematics/migrations/typed-forms/util';
import { FormControl } from '@angular/forms';
import { Profile } from '../profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-certificates',
  templateUrl: './company-certificates.component.html',
  styleUrls: ['./company-certificates.component.sass'],
})
export class CompanyCertificatesComponent implements OnInit {
  fileTitles: any;
  profileTitles: any;
  apiTitles: any;
  language = 'fa';
  @Input() isos: Iso[] = [];
  certificate = {
    certificateId: 1,
  };
  index = 0;
  @Input() isosCheckboxes = [];
  @Input() isosImages: CertificateImage[] = [];
  constructor(
    private sharedService: SharedService,
    private accountService: AccountService,
    private renderer: Renderer2
  ) {
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  openModal(): void {
    const element = document.getElementById('modal');
    this.renderer.addClass(element, 'show');
  }

  onCertificateSelected(thisObj, file): void {
    thisObj.isosImages[thisObj.index].Path = file.Path;
    const path = file.Path.split('/');
    thisObj.isosImages[thisObj.index].FileTableId = path[path.length - 1];
  }

  ngOnInit(): void {}

  setCertificate(index): void {
    if (this.isosCheckboxes[index].value) {
      this.isosImages[index].CertificateId = this.isos[index].Id;
      if (this.isosImages[index].Id !== -1) {
        this.isosImages[index].Action = 2;
      } else {
        this.isosImages[index].Action = 1;
      }
    } else {
      if (this.isosImages[index].Id !== -1) {
        this.isosImages[index].Action = 3;
        this.isosImages[index].Path = '';
        this.isosImages[index].Alt = new FormControl('');
        this.isosImages[index].Description = new FormControl('');
        this.isosImages[index].Seo = new FormControl('');
      } else {
        this.isosImages[index].Path = '';
        this.isosImages[index].Alt = new FormControl('');
        this.isosImages[index].Description = new FormControl('');
        this.isosImages[index].Seo = new FormControl('');
        this.isosImages[index].CertificateId = 0;
        this.isosImages[index].Action = 0;
        this.isosImages[index].Id = -1;
      }
    }
  }

  setIndex(i): void {
    this.index = i;
    this.openModal();
  }

  updateProfile(): void {
    const alteredIsoImages: CertificateImage[] = [];
    for (const item of this.isosImages) {
      if (item.Action !== 0) {
        alteredIsoImages.push({
          Action: item.Action,
          Alt: item.Alt.value,
          CertificateId: item.CertificateId,
          Description: item.Description.value,
          FileTableId: item.FileTableId,
          Id: item.Id,
          Seo: item.Seo.value,
        });
      }
    }
    if (alteredIsoImages.length > 0) {
      this.accountService.updateISOs(alteredIsoImages).subscribe((response: any) => {
        this.accountService.getVendorCertificateImages();
        Swal.fire({
          icon: 'success',
          text: this.apiTitles.update,
        });
      });
    }
  }
}
