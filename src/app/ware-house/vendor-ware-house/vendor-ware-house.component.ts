import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { WarehouseModel } from '../warehouse.model';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-vendor-ware-house',
  templateUrl: './vendor-ware-house.component.html',
  styleUrls: ['./vendor-ware-house.component.sass'],
})
export class VendorWareHouseComponent {
  language = 'fa';
  wareHousesListTitles: any;
  warehouseList: WarehouseModel[] = [];

  currentPage = 1;
  total = 1;
  pageSize = 12;

  constructor(private sharedService: SharedService, private warehouseService: WarehouseService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'wareHousesListTitle');
      this.warehouseService.getWarehouseList();
    });
    this.sharedService.wareHousesListTitles.subscribe(titles => {
      this.wareHousesListTitles = titles;
    });
    // this.getWarehouseList();
    this.warehouseService.warehouseList.subscribe((warehouseList: WarehouseModel[]) => {
      this.warehouseList = warehouseList;
    });
  }

  getWarehouseList() {
    this.warehouseService.getWarehouseListPageByPage(this.currentPage);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getWarehouseList();
  }
}
