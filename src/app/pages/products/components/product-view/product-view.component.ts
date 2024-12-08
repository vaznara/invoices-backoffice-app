import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component';
import { catchError, concatMap, EMPTY, throwError } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { Product, ProductPrice } from '../../../../shared/interfaces';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CurrencyPipe, DatePipe, getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [DatePipe, ToolbarComponent, ProductCardComponent, CurrencyPipe],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  product?: Product;
  productPriceHistory: ProductPrice[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        concatMap((params) => {
          const uid = params.get('productUid');
          if (uid) {
            return this.productService.getProduct(uid);
          }
          return EMPTY;
        }),
        concatMap((res) => {
          if (!res) {
            this.router.navigate(['/not-found']);
            return EMPTY;
          }
          this.product = res;
          if (this.product.uid) {
            return this.productService.getProductPriceHistory(this.product.uid);
          }
          return EMPTY;
        }),
        catchError((error) => {
          this.router.navigate(['/not-found']);
          return throwError(() => error);
        }),
      )
      .subscribe((res) => {
        this.productPriceHistory = res;
      });
  }

  protected readonly getCurrencySymbol = getCurrencySymbol;
}
