import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.sass'],
})
export class FormFieldComponent implements OnInit {
  @Input() title = '';
  @Input() control = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() maxLength = 2500;
  @Input() id = 'title';
  constructor() {}

  ngOnInit(): void {}
}
