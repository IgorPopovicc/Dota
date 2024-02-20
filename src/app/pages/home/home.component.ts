import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ProductComponent } from "../../components/product/product.component";
import { Product } from '../../model/Product';
import { SpecialProductComponent } from "../../components/special-product/special-product.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingService } from '../../service/loading.service';
import { Router } from '@angular/router';

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


  constructor(private loadingService: LoadingService, private router: Router) {
    this.products = new Array<Product>;
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.products = this.getProductsForHomePage();
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth >= 481 && screenWidth <= 884;
    }
  }

  getProductsForHomePage() {
    let product: Product[] = [{
      id: "1",
      name: "MOONLIGHT",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/test-product/bag-1-test.png",
        imageDisplay2: "./assets/images/products/bags/test-product/bag-1-display2.jpeg",
        imageDisplay3: "./assets/images/products/bags/test-product/bag-1-display3.png"
      },
      price: 2000,
      type: "mini bag",
      color: "#000000",
      quantity: 5
    },{
      id: "2",
      name: "CREAM BAG",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/bag-2-test/bag-2-test.avif",
        imageDisplay2: "./assets/images/products/bags/bag-2-test/bag-2-display2.jpeg",
        imageDisplay3: "./assets/images/products/bags/bag-2-test/bag-2-display3.jpeg"
      },
      price: 2300,
      type: "bag",
      color: "#000000",
      quantity: 4
    },{
      id: "3",
      name: "BLACKY",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/bag-3-test/bag-3-test.avif",
        imageDisplay2: "./assets/images/products/bags/bag-3-test/bag-3-display2.jpeg",
        imageDisplay3: "./assets/images/products/bags/bag-3-test/bag-3-display3.jpeg"
      },
      price: 1900,
      type: "mini bag",
      color: "#000000",
      quantity: 0
    },{
      id: "4",
      name: "RESERVED",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/bag-4-test/bag-4-test.avif",
        imageDisplay2: "./assets/images/products/bags/bag-4-test/bag-4-display2.jpeg",
        imageDisplay3: "./assets/images/products/bags/bag-4-test/bag-4-display3.jpeg"
      },
      price: 3100,
      type: "mini bag",
      color: "#000000",
      quantity: 5
    }];
    return product;
  }

  openProductDetails(product: Product) {
    this.router.navigate(["product-details", product.id],  { state: { product } } );
  }

  openProducts() {
    this.router.navigate(["/products"]);
  }

}
