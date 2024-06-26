import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartItem } from '../model/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: ShoppingCartItem[] = [];
  cartItemsChanged: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private snackBar: MatSnackBar) { }

  addItemToCart(item: ShoppingCartItem) {
    const existingProduct = this.cartItems.find(currentItem => currentItem.product.productDetails[0].id === item.product.productDetails[0].id);

    if (existingProduct) {
      if(existingProduct.product.productDetails[0].quantity === existingProduct.bagQuantity) {
       
      } else {
        this.showCustomSnackbar("Uspjesno ste dodali u korpu!");
        existingProduct.bagQuantity += item.bagQuantity;
      }
      
    } else {
      if(item.product.productDetails[0].quantity > 0) {
        this.showCustomSnackbar("Uspjesno ste dodali u korpu!");
        this.cartItems.push(item);
        this.computeCartTotals();
      } else {
        if(item.reservation) {
          this.showCustomSnackbar("Uspjesno ste dodali rezervisani proizvod u korpu!");
          this.cartItems.push(item);
          this.computeCartTotals();
        }
      }
    }
  }

  private computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    
    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.bagQuantity * currentCartItem.product.price;
      totalQuantityValue += 1;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.cartItemsChanged.next([...this.cartItems]);
  }

  getCartItems(): ShoppingCartItem[] {
    return [...this.cartItems];
  }

  addItemQuantity(item: ShoppingCartItem) {
    const existingProduct = this.cartItems.find(currentItem => currentItem.product.productDetails[0].id === item.product.productDetails[0].id);
  
    if (existingProduct) {
      if(existingProduct.product.productDetails[0].quantity === existingProduct.bagQuantity) {

      } else {
        existingProduct.bagQuantity++;
      }
      
    } else {
      this.cartItems.push({ ...item, bagQuantity: 1 });
    }
  
    this.computeCartTotals();
  }
  
  removeItemQuantity(item: ShoppingCartItem) {
    const existingProductIndex = this.cartItems.findIndex(currentItem => currentItem.product.productDetails[0].id === item.product.productDetails[0].id);
  
    if (existingProductIndex !== -1) {
      if (this.cartItems[existingProductIndex].bagQuantity === 1) {
        this.cartItems.splice(existingProductIndex, 1);
      } else {
        this.cartItems[existingProductIndex].bagQuantity--;
      }
    }
  
    this.computeCartTotals();
  }

  clearShoppingCart() {
    this.cartItems = []; 
    this.totalPrice.next(0); 
    this.totalQuantity.next(0); 
    this.cartItemsChanged.next([]); 
  }

  showCustomSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message },
      duration: 5000, 
      horizontalPosition: 'center', 
      verticalPosition: 'bottom'
    });
  }

}
