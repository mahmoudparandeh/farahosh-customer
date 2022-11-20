import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import {SharedModule} from "../shared/shared.module";
import { NotificationListPageComponent } from './notification-list-page/notification-list-page.component';
import { NotificationListItemComponent } from './notification-list-item/notification-list-item.component';
import { MessageDetailsPageComponent } from './message-details-page/message-details-page.component';


@NgModule({
  declarations: [
    NotificationListPageComponent,
    NotificationListItemComponent,
    MessageDetailsPageComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule
  ]
})
export class NotificationModule { }
