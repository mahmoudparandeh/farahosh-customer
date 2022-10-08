import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Inquiry } from '../../models/inquiry.model';

@Component({
  selector: 'app-inquiry-list-item',
  templateUrl: './inquiry-list-item.component.html',
  styleUrls: ['./inquiry-list-item.component.sass'],
})
export class InquiryListItemComponent implements OnInit {
  @Input() inquiry: Inquiry;
  @Input() index: number;
  language = 'fa';
  rfqTitles: any;
  constructor(private sharedService: SharedService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
  }

  ngOnInit(): void {}
}
