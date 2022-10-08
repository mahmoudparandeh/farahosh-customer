import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SharedModule } from '../shared/shared.module';
import { AddressItemComponent } from './address-item/address-item.component';

@NgModule({
  declarations: [AddressesListComponent, AddAddressComponent, AddressItemComponent],
  imports: [CommonModule, AddressRoutingModule, SharedModule],
})
export class AddressModule {}
