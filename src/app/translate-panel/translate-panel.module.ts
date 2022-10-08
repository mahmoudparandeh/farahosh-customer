import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePanelRoutingModule } from './translate-panel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileTranslationPageComponent } from './profile-translation-page/profile-translation-page.component';
import { ProductTranslationPageComponent } from './product-translation-page/product-translation-page.component';
import { AddressTranslationPageComponent } from './address-translation-page/address-translation-page.component';

@NgModule({
  declarations: [ProfileTranslationPageComponent, ProductTranslationPageComponent, AddressTranslationPageComponent],
  imports: [CommonModule, TranslatePanelRoutingModule, SharedModule],
})
export class TranslatePanelModule {}
