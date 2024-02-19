import { Component, Input, OnInit } from '@angular/core';
import { AirItem, Header, getRandomNumber, testItem } from './model';
import { Levels } from '../../../shared/model/severity';
import { ChartData } from 'chart.js';
import { getColorMapping } from '../../helper/background';
import { Station } from '../../../../models/Station';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  @Input() station: Station ;

  time = (new Date()).toLocaleString();


  status

  headers 

  listOfData 
  // = testItem.map(res => ({ ...res, values: res.values.map(res => ({ ...res, color: getColorMapping(res.value) })) }))


  public doughnutChartLabels: string[] = Levels.map(res => res.name);

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{

      // label: 'AQI',
      data: Levels.map(res => 1 / 7),
      weight: 30,

      backgroundColor: Levels.map(res => res.name === 'na' ? 'transparent' : res.color),
    },

    {

      // label: 'AQI',
      data: Levels.map(res => 1 / 7),
      backgroundColor: Levels.map(res => res.name === 'na' ? 'transparent' : Levels[0].color),
      // offset: 0
      borderWidth: 0,
      weight: 15,

    }
    ]
  };
  public doughnutChartOptions = {
    responsive: true,
    events: [], // Disable all events, including hovering

    // cutout: 50, 

    cutout: '60%',
    cutoutPercentage: 0,

    elements: {
      arc: {
        borderWidth: 0

      },


    },

  };

  ngOnInit(): void {
    this.headers = this.station.variables[0].readings.map(res=> new Date(res.aggregated_at).getDate() ); // get the date of the first reading

    this.listOfData = [...this.station.variables.map(res=> ({...res, name: res.variable.abbreviation_en, rounded: true})) , ...this.station.weather.map(res=> ({...res, name: res.variable.name_en}))];
    console.log(this.listOfData)

    let value = getRandomNumber(6);
    this.status = Levels[value]
    while (value == 0) {
      value = getRandomNumber(6);
      this.status = Levels[value]

    }
  }


}

