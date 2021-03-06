import { Component, OnInit } from '@angular/core';
import { product } from "../classes/product_class";
import { CategoryService } from "../category.service";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { category } from "../classes/category_class";
import { CartService } from "../cart.service";
import { CustomerService } from '../customer.service';

import { wishlist } from '../classes/wish_list_class';
export class wishlistid{
  constructor(
    public Fk_Product_id:number,
    public Fk_Customer_id:number,
      ){ }
};

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {

  Customer_id:number;
  Product_id:number;
  Email_id:string;
  i:number;
  id:number;
  k:number;
  Product_id_arr:number[]=[];
Product_arr:product[]=[];
  constructor(
    private cart_ser: CartService,
    private _router: Router,
    private cust_ser:CustomerService,
    private prod_ser:ProductService
  ) { }

  add_cart(item)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }
  onProduct_Delete(item)
  {
    console.log(item);
    this.cart_ser.getWishlistByCustomerIdAndProduct(new wishlistid(item.Product_id,this.Customer_id)).subscribe(
      (data:any)=>{
        console.log(data);
        this.id=data[0].Wish_list_id;

        this.cart_ser.removeFromWishlist(this.id).subscribe(
          (data:any)=>{
            console.log(data);
            //this._router.navigate(['']);
            this.ngOnInit();

          }
        )
      }
    )


    }
  ngOnInit() {

    this.Email_id = localStorage.getItem("email_id");
    this.cust_ser.Cusrtomer_login(this.Email_id).subscribe(
      (data:any)=>{
        this.Customer_id=data[0].Customer_id;

        this.cart_ser.getWishlistByCustomerId(this.Customer_id).subscribe(
          (data:any)=>{
            console.log(data);
            if(data.length>=1)
            {
              for(this.i=0;this.i<data.length;this.i++)
              {
                  this.Product_id_arr.push(data[this.i].Fk_Product_id);
                  this.prod_ser.getProductById(data[this.i].Fk_Product_id).subscribe(
                        (data:product[])=>
                         {
                           console.log(data);
                           this.Product_arr.push(data[0]);
                          //console.log(this.Product_arr);
                     }
                     );
            }
          }
            else
            {
              this._router.navigate(['emptywishlist']);
            }
           
               
            }
          
        )

      }
    )

      //console.log(this.Product_arr);

    }

}
