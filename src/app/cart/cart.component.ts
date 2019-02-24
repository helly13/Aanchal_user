import { Component, OnInit } from '@angular/core';
import { product } from '../classes/product_class';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { category } from '../classes/category_class';
import { CartService } from '../cart.service';
import { StockService } from '../stock.service';
import { CustomerService } from '../customer.service';

export class TableDetais
{
  constructor(
    public Cart_id:number,
    public Fk_stock_id:number,
    public Product_name:string,
    public Supplier_name:string,
    public Color_name:string,
    public Size_name:string,
    public Quantity:number,
    public Product_price:number
  ){}
}



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  Category_list:category[]=[];
  Customer_id:number=20;
  Cart_details:TableDetais[]=[];
  Total:number=0;
  i:number=0;

  constructor(private cat_ser:CategoryService,private prod_ser:ProductService,private cart_ser:CartService,private stock_ser:StockService,private cust_ser:CustomerService,private _router:Router,private _actroute:ActivatedRoute) { }
  onProductDetails(item:product)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }

  clickOnCheckOut()
  {
      this._router.navigate(['checkout'])
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

    this.cart_ser.getCartByCustomerId(this.Customer_id).subscribe(
      (data:any[])=>
      {
          console.log(data);
          this.Cart_details=data;
          for(this.i=0;this.i<this.Cart_details.length;this.i++)
          {
            this.Total+=this.Cart_details[this.i].Product_price;
          }
      }
    );

  }

}
