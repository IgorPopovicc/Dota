import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ShoppingCartItem } from '../../model/ShoppingCartItem';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ProductComponent } from "../../components/product/product.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProductComponent
    ]
})
export class HomeComponent { 
  
  public count = 0;
  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDropdownOpen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }


  constructor(private productsService: ProductsService, private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth > 480 && screenWidth <= 1200;
    }
  }

  addToShoppingCart() {
    this.count++;
    let cartItem = new ShoppingCartItem(this.count);
    this.cartService.addItemToCart(cartItem); 
  }

}
