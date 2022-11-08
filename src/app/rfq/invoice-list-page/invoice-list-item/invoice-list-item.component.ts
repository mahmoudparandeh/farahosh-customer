import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "../../models/invoice.model";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-invoice-list-item',
  templateUrl: './invoice-list-item.component.html',
  styleUrls: ['./invoice-list-item.component.sass']
})
export class InvoiceListItemComponent implements OnInit {

  @Input() invoice: Invoice;
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

  getStatus(status: number): string {
    switch (status) {
      case 0: { return "ارسال توسط تأمین کننده"; }
      case 1: { return "دریافت توسط فرهوش"; }
      case 2: { return "ارسال توسط فرهوش"; }
      case 3: { return "دریافت توسط مشتری"; }
    }
  }

  ngOnInit(): void {
  }

}
