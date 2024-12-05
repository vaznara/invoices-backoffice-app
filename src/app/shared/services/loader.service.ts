import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isButtonBusy$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  get isButtonBusy$() {
    return this._isButtonBusy$.asObservable();
  }

  set isLoading(state: boolean) {
    this._isLoading$.next(state);
  }

  set isButtonBusy(state: boolean) {
    this._isButtonBusy$.next(state);
  }
}
