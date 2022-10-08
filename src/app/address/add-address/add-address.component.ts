import { Component, OnInit } from '@angular/core';
import { AutocompleteValue } from '../../core/models/autoComplete.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../address.service';
import { Utility } from '../../shared/helper/util';
import Swal from 'sweetalert2';
import {AddressModel} from "../address.model";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.sass'],
})
export class AddAddressComponent implements OnInit {
  locations: AutocompleteValue[] = [];
  addressModel: AddressModel;
  geoLocationId = 0;
  language = 'fa';
  addressTitles: any;
  id = 0;
  apiTitles: any;
  alertTitles: any;

  geoLocation = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });
  zipPostalCode = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern('\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b')],
  });
  mobileNumbers = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });
  mobileCountry = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  phoneNumbers = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });
  phoneCountry = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  faxNumbers = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });
  faxCountry = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  title = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  receiver = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  address = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  published = new FormControl(false, {
    nonNullable: true,
  });
  titleEnglish = new FormControl('');
  receiverEnglish = new FormControl('');
  addressEnglish = new FormControl('');

  addressForm = this.formBuilder.group({
    geoLocation: this.geoLocation,
    zipPostalCode: this.zipPostalCode,
    mobileNumbers: this.mobileNumbers,
    phoneNumbers: this.phoneNumbers,
    faxNumbers: this.faxNumbers,
    mobileNumbersCountry: this.mobileCountry,
    phoneNumbersCountry: this.phoneCountry,
    faxNumbersCountry: this.faxCountry,
    title: this.title,
    receiver: this.receiver,
    address: this.address,
    titleEnglish: this.titleEnglish,
    receiverEnglish: this.receiverEnglish,
    addressEnglish: this.addressEnglish,
    published: this.published,
  });

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'addressTitle');
      this.sharedService.onLanguageChanges(language, 'alertTitle');
    });
    this.sharedService.addressTitles.subscribe(titles => {
      this.addressTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.geoLocation.valueChanges.subscribe(data => {
      if (data.length > 1 && this.geoLocationId === 0) {
        this.getGeoLocation();
      } else {
        this.geoLocationId = 0;
      }
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.getAddress();
    }
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  getGeoLocation(): void {
    this.sharedService.getGeoLocation(this.geoLocation.value).subscribe((response: any) => {
      this.locations = [];
      for (const geoLocation of response.jsonResult.Data.geolocation) {
        let country = '';
        let province = '';
        let city = '';
        for (const element of geoLocation.Name) {
          switch (element.Type) {
            case 'country': {
              country += element[this.language];
              break;
            }
            case 'Province': {
              province += element[this.language];
              break;
            }
            case 'City': {
              city += element[this.language];
              break;
            }
          }
        }
        const location = country + (province !== '' ? ', ' : '') + province + (city !== '' ? ', ' : '') + city;
        this.locations.push({
          value: geoLocation.Id,
          name: location,
        });
      }
    });
  }

  onSelectGeolocation(object: AddAddressComponent, event: any): void {
    object.geoLocationId = event;
  }

  onFocusGeoLocation() {
    this.geoLocation.setValue('', {
      emitEvent: false,
    });
  }

  submit() {
    this.addressForm.markAllAsTouched();
    if (
      !this.geoLocation.errors &&
      !this.address.errors &&
      !this.receiver.errors &&
      !this.title.errors &&
      !this.phoneNumbers.errors &&
      !this.phoneCountry.errors &&
      this.phoneNumbers.value.length === 10 &&
      !this.faxNumbers.errors &&
      !this.faxCountry.errors &&
      this.faxNumbers.value.length === 10 &&
      !this.mobileNumbers.errors &&
      !this.mobileCountry.errors &&
      this.mobileNumbers.value.length === 10 &&
      !this.zipPostalCode.errors
    ) {
      let published = 0;
      if (this.addressForm.value.published) {
        published = 1;
      } else {
        published = 0;
      }

      const address = {
        GeoLocationId: this.geoLocationId,
        Title: { fa: this.title.value },
        Receiver: { fa: this.receiver.value },
        Address: { fa: this.address.value },
        ZipPostalCode: this.zipPostalCode.value,
        MobileNumbers: this.mobileCountry.value + '-' + this.mobileNumbers.value,
        PhoneNumbers: this.phoneCountry.value + '-' + this.phoneNumbers.value,
        FaxNumbers: this.faxCountry.value + '-' + this.faxNumbers.value,
        Published: this.published.value,
        DisplayOrder: published,
      };
      if (this.id) {
        this.addressModel.Title.fa = this.title.value;
        this.addressModel.Receiver.fa = this.receiver.value;
        this.addressModel.Address.fa = this.address.value;
        address.Title = this.addressModel.Title;
        address.Receiver = this.addressModel.Receiver;
        address.Address = this.addressModel.Address;
        this.addressService.updateAddress(address, this.id).subscribe((response: any) => {
          Swal.fire({
            icon: 'success',
            text: this.apiTitles.update,
          });
          this.router.navigate([this.language, 'address']);
        });
      } else {
        this.addressService.createAddress(address).subscribe((response: any) => {
          Swal.fire({
            icon: 'success',
            text: this.apiTitles.create,
          });
          this.router.navigate([this.language, 'address']);
        });
      }
    } else {
      let error = '';
      if (this.geoLocation.errors) {
        error += this.addressTitles.GeoLocation_required + '<br>';
      }
      if (this.address.errors) {
        error += this.addressTitles.Address_required + '<br>';
      }
      if (this.receiver.errors) {
        error += this.addressTitles.Receiver_required + '<br>';
      }
      if (this.title.errors) {
        error += this.addressTitles.Title_required + '<br>';
      }
      if (this.phoneNumbers.errors || this.phoneNumbers.value.length !== 10) {
        error += this.addressTitles.PhoneNumbers_invalid + '<br>';
      }
      if (this.phoneCountry.errors) {
        error += this.addressTitles.country_code_validation + '<br>';
      }
      if (this.faxNumbers.errors || this.faxNumbers.value.length !== 10) {
        error += this.addressTitles.FaxNumbers_invalid + '<br>';
      }
      if (this.faxCountry.errors) {
        error += this.addressTitles.country_code_validation + '<br>';
      }
      if (this.mobileNumbers.errors || this.mobileNumbers.value.length !== 10) {
        error += this.addressTitles.MobileNumbers_invalid + '<br>';
      }
      if (this.mobileCountry.errors) {
        error += this.addressTitles.country_code_validation + '<br>';
      }
      if (this.zipPostalCode.errors) {
        error += this.addressTitles.ZipPostalCode_invalid + '<br>';
      }
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: error,
      }).then();
    }
  }

  reset(): void {
    Swal.fire({
      title: this.alertTitles.are_you_sure,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_reset_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.mobileCountry = new FormControl('');
        this.faxCountry = new FormControl('');
        this.phoneCountry = new FormControl('');
        this.addressForm.reset();
      }
    });
  }

  cancel(): void {
    Swal.fire({
      title: this.alertTitles.are_you_sure,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_back_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.addressForm.reset();
        this.router.navigate(['/' + this.language, 'address']).then();
      }
    });
  }

  getAddress(): void {
    this.addressService.getAddress(this.id).subscribe((response: any) => {
      this.addressModel = response.jsonResult.Data.address;
      this.title.setValue(response.jsonResult.Data.address.Title.fa);
      this.faxNumbers.setValue(response.jsonResult.Data.address.FaxNumbers.split('-')[1]);
      // this.faxNumbers.setValue(response.jsonResult.Data.address.FaxNumbers);
      this.phoneNumbers.setValue(response.jsonResult.Data.address.PhoneNumbers.split('-')[1]);
      // this.phoneNumbers.setValue(response.jsonResult.Data.address.PhoneNumbers);
      this.mobileNumbers.setValue(response.jsonResult.Data.address.MobileNumbers.split('-')[1]);
      // this.mobileNumbers.setValue(response.jsonResult.Data.address.MobileNumbers);
      this.faxCountry.setValue(response.jsonResult.Data.address.FaxNumbers.split('-')[0]);
      // this.faxCountry.setValue(response.jsonResult.Data.address.FaxNumbers);
      this.phoneCountry.setValue(response.jsonResult.Data.address.PhoneNumbers.split('-')[0]);
      // this.phoneCountry.setValue(response.jsonResult.Data.address.PhoneNumbers);
      this.mobileCountry.setValue(response.jsonResult.Data.address.MobileNumbers.split('-')[0]);
      // this.mobileCountry.setValue(response.jsonResult.Data.address.MobileNumbers);
      this.titleEnglish.setValue(response.jsonResult.Data.address.Title['en']);
      this.zipPostalCode.setValue(response.jsonResult.Data.address.ZipPostalCode);
      this.receiver.setValue(response.jsonResult.Data.address.Receiver['fa']);
      this.receiverEnglish.setValue(response.jsonResult.Data.address.Receiver['en']);
      this.address.setValue(response.jsonResult.Data.address.Address['fa']);
      this.addressEnglish.setValue(response.jsonResult.Data.address.Address['en']);
      this.geoLocationId = response.jsonResult.Data.address.GeoLocationId;
      this.geoLocation.setValue(response.jsonResult.Data.address.GeoLocationName[this.language], {
        emitEvent: false,
      });
      this.published.setValue(response.jsonResult.Data.address.Published);
    });
  }
}
