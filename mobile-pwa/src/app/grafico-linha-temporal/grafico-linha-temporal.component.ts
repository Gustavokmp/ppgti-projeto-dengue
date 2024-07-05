import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import Chart from 'chart.js/auto';

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
  totalCases: number[] = [];

  @Input()
  listData: any;

  listLabels: Array<string>;

  constructor() {
  }


  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    this.listLabels = [];
    this.listData.forEach(monthData => {
      this.totalCases.push(monthData.totalCases);
      this.listLabels.push(`${this.meses[monthData.month - 1]}/${monthData.year}`)
    });
    this.createChart(); // Atualiza o gráfico após receber os dados
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
          labels: this.listLabels,
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
          plugins: {
            legend: {
              onClick: null
            }  
          },
          scales: {
            y: {
              beginAtZero: true
            }
          },
        }
      });
    }
  }
}
