import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from '../../../../models/Station';
import { carouselOptions } from './model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit , OnDestroy {
  @Input() stations : Station[];
  @Input() currentStation: Station ;
  public options: google.maps.MapOptions
  
  isLoaded

  carouselOptions = carouselOptions;

  ngOnInit(): void {

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

  constructor(private route: ActivatedRoute, private router: Router) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.navigatorPosition = position;

      this.options = {
        center: {
          lat: this.navigatorPosition.coords.latitude,
          lng: this.navigatorPosition.coords.longitude,
        },
        // zoomControl: true,
        mapTypeControl: false,
        // zoom: 2,
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
    })
  }

  ngOnDestroy(): void {
  }



}
