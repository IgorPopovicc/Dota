import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { RouterService } from '../../service/router.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fromEvent, Subscription, throttleTime } from 'rxjs';

@Component({
  selector: 'dota-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HttpClientModule, IconComponent, NgOptimizedImage],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isScrolled: boolean = false;

  constructor(
    private cartService: ShoppingCartService,
    private elRef: ElementRef,
    private routerService: RouterService,
    protected router: Router,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDropdownOpen: boolean = false;
  public count = signal(0);
  private routerSubscription: Subscription;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.updateCartItemsStatus();
      this.checkScrollPosition();

      fromEvent(window, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(() => this.checkScrollPosition());
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (isPlatformBrowser(this.platformId) && (this.isPhone || this.isTablet) && this.isDropdownOpen === true) {
      const hamburgerMenu = this.elRef.nativeElement;
      const dropdownMenu = hamburgerMenu.querySelector('.dropdown-menu');

      if (!hamburgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
        this.closeDropdown();
      }
    }
  }

  private closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScrollPosition();
    }
  }

  checkScrollPosition() {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (this.isHomePage()) {
          this.isScrolled = (this.isPhone && scrollTop > 50) ||
            (this.isTablet && scrollTop > 100) ||
            (!this.isTablet && !this.isPhone && scrollTop > 100);
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth > 480 && screenWidth <= 1200;
    }
  }

  updateCartItemsStatus() {
    this.cartService.totalQuantity.subscribe((data) => {
      this.count.update(() => data);
    });
  }

  public isHomePage(): boolean {
    const currentPath = this.location.path();
    return currentPath === '' || currentPath === '/' || currentPath === '/home';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openShoppingCart() {
    this.routerService.routerByPath('shopping-cart');
    this.isDropdownOpen = false;
  }

  openHomePage() {
    this.routerService.routerByPath('home');
    this.isDropdownOpen = false;
  }

  openContact() {
    this.routerService.routerByPath('contact');
    this.isDropdownOpen = false;
  }

  openProducts() {
    this.routerService.routerByPath('products');
    this.isDropdownOpen = false;
  }

  openProductsByType(type: string) {
    if (type) {
      this.routerService.routerByPath(`/products/type/${type}`);
      this.isDropdownOpen = false;
    } else {
      this.routerService.routerByPath('products');
      this.isDropdownOpen = false;
    }
  }

}
