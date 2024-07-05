import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-dispersao',
  templateUrl: './grafico-dispersao.component.html',
  styleUrls: ['./grafico-dispersao.component.scss'],
})
export class GraficoDispersaoComponent implements AfterViewInit {

  @ViewChild('grafico') grafico!: ElementRef<HTMLCanvasElement>;
  scatterChart: any;

  @Input() data:Array<any>;

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 3000);
    
  }

  createChart(): void {
    const ctx = this.grafico.nativeElement.getContext('2d');
    if (ctx) {
      // Preparar os data para o gráfico
      const datasets = this.data.map(item => ({
        x: item.humidity,
        y: item.temperature,
        r: item.cases * 2, // Tamanho do ponto proporcional aos casos
      }));

      // Criar o gráfico de dispersão
      this.scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: this.formatDataForChart(this.data)
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Umidade (%)'
              }
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Temperatura (°C)'
              }
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  const datasetLabel = context.dataset.label || '';
                  const x = context.raw.x;
                  const y = context.raw.y;
                  const cases = context.raw.r;

                  return `${datasetLabel}:  Casos ${cases}, Umidade ${x}%, Temperatura ${y}°C`;
                }
              }
            }
          }
        }
      });
    }
  }

  formatDataForChart(data: any[]): any[] {
    const datasets: any[] = [];

    // Agrupar dados por faixas de casos de dengue para diferentes cores
    const casesGroups = {
      'Baixo': [],
      'Médio': [],
      'Alto': [],
    };

    data.forEach(item => {
      if (item.cases < 200) {
        casesGroups['Baixo'].push(item);
      } else if (item.cases < 500) {
        casesGroups['Médio'].push(item);
      } else {
        casesGroups['Alto'].push(item);
      }
    });

    // Converter grupos em datasets para o gráfico
    Object.keys(casesGroups).forEach((key, index) => {
      const color = index === 0 ? '#36a2eb' : index === 1 ? '#ffcd56' : '#ff6384'; // Cores diferentes para cada grupo
      datasets.push({
        label: key,
        data: casesGroups[key].map(d => ({ x: d.humidity, y: d.temperature, r: d.cases })),
        backgroundColor: color,
        borderColor: 'transparent', // Bordas transparentes para os pontos
      });
    });

    return datasets;
  }
}
