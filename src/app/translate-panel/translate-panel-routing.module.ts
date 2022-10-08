import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../core/service/role.guard';
import { ProfileTranslationPageComponent } from './profile-translation-page/profile-translation-page.component';
import { ProductTranslationPageComponent } from './product-translation-page/product-translation-page.component';
import { AddressTranslationPageComponent } from './address-translation-page/address-translation-page.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileTranslationPageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'product',
    component: ProductTranslationPageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'address',
    component: AddressTranslationPageComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslatePanelRoutingModule {}
