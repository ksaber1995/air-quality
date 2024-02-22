import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Station } from '../../../../models/Station';
import { SwaggerService } from '../../../../services/swagger.service';
import { carouselOptions } from './model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit , OnDestroy {
  @Input() stations : Station[];
  @Input() currentStation: Station ;
  public options: google.maps.MapOptions
  breakPoints$ = this.swagger.getBreakPoints().pipe(map(res=> res.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)))
  
  carouselOptions = carouselOptions;

  ngOnInit(): void {
    console.log(this.stations, 'all stations')
  }

  

  changeStation(station : Station){
    // this.currentStation = station;

    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: {id: station.code}, 
      }
    );

      // console.log(e)
  }

  navigatorPosition

  constructor(private route: ActivatedRoute, private router: Router, private swagger: SwaggerService) {
  

      this.options = {
        center:  { lat: 21.4735, lng: 58.545284 },

        zoomControl: false,
        mapTypeControl: false,
        zoom: 6.5,
        mapTypeId: 'terrain', // Use 'terrain' map type to emphasize borders

        streetViewControl: false,
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { color: '#96cccb99' }


            ]
          },
          // {
          //   "featureType": "landscape",
          //   "elementType": "geometry",
          //   "stylers": [

          //     { color: '#86b4b380' }

          //   ]
          // }
        ]
      };
  }

  ngOnDestroy(): void {
  }



}
