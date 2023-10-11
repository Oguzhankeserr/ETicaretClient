import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contratcs/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contratcs/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $:any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,
    private basketService: BasketService){
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
}
