import { Component, OnInit } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contratcs/list.product';
import { List_Product_Image } from 'src/app/contratcs/list_product_image';
import { BaseUrl } from 'src/app/contratcs/users/base_url';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService:FileService) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount:number;
  pageSize: number = 12;
  pageList:number[] = [];
  baseUrl:BaseUrl;
  products: List_Product[];
    

  async ngOnInit() {

    // this.baseUrl =await this.fileService.getBaseStorageUrl();
    this.baseUrl = await this.fileService.getLocalStorageUrl();


    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1) ;

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, 
        () => {

        },
        errorMessage => {

        });
      this.products = data.products;
      
      
      this.products = this.products.map<List_Product>(p => {
        const showCaseImage = p.productImageFiles.find(img => img.showCase);
      
        const listProduct: List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: showCaseImage ? showCaseImage.fileName : (p.productImageFiles.length ? p.productImageFiles[0].fileName : ""), 
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles
        };  
      
        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }


  getshowCaseProducts(): List_Product[] {
    return this.products.filter(product => {
      const showCaseImage = product.productImageFiles.find(img => img.showCase);
      return showCaseImage !== undefined && showCaseImage.showCase;
    });
  }

  getshowCaseImageUrl(product: List_Product): string | undefined {
    const showCaseImage = product.productImageFiles.find(img => img.showCase == true);
    // Eğer bir showCase görseli varsa onun URL'sini döndür, yoksa ilk görselin URL'sini döndür
    return showCaseImage ? `${'http://127.0.0.1:4200/'}/${showCaseImage.fileName}` : 
      product.imagePath ? `${'http://127.0.0.1:4200/'}/${product.imagePath}` : undefined;
  }

}
