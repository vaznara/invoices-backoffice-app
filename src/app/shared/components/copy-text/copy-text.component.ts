import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-copy-text',
  standalone: true,
  imports: [MatTooltip],
  templateUrl: './copy-text.component.html',
  styleUrl: './copy-text.component.scss',
})
export class CopyTextComponent {
  @Output() copy: EventEmitter<void> = new EventEmitter();
  @Input() set copyState(state: boolean) {
    if (state) {
      this.tooltip?.show();
    }
  }

  private tooltip?: MatTooltip;

  onClick(tooltip: MatTooltip) {
    this.tooltip = tooltip;
    this.copy.emit();
  }
}
