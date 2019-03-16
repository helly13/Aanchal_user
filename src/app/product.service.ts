import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url='http://localhost:3000/product/';
  private pro_url='http://localhost:3000/product_user/';
  private product_route='http://localhost:3000/product_router/';
  constructor(private _http:HttpClient) { }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getProductById(id){
    return this._http.get(this.url+id);
  }
  getNewProduct(){
    return this._http.get(this.pro_url);
  }
  getProductByCategoryId(id){
    return this._http.get(this.product_route+id);
  }
}
