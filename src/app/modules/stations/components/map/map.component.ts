import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);

  }

  navigatorPosition

  constructor() {
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

  isLoaded
  public options: google.maps.MapOptions


}
