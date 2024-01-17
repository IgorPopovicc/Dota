import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  show() {
    this.isLoading.next(true);
    if (typeof document !== 'undefined') {
      this.renderer.addClass(document.body, 'loading-active');
    }
  }

  hide() {
    this.isLoading.next(false);
    if (typeof document !== 'undefined') {
      this.renderer.removeClass(document.body, 'loading-active');
    }
  }
}

