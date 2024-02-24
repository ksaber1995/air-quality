import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, withLatestFrom } from 'rxjs';
import { SwaggerService } from '../../../../services/swagger.service';

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
        queryParams: { id: res[0].code },
      }
    );
  }));

  currentStation$ = this.route.queryParamMap.pipe(
    withLatestFrom(this.stations$), map(([routes, stations]) => {
      const id = routes.get('id');
      // return stations[0]
      return stations.find(res=> res.code === id) 
    }))

  constructor(private swagger: SwaggerService, private router: Router, private route: ActivatedRoute) {
 
  }

  
}
