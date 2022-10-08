import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { ProductCapacityItemComponent } from './product-capacity-item/product-capacity-item.component';
import { CompanyOverviewComponent } from './profile/company-overview/company-overview.component';
import { CompanyHistoryComponent } from './profile/company-history/company-history.component';
import { CompanyCertificatesComponent } from './profile/company-certificates/company-certificates.component';
import { CompanyFaqComponent } from './profile/company-faq/company-faq.component';
import { CompanyProductionCapacityComponent } from './profile/company-production-capacity/company-production-capacity.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FaqItemComponent,
    ProductCapacityItemComponent,
    CompanyOverviewComponent,
    CompanyHistoryComponent,
    CompanyCertificatesComponent,
    CompanyFaqComponent,
    CompanyProductionCapacityComponent,
  ],
  imports: [CommonModule, SharedModule, AccountRoutingModule],
  exports: [FaqItemComponent, ProductCapacityItemComponent, CompanyCertificatesComponent],
})
export class AccountModule {}
