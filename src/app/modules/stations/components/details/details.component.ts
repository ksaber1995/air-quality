import { Component, OnInit } from '@angular/core';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { getRandomNumber } from '../summary/model';
import { customOptions } from './model';
import { airQualityItems } from '../../../shared/model/air-quality';
import { getColorMapping } from '../../helper/background';
import { OmmanDate } from '../../../../unitlize/custom-date';
import { SwaggerService } from '../../../../services/swagger.service';
import { DetailedStation, Station } from '../../../../models/Station';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  currentStationCode ;

  routes: IBreadCrumb[] = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  
  customOptions = customOptions;
  currentStation;
  stations: Partial< Station > [];
  lastUpdate;
  variables: { abbreviation_en: any; code: string; }[];
  details: DetailedStation;

  constructor(private swagger: SwaggerService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
 
    this.getData();
  }

  getData() {
    this.route.paramMap.pipe(switchMap(res=>{
      this.currentStationCode =  res['params'].code
      return combineLatest([this.swagger.getStationsCode(), this.swagger.getStationDetails(this.currentStationCode)]) ;
    }))

    .subscribe(([codes, details])=>{
      this.stations = codes.stations;
      this.variables = codes.variables;
      this.currentStation = this.stations.find(res=> res.code === this.currentStationCode)
     
      this.details = details
      this.lastUpdate = OmmanDate( this.details.aqi[0].aggregated_at)
    })
  }

  
}
