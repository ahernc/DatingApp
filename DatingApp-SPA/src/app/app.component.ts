import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // L58
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Langer Dating';
  jwtHelper = new JwtHelperService(); // L58 -- manual import was necessary above.


  constructor(private authService: AuthService) {}
  
  // L58: added while we were showing the username in the top right of the nav html
  ngOnInit() {
    const token = localStorage.getItem('token');
    
    const user: User = JSON.parse(localStorage.getItem('user')); // for the purpose of accessing the user in the nav bar...

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
    }
  }
}

