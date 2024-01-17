import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading.next(true);
    document.body.classList.add('loading-active');
  }

  hide() {
    this.isLoading.next(false);
    document.body.classList.remove('loading-active');
  }
}

