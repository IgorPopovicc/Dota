import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingComponent } from "../../components/loading/loading.component";
import { RouterService } from "../../service/router.service";
import { LoadingService } from "../../service/loading.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'privacy-details',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit, AfterViewInit {
  type: string | null = null;

  constructor(private loadingService: LoadingService, private routerService: RouterService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
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
