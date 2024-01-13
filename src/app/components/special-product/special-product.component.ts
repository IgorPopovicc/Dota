import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../model/Product';

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setContainerHeight();
  }

  ngOnInit(): void {
    this.setContainerHeight();
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

  product: Product = {
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
}
