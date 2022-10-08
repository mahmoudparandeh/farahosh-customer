import { Component, Renderer2 } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FileManagerService } from '../file-manager.service';
import { FileManager } from '../file-manager.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-manager-list',
  templateUrl: './file-manager-list.component.html',
  styleUrls: ['./file-manager-list.component.sass'],
})
export class FileManagerListComponent {
  currentPage = 1;
  total = 1;
  pageSize = 12;
  fileManagerTitles: any;
  language = 'fa';
  files: FileManager[] = [];
  fileType = 'video';
  filterController = new FormControl('', {
    nonNullable: true,
  });
  progress = 0;
  isUploading = false;
  filters;
  constructor(
    private sharedService: SharedService,
    private renderer: Renderer2,
    private fileManagerService: FileManagerService
  ) {
    this.getFiles();
    this.sharedService.fileManagerTitles.subscribe(titles => {
      this.fileManagerTitles = titles;
      this.filters = [
        {
          value: '',
          name: this.fileManagerTitles.all,
        },
        {
          value: 'Video',
          name: this.fileManagerTitles.video,
        },
        {
          value: 'Image',
          name: this.fileManagerTitles.image,
        },
      ];
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'fileManagerTitle');
    });
    this.sharedService.fileManagerTitles.subscribe(titles => {
      this.fileManagerTitles = titles;
    });
    this.fileManagerService.files.subscribe(files => {
      this.files = files;
    });
    this.fileManagerService.totalFiles.subscribe(total => {
      this.total = total;
    });
    this.fileManagerService.shouldRefresh.subscribe(value => {
      if (value) {
        this.getFiles();
      }
    });
  }

  getFiles(): void {
    this.fileManagerService.getFiles(this.filterController.value, this.currentPage);
  }

  setFileType(type: string): void {
    this.fileType = type;
  }

  uploadFile(event): void {
    const file: File = event.target.files[0];
    if (file.type.includes('image')) {
      if (file.size / 1024 > 300 * 1024) {
        Swal.fire({
          icon: 'error',
          text: this.fileManagerTitles.image_size_error,
        });
        return;
      }
    } else if (file.type.includes('video')) {
      if (file.size / 1024 > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          text: this.fileManagerTitles.video_size_error,
        });
        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: this.fileManagerTitles.file_type_error,
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    this.fileManagerService.uploadFile(formData).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.UploadProgress: {
          const element = document.getElementById('upload-progress');
          this.renderer.removeClass(element, 'invisible');
          this.renderer.addClass(element, 'visible');
          this.progress = Math.round((response.loaded / response.total) * 100);
          break;
        }
        case HttpEventType.Response: {
          const element = document.getElementById('upload-progress');
          this.renderer.removeClass(element, 'visible');
          this.renderer.addClass(element, 'invisible');
          this.getFiles();
        }
      }
    });
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.getFiles();
  }
}
