import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/Station';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';

const BaseUrl = 'https://functions.naqi.dal2.com/v1'

interface StationsResponse {
  data: Station[]
}


interface BreakPointsResponse {
  aqi_breakpoints: BreakPoint[]
  variables_breakpoints: VariableBreakPoint[]

}


@Injectable({
  providedIn: 'root'
})
export class SwaggerService {
  constructor(private http: HttpClient) { }

  getStations() {
    const url = BaseUrl + '/stations'

    return this.http.get(url).pipe(map((res: StationsResponse) => res.data), shareReplay())
  }

  // getStationsCode() {
  //   const url = BaseUrl + '/stations/codes'

  //   return this.http.get(url).pipe(map((res: StationsResponse) => res.stations), shareReplay())
  // }

  // getStationsOverview({ type, interval, variable_code, from, to }) {
  //   const url = BaseUrl + '/stations/codes'

  //   return this.http.post(url, { type, interval, variable_code, from, to }).pipe(map((res: StationsResponse) => res.stations), shareReplay())

  // }


  
  // getStationDetails(station_code ) {
  //   const url = BaseUrl + '/station'

  //   return this.http.post(url, { station_code  }).pipe(map((res: StationsResponse) => res.stations), shareReplay())

  // }

  // getStationHistory(station_code ) {
  //   const url = BaseUrl + '/station/history'

  //   return this.http.post(url, { station_code  }).pipe(map((res: StationsResponse) => res.stations), shareReplay())

  // }






  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = 'https://hasura.naqi.dal2.com/api/rest/v1/public/breakpoints'

    return this.http.get<BreakPointsResponse>(url)
  }





}

