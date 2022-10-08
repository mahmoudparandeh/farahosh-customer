import { Component, Input } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { TicketListModel } from '../ticket-list.model';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.sass'],
})
export class TicketItemComponent {
  language = 'fa';
  ticketListTitles: any;
  userRFQTitles: any;
  @Input() ticket: TicketListModel;
  constructor(private sharedService: SharedService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'ticketListTitle');
    });
    this.sharedService.ticketListTitles.subscribe(titles => {
      this.ticketListTitles = titles;
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'userRFQTitle');
    });
    this.sharedService.userRFQTitles.subscribe(titles => {
      this.userRFQTitles = titles;
    });
  }
}
