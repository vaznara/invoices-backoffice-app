import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appToggleBootstrapEl]',
  standalone: true,
})
export class ToggleBootstrapElDirective implements AfterViewInit, OnDestroy {
  @Input() appToggleBootstrapEl?: HTMLElement;
  @Input() dismissEl?: HTMLElement;

  constructor(private elRef: ElementRef) {}

  @HostListener('click')
  onClick() {
    if (this.appToggleBootstrapEl) {
      this.appToggleBootstrapEl.classList.toggle('show');
      return;
    }

    this.elRef.nativeElement.classList.toggle('show');
  }

  ngAfterViewInit(): void {
    if (this.dismissEl) {
      this.dismissEl.addEventListener('click', () => {
        if (this.appToggleBootstrapEl) {
          this.appToggleBootstrapEl.classList.remove('show');
          return;
        }
        this.elRef.nativeElement.classList.remove('show');
      });
    }
  }

  ngOnDestroy(): void {
    if (this.dismissEl) {
      this.dismissEl.removeEventListener('click', () => {
        this.elRef.nativeElement.classList.remove('show');
      });
    }
  }
}
