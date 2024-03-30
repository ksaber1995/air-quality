import { Injectable } from '@angular/core';
import { SignInResponse, User, createNhostClient } from '@nhost/nhost-js';
import { Observable, delay, from, map, of, switchMap, tap } from 'rxjs';
import { nhost } from '../environment';

// Self Hosting

// sytaxic sugar

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }


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

