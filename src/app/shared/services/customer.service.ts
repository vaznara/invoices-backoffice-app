import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
} from '@angular/fire/firestore';
import { LoaderService } from './loader.service';
import { Customer } from '../interfaces';
import { from, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private db: Firestore,
    private loaderService: LoaderService,
  ) {}

  getCustomers() {
    this.loaderService.isLoading = true;
    const q = query(collection(this.db, 'customers'), orderBy('createdAt', 'desc'));
    return from(getDocs(q)).pipe(
      map((res) =>
        res.docs.map((x) => {
          return {
            ...x.data(),
            uid: x.id,
          } as Customer;
        }),
      ),
      tap(() => (this.loaderService.isLoading = false)),
    );
  }

  createCustomer(customer: Customer) {
    this.loaderService.isButtonBusy = true;
    return from(
      addDoc(collection(this.db, 'customers'), { ...customer, createdAt: serverTimestamp() }),
    ).pipe(tap(() => (this.loaderService.isButtonBusy = false)));
  }

  updateCustomer(customer: Partial<Customer>) {
    console.log(customer);
    const { uid } = customer;
    if (!uid) {
      return throwError(() => 'Customer uid is required to update a customer');
    }
    this.loaderService.isButtonBusy = true;
    const docRef = doc(this.db, 'customers', uid);
    return from(updateDoc(docRef, { ...customer, modifiedAt: serverTimestamp() })).pipe(
      tap(() => (this.loaderService.isButtonBusy = false)),
    );
  }

  deleteCustomer(uid: string) {
    this.loaderService.isButtonBusy = true;
    const docRef = doc(this.db, 'customers', uid);
    return from(deleteDoc(docRef)).pipe(tap(() => (this.loaderService.isButtonBusy = false)));
  }
}
