import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.sass'],
})
export class FormRadioComponent implements OnInit {
  @Input() title: string = '';
  @Input() checked: boolean = false;
  @Input() name: string = '';
  @Input() id: string = '';
  constructor() {}

  ngOnInit(): void {}
}
