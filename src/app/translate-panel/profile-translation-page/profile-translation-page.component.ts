import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormControl } from '@angular/forms';
import { Value } from '../../models/value.model';
import { TranslationService } from '../translate-panel.service';
import { AccountService } from '../../account/account.service';
import { Faq } from '../../models/faq.model';
import { Profile } from '../../account/profile/profile.model';
import Swal from 'sweetalert2';
let fullProfileFrom = '';
let fullProfileTo = '';
@Component({
  selector: 'app-profile-translation-page',
  templateUrl: './profile-translation-page.component.html',
  styleUrls: ['./profile-translation-page.component.sass'],
})
export class ProfileTranslationPageComponent implements OnInit {
  profileTranslatorTitles: any;
  languageTitles: any;
  apiTitles: any;
  fromLanguageController = new FormControl('');
  toLanguageController = new FormControl('');
  currentFromLanguage = 'فارسی';
  currentToLanguage = 'انگلیسی';
  currentFromLanguageTitle = 'fa';
  currentToLanguageTitle = 'en';
  languages = this.translationService.translationLanguages;
  faqs: Faq[] = [];
  nameFromController = new FormControl<string>('');
  nameToController = new FormControl<string>('');
  subjectFromController = new FormControl<string>('');
  subjectToController = new FormControl<string>('');
  shortDescriptionFromController = new FormControl<string>('');
  shortDescriptionToController = new FormControl<string>('');
  metaDescriptionFromController = new FormControl<string>('');
  metaDescriptionToController = new FormControl<string>('');
  metaKeywordsFromController = new FormControl<string>('');
  metaKeywordsToController = new FormControl<string>('');
  metaTitleFromController = new FormControl<string>('');
  metaTitleToController = new FormControl<string>('');
  fullDescriptionFromController = new FormControl<string>('');
  fullDescriptionToController = new FormControl<string>('');
  contactPersonFromController = new FormControl<string>('');
  contactPersonToController = new FormControl<string>('');
  legalStatusFromController = new FormControl<string>('');
  legalStatusToController = new FormControl<string>('');
  typeOfBusinessProductsFromController = new FormControl<string>('');
  typeOfBusinessProductsToController = new FormControl<string>('');
  referencesFromController = new FormControl<string>('');
  referencesToController = new FormControl<string>('');

  faqAnswerFromControllers = [];
  faqAnswerToControllers = [];
  faqQuestionFromControllers = [];
  faqQuestionToControllers = [];

  profile: Profile;
  constructor(
    private sharedService: SharedService,
    private accountService: AccountService,
    private translationService: TranslationService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'profileTranslatorTitle');
      this.sharedService.onLanguageChanges(language, 'languageTitle');
      this.currentFromLanguage = this.languages.find(l => l.value === language).name;
    });
    this.sharedService.languageTitles.subscribe(titles => {
      this.languageTitles = titles;
      this.languages[0].name = this.languageTitles.persian;
      this.languages[1].name = this.languageTitles.english;
      this.languages[2].name = this.languageTitles.arabic;
      this.languages[3].name = this.languageTitles.french;
      this.currentFromLanguage = this.languageTitles.persian;
      this.currentToLanguage = this.languageTitles.english;
    });
    this.accountService.getProfileTranslator();
    this.accountService.profile.subscribe(profile => {
      this.profile = profile;
      this.setFAQControllers(profile, this.currentFromLanguageTitle, this.currentToLanguageTitle);
      this.setFromControllers(profile, this.currentFromLanguageTitle);
      this.setToControllers(profile, this.currentToLanguageTitle);
    });
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTranslatorTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.fromLanguageController.setValue(this.languages[0].value);
    this.toLanguageController.setValue(this.languages[1].value);
  }

  setFromControllers(profile, language): void {
    try {
      fullProfileFrom = profile.FullProfile[language] ?? '';
    } catch {}
    try {
      this.nameFromController.setValue(profile.FullName[language] ? profile.FullName[language].toString() ?? '' : '');
    } catch {}
    try {
      this.subjectFromController.setValue(profile.Subject[language] ? profile.Subject[language].toString() ?? '' : '');
    } catch {}
    try {
      this.metaTitleFromController.setValue(
        profile.MetaTitle[language] ? profile.MetaTitle[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.shortDescriptionFromController.setValue(
        profile.ShortDescription[language] ? profile.ShortDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.metaDescriptionFromController.setValue(
        profile.MetaDescription[language] ? profile.MetaDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.fullDescriptionFromController.setValue(
        profile.FullDescription[language] ? profile.FullDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.metaKeywordsFromController.setValue(
        profile.MetaKeywords[language] ? profile.MetaKeywords[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.contactPersonFromController.setValue(
        profile.ContactPerson[language] ? profile.ContactPerson[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.legalStatusFromController.setValue(
        profile.LegalStatus[language] ? profile.LegalStatus[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.referencesFromController.setValue(
        profile.Refrences[language] ? profile.Refrences[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.typeOfBusinessProductsFromController.setValue(
        profile.BusinessType[language] ? profile.BusinessType[language].toString() ?? '' : ''
      );
    } catch {}
  }

  setToControllers(profile, language): void {
    try {
      fullProfileTo = profile.FullProfile[language] ?? '';
    } catch {}
    try {
      this.nameToController.setValue(profile.FullName[language] ? profile.FullName[language].toString() ?? '' : '');
    } catch {}
    try {
      this.subjectToController.setValue(profile.Subject[language] ? profile.Subject[language].toString() ?? '' : '');
    } catch {}
    try {
      this.metaTitleToController.setValue(
        profile.MetaTitle[language] ? profile.MetaTitle[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.shortDescriptionToController.setValue(
        profile.ShortDescription[language] ? profile.ShortDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.metaDescriptionToController.setValue(
        profile.MetaDescription[language] ? profile.MetaDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.fullDescriptionToController.setValue(
        profile.FullDescription[language] ? profile.FullDescription[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.metaKeywordsToController.setValue(
        profile.MetaKeywords[language] ? profile.MetaKeywords[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.contactPersonToController.setValue(
        profile.ContactPerson[language] ? profile.ContactPerson[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.legalStatusToController.setValue(
        profile.LegalStatus[language] ? profile.LegalStatus[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.referencesToController.setValue(
        profile.Refrences[language] ? profile.Refrences[language].toString() ?? '' : ''
      );
    } catch {}
    try {
      this.typeOfBusinessProductsToController.setValue(
        profile.BusinessType[language] ? profile.BusinessType[language].toString() ?? '' : ''
      );
    } catch {}
  }

  setFAQControllers(profile, fromLanguage, toLanguage): void {
    this.faqs = [];
    this.faqAnswerFromControllers = [];
    this.faqAnswerToControllers = [];
    this.faqQuestionFromControllers = [];
    this.faqQuestionToControllers = [];
    for (const faq of profile.FAQ) {
      this.faqs.push(faq);
      this.faqAnswerFromControllers.push(new FormControl(faq.answer ? faq.answer[fromLanguage] : ''));
      this.faqAnswerToControllers.push(new FormControl(faq.answer ? faq.answer[toLanguage] : ''));
      this.faqQuestionFromControllers.push(new FormControl(faq.question ? faq.question[fromLanguage] : ''));
      this.faqQuestionToControllers.push(new FormControl(faq.question ? faq.question[toLanguage] : ''));
    }
  }

  ngOnInit(): void {}

  getDataFrom() {
    return fullProfileFrom;
  }

  profileFromChanged(thisObj, text): void {
    fullProfileFrom = text;
  }

  getDataTo() {
    return fullProfileTo;
  }

  profileToChanged(thisObj, text): void {
    fullProfileTo = text;
  }

  onFromLanguageChanged(thisObj, data): void {
    thisObj.currentFromLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.currentFromLanguageTitle = data;
    thisObj.setFromControllers(thisObj.profile, thisObj.currentFromLanguageTitle);
    thisObj.setFAQControllers(thisObj.profile, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
  }

  onToLanguageChanged(thisObj, data): void {
    thisObj.currentToLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.currentToLanguageTitle = data;
    thisObj.setToControllers(thisObj.profile, thisObj.currentToLanguageTitle);
    thisObj.setFAQControllers(thisObj.profile, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
  }

  translate(): void {
    if (this.nameFromController.value && this.nameFromController.value.trim() !== '') {
      this.translationService
        .translate(this.nameFromController.value, this.fromLanguageController.value, this.toLanguageController.value)
        .subscribe((response: any) => {
          this.nameToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.subjectFromController.value && this.subjectFromController.value.trim() !== '') {
      this.translationService
        .translate(this.subjectFromController.value, this.fromLanguageController.value, this.toLanguageController.value)
        .subscribe((response: any) => {
          this.subjectToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.shortDescriptionFromController.value && this.shortDescriptionFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.shortDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.shortDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.metaDescriptionFromController.value && this.metaDescriptionFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.metaDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.metaDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.metaKeywordsFromController.value && this.metaKeywordsFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.metaKeywordsFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.metaKeywordsToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.metaTitleFromController.value && this.metaTitleFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.metaTitleFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.metaTitleToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.fullDescriptionFromController.value && this.fullDescriptionFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.fullDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.fullDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.contactPersonFromController.value && this.contactPersonFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.contactPersonFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.contactPersonToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.legalStatusFromController.value && this.legalStatusFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.legalStatusFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.legalStatusToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.typeOfBusinessProductsFromController.value &&
      this.typeOfBusinessProductsFromController.value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.typeOfBusinessProductsFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.typeOfBusinessProductsToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.referencesFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.referencesFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.referencesToController.setValue(response.jsonResult.Data.translator);
        });
    }
    for (let i = 0; i < this.faqAnswerFromControllers.length; i++) {
      if (this.faqAnswerFromControllers[i].value && this.faqAnswerFromControllers[i].value.trim() !== '') {
        this.translationService
          .translate(
            this.faqAnswerFromControllers[i].value,
            this.fromLanguageController.value,
            this.toLanguageController.value
          )
          .subscribe((response: any) => {
            this.faqAnswerToControllers[i].setValue(response.jsonResult.Data.translator);
          });
      }
      if (this.faqQuestionFromControllers[i].value && this.faqQuestionFromControllers[i].value.trim() !== '') {
        this.translationService
          .translate(
            this.faqQuestionFromControllers[i].value,
            this.fromLanguageController.value,
            this.toLanguageController.value
          )
          .subscribe((response: any) => {
            this.faqQuestionToControllers[i].setValue(response.jsonResult.Data.translator);
          });
      }
    }
    if (fullProfileFrom && fullProfileFrom.trim() !== '') {
      this.translationService
        .translate(fullProfileFrom, this.fromLanguageController.value, this.toLanguageController.value)
        .subscribe((response: any) => {
          fullProfileTo = response.jsonResult.Data.translator;
        });
    }
  }

  onSubmit(): void {
    const toLanguage = this.toLanguageController.value;
    const Language = this.fromLanguageController.value;
    for (let key in this.profile.BusinessType) {
      if (key === this.toLanguageController.value) {
        this.profile.BusinessType[key] = this.typeOfBusinessProductsToController.value;
      } else {
        this.profile.BusinessType[toLanguage] = this.typeOfBusinessProductsToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.BusinessType[key] = this.typeOfBusinessProductsFromController.value;
      } else {
        this.profile.BusinessType[Language] = this.typeOfBusinessProductsFromController.value;
      }
    }
    for (let key in this.profile.ContactPerson) {
      if (key === this.toLanguageController.value) {
        this.profile.ContactPerson[key] = this.contactPersonToController.value;
      } else {
        this.profile.ContactPerson[toLanguage] = this.contactPersonToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.ContactPerson[key] = this.contactPersonFromController.value;
      } else {
        this.profile.ContactPerson[Language] = this.contactPersonFromController.value;
      }
    }
    for (let key in this.profile.FullDescription) {
      if (key === this.toLanguageController.value) {
        this.profile.FullDescription[key] = this.fullDescriptionToController.value;
      } else {
        this.profile.FullDescription[toLanguage] = this.fullDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.FullDescription[key] = this.fullDescriptionFromController.value;
      } else {
        this.profile.FullDescription[Language] = this.fullDescriptionFromController.value;
      }
    }
    for (let key in this.profile.FullName) {
      if (key === this.toLanguageController.value) {
        this.profile.FullName[key] = this.nameToController.value;
      } else {
        this.profile.FullName[toLanguage] = this.nameToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.FullName[key] = this.nameFromController.value;
      } else {
        this.profile.FullName[Language] = this.nameFromController.value;
      }
    }
    for (let key in this.profile.LegalStatus) {
      if (key === this.toLanguageController.value) {
        this.profile.LegalStatus[key] = this.legalStatusToController.value;
      } else {
        this.profile.LegalStatus[toLanguage] = this.legalStatusToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.LegalStatus[key] = this.legalStatusFromController.value;
      } else {
        this.profile.LegalStatus[Language] = this.legalStatusFromController.value;
      }
    }
    for (let key in this.profile.MetaDescription) {
      if (key === this.toLanguageController.value) {
        this.profile.MetaDescription[key] = this.metaDescriptionToController.value;
      } else {
        this.profile.MetaDescription[toLanguage] = this.metaDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.MetaDescription[key] = this.metaDescriptionFromController.value;
      } else {
        this.profile.MetaDescription[Language] = this.metaDescriptionFromController.value;
      }
    }
    for (let key in this.profile.MetaKeywords) {
      if (key === this.toLanguageController.value) {
        this.profile.MetaKeywords[key] = this.metaKeywordsToController.value;
      } else {
        this.profile.MetaKeywords[toLanguage] = this.metaKeywordsToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.MetaKeywords[key] = this.metaKeywordsFromController.value;
      } else {
        this.profile.MetaKeywords[Language] = this.metaKeywordsFromController.value;
      }
    }
    for (let key in this.profile.MetaTitle) {
      if (key === this.toLanguageController.value) {
        this.profile.MetaTitle[key] = this.metaTitleToController.value;
      } else {
        this.profile.MetaTitle[toLanguage] = this.metaTitleToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.MetaTitle[key] = this.metaTitleFromController.value;
      } else {
        this.profile.MetaTitle[Language] = this.metaTitleFromController.value;
      }
    }
    for (let key in this.profile.Refrences) {
      if (key === this.toLanguageController.value) {
        this.profile.Refrences[key] = this.referencesToController.value;
      } else {
        this.profile.Refrences[toLanguage] = this.referencesToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.Refrences[key] = this.referencesFromController.value;
      } else {
        this.profile.Refrences[Language] = this.referencesFromController.value;
      }
    }
    for (let key in this.profile.ShortDescription) {
      if (key === this.toLanguageController.value) {
        this.profile.ShortDescription[key] = this.shortDescriptionToController.value;
      } else {
        this.profile.ShortDescription[toLanguage] = this.shortDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.ShortDescription[key] = this.shortDescriptionFromController.value;
      } else {
        this.profile.ShortDescription[Language] = this.shortDescriptionFromController.value;
      }
    }
    for (let key in this.profile.Subject) {
      if (key === this.toLanguageController.value) {
        this.profile.Subject[key] = this.subjectToController.value;
      } else {
        this.profile.Subject[toLanguage] = this.subjectToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.Subject[key] = this.subjectFromController.value;
      } else {
        this.profile.Subject[Language] = this.subjectFromController.value;
      }
    }
    for (let key in this.profile.FullProfile) {
      if (key === this.toLanguageController.value) {
        this.profile.FullProfile[key] = fullProfileTo;
      } else {
        this.profile.FullProfile[toLanguage] = fullProfileTo;
      }
      if (key === this.fromLanguageController.value) {
        this.profile.FullProfile[key] = fullProfileFrom;
      } else {
        this.profile.FullProfile[Language] = fullProfileFrom;
      }
    }
    for (let i = 0; i < this.profile.FAQ.length; i++) {
      for (let key in this.profile.FAQ[i].answer) {
        if (key === this.toLanguageController.value) {
          this.profile.FAQ[i].answer[key] = this.faqAnswerToControllers[i].value;
          this.profile.FAQ[i].question[key] = this.faqQuestionToControllers[i].value;
        } else {
          this.profile.FAQ[i].answer[toLanguage] = this.faqAnswerToControllers[i].value;
          this.profile.FAQ[i].question[toLanguage] = this.faqQuestionToControllers[i].value;
        }
        if (key === this.fromLanguageController.value) {
          this.profile.FAQ[i].answer[key] = this.faqAnswerFromControllers[i].value;
          this.profile.FAQ[i].question[key] = this.faqQuestionFromControllers[i].value;
        } else {
          this.profile.FAQ[i].answer[Language] = this.faqAnswerFromControllers[i].value;
          this.profile.FAQ[i].question[Language] = this.faqQuestionFromControllers[i].value;
        }
      }
    }
    const data = {
      BusinessType: this.profile.BusinessType,
      ContactPerson: this.profile.ContactPerson,
      FullDescription: this.profile.FullDescription,
      FullName: this.profile.FullName,
      LegalStatus: this.profile.LegalStatus,
      MetaDescription: this.profile.MetaDescription,
      MetaKeywords: this.profile.MetaKeywords,
      MetaTitle: this.profile.MetaTitle,
      Refrences: this.profile.Refrences,
      FullProfile: this.profile.FullProfile,
      ShortDescription: this.profile.ShortDescription,
      Subject: this.profile.Subject,
      FAQ: this.profile.FAQ,
    };
    this.accountService.customUpdateProfile(data).subscribe(_ => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
  }
}
