import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {FormControl} from "@angular/forms";
import {Value} from "../../models/value.model";
import {SharedService} from "../../shared/shared.service";
import {ActivatedRoute} from "@angular/router";
import {RFQService} from "../rfq.service";
import {RFQ} from "../models/rfq.model";
import {environment} from "../../../environments/environment";
import {Utility} from "../../shared/helper/util";
import {VendorRfq} from "../models/vendor.rfq.model";

@Component({
  selector: 'app-rfq-details-page',
  templateUrl: './rfq-details-page.component.html',
  styleUrls: ['./rfq-details-page.component.sass']
})
export class RfqDetailsPageComponent {
  rfqTitles: any;
  apiTitles: any;
  rfq: RFQ;
  vendors: VendorRfq[] = [];
  language = 'fa';
  currentPage = 1;
  pageSize = 10;
  total = 1;
  searchNameController = new FormControl('');
  searchRegisterCodeController = new FormControl('');
  selectedVendors: Value[] = [];
  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private rfqService: RFQService
  ) {
    this.rfqService.selectedVendors.subscribe(selectedVendors => {
      this.selectedVendors = selectedVendors;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'rfqTitle');
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.rfqService.vendors.subscribe(vendors => {
      this.vendors = vendors;
    });
    this.rfqService.totalVendors.subscribe(total => {
      this.total = total;
    });
    this.rfqService.getRFQ(this.activatedRoute.snapshot.params.id).subscribe((response: any) => {
      this.rfq = response.jsonResult.Data.Details;
      if (+this.rfq.Status === 1) {
        this.rfqService.getAllVendors(
          this.currentPage,
          this.searchNameController.value,
          this.searchRegisterCodeController.value
        );
      }
      this.rfq.Attachments = response.jsonResult.Data.Pictures.filter(p => p.IsThumbnail === false);
      for (const picture of this.rfq.Attachments) {
        picture.Path = environment.apiUrl + picture.Path;
      }
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
  }

  onApproveRFQ(): void {
    this.rfqService.acceptRFQ(this.rfq.Id.toString()).subscribe(_ => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
    this.rfq.Status = '1';
    this.rfqService.getAllVendors(
      this.currentPage,
      this.searchNameController.value,
      this.searchRegisterCodeController.value
    );
  }

  onRejectRFQ(): void {
    this.rfqService.rejectRFQ(this.rfq.Id.toString()).subscribe(_ => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
    this.rfq.Status = '2';
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.rfqService.getAllVendors(
      this.currentPage,
      this.searchNameController.value,
      this.searchRegisterCodeController.value
    );
  }

  onSearch(): void {
    this.currentPage = 1;
    this.rfqService.getAllVendors(
      this.currentPage,
      this.searchNameController.value,
      this.searchRegisterCodeController.value
    );
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  removeSelectedVendor(index): void {
    this.rfqService.selectedVendorsList.splice(index, 1);
    this.rfqService.selectedVendors.next(this.rfqService.selectedVendorsList);
  }
  sendInvoices(): void {
    if (this.selectedVendors.length > 0) {
      const vendorIds = [];
      for (const vendor of this.selectedVendors) {
        vendorIds.push(vendor.value);
      }
      this.rfqService.sendInquiries(this.rfq.Id.toString(), vendorIds.join(',')).subscribe(_ => {
        Swal.fire({
          icon: 'success',
          text: this.apiTitles.create,
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: this.rfqTitles.at_least_one_vendor,
      });
    }
  }

}
