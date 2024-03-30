import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.getIsAuthenticated();


    return isAuthenticated.pipe(
      tap((res) => {
        if (!res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(map(res=> !res)) // generate
  }
}
