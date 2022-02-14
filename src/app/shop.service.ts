import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Cart } from './cart';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/listofproducts/`);
  }

  public getCartList(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/cartlist/${id}`);
  }

  public getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/productdetail/${id}`);
  }

  public getImg(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/getImg/${id}`);
  }

  public search(keyword: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/search/${keyword}`);
  }

  public getUserId(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/userid/${username}`);
  }

  public sendEmail(email: Email[]): Observable<Email[]> {
    return this.http.post<Email[]>(`${this.apiServerUrl}/email`, email);
  }

  public getTotal(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/total/${id}`);
  }

  public createCheckout(checkout: Object): Observable<Object> {
    return this.http.post(`${this.apiServerUrl}/createcheckout`, checkout);
  }

  public createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.apiServerUrl}/createuser`, user);
  }

  public createCart(cart: Cart): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/createcart`, cart);
  }

  public login(user: Object): Observable<Object> {
    return this.http.post(`${this.apiServerUrl}/loggedin`, user);
  }

  public deleteByCart(id: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/deletebycart/${id}`);
  }

  public deleteByProduct(product_id: number, user_id: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/deletebyproduct/${product_id}/${user_id}`);
  }

  public deleteByItem(product_id: number, user_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deletebyitem/${product_id}/${user_id}`);
  }
}
