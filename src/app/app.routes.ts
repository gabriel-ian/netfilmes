import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { FilmeForm } from './features/filme/filme-form/filme-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cadastrar-filme', component: FilmeForm },
  { path: '**', redirectTo: '' },
];
