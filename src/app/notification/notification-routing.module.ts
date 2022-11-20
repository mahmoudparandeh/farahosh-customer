import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotificationListPageComponent} from "./notification-list-page/notification-list-page.component";
import {AuthorizationGuard} from "../core/service/role.guard";
import {MessageDetailsPageComponent} from "./message-details-page/message-details-page.component";

const routes: Routes = [
  {
    path: 'list',
    component: NotificationListPageComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'details/:id',
    component: MessageDetailsPageComponent,
    canActivate: [AuthorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
