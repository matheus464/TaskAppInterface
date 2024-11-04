import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Pessoa`);
  }

  getTarefas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tarefa`);
  }

  getTarefasById( id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tarefa/${id}`);
  }

  postPessoas(pessoa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Pessoa`, pessoa);
  } 

  deletePessoa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Pessoa/${id}`);
  }

  postTarefa(tarefa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Tarefa`, tarefa);
  }

  deleteTarefa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Tarefa/${id}`);
  }

  updateTarefa(id: number, tarefa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Tarefa/${id}`, tarefa);
  }
  // Adicione outros métodos para criar, atualizar e excluir
}
