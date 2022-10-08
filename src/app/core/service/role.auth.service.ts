import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor() {}

  isAuthorized(allowedRoles: string): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    const permissons = JSON.parse(sessionStorage.getItem('permissions'));
    return permissons.includes(allowedRoles);
  }
}
