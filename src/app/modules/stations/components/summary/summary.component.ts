import { Component } from '@angular/core';
import { AirItem, Header, testItem } from './model';
import { Levels } from '../../../shared/model/severity';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  time = (new Date()).toLocaleString();
  station: any = "Nizwa"
  percent: any = 'moderate'

  headers = Header

  listOfData = testItem


  public doughnutChartLabels: string[] = Levels.map(res => res.name);

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{

      // label: 'AQI',
      data: Levels.map(res => 1 / 7),
      backgroundColor: Levels.map(res => res.name === 'na' ? 'white' : res.color),
    },

    {

      // label: 'AQI',
      data: Levels.map(res => 1 / 7),
      backgroundColor: Levels.map(res => res.name === 'na' ? 'white' :  Levels[0].color),
    }
    ]
  };
  public doughnutChartOptions = {
    responsive: true,
    events: [], // Disable all events, including hovering

    // cutout: 50, 

    cutout: '66%',
    cutoutPercentage: 0,

    elements: {
      arc: {
        borderWidth: 0

      },

     
    },



  };

}

