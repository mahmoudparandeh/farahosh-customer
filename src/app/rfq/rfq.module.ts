import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfqRoutingModule } from './rfq-routing.module';
import { RfqPageComponent } from './rfq-page/rfq-page.component';
import { InquiryListPageComponent } from './inquiry-list-page/inquiry-list-page.component';
import {InquiryListItemComponent} from "./inquiry-list-page/inquiry-list-item/inquiry-list-item.component";
import {SharedModule} from "../shared/shared.module";
import {InquiryDetailsPageComponent} from "./inquiry-details-page/inquiry-details-page.component";
import {RfqCategoryModalComponent} from "./rfq-category-modal/rfq-category-modal.component";
import { RfqDetailsPageComponent } from './rfq-details-page/rfq-details-page.component';
import { InvoiceListPageComponent } from './invoice-list-page/invoice-list-page.component';
import { InvoiceDetailsPageComponent } from './invoice-details-page/invoice-details-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RfqListPageComponent } from './rfq-list-page/rfq-list-page.component';
import { RfqListItemComponent } from './rfq-list-page/rfq-list-item/rfq-list-item.component';
import { InvoiceListItemComponent } from './invoice-list-page/invoice-list-item/invoice-list-item.component';
import { RfqVendorItemComponent } from './rfq-details-page/rfq-vendor-item/rfq-vendor-item.component';


@NgModule({
  declarations: [
    RfqPageComponent,
    InquiryListPageComponent,
    InquiryListItemComponent,
    InquiryDetailsPageComponent,
    RfqCategoryModalComponent,
    RfqDetailsPageComponent,
    InvoiceListPageComponent,
    InvoiceDetailsPageComponent,
    ChatPageComponent,
    RfqListPageComponent,
    RfqListItemComponent,
    InvoiceListItemComponent,
    RfqVendorItemComponent,
  ],
  imports: [
    CommonModule,
    RfqRoutingModule,
    SharedModule
  ]
})
export class RfqModule { }
