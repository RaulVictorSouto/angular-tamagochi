import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SelectComponent } from './pages/select/select.component';

export const routes: Routes = [
  {
    path:'',
    component:SelectComponent
  },
  {
    path:'tamagochi/:id',
    component:HomeComponent
  }
];
