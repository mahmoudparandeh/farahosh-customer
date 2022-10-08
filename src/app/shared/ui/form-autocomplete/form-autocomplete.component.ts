import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.sass'],
})
export class FormAutocompleteComponent implements OnInit {
  @Input() title = '';
  @Input() control = new FormControl();
  @Input() list: any;
  @Input() onSelected: Function | undefined;
  @Input() object: Object | undefined;
  @Input() id = '0';
  constructor() {}

  ngOnInit(): void {}

  setValue(event: any): void {
    this.control.setValue(event.name, {
      emitEvent: false,
    });
    if (this.onSelected !== undefined && this.onSelected !== null) {
      this.onSelected(this.object, event.value);
    }
    setTimeout(() => {
      this.list = [];
    }, 100);
  }

  // setValue(event: any): void {
  //   this.control.setValue(event);
  //   setTimeout(() => {
  //     this.list = [];
  //   }, 100);
  // }
}
