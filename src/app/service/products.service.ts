import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private cartSIze = 0;

  constructor() { }

  setCartItemsSize(size: number) {
    this.cartSIze = size;
  }

  getCartItemsSize() {
    return this.cartSIze;
  }

}
