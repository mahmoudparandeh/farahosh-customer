import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.sass'],
})
export class UploadProgressComponent {
  @Input() value = 0;
  constructor() {}
}
