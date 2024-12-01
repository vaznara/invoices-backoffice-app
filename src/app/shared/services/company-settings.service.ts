import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  from,
  map,
  of,
  ReplaySubject,
  take,
  tap,
} from 'rxjs';
import { LoaderService } from './loader.service';

export interface ICompanySettings {
  name: string;
  address_1: string;
  address_2: string;
  description: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanySettingsService {
  private _settings$: BehaviorSubject<ICompanySettings | null> =
    new BehaviorSubject<ICompanySettings | null>(null);

  constructor(
    private db: Firestore,
    private loaderService: LoaderService,
  ) {}

  getSettings() {
    this.loaderService.isLoading = true;
    return this._settings$.pipe(
      take(1),
      concatMap((res) => {
        if (!res) {
          const docRef = doc(this.db, 'settings/companySettings');
          return from(getDoc(docRef)).pipe(
            map((x) => {
              return x.data() as ICompanySettings;
            }),
            tap((x) => this._settings$.next(x as ICompanySettings)),
          );
        }
        return of(res);
      }),
      debounceTime(1000),
      tap(() => {
        this.loaderService.isLoading = false;
      }),
    );
  }

  updateSettings(settings: ICompanySettings) {
    this.loaderService.isButtonBusy = true;
    const docRef = doc(this.db, 'settings/companySettings');
    return from(setDoc(docRef, settings)).pipe(
      debounceTime(1000),
      tap(() => {
        this.loaderService.isButtonBusy = false;
      }),
    );
  }
}
