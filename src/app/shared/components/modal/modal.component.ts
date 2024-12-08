import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() hasCloseBtn: boolean = true;
  @Input() isScrollable: boolean = false;
  @Input() isVerticallyCentered: boolean = false;
  @Input() hasFooter: boolean = true;
  @Input() hasHeader: boolean = true;
  @Input() size: 'sm' | 'lg' | 'xl' | null = null;
  @Input() isFullscreen: boolean = false;
  @Input() fullScreenOnSize: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | null = null;
  @Input() dialogRef: MatDialogRef<any> = this.defaultDialogRef;

  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private defaultDialogRef: MatDialogRef<ModalComponent>) {
    this.dialogRef.backdropClick().subscribe(() => console.log('backdrop clicked'));
  }

  onClose(): void {
    this.closeModal.emit();
  }

  private get modalSize(): string {
    return this.size ? `modal-${this.size}` : '';
  }

  private get modalFullScreenClass(): string {
    return this.fullScreenOnSize
      ? `modal-fullscreen-${this.fullScreenOnSize}-down`
      : 'modal-fullscreen';
  }

  get modalClasses() {
    return {
      'modal-dialog-centered': this.isVerticallyCentered,
      'modal-dialog-scrollable': this.isScrollable,
      [this.modalSize]: this.size,
      [this.modalFullScreenClass]: this.isFullscreen,
    };
  }
}
