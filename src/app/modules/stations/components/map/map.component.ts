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

  isLoaded
  public options: google.maps.MapOptions = {
    center: {
      lat: 15,
      lng: 0,
    },

    mapTypeControl: false,
    zoom: 2,
    streetViewControl: false,
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [

          { color: '#25B5B1' }

        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [

          { color: '#ffffff' }

        ]
      }
    ]
  };


}
