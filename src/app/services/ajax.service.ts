import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createNhostClient } from '@nhost/nhost-js';
import { Observable, from, map } from 'rxjs';

const nhost = createNhostClient({
  authUrl: 'https://auth.naqi.dal2.com/v1',
  storageUrl: 'https://auth.naqi.dal2.com/v1',
  graphqlUrl: 'https://auth.naqi.dal2.com/v1',
  functionsUrl: 'https://functions.naqi.dal2.com/v2',
});
@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return from(nhost.functions.call(url)).pipe(map(res=> res.res.data)) as Observable<T>;
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
