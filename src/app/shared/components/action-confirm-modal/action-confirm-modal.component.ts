import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { BSColor } from '../../interfaces';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-confirm-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './action-confirm-modal.component.html',
  styleUrl: './action-confirm-modal.component.scss',
})
export class ActionConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() actionButtonColor: BSColor = 'primary';

  @Output() confirmAction: EventEmitter<void> = new EventEmitter();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<ActionConfirmModalComponent>) {}

  onConfirm() {
    this.confirmAction.emit();
    this.dialogRef.close();
  }

  onCancel() {
    this.cancelAction.emit();
    this.dialogRef.close();
  }
}
