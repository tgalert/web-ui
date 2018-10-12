import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isSignedIn().pipe(
      map(isSignedIn => !isSignedIn),
      tap(isNotSignedIn => {
        if (!isNotSignedIn) {
          console.log('AuthGuard - user is signed-in, redirecting to /dashboard');
          this.router.navigate(['/dashboard']);
        }
        else console.log('AuthGuard - pass');
      })
    );
  }
}
