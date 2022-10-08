import { Component, Input } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})
export class EditorComponent {
  BaseUrl = 'https://webservice.com';
  @Input() onChanged;
  @Input() text = '';
  @Input() id = '';
  @Input() title = '';
  @Input() others;
  language = this.sharedService.language;
  options = {
    key: 'gVG3C-8H2G1A5A4C3E2ud1BI1IMNBUMRWAi1AYMSTRBUZYB-16D4E3D2B2C3I2E1B10C2B2==',
    direction: 'auto',
    language: this.language,
    requestHeaders: {
      Authorization: 'Bearer  ' + window.sessionStorage.getItem('token'),
    },
    toolbarButtons: [
      [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'fontFamily',
        'fontSize',
        'textColor',
        'backgroundColor',
        'clearFormatting',
      ],
      [
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'formatOL',
        'formatUL',
        'paragraphFormat',
        'paragraphStyle',
        'lineHeight',
        'outdent',
        'indent',
        'quote',
      ],
      ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'specialCharacters'],
      ['undo', 'redo', 'fullscreen', 'spellChecker', 'selectAll', 'html'],
    ],
    imageManagerLoadMethod: 'GET',
    imageManagerLoadURL: this.BaseUrl + '/api/v1/panel/upload',
    charCounterCount: true,
    // Set the image upload parameter.
    videoUpload: true,
    videoUploadMethod: 'POST',
    videoUploadParam: 'file',
    videoUploadURL: this.BaseUrl + '/api/v1/panel/upload',
    videoMaxSize: 1024 * 1024 * 50,
    videoAllowedTypes: ['mp4'],
    imageUploadParam: 'file',
    // Set the image upload URL.
    imageUploadURL: this.BaseUrl + '/api/v1/panel/upload',
    // Additional upload params.
    // imageUploadParams: {id: 'my_editor'},
    // Set request type.
    imageUploadMethod: 'POST',
    // Set max image size to 5MB.
    imageMaxSize: 2 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'svg'],
    quickInsertEnabled: false,
    events: {
      'froalaEditor.initialized'() {
        console.log('initialized');
      },
      'froalaEditor.image.beforeUpload'(e, editor, images) {
        // Your code
        if (images.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = ev => {
            const result = ev.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        return false;
      },
    },
  };

  onChange() {
    setTimeout(() => {
      this.onChanged(this.others, this.text);
    }, 50);
  }

  constructor(private sharedService: SharedService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.options.language = language;
    });
  }
}
