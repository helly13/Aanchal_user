import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { customer } from '../classes/customer_class';
import { Router } from '@angular/router';

export class updatecustomer
{
  constructor(

    public Name:string,

    public Gender:string,
    public Mobile_no:string,
    public DOB:Date,
    public Address:string,
    public City:string
  ){}

}


@Component({
  selector: 'app-myacc',
  templateUrl: './myacc.component.html',
  styleUrls: ['./myacc.component.css']
})
export class MyaccComponent implements OnInit {
flag:boolean=false;
up_flag:boolean=false;
  Name:string;
  DOB:Date;
  Address:string;
  Number:string;
  Email_id:string;
  Gender:string;
  id:number;
  city:string;
  Gender_arr:string[]=["Male","Female"];

  minDate = new Date(1960, 0, 1);
  maxDate = new Date(2000, 11, 31);
  constructor(private cust_ser:CustomerService,private _route:Router) { }

  ngOnInit() {
    this.up_flag=false;

    this.Email_id=localStorage.getItem('email_id');
    console.log(this.Email_id);
    this.cust_ser.Cusrtomer_login(this.Email_id).subscribe(

      (data:customer)=>{
        this.Address=data[0].Address;
        this.Name=data[0].Name;
        this.Number=data[0].Mobile_no;
        this.Gender=data[0].Gender;
        this.DOB=data[0].DOB;
        this.id=data[0].Customer_id;
        this.city=data[0].City;
        console.log(data);
      }
    )


}

onupdate()
{
  this.flag=true;
  this.up_flag=true;

}

onsubmit()
{
  this.up_flag=false;
  this.cust_ser.updateCustomer(new updatecustomer(this.Name,this.Gender,this.Number,this.DOB,this.Address,this.city),this.id).subscribe(
    (data:any)=>
    {
      console.log(data);
      alert('updated successfully')
      this.flag=false;
      this.ngOnInit();
    }
  )
}

logout() {

  localStorage.setItem('email_id',"");
  localStorage.setItem('Customer_id',"");
localStorage.clear();
window.location.href="";
  //this._route.navigate([""]);
}

}
