import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Unit} from '../shared/models/unit.model';
import {Inquiry} from './models/inquiry.model';
import {Currency} from './models/currency.model';
import {Incoterm} from "../product/models/incoterm.model";
import {Country, RFQ} from "./models/rfq.model";
import {Category} from "../product/models/category.model";
import {Invoice} from "./models/invoice.model";
import {Value} from "../models/value.model";
import {VendorRfq} from "./models/vendor.rfq.model";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class RFQService {
  apiTitles: any;
  units: Unit[] = [];
  selectedVendorsList: Value[] = [];
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.units.subscribe(units => {
      this.units = units;
    });
  }

  //#region Api Urls
  baseUrlRFQ = '/api/v1/CustomerTicketRFQ/SearchTicketRFQ';
  baseUrlRFQDetail = '/api/v1/CustomerTicketRFQ/GetRFQDetails/';
  baseUrlInquiry = '/api/v1/VendorTicketInquery/SendInqueries';
  baseUrlGetInquiries = '/api/v1/CustomerTicketInquery/GetPageByPage';
  baseUrlGetInquiry = '/api/v1/CustomerTicketInquery/GetInqueryDetails/';
  baseUrlCurrency = '/api/v1/Currency/GetAllRows';
  baseUrlRFQBasics = '/api/v1/WebTicketRFQ/GetAllBasicInformation';
  baseCategoriesUrl = '/api/v1/WebCategory/GetcategoryList';
  baseUrlCloseTicket = '/api/v1/CustomerTicket/CloseTicketByCustomer';
  baseUrlOpenTicket = '/api/v1/CustomerTicket/OpenTicketByCustomer';
  baseUrlGetTicketList = 'api/v1/CustomerTicket/GetTicketList';
  baseUrlGetInvoices = '/api/v1/CustomerTicketInvoice/SearchTicketInvoice';
  baseUrlGetInvoice = '/api/v1/CustomerTicketInvoice/GetInvoiceDetails/';
  baseUrlRFQVendors = '/api/v1/Vendor/SearchProductVendors';
  baseUrlRFQAccept = '/api/v1/TicketRFQ/AcceptTicketRFQ';
  baseUrlRFQReject = '/api/v1/TicketRFQ/RejectTicketRFQ';
  baseUrlSendAdminInvoice = '/api/v1/TicketInvoice/SendInvoiceToCustomerByFarahoosh';
  baseUrlPostLogisticPrice = '/api/v1/TicketLogistic';
  baseUrlPostInsurancePrice = '/api/v1/TicketInsurance';
  baseUrlPostCustomsPrice = '/api/v1/TicketCustoms';
  baseUrlPostTaxPrice = '/api/v1/TicketTax';

  //#endregion Api Urls

  //#region Properties
  totalRFQ = new ReplaySubject<number>();
  totalInquiry = new ReplaySubject<number>();
  totalVendors = new ReplaySubject<number>();
  totalInvoices = new ReplaySubject<number>();
  inquires = new ReplaySubject<Inquiry[]>();
  currencies = new ReplaySubject<Currency[]>();
  rfqIncotermsReplaySubject = new ReplaySubject<Incoterm[]>();
  rfqCurrenciesReplaySubject = new ReplaySubject<Currency[]>();
  rfqCountriesReplaySubject = new ReplaySubject<Country[]>();
  rfqUnitsReplaySubject = new ReplaySubject<Unit[]>();
  selectedCategories = new Subject<Category[]>();
  categoriesBehavioral = new BehaviorSubject<Category[]>([]);
  rfqs = new ReplaySubject<RFQ[]>();
  invoices = new ReplaySubject<Invoice[]>();
  incoterms = new ReplaySubject<Incoterm[]>();
  baseUrlIncoterms = '/api/V1/Incoterm/GetAllRows';
  selectedVendors = new ReplaySubject<Value[]>();
  vendors = new ReplaySubject<VendorRfq[]>();

  //#endregion Properties
  //#region Methods

  getRFQ(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlRFQDetail + id);
  }

  getAllVendors(page: number, searchName: string, searchRegisterCode: string): void {
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: page,
      SearchKey: encodeURIComponent(searchName),
      RegisterCode: encodeURIComponent(searchRegisterCode),
    });
    this.httpClient
      .get(this.baseUrlRFQVendors, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        this.totalVendors.next(response.jsonResult.Data.rowcount);
        const vendors: VendorRfq[] = [];
        for (const item of response.jsonResult.Data.vendor) {
          const vendor: VendorRfq = {
            CreatedOnUtc: item.CreatedOnUtc,
            Id: item.Id,
            Logo: '',
            Name: item.FullName,
            VendorLevel: 0,
            isSelected: new FormControl(false),
            numberOfAcceptedInvoice: 0,
            numberOfReceivedInvoice: 0,
          };
          vendors.push(vendor);
        }
        this.vendors.next(vendors);
      });
  }

  acceptRFQ(id: string): Observable<any> {
    return this.httpClient.put(
      this.baseUrlRFQAccept,
      {},
      {
        headers: {
          Id: id,
        },
      }
    );
  }

  rejectRFQ(id: string): Observable<any> {
    return this.httpClient.put(
      this.baseUrlRFQReject,
      {},
      {
        headers: {
          Id: id,
        },
      }
    );
  }
  sendInquiries(RFQId: string, VendorIds: string): Observable<any> {
    const option = {
      RFQId,
      VendorIds,
    };
    const options = JSON.stringify(option);
    return this.httpClient.post(
      this.baseUrlInquiry,
      {},
      {
        headers: {
          value: options,
        },
      }
    );
  }

  sendInvoiceToCustomer(data): Observable<any> {
    return this.httpClient.put(this.baseUrlSendAdminInvoice, data);
  }

  postLogisticPrice(data): Observable<any> {
    return this.httpClient.post(this.baseUrlPostLogisticPrice, data);
  }

  postInsurancePrice(data): Observable<any> {
    return this.httpClient.post(this.baseUrlPostInsurancePrice, data);
  }

  getInvoice(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlGetInvoice + id.toString());
  }

  postCustomsPrice(data): Observable<any> {
    return this.httpClient.post(this.baseUrlPostCustomsPrice, data);
  }

  postTaxPrice(data): Observable<any> {
    return this.httpClient.post(this.baseUrlPostTaxPrice, data);
  }


  getInquires(page: number): void {
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: page,
    });
    this.httpClient
      .get(this.baseUrlGetInquiries, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        this.totalInvoices.next(response.jsonResult.Data.rowcount);
        const inquires: Inquiry[] = response.jsonResult.Data.ticketinquery;
        for (const inquiry of inquires) {
          if (inquiry.ProductImagePath) {
            inquiry.ProductImagePath = environment.apiUrl + inquiry.ProductImagePath;
          }
          if (inquiry.VendorImagePath) {
            inquiry.VendorImagePath = environment.apiUrl + inquiry.VendorImagePath;
          }
          if (inquiry.UserImagePath) {
            inquiry.UserImagePath = environment.apiUrl + inquiry.UserImagePath;
          }
        }
        this.inquires.next(inquires);
      });
  }


  getInquiry(id: number): Observable<any> {
    return this.httpClient.get((this.baseUrlGetInquiry + id.toString()));
  }

  getCurrencies(): void {
    this.httpClient.get(this.baseUrlCurrency).subscribe((response: any) => {
      this.currencies.next(response.jsonResult.Data.currency);
    });
  }

  getRFQBasics(): void {
    this.httpClient.get(this.baseUrlRFQBasics).subscribe((response: any) => {
      const units = [];
      for (const item of response.jsonResult.Data.Units) {
        const unit: Unit = item;
        try {
          unit.Name = item.Name;
        } catch {
          unit.Name = item.Name[this.sharedService.language];
        }
        units.push(unit);
      }
      const incoterms = [];
      for (const item of response.jsonResult.Data.Incoterms) {
        const incoterm: Incoterm = item;
        try {
          incoterm.Title = item.Title;
          incoterm.Description = item.Description;
        } catch {
          incoterm.Title = item.Title[this.sharedService.language];
          incoterm.Description = item.Description[this.sharedService.language];
        }
        incoterms.push(incoterm);
      }
      const countries = [];
      for (const item of response.jsonResult.Data.Cunteries) {
        const country: Country = item;
        try {
          country.Name = item.Name;
        } catch {
          country.Name = item.Name[this.sharedService.language];
        }
        countries.push(country);
      }
      this.rfqUnitsReplaySubject.next(units);
      this.rfqIncotermsReplaySubject.next(incoterms);
      this.rfqCurrenciesReplaySubject.next(response.jsonResult.Data.Currencies);
      this.rfqCountriesReplaySubject.next(countries);
    });
  }
  //#region Methods
  getRFQs(options: any): void {
    this.httpClient
      .get(this.baseUrlRFQ, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        this.totalRFQ.next(response.jsonResult.Data.rowcount);
        for (const rfq of response.jsonResult.Data.ticketrfq) {
          rfq.ProductPicturePath = environment.apiUrl + rfq.ProductPicturePath;
        }
        this.rfqs.next(response.jsonResult.Data.ticketrfq);
      });
  }

  getInvoices(options: any): void {
    this.httpClient
      .get(this.baseUrlGetInvoices, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        this.totalInvoices.next(response.jsonResult.Data.rowcount);
        const invoices: Invoice[] = response.jsonResult.Data.ticketinvoice;
        for (const inquiry of invoices) {
          if (inquiry.ProductImagePath) {
            inquiry.ProductImagePath = environment.apiUrl + inquiry.ProductImagePath;
          }
          if (inquiry.VendorImagePath) {
            inquiry.VendorImagePath = environment.apiUrl + inquiry.VendorImagePath;
          }
        }
        this.invoices.next(invoices);
      });
  }

  getAllIncoterms(): void {
    this.httpClient
      .get(this.baseUrlIncoterms)
      .subscribe((response: any) => {
        this.incoterms.next(response.jsonResult.Data.incoterm);
      });
  }

  //#endregion Methods
}
