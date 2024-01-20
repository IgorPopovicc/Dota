import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private router: Router) {
    console.log("PRODUCT: ", this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {

  }

}
