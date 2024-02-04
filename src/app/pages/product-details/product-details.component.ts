import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product, ShoppingCartItem } from '../../model/Product';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ProductComponent } from '../../components/product/product.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { PromotionDialogComponent } from '../../components/promotion-dialog/promotion-dialog.component';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    CommonModule,
    GalleryModule,
    ProductComponent,
    PromotionDialogComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }


  product: Product;
  images: GalleryItem[];
  isPhone: boolean = false;
  isTablet: boolean = false;
  products: Array<Product>;
  displayPromotion: boolean = false;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService) {
    let item = this.router.getCurrentNavigation().extras.state;
    if(item && item['product']) {
      this.product = item['product'];
      this.products = new Array<Product>();
      this.products.push(this.product);
      this.products.push(this.product);
      this.products.push(this.product);
      this.products.push(this.product);
    }
    
  }

  ngOnInit(): void {
    this.displayPromotion = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.checkScreenSize();
    if(this.product) {
      this.images = [
        new ImageItem({ src: this.product.imagesDisplay.imageDisplay1, thumb: this.product.imagesDisplay.imageDisplay1 }),
        new ImageItem({ src: this.product.imagesDisplay.imageDisplay2, thumb: this.product.imagesDisplay.imageDisplay2 }),
        new ImageItem({ src: this.product.imagesDisplay.imageDisplay3, thumb: this.product.imagesDisplay.imageDisplay3 })
      ];
    }
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth >= 481 && screenWidth <= 884;
    }
  }

  openProductDetails(product: Product) {
    this.router.navigate(["product-details", product.id],  { state: { product } } );
  }

  addToBag() {
    this.shoppingCartService.addItemToCart(new ShoppingCartItem(this.product, 1));
  }

  handleClose() {
    this.displayPromotion = false;
  }

}
