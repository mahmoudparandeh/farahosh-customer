import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Value} from "../../models/value.model";
import {SharedService} from "../../shared/shared.service";
import {NotificationService} from "../notification.service";
import {Utility} from "../../shared/helper/util";
import moment from 'jalali-moment';

@Component({
  selector: 'app-notification-list-page',
  templateUrl: './notification-list-page.component.html',
  styleUrls: ['./notification-list-page.component.sass']
})
export class NotificationListPageComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;
  total = 1;
  messages = [];
  language = 'fa';
  searchController = new FormControl('');
  searchProductController = new FormControl('');
  searchCodeController = new FormControl('');
  searchStatusController = new FormControl('');
  searchFromDateController = new FormControl('');
  searchToDateController = new FormControl('');
  statusValues: Value[] = [
    {
      value: 0,
      name: 'ارسال شده توسط فرهوش',
    },
    {
      value: 1,
      name: 'خوانده شده توسط کاربر'
    }
  ];

  constructor(private sharedService: SharedService, private notificationService: NotificationService) {
    this.sharedService.currentLanguage.subscribe((language) => {
      this.language = language;
    });
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: this.currentPage,
    });
    this.notificationService.getMessageList(options);
    this.notificationService.totalMessage.subscribe((total) => {
      this.total = total;
    });
    this.notificationService.messageList.subscribe((messages) => {
      this.messages = messages;
    });
  }

  isNumber(event: any): boolean {
    return Utility.isNumber(event);
  }

  pageChanged(event): void {
    this.currentPage = event;
    this.onFilter(false);
  }

  onFilter(fromFilter: boolean): void {
    if (fromFilter) {
      this.currentPage = 1;
    }
    const data = {
      PageSize: 10,
      PageNumber: this.currentPage,
      Id: this.searchCodeController.value,
      Status: this.searchStatusController.value,
      SearchKey: encodeURIComponent(this.searchController.value),
      StartDate: moment(this.searchFromDateController.value, 'jYYYY/jM/jD').format('YYYY-M-D'),
      EndDate: moment(this.searchToDateController.value, 'jYYYY/jM/jD').format('YYYY-M-D')
    };
    if (this.searchCodeController.value === '') {
      delete data.Id;
    }
    if (this.searchStatusController.value === '') {
      delete data.Status;
    }
    if (this.searchController.value === '') {
      delete data.SearchKey;
    }
    if (this.searchFromDateController.value === '') {
      delete data.StartDate;
    }
    if (this.searchToDateController.value === '') {
      delete data.EndDate;
    }
    const options = JSON.stringify(data);
    this.notificationService.getMessageList(options);
  }

  ngOnInit(): void {
  }

}
