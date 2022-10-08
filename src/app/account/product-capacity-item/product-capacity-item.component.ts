import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { Unit } from '../../shared/models/unit.model';
import { Value } from '../../models/value.model';

@Component({
  selector: 'app-product-capacity-item',
  templateUrl: './product-capacity-item.component.html',
  styleUrls: ['./product-capacity-item.component.sass'],
})
export class ProductCapacityItemComponent {
  @Input() from = new FormControl('');
  @Input() to = new FormControl('');
  @Input() unit = new FormControl('');
  @Input() time = new FormControl('');
  productCapacityTitles: any;
  units: Value[] = [];
  constructor(private sharedService: SharedService) {
    this.sharedService.productionCapacityTitles.subscribe(titles => {
      this.productCapacityTitles = titles;
    });
    this.sharedService.units.subscribe(units => {
      for (const unit of units) {
        this.units.push({
          value: unit.Id,
          name: unit.Name,
        });
      }
    });
  }

  isNumber(event: any): boolean {
    const key = event.keyCode || event.charCode;
    if ((key > 47 && key < 59) || key === 110 || key === 190) {
      return true;
    } else {
      return false;
    }
  }
}
