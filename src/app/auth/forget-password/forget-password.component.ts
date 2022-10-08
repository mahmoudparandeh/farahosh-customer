import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../account/account.service';
import { ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordTitles: any;
  apiTitles: any;
  emailController = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  constructor(
    private sharedService: SharedService,
    private accountService: AccountService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'forgetPasswordTitle');
    });
    this.sharedService.forgetPasswordTitles.subscribe(titles => {
      this.forgetPasswordTitles = titles;
    });
  }

  ngOnInit(): void {}

  forgetPassword(): void {
    if (!this.emailController.errors) {
      this.recaptchaV3Service.execute(environment.captchaKey, 'Login', token => {
        this.accountService.forgetPassword(this.emailController.value, token).subscribe(response => {
          Swal.fire({
            icon: 'success',
            text: response.jsonResult.Message,
          });
        });
      });
    } else {
      let error = '';
      if (this.emailController.hasError('required')) {
        error += this.forgetPasswordTitles.email_required + '<br>';
      }
      if (this.emailController.hasError('email')) {
        error += this.forgetPasswordTitles.email_invalid + '<br>';
      }
      Swal.fire({
        title: 'Forget Password',
        html: error,
        icon: 'error',
      });
    }
  }
}
