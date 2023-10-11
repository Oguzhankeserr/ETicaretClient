import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';
import { MessageType } from '../admin/alertify.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              const url = this.router.url;
              debugger
              if (url == "/products") {
                debugger
                this.toastrService.message("Sepete ürün eklemek için oturum açma gerekli.", "Oturum açık değil!", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              } else {
                debugger
                this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.BottomFullWidth
                });
              }
            }
          }).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor!", "Sunucu Hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!", "Geçeriz istek!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı!", "Sayfa Bulunamadı", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata oluştu!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;

      }

      this.spinner.hide(SpinnerType.Ballatom);
      return of(error);
    }));
  }
}
