import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
})
export class StepperComponent {
  productDetailsTitles: any;
  language = 'fa';
  // activeTab = 1;
  isEdit = false;
  productGuid = '';
  @Input() activeTab: any;
  @Output() activatedTab = new EventEmitter<number>();
  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.isEdit = this.activatedRoute.snapshot.params.id !== undefined;
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
  }

  changeTab(currentTab: number) {
    this.productService.productGuid.subscribe(id => {
      this.productGuid = id;
    });
    if (this.productGuid !== '') {
      this.activatedTab.emit(currentTab);
    }
    // this.activatedTab.emit(currentTab);
  }
}
