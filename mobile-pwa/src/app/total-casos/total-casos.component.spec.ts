import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-total-casos',
  templateUrl: './total-casos.component.html',
  styleUrls: ['./total-casos.component.scss'],
})
export class TotalCasosComponent implements OnInit {
  nome: string = 'Paraíba'; // Nome padrão, pode ser substituído pelo nome do estado desejado
  total_cases: number;
  loading: boolean = true;
  error: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTotalCases();
  }

  fetchTotalCases() {
    // URL do seu backend que retorna o total de casos
    const baseUrl = 'http://localhost:5000/api/total-cases'; 
    const start_date = '2024-01-01'; // Data de início desejada
    const end_date = '2024-12-31';   // Data de término desejada

    // Monta a URL com os parâmetros de data
    const url = `${baseUrl}?start_date=${start_date}&end_date=${end_date}`;

    console.log('URL da requisição:', url); // Verifica a URL da requisição

    this.http.get<any>(url).subscribe(
      response => {
        console.log('Response:', response); // Verifica a resposta da API
        this.total_cases = response.total_cases;
        this.loading = false;
      },
      error => {
        console.error('Erro ao buscar total de casos:', error);
        console.log('Erro:', error); // Verifica o conteúdo do erro
        this.error = 'Erro ao buscar total de casos. Por favor, tente novamente mais tarde.';
        this.loading = false;
      }
    );
  }
}
