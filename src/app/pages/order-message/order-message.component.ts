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

  isReservation: boolean = false;

  constructor(private router: Router, private loadingService: LoadingService) { 
    if(this.router.getCurrentNavigation().extras.state) {
      let reservation = this.router.getCurrentNavigation().extras.state;
      this.isReservation = reservation['isReservation'];
    }
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
