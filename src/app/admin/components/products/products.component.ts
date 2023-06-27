import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contratcs/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService, private httpClient: HttpClient, private httpClientService: HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
  
  }
 
  @ViewChild(ListComponent) ListComponents : ListComponent

  createdProduct(createdProduct: Create_Product) {
    this.ListComponents.getProducts();
  }
}
