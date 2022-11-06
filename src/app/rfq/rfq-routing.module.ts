import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationGuard} from "../core/service/role.guard";
import {RfqPageComponent} from "./rfq-page/rfq-page.component";
import {InquiryDetailsPageComponent} from "./inquiry-details-page/inquiry-details-page.component";
import {RfqDetailsPageComponent} from "./rfq-details-page/rfq-details-page.component";
import {ChatPageComponent} from "./chat-page/chat-page.component";
import {InvoiceDetailsPageComponent} from "./invoice-details-page/invoice-details-page.component";

const routes: Routes = [
  // {
  //   path: 'management',
  //   component: RfqPageComponent,
  //   canActivate: [AuthorizationGuard],
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'inquiry/details/:id',
  //   component: InquiryDetailsPageComponent,
  //   canActivate: [AuthorizationGuard],
  //   pathMatch: 'full',
  // },

  {
    path: 'management',
    component: RfqPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'rfq/details/:id',
    component: RfqDetailsPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'invoice/details/:id',
    component: InvoiceDetailsPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  // {
  //   path: 'inquiry/details/:id',
  //   component: InquiryDetailsPageComponent,
  //   canActivate: [AuthorizationGuard],
  //   pathMatch: 'full',
  // },
  {
    path: 'chat/:id/:ticketId',
    component: ChatPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfqRoutingModule { }
