import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _showToast$: Subject<string> = new Subject();
  private _hideToast$: Subject<string> = new Subject();

  constructor() {}

  get showToast$() {
    return this._showToast$.asObservable();
  }

  get hideToast$() {
    return this._hideToast$.asObservable();
  }

  open(id: string) {
    this._showToast$.next(id);
  }

  hide(id: string) {
    this._hideToast$.next(id);
  }
}
