import { Component, Input } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { AccountService } from '../../account.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-company-faq',
  templateUrl: './company-faq.component.html',
  styleUrls: ['./company-faq.component.sass'],
})
export class CompanyFaqComponent {
  @Input() controllers;
  profileTitles;
  apiTitles;
  profile: Profile;
  constructor(private sharedService: SharedService, private accountService: AccountService) {
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.accountService.profile.subscribe(profile => {
      this.profile = profile;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  createFAQ(): void {
    const faq = {
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    };
    this.controllers.push(faq);
  }

  deleteFAQ(index: number): void {
    this.controllers.splice(index, 1);
    this.profile.FAQ.splice(index, 1);
  }

  updateProfile(): void {
    if (this.profile.FAQ === null) {
      this.profile.FAQ = [];
    }
    const faqs = [];
    for (let i = 0; i < this.controllers.length; i++) {
      faqs.push({
        answer: {
          fa: this.controllers[i].answer.value,
        },
        question: {
          fa: this.controllers[i].question.value,
        },
      });
    }
    for (let i = 0; i < faqs.length; i++) {
      if (this.profile.FAQ.length < faqs.length && i > this.profile.FAQ.length - 1) {
        this.profile.FAQ.push({
          answer: faqs[i].answer,
          question: faqs[i].question,
        });
      } else {
        this.profile.FAQ[i].answer.fa = faqs[i].answer.fa;
        this.profile.FAQ[i].question.fa = faqs[i].question.fa;
      }
    }
    const vendor = {
      FAQ: this.profile.FAQ,
    };
    this.accountService.customUpdateProfile(vendor).subscribe((response: any) => {
      this.accountService.getProfile();
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
  }
}
