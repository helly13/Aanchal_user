import { HttpClient,HttpHeaders } from '@angular/common/http';
import { customer } from './classes/customer_class'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url='http://localhost:3000/customer/';
  private cust_url='http://localhost:3000/customer_log_in/';
  private customer_url='http://localhost:3000/insertcustomer/';

  constructor(private _http:HttpClient) { }


  GetAllCustomer()
  {
    return this._http.get(this.url);
  }

  addCustomer(item:customer){
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.customer_url,body,{headers:_abc});
}


  Cusrtomer_login(id)
  {
    return this._http.get(this.cust_url+id);
  }
  getCustomerById(id:number){
    return this._http.get(this.url+id);
  }

}
