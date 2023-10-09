import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    
  ],
  imports: [
    CommonModule, 
    FileUploadModule,
    MatButtonModule, MatDialogModule,MatCardModule,
    FormsModule
  ]
})
export class DialogModule { }
