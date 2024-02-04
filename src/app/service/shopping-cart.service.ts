import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartItem } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: ShoppingCartItem[] = [];
  cartItemsChanged: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addItemToCart(item: ShoppingCartItem) {
    const existingProduct = this.cartItems.find(currentItem => currentItem.product.id === item.product.id);

    if (existingProduct) {
      if(existingProduct.product.quantity === existingProduct.bagQuantity) {

      } else {
        existingProduct.bagQuantity += item.bagQuantity;
      }
      
    } else {
      if(item.product.quantity > 0) {
        this.cartItems.push(item);
      }
    }

    this.computeCartTotals();
  }

  private computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    
    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.bagQuantity * currentCartItem.product.price;
      totalQuantityValue += currentCartItem.bagQuantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.cartItemsChanged.next([...this.cartItems]);
  }

  getCartItems(): ShoppingCartItem[] {
    return [...this.cartItems];
  }

  addItemQuantity(item: ShoppingCartItem) {
    const existingProduct = this.cartItems.find(currentItem => currentItem.product.id === item.product.id);
  
    if (existingProduct) {
      if(existingProduct.product.quantity === existingProduct.bagQuantity) {

      } else {
        existingProduct.bagQuantity++;
      }
      
    } else {
      this.cartItems.push({ ...item, bagQuantity: 1 });
    }
  
    this.computeCartTotals();
  }
  
  removeItemQuantity(item: ShoppingCartItem) {
    const existingProductIndex = this.cartItems.findIndex(currentItem => currentItem.product.id === item.product.id);
  
    if (existingProductIndex !== -1) {
      if (this.cartItems[existingProductIndex].bagQuantity === 1) {
        this.cartItems.splice(existingProductIndex, 1);
      } else {
        this.cartItems[existingProductIndex].bagQuantity--;
      }
    }
  
    this.computeCartTotals();
  }

}
