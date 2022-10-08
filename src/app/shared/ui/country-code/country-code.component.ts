import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.sass'],
})
export class CountryCodeComponent implements OnInit {
  @Input() title: string = '';
  @Input() control = new FormControl();
  @Input() id: string = 'country';
  direction = 'rtl';
  constructor(private sharedService: SharedService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
  }

  ngOnInit(): void {}
}
