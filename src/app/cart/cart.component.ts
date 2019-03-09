import { Component, OnInit } from "@angular/core";
import { product } from "../classes/product_class";
import { CategoryService } from "../category.service";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { category } from "../classes/category_class";
import { CartService } from "../cart.service";
import { StockService } from "../stock.service";
import { CustomerService } from "../customer.service";

export class TableDetais {
  constructor(
    public Cart_id: number,
    public Fk_stock_id: number,
    public Product_name: string,
    public Supplier_name: string,
    public Color_name: string,
    public Size_name: string,
    public Quantity: number,
    public Product_price: number,
    public Product_image:string
  ) {}
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  Category_list: category[] = [];
  Customer_id: number = 20;
  email_id: string = "";
  Cart_details: TableDetais[] = [];
  Total: number = 0;
  i: number = 0;
  flag: boolean = false;

  constructor(
    private cat_ser: CategoryService,
    private prod_ser: ProductService,
    private cart_ser: CartService,
    private stock_ser: StockService,
    private cust_ser: CustomerService,
    private _router: Router,
    private _actroute: ActivatedRoute
  ) {}
  onProductDetails(item: product) {
    this._router.navigate(["product_details", item.Product_id]);
  }

  clickOnCheckOut() {
    this._router.navigate(["checkout"]);
  }

  onclickCart() {
    this._router.navigate(["cart"]);
  }

  ngOnInit() {
    //this.flag=false;
    this.email_id = localStorage.getItem("email_id");

    if (this.email_id == null) {
      this.flag = false;
    } else {
      this.flag = true;
      this.cust_ser.Cusrtomer_login(this.email_id).subscribe((data: any) => {
        this.Customer_id = data[0].Customer_id;
        this.flag = true;

        this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe((data: any[]) => {
            console.log(data);
            if (data.length >= 1) {
              this.Cart_details = data;
              console.log(this.Cart_details);
              for (this.i = 0; this.i < this.Cart_details.length; this.i++) {
                this.Total += this.Cart_details[this.i].Product_price*this.Cart_details[this.i].Quantity;
              }
            } else {
              this.flag = false;
            }
          });
      });
    }
  }

  oncart_Delete(item) {
    console.log(item);
    this.cart_ser.removeFromCart(item.Cart_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.ngOnInit();
      }
    )
  }
}
