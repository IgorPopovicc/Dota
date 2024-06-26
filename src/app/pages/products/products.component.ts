import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../model/Product';
import { Observable, of } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import { ProductsService } from '../../service/products.service';
import { RouterService } from '../../service/router.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    LoadingComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  list: any[] = [];
  sortedList: any[] = [];
  searchTerm: string = '';
  order: string = 'default';

  pageIndex = 0;
  pageSize = 12;

  product: any[] = []

  constructor(private elementRef: ElementRef, private routerService: RouterService, private loadingService: LoadingService, private productService: ProductsService) {
    this.loadingService.show();
   }

  @HostListener('change', ['$event.target'])
  onChange(target) {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.removeAttribute('open');
    }
  }

  ngOnInit() {
    //this.loadProducts();
    this.initIntersectionObserver();
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  // loadProducts() {
  //   this.productService.getAllProducts().subscribe(data => {
  //     this.product = data;
  //     this.getProducts(this.pageIndex, this.pageSize)
  //     .subscribe((data: any) => {
  //       console.log("DATA ", data);
  //       if(data) {
  //         this.list.push(...data);
  //       this.sortedList.push(...data);
  //       this.pageIndex++;
  //       }
  //     });
  //   })
  // }

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
            //this.loadProducts();
          }
        });
      }, options);

      observer.observe(this.elementRef.nativeElement.querySelector('.load-more-trigger'));
    }
  }

  // getProducts(index: number, pageSize: number): Observable<Product[]> {
  //   if(this.product) {
  //     let mockData = this.product;
  //     const startIndex = index * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     return of(mockData.slice(startIndex, endIndex));
  //   } else {
  //     return of([]);
  //   } 
  // }

  openProductDetails(product: Product) {
    this.routerService.routerByPathAndRequestParamWithBody("product-details", product.id,  product);
  }

  sortProducts(order: string) {
    this.order = order;
    this.searchTerm = '';
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

  filterProducts($event) {
    console.log($event.target.value);
    let filter = $event.target.value;
    this.sortProducts(this.order);
    this.sortedList = this.sortedList.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

}
