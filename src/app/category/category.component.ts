import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { category } from '../classes/category_class';
import { ProductService } from '../product.service';
import { product } from '../classes/product_class';
import { Router } from '@angular/router';
//import { ColorService } from '../color.service';
import { ColorService } from '../color.service';
import { color } from '../classes/color_class';
import { SizeService } from '../size.service';
import { size } from '../classes/size_class';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Category_list:category[]=[];
  Product_list:product[]=[];
  tmp_pro_list:product[]=[];
  Category_id:number;
  Color_list:color[]=[];
  Size_list:size[]=[];
  pro_size_flag:number=0;
  pro_color_flag:number=0;
  i:number;
  j:number;
  k:number;
  constructor(private cat_ser:CategoryService,private pro_ser:ProductService,private color_ser:ColorService,private size_ser:SizeService,private _router:Router) { }


  onProductDetails(item:product)
  {
    this._router.navigate(['product_details',item.Product_id]);
  }

  ngOnInit() {

    this.cat_ser.getAllCategory().subscribe(
    (data: any[]) => {
      console.log(data);
      this.Category_list = data;
    });

    this.pro_ser.getAllProduct().subscribe(
    (data:product[])=>{
      this.Product_list=data;
      this.tmp_pro_list=this.Product_list;
    });

    this.color_ser.getAllColor().subscribe(
      (data:color[])=>
      {
        this.Color_list=data;
      }
    );

    this.size_ser.getAllSize().subscribe(
      (data:size[])=>
      {
        this.Size_list=data;
      }
    );
  }
  onClickCategory(item:category)
  {
    this.Product_list=[];
    this.Category_id=item.Category_id;
    this.pro_ser.getProductByCategoryId(this.Category_id).subscribe(
      (data:any[])=>
      {
        console.log(data);
        this.Product_list=data;
      }
    );
  }
  onClickColor(item:color)
  {
   this.color_ser.getStockById(item.Color_id).subscribe(
     (data:any[])=>
     {
        this.Product_list=[];
        for(this.i=0;this.i<data.length;this.i++)
        {
          for(this.j=0;this.j<this.tmp_pro_list.length;this.j++)
          {
            if(data[this.i].Fk_product_id==this.tmp_pro_list[this.j].Product_id)
            {
              for(this.k=0;this.k<this.Product_list.length;this.k++)
              {
                this.pro_size_flag=0;
                if(this.Product_list.findIndex(x => x==this.tmp_pro_list[this.j])>=0)
                {
                  this.pro_color_flag=1;
                  break;
                }
              }
              if(this.pro_color_flag==1)
              {
                this.pro_color_flag=0;
              }
              else
              {
                this.Product_list.push(this.tmp_pro_list[this.j]);
              }
            }
          }
        }
     }
   );
  }

  onClickSize(item:size)
  {
    this.Product_list=[];
    this.size_ser.getStockById(item.Size_id).subscribe(
      (data:any)=>
      {
        for(this.i=0;this.i<data.length;this.i++)
        {
          for(this.j=0;this.j<this.tmp_pro_list.length;this.j++)
          {
            if(data[this.i].Fk_product_id==this.tmp_pro_list[this.j].Product_id)
            {
              for(this.k=0;this.k<this.Product_list.length;this.k++)
              {
                this.pro_size_flag=0;
                if(this.Product_list.findIndex(x => x==this.tmp_pro_list[this.j])>=0)
                {
                  this.pro_size_flag=1;
                  break;
                }
              }
              if(this.pro_size_flag==1)
              {
                this.pro_size_flag=0;
              }
              else
              {
                this.Product_list.push(this.tmp_pro_list[this.j]);
              }

            }
          }
        }
      }
    );
  }

}
