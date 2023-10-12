import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Order } from 'src/app/constants/order/create_order';
import { List_Basket_Item } from 'src/app/contratcs/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contratcs/basket/update_basket_item';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';

declare var $:any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService:CustomToastrService,
    private router:Router){
    super(spinner)
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void>  {
  this.showSpinner(SpinnerType.Ballatom)
  this.basketItems = await this.basketService.get()
  this.hideSpinner(SpinnerType.Ballatom)
  }

  async changeQuantity(object:any){
    this.showSpinner(SpinnerType.Ballatom)
    const basketItemId = object.target.attributes["id"].value;
    const quantity : number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.Ballatom)
  }

  async removeBasketItem(basketItemId:string) {
    this.showSpinner(SpinnerType.Ballatom);
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, ()=>this.hideSpinner(SpinnerType.Ballatom))
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.Ballatom);
    const order: Create_Order = new Create_Order();
    order.address = "Kültür";
    order.description = "Falan gereksiz..";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.Ballatom);
    this.toastrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    this.router.navigate(["/"]);
  }
}
