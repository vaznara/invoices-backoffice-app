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
        path: 'customers',
        title: 'Customers',
        data: { h1Title: 'Customers' },
        loadComponent: () =>
          import('./pages/customers/customers.component').then((c) => c.CustomersComponent),
      },
      {
        path: 'products',
        title: 'Products',
        data: { h1Title: 'Products' },
        loadComponent: () =>
          import('./pages/products/products.component').then((c) => c.ProductsComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./pages/products/components/product-list/product-list.component').then(
                (c) => c.ProductListComponent,
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./pages/products/components/product-edit/product-edit.component').then(
                (c) => c.ProductEditComponent,
              ),
          },
          {
            path: 'edit/:productUid',
            loadComponent: () =>
              import('./pages/products/components/product-edit/product-edit.component').then(
                (c) => c.ProductEditComponent,
              ),
          },
          {
            path: ':productUid',
            loadComponent: () =>
              import('./pages/products/components/product-view/product-view.component').then(
                (c) => c.ProductViewComponent,
              ),
          },
        ],
      },
      {
        path: 'invoices',
        title: 'Invoices',
        data: { h1Title: 'Invoices' },
        loadComponent: () =>
          import('./pages/invoices/invoices.component').then((c) => c.InvoicesComponent),
      },
      {
        path: 'settings',
        title: 'App settings',
        data: { h1Title: 'General settings' },
        loadComponent: () =>
          import('./pages/settings/settings.component').then((c) => c.SettingsComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./bg-layout/bg-layout.component').then((c) => c.BgLayoutComponent),
    children: [
      {
        path: 'login',
        title: 'Please login',
        data: { h1Title: 'Login' },
        canActivate: [loggedInGuard],
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: '**',
        title: 'Oops! Page not found',
        data: { h1Title: 'Not found' },
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
      },
    ],
  },
];
