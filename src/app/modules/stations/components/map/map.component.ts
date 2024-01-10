import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  public options: google.maps.MapOptions = {
    center: {
      lat: 15,
      lng: 0,
    },
    mapTypeControl: false,
    zoom: 2,
    streetViewControl: false
  };

  
}
