import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService){}
  message(message: string,title: string, ToastrOptions: Partial<ToastrOptions>){
    this.toastr[ToastrOptions.messageType](message,title,{
      positionClass: ToastrOptions.position
    });
  }
}

export class ToastrOptions{
  messageType: ToastrMessageType;
  position: ToastrPosition;
}

export enum ToastrMessageType{
  Success= "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition{
TopRight = "toast-top-right" ,
BottomRight="toast-bottom-right",
BottomLeft="toast-bottom-left",
TopLeft="toast-top-left",
TopFullWidth="toast-top-full-width",
BottomFullWidth="toast-bottom-full-width",
TopCenter="toast-top-center",
BottomCenter="toast-bottom-center"

}