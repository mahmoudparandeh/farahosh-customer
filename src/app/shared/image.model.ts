import { FormControl } from '@angular/forms';

export interface Image {
  id?: number;
  tableId?: string;
  action?: number;
  path: string;
  alt?: FormControl;
  tags?: FormControl;
  description?: FormControl;
  isThumbnail?: boolean;
  certificateName?: string;
}

export interface ImageDto {
  Action: number;
  Alt?: string;
  CertificateName?: string;
  Description: string;
  FileTableId: string;
  Id: number;
  Seo: string;
  IsThumbnail?: boolean;
  Type?: number;
  Path?: string;
}
