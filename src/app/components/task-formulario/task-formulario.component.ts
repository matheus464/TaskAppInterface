import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-formulario',
  standalone: true,
  imports: [
    MatDialogContent, 
    MatFormFieldModule,  
    MatDialogModule, 
    FormsModule,  
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './task-formulario.component.html',
  styleUrl: './task-formulario.component.css'
})
export class TaskFormularioComponent {

  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TaskFormularioComponent>,
    private formBuilder: FormBuilder,
    private apiservice: ApiService
  ){
    this.taskForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['', Validators.required],
      dataCriacao: ['', Validators.required],
      isAssigned: [false],  // Checkbox para indicar se será atribuída
      idPessoaResponsavel: ['']
    });
  }

  save() {
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value };
      if (!this.taskForm.get('isAssigned')?.value) {
        delete taskData.idPessoaResponsavel;
      }
  
      this.apiservice.postTarefa(taskData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          alert("Tarefa salva com sucesso, favor atualizar a pagina.");
        },
        error: (error) => {
          console.error('Erro ao criar tarefa:', error);
          alert("Ocorreu um erro ao salvar a tarefa.");
        }
      });
    }
  }
  
  cancel() {
    this.dialogRef.close();
  } 
}
