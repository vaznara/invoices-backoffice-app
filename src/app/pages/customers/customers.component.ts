import { Component, OnInit } from '@angular/core';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { Customer, Response } from '../../shared/interfaces';
import { dummyData } from './dummyData';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomerCardComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customers?: Response<Customer>;

  ngOnInit() {
    this.customers = dummyData;
  }

  protected readonly Object = Object;
}
