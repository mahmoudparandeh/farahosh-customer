import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { TicketListService } from '../ticket-list.service';
import { TicketListModel } from '../ticket-list.model';
import moment from 'jalali-moment';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.sass'],
})
export class TicketListComponent {
  language = 'fa';
  ticketListTitles: any;
  currentPage = 1;
  pageSize = 10;
  total = 1;
  tickets: TicketListModel[] = [];
  constructor(private sharedService: SharedService, private ticketListService: TicketListService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'ticketListTitle');
      this.getTickets();
    });
    this.sharedService.ticketListTitles.subscribe(titles => {
      this.ticketListTitles = titles;
    });
  }

  getTickets(): void {
    this.tickets = [];
    this.ticketListService.getTicketList(this.currentPage).subscribe((response: any) => {
      this.total = response.jsonResult.Data.rowcount;
      for (const ticket of response.jsonResult.Data.ticket) {
        if (this.language === 'fa') {
          ticket.CreatedOnUtc = moment(ticket.CreatedOnUtc).format('jYYYY/jM/jD HH:MM:ss');
        } else {
          ticket.CreatedOnUtc = moment(ticket.CreatedOnUtc).format('YYYY/M/D HH:MM:ss');
        }
        this.tickets.push(ticket);
      }
    });
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.getTickets();
  }
}
