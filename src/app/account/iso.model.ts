export interface Iso {
  Id: number;
  Name: string;
  Title: string;
  Type: number;
}

export interface CertificateImage {
  CertificateId: number;
  CertificateName?: string;
  Action: number;
  Id: number;
  FileTableId: string;
  Seo: any;
  Alt: any;
  Description: any;
  Path?: string;
  IsThumbnail?: boolean;
}
