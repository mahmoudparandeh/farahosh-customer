import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Value } from '../../models/value.model';
import { SharedService } from '../../shared/shared.service';
import { AddressModel } from '../../address/address.model';
import { AddressService } from '../../address/address.service';
import { TranslationService } from '../translate-panel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-translation-page',
  templateUrl: './address-translation-page.component.html',
  styleUrls: ['./address-translation-page.component.sass'],
})
export class AddressTranslationPageComponent implements OnInit {
  addressTitles: any;
  apiTitles: any;
  languageTitles: any;
  fromLanguageController = new FormControl('');
  toLanguageController = new FormControl('');
  productName = '';
  productGuid = 0;
  currentFromLanguage = 'فارسی';
  currentToLanguage = 'انگلیسی';
  currentFromLanguageTitle = 'fa';
  currentToLanguageTitle = 'en';
  languages = this.translationService.translationLanguages;
  addresses: AddressModel[] = [];
  isLoading = true;
  addressTitleFromControllers: FormControl[] = [];
  addressReceiverFromControllers: FormControl[] = [];
  addressAddressFromControllers: FormControl[] = [];
  addressTitleToControllers: FormControl[] = [];
  addressReceiverToControllers: FormControl[] = [];
  addressAddressToControllers: FormControl[] = [];
  constructor(
    private sharedService: SharedService,
    private translationService: TranslationService,
    private addressService: AddressService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'addressTitle');
      this.sharedService.onLanguageChanges(language, 'languageTitle');
    });
    this.sharedService.addressTitles.subscribe(titles => {
      this.addressTitles = titles;
    });
    this.sharedService.languageTitles.subscribe(titles => {
      this.languageTitles = titles;
      this.languages[0].name = this.languageTitles.persian;
      this.languages[1].name = this.languageTitles.english;
      this.languages[2].name = this.languageTitles.arabic;
      this.languages[3].name = this.languageTitles.french;
      this.currentFromLanguage = this.languageTitles.persian;
      this.currentToLanguage = this.languageTitles.english;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.fromLanguageController.setValue(this.languages[0].value);
    this.toLanguageController.setValue(this.languages[1].value);
    this.addressService.getAddressList();
    this.addressService.addresses.subscribe(addresses => {
      this.isLoading = false;
      this.addresses = addresses;
      for (let i = 0; i < addresses.length; i++) {
        this.addressTitleFromControllers.push(new FormControl(''));
        this.addressReceiverFromControllers.push(new FormControl(''));
        this.addressAddressFromControllers.push(new FormControl(''));
        this.addressTitleToControllers.push(new FormControl(''));
        this.addressReceiverToControllers.push(new FormControl(''));
        this.addressAddressToControllers.push(new FormControl(''));
      }
      this.setFromControllers(addresses, this.currentFromLanguageTitle);
      this.setToControllers(addresses, this.currentToLanguageTitle);
    });
  }

  ngOnInit(): void {}

  setFromControllers(addresses, language): void {
    console.log(addresses);
    for (let i = 0; i < addresses.length; i++) {
      this.addressTitleFromControllers[i].setValue(
        addresses[i].Title[language] ? addresses[i].Title[language] ?? '' : ''
      );
      this.addressReceiverFromControllers[i].setValue(
        addresses[i].Receiver[language] ? addresses[i].Receiver[language] ?? '' : ''
      );
      this.addressAddressFromControllers[i].setValue(
        addresses[i].Address[language] ? addresses[i].Address[language] ?? '' : ''
      );
    }
  }

  setToControllers(addresses, language): void {
    console.log(addresses);
    for (let i = 0; i < addresses.length; i++) {
      this.addressTitleToControllers[i].setValue(
        addresses[i].Title[language] ? addresses[i].Title[language] ?? '' : ''
      );
      this.addressReceiverToControllers[i].setValue(
        addresses[i].Receiver[language] ? addresses[i].Receiver[language] ?? '' : ''
      );
      this.addressAddressToControllers[i].setValue(
        addresses[i].Address[language] ? addresses[i].Address[language] ?? '' : ''
      );
    }
  }

  onFromLanguageChanged(thisObj, data): void {
    thisObj.currentFromLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.setFromControllers(thisObj.addresses, data);
  }

  onToLanguageChanged(thisObj, data): void {
    thisObj.currentToLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.setToControllers(thisObj.addresses, data);
  }

  translate(index): void {
    if (this.addressTitleFromControllers[index].value && this.addressTitleFromControllers[index].value.trim() !== '') {
      this.translationService
        .translate(
          this.addressTitleFromControllers[index].value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.addressTitleToControllers[index].setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.addressReceiverFromControllers[index].value &&
      this.addressReceiverFromControllers[index].value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.addressReceiverFromControllers[index].value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.addressReceiverToControllers[index].setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.addressAddressFromControllers[index].value &&
      this.addressAddressFromControllers[index].value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.addressAddressFromControllers[index].value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.addressAddressToControllers[index].setValue(response.jsonResult.Data.translator);
        });
    }
  }

  onSubmit(index): void {
    const toLanguage = this.toLanguageController.value;
    const Language = this.fromLanguageController.value;
    for (let key in this.addresses[index].Title) {
      if (key === this.toLanguageController.value) {
        this.addresses[index].Title[key] = this.addressTitleToControllers[index].value;
      } else {
        this.addresses[index].Title[toLanguage] = this.addressTitleToControllers[index].value;
      }
      if (key === this.fromLanguageController.value) {
        this.addresses[index].Title[key] = this.addressTitleFromControllers[index].value;
      } else {
        this.addresses[index].Title[Language] = this.addressTitleFromControllers[index].value;
      }
    }
    for (let key in this.addresses[index].Receiver) {
      if (key === this.toLanguageController.value) {
        this.addresses[index].Receiver[key] = this.addressReceiverToControllers[index].value;
      } else {
        this.addresses[index].Receiver[toLanguage] = this.addressReceiverToControllers[index].value;
      }
      if (key === this.fromLanguageController.value) {
        this.addresses[index].Receiver[key] = this.addressReceiverFromControllers[index].value;
      } else {
        this.addresses[index].Receiver[Language] = this.addressReceiverFromControllers[index].value;
      }
    }
    for (let key in this.addresses[index].Address) {
      if (key === this.toLanguageController.value) {
        this.addresses[index].Address[key] = this.addressAddressToControllers[index].value;
      } else {
        this.addresses[index].Address[toLanguage] = this.addressAddressToControllers[index].value;
      }
      if (key === this.fromLanguageController.value) {
        this.addresses[index].Address[key] = this.addressAddressFromControllers[index].value;
      } else {
        this.addresses[index].Address[Language] = this.addressAddressFromControllers[index].value;
      }
    }
    const address = {
      Title: this.addresses[index].Title,
      Receiver: this.addresses[index].Receiver,
      Address: this.addresses[index].Address,
    };
    this.addressService.updateAddress(address, this.addresses[index].AddressId).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
  }
}
