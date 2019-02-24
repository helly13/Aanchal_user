import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock_id:string='http://localhost:3000/stock_id/';
  
  private stock_url:string='http://localhost:3000/stock_details/';
  constructor(private _http:HttpClient) { }

  getDetailsByProductid(Product_id:number){
    return this._http.get(this.stock_url+Product_id);
  }

  
}
