import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './role.auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedPermission = next.data.allowedPermission;
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermission);

    if (!isAuthorized) {
      this.router.navigate(['/', 'auth']);
    }

    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedPermission = next.data.allowedPermission;
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermission);

    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['/', 'auth']);
    }

    return isAuthorized;
  }
}
