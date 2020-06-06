import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// L89: Removed httpOptions when we used the jwtimport for handling the token. This is the fix for the first login 
// issue where you get the 401 error.  A full page refresh is the only way to get around it otherwise... 
// const httpOptions = {
//   headers: new HttpHeaders(
//     {
//       Authorization: 'Bearer ' + localStorage.getItem('token')
//     }
//   )
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // to fix the error about Observable, typesafe it:
    // L89: return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    // to fix the error about Observable, typesafe it:
    // L89: return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    // Because this is a post request, to satisfy the requirements send up an empty body {} in the request
    // Not entirely restful, but it's a happy compromise to keep things simple
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

}
