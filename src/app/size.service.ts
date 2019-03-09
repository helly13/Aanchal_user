import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url='http://localhost:3000/size/';
  private stock_url='http://localhost:3000/stock_size/';
  constructor(private _http:HttpClient) { }
  getAllSize(){
    return this._http.get(this.url);
  }
  getStockById(id)
  {
    return this._http.get(this.stock_url+id);
  }
}
