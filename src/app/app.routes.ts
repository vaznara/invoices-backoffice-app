import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { loggedInGuard } from './shared/guards/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'test',
        loadComponent: () =>
          import('./pages/bootstrap-test/bootstrap-test.component').then(
            (c) => c.BootstrapTestComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    title: 'Please login',
    canActivate: [loggedInGuard],
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];
