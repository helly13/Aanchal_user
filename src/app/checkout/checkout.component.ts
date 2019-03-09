import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../category.service";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { product } from "../classes/product_class";
import { category } from "../classes/category_class";
import { StockService } from "../stock.service";

import { CustomerService } from "../customer.service";
import { customer } from "../classes/customer_class";
import { cart } from "../classes/cart_class";
import { CartService } from "../cart.service";
import { BillService } from "../bill.service";
import { bill } from "../classes/bill_class";
import { AnimateTimings } from "@angular/animations";
import { bill_details } from "../classes/bill_details_class";
import { Order } from '../classes/order_class';
import { elementStart } from '@angular/core/src/render3';
import { flatten } from '@angular/router/src/utils/collection';
export class checkout {
  constructor(
    public Product_id: number,
    public Cart_id: number,
    public Color_name: string,
    public Fk_customer_id: number,
    public Fk_stock_id: number,
    public Product_name: string,
    public Product_price: number,
    public Product_image:string,
    public Quantity: number,
    public Size_name: string
  ) {}
}
export class updateStock{
  constructor(public Quantity:number,public Stock_id:number,){}
}

export class AlternativeAddress{
  constructor(public Alter_Mobile_no:string,public Alter_Address:string,public City:string){}
}

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  email_id: string;
  bill_id: number;
  add: string;
flag:boolean=true;
  Customer_id: number;
  cart_id:number;
  check_out: checkout[];
  bill_details1: bill_details[] = [];
  updated_qty:number;
  total: number = 0;
  i: number = 0;
  product_id: number;
  stock_id:number;
  qty: number;
  sid:number;
  j:number=0;
  cnt:number=0;
  Address:string;
  number:string;
  city:string;
  add_flag:boolean=false;
  cart_qty:number[]=[];
  stock_id_arr:updateStock[]=[];
  amount: number;
address_line:string="";
  k:number=0;
 add_arr:string[]=["Use Current Address","Use Different Address"];
  c_qty:number;
  constructor(
    private bill_ser: BillService,
    private cat_ser: CategoryService,
    private prod_ser: ProductService,
    private cart_ser: CartService,
    private stock_ser: StockService,
    private cust_ser: CustomerService,
    private _router: Router,
    private _actroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.flag=false;
    this.email_id = localStorage.getItem("email_id");
    console.log(this.email_id);
    this.cust_ser.Cusrtomer_login(this.email_id).subscribe((data: any) => {
      console.log(data);
      this.Customer_id = data[0].Customer_id;
      this.address_line=data[0].Address;
      this.number=data[0].Mobile_no;
      this.city=data[0].City;
      console.log(this.Address);
      console.log(this.Customer_id);
      this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe((data: any) => {
          console.log(data);
          this.check_out = data;
          console.log(this.check_out);
          for (this.i = 0; this.i < data.length; this.i++) {
            this.total += data[this.i].Product_price*data[this.i].Quantity;
          }
        });
    });
  }

  oncheckout() {
    console.log(this.add);
    if(this.add==null)
    {
      alert('Please select Address Details');
    }
    else
    {
      if(this.add=="Use Current Address")
      {


        if(this.address_line=="")
          {
          alert('Add Adress');
          this.flag=false;

        }
        else
        {
          this.flag=true;
        }
      }



      else
      {
        this.add_flag=true;
        console.log(this.address_line);
        if(this.address_line=="")
        {
          alert("Add Your Alternative Address");
          this.flag=false;
        }
        else
        {
          this.cust_ser.updateCustomerAlterNativeAddress(new AlternativeAddress(this.number,this.address_line,this.city),this.Customer_id).subscribe(
            (data:any)=>{
              console.log(data);
            }
          )
          this.flag=true;

        }


      }
    }

  if(this.flag==true)
    {
      console.log(this.check_out);
      for(this.i=0;this.i<this.check_out.length;this.i++)
      {
          this.cart_id=this.check_out[this.i].Cart_id;
          this.cart_ser.AddOrder(new Order(this.check_out[this.i].Fk_stock_id,this.check_out[this.i].Fk_customer_id,this.check_out[this.i].Quantity,"Order Placed")).subscribe(
          (data:any)=>{
            console.log(data);
            this.cnt++;
            console.log(this.cnt);
            if(this.cnt==this.check_out.length)
            {
              for(this.j=0;this.j<this.cnt;this.j++)
              {
                this.cart_ser.removeFromCart(this.check_out[this.j].Cart_id).subscribe(
                  (data:any)=>
                  {
                    console.log(data+"remove from cart");
                  }
                );
              }

              this._router.navigate(['']);
            }
          }
        );
      }

    }

   }

   handleChange(item)
   {

      if(item=="Use Different Address")
      {
        this.add_flag=true;
        this.address_line="";
        this.number="";
      }
      else
      {
        this.add_flag=false;
        this.cust_ser.Cusrtomer_login(this.email_id).subscribe(
          (data:any)=>{
            this.address_line=data[0].Address;
            this.number=data[0].Mobile_no;
          }
        )
      }

   }
}
