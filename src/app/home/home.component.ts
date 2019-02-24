import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { category } from '../classes/category_class';
import { product } from '../classes/product_class';
import { ProductService } from '../product.service';
import { IImage } from 'ng-simple-slideshow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  Category_list:category[]=[];
  New_Product_list:product[]=[];
  ImageUrl:IImage[]=[];
  i:number;
  slideIndex:number = 1;
  constructor(private cat_ser:CategoryService,private prod_ser:ProductService,private _router:Router) { }
  onSlideShow(img:number)
  {
    console.log(img);
    console.log(this.ImageUrl[img]);
  }

  onProductDetails(item:product)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }
  

  onclickCart()
  {
    this._router.navigate(['cart']);
  }

  ngOnInit() {
    this.cat_ser.getAllCategory().subscribe(
      (data:category[])=>
      {
        console.log(data);
        this.Category_list=data;
      }
    );
    this.prod_ser.getNewProduct().subscribe(
      (data:product[])=>
      {
        console.log(data);
        this.New_Product_list=data;
        for(this.i=0;this.i<this.New_Product_list.length;this.i++)
        {
          this.ImageUrl.push(
            {
              url : "http://localhost:3000/images/Product_img/"+this.New_Product_list[this.i].Product_image,
              caption:this.New_Product_list[this.i].Product_name,
              
            }
            )
        }
        
      }
    );

  }

}
