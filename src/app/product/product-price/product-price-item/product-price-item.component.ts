import { Component, Input } from '@angular/core';
import { ProductPrice } from '../../models/product-price.model';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-price-item',
  templateUrl: './product-price-item.component.html',
  styleUrls: ['./product-price-item.component.sass'],
})
export class ProductPriceItemComponent {
  productPriceListTitles: any;
  newProductPriceTitles: any;
  alertTitles: any;
  language = 'fa';
  @Input() product: ProductPrice;
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.productPriceListTitles.subscribe(titles => {
      this.productPriceListTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.sharedService.newProductPriceTitles.subscribe(titles => {
      this.newProductPriceTitles = titles;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
    });
  }

  onEdit(): void {
    this.productService.getProductPrice(this.product.Id);
    this.productService.isEditPrice.next(true);
    window.scroll(0, 0);
  }

  onDelete(): void {
    Swal.fire({
      title: this.alertTitles.are_you_sure,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_delete_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.deleteProductPrice(this.product.Id, this.product.ProductGuid, 1);
      }
    });
  }
}
