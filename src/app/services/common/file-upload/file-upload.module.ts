import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'src/app/dialogs/dialog.module';



@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    // DialogModule,
    MatDialogModule, MatButtonModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
