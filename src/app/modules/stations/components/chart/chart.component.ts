import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { getRandomNumber } from '../summary/model';
import { Stations } from '../../../shared/model/stations';

const Radius = 12;
const data = [
  { x: 12, y: () => getRandomNumber(450), r: Radius },
  { x: 1, y: () => getRandomNumber(450), r: Radius },
  { x: 2, y: () => getRandomNumber(450), r: Radius },
  { x: 3, y: () => getRandomNumber(450), r: Radius },
  { x: 4, y: () => getRandomNumber(450), r: Radius },
  { x: 5, y: () => getRandomNumber(450), r: Radius },
  { x: 6, y: () => getRandomNumber(450), r: Radius },
  { x: 7, y: () => getRandomNumber(450), r: Radius },
  { x: 8, y: () => getRandomNumber(450), r: Radius },
  { x: 9, y: () => getRandomNumber(450), r: Radius },
  { x: 10, y: () => getRandomNumber(450), r: Radius },
  { x: 11, y: () => getRandomNumber(450), r: Radius },
  // Add more data points as needed
];

const items = Stations.map(res => {
  return {
    data: data.map(res=> ({...res, y: res.y()})),

    label: res,
    backgroundColor: (item) => getBackground(item)
  }
})

const getBackground = (item) => {
  const value = item.raw.y;

  // Set different colors based on your conditions

  if (value > 0 && value <= 50) {
    return '#00C800';
  } else if (value > 50 && value <= 100) {
    return '#FFE12D';
  }
  else if (value > 100 && value <= 150) {
    return '#FF7E00';
  }
  else if (value > 150 && value <= 200) {
    return '#FA0A00';
  }
  else if (value > 200 && value <= 300) {
    return '#8F3F97';
  }
  else if (value > 300) {
    return '#7E0023';
  }

  return 'rgb(231,231,231)' // not applicable

}
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  public bubbleChartType: keyof ChartTypeRegistry = 'bubble';
  public bubbleChartData: ChartDataset[] = items;

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

        ticks: {
          callback: (value: any, index: any, values: any) => {
            return value + ' am'
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

      // xAxes: [
      //   {
      //     type: 'linear', // Use 'linear' scale type for numeric values
      //     position: 'bottom',
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Year',
      //     },
      //   },
      // ],
      // yAxes: [
      //   {
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Population',
      //     },
      //   },
      // ],
    },
  };

  public bubbleChartLegend: boolean = false;

  constructor() {

  }

  ngOnInit(): void {


  }
}
