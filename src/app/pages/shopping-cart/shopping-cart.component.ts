import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShoppingCartItem } from "../../model/Product";
import { ShoppingCartService } from "../../service/shopping-cart.service";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { RouterService } from "../../service/router.service";
import { LoadingService } from "../../service/loading.service";
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
    selector: 'shopping-cart',
    standalone: true,
    imports: [
        CommonModule,
        LoadingComponent
    ],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, AfterViewInit, OnDestroy {

    private stockCheckInterval: any;

    public cart: ShoppingCartItem[] = [];
    public totalPrice: number = 0;
    private cartSubscription: Subscription;

    constructor(private shoppingCartService: ShoppingCartService, private router: Router, private routerService: RouterService, private loadingService: LoadingService) {
        this.loadingService.show();
    }

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

    ngAfterViewInit(): void {
        this.loadingService.hide();
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
        this.routerService.routerByPath("order-details");
    }

    goToShop() {
        this.routerService.routerByPath('/products');
    }

}
