import { Component, Input } from '@angular/core';
import { WarehouseModel } from '../warehouse.model';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared/shared.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.sass'],
})
export class WarehouseItemComponent {
  @Input() warehouse: WarehouseModel;
  language = 'fa';
  apiTitles: any;
  alertTitles: any;
  wareHousesListTitles: any;

  constructor(private sharedService: SharedService, private warehouseService: WarehouseService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'wareHousesListTitle');
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.sharedService.wareHousesListTitles.subscribe(titles => {
      this.wareHousesListTitles = titles;
    });
  }

  onDelete() {
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
        this.warehouseService.deleteWarehouse(this.warehouse.Id).subscribe((response: any) => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: this.apiTitles.delete,
          });
          this.warehouseService.getWarehouseList();
        });
      }
    });
  }
}
