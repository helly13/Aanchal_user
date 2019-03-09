import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private url='http://localhost:3000/color/';
  private delete_color='http://localhost:3000/color_delete/';
  private stock_color='http://localhost:3000/sizebycolor/';

  constructor(private _http:HttpClient) { }
  getAllColor(){
    return this._http.get(this.url);
  }
  getColorById(id)
  {
    return this._http.get(this.url+id);
  }
  getStockById(id)
  {
    return this._http.get(this.stock_color+id);
  }


}
