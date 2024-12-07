import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../../shared/interfaces';
import { RouterLink } from '@angular/router';
import { CopyTextDirective } from '../../../../shared/directives/copy-text.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [RouterLink, CopyTextDirective, MatTooltipModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent implements OnInit {
  @Input() customerUid!: string;
  @Input() customer?: Customer;

  ngOnInit() {
    if (!this.customer || !this.customerUid) {
      throw new Error('Customer is required');
    }
  }

  get trimmedPhone(): string {
    if (this.customer) {
      return this.customer.phone.replace(/\D/g, '');
    }
    return '';
  }
}
