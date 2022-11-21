import { Component, OnInit } from '@angular/core';
import {Message} from "../models/notification.model";
import {SharedService} from "../../shared/shared.service";
import {NotificationService} from "../notification.service";
import {ActivatedRoute} from "@angular/router";
import moment from 'jalali-moment';

@Component({
  selector: 'app-message-details-page',
  templateUrl: './message-details-page.component.html',
  styleUrls: ['./message-details-page.component.sass']
})
export class MessageDetailsPageComponent implements OnInit {
  message: Message;
  language = 'fa';
  direction = 'rtl';
  constructor(private sharedService: SharedService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
    this.sharedService.currentLanguage.subscribe((language) => {
      this.language = language;
    });
    this.sharedService.siteDirection.subscribe((direction) => {
      this.direction = direction;
    });
    this.notificationService.getMessage(this.activatedRoute.snapshot.params.id.toString()).subscribe((response: any) => {
      this.message = response.jsonResult.Data.Message;
      if (this.sharedService.language === 'fa') {
        this.message.CreatedOnUtc = moment(this.message.CreatedOnUtc).format('jYYYY/jM/jD HH:MM:ss');
      } else {
        this.message.CreatedOnUtc = moment(this.message.CreatedOnUtc).format('YYYY/M/D HH:MM:ss');
      }
    });
  }

  ngOnInit(): void {
  }

}
