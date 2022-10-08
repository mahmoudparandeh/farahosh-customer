import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private accountService: AccountService, private router: Router) {}

  public saveToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
