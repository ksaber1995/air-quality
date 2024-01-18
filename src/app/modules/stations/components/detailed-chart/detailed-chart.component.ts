import { Component } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { Levels } from '../../../shared/model/severity';
import { getColorMapping } from '../../helper/background';
import { getRandomNumber } from '../summary/model';




const data = [getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500), getRandomNumber(500)];

@Component({
  selector: 'app-detailed-chart',
  templateUrl: './detailed-chart.component.html',
  styleUrl: './detailed-chart.component.scss'
})
export class DetailedChartComponent {
  type;
  date: Date;
  getRandomNumber = getRandomNumber
  data = Levels;
  
  
  public lineChartData: ChartDataset[] = [
    {
      data: data,

      label: 'Nizwa',


      pointBackgroundColor: data.map(res => getColorMapping(res)),

      segment: {
        // backgroundColor: (ctx)=> getBackground(ctx), 
        borderColor: (ctx) => getColorMapping(ctx.p0.parsed.y),

        // borderColor
      }
    },
  ];

  public doughnutChartOptions = {
    responsive: true,
    // cutout: 50,  
    cutout: '75%',

    elements:{
      arc: {
        borderWidth: 1
        
      },
  
      bar:{
        borderWidth: 10
      },
      line:{
        borderWidth: 10
      },
      point:{
        borderWidth: 10
      }
    },

 

  };


  public lineChartLabels: string[] = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm'];
  public doughnutChartLabels: string[] = Levels.map(res => res.name);

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{
      
      // label: 'AQI',
      data: Levels.map(res => getRandomNumber(500)),
      backgroundColor: Levels.map(res => res.color),
    }]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,

    scales: {

      y: {
        // backgroundColor: 'blue',
        grid: {
          drawOnChartArea: false,
          offset: false,
          circular: true,
        },

        angleLines: {
          display: true
        },




      },


    },
  };




  constructor() {

  }

  ngOnInit(): void {
    console.log(this.lineChartData, 'koko')
    // this.initializeChart()
  }

  onDateChange() {

  }

}
