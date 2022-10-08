import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { CertificateImage, Iso } from './iso.model';
import { Profile, VendorImage } from './profile/profile.model';
import { environment } from '../../environments/environment';
import { Image } from '../shared/image.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiTitles: any;
  constructor(private httpClient: HttpClient, private router: Router, private sharedService: SharedService) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }
  //#region Api Urls
  private baseUrlLogin = '/api/v1/Authenticate/login';
  private baseUrlLogout = '/api/v1/Authenticate/logout';
  private baseUrlForgetPassword = '/api/v1/Authenticate/ForgotPassword';
  private baseUrlISO = '/api/v1/CustomerCertificate/GetAllCustomerCertificates';
  private baseUrlProfile = '/api/v1/CustomerVendor/';
  private baseUrlProfileCustomUpdate = '/api/v1/CustomerVendor/CustomUpdate';
  private baseUrlVendorProfilePictures = '/api/v1/CustomerVendor/GetAllCustomerProfileDefinitionPictures';
  private baseUrlVendorCertificatePictures = '/api/v1/CustomerVendor/GetAllCustomerCertificatePictures';
  private baseVendorUploadPictureUrl = '/api/v1/CustomerVendor/CUDCustomerPicture';
  private baseVendorUploadCertificatePictureUrl = '/api/v1/CustomerVendor/CUDCustomerCertificatePicture';
  //#endregion

  //#region Properties
  isAuthenticated = new BehaviorSubject(!!sessionStorage.getItem('token'));
  isos = new ReplaySubject<Iso[]>();
  profile = new ReplaySubject<Profile>();
  vendorImages = new ReplaySubject<VendorImage[]>();
  vendorICertificates = new ReplaySubject<CertificateImage[]>();

  //#endregion

  //#region Methods
  login(email: string, password: string, rememberMe: boolean, token: string, shouldNavigate: boolean): void {
    const user = {
      user: {
        Email: email,
        Password: password,
        RememberMe: rememberMe,
        Captcha: token,
      },
    };

    this.httpClient.post(this.baseUrlLogin, user).subscribe((response: any) => {
      sessionStorage.setItem('token', response.jsonResult.token);
      sessionStorage.setItem('name', response.jsonResult.FirstName + ' ' + response.jsonResult.LastName);
      this.isAuthenticated.next(true);
      if (shouldNavigate) {
        this.router.navigate([this.sharedService.language, 'profile']);
        this.sharedService.getUnits();
      }
    });
  }

  forgetPassword(Email: string, token: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrlForgetPassword, null, { headers: { email: Email, Captcha: token } });
  }

  getISOs(): void {
    this.httpClient.get(this.baseUrlISO).subscribe((response: any) => {
      const isos = [];
      for (const item of response.jsonResult.Data.certificate) {
        const iso: Iso = item;
        isos.push(iso);
      }
      this.isos.next(isos);
    });
  }

  updateISOs(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseVendorUploadCertificatePictureUrl, data, {
      headers: { EntityName: 'VendorCertificate', Type: '0' },
    });
  }

  getProfile(): void {
    this.httpClient.get(this.baseUrlProfile).subscribe((response: any) => {
      const profile: Profile = response.jsonResult.Data.vendorvendor;
      this.profile.next(profile);
    });
  }

  getProfileTranslator(): void {
    this.httpClient.get(this.baseUrlProfile).subscribe((response: any) => {
      const profile: Profile = response.jsonResult.Data.vendorvendor;
      this.profile.next(profile);
    });
  }

  getVendorProfileImages(): void {
    this.httpClient
      .get(this.baseUrlVendorProfilePictures, {
        headers: {
          EntityName: 'Vendor',
        },
      })
      .subscribe((response: any) => {
        const images = [];
        for (const item of response.jsonResult.Data.vendorvendor) {
          const image: VendorImage = {
            alt: item.Alt,
            description: item.Description,
            path: environment.apiUrl + item.Path,
            seo: item.Seo,
            type: item.Type,
            id: item.Id,
            action: item.Action,
            tableId: item.FileTableId,
            isThumbnail: item.IsThumbnail,
          };
          images.push(image);
        }
        this.vendorImages.next(images);
      });
  }

  getVendorCertificateImages(): void {
    this.httpClient
      .get(this.baseUrlVendorCertificatePictures, {
        headers: {
          EntityName: 'VendorCertificate',
          Type: '0',
        },
      })
      .subscribe((response: any) => {
        const vendorCertificates = [];
        for (const item of response.jsonResult.Data.vendorvendor) {
          const certificate: CertificateImage = item;
          certificate.Path = environment.apiUrl + certificate.Path;
          vendorCertificates.push(certificate);
        }
        this.vendorICertificates.next(vendorCertificates);
      });
  }

  updateProfile(vendor: Profile): Observable<any> {
    const data = { vendorvendor: vendor };
    return this.httpClient.put(this.baseUrlProfile, data);
  }

  updateLogo(logo: Image): Observable<any> {
    const data = [
      {
        Id: logo.id,
        Seo: logo.tags.value,
        Alt: logo.alt.value,
        Description: logo.description.value,
        FileTableId: logo.tableId,
        Action: logo.action,
      },
    ];
    return this.httpClient.post(this.baseVendorUploadPictureUrl, data, {
      headers: {
        EntityName: 'Vendor',
        Type: '1',
      },
    });
  }

  updateGallery(galleries: Image[], deletedGalleries: Image[]): Observable<any> {
    const data = [];
    for (const gallery of galleries) {
      data.push({
        Id: gallery.id,
        Seo: gallery.tags.value,
        Alt: gallery.alt.value,
        Description: gallery.description.value,
        FileTableId: gallery.tableId,
        Action: gallery.action,
      });
    }
    for (const gallery of deletedGalleries) {
      data.push({
        Id: gallery.id,
        Seo: gallery.tags.value,
        Alt: gallery.alt.value,
        Description: gallery.description.value,
        TableId: gallery.tableId,
        Action: gallery.action,
      });
    }
    return this.httpClient.post(this.baseVendorUploadPictureUrl, data, {
      headers: {
        EntityName: 'Vendor',
        Type: '2',
      },
    });
  }

  customUpdateProfile(data: any): Observable<any> {
    const value = { vendorvendor: data };
    console.log(value);
    return this.httpClient.put(this.baseUrlProfileCustomUpdate, value);
  }

  logout(): void {
    this.httpClient.post(this.baseUrlLogout, {}).subscribe(_ => {
      this.signOut();
    });
  }

  signOut(): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('userRole');
    this.isAuthenticated.next(false);
    window.location.href = environment.siteUrl + '/' + sessionStorage.getItem('language') + '/account/login';
  }
  //#endregion
}
