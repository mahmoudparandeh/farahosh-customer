import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.sass'],
})
export class FormCheckboxComponent implements OnInit {
  @Input() title = '';
  @Input() control = new FormControl<boolean>(false);
  @Input() id = 'checkbox';
  constructor() {}

  ngOnInit(): void {}
}
