import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock_id:string='http://localhost:3000/stock_id/';

  private url:string='http://localhost:3000/stock/';
    private stock_url:string='http://localhost:3000/stock_details/';
  constructor(private _http:HttpClient) { }

  getDetailsByProductid(Product_id:number){
    return this._http.get(this.stock_url+Product_id);
  }
  getstockid(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.stock_id,body,{headers:_abc});
  }
  getStockById(id:number)
  {
    return this._http.get(this.url+id);
   }

   updateStock(item){
    //console.log("xyz");
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url,body,{headers:head1});
  }



}
