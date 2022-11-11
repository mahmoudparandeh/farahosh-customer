import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent implements OnInit {

  @Input() datepickerInput = new FormControl();
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
