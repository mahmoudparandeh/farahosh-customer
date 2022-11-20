import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../models/notification.model";
import {SharedService} from "../../shared/shared.service";
import {NotificationService} from "../notification.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-notification-list-item',
  templateUrl: './notification-list-item.component.html',
  styleUrls: ['./notification-list-item.component.sass']
})
export class NotificationListItemComponent implements OnInit {
  @Input() message: Message;
  language = 'fa';
  alertTitles: any;
  apiTitles: any;

  constructor(private sharedService: SharedService, private notificationService: NotificationService) {
    this.sharedService.currentLanguage.subscribe((language) => {
      this.language = language;
    });
    this.sharedService.apiTitles.subscribe((titles) => {
      this.apiTitles = titles;
    });
    this.sharedService.alertTitles.subscribe((titles) => {
      this.alertTitles = titles;
    });
  }

  getStatus(status: number): string {
    switch (status) {
      case 0: { return 'ارسال شده توسط فرهوش'; }
      case 1: { return 'خوانده شده توسط کاربر'; }
    }
  }

  onDelete(): void {
    Swal.fire({
      title: this.alertTitles.are_you_sure,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.alertTitles.cancel_button,
      confirmButtonText: this.alertTitles.confirm_delete_button,
    }).then(result => {
      if (result.isConfirmed) {
        this.notificationService.deleteMessage(this.message.Id.toString()).subscribe(() => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: this.apiTitles.delete,
          });
          const options = JSON.stringify({
            PageSize: 10,
            PageNumber: 1,
          });
          this.notificationService.getMessageList(options);
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
