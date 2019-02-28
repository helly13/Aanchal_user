import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { product } from '../classes/product_class';
import { category } from '../classes/category_class';
import { StockService } from '../stock.service';
import { and } from '@angular/router/src/utils/collection';
import { CustomerService } from '../customer.service';
import { customer } from '../classes/customer_class';
import { cart } from '../classes/cart_class';
import { CartService } from '../cart.service';

export class getCartid {
  constructor(public Fk_customer_id:number, public Fk_stock_id:number) {}
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  Category_list:category[]=[];
  New_Product_list:product[]=[];
  Product_Stock:any[]=[];
  Product_id:number;
  Stock_id:number;
  Product_name:string="";
  Product_desc:string="";
  Product_img:string="";
  Product_price:number;
  i:number;
  Sizes:string[]=[];
  Colors:string[]=[];
  Selected_color:string="";
  Selected_size:string="";
  Customer_id:number
  email_id:string
  qty=0;
  flag:boolean=true;
  constructor(private cat_ser:CategoryService,private prod_ser:ProductService,private cart_ser:CartService,private stock_ser:StockService,private cust_ser:CustomerService,private _router:Router,private _actroute:ActivatedRoute) { }



  onclickAddCart()
  {

    if(this.flag==true)
    {
      this.cust_ser.Cusrtomer_login(this.email_id).subscribe(
        (data:any)=>
        {
           this.Customer_id=data[0].Customer_id;


           this.cart_ser.checkCartId(new getCartid(this.Customer_id,this.Stock_id)).subscribe(
             (data:any)=>
             {

              console.log(data);

              if(data.length==1)
              {
                alert("Item is already on your cart");
              }

              else
              {
                    this.cart_ser.InsertIntoCart(new cart(this.Stock_id,this.Customer_id,this.qty)).subscribe(
            (data:any)=>
            {
              console.log(data);
              this._router.navigate(['cart']);
            }
          );

              }

             }
           )

        }
      );
    }

  }


  onclick_Size(item:string)
  {

     this.Selected_size=item.toUpperCase();
    this.Colors=[];
    for(this.i=0;this.i<this.Product_Stock.length;this.i++)
    {
      console.log(this.Product_Stock[this.i].Size_name.toLowerCase())
      console.log(item)
      if(this.Product_Stock[this.i].Size_name.toLowerCase()==item)
      {
        this.Colors.push(this.Product_Stock[this.i].Color_name);
      }
    }
  }
  onclick_Color(item)
  {
    this.Selected_color=item.toUpperCase();
    for(this.i=0;this.i<this.Product_Stock.length;this.i++)
    {

      if(this.Product_Stock[this.i].Size_name==this.Selected_size && this.Product_Stock[this.i].Color_name.toUpperCase()==this.Selected_color)
      {

        this.Stock_id=this.Product_Stock[this.i].Stock_id;
        console.log(this.Stock_id);
        break;
      }
    }

  }
  ngOnInit() {

    this.email_id=localStorage.getItem('email_id');

    this._actroute.params.subscribe(
      (x: Params) => {
        this.Product_id = x['id'];
      }
    );
    this.prod_ser.getProductById(this.Product_id).subscribe(
      (data:product[])=>
      {
        console.log(data);
        this.Product_name=data[0].Product_name;
        this.Product_desc=data[0].Product_desc;
        this.Product_img=data[0].Product_image;
        this.Product_price=data[0].Product_price;
      }
    );
    this.stock_ser.getDetailsByProductid(this.Product_id).subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Product_Stock=data;
        console.log(data[0].Size_name.toLowerCase());
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.Sizes.push(data[this.i].Size_name.toLowerCase());
          this.Colors.push(data[this.i].Color_name.toLowerCase());
        }
      }
    );


    if(this.email_id==null)
    {
         this.flag=false;
    }
    else
    {

      this.flag=true;
    }
    console.log(this.email_id);


  }


}
