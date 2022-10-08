import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: ':lang/profile',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
  {
    path: ':lang/file-manager',
    loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule),
  },
  {
    path: ':lang/address',
    loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
  },
  {
    path: ':lang/warehouse',
    loadChildren: () => import('./ware-house/ware-house.module').then(m => m.WareHouseModule),
  },
  {
    path: ':lang/ticket-list',
    loadChildren: () => import('./ticket-list/ticket-list.module').then(m => m.TicketListModule),
  },
  {
    path: ':lang/rfqs',
    loadChildren: () => import('./rfq/rfq.module').then(m => m.RfqModule),
  },
  {
    path: ':lang/translation',
    loadChildren: () => import('./translate-panel/translate-panel.module').then(m => m.TranslatePanelModule),
  },
  {
    path: ':lang/product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
