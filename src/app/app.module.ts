import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { JwtModule } from '@auth0/angular-jwt';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@NgModule({
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    FileUploadModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: ()=> localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7199"]
      }
    }),
    SocialLoginModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective,
  ],
  providers: [
    {provide:"baseUrl",useValue: "https://localhost:7199/api",multi:true },
    {provide: "baseSignalRUrl", useValue:  "https://localhost:7199/",multi:true },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("881468319710-7fcqcf12srfjpk9netqjl2e3k4vnvjsf.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide: HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
