import { Component, Inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../../../../../shared/components/modal/modal.component';
import { CustomerEditComponent } from '../../customer-edit.component';
import { Customer } from '../../../../../../shared/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-edit-modal',
  standalone: true,
  imports: [ModalComponent, CustomerEditComponent],
  templateUrl: './customer-edit-modal.component.html',
  styleUrl: './customer-edit-modal.component.scss',
})
export class CustomerEditModalComponent implements OnInit {
  customer?: Customer;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer | undefined,
    public dialogRef: MatDialogRef<CustomerEditModalComponent>,
  ) {}

  ngOnInit() {
    this.customer = this.data;
  }

  onClose() {
    this.dialogRef.close();
  }
}
