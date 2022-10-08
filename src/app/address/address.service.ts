import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AddressModel } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  token: string | null;
  constructor(private httpClient: HttpClient) {}

  //#region APIs
  private baseUrlAddress = '/api/v1/CustomerAddress/GetCustomerAddressList';
  private baseUrlAddressListPageByPage = '/api/v1/CustomerAddress/GetPageByPage';
  private createAddressUrl = '/api/v1/CustomerAddress/';
  private baseUrlUpdateAddress = '/api/v1/CustomerAddress/CustomUpdate';
  //#endregion

  //#region Properties
  addresses = new ReplaySubject<AddressModel[]>();
  //#endregion

  //#region Methods
  getAddressList(): void {
    this.httpClient.get(this.baseUrlAddress).subscribe((response: any) => {
      const addresses: AddressModel[] = [];
      for (const item of response.jsonResult.Data.address) {
        const address: AddressModel = item;
        addresses.push(address);
      }
      this.addresses.next(addresses);
    });
  }
  createAddress(address: any): Observable<any> {
    const data = { address };
    return this.httpClient.post<any>(this.createAddressUrl, data);
  }
  updateAddress(address: any, id: number): Observable<any> {
    address.Id = id;
    const data = { address };
    return this.httpClient.put<any>(this.baseUrlUpdateAddress, data);
  }
  getAddress(id: number): Observable<any> {
    return this.httpClient.get(this.createAddressUrl + id);
  }
  deleteAddress(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.createAddressUrl + id);
  }
}
