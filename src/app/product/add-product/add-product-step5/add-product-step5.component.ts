import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-step5',
  templateUrl: './add-product-step5.component.html',
  styleUrls: ['./add-product-step5.component.sass'],
})
export class AddProductStep5Component {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() guid;
  activeTab = 5;
  language = 'fa';
  profileTitles: any;
  apiTitles: any;
  productDetailsTitles: any;
  capacityControllers = [
    {
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    },
  ];
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
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.productService.product.subscribe(product => {
      // console.log(product);
      if (product.Detail.ProductionCapacity && product.Detail.ProductionCapacity.length > 0) {
        this.capacityControllers = [];
      } else {
        this.capacityControllers[0].from.setValue('');
        this.capacityControllers[0].to.setValue('');
        this.capacityControllers[0].unit.setValue('');
        this.capacityControllers[0].time.setValue('');
      }
      for (const capacity of product.Detail.ProductionCapacity) {
        this.capacityControllers.push({
          from: new FormControl(capacity.from, Validators.required),
          to: new FormControl(capacity.to, Validators.required),
          unit: new FormControl(capacity.unit, Validators.required),
          time: new FormControl(capacity.time, Validators.required),
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
    const productionCapacity = [];
    for (const capacity of this.capacityControllers) {
      if (!capacity.time.errors && !capacity.to.errors && !capacity.from.errors && !capacity.unit.errors) {
        productionCapacity.push({
          time: capacity.time.value,
          to: capacity.to.value,
          from: capacity.from.value,
          unit: capacity.unit.value,
        });
      }
    }
    const data = {
      ProductGuid: this.guid,
      ProductionCapacity: productionCapacity,
    };
    this.productService.productCustomUpdate(data).subscribe(response => {
      this.productService.getProductByGuid(this.guid);
      window.scrollTo(0, 0);
      this.activatedTab.emit(6);
    });
  }

  createCapacity(): void {
    const capacity = {
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    };
    this.capacityControllers.push(capacity);
  }

  deleteCapacity(index: number): void {
    this.capacityControllers.splice(index, 1);
  }
}
