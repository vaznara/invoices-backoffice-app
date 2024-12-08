import { Component, Input, TemplateRef } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AsyncPipe, NgTemplateOutlet],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() actions: TemplateRef<HTMLElement> | null = null;
  constructor(public titleService: TitleService) {}
}
