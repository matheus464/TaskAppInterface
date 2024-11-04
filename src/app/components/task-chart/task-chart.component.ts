import { Component, ElementRef, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-task-chart',
  standalone: true,
  templateUrl: './task-chart.component.html',
  styleUrls: ['./task-chart.component.css']
})
export class TaskChartComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      Chart.register(...registerables); // Registra todos os componentes do Chart.js somente no cliente
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.renderChart(); // Somente executa o código de renderização no lado do cliente
    }
  }

  renderChart() {
    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Tarefas Concluídas',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#028DDB',
            fill: false
          },
          {
            label: 'Tarefas Pendentes',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#EEB111',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
      }
    };

    const ctx = this.chartRef.nativeElement as ChartItem;
    new Chart(ctx, chartConfig);
  }
}
