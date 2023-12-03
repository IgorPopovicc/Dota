import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ShoppingCartItem } from '../../model/ShoppingCartItem';
import { ShoppingCartService } from '../../service/shopping-cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 

  count = 0;

  constructor(private productsService: ProductsService, private cartService: ShoppingCartService) {}

  addToShoppingCart() {
    this.count++;
    let cartItem = new ShoppingCartItem(this.count);
    this.cartService.addItemToCart(cartItem); 
  }

}
