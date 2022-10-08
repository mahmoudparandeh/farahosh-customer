import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WareHouseRoutingModule } from './ware-house-routing.module';
import { VendorWareHouseComponent } from './vendor-ware-house/vendor-ware-house.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { SharedModule } from '../shared/shared.module';
import { WarehouseItemComponent } from './warehouse-item/warehouse-item.component';

@NgModule({
  declarations: [VendorWareHouseComponent, AddWarehouseComponent, WarehouseItemComponent],
  imports: [CommonModule, WareHouseRoutingModule, SharedModule],
})
export class WareHouseModule {}
