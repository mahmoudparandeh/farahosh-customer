import { Component, Input } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { AccountService } from '../../account.service';
import { FormControl, Validators } from '@angular/forms';
import { Profile } from '../profile.model';
import Swal from 'sweetalert2';
import { CertificateImage } from '../../iso.model';

@Component({
  selector: 'app-company-production-capacity',
  templateUrl: './company-production-capacity.component.html',
  styleUrls: ['./company-production-capacity.component.sass'],
})
export class CompanyProductionCapacityComponent {
  @Input() controllers;
  profileTitles;
  apiTitles;
  constructor(private sharedService: SharedService, private accountService: AccountService) {
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  createCapacity(): void {
    const capacity = {
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    };
    this.controllers.push(capacity);
  }

  deleteCapacity(index: number): void {
    this.controllers.splice(index, 1);
  }

  updateProfile(): void {
    const vendor = {
      ProductionCapacity: [],
    };
    for (const capacity of this.controllers) {
      if (
        capacity.from.value.trim() !== '' &&
        capacity.to.value.trim() !== '' &&
        capacity.unit.value.trim() !== '' &&
        capacity.time.value.trim() !== ''
      ) {
        vendor.ProductionCapacity.push({
          from: capacity.from.value,
          to: capacity.to.value,
          unit: capacity.unit.value,
          time: capacity.time.value,
        });
      }
    }
    this.accountService.customUpdateProfile(vendor).subscribe((response: any) => {
      this.accountService.getProfile();
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
  }
}
