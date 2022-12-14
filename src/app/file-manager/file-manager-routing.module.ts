import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerListComponent } from './file-manager-list/file-manager-list.component';

const routes: Routes = [
  {
    path: '',
    component: FileManagerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileManagerRoutingModule {}
