import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Observable, firstValueFrom } from "rxjs";
import { BaseUrl } from "src/app/contratcs/users/base_url";

@Injectable({
    providedIn:'root'
})
export class FileService {
    constructor(private httpClientService: HttpClientService){}

    async getBaseStorageUrl() : Promise<BaseUrl>{
        debugger
        const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
            controller:"files",
            action: "GetBaseUrl"
        });
        return await firstValueFrom(getObservable);
        
    }

    async getLocalStorageUrl() : Promise<BaseUrl>{
        debugger
        const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
            controller:"files",
            action:"GetLocalUrl"
        });
      
        debugger
        return await firstValueFrom(getObservable);
    }
}