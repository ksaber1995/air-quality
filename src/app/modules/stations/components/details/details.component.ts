import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { DetailedStation, Station } from '../../../../models/Station';
import { SwaggerService } from '../../../../services/swagger.service';
import { OmmanDate } from '../../../../unitlize/custom-date';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { customOptions } from './model';
import { LocalizationService } from '../../../../services/localization.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  currentStationCode;
  lang$ = this.localization.getCurrentLanguage()
  routes: IBreadCrumb[] = [
    {
      title: 'home',
      link: '/'
    }
  ];
  isLoaded;
  customOptions = customOptions;
  currentStation;
  stations: Partial<Station>[];
  lastUpdate;
  variables: { abbreviation_en: any; code: string; }[];
  details: DetailedStation;



  constructor(private swagger: SwaggerService, private route: ActivatedRoute, private router: Router, private localization: LocalizationService) { }

  ngOnInit(): void {

      this.localization.getCurrentLanguage().subscribe(lang=>{
        this.customOptions = {...this.customOptions, rtl: lang === 'ar'}

      })

    this.getData();
  }

  getData() {
    const code$ = this.swagger.getStationsCode();

    this.route.paramMap.pipe(switchMap(res => {
      this.currentStationCode = res['params'].code
      this.isLoaded = false;

      return combineLatest([
        code$,
        this.swagger.getStationDetails(this.currentStationCode)
      ]);
    }))

      .subscribe(([codes, details]) => {
        this.stations = codes.stations;
        this.variables = codes.variables;
        this.currentStation = this.stations.find(res => res.code === this.currentStationCode)
        this.details = details
        this.lastUpdate = OmmanDate(this.details.aqi[0].aggregated_at)
     
        this.isLoaded = true;
      })
  }


  onStationChange(e){
    this.router.navigate([`/stations/${e}`])
  }

}
