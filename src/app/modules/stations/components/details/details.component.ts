import { Component, OnInit } from '@angular/core';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { Levels } from '../../../shared/model/severity';
import { getRandomNumber } from '../summary/model';
import { Stations } from '../../../shared/model/stations';
import { customOptions } from './model';
import { airQualityItems } from '../../../shared/model/air-quality';
import { getColorMapping } from '../../helper/background';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  routes: IBreadCrumb[] = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  
  customOptions = customOptions;
  stations = Stations;
  airQualityItems = airQualityItems.map(res=> ({ ...res, value: getRandomNumber(500), color:  getColorMapping(getRandomNumber(500))}));
  status 
  value;

  currentStation = Stations[0]
  date = new Date()
  constructor() { }
  
  ngOnInit(): void {
    console.log(this.date,' date')
   this.value = getRandomNumber(6);
    this.status = Levels[this.value]
    while(this.value == 0 ){
      this.value = getRandomNumber(6);
      this.status = Levels[this.value]
      
    }
  }

  
}
