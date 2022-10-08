import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketChatComponent } from './ticket-chat/ticket-chat.component';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
  },
  {
    path: ':id/:name',
    component: TicketChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketListRoutingModule {}
