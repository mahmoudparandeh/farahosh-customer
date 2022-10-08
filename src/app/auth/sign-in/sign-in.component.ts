import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { AccountService } from '../../account/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent {
  menuTitles: any;
  loginTitles: any;
  currentLanguage = 'فارسی';
  siteLanguages = this.sharedService.siteLanguages;
  emailController = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  passwordController = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  rememberMe = new FormControl<boolean>(false, {
    nonNullable: true,
  });
  loginForm: FormGroup = this.formBuilder.group({
    emailController: this.emailController,
    passwordController: this.passwordController,
    rememberMe: this.rememberMe,
  });
  captchaKey = environment.captchaKey;
  // isPending = false;
  constructor(
    private sharedService: SharedService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'menuTitle');
      this.sharedService.onLanguageChanges(language, 'loginTitle');
    });
    this.sharedService.menuTitles.subscribe(titles => {
      this.menuTitles = titles;
    });
    this.sharedService.loginTitles.subscribe(titles => {
      this.loginTitles = titles;
    });
    this.currentLanguage = this.sharedService.siteLanguages.find(
      lang => lang.title === this.sharedService.language
    )!.name;
  }

  onLanguageChange(): void {
    document.getElementById('language-dropdown')!.blur();
    this.sharedService.setLanguage(
      this.sharedService.siteLanguages.find(lang => lang.name === this.currentLanguage)!.title
    );
  }

  login(): void {
    // this.isPending = true;
    this.loginForm.markAllAsTouched();
    if (!this.emailController.errors && !this.passwordController.errors) {
      this.recaptchaV3Service.execute(environment.captchaKey, 'Login', token => {
        this.accountService.login(
          this.emailController.value,
          this.passwordController.value,
          this.rememberMe.value,
          token,
          true
        );
        // this.isPending = false;
      });
    } else {
      // this.isPending = false;
      let error = '';
      if (this.emailController.hasError('required')) {
        error += this.loginTitles.email_required + '<br>';
      }
      if (this.emailController.hasError('email')) {
        error += this.loginTitles.email_invalid + '<br>';
      }
      if (this.passwordController.hasError('required')) {
        error += this.loginTitles.password_required + '<br>';
      }
      Swal.fire({
        title: 'Login',
        html: error,
        icon: 'error',
      });
    }
  }
}
