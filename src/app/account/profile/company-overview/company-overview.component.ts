import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { AccountService } from '../../account.service';
import { Profile } from '../profile.model';
import Swal from 'sweetalert2';
import { CertificateImage } from '../../iso.model';
let data = '';
@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.sass'],
})
export class CompanyOverviewComponent implements OnInit {
  profileTitles: any;
  apiTitles: any;
  @Input() controllers: any;
  @Input() profileController;
  profile: Profile;
  language = 'fa';
  constructor(private sharedService: SharedService, private accountService: AccountService) {
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.accountService.profile.subscribe(profile => {
      data = profile.FullProfile.fa;
      this.profile = profile;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  ngOnInit(): void {}

  getData() {
    return data;
  }

  profileChanged(thisObj, text): void {
    data = text;
  }

  updateProfile(): void {
    this.controllers.nameController.markAsTouched();
    this.controllers.fullDescriptionController.markAsTouched();
    this.controllers.shortDescriptionController.markAsTouched();
    this.controllers.subjectController.markAsTouched();
    this.controllers.registerCodeController.markAsTouched();
    this.controllers.postalCodeController.markAsTouched();
    if (
      !this.controllers.nameController.errors &&
      !this.controllers.fullDescriptionController.errors &&
      !this.controllers.shortDescriptionController.errors &&
      !this.controllers.subjectController.errors &&
      !this.controllers.registerCodeController.errors &&
      !this.controllers.postalCodeController.errors
    ) {
      try {
        this.profile.FullDescription.fa = this.controllers.fullDescriptionController.value;
      } catch {
        this.profile.FullDescription = {
          fa: this.controllers.fullDescriptionController.value,
        };
      }
      try {
        this.profile.FullName.fa = this.controllers.nameController.value;
      } catch {
        this.profile.FullName = {
          fa: this.controllers.nameController.value,
        };
      }
      try {
        this.profile.FullName.fa = this.controllers.nameController.value;
      } catch {
        this.profile.FullName = {
          fa: this.controllers.nameController.value,
        };
      }
      try {
        this.profile.FullProfile.fa = data;
      } catch {
        this.profile.FullProfile = {
          fa: data,
        };
      }
      try {
        this.profile.MetaDescription.fa = this.controllers.metaDescriptionController.value;
      } catch {
        this.profile.MetaDescription = {
          fa: this.controllers.metaDescriptionController.value,
        };
      }
      try {
        this.profile.MetaKeywords.fa = this.controllers.metaKeywordsController.value;
      } catch {
        this.profile.MetaKeywords = {
          fa: this.controllers.metaKeywordsController.value,
        };
      }
      try {
        this.profile.MetaTitle.fa = this.controllers.metaTitleController.value;
      } catch {
        this.profile.MetaTitle = {
          fa: this.controllers.metaTitleController.value,
        };
      }
      this.profile.PostalCode = this.controllers.postalCodeController.value;
      this.profile.RegisterCode = this.controllers.registerCodeController.value;
      try {
        this.profile.ShortDescription.fa = this.controllers.shortDescriptionController.value;
      } catch {
        this.profile.ShortDescription = {
          fa: this.controllers.shortDescriptionController.value,
        };
      }
      try {
        this.profile.Subject.fa = this.controllers.subjectController.value;
      } catch {
        this.profile.Subject = {
          fa: this.controllers.subjectController.value,
        };
      }
      const vendor = {
        FullDescription: this.profile.FullDescription,
        FullName: this.profile.FullName,
        FullProfile: this.profile.FullProfile,
        MetaDescription: this.profile.MetaDescription,
        MetaKeywords: this.profile.MetaKeywords,
        MetaTitle: this.profile.MetaTitle,
        PostalCode: this.profile.PostalCode,
        RegisterCode: this.profile.RegisterCode,
        ShortDescription: this.profile.ShortDescription,
        Subject: this.profile.Subject,
      };
      this.accountService.customUpdateProfile(vendor).subscribe((response: any) => {
        this.accountService.getProfile();
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
}
