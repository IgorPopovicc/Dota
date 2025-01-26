import { CommonModule, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import { RouterService } from '../../service/router.service';

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
export class OrderMessageComponent implements AfterViewInit {

  isReservation: boolean = false;
  isError: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private loadingService: LoadingService,
    private routerService: RouterService
  ) {
    if (!isPlatformServer(this.platformId)) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state;

      this.isReservation = state?.['body']?.isReservation ?? false;
      this.isError = state?.['body']?.isError ?? false;
    }

    this.loadingService.show();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  goToShop() {
    this.routerService.routerByPath('home');
  }

}
