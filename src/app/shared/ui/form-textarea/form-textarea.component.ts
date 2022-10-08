import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.sass'],
})
export class FormTextareaComponent implements OnInit {
  @Input() title: string = '';
  @Input() control = new FormControl();
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() maxLength: number = 2500;
  @Input() id: string = 'title';
  constructor() {}

  ngOnInit(): void {}
}
