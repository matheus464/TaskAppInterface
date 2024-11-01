import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {
  pessoas: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPessoas().subscribe(data => {
      this.pessoas = data;
    });
  }
}
