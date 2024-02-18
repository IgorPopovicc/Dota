import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-order-message',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent
  ],
  templateUrl: './order-message.component.html',
  styleUrls: ['./order-message.component.scss']
})
export class OrderMessageComponent implements OnInit {

  constructor(private router: Router, private loadingService: LoadingService) { 
    this.loadingService.show();
  }

  ngOnInit() {
  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  goToShop() {
    this.router.navigate(['/home']);
  }

}
