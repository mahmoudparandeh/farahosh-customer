import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfqRoutingModule } from './rfq-routing.module';
import { RfqPageComponent } from './rfq-page/rfq-page.component';
import { InquiryListPageComponent } from './inquiry-list-page/inquiry-list-page.component';
import {InquiryListItemComponent} from "./inquiry-list-page/inquiry-list-item/inquiry-list-item.component";
import {SharedModule} from "../shared/shared.module";
import {InquiryDetailsPageComponent} from "./inquiry-details-page/inquiry-details-page.component";
import {RfqCategoryModalComponent} from "./rfq-category-modal/rfq-category-modal.component";


@NgModule({
  declarations: [
    RfqPageComponent,
    InquiryListPageComponent,
    InquiryListItemComponent,
    InquiryDetailsPageComponent,
    RfqCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    RfqRoutingModule,
    SharedModule
  ]
})
export class RfqModule { }
