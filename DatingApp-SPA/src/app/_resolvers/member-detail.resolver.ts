import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {
       
    }

    /* 
    If you use the Ctrl+. and get the automatic implements interface, this is what you get:
    
    resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): User 
    | import("rxjs").Observable<User> | Promise<User> {
        throw new Error('Method not implemented.');
    } 
    
    L93: Manually typed version of the resolve implementation is below 
    */ 

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params.id).pipe (
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);  // Returns observable to of type null
            })
        );
    }
}