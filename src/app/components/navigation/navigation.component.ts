import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { ProductsService } from '../../service/products.service';
import { ShoppingCartService } from '../../service/shopping-cart.service';

@Component({
    selector: 'dota-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        HttpClientModule,
        IconComponent
    ]
})
export class NavigationComponent implements OnInit { 
  constructor(private productsService: ProductsService, private cartService: ShoppingCartService) {}

  public isPhone: boolean = false;
  public count = signal(0);

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isPhoneScreen();
  }

  ngOnInit(): void {
    this.updateCartItemsStatus();
  }

  isPhoneScreen(): void {
    this.isPhone = window.innerWidth < 500;
  }

  updateCartItemsStatus() {
    this.cartService.totalQuantity.subscribe(
      data => { 
        this.count.update(() => data) 
      }
    )
  }

}
