import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { BSColor } from '../interfaces';
import { Clipboard } from '@angular/cdk/clipboard';
import { CopyTextComponent } from '../components/copy-text/copy-text.component';

@Directive({
  selector: '[appCopyText]',
  standalone: true,
})
export class CopyTextDirective implements OnInit {
  @Input() color: BSColor = 'primary';
  @Output() copy: EventEmitter<string> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private vcr: ViewContainerRef,
    private clipboard: Clipboard,
  ) {}

  ngOnInit() {
    const componentRef = this.vcr.createComponent(CopyTextComponent);
    (this.elementRef.nativeElement as HTMLElement).appendChild(componentRef.location.nativeElement);
    componentRef.instance.copy.subscribe(() => {
      const textToCopy: string = this.elementRef.nativeElement.textContent;
      componentRef.instance.copyState = this.clipboard.copy(textToCopy.trim());
    });
  }
}
