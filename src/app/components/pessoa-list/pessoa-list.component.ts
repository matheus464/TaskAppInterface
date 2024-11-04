import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PessoaFormularioComponent } from '../pessoa-formulario/pessoa-formulario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, MatIcon, CommonModule],
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {
  pessoas: any[] = [];
  modoExclusao = false;
  messageShow = false;
  message = '';
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getPessoas().subscribe(data => {
      this.pessoas = data;
    });
  }

  toggleExclusao(){
    this.modoExclusao = !this.modoExclusao
  }

  cadastrarFuncionario(){
    const dialogRef = this.dialog.open(PessoaFormularioComponent, {
        width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.apiService.postPessoas(result).subscribe(data => {
                this.pessoas.push(data);
            });
        }
    });
  }

  excluirFuncionario(id: number) {
    this.apiService.deletePessoa(id).subscribe({
      next: () => {
        // Remove o funcionário da lista após a exclusão bem-sucedida
        this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== id);
        
        // Exibe a mensagem de confirmação de exclusão
        this.message = 'Funcionário excluído com sucesso!';
        this.messageShow = true;
        
        // Oculta a mensagem após 3 segundos
        setTimeout(() => {
          this.messageShow = false;
        }, 3000);
      },
      error: (err) => {
        if (err.status === 400) {
          // Se o erro for 400 (Bad Request), exibe a mensagem de erro específica
          this.message = 'Não é possível excluir o funcionário, pois ele possui tarefas atribuídas.';
        } else {
          // Outra mensagem genérica para outros erros
          this.message = 'Erro ao tentar excluir o funcionário.';
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
