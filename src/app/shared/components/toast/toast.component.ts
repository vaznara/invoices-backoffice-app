import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements AfterViewInit, OnDestroy {
  @Input() id!: string;
  @Input() timeout: number | null = 5000;
  @Input() hasCloseButton = false;
  @Input() isCloseButtonWhite = false;
  @Input() shouldFade: boolean = true;

  @Output() toastShow: EventEmitter<void> = new EventEmitter();
  @Output() toastHide: EventEmitter<void> = new EventEmitter();

  @ViewChild('toastRef') toastElement?: ElementRef<HTMLDivElement>;

  private _destroy$ = new Subject<void>();
  private _timeoutId: NodeJS.Timeout | null = null;

  private readonly _durationPadding: number = 5;
  private readonly _toggleClassName: string = 'show';
  private readonly _transitionClassName: string = 'showing';

  constructor(
    private renderer: Renderer2,
    private toastService: ToastService,
  ) {}

  get isShown(): boolean {
    return this.toastElement?.nativeElement.classList.contains(this._toggleClassName) ?? false;
  }

  onClose(): void {
    if (!this.isShown) {
      return;
    }

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    const completeTransition = (): void => {
      this.renderer.removeClass(this.toastElement?.nativeElement, this._transitionClassName);
      this.renderer.removeClass(this.toastElement?.nativeElement, this._toggleClassName);
      this.toastHide.emit();
    };

    this.renderer.addClass(this.toastElement?.nativeElement, this._transitionClassName);

    if (this.shouldFade) {
      this._timeoutId = setTimeout(completeTransition, this._durationPadding);
    } else {
      completeTransition();
    }
  }

  onShow(): void {
    if (this.isShown) {
      return;
    }

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    const completeTransition = (): void => {
      this.renderer.removeClass(this.toastElement?.nativeElement, this._transitionClassName);
      this.toastShow.emit();
    };

    this.renderer.addClass(this.toastElement?.nativeElement, this._toggleClassName);
    this.renderer.addClass(this.toastElement?.nativeElement, this._transitionClassName);

    if (this.shouldFade) {
      this._timeoutId = setTimeout(completeTransition, this._durationPadding);
    } else {
      completeTransition();
    }
  }

  ngAfterViewInit(): void {
    this.toastService.showToast$.pipe(takeUntil(this._destroy$)).subscribe((id) => {
      if (id === this.id) {
        this.onShow();
        if (this.timeout) {
          setTimeout(() => {
            this.onClose();
          }, this.timeout);
        }
      }
    });

    this.toastService.hideToast$.pipe(takeUntil(this._destroy$)).subscribe((id) => {
      if (id === this.id) {
        this.onClose();
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
