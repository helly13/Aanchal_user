import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BillService } from "../bill.service";

export class TableDetails {
  constructor(
    public Bill_details_id: number,
    public Fk_bill_id: number,
    public Fk_customer_id: number,
    public Fk_stock_id: number,
    public Quantity: number,
    public Amount: number,
    public Color_name: string,
    public Product_name: string,
    public Product_price: number,
    public Size_name: string,
    public Bill_date: Date,
    public Product_image: string,
    public Product_desc: string
  ) {}
}

@Component({
  selector: "app-past-order",
  templateUrl: "./past-order.component.html",
  styleUrls: ["./past-order.component.css"]
})
export class PastOrderComponent implements OnInit {
  customer_id: number;
  bill_arr: TableDetails[];
  flag: boolean = false;
  email_id: string;

  constructor(
    private _ac: ActivatedRoute,
    private bill_ser: BillService,
    private route: Router
  ) {}

  ngOnInit() {
    this.email_id = localStorage.getItem("email_id");

    if (this.email_id == null) 
    {
      this.flag = false;
    } 
    else
    {
      this.customer_id = parseInt(localStorage.getItem("Customer_id"));
      console.log(localStorage.getItem("Customer_id"));
      this.bill_ser.getBillDetialsByCustomerId(this.customer_id).subscribe(
        (data: TableDetails[])=>
        {
          console.log(data);
          this.flag=true;
          this.bill_arr = data;
          console.log(this.bill_arr);
        });
    }
  }
}
