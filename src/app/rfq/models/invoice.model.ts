export interface Invoice {
  CreatedOnUtc: string;
  Id: number;
  TicketId: number;
  ProductName: any;
  InvCurrencyName: any;
  InvUnitName: any;
  InvIncotermName: any;
  InqueryId: number;
  InvCurrencyId: number;
  InvDestination: number;
  InvDetails: any;
  InvIncotermId: number;
  InvLeadTime: number;
  InvPaymentMethod: number;
  InvPortId: string;
  InvPrice: number;
  InvProductId: number;
  InvQuantity: string;
  InvShoppingMethod: number;
  InvUnitId: number;
  ProductImagePath: string;
  RFQId: number;
  Status: number;
  TicketCustomsId: number;
  TicketInsurenceId: number;
  TicketLogisticId: number;
  TicketTaxId: number;
  VendorEmail: string;
  VendorId: number;
  VendorImagePath: string;
  VendorName: any;
}