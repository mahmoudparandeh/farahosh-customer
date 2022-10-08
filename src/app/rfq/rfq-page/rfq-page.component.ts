import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-rfq-page',
  templateUrl: './rfq-page.component.html',
  styleUrls: ['./rfq-page.component.sass']
})
export class RfqPageComponent implements OnInit {
  rfqTitles: any;
  currentTab = 'inquiry';
  constructor(private sharedService: SharedService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.sharedService.onLanguageChanges(language, 'rfqTitle');
    });
    this.sharedService.rfqTitles.subscribe(titles => {
      this.rfqTitles = titles;
    });
  }

  ngOnInit(): void {}

  pageChanged(event): void {}

  setCurrentTab(currentTab: string): void {
    this.currentTab = currentTab;
  }
}
