import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationGuard} from "../core/service/role.guard";
import {RfqPageComponent} from "./rfq-page/rfq-page.component";
import {InquiryDetailsPageComponent} from "./inquiry-details-page/inquiry-details-page.component";

const routes: Routes = [
  {
    path: 'management',
    component: RfqPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
  {
    path: 'inquiry/details/:id',
    component: InquiryDetailsPageComponent,
    canActivate: [AuthorizationGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfqRoutingModule { }
