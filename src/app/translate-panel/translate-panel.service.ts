import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from '../models/value.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private httpClient: HttpClient) {}
  //#region Api Urls
  baseUrlTranslator = '/api/v1/Translator/TranslateFromTo';
  translationLanguages: Value[] = [
    {
      value: 'fa',
      name: 'فارسی',
    },
    {
      value: 'en',
      name: 'انگلیسی',
    },
    {
      value: 'ar',
      name: 'عربی',
    },
    {
      value: 'fr',
      name: 'فرانسوی',
    },
    {
      value: 'ru',
      name: 'روسی',
    },
    {
      value: 'zh',
      name: 'چینی',
    },
    {
      value: 'hi',
      name: 'هندی',
    },
    {
      value: 'de',
      name: 'آلمانی',
    },
  ];
  translate(text: string, from: string, to: string): Observable<any> {
    const data = JSON.stringify({ Text: encodeURIComponent(text), From: from, To: to });
    return this.httpClient.get<any>(this.baseUrlTranslator, { headers: { value: data } });
  }
  //#endregion
}
