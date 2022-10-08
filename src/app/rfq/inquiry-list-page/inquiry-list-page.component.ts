import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Inquiry } from '../models/inquiry.model';
import { RFQService } from '../rfq.service';

@Component({
  selector: 'app-inquiry-list-page',
  templateUrl: './inquiry-list-page.component.html',
  styleUrls: ['./inquiry-list-page.component.sass'],
})
export class InquiryListPageComponent {
  rfqTitles: any;
  inquiries: Inquiry[] = [];
  currentPage = 1;
  pageSize = 10;
  total = 1;
  constructor(private sharedService: SharedService, private rfqService: RFQService) {
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
    this.rfqService.getInquires(this.currentPage);
    this.rfqService.inquires.subscribe(inquiries => {
      this.inquiries = inquiries;
    });
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.rfqService.getInquires(this.currentPage);
  }
}
