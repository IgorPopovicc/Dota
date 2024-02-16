import { Component, OnInit } from "@angular/core";
import { ProductComponent } from "../../components/product/product.component";
import { CommonModule } from "@angular/common";
import { ShoppingCartItem } from "../../model/Product";
import { ShoppingCartService } from "../../service/shopping-cart.service";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'shopping-cart',
    standalone: true,
    imports: [
        CommonModule,
        ProductComponent
    ],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

    public cart: ShoppingCartItem[] = [];
    public totalPrice: number = 0;
    private cartSubscription: Subscription;
  
    constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }
  
    ngOnInit(): void {    
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              window.scrollTo(0, 0);
            }
        });

        this.cart = this.shoppingCartService.getCartItems();
        this.totalPrice = this.shoppingCartService.totalPrice.value;
    
        this.cartSubscription = this.shoppingCartService.cartItemsChanged.subscribe(items => {
            this.cart = items;
            this.totalPrice = this.shoppingCartService.totalPrice.value;
        });
    }
  
    ngOnDestroy(): void {
        this.cartSubscription.unsubscribe();
    }

    addItem(item: ShoppingCartItem) {
        this.shoppingCartService.addItemQuantity(item);
    }

    removeItem(item: ShoppingCartItem) {
        this.shoppingCartService.removeItemQuantity(item);
    }
  
    openOrderDetails() {
        this.router.navigate(["order-details"]);
    }

}