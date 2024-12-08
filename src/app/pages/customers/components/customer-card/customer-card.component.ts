import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { CopyTextDirective } from '../../../../shared/directives/copy-text.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ActionConfirmModalComponent } from '../../../../shared/components/action-confirm-modal/action-confirm-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [RouterLink, CopyTextDirective, MatTooltipModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();

  @Input() customer?: Customer;
  @Output() deleteCustomer: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (!this.customer) {
      throw new Error('Customer is required');
    }
  }

  onDelete(uid?: string) {
    if (uid) {
      const dialogRef = this.dialog.open(ActionConfirmModalComponent);
      dialogRef.componentInstance.title = 'Delete customer';
      dialogRef.componentInstance.message =
        'Are you sure you want to delete this customer? This action is irreversible!';
      dialogRef.componentInstance.actionButtonColor = 'danger';

      dialogRef.componentInstance.confirmAction.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.deleteCustomer.emit(uid);
      });
    }
  }

  get trimmedPhone(): string {
    if (this.customer) {
      return this.customer.phone.replace(/\D/g, '');
    }
    return '';
  }
}
