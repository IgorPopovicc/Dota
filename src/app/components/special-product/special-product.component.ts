import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../model/Product';
import { Router } from '@angular/router';
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
export class SpecialProductComponent { 

  backgroundImageUrl = 'putanja/do/slike.jpg';
  componentName = 'Naziv komponente';
  componentDescription = 'Ovde treba da stoji neki opis ili citat vezan za torbicu. Ovde treba da stoji neki opis ili citat vezan za torbicu.';
  containerHeight: number = 500;
  product: Product;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setContainerHeight();
  }

  constructor(private routerService: RouterService, private productService: ProductsService) {}

  ngOnInit(): void {
    this.setContainerHeight();
    this.productService.getProductById("9").subscribe(result => {
      if(result) {
        this.product = result as Product;
        console.log("RESULT BY ID: ", result);
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
