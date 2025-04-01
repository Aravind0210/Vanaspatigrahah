import { Routes } from '@angular/router';
import { PesticidesComponent } from './pesticides/pesticides.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./homepage/homepage.component').then(c => c.HomepageComponent)
  },
  {
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'fertilizer', 
    loadComponent: () => import('./fertilizer/fertilizer.component').then(c => c.FertilizerComponent)
  },
  {
    path: 'manure', 
    loadComponent: () => import('./manure/manure.component').then(c => c.ManureComponent)
  },
  {
    path: 'plant-details', 
    loadComponent: () => import('./plant-details/plant-details.component').then(c => c.PlantDetailsComponent)
  },
  {
    path: 'plant-details/:id', 
    loadComponent: () => import('./plant-details/plant-details.component').then(c => c.PlantDetailsComponent)
  },
  {
    path: 'pesticides',
    loadComponent: () => import('./pesticides/pesticides.component').then(c => c.PesticidesComponent)
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
