import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef, OnInit, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { WINDOW } from 'src/app/core/service/window.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

import { SharedService } from '../../shared/shared.service';
const document: any = window.document;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  public config: any = {};
  isNavbarCollapsed = true;
  isNavbarShow: boolean;
  isDarkTheme = false;
  isMainLogo = true;
  flagvalue;
  langStoreValue: string;
  isOpenSidebar: boolean;
  count = 0;
  siteLanguages = this.sharedService.siteLanguages;
  menuTitles: any;
  language = 'fa';
  currentLanguage = 'فارسی';
  siteDirection = 'rtl';
  constructor(
    @Inject(DOCUMENT) private cDocument: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private sharedService: SharedService
  ) {
    super();
    this.sharedService.languages.subscribe(languages => {
      this.siteLanguages = languages;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.currentLanguage = this.sharedService.siteLanguages.find(lang => lang.title === language).name;
      this.sharedService.onLanguageChanges(language, 'menuTitle');
    });
    this.sharedService.siteDirection.subscribe(direction => {
      this.siteDirection = direction;
    });
    this.sharedService.menuTitles.subscribe(titles => {
      this.menuTitles = titles;
    });
  }

  onLanguageChange(): void {
    document.getElementById('language-dropdown')!.blur();
    this.sharedService.setLanguage(
      this.sharedService.siteLanguages.find(lang => lang.name === this.currentLanguage)!.title
    );
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      this.window.pageYOffset || this.cDocument.documentElement.scrollTop || this.cDocument.body.scrollTop || 0;
    if (offset > 50) {
      this.isNavbarShow = true;
    } else {
      this.isNavbarShow = false;
    }
  }
  ngOnInit() {
    this.config = this.configService.configData;
  }
  ngAfterViewInit() {
    // set theme on startup
    if (sessionStorage.getItem('theme')) {
      if (sessionStorage.getItem('theme') === 'dark') {
        this.renderer.removeClass(this.cDocument.body, 'menu_light');
        this.renderer.addClass(this.cDocument.body, 'menu_dark');
        this.isDarkTheme = true;
      } else {
        this.renderer.addClass(this.cDocument.body, 'menu_light');
        this.renderer.removeClass(this.cDocument.body, 'menu_dark');
        this.isDarkTheme = false;
      }
      this.renderer.removeClass(this.cDocument.body, this.config.layout.variant);
      this.renderer.addClass(this.cDocument.body, sessionStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.cDocument.body, this.config.layout.variant);
    }

    if (sessionStorage.getItem('menuOption')) {
      this.renderer.addClass(this.cDocument.body, sessionStorage.getItem('menuOption'));
    } else {
      this.renderer.addClass(this.cDocument.body, 'menu_' + this.config.layout.sidebar.backgroundColor);
    }

    if (sessionStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(this.cDocument.body, sessionStorage.getItem('choose_logoheader'));
    } else {
      this.renderer.addClass(this.cDocument.body, 'logo-' + this.config.layout.logo_bg_color);
    }

    if (sessionStorage.getItem('sidebar_status')) {
      if (sessionStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.cDocument.body, 'side-closed');
        this.renderer.addClass(this.cDocument.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.cDocument.body, 'side-closed');
        this.renderer.removeClass(this.cDocument.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.cDocument.body, 'side-closed');
        this.renderer.addClass(this.cDocument.body, 'submenu-closed');
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.cDocument.body, className);
    } else {
      this.renderer.addClass(this.cDocument.body, className);
    }
  }
  public toggleRightSidebar(): void {
    this.subs.sink = this.rightSidebarService.sidebarState.subscribe(isRunning => {
      this.isOpenSidebar = isRunning;
    });
    if (this.isDarkTheme) {
      this.lightThemeBtnClick();
      this.isDarkTheme = false;
    } else {
      this.darkThemeBtnClick();
      this.isDarkTheme = true;
    }
    this.rightSidebarService.setRightSidebar((this.isOpenSidebar = !this.isOpenSidebar));
  }

  lightThemeBtnClick() {
    this.renderer.removeClass(this.cDocument.body, 'dark');
    this.renderer.removeClass(this.cDocument.body, 'submenu-closed');
    this.renderer.removeClass(this.cDocument.body, 'menu_dark');
    this.renderer.removeClass(this.cDocument.body, 'logo-black');
    this.renderer.addClass(this.cDocument.body, 'light');
    this.renderer.addClass(this.cDocument.body, 'submenu-closed');
    this.renderer.addClass(this.cDocument.body, 'menu_light');
    this.renderer.addClass(this.cDocument.body, 'logo-white');
    const theme = 'light';
    const menuOption = 'menu_light';
    sessionStorage.setItem('choose_logoheader', 'logo-white');
    sessionStorage.setItem('choose_skin', 'theme-black');
    sessionStorage.setItem('theme', theme);
    sessionStorage.setItem('menu_option', menuOption);
  }
  darkThemeBtnClick() {
    this.renderer.removeClass(this.cDocument.body, 'light');
    this.renderer.removeClass(this.cDocument.body, 'submenu-closed');
    this.renderer.removeClass(this.cDocument.body, 'menu_light');
    this.renderer.removeClass(this.cDocument.body, 'logo-white');
    this.renderer.addClass(this.cDocument.body, 'dark');
    this.renderer.addClass(this.cDocument.body, 'submenu-closed');
    this.renderer.addClass(this.cDocument.body, 'menu_dark');
    this.renderer.addClass(this.cDocument.body, 'logo-black');

    const theme = 'dark';
    const menuOption = 'menu_dark';
    sessionStorage.setItem('choose_logoheader', 'logo-black');
    sessionStorage.setItem('choose_skin', 'theme-black');
    sessionStorage.setItem('theme', theme);
    sessionStorage.setItem('menu_option', menuOption);
  }
}
