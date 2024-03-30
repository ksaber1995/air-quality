import { Injectable } from '@angular/core';
import { SignInResponse, createNhostClient } from '@nhost/nhost-js';
import { Observable, delay,  from,  map, of, switchMap } from 'rxjs';

// Self Hosting
const nhost = createNhostClient({
  authUrl: 'https://auth.naqi.dal2.com/v1',
  storageUrl: 'https://auth.naqi.dal2.com/v1',
  graphqlUrl: 'https://auth.naqi.dal2.com/v1',
  functionsUrl: 'https://functions.naqi.dal2.com/v2',
});

// sytaxic sugar

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  //  getUser() {
  //   const session = await nhost.auth.refreshSession('');

  //   if (session.session?.accessToken) {
  //     return session.session?.user;
  //   }
  // }

  isAuthenticated(): Observable<boolean> {
    // const start = nhost.auth.client.start()
    const user = nhost.auth.getUser();
    if(user){
      return of(true)
    }

    

    return of(true).pipe(delay(600)).pipe(switchMap(res => {
      return from(nhost.auth.refreshSession()).pipe(
        map((session) => {
          if (session.session?.accessToken && session.session?.user) {
            return true;
          }

          return false;
        })
      );
    }));
  }

  login(email: string, password: string): Observable<SignInResponse> {
    return from(
      nhost.auth.signIn({
        email,
        password,
      })
    );
  }

  logOut() {
    nhost.auth.signOut();
  }
}
