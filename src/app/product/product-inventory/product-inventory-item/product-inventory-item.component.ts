import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';
import { ProductInventoryPrice } from '../../models/product.inventory.price.model';

@Component({
  selector: 'app-product-inventory-item',
  templateUrl: './product-inventory-item.component.html',
  styleUrls: ['./product-inventory-item.component.sass'],
})
export class ProductInventoryItemComponent implements OnInit {
  @Input() product: ProductInventoryPrice;
  productInventoryListTitles: any;
  newProductPriceTitles: any;
  productInventoryTitles: any;
  language = 'fa';
  alertTitles: any;
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'productInventoryTitle');
    });
    this.sharedService.productInventoryListTitles.subscribe(titles => {
      this.productInventoryListTitles = titles;
    });
    this.sharedService.productInventoryTitles.subscribe(titles => {
      this.productInventoryTitles = titles;
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

  ngOnInit(): void {
    // console.log(this.product);
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

  onEdit(): void {
    this.productService.isEditInventory.next({ isEdit: true, id: this.product.Id });
    window.scroll(0, 0);
  }
}
