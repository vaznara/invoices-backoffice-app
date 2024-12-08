import { Component, OnInit } from '@angular/core';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { Customer } from '../../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditModalComponent } from './components/customer-edit/components/customer-edit-modal/customer-edit-modal.component';
import { CustomerService } from '../../shared/services/customer.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { ToastService } from '../../shared/services/toast.service';
import { concatMap, take } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomerCardComponent, ToastComponent, ToolbarComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customers?: Customer[];
  successToastId: string = 'successfullyUpdatedCustomer';
  deleteToastId: string = 'successfullyDeletedCustomer';

  constructor(
    private dialog: MatDialog,
    private customersService: CustomerService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.getCustomers()
      .pipe(take(1))
      .subscribe((res) => {
        this.customers = res;
      });
  }

  getCustomers() {
    return this.customersService.getCustomers();
  }

  onCreate() {
    this.dialog.open(CustomerEditModalComponent);
  }

  onDelete(uid: string) {
    this.customersService
      .deleteCustomer(uid)
      .pipe(concatMap(() => this.getCustomers()))
      .subscribe((res) => {
        this.customers = res;
        this.toastService.open(this.deleteToastId);
      });
  }

  onCardClick(customer: Customer) {
    this.dialog.open(CustomerEditModalComponent, {
      data: customer,
    });
  }

  protected readonly Object = Object;
}
