import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerListComponent } from './file-manager-list/file-manager-list.component';
import { SharedModule } from '../shared/shared.module';
import { FileManagerItemComponent } from './file-manager-list/file-manager-item/file-manager-item.component';

@NgModule({
  declarations: [FileManagerListComponent, FileManagerItemComponent],
  imports: [CommonModule, FileManagerRoutingModule, SharedModule],
})
export class FileManagerModule {}
