import { CommonModule } from '@angular/common';
import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../model/Product';
import {Observable, of, Subscription} from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import { ProductsService } from '../../service/products.service';
import { RouterService } from '../../service/router.service';
import {ActivatedRoute} from "@angular/router";

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
export class ProductsComponent implements OnInit, OnDestroy {
  list: any[] = [];
  sortedList: any[] = [];
  searchTerm: string = '';
  order: string = 'default';
  pageIndex = 0;
  pageSize = 12;
  product: any[] = []
  private observer: IntersectionObserver | null = null;
  private routeSub: Subscription;
  private currentType: string | null = null;

  constructor(private elementRef: ElementRef,
              private routerService: RouterService,
              private loadingService: LoadingService,
              private productService: ProductsService,
              private route: ActivatedRoute) {
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
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.resetComponentState();
      const type = params.get('type');
      this.currentType = type; // Postavi trenutni tip

      if (!this.observer) {
        this.initIntersectionObserver(); // Inicijalizuj posmatrača samo prvi put
      }

      if (type) {
        this.loadProductsByType(type);
      } else {
        this.loadProducts();
      }
    });
  }


  resetComponentState() {
    // Resetovanje svih potrebnih varijabli
    this.list = [];
    this.sortedList = [];
    this.pageIndex = 0;
    this.product = [];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      this.getProducts(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        console.log("DATA ", data);
        if(data) {
          this.list.push(...data);
        this.sortedList.push(...data);
        this.pageIndex++;
        }
      });
    })
  }

  loadProductsByType(type: string): void {
    this.productService.getProductsByType(type).subscribe(products => {
      this.product = [];
      this.product = products;
      this.getProducts(this.pageIndex, this.pageSize)
        .subscribe((data: any) => {
          console.log("DATA ", data);
          if(data) {
            this.list.push(...data);
            this.sortedList.push(...data);
            this.pageIndex++;
          }
        });
    });
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Proveri trenutni tip i učitaj odgovarajuće proizvode
            if (this.currentType) {
              this.loadProductsByType(this.currentType);
            } else {
              this.loadProducts();
            }
          }
        });
      }, options);

      this.observer.observe(this.elementRef.nativeElement.querySelector('.load-more-trigger'));
    }
  }


  initIntersectionObserverType(type: string) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadProductsByType(type);
          }
        });
      }, options);

      observer.observe(this.elementRef.nativeElement.querySelector('.load-more-trigger'));
    }
  }

  getProducts(index: number, pageSize: number): Observable<Product[]> {
    let mockData = this.product;
    const startIndex = index * pageSize;
    const endIndex = startIndex + pageSize;
    return of(mockData.slice(startIndex, endIndex));
  }

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

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


}
