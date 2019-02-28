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
export class checkout {
  constructor(
    public Product_id: number,
    public Cart_id: number,
    public Color_name: string,
    public Fk_customer_id: number,
    public Fk_stock_id: number,
    public Product_name: string,
    public Product_price: number,
    public Quantity: number,
    public Size_name: string
  ) {}
}
export class updateStock{
  constructor(public Quantity:number,public Stock_id:number,){}
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

  Customer_id: number;

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
  cart_qty:number[]=[];
  stock_id_arr:updateStock[]=[];
  amount: number;
  k:number=0;
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
    this.email_id = localStorage.getItem("email_id");
    console.log(this.email_id);
    this.cust_ser.Cusrtomer_login(this.email_id).subscribe((data: any) => {
      this.Customer_id = data[0].Customer_id;
      console.log(this.Customer_id);
      this.cart_ser
        .getCartByCustomerId(this.Customer_id)
        .subscribe((data: any) => {
          console.log(data);

          this.check_out = data;
          console.log(this.check_out);
          for (this.i = 0; this.i < data.length; this.i++) {
            this.total += data[this.i].Product_price;
          }
        });
    });
  }

  oncheckout() {

this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe(
  (data:any)=>{
    for(this.i=0;this.i<data.length;this.i++)
    {
      this.cart_qty.push(data[this.i].Quantity);

      this.stock_id_arr.push(new updateStock(data[this.i].Quantity,data[this.i].Fk_stock_id));
      this.cart_ser.AddOrder(new Order(data[this.i].Fk_stock_id,this.Customer_id,data[this.i].Quantity,"placed")).subscribe(
        (data:any)=>{
          console.log(data);
        }
      )
          }
    console.log(this.stock_id_arr);
    console.log(this.cart_qty);
    for(this.j=0;this.j<this.stock_id_arr.length;this.j++)
    {

      this.sid=this.stock_id_arr[this.j].Stock_id;
      this.c_qty=this.stock_id_arr[this.j].Quantity;
      this.stock_ser.getStockById(this.sid).subscribe(
        (data:any)=>{


          console.log(this.i);
            console.log(this.k)
            console.log(this.c_qty);
            this.updated_qty=data[0].Quantity-this.c_qty;
            this.sid=data[0].Stock_id;
          this.stock_ser.updateStock(new updateStock(this.updated_qty,this.sid)).subscribe(
            (data:any)=>{
              console.log(data);
            }
          )
        }
      )


   }

  }
)



  //   this.bill_ser
  //     .addBill(new bill(" ", this.total, this.Customer_id))
  //     .subscribe((data: any) => {
  //       console.log(data);

  //       this.bill_id = data.insertId;

  //       this.cart_ser
  //         .getCartByCustomerId(this.Customer_id)
  //         .subscribe((data: any) => {
  //           console.log(data);

  //           for (this.i = 0; this.i < data.length; this.i++) {
  //             this.amount = data[this.i].Product_price;
  //             this.stock_id = data[this.i].Fk_stock_id;
  //             this.qty = data[this.i].Quantity;
  //             this.bill_details1.push(
  //               new bill_details(
  //                 this.bill_id,
  //                 this.Customer_id,
  //                 this.stock_id,
  //                 this.qty,
  //                 this.amount
  //               )
  //             );
  //             console.log(this.bill_details1);
  //           }

  //           this.bill_ser
  //             .addBillDetails(this.bill_details1)
  //             .subscribe((data: any) => {
  //               console.log(data);
  //               this.bill_details1 = [];
  //             });
  //         });
  //     });
   }
}
