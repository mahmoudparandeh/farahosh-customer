import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AuthorizationGuard } from '../core/service/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AddressesListComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'add-address',
    component: AddAddressComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'edit-address/:id',
    component: AddAddressComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressRoutingModule {}
