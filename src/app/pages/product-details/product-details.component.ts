import { CommonModule, Location  } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductDetails, ShoppingCartItem } from '../../model/Product';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ProductComponent } from '../../components/product/product.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { PromotionDialogComponent } from '../../components/promotion-dialog/promotion-dialog.component';
import { RouterService } from '../../service/router.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import { ProductsService } from "../../service/products.service";
import { Meta, Title } from "@angular/platform-browser";

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
              private productsService: ProductsService,
              private meta: Meta,
              private title: Title,
              private location: Location,
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    const detailId = this.route.snapshot.queryParamMap.get('detailId');
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { body?: Product };

    this.productsService.getProductsByType('torbica').subscribe( result => {
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
        this.selectedProductDetails = this.product.productDetails.find(details => details.id === Number(detailId)) || this.product.productDetails[0];

        this.checkScreenSize();
        if(this.product) {
          this.outOfStocks = this.selectedProductDetails.quantity === 0;
          for(const element of this.product.productDetails[0].images) {
            this.images.push(new ImageItem({ src: element.imagePath, thumb: element.imagePath }))
          }

          // Postavljanje Title i Meta Description tagova
          this.title.setTitle(`${this.product.name} - Kupite sada!`);
          this.meta.updateTag({
            name: 'description',
            content: `Kupite ${this.product.name} - ${this.selectedProductDetails.info}. Dostupno sada na najboljoj ceni!`,

          });

          // Dodavanje Open Graph meta tagova za sliku
          this.meta.updateTag({ property: 'og:image', content: this.selectedProductDetails.images[0].imagePath });
          this.meta.updateTag({ property: 'og:image:alt', content: this.product.name });
          this.meta.updateTag({ property: 'og:title', content: this.product.name });
          this.meta.updateTag({ property: 'og:description', content: this.selectedProductDetails.info });
          this.meta.updateTag({ property: 'og:url', content: `https://dotabags.com/product-details/${this.product.id}` });
          this.meta.updateTag({ property: 'og:type', content: 'proizvod' });

          // Dodavanje Twitter meta tagova za sliku
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:title', content: this.product.name });
          this.meta.updateTag({ name: 'twitter:description', content: this.selectedProductDetails.info });
          this.meta.updateTag({ name: 'twitter:image', content: this.selectedProductDetails.images[0].imagePath });
          this.meta.updateTag({ name: 'twitter:image:alt', content: this.product.name });

        }

        this.loadingService.hide();
      });
    }

    const isPromotionSeen = localStorage.getItem('promotionSeen');
    if (!isPromotionSeen) {
      this.displayPromotion = true;
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
  }

  changeProductDetails(id: number) {
    this.selectedProductDetails = this.product.productDetails.find(details => { return details.id === id });
    this.images = [];
    this.outOfStocks = this.selectedProductDetails.quantity <= 0;
    for(let i = 0; i < this.selectedProductDetails.images.length; i++) {
      this.images.push(new ImageItem({ src: this.selectedProductDetails.images[i].imagePath, thumb: this.selectedProductDetails.images[i].imagePath }))
    }

    // Ažuriranje URL-a ručno bez ponovne navigacije
    const currentUrl = this.router.url.split('?')[0];
    const queryParams = new URLSearchParams();
    queryParams.set('detailId', id.toString());

    this.location.replaceState(`${currentUrl}?${queryParams.toString()}`);
  }

  handleClose() {
    this.displayPromotion = false;
    localStorage.setItem('promotionSeen', 'true');
  }

}
