export interface Country {
  DisplayOrder: number;
  Id: number;
  LanguageCode: string;
  Name: string;
  ParentId: string;
  Path: string;
  Type: string;
}

export interface Incoterm {
  Description: string;
  Id: number;
  MetaDescription: string;
  Title: string;
}

export interface RFQ {
  Id: number;
  ProductName: any;
  ProductPicturePath: string;
  SourcingTypeName: string;
  CustomerName: any;
  FirstName: string;
  LastName: string;
  InvoiceCount: number;
  SuggestCount: number;
  CategoryName: any;
  Purity: any;
  SourcingPurposeName: any;
  ProductCertificateIds: any;
  BusinessCertificateIds: any;
  CasNO: any;
  Quantity: number;
  UnitName: any;
  IncotermTitle: any;
  MaxBudget: any;
  CurrencyName: any;
  Details: any;
  SupplierBusinessTypeName: any;
  TestReportName: any;
  OtherRequirements: any;
  ShoppingMethodName: any;
  GeoLocationName: any;
  Port: any;
  LeadTime: string;
  PaymentMethodName: any;
  Status: string;
  CreatedOnUtc: string;
  Attachments: any[];
}
