import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { map } from 'rxjs';
import { Station } from '../../../../models/Station';
import { SwaggerService } from '../../../../services/swagger.service';
import { LocalizationService } from './../../../../services/localization.service';
import { carouselOptions } from './model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class MapComponent implements OnInit, OnDestroy {
  @Input() stations: Station[];
  @Input() currentStation: Station;
  @ViewChild('carouselRef') carouselRef: CarouselComponent;

  public options: google.maps.MapOptions
  breakPoints$ = this.swagger.getBreakPoints().pipe(map(res => res.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)))

  carouselOptions = carouselOptions;
  lang$ = this.localization.getCurrentLanguage();

  interval;

  ngOnInit(): void {
    this.StartLooping();

  }

  StartLooping() {
    this.interval = setInterval(res => {
      const current_station_id = this.route.snapshot.queryParams?.['id']

      const current_station_index = this.stations.findIndex(res => res.code === current_station_id)

      if (current_station_index > -1 && current_station_index < (this.stations.length - 1)) {
        const next_station = this.stations[current_station_index + 1]

        this.carouselRef.to(next_station.code)
        this.changeStation(next_station)
      } else if (current_station_index === (this.stations.length - 1)) {
        const next_station = this.stations[0]
        this.carouselRef.to(next_station.code)


        // this.carouselRef.next()
        this.changeStation(next_station)
      }
    }, 8000)
  }





  changeStation(station: Station) {
    // this.currentStation = station;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { id: station.code },
      }
    );

  }

  navigatorPosition

  constructor(private route: ActivatedRoute, private router: Router, private swagger: SwaggerService, private localization: LocalizationService) {

    this.localization.getCurrentLanguage().subscribe(lang => {
      this.carouselOptions = { ...this.carouselOptions, rtl: lang === 'ar' }
    })

    this.options = {
      center: { lat: 21.4735, lng: 58.545284 },

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
    clearInterval(this.interval)

  }


  toggleCarouselAutoPlay(carouselRef) {
    if(this.interval){
      clearInterval(this.interval)
      this.interval = null
    }else{
      this.StartLooping()
    }
    // const autoplay = !this.carouselOptions.autoplay
    // this.carouselOptions = {...this.carouselOptions, autoplay}
  }

}
