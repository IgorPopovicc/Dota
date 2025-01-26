import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterService } from '../../service/router.service';

@Component({
  selector: 'promotion-dialog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss']
})
export class PromotionDialogComponent{

  @Output() closed = new EventEmitter<void>();

  @Input() description: string;
  @Input() oldPrice: string;
  @Input() newPrice: string;
  @Input() buttonText: string;

  constructor(private routerService: RouterService) { }

  checkWallets() {
    this.routerService.routerByPath('products');
  }

  closePromotionDialog() {
    this.closed.emit();
  }

}
