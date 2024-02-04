import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

  closePromotionDialog() {
    this.closed.emit();
  }

}
