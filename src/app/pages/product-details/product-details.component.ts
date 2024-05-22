import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductDetails, ShoppingCartItem } from '../../model/Product';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ProductComponent } from '../../components/product/product.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { PromotionDialogComponent } from '../../components/promotion-dialog/promotion-dialog.component';
import { RouterService } from '../../service/router.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    CommonModule,
    GalleryModule,
    ProductComponent,
    PromotionDialogComponent,
    LoadingComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  product: Product;
  selectedProductDetails: ProductDetails;
  images: GalleryItem[];
  isPhone: boolean = false;
  isTablet: boolean = false;
  products: Array<Product>;
  displayPromotion: boolean = false;
  outOfStocks: boolean = false;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private routerService: RouterService, private loadingService: LoadingService) {
    let item = this.router.getCurrentNavigation().extras.state;
    if(item && item['body']) {
      this.product = item['body'];
      this.selectedProductDetails = this.product.productDetails[0];
      this.products = new Array<Product>();
      this.products.push(this.product);
      this.products.push(this.product);
      this.products.push(this.product);
      this.products.push(this.product);
      this.products.push(this.product);
    }
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.displayPromotion = true;
    this.checkScreenSize();
    if(this.product) {
      this.outOfStocks = this.selectedProductDetails.quantity === 0;
      this.images = [
        new ImageItem({ src: this.product.productDetails[0].images[0].imagePath, thumb: this.product.productDetails[0].images[0].imagePath }),
        new ImageItem({ src: this.product.productDetails[0].images[1].imagePath, thumb: this.product.productDetails[0].images[1].imagePath }),
        new ImageItem({ src: this.product.productDetails[0].images[2].imagePath, thumb: this.product.productDetails[0].images[2].imagePath })
      ];
    }
  }

  ngAfterViewInit(): void {
    this.loadingService.hide();
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth >= 481 && screenWidth <= 884;
    }
  }

  openProductDetails(product: Product) {
    this.routerService.routerByPathAndRequestParamWithBody("product-details", product.id, product);
  }

  addToBag() {
    let selectedProduct: Product = new Product();
    selectedProduct.name = this.product.name;
    selectedProduct.price = this.product.price;
    selectedProduct.size = this.product.size;
    selectedProduct.type = this.product.type;
    selectedProduct.productDetails = [];
    selectedProduct.productDetails[0] = this.selectedProductDetails;
    this.shoppingCartService.addItemToCart(new ShoppingCartItem(selectedProduct, 1, false));
  }

  makeReservation() {
    let selectedProduct: Product = new Product();
    selectedProduct.name = this.product.name;
    selectedProduct.price = this.product.price;
    selectedProduct.size = this.product.size;
    selectedProduct.type = this.product.type;
    selectedProduct.productDetails = [];
    selectedProduct.productDetails[0] = this.selectedProductDetails;
    this.shoppingCartService.addItemToCart(new ShoppingCartItem(selectedProduct, 1, true));
    //this.routerService.routerWithBody("order-details", product);
  }

  changeProductDetails(id: number) { 
    this.selectedProductDetails = this.product.productDetails.find(details => { return details.id === id });
    this.images = [];
    this.outOfStocks = this.selectedProductDetails.quantity > 0 ? false : true;
    for(let i = 0; i < this.selectedProductDetails.images.length; i++) {
      this.images.push(new ImageItem({ src: this.selectedProductDetails.images[i].imagePath, thumb: this.selectedProductDetails.images[i].imagePath }))
    }
  }

  handleClose() {
    this.displayPromotion = false;
  }

}
