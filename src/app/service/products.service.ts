import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8080/dota'

  private cartSIze = 0;

  constructor(private httpClient: HttpClient) { }

  setCartItemsSize(size: number) {
    this.cartSIze = size;
  }

  getCartItemsSize() {
    return this.cartSIze;
  }

  // getAllProducts(): Observable<any> {
  //   return this.httpClient.get(this.baseUrl + "/products");
  // }

}
