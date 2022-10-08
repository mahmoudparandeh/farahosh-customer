import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { AddressService } from '../address.service';
import { AddressModel } from '../address.model';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.sass'],
})
export class AddressesListComponent {
  language = 'fa';
  addressList: AddressModel[];
  addressListTitles: any;

  currentPage = 1;
  total = 1;
  pageSize = 12;

  constructor(private sharedService: SharedService, private addressService: AddressService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'addressListTitle');
      this.getAddressList();
    });
    this.sharedService.addressListTitles.subscribe(titles => {
      this.addressListTitles = titles;
    });
    this.addressService.addresses.subscribe((addresses: AddressModel[]) => {
      this.addressList = addresses;
    });
  }

  getAddressList() {
    this.addressService.getAddressList();
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getAddressList();
  }
}
