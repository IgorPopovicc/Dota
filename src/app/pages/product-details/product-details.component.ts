import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Product, ProductDetails, ShoppingCartItem } from '../../model/Product';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ProductComponent } from '../../components/product/product.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { PromotionDialogComponent } from '../../components/promotion-dialog/promotion-dialog.component';
import { RouterService } from '../../service/router.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import {ProductsService} from "../../service/products.service";

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
  images: GalleryItem[] = [];
  isPhone: boolean = false;
  isTablet: boolean = false;
  products: Array<Product>;
  displayPromotion: boolean = false;
  outOfStocks: boolean = false;

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService,
              private routerService: RouterService,
              private loadingService: LoadingService,
              private route: ActivatedRoute,
              private productsService: ProductsService
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');

    // Ako postoji proizvod u stanju navigacije, koristi ga
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { body?: Product };
    this.productsService.getProductsByType('novcanik').subscribe( result => {
      this.products = new Array<Product>();
      this.products = result;
    })

    if (state && state.body) {
      this.product = state.body;
      this.selectedProductDetails = this.product.productDetails[0];

      this.checkScreenSize();
      if(this.product) {
        this.outOfStocks = this.selectedProductDetails.quantity === 0;
        for(const element of this.product.productDetails[0].images) {
          this.images.push(new ImageItem({ src: element.imagePath, thumb: element.imagePath }))
        }
      }

    } else if (productId) {
      this.loadingService.show();
      this.productsService.fetchProductDetailsById(productId).subscribe( result => {
        console.log('Product by id: ', result);

        if (!this.product) {
          this.product = {} as Product;
        }

        Object.assign(this.product, result);
        this.selectedProductDetails = this.product.productDetails[0];

        this.checkScreenSize();
        if(this.product) {
          this.outOfStocks = this.selectedProductDetails.quantity === 0;
          for(const element of this.product.productDetails[0].images) {
            this.images.push(new ImageItem({ src: element.imagePath, thumb: element.imagePath }))
          }
        }

        this.loadingService.hide();
      });
    }

    this.displayPromotion = true;

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
    const selectedProduct: Product = new Product();
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
