import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketListRoutingModule } from './ticket-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { TicketChatComponent } from './ticket-chat/ticket-chat.component';

@NgModule({
  declarations: [TicketListComponent, TicketItemComponent, TicketChatComponent],
  imports: [CommonModule, TicketListRoutingModule, SharedModule],
})
export class TicketListModule {}
