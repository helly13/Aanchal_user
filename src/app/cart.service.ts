import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { cart } from './classes/cart_class';
import { Order } from './classes/order_class';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }

  private cart_url:string='http://localhost:3000/cart/';
  private cart_id_url:string='http://localhost:3000/cart_id/';
  private order_url:string='http://localhost:3000/order/';
  private wishlist_url:string='http://localhost:3000/wishlist/';
  private wishlist_url_id:string='http://localhost:3000/wishlist_id/';
  private wishlist_customer:string='http://localhost:3000/wishlist_customerid/';
  getAllCart()
  {
    return this._http.get(this.cart_url);
  }
  getCartByCustomerId(id)
  {
    return this._http.get(this.cart_url+id);
  }

  getWishlistByCustomerId(id)
  {
    return this._http.get(this.wishlist_customer+id);
  }

  getWishlistByCustomerIdAndProduct(item)
  {

console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.wishlist_url_id,body,{headers:head1});

  }
  getCartTotalByCustomerId(id)
  {
    return this._http.get(this.cart_id_url+id);
  }
  removeFromCart(id)
  {
    return this._http.delete(this.cart_url+id);
  }
  removeFromWishlist(id)
  {
    return this._http.delete(this.wishlist_url+id);
  }
  InsertIntoCart(item:cart)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart_url,body,{headers:head1});
  }
  checkCartId(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart_id_url,body,{headers:head1});
  }

  getOrderById(id:number)
  {
    return this._http.get(this.order_url+id);
  }
  AddOrder(item:Order)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.order_url,body,{headers:head1});
  }
  RemoveOrder(id:number)
  {
    this._http.delete(this.order_url+id);
  }

  InsertIntoWishlist(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.wishlist_url,body,{headers:head1});
  }

  checkWishlistId(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.wishlist_customer,body,{headers:head1});
  }

}
