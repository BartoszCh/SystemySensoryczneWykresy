import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-plugin-annotation';
import {HeartrateService} from "./heartrate.service";
import {Metric} from "./metric";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  hrData: Metric[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Heart Rate',
        backgroundColor: 'rgba(0,95,255)',
        borderColor: 'rgba(0,95,255)',
        pointBackgroundColor: 'rgba(0,95,255)',
        pointHoverBorderColor: 'rgba(0,95,255)',
        borderWidth: 0,
      },
      {
        data: [],
        label: 'Acc',
        backgroundColor: 'rgb(0,199,12)',
        borderColor: 'rgb(0,199,12)',
        pointBackgroundColor: 'rgb(0,199,12)',
        pointHoverBorderColor: 'rgb(0,199,12)',
        borderWidth: 0,

      },
      {
        data: [],
        label: 'Temperature',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgb(255,163,0)',
        borderColor: 'red',
        pointBackgroundColor: 'rgb(255,163,0)',
        pointHoverBorderColor: 'rgb(255,163,0)',
        borderWidth: 0,
      }
    ],
    labels: [ ]
  };

  // @ts-ignore
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              position: 'center',
              display: true,
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public update(): void {
    this.updateCharts();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = AppComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 0, 0, 0.1)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = [ '1st Line', '2nd Line' ];
    }

    this.chart?.update();
  }

  constructor(private hearRateService: HeartrateService) {

  }

  public updateCharts(){
    this.hearRateService.getAllData().subscribe((data: Metric[]) => {
      data.forEach((metric) => {
        this.hrData.push(metric);
        this.lineChartData.datasets[0].data?.push(metric.heartRate);
        this.lineChartData.datasets[1].data?.push(metric.acc);
        this.lineChartData.datasets[2].data?.push(metric.temp);
        this.lineChartData.labels?.push(metric.createDate);
      });
      this.chart?.update();
    });
  }

}
