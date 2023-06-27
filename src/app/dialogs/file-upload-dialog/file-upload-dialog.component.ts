import { Component } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Inject} from '@angular/core'

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent>{
 constructor(
  dialogRef:MatDialogRef<FileUploadDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState){
  super(dialogRef)
 }
}

export enum FileUploadDialogState{
  Yes, No
}