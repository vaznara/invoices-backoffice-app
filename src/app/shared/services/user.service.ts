import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

  constructor() {}

  get currentUser$(): Observable<User | null> {
    return this._currentUser$.asObservable();
  }

  set currentUser(user: User) {
    this._currentUser$.next(user);
  }
}
