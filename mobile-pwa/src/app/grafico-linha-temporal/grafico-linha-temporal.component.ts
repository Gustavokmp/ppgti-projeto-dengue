import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-linha-temporal',
  templateUrl: './grafico-linha-temporal.component.html',
  styleUrls: ['./grafico-linha-temporal.component.scss']
})
export class GraficoLinhaTemporalComponent implements AfterViewInit {
  @ViewChild('meuGraficoLinha') meuGraficoLinha!: ElementRef<HTMLCanvasElement> | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.criarGrafico();
  }

  criarGrafico(): void {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const dados = [864, 5117, 10316, 4891, 1357, 0, 0, 0, 0, 0, 0, 0]; // Total de casos para cada mês

    const ctx = this.meuGraficoLinha?.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: meses,
          datasets: [{
            label: 'Total de Casos por Mês',
            data: dados,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Cor do ponto
            pointRadius: 6, // Tamanho do ponto
            pointHoverRadius: 8 // Tamanho do ponto ao passar o mouse
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
