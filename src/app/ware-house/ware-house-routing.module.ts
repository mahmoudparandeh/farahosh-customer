import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorWareHouseComponent } from './vendor-ware-house/vendor-ware-house.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { AuthorizationGuard } from '../core/service/role.guard';

const routes: Routes = [
  {
    path: '',
    component: VendorWareHouseComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'add-warehouse',
    component: AddWarehouseComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'edit-warehouse/:id',
    component: AddWarehouseComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WareHouseRoutingModule {}
