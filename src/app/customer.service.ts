import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url='http://localhost:3000/customer/';
  private cust_url='http://localhost:3000/customer_log_in/';
  constructor(private _http:HttpClient) { }

  Cusrtomer_login(id)
  {
    return this._http.get(this.cust_url+id);
  }
  getCustomerById(id:number){
    return this._http.get(this.url+id);
  }

}
