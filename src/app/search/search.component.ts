import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../category.service";
import { category } from "../classes/category_class";
import { CustomerService } from "../customer.service";
import { Router } from "@angular/router";
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { product } from '../classes/product_class';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selection = new SelectionModel(true, []);
  Category_list: category[] = [];

Searcharr:string;
product_dataSource = new MatTableDataSource();
Prod_list:any[];
results: any[] = [];
i:number=0;

  constructor(
    private cat_ser: CategoryService,
    private cust_ser: CustomerService,
    private cart_ser:CartService,
    private _router: Router,
    private prod_ser:ProductService

  ) { }

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

  searchfilter(key:string)
  {
    console.log(key);
    this.product_dataSource.filter= key.trim().toLowerCase();
    console.log(this.product_dataSource.filteredData);
    this.Prod_list=this.product_dataSource.filteredData;
    console.log(this.Prod_list);

  }
  ngOnInit() {
    this.prod_ser.getAllProduct().subscribe((data:any[])=>{
      this.product_dataSource.data=data;
    })

    // this.queryField.valueChanges
    // .subscribe( result => console.log(result));

  }

  itemsearch(item)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }

}
