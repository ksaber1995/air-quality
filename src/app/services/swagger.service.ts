import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { DetailedStation, Reading, Station } from '../models/Station';
import { BreakPoint, VariableBreakPoint } from '../models/breakPoint';
import { CustomOverviewResponse, OverviewResponse } from '../models/overview';
import { Lang, LocalizationService } from './localization.service';
import { AjaxService } from './ajax.service';
import { breakpointUrl } from '../environment';


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


function getSequence(name: string){
  if(!name) return 0

  name = name.toLocaleLowerCase();


  if(name.includes('good')){
    return 1
  }else if(name.includes('moderate')){
    return 2
  }else if(name.includes('satisfactory')){
    return 3
  }
  else if(name.includes('sensitive groups')){
    return 4
  }
  else if(name.includes('Unhealthy') && !name.includes('sensitive')){
    return 5
  }
  else if(name.includes('hazardous')){
    return 6
  }


  return 0
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
  constructor(private ajax: AjaxService, private localization: LocalizationService, private http: HttpClient) { }

  getStations() {
    const url =  '/stations'
    const lang$ = this.localization.getCurrentLanguage();
    
    return combineLatest([this.ajax.get<StationsResponse>(url), lang$])
    
    .pipe(
      map(([stationsResponse, lang])=> {
        const stations = stationsResponse.data;
        const data = stations.map(station=>{
        
          return {
            ...station,
            variables: station.variables.map(variable=> ({...variable,   readings: variable.readings.reverse()   })),
            weather: station.weather.map(weather=> ({...weather, readings: weather.readings.reverse(), variable: {...weather.variable , name: lang === Lang.ar ? weather.variable.name_ar : weather.variable.name_en }  })),
            aqi: station.aqi.map(aqi=> ({...aqi, sequence: getSequence(aqi.status_en), status_name: (lang === Lang.ar ? aqi.status_ar : aqi.status_en) || 'NA'  })),
            name: lang === Lang.ar ? station.name_ar : station.name_en,
            organization: {...station.organization, name: lang === Lang.ar ? station.organization?.name_ar : station.organization?.name_en}
          }
        })
        return data
      })
    )
  }

  getStationsCode() : Observable<CodesResponse>{
    const url =  '/stations/codes'
    return combineLatest([this.ajax.get<CodesResponse>(url), this.localization.getCurrentLanguage()])
    .pipe(map(([response, lang])=> ({variables: response.variables, stations: response.stations.map(res=> ({...res, name: lang === Lang.ar ? res.name_ar : res.name_en}))  })))
  }

  getStationsOverview( data: {type : OverviewType , interval: HistoryInterval, variable_code?: string, from?: string, to?: string} ) : Observable< CustomOverviewResponse> {
    const url =  '/stations/overview'
    return this.ajax.post<{data: OverviewResponse[]}>(url, { ...data })
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
    const url =  '/station'
    return   combineLatest([this.ajax.post<{data: DetailedStation[]}>(url, { station_code  }), this.localization.getCurrentLanguage()])
    .pipe(map(([res, lang])=> {
      const data = res.data[0];

      return {
        ...data,
        aqi: data.aqi.map(aqi=> ({...aqi, sequence: getSequence(aqi.status_en), status_name: (lang === Lang.ar ? aqi.status_ar : aqi.status_en) || 'NA'  })),
        
        name: lang === Lang.ar ? data.name_ar : data.name_en,
        organization: {...data.organization, name: lang === Lang.ar ? data.organization?.name_ar : data.organization?.name_en}
      }
    }))

  }

  getStationHistory( data : {station_code: string, type: OverviewType, variable_code?: string, interval: HistoryInterval, from?: string, to?: string}): Observable<Reading[]> {
    const url =  '/station/history'

    return this.ajax.post<{data: Reading[]}>(url, { ...data  }).pipe(map(res=> res.data.reverse()))
  }






  getBreakPoints(): Observable<BreakPointsResponse> {
    const url = breakpointUrl;

    return this.http.get<BreakPointsResponse>(url)
  }





}

