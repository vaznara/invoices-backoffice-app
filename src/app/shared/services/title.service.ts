import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private _h1Title$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const pageTitle = this.buildH1Title(this.router.routerState.snapshot);
      if (pageTitle) {
        this._h1Title$.next(pageTitle);
      }
    });
  }

  get h1Title$(): Observable<string | null> {
    return this._h1Title$.asObservable();
  }

  private buildH1Title(snapshot: RouterStateSnapshot): string | null {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['h1Title'] ?? null;
  }
}
