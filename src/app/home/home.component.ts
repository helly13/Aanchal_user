import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { category } from '../classes/category_class';
import { product } from '../classes/product_class';
import { ProductService } from '../product.service';
import { IImage } from 'ng-simple-slideshow';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CartService } from '../cart.service';
import { wishlist } from '../classes/wish_list_class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Customer_id:number;
  Category_list:category[]=[];
  New_Product_list:product[]=[];
  ImageUrl:IImage[]=[];
  i:number;
  flag:boolean=true;
  slideIndex:number = 1;
  emil_id:string;
  name:string;
  constructor(private cart_ser:CartService,private cat_ser:CategoryService,private prod_ser:ProductService,private cust_ser:CustomerService, private _router:Router) { }
  onSlideShow(img:number)
  {
    console.log(img);
    console.log(this.ImageUrl[img].caption);
    for(this.i=0;this.i<this.New_Product_list.length;this.i++)
    {
      if(this.New_Product_list[this.i].Product_name==this.ImageUrl[img].caption)
      {
        this._router.navigate(['product_details',this.New_Product_list[this.i].Product_id]);
      }
    }
  }

  onProductDetails(item:product)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }

  onwishclick(item)
  {
    if(this.flag==true)
    {


    this.cart_ser.checkWishlistId(new wishlist(item.Product_id,this.Customer_id)).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.length==1)
        {
          alert('Product Allready in Your List');
        }
        else
        {
          this.cart_ser.InsertIntoWishlist(new wishlist(item.Product_id,this.Customer_id)).subscribe(
            (data:any)=>{
              console.log(data);
            }
          )


        }
      }
    )
    console.log(item);
    }
    else
    {
      this._router.navigate(["onsignup"]);
    }
     }

  onclickCart()
  {
    this._router.navigate(['cart']);
  }


  ngOnInit() {

    this.emil_id=localStorage.getItem('email_id');


    console.log(this.emil_id);

    if(this.emil_id!=null)
    {
      this.cust_ser.Cusrtomer_login(this.emil_id).subscribe((data: any) => {
        this.Customer_id = data[0].Customer_id;
        this.flag = true;
      });
    }
    else
    {
      this.flag=false;
    }
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
