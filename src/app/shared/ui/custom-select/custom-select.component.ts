import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.sass'],
})
export class CustomSelectComponent {
  @Input() title = '';
  // @Input() control = new FormControl();
  @Input() list: any;
  @Input() id = '0';
  @Output() itemId = new EventEmitter<number>();
  openSelect = false;
  selectedItem: any;

  constructor() {}

  selectItem(item: any) {
    this.openSelect = false;
    this.selectedItem = item;
    this.itemId.emit(item.value);
  }
}
