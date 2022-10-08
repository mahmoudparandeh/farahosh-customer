import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2';
import moment from 'jalali-moment';
import { SharedService } from '../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { TicketListService } from '../ticket-list.service';

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.sass'],
})
export class TicketChatComponent implements OnInit {
  @ViewChild('scroll') private myScrollContainer: ElementRef | undefined;
  title = '';
  apiTitles: any;
  language = 'fa';
  userRFQTitles: any;
  chat = new FormControl('', {
    nonNullable: true,
  });
  chats: any[] = [];
  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private ticketListService: TicketListService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'userRFQTitle');
    });
    this.sharedService.userRFQTitles.subscribe(titles => {
      this.userRFQTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.getVendorRFQChats();
  }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.params.name;
  }
  getVendorRFQChats() {
    this.chats = [];
    this.ticketListService.getVendorRFQChat(this.activatedRoute.snapshot.params.id).subscribe(response => {
      for (const ticket of response.jsonResult.Data.ticketitem) {
        if (this.language === 'fa') {
          ticket.CreatedOnUtc = moment(ticket.CreatedOnUtc).format('jYYYY/jM/jD HH:MM:ss');
        } else {
          ticket.CreatedOnUtc = moment(ticket.CreatedOnUtc).format('YYYY/M/D HH:MM:ss');
        }
        this.chats.push(ticket);
      }
      setTimeout(() => {
        // tslint:disable-next-line:no-non-null-assertion
        this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
      }, 100);
    });
  }

  sendTicketReply(): void {
    if (this.chat.value.trim() !== '') {
      this.ticketListService
        .sendTicketReply(this.activatedRoute.snapshot.params.id, this.chat.value)
        .subscribe(response => {
          this.getVendorRFQChats();
          this.chat.setValue('');
        });
    }
  }
}
