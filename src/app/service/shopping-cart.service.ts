import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../model/ShoppingCartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: ShoppingCartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addItemToCart(item: ShoppingCartItem) {

    let alredyExistsInCart: boolean = false;
    let existingCartItem: ShoppingCartItem = undefined;
    
    if(this.cartItems.length > 0) {
      
      for(let tempCartItem of this.cartItems) {
        if(tempCartItem.id === item.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

    }

    alredyExistsInCart = (existingCartItem != undefined);

      if(alredyExistsInCart) {
        existingCartItem.quantity++;
      } else {
        this.cartItems.push(item);
      }

      this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

}
