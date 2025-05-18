import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./smart-billing/smart-billing.component').then(m => m.SmartBillingComponent)
  },

{
  path:'login',
  loadComponent: () => import('./login/login.component').then(m=>m.LoginComponent)
},

  {
    path: 'billing-summary',
    loadComponent: () => import('./billingsummary/billingsummary.component').then(c => c.BillingsummaryComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
