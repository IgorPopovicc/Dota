import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ShoppingCartItem } from '../../model/ShoppingCartItem';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ProductComponent } from "../../components/product/product.component";
import { Product } from '../../model/Product';
import { SpecialProductComponent } from "../../components/special-product/special-product.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingService } from '../../service/loading.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProductComponent,
        SpecialProductComponent,
        LoadingComponent
    ]
})
export class HomeComponent implements OnInit, AfterViewInit { 
  
  public count = 0;
  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDropdownOpen: boolean = false;
  public products: Array<Product>;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }


  constructor(private productsService: ProductsService, 
              private cartService: ShoppingCartService,
              private loadingService: LoadingService) {
    this.products = new Array<Product>;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.checkScreenSize();
    for(let i = 0; i < 3; i++) {
      this.products.push(this.getProductsForHomePage());
    }
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadingService.hide();
    }, 0);
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth >= 481 && screenWidth <= 884;
    }
  }

  addToShoppingCart() {
    this.count++;
    let cartItem = new ShoppingCartItem(this.count);
    this.cartService.addItemToCart(cartItem); 
  }

  getProductsForHomePage() {
    let product: Product = {
      id: "1",
      name: "MOONLIGHT",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/test-product/product1.png"
      },
      price: 2000,
      type: "mini bag",
      color: "#000000",
      quantity: 5
    };
    return product;
  }

}
