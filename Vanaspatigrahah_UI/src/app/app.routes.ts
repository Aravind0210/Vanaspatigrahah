import { Routes } from '@angular/router';



export const routes: Routes = [
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
