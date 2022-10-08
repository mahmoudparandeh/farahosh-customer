import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormFieldComponent } from './ui/form-field/form-field.component';
import { FormSelectComponent } from './ui/form-select/form-select.component';
import { FormAutocompleteComponent } from './ui/form-autocomplete/form-autocomplete.component';
import { FormCheckboxComponent } from './ui/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './ui/form-radio/form-radio.component';
import { FormTextareaComponent } from './ui/form-textarea/form-textarea.component';
import { CountryCodeComponent } from './ui/country-code/country-code.component';
import { EditorComponent } from './ui/editor/editor.component';
import { NgxFroalaModule } from 'ngx-froala';
import { UploadProgressComponent } from './ui/upload-progress/upload-progress.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileManagerModalComponent } from '../file-manager/file-manager-modal/file-manager-modal.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeCategoryComponent } from './tree-category/tree-category.component';
import { CheckboxComponent } from './tree-category/checkbox/checkbox.component';
import { HsCodeTreeViewComponent } from './hs-code-tree-view/hs-code-tree-view.component';
import { CustomSelectComponent } from './ui/custom-select/custom-select.component';
import { CustomModalComponent } from './ui/custom-modal/custom-modal.component';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    FormFieldComponent,
    FormSelectComponent,
    FormAutocompleteComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormTextareaComponent,
    CountryCodeComponent,
    EditorComponent,
    UploadProgressComponent,
    FileManagerModalComponent,
    TreeViewComponent,
    TreeCategoryComponent,
    CheckboxComponent,
    HsCodeTreeViewComponent,
    CustomSelectComponent,
    CustomModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxFroalaModule,
    NgxCaptchaModule,
    NgxPaginationModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxFroalaModule,
    NgxCaptchaModule,
    SafeHtmlPipe,
    FormFieldComponent,
    FormSelectComponent,
    FormAutocompleteComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormTextareaComponent,
    CountryCodeComponent,
    EditorComponent,
    UploadProgressComponent,
    NgxPaginationModule,
    FileManagerModalComponent,
    TreeViewComponent,
    TreeCategoryComponent,
    HsCodeTreeViewComponent,
    CustomSelectComponent,
    CustomModalComponent,
  ],
})
export class SharedModule {}
