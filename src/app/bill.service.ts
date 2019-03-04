import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { bill } from './classes/bill_class'

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private bill_url='http://localhost:3000/bill/';
  private bill_details='http://localhost:3000/bill_details/';

  constructor(private _http:HttpClient) { }

  addBill(item:bill){
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.bill_url,body,{headers:_abc});
}
addBillDetails(item){
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.bill_details,body,{headers:_abc});
}
getBillByCustomer_id(id:number)
{
  return this._http.get(this.bill_url+id);
}
getBillDetialsByCustomerId(id:number)
{
  return this._http.get(this.bill_details+id);
}

}
