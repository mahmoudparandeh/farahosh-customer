import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarehouseModel } from './warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private httpClient: HttpClient) {}

  //#region APIs
  private baseUrlWarehouse = '/api/v1/VendorWareHouse/';
  private baseUrlWarehouseList = '/api/v1/VendorWareHouse/GetVendorWareHouseList';
  private baseUrlWarehouseCreate = '/api/v1/VendorWareHouse/';
  private baseUrlWarehouseUpdate = '/api/v1/VendorWareHouse/CustomUpdate';
  private baseUrlWarehousePageByPage = '/api/v1/VendorWareHouse/GetPageByPage';
  //#endregion

  //#region Properties
  warehouseList = new BehaviorSubject<any[]>([]);
  //#endregion

  //#region Methods
  getWarehouseList(): void {
    this.httpClient.get(this.baseUrlWarehouseList).subscribe((response: any) => {
      const warehouses: WarehouseModel[] = [];
      for (const item of response.jsonResult.Data.warehouse) {
        const warehouse: WarehouseModel = item;
        warehouses.push(warehouse);
      }
      this.warehouseList.next(warehouses);
    });
  }
  getWarehouseListPageByPage(page: number): void {
    const options = JSON.stringify({ PageSize: 12, PageNumber: page });
    this.httpClient
      .get(this.baseUrlWarehousePageByPage, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        const warehouses: WarehouseModel[] = [];
        for (const item of response.jsonResult.Data.warehouse) {
          const warehouse: WarehouseModel = item;
          warehouses.push(warehouse);
        }
        this.warehouseList.next(warehouses);
      });
  }
  createWarehouse(warehouse: any): Observable<any> {
    const data = { warehouse };
    return this.httpClient.post<any>(this.baseUrlWarehouseCreate, data);
  }
  updateWarehouse(warehouse: any, id: number): Observable<any> {
    warehouse.Id = id;
    const data = { warehouse };
    return this.httpClient.put<any>(this.baseUrlWarehouseUpdate, data);
  }
  getWarehouse(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrlWarehouse + id);
  }
  deleteWarehouse(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrlWarehouse + id);
  }
}
