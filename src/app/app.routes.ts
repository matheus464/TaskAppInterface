import { Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';

export const routes: Routes = [
  { path: 'pessoas', component: PessoaListComponent },
  { path: '', redirectTo: '/pessoas', pathMatch: 'full' } // Redireciona para a rota 'pessoas' na inicialização
];
