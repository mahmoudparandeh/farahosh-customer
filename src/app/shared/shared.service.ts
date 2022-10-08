import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Language } from './models/language.model';
import { Money } from './models/money.model';
import { Title } from './models/title.model';
import { Unit } from './models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // ##region Api Urls
  baseTitlesUrl = '/api/v1/LocaleStringResource/GetResourceByCategory';
  baseUnitsUrl = '/api/v1/VendorUnit/GetAllPublicUnits';
  baseGeoLocationUrl = '/api/v1/VendorGeoLocation/SearchGeoLocation';
  baseLanguageUrl = '/api/v1/Language/GetActiveLanguagesListObject';
  // ##endregion

  // ##region Properties
  language = 'fa';
  siteLanguages: Language[] = [
    { name: 'فارسی', title: 'fa', direction: 'rtl' },
    { name: 'English', title: 'en', direction: 'ltr' },
    { name: 'العربیه', title: 'ar', direction: 'rtl' },
    { name: 'français', title: 'fr', direction: 'ltr' },
  ];
  siteMonies: Money[] = [
    { name: 'ریال', title: 'rial', sign: 'ریال', equality: 1 },
    { name: 'US Dollar', title: 'dollar', sign: '$', equality: 0.000004 },
  ];
  // ##end region

  // ##region Streams
  currentLanguage = new BehaviorSubject<string>(
    sessionStorage.getItem('language') ? sessionStorage.getItem('language') + '' : 'fa'
  );
  currentMoney = new BehaviorSubject<string>(
    sessionStorage.getItem('money') ? sessionStorage.getItem('money') + '' : 'rial'
  );
  siteDirection = new BehaviorSubject<string>(
    sessionStorage.getItem('direction') ? sessionStorage.getItem('direction') + '' : 'rtl'
  );
  languages = new BehaviorSubject<Language[]>(this.siteLanguages);
  units = new BehaviorSubject<Unit[]>([]);
  menuTitles = new BehaviorSubject<any>({});
  sideMenuTitles = new BehaviorSubject<any>({});
  profileTranslatorTitles = new BehaviorSubject<any>({});
  fileManagerTitles = new BehaviorSubject<any>({});
  productionCapacityTitles = new BehaviorSubject<any>({});
  faqTitles = new BehaviorSubject<any>({});
  addressListTitles = new BehaviorSubject<any>({});
  addressTitles = new BehaviorSubject<any>({});
  warehouseTitles = new BehaviorSubject<any>({});
  wareHousesListTitles = new BehaviorSubject<any>({});
  ticketListTitles = new BehaviorSubject<any>({});
  apiTitles = new BehaviorSubject<any>({});
  alertTitles = new BehaviorSubject<any>({});
  userRFQTitles = new BehaviorSubject<any>({});
  productListTitle = new BehaviorSubject<any>({});
  productTitle = new BehaviorSubject<any>({});
  loginTitles = new BehaviorSubject<any>({});
  newProductTitles = new BehaviorSubject<any>({});
  attributeTitles = new BehaviorSubject<any>({});
  productDetailsTitles = new BehaviorSubject<any>({});
  fileSelectorTitles = new BehaviorSubject<any>({});
  productInventoryTitles = new BehaviorSubject<any>({});
  productInventoryListTitles = new BehaviorSubject<any>({});
  productPriceTitles = new BehaviorSubject<any>({});
  productPriceListTitles = new BehaviorSubject<any>({});
  newProductPriceTitles = new BehaviorSubject<any>({});
  forgetPasswordTitles = new BehaviorSubject<any>({});
  languageTitles = new BehaviorSubject<any>({});
  rfqTitles = new BehaviorSubject<any>({});
  menuTitlesLanguage = '';
  sideMenuTitlesLanguage = '';
  profileTranslatorTitlesLanguage = '';
  addressTitlesLanguage = '';
  addressListTitlesLanguage = '';
  warehouseTitlesLanguage = '';
  wareHousesListTitlesLanguage = '';
  ticketListTitlesLanguage = '';
  productionCapacityTitlesLanguage = '';
  faqTitlesLanguage = '';
  apiTitlesLanguage = '';
  alertTitlesLanguage = '';
  userRFQTitlesLanguage = '';
  productListTitleLanguage = '';
  productTitleLanguage = '';
  loginTitlesLanguage = '';
  newProductTitleLanguage = '';
  attributeTitleLanguage = '';
  productDetailsTitleLanguage = '';
  fileSelectorTitlesLanguage = '';
  fileManagerTitlesLanguage = '';
  productInventoryTitlesLanguage = '';
  productInventoryListTitlesLanguage = '';
  productPriceTitlesLanguage = '';
  productPriceListTitlesLanguage = '';
  newProductPriceTitlesLanguage = '';
  forgetPasswordTitlesLanguage = '';
  languageTitlesLanguage = '';
  rfqTitlesLanguage = '';
  // ##endregion

  constructor(private httpClient: HttpClient) {}

  // ##region Methods
  onLanguageChanges(language: string, section: string): void {
    if (language === undefined) {
      return;
    }
    switch (section) {
      case 'menuTitle': {
        if (this.menuTitlesLanguage === language) {
          return;
        } else {
          this.menuTitlesLanguage = language;
        }
        break;
      }
      case 'sideMenuTitle': {
        if (this.sideMenuTitlesLanguage === language) {
          return;
        } else {
          this.sideMenuTitlesLanguage = language;
        }
        break;
      }
      case 'profileTranslatorTitle': {
        if (this.profileTranslatorTitlesLanguage === language) {
          return;
        } else {
          this.profileTranslatorTitlesLanguage = language;
        }
        break;
      }
      case 'fileManagerTitle': {
        if (this.fileManagerTitlesLanguage === language) {
          return;
        } else {
          this.fileManagerTitlesLanguage = language;
        }
        break;
      }
      case 'apiTitle': {
        if (this.apiTitlesLanguage === language) {
          return;
        } else {
          this.apiTitlesLanguage = language;
        }
        break;
      }
      case 'alertTitle': {
        if (this.alertTitlesLanguage === language) {
          return;
        } else {
          this.alertTitlesLanguage = language;
        }
        break;
      }
      case 'addressListTitle': {
        if (this.addressListTitlesLanguage === language) {
          return;
        } else {
          this.addressListTitlesLanguage = language;
        }
        break;
      }
      case 'addressTitle': {
        if (this.addressTitlesLanguage === language) {
          return;
        } else {
          this.addressTitlesLanguage = language;
        }
        break;
      }
      case 'warehouseTitle': {
        if (this.warehouseTitlesLanguage === language) {
          return;
        } else {
          this.warehouseTitlesLanguage = language;
        }
        break;
      }
      case 'wareHousesListTitle': {
        if (this.wareHousesListTitlesLanguage === language) {
          return;
        } else {
          this.wareHousesListTitlesLanguage = language;
        }
        break;
      }
      case 'ticketListTitle': {
        if (this.ticketListTitlesLanguage === language) {
          return;
        } else {
          this.ticketListTitlesLanguage = language;
        }
        break;
      }
      case 'productionCapacityTitle': {
        if (this.productionCapacityTitlesLanguage === language) {
          return;
        } else {
          this.productionCapacityTitlesLanguage = language;
        }
        break;
      }
      case 'faqTitle': {
        if (this.faqTitlesLanguage === language) {
          return;
        } else {
          this.faqTitlesLanguage = language;
        }
        break;
      }
      case 'userRFQTitle': {
        if (this.userRFQTitlesLanguage === language) {
          return;
        } else {
          this.userRFQTitlesLanguage = language;
        }
        break;
      }
      case 'productListTitle': {
        if (this.productListTitleLanguage === language) {
          return;
        } else {
          this.productListTitleLanguage = language;
        }
        break;
      }
      case 'productTitle': {
        if (this.productTitleLanguage === language) {
          return;
        } else {
          this.productTitleLanguage = language;
        }
        break;
      }
      case 'loginTitle': {
        if (this.loginTitlesLanguage === language) {
          return;
        } else {
          this.loginTitlesLanguage = language;
        }
        break;
      }
      case 'newProductTitle': {
        if (this.newProductTitleLanguage === language) {
          return;
        } else {
          this.newProductTitleLanguage = language;
        }
        break;
      }
      case 'productDetailsTitle': {
        if (this.productDetailsTitleLanguage === language) {
          return;
        } else {
          this.productDetailsTitleLanguage = language;
        }
        break;
      }
      case 'attributeTitle': {
        if (this.attributeTitleLanguage === language) {
          return;
        } else {
          this.attributeTitleLanguage = language;
        }
        break;
      }
      case 'fileSelectorTitle': {
        if (this.fileSelectorTitlesLanguage === language) {
          return;
        } else {
          this.fileSelectorTitlesLanguage = language;
        }
        break;
      }
      case 'productInventoryTitle': {
        if (this.productInventoryTitlesLanguage === language) {
          return;
        } else {
          this.productInventoryTitlesLanguage = language;
        }
        break;
      }
      case 'productInventoryListTitle': {
        if (this.productInventoryListTitlesLanguage === language) {
          return;
        } else {
          this.productInventoryListTitlesLanguage = language;
        }
        break;
      }
      case 'productPriceTitle': {
        if (this.productPriceTitlesLanguage === language) {
          return;
        } else {
          this.productPriceTitlesLanguage = language;
        }
        break;
      }
      case 'productPriceListTitle': {
        if (this.productPriceListTitlesLanguage === language) {
          return;
        } else {
          this.productPriceListTitlesLanguage = language;
        }
        break;
      }
      case 'newProductPriceTitle': {
        if (this.newProductPriceTitlesLanguage === language) {
          return;
        } else {
          this.newProductPriceTitlesLanguage = language;
        }
        break;
      }
      case 'forgetPasswordTitle': {
        if (this.forgetPasswordTitlesLanguage === language) {
          return;
        } else {
          this.forgetPasswordTitlesLanguage = language;
        }
        break;
      }
      case 'languageTitle': {
        if (this.languageTitlesLanguage === language) {
          return;
        } else {
          this.languageTitlesLanguage = language;
        }
        break;
      }
      case 'rfqTitle': {
        if (this.rfqTitlesLanguage === language) {
          return;
        } else {
          this.rfqTitlesLanguage = language;
        }
        break;
      }
    }
    this.getTitles(language, section).subscribe(titles => {
      switch (section) {
        case 'menuTitle': {
          this.menuTitles.next(titles);
          break;
        }
        case 'sideMenuTitle': {
          this.sideMenuTitles.next(titles);
          break;
        }
        case 'profileTranslatorTitle': {
          this.profileTranslatorTitles.next(titles);
          break;
        }
        case 'fileManagerTitle': {
          this.fileManagerTitles.next(titles);
          break;
        }
        case 'productionCapacityTitle': {
          this.productionCapacityTitles.next(titles);
          break;
        }
        case 'faqTitle': {
          this.faqTitles.next(titles);
          break;
        }
        case 'addressListTitle': {
          this.addressListTitles.next(titles);
          break;
        }
        case 'addressTitle': {
          this.addressTitles.next(titles);
          break;
        }
        case 'warehouseTitle': {
          this.warehouseTitles.next(titles);
          break;
        }
        case 'ticketListTitle': {
          this.ticketListTitles.next(titles);
          break;
        }
        case 'wareHousesListTitle': {
          this.wareHousesListTitles.next(titles);
          break;
        }
        case 'apiTitle': {
          this.apiTitles.next(titles);
          break;
        }
        case 'alertTitle': {
          this.alertTitles.next(titles);
          break;
        }
        case 'userRFQTitle': {
          this.userRFQTitles.next(titles);
          break;
        }
        case 'productListTitle': {
          this.productListTitle.next(titles);
          break;
        }
        case 'productTitle': {
          this.productTitle.next(titles);
          break;
        }
        case 'loginTitle': {
          this.loginTitles.next(titles);
          break;
        }
        case 'newProductTitle': {
          this.newProductTitles.next(titles);
          break;
        }
        case 'productDetailsTitle': {
          this.productDetailsTitles.next(titles);
          break;
        }
        case 'attributeTitle': {
          this.attributeTitles.next(titles);
          break;
        }
        case 'fileSelectorTitle': {
          this.fileSelectorTitles.next(titles);
          break;
        }
        case 'productInventoryTitle': {
          this.productInventoryTitles.next(titles);
          break;
        }
        case 'productInventoryListTitle': {
          this.productInventoryListTitles.next(titles);
          break;
        }
        case 'productPriceTitle': {
          this.productPriceTitles.next(titles);
          break;
        }
        case 'productPriceListTitle': {
          this.productPriceListTitles.next(titles);
          break;
        }
        case 'newProductPriceTitle': {
          this.newProductPriceTitles.next(titles);
          break;
        }
        case 'forgetPasswordTitle': {
          this.forgetPasswordTitles.next(titles);
          break;
        }
        case 'languageTitle': {
          this.languageTitles.next(titles);
          break;
        }
        case 'rfqTitle': {
          this.rfqTitles.next(titles);
          break;
        }
      }
    });
    // prevent duplicate call when language is not changed
    this.language = language;
    // get resource translation
  }

  getTitles(language: string, section: string): Observable<any> {
    if (language === '' || language == null) {
      return new BehaviorSubject<any>(null);
    }
    const value = JSON.stringify({ SearchKey: section, Language: language });
    return this.httpClient.get<any>(this.baseTitlesUrl, { headers: { value } }).pipe(
      map((data: any) => {
        const items: Title[] = data.jsonResult.Data.localestringresource;
        const titles: any = {};
        for (const title of items) {
          const key = title.ResourceName;
          titles[key] = title.ResourceValueOrTitle;
        }
        return titles;
      })
    );
  }

  setLanguage(language: string): void {
    if (this.siteLanguages.find(lang => lang.title === language)) {
      sessionStorage.setItem('language', language);
      sessionStorage.setItem('direction', this.siteLanguages.find(lang => lang.title === language).direction);
      this.currentLanguage.next(language);
      this.siteDirection.next(this.siteLanguages.find(lang => lang.title === language).direction);
    } else {
      this.currentLanguage.next('fa');
    }
  }

  setMoney(money: string): void {
    sessionStorage.setItem('money', money);
    this.currentMoney.next(money);
  }

  getIPAddress(): Observable<any> {
    return this.httpClient.get('https://api.ipify.org/?format=json');
  }

  getGeoLocationOfUser(ipAddress: string): Observable<any> {
    const url = 'https://ipapi.co/' + ipAddress + '/json/';
    return this.httpClient.get(url);
  }

  getGeoLocation(search: string): Observable<any> {
    return this.httpClient.get(this.baseGeoLocationUrl, {
      headers: { value: encodeURIComponent(search), language: this.language },
    });
  }

  getUnits(): void {
    this.httpClient
      .get(this.baseUnitsUrl, {
        headers: {
          Type: '0',
        },
      })
      .subscribe((response: any) => {
        const units = [];
        for (const item of response.jsonResult.Data.unit) {
          const unit: Unit = {
            Id: item.Id,
            Name: item.Name[this.language],
          };
          units.push(unit);
        }
        this.units.next(units);
      });
  }

  getLanguages(): void {
    this.httpClient.get(this.baseLanguageUrl).subscribe((response: any) => {
      this.siteLanguages = [];
      for (const language of response.jsonResult.Data.language) {
        this.siteLanguages.push({
          direction: language.Rtl ? 'rtl' : 'ltr',
          name: language.Name[language.code],
          title: language.code,
        });
      }
      this.languages.next(this.siteLanguages);
    });
  }
  // ##endregion
}
