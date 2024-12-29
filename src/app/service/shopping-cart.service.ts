import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartItem } from '../model/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: ShoppingCartItem[] = [];
  cartItemsChanged: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly isBrowser: boolean;

  constructor(
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadCartFromStorage();
    }
  }

  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice.value));
    localStorage.setItem('totalQuantity', JSON.stringify(this.totalQuantity.value));
  }

  private loadCartFromStorage() {
    const storedItems = localStorage.getItem('cartItems');
    const storedPrice = localStorage.getItem('totalPrice');
    const storedQuantity = localStorage.getItem('totalQuantity');

    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    this.totalPrice.next(storedPrice ? JSON.parse(storedPrice) : 0);
    this.totalQuantity.next(storedQuantity ? JSON.parse(storedQuantity) : 0);

    this.cartItemsChanged.next([...this.cartItems]);
  }

  addItemToCart(item: ShoppingCartItem) {
    const existingProduct = this.cartItems.find(currentItem => currentItem.product.productDetails[0].id === item.product.productDetails[0].id);

    if (existingProduct) {
      if(existingProduct.product.productDetails[0].quantity === existingProduct.bagQuantity) {

      } else {
        this.showCustomSnackbar("Uspjesno ste dodali u korpu!");
        existingProduct.bagQuantity += item.bagQuantity;
        this.computeCartTotals();
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
        this.computeCartTotals();
      }
      this.computeCartTotals();
    }
    this.saveCartToStorage();
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

    this.saveCartToStorage();
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
        this.computeCartTotals();
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
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantity');
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
