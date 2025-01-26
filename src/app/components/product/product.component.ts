import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/Product';

@Component({
  selector: 'dota-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {

  @Input() product: Product;

}
