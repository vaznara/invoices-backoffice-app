import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces';
import { ProductService } from '../../../../shared/services/product.service';
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ToolbarComponent, ProductCardComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onCreate() {}
}
