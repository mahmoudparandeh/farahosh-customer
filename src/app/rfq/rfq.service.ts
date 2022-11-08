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

@Injectable({
  providedIn: 'root',
})
export class RFQService {
  apiTitles: any;
  units: Unit[] = [];

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
  baseUrlRFQDetail = '/api/v1/CustomerTicketRFQ/GetRFQDetails';
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

  //#endregion Properties
  //#region Methods
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
