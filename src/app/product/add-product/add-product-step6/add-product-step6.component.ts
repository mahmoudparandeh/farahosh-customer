import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';
import { ProductDetail } from '../../models/product-item.model';

@Component({
  selector: 'app-add-product-step6',
  templateUrl: './add-product-step6.component.html',
  styleUrls: ['./add-product-step6.component.sass'],
})
export class AddProductStep6Component {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() guid;
  activeTab = 6;
  language = 'fa';
  profileTitles: any;
  productDetailsTitles: any;
  apiTitles: any;
  faqControllers = [
    {
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    },
  ];
  product: ProductDetail;
  constructor(private router: Router, private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
      this.sharedService.onLanguageChanges(language, 'profileTranslatorTitle');
      this.sharedService.onLanguageChanges(language, 'productionCapacityTitle');
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.productService.product.subscribe(product => {
      this.product = product;
      if (product.Detail.FAQ.length > 0) {
        this.faqControllers = [];
      } else {
        this.faqControllers[0].question.setValue('');
        this.faqControllers[0].answer.setValue('');
      }
      for (const faq of product.Detail.FAQ) {
        this.faqControllers.push({
          question: new FormControl(faq.question.fa, Validators.required),
          answer: new FormControl(faq.answer.fa, Validators.required),
        });
      }
    });
  }

  goBack() {
    if (this.activeTab > 1) {
      this.activeTab -= 1;
      this.activatedTab.emit(this.activeTab);
    } else {
      this.router.navigate(['/', this.language, 'product', 'list']);
    }
  }

  onSubmit() {
    if (this.product.Detail.FAQ === null) {
      this.product.Detail.FAQ = [];
    }
    const faqs = [];
    for (let i = 0; i < this.faqControllers.length; i++) {
      faqs.push({
        answer: {
          fa: this.faqControllers[i].answer.value,
        },
        question: {
          fa: this.faqControllers[i].question.value,
        },
      });
    }
    for (let i = 0; i < faqs.length; i++) {
      if (this.product.Detail.FAQ.length < faqs.length && i > this.product.Detail.FAQ.length - 1) {
        this.product.Detail.FAQ.push({
          answer: faqs[i].answer,
          question: faqs[i].question,
        });
      } else {
        this.product.Detail.FAQ[i].answer.fa = faqs[i].answer.fa;
        this.product.Detail.FAQ[i].question.fa = faqs[i].question.fa;
      }
    }
    const data = {
      ProductGuid: this.guid,
      FAQ: this.product.Detail.FAQ,
    };
    this.productService.productCustomUpdate(data).subscribe(response => {
      this.productService.getProductByGuid(this.guid);
      window.scrollTo(0, 0);
      this.activatedTab.emit(7);
    });
  }

  createFAQ(): void {
    const faq = {
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    };
    this.faqControllers.push(faq);
  }

  deleteFAQ(index: number): void {
    this.faqControllers.splice(index, 1);
    this.product.Detail.FAQ.splice(index, 1);
  }
}
