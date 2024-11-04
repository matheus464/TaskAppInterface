import { NgForOf, CommonModule } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { TaskFormularioComponent } from '../task-formulario/task-formulario.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { EditarTaskComponent } from '../editar-task/editar-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    NgIf,
    MatIcon,
    TaskFormularioComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tarefas: any[] = [];
  modoExclusao = false;
  messageShow = false;
  message = '';
  isModalVisible = false;
  tarefaSelecionada: any = null;
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getTarefas().subscribe(data => {
      this.tarefas = data;
    });
  }

  
  loadTarefas() {
    this.apiService.getTarefas().subscribe(data => {
      this.tarefas = data;
    });
  }

  toggleExclusao(){
    this.modoExclusao = !this.modoExclusao
  }

  //modal para edição
  openEditModal(id: number){
    const dialogRef = this.dialog.open(EditarTaskComponent, {
        width: '400px',
        panelClass: 'task-form-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.apiService.updateTarefa(id, result).subscribe(data => {
                this.tarefas.push(data);
            });
        }
    })
  }

  openAssociate(tarefa: any) {
    this.tarefaSelecionada = tarefa;
    this.isModalVisible = true;
  }

  closeAssociateModal() {
    this.isModalVisible = false;
    this.tarefaSelecionada = null;
  }

  cadastrarTarefa(){
    const dialogRef = this.dialog.open(TaskFormularioComponent, {
        width: '400px',
        panelClass: 'task-form-dialog'
    })

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.apiService.postPessoas(result).subscribe(data => {
                this.tarefas.push(data);
            });
        }
    });
  }

  excluirTarefa(id: number) {
    this.apiService.deleteTarefa(id).subscribe({
      next: () => {
        // Remove o funcionário da lista após a exclusão bem-sucedida
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
        
        // Exibe a mensagem de confirmação de exclusão
        this.message = 'Tarefa Excluída com sucesso!';
        this.messageShow = true;
        
        // Oculta a mensagem após 3 segundos
        setTimeout(() => {
          this.messageShow = false;
        }, 3000);
      },
      error: (err) => {
        if (err.status === 400) {
          // Se o erro for 400 (Bad Request), exibe a mensagem de erro específica
          this.message = 'Não é possível excluir';
        } else {
          // Outra mensagem genérica para outros erros
          this.message = 'Erro ao tentar excluir tarefa.';
        }
        this.messageShow = true;
        
        // Oculta a mensagem após 3 segundos
        setTimeout(() => {
          this.messageShow = false;
        }, 3000);
      }
    });
  }
}
