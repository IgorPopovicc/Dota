import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'promotion-dialog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss']
})
export class PromotionDialogComponent implements OnInit {

  @Output() closed = new EventEmitter<void>();

  @Input() description: string;
  @Input() oldPrice: string;
  @Input() newPrice: string;
  @Input() buttonText: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  checkWallets() {
    this.router.navigate(['/products']);
  }

  closePromotionDialog() {
    this.closed.emit();
  }

}
