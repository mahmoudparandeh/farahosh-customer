import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.sass'],
})
export class FormSelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() control = new FormControl();
  @Input() values: any;
  @Input() id: string = '0';
  @Input() selectionChanged!: Function;
  @Input() others!: any;
  direction = 'rtl';
  constructor(private sharedService: SharedService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
  }

  ngOnInit(): void {}

  onSelect(value: any): void {
    if (this.selectionChanged) {
      this.selectionChanged(this.others, value);
    }
  }
}
