import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _showToast$: Subject<string> = new Subject();
  private _hideToast$: Subject<string> = new Subject();

  constructor() {}

  get showToast$(): Observable<string> {
    return this._showToast$.asObservable();
  }

  get hideToast$(): Observable<string> {
    return this._hideToast$.asObservable();
  }

  open(id: string): void {
    this._showToast$.next(id);
  }

  hide(id: string): void {
    this._hideToast$.next(id);
  }
}
