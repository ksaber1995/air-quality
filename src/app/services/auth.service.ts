import { Injectable } from '@angular/core';
import { SignInResponse, User, createNhostClient } from '@nhost/nhost-js';
import { Observable, delay, from, map, of, switchMap, tap } from 'rxjs';
import { nhost } from '../environment';
import { HttpClient } from '@angular/common/http';
import { AjaxService } from './ajax.service';

// Self Hosting

// sytaxic sugar

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  url = 'manage/users/';

  constructor(private http : HttpClient, private ajax : AjaxService) { }


  isAuthenticated(): Observable<boolean> {
    const user = nhost.auth.getUser();
    return of(true).pipe(
      delay(1000),
      map((res) => Boolean(nhost.auth.getUser())),
    );
  }

  getUser(): Observable<User> {
    const user = nhost.auth.getUser();
    return of(true).pipe(
      delay(1000),
      map((res) => nhost.auth.getUser()),
    );
  }
  updateUser(body: any){
    return this.ajax.post(this.url + 'update' , body)
  }
  generate() {
    return this.http.get<any>(
      'https://auth.naqi.dal2.com/v1/mfa/totp/generate',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    // return this.ajax.get('mfa/totp/generate')
    // nhost.adminSecret
  }

  toggle(code: string) {
    const body = {
      activeMfaType: 'totp',
      code,
    };

    return this.http.post('https://auth.naqi.dal2.com/v1/user/mfa', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // return this.ajax.get('mfa/totp/generate')
    // nhost.adminSecret
  }

  signinOtp(body: { ticket: string; otp: string }): Observable<any> {
    return from(
      nhost.auth.signIn({
        otp: body.otp,
        ticket: body.ticket,
      })
    );
    // return this.ajax.get('mfa/totp/generate')
    // nhost.adminSecret
  }


  login(email: string, password: string): Observable<SignInResponse> {
    return from(
      nhost.auth.signIn({
        email,
        password
      })
    );
  }


  logOut() {
    nhost.auth.signOut();
  }
}

