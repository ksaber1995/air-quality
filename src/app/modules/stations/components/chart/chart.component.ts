import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { BreakPoint } from '../../../../models/breakPoint';

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
  @Input() public data: ChartDataset[] ;
   public bubbleChartData: ChartDataset[] ;
   @Input() breakPoints : BreakPoint[] = [];

  public bubbleChartOptions: ChartOptions = {
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
        ticks: {
          count: 25,
          callback: (value: any, index: any, values: any) => {
            let period = index < 12 ? 'am' : 'pm';

            index = index % 12;
            index = index ? index : 12; // Convert 0 to 12
            return index  + ' ' + period;
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

  public bubbleChartLegend: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.bubbleChartData = this.data.map(station=> ({...station , backgroundColor: (item) => getBackground(item, this.breakPoints)}))
  }
}
