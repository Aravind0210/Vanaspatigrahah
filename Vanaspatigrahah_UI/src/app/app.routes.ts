import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Homepage (default route)
  { path: 'plant-details', component: PlantDetailsComponent }, // Plant Details Page
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown paths to homepage
];
