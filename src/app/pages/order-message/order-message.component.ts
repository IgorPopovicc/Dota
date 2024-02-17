import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-message',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-message.component.html',
  styleUrls: ['./order-message.component.scss']
})
export class OrderMessageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToShop() {
    this.router.navigate(['/home']);
  }

}
