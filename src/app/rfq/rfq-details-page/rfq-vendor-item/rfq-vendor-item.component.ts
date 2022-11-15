import {Component, Input, OnInit} from '@angular/core';
import {VendorRfq} from "../../models/vendor.rfq.model";
import {SharedService} from "../../../shared/shared.service";
import {RFQService} from "../../rfq.service";
import {Value} from "../../../models/value.model";

@Component({
  selector: 'app-rfq-vendor-item',
  templateUrl: './rfq-vendor-item.component.html',
  styleUrls: ['./rfq-vendor-item.component.sass']
})
export class RfqVendorItemComponent implements OnInit {

  @Input() vendor: VendorRfq;
  language = 'fa';
  rfqTitles: any;
  constructor(private sharedService: SharedService, private rfqService: RFQService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
  }

  onVendorSelected(event): void {
    const index = this.rfqService.selectedVendorsList.findIndex(v => v.value === this.vendor.Id);
    if (index !== -1) {
      if (!this.vendor.isSelected.value) {
        this.rfqService.selectedVendorsList.splice(index, 1);
        this.rfqService.selectedVendors.next(this.rfqService.selectedVendorsList);
      }
    } else if (this.vendor.isSelected.value) {
      this.rfqService.selectedVendorsList.push({
        value: this.vendor.Id,
        name: this.vendor.Name[this.language],
      });
      this.rfqService.selectedVendors.next(this.rfqService.selectedVendorsList);
    }
  }

  ngOnInit(): void {
  }

}
