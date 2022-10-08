import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Value } from '../../models/value.model';
import { SharedService } from '../../shared/shared.service';
import { ProductService } from '../../product/product.service';
import { AutocompleteValue } from '../../core/models/autoComplete.model';
import { ProductItemModel } from '../../product/models/product-item.model';
import { TranslationService } from '../translate-panel.service';
import Swal from 'sweetalert2';
let otherDetailsFrom = '';
let otherDetailsTo = '';
@Component({
  selector: 'app-product-translation-page',
  templateUrl: './product-translation-page.component.html',
  styleUrls: ['./product-translation-page.component.sass'],
})
export class ProductTranslationPageComponent implements OnInit {
  productTitles: any;
  languageTitles: any;
  apiTitles: any;
  fromLanguageController = new FormControl('');
  toLanguageController = new FormControl('');
  productName = '';
  productGuid = 0;
  currentFromLanguage = 'فارسی';
  currentToLanguage = 'انگلیسی';
  currentFromLanguageTitle = 'fa';
  currentToLanguageTitle = 'en';
  languages = this.translationService.translationLanguages;
  products: AutocompleteValue[] = [];
  tags: any;
  productSearchController = new FormControl('');

  productNameFromController = new FormControl('');
  productNameToController = new FormControl('');
  productShortDescriptionFromController = new FormControl('');
  productShortDescriptionToController = new FormControl('');
  productFullDescriptionFromController = new FormControl('');
  productFullDescriptionToController = new FormControl('');
  productMetaDescriptionFromController = new FormControl('');
  productMetaDescriptionToController = new FormControl('');
  productMetaKeywordsFromController = new FormControl('');
  productMetaKeywordsToController = new FormControl('');
  productMetaTitleFromController = new FormControl('');
  productMetaTitleToController = new FormControl('');
  productContractFromController = new FormControl('');
  productContractToController = new FormControl('');

  faqAnswerFromControllers = [];
  faqAnswerToControllers = [];
  faqQuestionFromControllers = [];
  faqQuestionToControllers = [];

  tagsFromControllers = [];
  tagsToControllers = [];

  product: ProductItemModel;
  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private translationService: TranslationService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'languageTitle');
      this.currentFromLanguage = this.languages.find(l => l.value === language).name;
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productTitles = titles;
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
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.fromLanguageController.setValue(this.languages[0].value);
    this.toLanguageController.setValue(this.languages[1].value);
    this.productSearchController.valueChanges.subscribe(data => {
      if (data.length > 0) {
        this.productService.getSearchProduct(1, data);
      }
    });
    this.productService.searchProductList.subscribe(products => {
      this.products = [];
      for (const item of products) {
        this.products.push({
          value: item.ProductGuid,
          name: item.ProductName[this.sharedService.language],
        });
      }
    });
    this.productService.productTranslation.subscribe((product: any) => {
      this.product = product.Detail;
      this.tags = product.Tag;
      console.log(this.tags);
      this.setFAQControllers(product.Detail, this.currentFromLanguageTitle, this.currentToLanguageTitle);
      this.setTagsControllers(product.Tag, this.currentFromLanguageTitle, this.currentToLanguageTitle);
      this.setFromControllers(product.Detail, this.currentFromLanguageTitle);
      this.setToControllers(product.Detail, this.currentToLanguageTitle);
    });
  }

  getDataFrom() {
    return otherDetailsFrom;
  }

  productFromChanged(thisObj, text): void {
    otherDetailsFrom = text;
  }

  getDataTo() {
    return otherDetailsTo;
  }

  productToChanged(thisObj, text): void {
    otherDetailsTo = text;
  }

  setFAQControllers(product, fromLanguage, toLanguage): void {
    this.faqAnswerFromControllers = [];
    this.faqAnswerToControllers = [];
    this.faqQuestionFromControllers = [];
    this.faqQuestionToControllers = [];
    if (product.FAQ) {
      for (const faq of product.FAQ) {
        this.faqAnswerFromControllers.push(new FormControl(faq.answer ? faq.answer[fromLanguage] : ''));
        this.faqAnswerToControllers.push(new FormControl(faq.answer ? faq.answer[toLanguage] : ''));
        this.faqQuestionFromControllers.push(new FormControl(faq.question ? faq.question[fromLanguage] : ''));
        this.faqQuestionToControllers.push(new FormControl(faq.question ? faq.question[toLanguage] : ''));
      }
    }
  }

  setTagsControllers(tags, fromLanguage, toLanguage): void {
    this.tagsFromControllers = [];
    this.tagsToControllers = [];
    let max = -1;
    for (const key in tags) {
      if (tags[key].length > max) {
        max = tags[key].length;
      }
    }
    for (let i = 0; i < max; i++) {
      this.tagsFromControllers.push(new FormControl(''));
      this.tagsToControllers.push(new FormControl(''));
    }
    for (const key in tags) {
      if (key === fromLanguage) {
        let index = 0;
        for (const tag of tags[key]) {
          this.tagsFromControllers[index].setValue(tag);
          index++;
        }
      } else if (key === toLanguage) {
        let index = 0;
        for (const tag of tags[key]) {
          this.tagsToControllers[index].setValue(tag);
          index++;
        }
      }
    }
  }

  setFromControllers(product, language): void {
    try {
      this.productNameFromController.setValue(product.Name[language]);
    } catch {}
    try {
      this.productShortDescriptionFromController.setValue(product.ShortDescription[language]);
    } catch {}
    try {
      this.productFullDescriptionFromController.setValue(product.FullDescription[language]);
    } catch {}
    try {
      this.productMetaDescriptionFromController.setValue(product.MetaDescription[language]);
    } catch {}
    try {
      this.productMetaKeywordsFromController.setValue(product.MetaKeywords[language]);
    } catch {}
    try {
      this.productMetaTitleFromController.setValue(product.MetaTitle[language]);
    } catch {}
    try {
      this.productContractFromController.setValue(product.UserAgreementText[language]);
    } catch {}
    try {
      otherDetailsFrom = product.OtherDetails[language];
    } catch {}
  }

  setToControllers(product, language): void {
    try {
      this.productNameToController.setValue(product.Name[language]);
    } catch {}
    try {
      this.productShortDescriptionToController.setValue(product.ShortDescription[language]);
    } catch {}
    try {
      this.productFullDescriptionToController.setValue(product.FullDescription[language]);
    } catch {}
    try {
      this.productMetaDescriptionToController.setValue(product.MetaDescription[language]);
    } catch {}
    try {
      this.productMetaKeywordsToController.setValue(product.MetaKeywords[language]);
    } catch {}
    try {
      this.productMetaTitleToController.setValue(product.MetaTitle[language]);
    } catch {}
    try {
      this.productContractToController.setValue(product.UserAgreementText[language]);
    } catch {}
    try {
      otherDetailsTo = product.OtherDetails[language];
    } catch {}
  }

  ngOnInit(): void {}

  onFromLanguageChanged(thisObj, data): void {
    thisObj.currentFromLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.currentFromLanguageTitle = data;
    thisObj.setFromControllers(thisObj.product, data);
    thisObj.setFAQControllers(thisObj.product, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
    thisObj.setTagsControllers(thisObj.tags, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
  }

  onToLanguageChanged(thisObj, data): void {
    thisObj.currentToLanguage = thisObj.languages.find(l => l.value === data).name;
    thisObj.currentToLanguageTitle = data;
    thisObj.setToControllers(thisObj.product, data);
    thisObj.setFAQControllers(thisObj.product, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
    thisObj.setTagsControllers(thisObj.tags, thisObj.currentFromLanguageTitle, thisObj.currentToLanguageTitle);
  }

  onProductSelected(thisObj, target): void {
    thisObj.productGuid = target;
    thisObj.productName = thisObj.productSearchController.value;
    thisObj.productService.getProductByGuidTranslator(target);
  }

  translate(): void {
    if (this.productNameFromController.value && this.productNameFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.productNameFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productNameToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.productShortDescriptionFromController.value &&
      this.productShortDescriptionFromController.value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.productShortDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productShortDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.productFullDescriptionFromController.value &&
      this.productFullDescriptionFromController.value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.productFullDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productFullDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (
      this.productMetaDescriptionFromController.value &&
      this.productMetaDescriptionFromController.value.trim() !== ''
    ) {
      this.translationService
        .translate(
          this.productMetaDescriptionFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productMetaDescriptionToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.productMetaKeywordsFromController.value && this.productMetaKeywordsFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.productMetaKeywordsFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productMetaKeywordsToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.productMetaTitleFromController.value && this.productMetaTitleFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.productMetaTitleFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productMetaTitleToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (this.productContractFromController.value && this.productContractFromController.value.trim() !== '') {
      this.translationService
        .translate(
          this.productContractFromController.value,
          this.fromLanguageController.value,
          this.toLanguageController.value
        )
        .subscribe((response: any) => {
          this.productContractToController.setValue(response.jsonResult.Data.translator);
        });
    }
    if (otherDetailsFrom && otherDetailsFrom.trim() !== '') {
      this.translationService
        .translate(otherDetailsFrom, this.fromLanguageController.value, this.toLanguageController.value)
        .subscribe((response: any) => {
          otherDetailsTo = response.jsonResult.Data.translator;
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
    for (let i = 0; i < this.tagsFromControllers.length; i++) {
      if (this.tagsFromControllers[i].value && this.tagsFromControllers[i].value.trim() !== '') {
        this.translationService
          .translate(
            this.tagsFromControllers[i].value,
            this.fromLanguageController.value,
            this.toLanguageController.value
          )
          .subscribe((response: any) => {
            this.tagsToControllers[i].setValue(response.jsonResult.Data.translator);
          });
      }
    }
  }

  onSubmit(): void {
    const toLanguage = this.toLanguageController.value;
    const Language = this.fromLanguageController.value;
    for (let key in this.product.Name) {
      if (key === this.toLanguageController.value) {
        this.product.Name[key] = this.productNameToController.value;
      } else {
        this.product.Name[toLanguage] = this.productNameToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.Name[key] = this.productNameFromController.value;
      } else {
        this.product.Name[Language] = this.productNameFromController.value;
      }
    }
    for (let key in this.product.ShortDescription) {
      if (key === this.toLanguageController.value) {
        this.product.ShortDescription[key] = this.productShortDescriptionToController.value;
      } else {
        this.product.ShortDescription[toLanguage] = this.productShortDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.ShortDescription[key] = this.productShortDescriptionFromController.value;
      } else {
        this.product.ShortDescription[Language] = this.productShortDescriptionFromController.value;
      }
    }
    for (let key in this.product.FullDescription) {
      if (key === this.toLanguageController.value) {
        this.product.FullDescription[key] = this.productFullDescriptionToController.value;
      } else {
        this.product.FullDescription[toLanguage] = this.productFullDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.FullDescription[key] = this.productFullDescriptionFromController.value;
      } else {
        this.product.FullDescription[Language] = this.productFullDescriptionFromController.value;
      }
    }
    for (let key in this.product.MetaDescription) {
      if (key === this.toLanguageController.value) {
        this.product.MetaDescription[key] = this.productMetaDescriptionToController.value;
      } else {
        this.product.MetaDescription[toLanguage] = this.productMetaDescriptionToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.MetaDescription[key] = this.productMetaDescriptionFromController.value;
      } else {
        this.product.MetaDescription[Language] = this.productMetaDescriptionFromController.value;
      }
    }
    for (let key in this.product.MetaKeywords) {
      if (key === this.toLanguageController.value) {
        this.product.MetaKeywords[key] = this.productMetaKeywordsToController.value;
      } else {
        this.product.MetaKeywords[toLanguage] = this.productMetaKeywordsToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.MetaKeywords[key] = this.productMetaKeywordsFromController.value;
      } else {
        this.product.MetaKeywords[Language] = this.productMetaKeywordsFromController.value;
      }
    }
    for (let key in this.product.MetaTitle) {
      if (key === this.toLanguageController.value) {
        this.product.MetaTitle[key] = this.productMetaTitleToController.value;
      } else {
        this.product.MetaTitle[toLanguage] = this.productMetaTitleToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.MetaTitle[key] = this.productMetaTitleFromController.value;
      } else {
        this.product.MetaTitle[Language] = this.productMetaTitleFromController.value;
      }
    }
    for (let key in this.product.UserAgreementText) {
      if (key === this.toLanguageController.value) {
        this.product.UserAgreementText[key] = this.productContractToController.value;
      } else {
        this.product.UserAgreementText[toLanguage] = this.productContractToController.value;
      }
      if (key === this.fromLanguageController.value) {
        this.product.UserAgreementText[key] = this.productContractFromController.value;
      } else {
        this.product.UserAgreementText[Language] = this.productContractFromController.value;
      }
    }
    for (let key in this.product.OtherDetails) {
      if (key === this.toLanguageController.value) {
        this.product.OtherDetails[key] = otherDetailsTo;
      } else {
        this.product.OtherDetails[toLanguage] = otherDetailsTo;
      }
      if (key === this.fromLanguageController.value) {
        this.product.OtherDetails[key] = otherDetailsFrom;
      } else {
        this.product.OtherDetails[Language] = otherDetailsFrom;
      }
    }
    if (this.product.FAQ) {
      for (let i = 0; i < this.product.FAQ.length; i++) {
        for (let key in this.product.FAQ[i].answer) {
          if (key === this.toLanguageController.value) {
            this.product.FAQ[i].answer[key] = this.faqAnswerToControllers[i].value;
            this.product.FAQ[i].question[key] = this.faqQuestionToControllers[i].value;
          } else {
            this.product.FAQ[i].answer[toLanguage] = this.faqAnswerToControllers[i].value;
            this.product.FAQ[i].question[toLanguage] = this.faqQuestionToControllers[i].value;
          }
          if (key === this.fromLanguageController.value) {
            this.product.FAQ[i].answer[key] = this.faqAnswerFromControllers[i].value;
            this.product.FAQ[i].question[key] = this.faqQuestionFromControllers[i].value;
          } else {
            this.product.FAQ[i].answer[Language] = this.faqAnswerFromControllers[i].value;
            this.product.FAQ[i].question[Language] = this.faqQuestionFromControllers[i].value;
          }
        }
      }
    }
    const data = {
      ProductGuid: this.productGuid,
      Name: this.product.Name,
      ShortDescription: this.product.ShortDescription,
      FullDescription: this.product.FullDescription,
      MetaDescription: this.product.MetaDescription,
      MetaKeywords: this.product.MetaKeywords,
      MetaTitle: this.product.MetaTitle,
      FAQ: this.product.FAQ,
      UserAgreementText: this.product.UserAgreementText,
      OtherDetails: this.product.OtherDetails,
    };
    this.productService.productCustomUpdate(data).subscribe(_ => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
    const tagsFromValue = [];
    for (const item of this.tagsFromControllers) {
      tagsFromValue.push(item.value);
    }
    const tagsToValue = [];
    for (const item of this.tagsToControllers) {
      tagsToValue.push(item.value);
    }
    this.tags[Language] = tagsFromValue;
    this.tags[toLanguage] = tagsToValue;
    this.productService.updateProductTags(this.product.ProductGuid, this.tags).subscribe(_ => {
      this.productService.getProductByGuid(this.product.ProductGuid);
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
    });
  }
}
