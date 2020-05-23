import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// Nice to keep yje angular imports at the top... not absolutely necessary
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './routes'; // L63
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule, // L59
      BsDropdownModule.forRoot(), // followthedocs
      TabsModule.forRoot(), // L92: Had to import the tabs module manually above... just watch that with some of teh ngxbootstrap stuff.
      RouterModule.forRoot(appRoutes), // L63
      JwtModule.forRoot(
         {
            // This is how to fix the login issue: the Bearer token is automatically sent up in the next request after login
            config: {
               tokenGetter, // slightly different syntax to what you'd expect... tokenGetter: tokenGetter
               whitelistedDomains: ['localhost:5000'], // L89: This must match where you are sending the token to
               blacklistedRoutes:  ['localhost:5000/api/auth']
            }
         }
      )
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider, // L53
      MemberDetailResolver, // L93 -- created the resolver.
      MemberListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
