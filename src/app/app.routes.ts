import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];
