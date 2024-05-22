import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ShoppingCartItem } from '../../model/Product';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ProductComponent } from '../../components/product/product.component';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { PromotionDialogComponent } from '../../components/promotion-dialog/promotion-dialog.component';
import { RouterService } from '../../service/router.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

}
