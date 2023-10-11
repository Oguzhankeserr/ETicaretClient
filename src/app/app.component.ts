import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './service/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { FormsModule } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService:AuthService,
    private toastrService:CustomToastrService,
    private router:Router,){
    
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
}

