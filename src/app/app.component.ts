import { AuthService } from 'src/app/core/service/auth.service';
import { AfterViewInit, Component, HostListener, Renderer2 } from '@angular/core';
import { Event, Router, NavigationStart, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { SharedService } from './shared/shared.service';
import { AccountService } from './account/account.service';
import { ProductService } from './product/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  currentUrl: string;
  showMenus = false;
  constructor(
    public _router: Router,
    location: PlatformLocation,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private productService: ProductService,
    private router: Router
  ) {
    this.sharedService.siteDirection.subscribe(direction => {
      const body = document.getElementById('body');
      this.renderer.removeClass(body, direction === 'rtl' ? 'ltr' : 'rtl');
      this.renderer.addClass(body, direction);
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'sideMenuTitle');
      this.sharedService.onLanguageChanges(language, 'apiTitle');
      this.sharedService.onLanguageChanges(language, 'alertTitle');
      this.sharedService.onLanguageChanges(language, 'fileSelectorTitle');
    });
    this.sharedService.getLanguages();
    this.productService.getCategories();
    this.showMenus = !(
      this.activatedRoute.snapshot['_routerState'].url.includes('/auth') ||
      this.activatedRoute.snapshot['_routerState'].url.includes('auth') ||
      this.activatedRoute.snapshot['_routerState'].url.includes('auth/forget-password') ||
      this.activatedRoute.snapshot['_routerState'].url.includes('/auth/forget-password')
    );
    this._router.events.subscribe((routerEvent: Event) => {
      this.showMenus = !(
        this.activatedRoute.snapshot['_routerState'].url.includes('/auth') ||
        this.activatedRoute.snapshot['_routerState'].url.includes('auth') ||
        this.activatedRoute.snapshot['_routerState'].url.includes('auth/forget-password') ||
        this.activatedRoute.snapshot['_routerState'].url.includes('/auth/forget-password')
      );
      if (routerEvent instanceof NavigationStart) {
        location.onPopState(() => {
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }
      if (routerEvent instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.queryParams['token'] !== undefined) {
          sessionStorage.setItem('token', decodeURIComponent(this.activatedRoute.snapshot.queryParams['token']));
          sessionStorage.setItem('name', this.activatedRoute.snapshot.queryParams['name']);
          sessionStorage.setItem('language', this.activatedRoute.snapshot.queryParams['language'] ?? 'fa');
          this.sharedService.getUnits();
          this.accountService.isAuthenticated.next(true);
          this.router.navigate([this.sharedService.language, 'profile']);
        } else if (window.location.pathname === '/') {
          this.router.navigate(['/auth']);
        }
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
    if (this.authService.isAuthenticated()) {
      this.sharedService.getUnits();
      if (window.location.pathname === '/') {
        this.router.navigate([this.sharedService.language, 'profile']);
      }
    }
  }
}
