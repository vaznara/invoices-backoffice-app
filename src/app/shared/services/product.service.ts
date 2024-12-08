import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { LoaderService } from './loader.service';
import { concatMap, from, map, Observable, of, tap, throwError } from 'rxjs';
import { Product, ProductPrice } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: Firestore,
    private loaderService: LoaderService,
  ) {}

  getProducts(): Observable<Product[]> {
    this.loaderService.isLoading = true;
    const q = query(collection(this.db, 'products'), orderBy('createdAt', 'desc'));
    return from(getDocs(q)).pipe(
      map((res) => {
        return res.docs.map((x) => {
          return {
            ...x.data(),
            uid: x.id,
          } as Product;
        });
      }),
      tap(() => (this.loaderService.isLoading = false)),
    );
  }

  getProduct(uid: string): Observable<Product> {
    this.loaderService.isLoading = true;
    const docRef = doc(this.db, 'products', uid);
    return from(getDoc(docRef)).pipe(
      map((x) => {
        if (!x.data()) {
          throw new Error(`Product with uid ${uid} not found`);
        }
        return {
          ...x.data(),
          uid: x.id,
        } as Product;
      }),
      tap(() => (this.loaderService.isLoading = false)),
    );
  }

  getProductPriceHistory(productUid: string): Observable<ProductPrice[]> {
    const q = query(
      collection(this.db, 'productPriceHistory'),
      where('productUid', '==', productUid),
      orderBy('validFrom', 'desc'),
    );
    return from(getDocs(q)).pipe(
      map((res) => {
        return res.docs.map((x) => {
          const validTo = x.data()['validTo']?.toDate();
          return {
            ...x.data(),
            uid: x.id,
            validFrom: x.data()['validFrom'].toDate(),
            validTo,
          } as ProductPrice;
        });
      }),
    );
  }

  createProduct(product: Product): Observable<Product> {
    this.loaderService.isButtonBusy = true;
    return from(
      addDoc(collection(this.db, 'products'), { ...product, createdAt: new Date() }),
    ).pipe(
      concatMap((res) => {
        return from(
          addDoc(collection(this.db, 'productPriceHistory'), {
            price: product.currentPrice,
            productUid: res.id,
            validFrom: serverTimestamp(),
          }),
        );
      }),
      concatMap((res) => getDoc(res)),
      map((x) => {
        return {
          ...x.data(),
          uid: x.id,
        } as Product;
      }),
      tap(() => (this.loaderService.isButtonBusy = false)),
    );
  }

  updateProduct(product: Partial<Product>, updatePrice: boolean = false): Observable<void> {
    const { uid } = product;
    if (!uid) {
      return throwError(() => 'Product uid is required to update a product');
    }
    this.loaderService.isButtonBusy = true;
    const lastPriceDocRef = query(
      collection(this.db, 'productPriceHistory'),
      where('productUid', '==', uid),
      orderBy('validFrom', 'desc'),
      limit(1),
    );
    return from(getDocs(lastPriceDocRef)).pipe(
      concatMap((res) => {
        if (!updatePrice) {
          return of(null);
        }
        const docRef = doc(this.db, 'productPriceHistory', res.docs[0].id);
        return updateDoc(docRef, {
          validTo: serverTimestamp(),
        });
      }),
      concatMap(() => {
        if (!updatePrice) {
          return of(null);
        }
        return from(
          addDoc(collection(this.db, 'productPriceHistory'), {
            price: product.currentPrice,
            productUid: product.uid,
            validFrom: serverTimestamp(),
          }),
        );
      }),
      concatMap(() => {
        const docRef = doc(this.db, 'products', uid);
        return from(updateDoc(docRef, { ...product, modifiedAt: serverTimestamp() })).pipe();
      }),
    );
  }
}
