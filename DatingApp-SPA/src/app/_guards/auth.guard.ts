import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /* L66 : the original code generated by doing:
   PS C:\_github\DatingApp\DatingApp-SPA\src\app\_guards>ng g guar auth --skipTests
  
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } 
  We are only interested in the user being logged in or not.  It's either true or false
  */

  constructor(private authService: AuthService,
     private router: Router,
     private alertify: AlertifyService
     ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Nice try!  You need to be logged in first');
    this.router.navigate(['/home']);
  }
}
