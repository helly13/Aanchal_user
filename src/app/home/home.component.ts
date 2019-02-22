import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { category } from '../classes/category_class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  Category_list:category[]=[];

  constructor(private cat_ser:CategoryService) { }

  ngOnInit() {
    this.cat_ser.getAllCategory().subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Category_list=data;
      }
    );
  }

}
