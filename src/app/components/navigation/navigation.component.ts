import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ProductsService } from '../../service/products.service';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dota-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HttpClientModule, IconComponent],
})
export class NavigationComponent implements OnInit {
  constructor(
      private productsService: ProductsService,
      private cartService: ShoppingCartService,
      private elRef: ElementRef, 
      private router: Router
    ) {}

  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDropdownOpen: boolean = false;
  public count = signal(0);

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if((this.isPhone || this.isTablet) && this.isDropdownOpen === true) {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.updateCartItemsStatus();
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
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
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onClickOutside(): void {
    this.isDropdownOpen = false;
  }

  openShoppingCart() {
    this.router.navigate(['/shopping-cart']);
    this.isDropdownOpen = false;
  }

  openHomePage() {
    this.router.navigate(['/home']);
    this.isDropdownOpen = false;
  }

  openContact() {
    this.router.navigate(['/contact']);
    this.isDropdownOpen = false;
  }

  openProducts() {
    this.router.navigate(['/products']);
    this.isDropdownOpen = false;
  }

}
