import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    // to fix the error about Observable, typesafe it:
    // L89: return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params } )
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
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
