import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { nhost } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return from(nhost.functions.call(url)).pipe(map(res => res?.res?.data)) as Observable<T>;
  }

  post<T>(url: string, body: any): Observable<T> {
    return from( nhost.functions.call(url, body)).pipe(map(res=> res.res.data)) as Observable<T>;
  }

  delete<T>(url: string, body: any): Observable<T> {
    return from( nhost.functions.call(url, body)).pipe(map(res=> res.res.data)) as Observable<T>;
  }

  patch<T>(url: string, body: any) {
    return from( nhost.functions.call(url, body)).pipe(map(res=> res.res.data)) as Observable<T>;
  }

  put(url: string, body: any) {
    nhost.functions.call(url, body);
  }
}
