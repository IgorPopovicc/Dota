import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../model/Product';
import { RouterService } from '../../service/router.service';
import { ProductsService } from '../../service/products.service';

@Component({
    selector: 'special-product',
    standalone: true,
    templateUrl: './special-product.component.html',
    styleUrl: './special-product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProductComponent
    ]
})
export class SpecialProductComponent implements OnInit {
  componentName: string;
  componentDescription: string;
  containerHeight: number = 500;
  product: Product;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setContainerHeight();
  }

  constructor(private routerService: RouterService, private productService: ProductsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setContainerHeight();
    this.productService.getProductById("31").subscribe(result => {
      if(result) {
        this.product = result as Product;
        this.cdr.markForCheck();
        this.componentName = this.product.name;
        this.componentDescription = this.product.productDetails[0].info;
      }
    })
  }

  setContainerHeight(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.containerHeight = 200;
      } else if (screenWidth < 992) {
        this.containerHeight = 300;
      } else {
        this.containerHeight = 500;
      }
    }
  }

  getHeight(): string {
    return `${this.containerHeight}px`;
  }

  openProductDetails(product: Product) {
    this.routerService.routerByPathAndRequestParamWithBody("product-details", product.id, product );
  }

}
