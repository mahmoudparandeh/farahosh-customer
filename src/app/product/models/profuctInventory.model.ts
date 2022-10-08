export interface ProductInventory {
  ProductGuid: string;
  ProductInventoryId: number;
  ProductName: string;
  SpecialAttributeValue: any;
  Status: string;
  StockBalance: number;
  UnitId: number;
  UnitName: string;
  WareHouseId: number;
  WareHouseName: string;
}

export interface ProductInventoryDto {
  Id: number;
  ProductGuid: string;
  WareHouseId: number;
  CurrencyId: number;
  SpecialAttributeValue: any[];
  ShowCallForPriceText: boolean;
  UnitId: number;
  QuantityTo: number;
  QuantityFrom: number;
  GeolocationId: number;
  Price: number;
  IncotermId: number;
  ProductInventoryId: number;
}
