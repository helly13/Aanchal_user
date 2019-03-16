import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../category.service";
import { category } from "../classes/category_class";
import { CustomerService } from "../customer.service";
import { Router } from "@angular/router";
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { product } from '../classes/product_class';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  email_id: string;
  flag: boolean;
  name: string;
  id:number;
  total:number;
  selection = new SelectionModel(true, []);
  Category_list: category[] = [];
  Prod_list:any[]=[];
Searcharr:string;
product_dataSource = new MatTableDataSource();
  constructor(
    private cat_ser: CategoryService,
    private cust_ser: CustomerService,
    private cart_ser:CartService,
    private _router: Router,
    private prod_ser:ProductService
  ) {}

  searchfilter(searchterm:string)
  {
    console.log("in");

    console.log(searchterm);
    this.product_dataSource.filter= searchterm.trim().toLowerCase();
    console.log(this.product_dataSource.filteredData);
    this.Prod_list=this.product_dataSource.filteredData;
    console.log(this.Prod_list);
    if(this.product_dataSource.filter.length==0)
    {
      this.Prod_list=[];
    }

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.product_dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.product_dataSource.data.forEach(row => this.selection.select(row));
  }
  ngOnInit() {

    this.flag=true;
    this.email_id = localStorage.getItem("email_id");
    console.log(this.email_id);
    this.total=0;
    if (this.email_id!=null) {
      console.log("in")
      this.flag = true;
      console.log(this.email_id);
      this.cust_ser.Cusrtomer_login(this.email_id).subscribe((data: any) => {



          console.log(data);
          this.name = data[0].Name;
          this.id=data[0].Customer_id;

          this.cart_ser.getCartTotalByCustomerId(this.id).subscribe(
            (data:any)=>{
              console.log(data);
              this.total=data[0].Total;
            }
          )


      });



      //console.log("raj shah");

    } else {
      this.flag = false;
      this.total=0;
    }
    this.cat_ser.getAllCategory().subscribe((data: any[]) => {
      console.log(data);
      this.Category_list = data;
    });
    this.prod_ser.getAllProduct().subscribe((data:any[])=>{
      this.product_dataSource.data=data;
    })
  }

  logout() {
    localStorage.clear();
    this.flag = false;
    this.email_id=null;
    this.total=0;
    console.log(this.email_id);
    this._router.navigate([""]);
  }

  myaccount()
  {
    this._router.navigate(['myprofile']);
  }
}
