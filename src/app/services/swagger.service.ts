import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../models/Station';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { CustomOverviewResponse, OverviewResponse } from '../models/overview';

const BaseUrl = 'https://functions.naqi.dal2.com/v1'

interface StationsResponse {
  data: Station[]
}

interface CodesResponse {
  stations: {
    code: string,
    name_ar: string,
    name_en: string
  }[],
  variables: {
    abbreviation_en
    code: string
  }[]
}

export type OverviewType = 'aqi' | 'variable'
export type HistoryInterval = 'day' | 'week' | 'month'

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

  getStationsCode() : Observable<CodesResponse>{
    const url = BaseUrl + '/stations/codes'

    return this.http.get<CodesResponse>(url).pipe(shareReplay())
  }

  getStationsOverview( data: {type : OverviewType , interval: HistoryInterval, variable_code?: string, from?: string, to?: string} ) : Observable< CustomOverviewResponse> {
    const url = BaseUrl + '/stations/overview'
    return this.http.post<{data: OverviewResponse[]}>(url, { ...data })
      .pipe(
        map(res=> res.data),
        map(res=>{
          const data: CustomOverviewResponse = {}

          res.forEach(item=> {
           const key = item.station.name_en;
            if(data[key]) {
              data[key].push(item)
            } else {
              data[key] = [item]
            }
          })

          return data
        })
      )
  }


  
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

