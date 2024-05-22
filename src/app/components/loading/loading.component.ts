import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'dota-loading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div *ngIf="loadingService.isLoading | async" class="loading-overlay">
              <div class="spinner"> 
                <img src="./assets/images/logo/main-logo.svg" alt="logo">
                <img class="spinner" src="./assets/images/icons/loading.svg" alt="loading">
              </div>
            </div>`,
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { 

  constructor(public loadingService: LoadingService) {} 

}
