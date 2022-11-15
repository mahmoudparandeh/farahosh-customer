import { FormControl } from '@angular/forms';

export interface VendorRfq {
  Id: number;
  Logo: string;
  Name: string;
  VendorLevel: number;
  CreatedOnUtc: string;
  numberOfReceivedInvoice: number;
  numberOfAcceptedInvoice: number;
  isSelected: FormControl;
}
