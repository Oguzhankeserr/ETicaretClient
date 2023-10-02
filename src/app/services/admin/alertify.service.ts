import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message: string, messageType: MessageType, position: Position, delay: number =3, dismissOthers:boolean = false)
  message(message: string,options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay',options.delay)
    alertify.set('notifier', 'position',options.position);
    const msj =  alertify[options.messageType](message)
    if(options.dismissOrther)
    msj.dismissOthers();
  }
  
  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOrther:boolean = false;
}


export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}