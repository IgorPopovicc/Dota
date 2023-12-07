import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ProductsService } from '../../service/products.service';
import { ShoppingCartService } from '../../service/shopping-cart.service';

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
    private cartService: ShoppingCartService
  ) {}

  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDropdownOpen: boolean = false;

  public count = signal(0);

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

}
