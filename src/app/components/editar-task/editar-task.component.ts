import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './editar-task.component.html',
  styleUrl: './editar-task.component.css'
})
export class EditarTaskComponent {
  task: any = {
    id: null,
    titulo: '',
    descricao: '',
    status: ''
  };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.getTaskDetails(+taskId); // Converte o ID para número
    }
  }

  getTaskDetails(id: number): void {
    this.apiService.getTarefasById(id).subscribe(
      (data) => {
        this.task = data;
      },
      (error) => {
        console.error('Erro ao buscar tarefa', error);
      }
    );
  }

  updateTask(): void {
    this.apiService.updateTarefa(this.task, this.task).subscribe(
      () => {
        console.log('Tarefa atualizada com sucesso');
        this.router.navigate(['/tarefas']); // Redireciona para a lista de tarefas após a atualização
      },
      (error) => {
        console.error('Erro ao atualizar tarefa', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/tarefas']); // Redireciona para a lista de tarefas ao cancelar
  }
}
