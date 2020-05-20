import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService(); // L57 -- manual import was necessary above.
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            // unique_name is where the username will be.  Handle the error in html with ?
            console.log(this.decodedToken);
          }
        })
      );
  }

  register(model: any) {
    // register is very simple... just pass the model.
    // need to subscribe to it now in the register components.
    return this.http.post(this.baseUrl + 'register', model);
  }


  // L57: called by nav component
  loggedIn() {
    const token = localStorage.getItem('token');
    // if token is not expired, it will return true
    return !this.jwtHelper.isTokenExpired(token);
  }

}