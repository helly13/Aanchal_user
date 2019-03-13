import { Component, OnInit,ViewChild } from '@angular/core';
import { product } from "../classes/product_class";
import { CategoryService } from "../category.service";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { category } from "../classes/category_class";
import { CartService } from "../cart.service";
import { CustomerService } from '../customer.service';
//import { } from '@types/googlemaps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  //map: google.maps.Map;
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

  ngOnInit() {

    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    this.Email_id = localStorage.getItem("email_id");
    this.cust_ser.Cusrtomer_login(this.Email_id).subscribe(
      (data:any)=>{
        this.Customer_id=data[0].Customer_id;

        this.cart_ser.getWishlistByCustomerId(this.Customer_id).subscribe(
          (data:any)=>{
            console.log(data);
            for(this.i=0;this.i<data.length;this.i++)
            {
                this.Product_id_arr.push(data[this.i].Fk_Product_id);
                this.prod_ser.getProductById(data[this.i].Fk_Product_id).subscribe(
                      (data:product[])=>
                       {
                         console.log(data);
                         this.Product_arr.push(data[0]);
                       // console.log(this.Product_arr);
                   }
                );
            }
          }
        )

      }
    )

  }

}
