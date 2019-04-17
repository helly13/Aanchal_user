import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { product } from '../classes/product_class';
declare var $;
@Component({
  selector: 'app-tmphell',
  templateUrl: './tmphell.component.html',
  styleUrls: ['./tmphell.component.css']
})
export class TmphellComponent implements OnInit {

  New_Product_list:product[]=[];
  constructor(private prod_ser:ProductService, private _router:Router) { }

  ngOnInit() {
    // $(document).on('mouseover', '.main .column', function () {
    //   $(this).addClass('active').siblings().removeClass('active')
    // })


  //   $('.owl-carousel').owlCarousel({
  //     loop:true,
  //     margin:10,
  //     nav:true,
  //     responsive:{
  //         0:{
  //             items:1
  //         },
  //         600:{
  //             items:3
  //         },
  //         1000:{
  //             items:5
  //         }
  //     }
  // })
  
    this.prod_ser.getAllProduct( ).subscribe(
      (data:any[])=>
      {
        this.New_Product_list=data;
        console.log(this.New_Product_list);
      }
    );

  }


}
