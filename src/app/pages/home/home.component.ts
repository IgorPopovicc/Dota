import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ProductComponent } from "../../components/product/product.component";
import { Product } from '../../model/Product';
import { SpecialProductComponent } from "../../components/special-product/special-product.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingService } from '../../service/loading.service';
import { Router } from '@angular/router';
import { RouterService } from '../../service/router.service';
import { ProductsService } from '../../service/products.service';

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


  constructor(private loadingService: LoadingService, private routerService: RouterService, private productService: ProductsService) {
    this.products = new Array<Product>;
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.getProductsForHomePage();
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadingService.hide();
    }, 1000);
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth >= 481 && screenWidth <= 884;
    }
  }

  getProductsForHomePage() {
    this.productService.getAllProducts().subscribe(products => {
      if(products) {
        this.products = products;
      }
    });
  }

  openProductDetails(product: Product) {
    this.routerService.routerByPathAndRequestParamWithBody("product-details", product.id, product );
  }

  openProducts() {
    this.routerService.routerByPath("products");
  }

}
