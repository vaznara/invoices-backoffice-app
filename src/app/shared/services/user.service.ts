import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

  constructor() {}

  set currentUser(user: any) {
    this._currentUser$.next(user);
  }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }
}
