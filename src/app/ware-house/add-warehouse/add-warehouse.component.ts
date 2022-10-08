import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { AddressService } from '../../address/address.service';
import { AddressModel } from '../../address/address.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.sass'],
})
export class AddWarehouseComponent implements OnInit {
  language = 'fa';
  warehouseTitles: any;
  apiTitles: any;
  alertTitles: any;
  id = 0;
  addressesSelect: any[] = [];
  addresses: AddressModel[] = [];
  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  address = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  warehouseForm = this.formBuilder.group({
    AddressId: this.address,
    Name: this.name,
  });

  constructor(
    private sharedService: SharedService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
    private router: Router
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'warehouseTitle');
      this.sharedService.onLanguageChanges(language, 'alertTitle');
      this.sharedService.onLanguageChanges(language, 'apiTitle');
    });
    this.sharedService.warehouseTitles.subscribe(titles => {
      this.warehouseTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.addressService.getAddressList();
    this.addressService.addresses.subscribe((addresses: AddressModel[]) => {
      this.addresses = addresses;
      for (const address of addresses) {
        this.addressesSelect.push({
          name: address.Address[this.language],
          value: address.AddressId,
        });
      }
      // for(let i = 0 ; i < this.addresses.length ; i++) {
      //   const item = { name: this.addresses[i].Address[this.language] , value: this.addresses[i].AddressId };
      //   this.addressesSelect.push(item);
      // }
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.getWarehouse();
    }
  }
  getWarehouse() {
    this.warehouseService.getWarehouse(this.id).subscribe((response: any) => {
      this.address.setValue(response.jsonResult.Data.warehouse.AddressId);
      this.name.setValue(response.jsonResult.Data.warehouse.Name.fa);
    });
  }

  submit() {
    this.warehouseForm.markAllAsTouched();
    if (!this.address.errors && !this.name.errors) {
      const warehouse = {
        AddressId: this.address.value,
        Name: { fa: this.name.value },
      };
      if (this.id) {
        this.warehouseService.updateWarehouse(warehouse, this.id).subscribe((response: any) => {
          Swal.fire({
            icon: 'success',
            text: this.apiTitles.update,
          });
          this.router.navigate([this.language, 'warehouse']);
        });
      } else {
        this.warehouseService.createWarehouse(warehouse).subscribe((response: any) => {
          Swal.fire({
            icon: 'success',
            text: this.apiTitles.create,
          });
          this.router.navigate([this.language, 'warehouse']);
        });
      }
    } else {
      let error = '';
      if (this.address.errors) {
        error += this.warehouseTitles.Address_required + '<br>';
      }
      if (this.name.errors) {
        error += this.warehouseTitles.Name_required + '<br>';
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
        this.warehouseForm.reset();
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
        this.warehouseForm.reset();
        this.router.navigate(['/' + this.language, 'warehouse']).then();
      }
    });
  }
}
