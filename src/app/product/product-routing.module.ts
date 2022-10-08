import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { AuthorizationGuard } from '../core/service/role.guard';

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'edit-product/:id',
    component: AddProductComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'product-inventory/:id/:name',
    component: ProductInventoryComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'product-price/:id/:guid/:name',
    component: ProductPriceComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
