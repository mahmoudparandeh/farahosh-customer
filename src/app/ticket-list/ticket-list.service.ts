import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileManager } from '../file-manager/file-manager.model';
import { TicketListModel } from './ticket-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketListService {
  apiTitles: any;
  constructor(private sharedService: SharedService, private httpClient: HttpClient) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  //#region APIs
  private baseUrlTicketList = '/api/v1/Ticket/GetVendorTicketList';
  private baseUrlTicketListItem = '/api/v1/TicketItem/GetVendorTicketMessages';
  // private baseUrlTicketListItem = '/api/v1/Ticket/GetVendorTicketList';
  // private baseUrlVendorRFQReply = '/api/v1/Ticket/GetVendorTicketList';
  private baseUrlVendorRFQReply = '/api/v1/TicketItem/TicketReplay';
  //#endregion

  //#region Properties
  ticketList = new BehaviorSubject<TicketListModel[]>([]);
  //#endregion

  //#region Methods
  getTicketList(page: number): Observable<any> {
    const options = JSON.stringify({ PageSize: 12, PageNumber: page });
    return this.httpClient.get(this.baseUrlTicketList, {
      headers: {
        options,
      },
    });
  }
  getVendorRFQChat(rfqId: number): Observable<any> {
    const options = JSON.stringify({ PageSize: 10, PageNumber: 1, TicketId: rfqId });
    return this.httpClient.get(this.baseUrlTicketListItem, {
      headers: {
        value: options,
      },
    });
  }
  sendTicketReply(ticketId: number, message: string): Observable<any> {
    const value = {
      ticket: { TicketId: ticketId, Message: message },
    };
    return this.httpClient.post<any>(this.baseUrlVendorRFQReply, value);
  }

  //#endregion
}
