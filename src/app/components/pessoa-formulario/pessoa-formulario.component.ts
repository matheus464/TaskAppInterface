import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-pessoa-formulario',
  standalone: true,
  imports: [
    MatDialogContent, 
    MatFormFieldModule,  
    MatDialogModule, 
    FormsModule,  
    ReactiveFormsModule
  ],
  templateUrl: './pessoa-formulario.component.html',
  styleUrl: './pessoa-formulario.component.css'
})
export class PessoaFormularioComponent {
  
  pessoaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PessoaFormularioComponent>,
    private formBuilder: FormBuilder
  ){
    this.pessoaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required]
    });
  }

  save() {
    if (this.pessoaForm.valid) {
      this.dialogRef.close(this.pessoaForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
