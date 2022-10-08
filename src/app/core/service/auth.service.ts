import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStateChanged = new EventEmitter<void>();
  constructor() {}
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return token ? true : false;
  }

  onAuthStateChanged() {
    this.authStateChanged.emit();
  }
}
