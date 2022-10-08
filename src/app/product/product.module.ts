import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { StepperComponent } from './add-product/stepper/stepper.component';
import { AddProductStep1Component } from './add-product/add-product-step1/add-product-step1.component';
import { AddProductStep2Component } from './add-product/add-product-step2/add-product-step2.component';
import { AddProductStep3Component } from './add-product/add-product-step3/add-product-step3.component';
import { ProductInventoryItemComponent } from './product-inventory/product-inventory-item/product-inventory-item.component';
import { AddProductStep4Component } from './add-product/add-product-step4/add-product-step4.component';
import { AddProductStep5Component } from './add-product/add-product-step5/add-product-step5.component';
import { AddProductStep6Component } from './add-product/add-product-step6/add-product-step6.component';
import { AddProductFinalComponent } from './add-product/add-product-final/add-product-final.component';
import { ProductPriceItemComponent } from './product-price/product-price-item/product-price-item.component';
import { AccountModule } from '../account/account.module';

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductPriceComponent,
    ProductInventoryComponent,
    ProductItemComponent,
    StepperComponent,
    AddProductStep1Component,
    AddProductStep2Component,
    AddProductStep3Component,
    ProductInventoryItemComponent,
    AddProductStep4Component,
    AddProductStep5Component,
    AddProductStep6Component,
    AddProductFinalComponent,
    ProductPriceItemComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, SharedModule, AccountModule],
})
export class ProductModule {}
