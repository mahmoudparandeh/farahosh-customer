import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FileManagerService } from '../file-manager.service';
import { FileManager } from '../file-manager.model';
import Swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-manager-modal',
  templateUrl: './file-manager-modal.component.html',
  styleUrls: ['./file-manager-modal.component.sass'],
})
export class FileManagerModalComponent implements OnInit {
  @Input() type = 'Image';
  @Input() onFileSelected: Function;
  @Input() other;
  @Input() id = 'id';
  @Input() index;
  @Input() currentPage = 1;
  @Input() isOpen = false;
  total = 0;
  pageSize = 12;
  progress = 0;
  fileManagerTitles: any;
  fileType = 'video';
  files: FileManager[] = [];
  file: File = null;
  constructor(
    private sharedService: SharedService,
    private renderer: Renderer2,
    private fileManagerService: FileManagerService
  ) {
    this.sharedService.currentLanguage.subscribe(language => {
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
    this.fileManagerService.currentPage.subscribe(page => {
      this.currentPage = page;
    });
    this.fileManagerService.type.subscribe(type => {
      if (this.type !== type) {
        this.files = [];
        this.total = 0;
      }
      this.fileType = type.toLowerCase();
      this.currentPage = 1;
      this.type = type;
      this.getFiles();
    });
  }

  ngOnInit(): void {
    this.fileType = this.type.toLowerCase();
    this.getFiles();
  }

  closeModal(): void {
    const element = document.getElementById('modal');
    this.renderer.removeClass(element, 'show');
  }

  getFiles(): void {
    this.fileManagerService.getFiles(this.type, this.currentPage);
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

  fileSelected(index: number): void {
    this.onFileSelected(this.other, this.files[index], this.id);
    this.closeModal();
  }

  pageChanged(event: number): void {
    this.currentPage = event;
    this.fileManagerService.currentPage.next(event);
    this.getFiles();
  }
}
