import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/token.service';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/shared.service';
import { ErrorHandler } from '../shared/helper/error.handler';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private tokenService: TokenStorageService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      JwtInterceptor.setLanguage(language);
    });
  }
  static baseUrl = environment.apiUrl;
  static language = 'fa';

  static setLanguage(language: string): void {
    this.language = language;
  }

  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    if (request.url.includes('http')) {
      return request.clone();
    } else {
      return request.clone({ headers: request.headers.set('token', token) });
    }
  }

  private static modifyBody(body: any) {
    try {
      body.jsonResult.Data = JwtInterceptor.jsonify(body.jsonResult.Data);
      return body;
    } catch {
      return body;
    }
  }
  private static is_json(content: string) {
    let tempContent = content;
    if (content === null) {
      content = '';
    }
    if (typeof content === 'object') {
      return content;
    }
    try {
      tempContent = JSON.parse(content);
    } catch {
      return null;
    }
    return tempContent;
  }

  private static jsonify(content: string) {
    const jsonData: any = this.is_json(content);
    if (!jsonData) {
      return content;
    }
    for (const key in jsonData) {
      jsonData[key] = this.jsonify(jsonData[key]);
    }
    return jsonData;
  }

  private static addBaseUrl(request: HttpRequest<any>) {
    if (request.url.includes('http')) {
      return request.clone({ url: request.url });
    } else {
      return request.clone({ url: this.baseUrl + request.url });
    }
  }

  private static addLanguage(request: HttpRequest<any>) {
    if (request.url.includes('http')) {
      return request.clone();
    } else {
      return request.clone({ headers: request.headers.set('language', this.language) });
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;

    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = JwtInterceptor.addTokenHeader(request, token);
    }
    authReq = JwtInterceptor.addLanguage(authReq);
    authReq = JwtInterceptor.addBaseUrl(authReq);
    // @ts-ignore
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event.headers.keys().forEach(keyName => {
            if (keyName === 'token' && token !== event.headers.get(keyName) + '') {
              sessionStorage.setItem('token', event.headers.get(keyName) + '');
            }
          });
          return event.clone({ body: JwtInterceptor.modifyBody(event.body) });
        }
        return event;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.accountService.signOut();
        } else {
          ErrorHandler.showError(error);
        }
        return throwError(error);
      })
    );
  }
}
