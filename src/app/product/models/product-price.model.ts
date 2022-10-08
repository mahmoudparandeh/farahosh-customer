export interface ProductPrice {
  DisplayOrder: number;
  GeolocationName: any;
  HTSDescription: any;
  HTSNumber: any;
  Id: number;
  IncotermDescription: any;
  IncotermId: number;
  IncotermMetaDescription: any;
  IncotermName: any;
  OldPrice: number;
  Price: number;
  ProductGuid: string;
  ProductInventoryId: number;
  ProductName: any;
  QuantityFrom: number;
  QuantityTo: number;
  SpecialAttributeValue: any;
  StartDateTimeUtc: any;
  UnitId: number;
  UnitName: any;
  WareHouseName: any;
}

export interface ProductPriceDto {
  DisplayOrder: number;
  GeolocationId: number;
  GeoLocationName: string;
  Id: number;
  IncotermId: number;
  OldPrice: number;
  Price: number;
  ProductInventoryId: number;
  QuantityFrom: number;
  QuantityTo: number;
  ShowCallForPriceText: boolean;
}
