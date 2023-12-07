import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dota-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<img [src]="iconPath" [alt]="altText">`,
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = '';
}
