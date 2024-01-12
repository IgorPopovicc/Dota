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
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit { 

  @Input() product: Product;

  name: string;
  price: number;
  type: string;
  displayImage: string;

  ngOnInit(): void {
    if(this.product) {
      this.name = this.product.name ? this.product.name : "Nepoznato";
      this.type = this.product.type ? this.product.type : "Nepoznato"; 
      this.price = this.product.price ? this.product.price : 0;  
      this.displayImage = this.product.imagesDisplay ? this.product.imagesDisplay.imageDisplay1 : "";
    }
  }

}
