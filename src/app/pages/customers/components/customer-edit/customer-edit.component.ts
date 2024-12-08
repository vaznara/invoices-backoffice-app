import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../../../shared/interfaces';
import { AsyncPipe, NgClass } from '@angular/common';
import { CustomerService } from '../../../../shared/services/customer.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({
    companyLegalName: new FormControl('', Validators.required),
    tin: new FormControl('', Validators.required),
    address_1: new FormControl('', Validators.required),
    address_2: new FormControl(null),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    shortDescription: new FormControl(null),
  });

  toastId: string = 'successfullyUpdatedCustomer';

  @Input() customer?: Customer;

  @Output() update: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  private uid?: string;

  constructor(
    private customerService: CustomerService,
    public loaderService: LoaderService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
      this.uid = this.customer.uid;
    }
  }

  onSubmit(): void {
    if (!this.uid) {
      this.customerService.createCustomer(this.customerForm.value).subscribe(() => {
        this.toastService.open(this.toastId);
        this.create.emit();
      });
    } else {
      this.customerService
        .updateCustomer({ uid: this.uid, ...this.customerForm.value })
        .subscribe(() => {
          this.toastService.open(this.toastId);
          this.update.emit();
        });
    }
  }
}
