import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isSignedIn().pipe(
      tap(isSignedIn => {
        if (!isSignedIn) {
          console.log('AuthGuard - user not signed-in, redirecting to /');
          this.router.navigate(['/']);
        }
        else console.log('AuthGuard - pass');
      })
    );
  }
}
