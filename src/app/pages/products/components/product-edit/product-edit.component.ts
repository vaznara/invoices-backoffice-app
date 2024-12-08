import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component';
import { Product } from '../../../../shared/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { catchError, concatMap, EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ToolbarComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  product?: Product;

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(null),
    currentPrice: new FormControl(0.1, [Validators.required, Validators.min(0.1)]),
    sku: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  @Output() saveProduct: EventEmitter<Product> = new EventEmitter();

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
        catchError((error) => {
          this.router.navigate(['/not-found']);
          return throwError(() => error);
        }),
      )
      .subscribe((res) => {
        this.product = res;
        this.productForm.patchValue(this.product);
      });
  }

  onSave() {
    if (!this.product) {
      this.createProduct(this.productForm.value);
      return;
    }

    this.updateProduct({ ...this.productForm.value, uid: this.product.uid });
  }

  private createProduct(product: Product) {
    this.productService.createProduct(product).subscribe((res) => {
      this.router.navigate(['/products/' + res.uid]);
    });
  }

  private updateProduct(product: Product) {
    console.log(!!this.productForm.get('currentPrice')?.dirty);
    this.productService
      .updateProduct(product, !!this.productForm.get('currentPrice')?.dirty)
      .subscribe(() => {
        this.router.navigate(['/products/' + product.uid]);
      });
  }
}
