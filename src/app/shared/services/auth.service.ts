import { Injectable } from '@angular/core';
import {
  Auth,
  Unsubscribe,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { from, map, Observable, take, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private userService: UserService,
  ) {}

  checkAuthState(): Unsubscribe {
    return onAuthStateChanged(this.auth, (user) => {
      this.userService.currentUser = user;
    });
  }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      take(1),
      map((userCredential) => {
        this.userService.currentUser = userCredential.user;
        return;
      }),
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.userService.currentUser = null;
        window.location.reload();
      }),
    );
  }
}
