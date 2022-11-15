import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormControl} from "@angular/forms";
import {Value} from "../../models/value.model";
import {InvoiceDetails} from "../models/invoice.details.model";
import {Currency} from "../models/currency.model";
import {ReplaySubject} from "rxjs";
import {SharedService} from "../../shared/shared.service";
import {RFQService} from "../rfq.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Utility} from "../../shared/helper/util";

@Component({
  selector: 'app-invoice-details-page',
  templateUrl: './invoice-details-page.component.html',
  styleUrls: ['./invoice-details-page.component.sass']
})
export class InvoiceDetailsPageComponent implements OnInit {

  rfqTitles: any;
  apiTitles: any;
  language = 'fa';
  attachments = [];
  productCertificateIds = [];
  businessCertificateIds = [];
  logisticPriceController = new FormControl('');
  insurancePriceController = new FormControl('');
  customsPriceController = new FormControl('');
  taxPriceController = new FormControl('');
  logisticDetailController = new FormControl('');
  insuranceDetailController = new FormControl('');
  customsDetailController = new FormControl('');
  taxDetailController = new FormControl('');
  logisticCurrencyController = new FormControl(1);
  insuranceCurrencyController = new FormControl(1);
  customsCurrencyController = new FormControl(1);
  taxCurrencyController = new FormControl(1);
  invoiceDetail: InvoiceDetails;
  currenciesValue: Value[] = [
    {
      name: 'USD',
      value: 1,
    },
    {
      name: 'Rial',
      value: 2,
    },
  ];
  currencies: Currency[] = [];
  apiCalls = new ReplaySubject<number>(1);
  apiCallsCount = 4;
  logisticId = 0;
  insuranceId = 0;
  taxId = 0;
  customsId = 0;

  constructor(
    private sharedService: SharedService,
    private rfqService: RFQService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sharedService.apiTitles.subscribe((titles) => {
      this.apiTitles = titles;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'rfqTitle');
      this.currenciesValue = [];
      for (const currency of this.currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.language],
        });
      }
    });
    this.apiCalls.next(this.apiCallsCount);
    this.apiCalls.subscribe((value) => {
      if (value === 0) {
        const data = {
          ticketinvoice: {
            Id: this.invoiceDetail.InvoiceDetails.Id,
            InqueryId: this.invoiceDetail.InvoiceDetails.InqueryId,
            InvProductId: this.invoiceDetail.InvoiceDetails.InvProductId,
            ProductName: this.invoiceDetail.InvoiceDetails.InvProductName,
            CategoryId: this.invoiceDetail.InvoiceDetails.InvCategoryId,
            InvQuantity: this.invoiceDetail.InvoiceDetails.InvQuantity,
            InvUnitId: this.invoiceDetail.InvoiceDetails.InvUnitId,
            InvPrice: this.invoiceDetail.InvoiceDetails.InvPrice,
            InvCurrencyId: this.invoiceDetail.InvoiceDetails.InvCurrencyId,
            InvIncotermId: this.invoiceDetail.InvoiceDetails.InvIncotermId,
            InvDetails: this.invoiceDetail.InvoiceDetails.InvDetails,
            InvShoppingMethodId: this.invoiceDetail.InvoiceDetails.InvShoppingMethodId,
            InvDestinationId: this.invoiceDetail.InvoiceDetails.InvDestinationId,
            InvPort: this.invoiceDetail.InvoiceDetails.InvPort,
            InvLeadTime: this.invoiceDetail.InvoiceDetails.InvLeadTime,
            InvPaymentMethodId: this.invoiceDetail.InvoiceDetails.InvPaymentMethodId,
            TicketLogisticId: this.logisticId,
            TicketCustomsId: this.customsId,
            TicketInsurenceId: this.insuranceId,
            TicketTaxId: this.taxId,
            CreatedOnUtc: this.invoiceDetail.InvoiceDetails.CreatedOnUtc,
          }
        };
        this.rfqService.sendInvoiceToCustomer(data).subscribe((_) => {
          Swal.fire({
            icon: "success",
            text: this.apiTitles.create,
          });
        });
      }
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
    this.rfqService.getCurrencies();
    this.rfqService.currencies.subscribe((currencies) => {
      this.currenciesValue = [];
      this.currencies = currencies;
      for (const currency of currencies) {
        this.currenciesValue.push({
          value: currency.Id,
          name: currency.Name[this.language],
        });
      }
      this.logisticCurrencyController.setValue(this.currenciesValue[0].value);
      this.insuranceCurrencyController.setValue(this.currenciesValue[0].value);
      this.customsCurrencyController.setValue(this.currenciesValue[0].value);
      this.taxCurrencyController.setValue(this.currenciesValue[0].value);
    });
    this.rfqService.getInvoice(this.activatedRoute.snapshot.params.id).subscribe((response: any) => {
      this.invoiceDetail = response.jsonResult.Data;
      this.invoiceDetail.TicketRFQPictures = this.invoiceDetail.TicketRFQPictures.filter(p => !p.IsThumbnial);
      this.invoiceDetail.TicketInvoicePictures = this.invoiceDetail.TicketInvoicePictures.filter(p => !p.IsThumbnial);
      if (this.invoiceDetail.Inquery.ProductPicturePath !== '') {
        this.invoiceDetail.Inquery.ProductPicturePath = environment.apiUrl + this.invoiceDetail.Inquery.ProductPicturePath;
      }
      for (const attachment of this.invoiceDetail.TicketInvoicePictures) {
        attachment.Path = environment.apiUrl + attachment.Path;
      }
      for (const attachment of this.invoiceDetail.TicketRFQPictures) {
        attachment.Path = environment.apiUrl + attachment.Path;
      }
      this.logisticPriceController.setValue(response.jsonResult.Data.TicketLogistic.Price);
      this.logisticCurrencyController.setValue(response.jsonResult.Data.TicketLogistic.CurrencyId);
      this.logisticDetailController
        .setValue(response.jsonResult.Data.TicketLogistic.Detail ? response.jsonResult.Data.TicketLogistic.Detail.fa : '');
      this.customsPriceController.setValue(response.jsonResult.Data.TicketCustoms.Price);
      this.customsCurrencyController.setValue(response.jsonResult.Data.TicketCustoms.CurrencyId);
      this.customsDetailController
        .setValue(response.jsonResult.Data.TicketCustoms.Detail ? response.jsonResult.Data.TicketCustoms.Detail.fa : '');
      this.insurancePriceController.setValue(response.jsonResult.Data.TicketInsurance.Price);
      this.insuranceCurrencyController.setValue(response.jsonResult.Data.TicketInsurance.CurrencyId);
      this.insuranceDetailController
        .setValue(response.jsonResult.Data.TicketInsurance.Detail ? response.jsonResult.Data.TicketInsurance.Detail.fa : '');
      this.taxPriceController.setValue(response.jsonResult.Data.TicketTax.Price);
      this.taxCurrencyController.setValue(response.jsonResult.Data.TicketTax.CurrencyId);
      this.taxDetailController.setValue(response.jsonResult.Data.TicketTax.Detail ? response.jsonResult.Data.TicketTax.Detail.fa : '');
    });

  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  getCurrencyName(currencyId: number): string {
    return this.currenciesValue.find(c => +c.value === +currencyId)?.name ?? '';
  }

  sendInvoiceByAdmin(): void {
    if (!this.logisticPriceController.errors && !this.logisticCurrencyController.errors) {
      const data = {
        ticketlogistic:
          {
            Price: this.logisticPriceController.value,
            CurrencyId: this.logisticCurrencyController.value,
            Detail: {
              fa: this.logisticDetailController.value
            }
          }
      };
      this.rfqService.postLogisticPrice(data).subscribe((response) => {
        this.logisticId = response.id;
        this.apiCallsCount--;
        this.apiCalls.next(this.apiCallsCount);
      });
    } else {
      Swal.fire({
        icon: "error",
        text: this.apiTitles.required
      });
    }
    if (!this.insurancePriceController.errors && !this.insuranceCurrencyController.errors) {
      const data = {
        ticketinsurance:
          {
            Price: this.insurancePriceController.value,
            CurrencyId: this.insuranceCurrencyController.value,
            Detail: {
              fa: this.insuranceDetailController.value
            }
          }
      };
      this.rfqService.postInsurancePrice(data).subscribe((response) => {
        this.insuranceId = response.id;
        this.apiCallsCount--;
        this.apiCalls.next(this.apiCallsCount);
      });
    } else {
      Swal.fire({
        icon: "error",
        text: this.apiTitles.required
      });
    }
    if (!this.customsPriceController.errors && !this.customsCurrencyController.errors) {
      const data = {
        ticketcustoms:
          {
            Price: this.customsPriceController.value,
            CurrencyId: this.customsCurrencyController.value,
            Detail: {
              fa: this.customsDetailController.value
            }
          }
      };
      this.rfqService.postCustomsPrice(data).subscribe((response) => {
        this.customsId = response.id;
        this.apiCallsCount--;
        this.apiCalls.next(this.apiCallsCount);
      });
    } else {
      Swal.fire({
        icon: "error",
        text: this.apiTitles.required
      });
    }
    if (!this.taxPriceController.errors && !this.taxCurrencyController.errors) {
      const data = {
        tickettax:
          {
            Price: this.taxPriceController.value,
            CurrencyId: this.taxCurrencyController.value,
            Detail: {
              fa: this.taxDetailController.value
            }
          }
      };
      this.rfqService.postTaxPrice(data).subscribe((response) => {
        this.taxId = response.id;
        this.apiCallsCount--;
        this.apiCalls.next(this.apiCallsCount);
      });
    } else {
      Swal.fire({
        icon: "error",
        text: this.apiTitles.required
      });
    }
  }

  ngOnInit(): void {
  }

}
