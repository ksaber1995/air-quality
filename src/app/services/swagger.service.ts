import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedStation, Reading, Station } from '../models/Station';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { CustomOverviewResponse, OverviewResponse } from '../models/overview';
import { Lang, LocalizationService } from './localization.service';

const BaseUrl = 'https://functions.naqi.dal2.com/v1'

interface StationsResponse {
  data: Station[]
}

interface CodesResponse {
  stations: Partial< Station >[],
  variables: {
    abbreviation_en
    code: string
  }[]
}

export type OverviewType = 'aqi' | 'variable'
export type HistoryInterval = 'day' | 'week' | 'month'

interface BreakPointsResponse {
  aqi_breakpoints: BreakPoint[]
  variables: VariableBreakPoint[]

}


@Injectable({
  providedIn: 'root'
})
export class SwaggerService {
  constructor(private http: HttpClient, private localization: LocalizationService) { }

  getStations() {
    const url = BaseUrl + '/stations'
    const lang$ = this.localization.getCurrentLanguage();
    
    return combineLatest([this.http.get<StationsResponse>(url), lang$])
    
    .pipe(
      map(([stationsResponse, lang])=> {
        console.log(lang)
        const stations = stationsResponse.data;
        debugger
        const data = stations.map(station=>{
        
          return {
            ...station,
            variables: station.variables.map(variable=> ({...variable,   readings: variable.readings.reverse()})),
            weather: station.weather.map(weather=> ({...weather, readings: weather.readings.reverse(), variable: {...weather.variable , name: lang === Lang.ar ? weather.variable.name_ar : weather.variable.name_en }  })),
            aqi: station.aqi.map(aqi=> ({...aqi, status_name: lang === Lang.ar ? aqi.status_ar : aqi.status_en  })),
            name: lang === Lang.ar ? station.name_ar : station.name_en,
            organization: {...station.organization, name: lang === Lang.ar ? station.organization.name_ar : station.organization.name_en}
          }
        })
        return data
      })
    )
  }

  getStationsCode() : Observable<CodesResponse>{
    const url = BaseUrl + '/stations/codes'

    return this.http.get<CodesResponse>(url)
  }

  getStationsOverview( data: {type : OverviewType , interval: HistoryInterval, variable_code?: string, from?: string, to?: string} ) : Observable< CustomOverviewResponse> {
    const url = BaseUrl + '/stations/overview'
    return this.http.post<{data: OverviewResponse[]}>(url, { ...data })
      .pipe(
        map(res=> res.data.reverse()),
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


  
  getStationDetails(station_code ) : Observable<DetailedStation> {
    const url = BaseUrl + '/station'

    return this.http.post<{data: DetailedStation[]}>(url, { station_code  }).pipe(map(res=> res.data[0]))

  }

  getStationHistory( data : {station_code: string, type: OverviewType, variable_code?: string, interval: HistoryInterval, from?: string, to?: string}): Observable<Reading[]> {
    const url = BaseUrl + '/station/history'

    return this.http.post<{data: Reading[]}>(url, { ...data  }).pipe(map(res=> res.data.reverse()))
  }






  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = 'https://hasura.naqi.dal2.com/api/rest/v1/public/breakpoints'

    return this.http.get<BreakPointsResponse>(url)
  }





}

