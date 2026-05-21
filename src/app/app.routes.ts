import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { FilmeForm } from './features/filme/filme-form/filme-form';
import { FilmeList } from './features/filme/filme-list/filme-list';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'filmes',
    component: FilmeList,
  },

  {
    path: 'cadastrar-filme',
    component: FilmeForm,
  },
];