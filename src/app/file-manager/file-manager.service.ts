import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { FileManager } from './file-manager.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/shared.service';
import * as moment from 'jalali-moment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  apiTitles: any;
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
  }

  //#region APIs
  private baseUrlFileManager = '/api/v1/VendorVendor/GetPageByPageVendorFiles';
  private baseUrlFileUpload = '/api/v1/VendorVendor/uploadFile';
  private baseUrlFileDelete = '/api/v1/VendorVendor/DeleteFile/';
  //#endregion

  //#region Properties
  files = new BehaviorSubject<FileManager[]>([]);
  shouldRefresh = new BehaviorSubject<boolean>(false);
  totalFiles = new BehaviorSubject<number>(0);
  currentPage = new ReplaySubject<number>();
  type = new ReplaySubject<string>();
  //#endregion

  //#region Methods
  getFiles(type: string, page: number): void {
    const options = JSON.stringify({ PageSize: 12, PageNumber: page });
    if (type && type !== '') {
      this.httpClient
        .get(this.baseUrlFileManager, {
          headers: {
            type,
            value: options,
          },
        })
        .subscribe((response: any) => {
          const files: FileManager[] = [];
          this.totalFiles.next(response.jsonResult.Data.rowcount);
          for (const item of response.jsonResult.Data.vendorvendor) {
            const file: FileManager = item;
            file.Path = environment.apiUrl + file.Path;
            if (this.sharedService.language === 'fa') {
              file.UploadDate = moment(file.UploadDate).format('jYYYY/jM/jD HH:MM:ss');
            } else {
              file.UploadDate = moment(file.UploadDate).format('YYYY/M/D HH:MM:ss');
            }
            file.Size =
              Math.round(+file.Size / 1024) > 1024
                ? Math.round(+file.Size / 1024 / 1024) + ' MB'
                : Math.round(+file.Size / 1024) + ' KB';
            files.push(file);
          }
          this.files.next(files);
        });
    } else {
      this.httpClient
        .get(this.baseUrlFileManager, {
          headers: {
            value: options,
          },
        })
        .subscribe((response: any) => {
          const files: FileManager[] = [];
          this.totalFiles.next(response.jsonResult.Data.rowcount);
          for (const item of response.jsonResult.Data.vendorvendor) {
            const file: FileManager = item;
            file.Path = environment.apiUrl + file.Path;
            if (this.sharedService.language === 'fa') {
              file.UploadDate = moment(file.UploadDate).format('jYYYY/jM/jD HH:MM:ss');
            } else {
              file.UploadDate = moment(file.UploadDate).format('YYYY/M/D HH:MM:ss');
            }
            file.Size =
              Math.round(+file.Size / 1024) > 1024
                ? Math.round(+file.Size / 1024 / 1024) + ' MB'
                : Math.round(+file.Size / 1024) + ' KB';
            files.push(file);
          }
          this.files.next(files);
        });
    }
  }

  uploadFile(data: FormData): Observable<any> {
    return this.httpClient.post(this.baseUrlFileUpload, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteFile(fileId: string): void {
    this.httpClient.delete(this.baseUrlFileDelete + fileId).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.delete,
      });
      this.shouldRefresh.next(true);
    });
  }
  //#endregion
}
