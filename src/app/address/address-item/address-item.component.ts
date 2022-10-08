import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { AddressModel } from '../address.model';
import { AddressService } from '../address.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.sass'],
})
export class AddressItemComponent {
  @Input() address!: AddressModel;
  language = 'fa';
  apiTitles: any;
  alertTitles: any;
  addressListTitles: any;
  constructor(private sharedService: SharedService, private addressService: AddressService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.sharedService.addressListTitles.subscribe(titles => {
      this.addressListTitles = titles;
    });
  }

  onDelete(): void {
    Swal.fire({
      title: this.alertTitles.are_you_sure,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_delete_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.addressService.deleteAddress(this.address.AddressId).subscribe((response: any) => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: this.apiTitles.delete,
          });
          this.addressService.getAddressList();
        });
      }
    });
  }
}
