import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import moment from 'jalali-moment';
import {Message} from './models/notification.model';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiTitles: any;
  constructor(private sharedService: SharedService, private httpClient: HttpClient) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  //#region APIs
  private baseUrlNotificationList = '/api/v1/WebMessage/SearchMessage';
  private baseUrlAllUsers = '/api/v1/Message/SearchUser';
  private baseUrlAllVendors = '/api/v1/Message/SearchVendor';
  private baseUrlSendMessage = '/api/v1/Message/SendMessage';
  private baseUrlDeleteMessage = '/api/v1/Message/';
  private baseUrlGetMessage = '/api/v1/WebMessage/GetMessageDetails/';
  //#endregion

  //#region Properties
  totalMessage = new ReplaySubject<number>();
  messageList = new BehaviorSubject<Message[]>([]);
  //#endregion

  //#region Methods
  getMessageList(options): void {
    this.httpClient.get(this.baseUrlNotificationList, {
      headers: {
        value: options,
      },
    }).subscribe((response: any) => {
      this.totalMessage.next(response.jsonResult.Data.rowcount);
      const messages = [];
      for (const message of response.jsonResult.Data.message) {
        if (this.sharedService.language === 'fa') {
          message.CreatedOnUtc = moment(message.CreatedOnUtc).format('jYYYY/jM/jD HH:MM:ss');
        } else {
          message.CreatedOnUtc = moment(message.CreatedOnUtc).format('YYYY/M/D HH:MM:ss');
        }
        messages.push(message);
      }
      this.messageList.next(messages);
    });
  }

  searchUsers(searchName: string): Observable<any> {
    const options = JSON.stringify({
      SearchKey: encodeURIComponent(searchName),
    });
    return this.httpClient.get(this.baseUrlAllUsers, {
      headers: {
        value: options,
      }
    });
  }

  searchVendors(searchName: string, vendorType: number): Observable<any> {
    const options = JSON.stringify({
      SearchKey: encodeURIComponent(searchName),
      VendorType: vendorType.toString(),
    });
    return this.httpClient.get(this.baseUrlAllVendors, {
      headers: {
        value: options,
      }
    });
  }

  // sendMessage(data: any): Observable<any> {
  //   return this.httpClient.post(this.baseUrlSendMessage, data);
  // }
  //
  deleteMessage(id: string): Observable<any> {
    return this.httpClient.delete(this.baseUrlDeleteMessage + id);
  }

  getMessage(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrlGetMessage + id);
  }
  //#endregion
}
