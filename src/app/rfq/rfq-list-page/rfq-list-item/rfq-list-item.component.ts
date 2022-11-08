import {Component, Input, OnInit} from '@angular/core';
import {RFQ} from "../../models/rfq.model";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-rfq-list-item',
  templateUrl: './rfq-list-item.component.html',
  styleUrls: ['./rfq-list-item.component.sass']
})
export class RfqListItemComponent implements OnInit {

  @Input() rfq: RFQ;
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

  ngOnInit(): void {
  }

}
