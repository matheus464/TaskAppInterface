import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7117/api';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Pessoa`);
  }

  getTarefas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tarefa`);
  }

  // Adicione outros métodos para criar, atualizar e excluir
}
