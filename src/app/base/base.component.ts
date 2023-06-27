import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
constructor(private spinner: NgxSpinnerService) {}

showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);

    setTimeout(()=>this.hideSpinner(spinnerNameType),700);
  }
  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}


export enum SpinnerType{
  Ballatom ="s1",
  Ballscalemultiple = "s2",
  Ballspinclockwisefaderotating = "s3"
}