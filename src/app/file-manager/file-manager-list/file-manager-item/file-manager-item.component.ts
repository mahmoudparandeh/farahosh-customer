import { Component, Input } from '@angular/core';
import { FileManager } from '../../file-manager.model';
import { SharedService } from '../../../shared/shared.service';
import Swal from 'sweetalert2';
import { FileManagerService } from '../../file-manager.service';

@Component({
  selector: 'app-file-manager-item',
  templateUrl: './file-manager-item.component.html',
  styleUrls: ['./file-manager-item.component.sass'],
})
export class FileManagerItemComponent {
  @Input() file!: FileManager;
  direction = 'rtl';
  alertTitles: any;
  fileManagerTitles: any;
  constructor(private sharedService: SharedService, private fileManagerService: FileManagerService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
    this.sharedService.alertTitles.subscribe(titles => {
      this.alertTitles = titles;
    });
    this.sharedService.fileManagerTitles.subscribe(titles => {
      this.fileManagerTitles = titles;
    });
  }

  deleteFile(): void {
    Swal.fire({
      icon: 'warning',
      text: this.alertTitles.are_you_sure_delete,
      confirmButtonText: this.alertTitles.yes,
      cancelButtonText: this.alertTitles.no,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        this.fileManagerService.deleteFile(this.file.Id);
      }
    });
  }
}
