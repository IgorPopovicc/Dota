import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../model/Product';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  list: any[] = [];
  sortedList: any[] = [];

  pageIndex = 0;
  pageSize = 10;

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    this.initIntersectionObserver();
  }

  @HostListener('change', ['$event.target'])
  onChange(target) {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.removeAttribute('open');
    }
  }

  getProductsForHomePage() {
    let product: Product = {
      id: "1",
      name: "MOONLIGHT",
      imagesDisplay: {
        imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
        imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
        imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
      },
      price: 2000,
      type: "mini bag",
      color: "#000000",
      quantity: 5
    };
    return product;
  }

  loadProducts() {
    this.getProducts(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.list.push(...data);
        this.sortedList.push(...data);
        this.pageIndex++;
      });
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadProducts();
          }
        });
      }, options);

      observer.observe(this.elementRef.nativeElement.querySelector('.load-more-trigger'));
    }
  }

  getProducts(index: number, pageSize: number): Observable<Product[]> {
    const mockData = [
      {
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
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
          imageDisplay2: "./assets/images/products/bags/bag-2-test/bag-2-test.avif",
          imageDisplay3: "./assets/images/products/bags/bag-2-test/bag-2-test.avif"
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
          imageDisplay2: "./assets/images/products/bags/bag-3-test/bag-3-test.avif",
          imageDisplay3: "./assets/images/products/bags/bag-3-test/bag-3-test.avif"
        },
        price: 1900,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "4",
        name: "RESERVED",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/bag-4-test/bg-4-test.avif",
          imageDisplay2: "./assets/images/products/bags/bag-4-test/bg-4-test.avif",
          imageDisplay3: "./assets/images/products/bags/bag-4-test/bg-4-test.avif"
        },
        price: 3100,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      },{
        id: "1",
        name: "MOONLIGHT",
        imagesDisplay: {
          imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
          imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
        },
        price: 2000,
        type: "mini bag",
        color: "#000000",
        quantity: 5
      }
    ];
    const startIndex = index * pageSize;
    const endIndex = startIndex + pageSize;
    return of(mockData.slice(startIndex, endIndex)); // Paginacija mock podataka
  }

  openProductDetails(product: Product) {
    this.router.navigate(["product-details", product.id],  { state: { product } } );
  }

  sortProducts(order: string) {
    switch (order) {
        case 'asc':
            this.sortedList = this.list.slice().sort((a, b) => a.price - b.price);
            break;
        case 'desc':
            this.sortedList = this.list.slice().sort((a, b) => b.price - a.price);
            break;
        default:
            this.sortedList = this.list.slice();
            break;
    }
}

}
