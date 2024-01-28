import { Component } from '@angular/core';
import { SwaggerService } from '../../../../services/swagger.service';
import { map, tap, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  stations$ = this.swagger.getStations().pipe(tap(res => {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { id: res[0].id },
      }
    );
  }));

  currentStation$ = this.route.queryParamMap.pipe(
    withLatestFrom(this.stations$), map(([routes, stations]) => {
      const id = +routes.get('id');
      // return stations[0]
      return stations.find(res => res.id === id)
    }))

  aqiBreakPoints$ = this.swagger.getBreakPoints().pipe(map(res => res.aqi_breakpoints));

  constructor(private swagger: SwaggerService, private router: Router, private route: ActivatedRoute) {
    this.stations$.subscribe(res => {
      console.log(res, 'stations')
    })

    this.currentStation$.subscribe(res => {
      console.log(res, 'c stations')
    })

    this.aqiBreakPoints$.subscribe(res => {
      console.log(res, 'breakpoints')
    })
  }
}
