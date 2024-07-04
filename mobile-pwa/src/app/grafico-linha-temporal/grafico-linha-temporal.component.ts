import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

interface MonthData {
  month: number;
  totalCases: number;
  year: number;
}

@Component({
  selector: 'app-grafico-linha-temporal',
  templateUrl: './grafico-linha-temporal.component.html',
  styleUrls: ['./grafico-linha-temporal.component.scss']
})
export class GraficoLinhaTemporalComponent implements AfterViewInit {
  @ViewChild('meuGraficoLinha') meuGraficoLinha!: ElementRef<HTMLCanvasElement>;

  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  totalCases: number[] = Array(12).fill(0); // Inicializa um array com 12 zeros
  currentYear: number;

  constructor(private http: HttpClient) {
    this.currentYear = new Date().getFullYear(); // Obtém o ano atual ao iniciar o componente
  }

  ngAfterViewInit(): void {
    this.fetchDataAndCreateChart();
  }

  fetchDataAndCreateChart(): void {
    const baseUrl = 'http://localhost:5000/api/cases-by-month';
    const start_date = `${this.currentYear}-01-01`;
    const end_date = `${this.currentYear}-12-31`;

    const url = `${baseUrl}?start_date=${start_date}&end_date=${end_date}`;
    this.http.get<MonthData[]>(url).subscribe(
      response => {
        console.log('Dados recebidos:', response);
        response.forEach(monthData => {
          this.totalCases[monthData.month - 1] = monthData.totalCases;
        });
        this.createChart(); // Atualiza o gráfico após receber os dados
      },
      error => {
        console.error('Erro ao obter dados:', error);
        this.createChart(); // Atualiza o gráfico mesmo em caso de erro
      }
    );
  }

  createChart(): void {
    const ctx = this.meuGraficoLinha.nativeElement.getContext('2d');
    if (ctx) {
      // Destruir gráfico anterior se existir
      if (Chart.instances && Object.keys(Chart.instances).length > 0) {
        Object.keys(Chart.instances).forEach(key => {
          const chart = Chart.instances[key];
          if (chart) {
            chart.destroy();
          }
        });
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.meses,
          datasets: [{
            label: 'Total de Casos por Mês',
            data: this.totalCases,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
