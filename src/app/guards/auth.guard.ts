import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
          this.router.navigate(['/login'], {
            queryParams: { return_url: state.url },
          });
        }
      })
    );
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated(); // generate
  }
}
