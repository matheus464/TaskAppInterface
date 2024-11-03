import { Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tarefas', component: TaskListComponent },
  { path: 'funcionarios', component: PessoaListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
