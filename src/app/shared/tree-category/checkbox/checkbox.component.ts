import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
})
export class CheckboxComponent {
  @Input() title = '';
  @Input() control = new FormControl<boolean>(false);
  @Input() id = -1;
  @Input() name: any;
  @Input() checked = false;
  @Output() selectedCategoryId = new EventEmitter<number>();
  @ViewChildren('myItem') item;
  selectedIds = [];
  constructor() {}

  OnCheckboxSelect(id, event) {
    if (event.target.checked === true && id === this.id) {
      this.selectedIds.push({ id, checked: event.target.checked });
      this.selectedCategoryId.emit(id);
    }
    if (event.target.checked === false) {
      this.selectedIds = this.selectedIds.filter(item => item.id !== id);
    }
  }
}
