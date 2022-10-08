export interface Profile {
  AnnualExportTurnover?: any;
  BusinessType?: any;
  ContactPerson?: any;
  CreatedOnUtc?: any;
  Email?: any;
  FAQ?: any[];
  Fax?: any;
  FullDescription?: any;
  FullName?: any;
  FullProfile?: any;
  GrossAnnualTurnover?: any;
  LegalStatus?: any;
  MetaDescription?: any;
  MetaKeywords?: any;
  MetaTitle?: any;
  NoOfEmployees?: any;
  NumberOfEmployees?: any;
  Post?: any;
  PostalCode?: any;
  Priority?: number;
  ProductionCapacity?: any[];
  RAndD?: number;
  Refrences?: any;
  RegisterCode?: any;
  RegisterNumber?: any;
  SendInformation?: any;
  ShortDescription?: any;
  Status?: number;
  StatusComment?: any;
  Subject?: any;
  TotalRenenue?: number;
  Type?: number;
  VendorGuid?: any;
  WebSiteAddress?: any;
  YearEstablished?: any;
  ResponseRFQTime?: any;
}

export interface VendorImage {
  id?: string;
  tableId?: string;
  action?: number;
  type: any;
  path: any;
  alt: any;
  description: any;
  seo: any;
  isThumbnail: boolean;
}
