import { Component, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './service/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import {ComponentType } from '../app/services/common/dynamic-load-component.service'
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, {static:true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(
    public authService:AuthService,
    private toastrService:CustomToastrService,
    private router:Router,
    private dynamicLoadComponentService: DynamicLoadComponentService){
    
      authService.identityCheck();
     }

     signOut(){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.authService.identityCheck();
      this.router.navigate([""]);
      this.toastrService.message("Oturum kapatılmıştır!","Oturum Kapatılı",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRight
      });
     }

     loadComponent(){
      this.dynamicLoadComponentService.loadComponent(
        ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
     }
}

