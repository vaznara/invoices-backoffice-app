import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BSColor } from '../../interfaces/ui';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() id!: string;
  @Input() color: BSColor = 'primary';
  @Input() text?: string;
  @Input() isDismissible: boolean = true;

  @Output() alertHide: EventEmitter<void> = new EventEmitter();

  @ViewChild('alert') alertElement?: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  onClose(): void {
    this.renderer.removeClass(this.alertElement?.nativeElement, 'show');
    this.renderer.removeClass(this.alertElement?.nativeElement, 'fade');
    this.alertHide.emit();
  }

  get alertColor(): string {
    return `alert-${this.color}`;
  }
}
