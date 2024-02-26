import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { BreakPoint } from '../../../../models/breakPoint';
import { HistoryInterval } from '../../../../services/swagger.service';
import { OmmanDate, formatDateYYMMDD, formatTime, getDateNsDaysAgo, weeksEndsToday } from '../../../../unitlize/custom-date';

const getBackground = (item, breakPoints: BreakPoint[]) => {
  const value = item.raw.y;
  return breakPoints.find(res => value >= res.breakpoint_start && value <= res.breakpoint_end)?.color

}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  public bubbleChartType: keyof ChartTypeRegistry = 'bubble';
  @Input() public data: ChartDataset[];
  public bubbleChartData: ChartDataset[];
  @Input() breakPoints: BreakPoint[] = [];
  @Input() interval: HistoryInterval = 'day'

  public bubbleChartOptions: ChartOptions

  public bubbleChartLegend: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.setCharOptions()
    this.bubbleChartData = this.data.map(station => ({ ...station, backgroundColor: (item) => getBackground(item, this.breakPoints) }))
  }

  setCharOptions() {
    this.bubbleChartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'linear', // Use 'linear' scale type for numeric values
          position: 'bottom',
          axis: 'x',
          // backgroundColor: 'blue',
          // bounds: 'data',
          // title: {
          //   text:''
          // },

          offset: true,

          // beginAtZero: false,

          ticks: {
            stepSize: 4,
            // count: getCount(this.interval),
            callback: (value: any, index: any, values: any) => {
              if (this.interval === 'day') {

                return formatTime(OmmanDate(value))
              } else if (this.interval === 'week') {
                return formatDateYYMMDD(OmmanDate(value))
              } else if (this.interval === 'month') {
                return formatDateYYMMDD(OmmanDate(value))

              }

              return index
            }


          },
          grid: {
            drawOnChartArea: false,
          },

        },
        y: {
          type: 'linear', // Use 'linear' scale type for numeric values
          position: 'bottom',
          axis: 'x',

          // backgroundColor: 'blue',
          grid: {
            drawOnChartArea: true,
            offset: false,
            circular: true,
            // tickColor: 'red',
            // drawTicks: false,
            tickBorderDashOffset: 55,
            // tickBorderDash: [5, 5], // Add a dash to the tick
            tickBorderDash: [50, 5, 50, 5],
          },
        },


      },
    };
  }
}
