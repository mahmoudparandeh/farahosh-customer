import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent implements OnInit {

  @Input() datepickerInput = new FormControl();
  @Input() title = '';
  direction = 'rtl';
  constructor(private sharedService: SharedService) {
    this.sharedService.siteDirection.subscribe((dir) => {
      this.direction = dir;
    });
  }

  ngOnInit(): void {
  }

}
