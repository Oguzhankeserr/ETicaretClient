import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contratcs/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { List_Order } from 'src/app/contratcs/order/list.order';
import { SingleOrder } from 'src/app/contratcs/order/single_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
    controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void,
   errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number;
     orders: List_Order[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: List_Order[] }> =
     this.httpCLientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async getOrderById(id: string,successCallBack?: () => void,
  errorCallBack?: (errorMessage: string) => void){
    const observable : Observable<SingleOrder> = this.httpCLientService.get<SingleOrder>({
      controller:"orders"
    },id);
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))

      return await promiseData;
  }
}