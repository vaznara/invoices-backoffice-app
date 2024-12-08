import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/interfaces';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() productImage: string = 'https://placehold.co/200x200';

  protected readonly getCurrencySymbol = getCurrencySymbol;
}
