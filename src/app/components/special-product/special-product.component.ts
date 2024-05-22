import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../model/Product';
import { Router } from '@angular/router';
import { RouterService } from '../../service/router.service';

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

  constructor(private routerService: RouterService) {}

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
    id: 2,
    name: "CREAM BAG",
    productDetails: [{
      color: '#ffffff',
      info: 'test',
      productId: 3,
      quantity: 5,
      images: [
        {
            id: 1,
            isDisplay: true,
            imagePath: "https://dota-bucket-test.s3.eu-central-1.amazonaws.com/images/torbica/Moonlight/black/5e84efbc-1a67-45ed-94ff-274ce728b5aa.jpg"
        },
        {
            id: 2,
            isDisplay: false,
            imagePath: "https://dota-bucket-test.s3.eu-central-1.amazonaws.com/images/torbica/Moonlight/black/fbdd3e2f-2ef8-48c6-9a90-e9351c520e7b.jpg"
        },
        {
            id: 3,
            isDisplay: false,
            imagePath: "https://dota-bucket-test.s3.eu-central-1.amazonaws.com/images/torbica/Moonlight/black/5d4dc253-e3f4-4a44-a254-0e546b43b6a7.jpg"
        },
      ],
    }],
    price: 2300,
    type: "bag"
  };

  openProductDetails(product: Product) {
    this.routerService.routerByPathAndRequestParamWithBody("product-details", product.id, product );
  }

}
