import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import Swal from 'sweetalert2';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass'],
})
export class ProductItemComponent implements OnInit {
  language = 'fa';
  apiTitles: any;
  productListTitles: any;
  alertTitles: any;
  @Input() product: ProductModel;
  @Input() currentPage: number;
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productListTitle');
      this.sharedService.onLanguageChanges(language, 'alertTitle');
    });
    this.sharedService.productListTitle.subscribe(titles => {
      this.productListTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
  }

  onDelete() {
    Swal.fire({
      title: this.alertTitles.are_you_sure_delete,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_delete_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.product.ProductGuid).subscribe((response: any) => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: this.apiTitles.delete,
          });
          this.productService.getSearchProduct(this.currentPage, '');
        });
      }
    });
  }

  ngOnInit(): void {
    switch (this.product.StatusId) {
      case 0: {
        this.product.Color = 'green';
        break;
      }
      case 1: {
        this.product.Color = 'purple';
        break;
      }
      case 2: {
        this.product.Color = 'red';
        break;
      }
      case 3: {
        this.product.Color = 'orange';
        break;
      }
      case 4: {
        this.product.Color = 'blue';
        break;
      }
      case 5: {
        this.product.Color = 'medium-gray';
        break;
      }
    }
  }
}
